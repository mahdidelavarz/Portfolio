import "server-only";

import { and, asc, count, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { getDatabase } from "@/db";
import { answers, visitors, type Answer, type Visitor } from "@/db/schema";
import { ApiError, isUniqueViolation } from "@/lib/api";
import {
  getAdjacentChallenges,
  getChallengeById,
  getPublishedChallengeBySlug,
  getPublishedChallenges,
  toPublicChallenge,
} from "./repository";
import { getCurrentMonthRange } from "./time";

const ALLOWED_SOURCES = new Set(["linkedin", "direct"]);
const MAX_RESPONSE_TIME_MS = 30 * 60 * 1000;

function sanitizeSource(value: unknown): string | null {
  return typeof value === "string" && ALLOWED_SOURCES.has(value)
    ? value
    : null;
}

function sanitizeResponseTime(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= MAX_RESPONSE_TIME_MS
    ? value
    : null;
}

function answerResult(answer: Answer, challenge: NonNullable<ReturnType<typeof getChallengeById>>) {
  return {
    answer: {
      selectedOptionId: answer.selectedOptionId,
      correctOptionId: challenge.correctOptionId,
      isCorrect: answer.isCorrect,
      answeredAt: answer.answeredAt.toISOString(),
    },
    explanation: {
      shortAnswer: challenge.shortAnswer,
      steps: challenge.explanationSteps,
      correctedCode: challenge.correctedCode,
      takeaway: challenge.takeaway,
    },
  };
}

async function getQuestionStats(questionId: string) {
  const db = getDatabase();
  const rows = await db
    .select({ optionId: answers.selectedOptionId, count: count() })
    .from(answers)
    .where(eq(answers.questionId, questionId))
    .groupBy(answers.selectedOptionId);
  const totalAnswers = rows.reduce((sum, row) => sum + row.count, 0);

  return {
    totalAnswers,
    optionDistribution: rows.map((row) => ({
      optionId: row.optionId,
      count: row.count,
      percentage:
        totalAnswers === 0 ? 0 : Math.round((row.count / totalAnswers) * 100),
    })),
  };
}

async function findAnswer(visitorId: string, questionId: string) {
  const db = getDatabase();
  const [answer] = await db
    .select()
    .from(answers)
    .where(
      and(
        eq(answers.visitorId, visitorId),
        eq(answers.questionId, questionId),
      ),
    )
    .limit(1);
  return answer ?? null;
}

export async function getChallengeList(visitorId: string) {
  const published = getPublishedChallenges();
  const ids = published.map((challenge) => challenge.id);
  const db = getDatabase();

  const visitorAnswers = ids.length
    ? await db
        .select({ questionId: answers.questionId, isCorrect: answers.isCorrect })
        .from(answers)
        .where(
          and(
            eq(answers.visitorId, visitorId),
            inArray(answers.questionId, ids),
          ),
        )
    : [];
  const counts = ids.length
    ? await db
        .select({ questionId: answers.questionId, count: count() })
        .from(answers)
        .where(inArray(answers.questionId, ids))
        .groupBy(answers.questionId)
    : [];

  const statusByQuestion = new Map(
    visitorAnswers.map((answer) => [
      answer.questionId,
      answer.isCorrect ? "correct" : "incorrect",
    ]),
  );
  const countByQuestion = new Map(
    counts.map((item) => [item.questionId, item.count]),
  );

  return {
    challenges: published.map((challenge) => ({
      ...toPublicChallenge(challenge),
      answerStatus: statusByQuestion.get(challenge.id) ?? "unanswered",
      totalAnswers: countByQuestion.get(challenge.id) ?? 0,
    })),
  };
}

export async function getChallengeDetail(visitor: Visitor, slug: string) {
  const challenge = getPublishedChallengeBySlug(slug);
  if (!challenge) {
    throw new ApiError(404, "CHALLENGE_NOT_FOUND", "این سؤال پیدا نشد یا هنوز منتشر نشده است.");
  }
  const existing = await findAnswer(visitor.id, challenge.id);
  const adjacent = getAdjacentChallenges(slug);

  return {
    question: toPublicChallenge(challenge),
    existingAnswer: existing
      ? {
          ...answerResult(existing, challenge),
          questionStats: await getQuestionStats(challenge.id),
        }
      : null,
    adjacent: {
      previous: adjacent.previous
        ? { slug: adjacent.previous.slug, title: adjacent.previous.title }
        : null,
      next: adjacent.next
        ? { slug: adjacent.next.slug, title: adjacent.next.title }
        : null,
    },
    visitor: {
      displayName: visitor.displayName,
      shouldRequestDisplayName: Boolean(existing && !visitor.displayName),
    },
  };
}

export async function submitChallengeAnswer(
  visitor: Visitor,
  slug: string,
  body: unknown,
) {
  const challenge = getPublishedChallengeBySlug(slug);
  if (!challenge) {
    throw new ApiError(404, "CHALLENGE_NOT_FOUND", "این سؤال پیدا نشد یا هنوز منتشر نشده است.");
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new ApiError(400, "INVALID_BODY", "اطلاعات پاسخ معتبر نیست.");
  }

  const input = body as Record<string, unknown>;
  if (
    typeof input.selectedOptionId !== "string" ||
    !challenge.options.some((option) => option.id === input.selectedOptionId)
  ) {
    throw new ApiError(400, "INVALID_OPTION", "گزینه انتخاب‌شده معتبر نیست.");
  }

  let stored = await findAnswer(visitor.id, challenge.id);
  let repeated = Boolean(stored);

  if (!stored) {
    try {
      const [inserted] = await getDatabase()
        .insert(answers)
        .values({
          visitorId: visitor.id,
          questionId: challenge.id,
          selectedOptionId: input.selectedOptionId,
          isCorrect: input.selectedOptionId === challenge.correctOptionId,
          responseTimeMs: sanitizeResponseTime(input.responseTimeMs),
          source: sanitizeSource(input.source),
        })
        .returning();
      stored = inserted;
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      repeated = true;
      stored = await findAnswer(visitor.id, challenge.id);
    }
  }

  if (!stored) throw new Error("The stored answer could not be loaded.");

  return {
    ...answerResult(stored, challenge),
    questionStats: await getQuestionStats(challenge.id),
    visitor: {
      displayName: visitor.displayName,
      shouldRequestDisplayName: !visitor.displayName,
    },
    repeated,
  };
}

export async function getVisitorProgress(visitor: Visitor) {
  const db = getDatabase();
  const allAnswers = await db
    .select()
    .from(answers)
    .where(eq(answers.visitorId, visitor.id))
    .orderBy(asc(answers.answeredAt));
  const { start, end } = getCurrentMonthRange();
  const monthlyAnswers = allAnswers.filter(
    (answer) => answer.answeredAt >= start && answer.answeredAt < end,
  );
  const correct = allAnswers.filter((answer) => answer.isCorrect).length;
  const monthlyCorrect = monthlyAnswers.filter((answer) => answer.isCorrect).length;
  const leaderboard = await getLeaderboard(visitor.id);

  return {
    visitor: { displayName: visitor.displayName },
    summary: {
      totalAnswers: allAnswers.length,
      correctAnswers: correct,
      accuracy: allAnswers.length ? Math.round((correct / allAnswers.length) * 100) : 0,
    },
    currentMonth: {
      totalAnswers: monthlyAnswers.length,
      correctAnswers: monthlyCorrect,
      accuracy: monthlyAnswers.length
        ? Math.round((monthlyCorrect / monthlyAnswers.length) * 100)
        : 0,
      rank: leaderboard.currentVisitor?.rank ?? null,
    },
    answeredChallenges: allAnswers
      .map((answer) => {
        const challenge = getChallengeById(answer.questionId);
        return challenge
          ? {
              slug: challenge.slug,
              title: challenge.title,
              technology: challenge.technology,
              topic: challenge.topic,
              isCorrect: answer.isCorrect,
              answeredAt: answer.answeredAt.toISOString(),
            }
          : null;
      })
      .filter((item) => item !== null)
      .reverse(),
  };
}

export async function getLeaderboard(currentVisitorId: string) {
  const { start, end } = getCurrentMonthRange();
  const rows = await getDatabase()
    .select({
      visitorId: answers.visitorId,
      displayName: visitors.displayName,
      totalAnswers: count(),
      correctAnswers: sql<number>`sum(case when ${answers.isCorrect} then 1 else 0 end)::int`,
      achievedAt: sql<Date>`coalesce(max(case when ${answers.isCorrect} then ${answers.answeredAt} end), min(${answers.answeredAt}))`,
    })
    .from(answers)
    .innerJoin(visitors, eq(answers.visitorId, visitors.id))
    .where(and(gte(answers.answeredAt, start), lt(answers.answeredAt, end)))
    .groupBy(answers.visitorId, visitors.displayName);

  const ranked = rows
    .map((row) => ({
      ...row,
      accuracy: row.totalAnswers
        ? Math.round((row.correctAnswers / row.totalAnswers) * 100)
        : 0,
    }))
    .sort(
      (a, b) =>
        b.correctAnswers - a.correctAnswers ||
        b.accuracy - a.accuracy ||
        new Date(a.achievedAt).getTime() - new Date(b.achievedAt).getTime() ||
        a.visitorId.localeCompare(b.visitorId),
    )
    .map((row, index) => ({ ...row, rank: index + 1 }));

  const publicEntries = ranked
    .filter((entry) => entry.displayName)
    .map((entry) => ({
      rank: entry.rank,
      displayName: entry.displayName,
      correctAnswers: entry.correctAnswers,
      totalAnswers: entry.totalAnswers,
      accuracy: entry.accuracy,
    }));
  const current = ranked.find((entry) => entry.visitorId === currentVisitorId);

  return {
    period: { start: start.toISOString(), end: end.toISOString(), timeZone: "Asia/Tehran" },
    entries: publicEntries,
    currentVisitor: current
      ? {
          rank: current.rank,
          displayName: current.displayName,
          correctAnswers: current.correctAnswers,
          totalAnswers: current.totalAnswers,
          accuracy: current.accuracy,
        }
      : null,
  };
}
