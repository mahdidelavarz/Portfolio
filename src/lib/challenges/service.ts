import "server-only";

import { and, asc, count, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { getDatabase } from "@/db";
import { answers, labResults, visitors, type Answer, type Visitor } from "@/db/schema";
import { ApiError, isUniqueViolation } from "@/lib/api";
import { TICKET_MAX_POINTS, ticketPoints } from "@/lib/lab/engine";
import { getLabLevels } from "@/lib/lab/repository";
import { getLabResultRows } from "@/lib/lab/results";
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

function inRange(date: Date | null, start: Date, end: Date): boolean {
  return date !== null && date >= start && date < end;
}

export async function getVisitorProgress(visitor: Visitor) {
  const db = getDatabase();
  const [allAnswers, labRows, leaderboard] = await Promise.all([
    db
      .select()
      .from(answers)
      .where(eq(answers.visitorId, visitor.id))
      .orderBy(asc(answers.answeredAt)),
    getLabResultRows(visitor.id),
    getLeaderboard(visitor.id),
  ]);
  const { start, end } = getCurrentMonthRange();
  const monthlyAnswers = allAnswers.filter((answer) => inRange(answer.answeredAt, start, end));
  const correct = allAnswers.filter((answer) => answer.isCorrect).length;
  const labByLevel = new Map(labRows.map((row) => [row.levelId, row]));
  const tickets = getLabLevels().flatMap((level) => {
    if (level.status !== "published") return [];
    const row = labByLevel.get(level.id);
    return [
      {
        levelId: level.id,
        number: level.number,
        title: level.title,
        status: !row ? "untouched" : row.passed ? "closed" : "open",
        bestScore: row?.bestScore ?? 0,
        runs: row?.runs ?? 0,
        hintsUsed: row?.hintsUsed ?? 0,
        solutionViewed: row?.solutionViewed ?? false,
        points: row?.passed ? ticketPoints(row.bestScore, row.solutionViewed) : 0,
      },
    ];
  });
  const current = leaderboard.currentVisitor;

  return {
    visitor: { displayName: visitor.displayName },
    summary: {
      totalAnswers: allAnswers.length,
      correctAnswers: correct,
      accuracy: allAnswers.length ? Math.round((correct / allAnswers.length) * 100) : 0,
      closedTickets: tickets.filter((ticket) => ticket.status === "closed").length,
      totalTickets: tickets.length,
    },
    currentMonth: {
      totalAnswers: monthlyAnswers.length,
      points: current?.points ?? 0,
      quizPoints: current?.quizPoints ?? 0,
      labPoints: current?.labPoints ?? 0,
      accuracy: current?.accuracy ?? 0,
      rank: current?.rank ?? null,
    },
    lab: tickets,
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

interface MonthlyScore {
  visitorId: string;
  displayName: string | null;
  totalAnswers: number;
  quizPoints: number;
  labPoints: number;
  possiblePoints: number;
  achievedAt: number;
}

/**
 * One monthly score per visitor: a correct quiz answer is 1 point and a lab
 * ticket is up to 5, counted in the month it was first passed. Ties go to the
 * higher share of possible points, then to whoever reached the total first.
 */
export async function getLeaderboard(currentVisitorId: string) {
  const { start, end } = getCurrentMonthRange();
  const db = getDatabase();
  const [quizRows, labRows] = await Promise.all([
    db
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
      .groupBy(answers.visitorId, visitors.displayName),
    db
      .select({
        visitorId: labResults.visitorId,
        displayName: visitors.displayName,
        bestScore: labResults.bestScore,
        solutionViewed: labResults.solutionViewed,
        firstPassedAt: labResults.firstPassedAt,
      })
      .from(labResults)
      .innerJoin(visitors, eq(labResults.visitorId, visitors.id))
      .where(
        and(
          eq(labResults.passed, true),
          gte(labResults.firstPassedAt, start),
          lt(labResults.firstPassedAt, end),
        ),
      ),
  ]);

  const scores = new Map<string, MonthlyScore>();
  for (const row of quizRows) {
    scores.set(row.visitorId, {
      visitorId: row.visitorId,
      displayName: row.displayName,
      totalAnswers: row.totalAnswers,
      quizPoints: row.correctAnswers,
      labPoints: 0,
      possiblePoints: row.totalAnswers,
      achievedAt: new Date(row.achievedAt).getTime(),
    });
  }
  for (const row of labRows) {
    const passedAt = row.firstPassedAt ? new Date(row.firstPassedAt).getTime() : 0;
    const score = scores.get(row.visitorId) ?? {
      visitorId: row.visitorId,
      displayName: row.displayName,
      totalAnswers: 0,
      quizPoints: 0,
      labPoints: 0,
      possiblePoints: 0,
      achievedAt: passedAt,
    };
    score.labPoints += ticketPoints(row.bestScore, row.solutionViewed);
    score.possiblePoints += TICKET_MAX_POINTS;
    score.achievedAt = Math.max(score.achievedAt, passedAt);
    scores.set(row.visitorId, score);
  }

  const toEntry = (score: MonthlyScore & { points: number; accuracy: number }, rank: number) => ({
    rank,
    displayName: score.displayName,
    points: score.points,
    quizPoints: score.quizPoints,
    labPoints: score.labPoints,
    totalAnswers: score.totalAnswers,
    accuracy: score.accuracy,
  });
  const ranked = [...scores.values()]
    .map((score) => {
      const points = score.quizPoints + score.labPoints;
      return {
        ...score,
        points,
        accuracy: score.possiblePoints ? Math.round((points / score.possiblePoints) * 100) : 0,
      };
    })
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.accuracy - a.accuracy ||
        a.achievedAt - b.achievedAt ||
        a.visitorId.localeCompare(b.visitorId),
    );
  // Ranks are counted among named visitors only, so the public table has no gaps.
  const named = ranked.filter((score) => score.displayName);
  const current = named.findIndex((score) => score.visitorId === currentVisitorId);

  return {
    period: { start: start.toISOString(), end: end.toISOString(), timeZone: "Asia/Tehran" },
    entries: named.map((score, index) => toEntry(score, index + 1)),
    currentVisitor: current >= 0 ? toEntry(named[current], current + 1) : null,
  };
}
