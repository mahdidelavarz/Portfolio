import "server-only";

import { eq, sql } from "drizzle-orm";
import { getDatabase } from "@/db";
import { labResults, type LabResult, type Visitor } from "@/db/schema";
import { ApiError, readJsonObject } from "@/lib/api";
import { validateDraft } from "./engine";
import { parseLevelConfig, scoreConfig, toPlayableLevel } from "./playable";
import { getLabLevels } from "./repository";

export interface LabResultView {
  levelId: string;
  bestConfig: LabResult["bestConfig"];
  bestScore: number;
  passed: boolean;
  runs: number;
  hintsUsed: number;
  solutionViewed: boolean;
  firstPassedAt: string | null;
}

function toView(row: LabResult): LabResultView {
  return {
    levelId: row.levelId,
    bestConfig: row.bestConfig,
    bestScore: row.bestScore,
    passed: row.passed,
    runs: row.runs,
    hintsUsed: row.hintsUsed,
    solutionViewed: row.solutionViewed,
    firstPassedAt: row.firstPassedAt?.toISOString() ?? null,
  };
}

export async function getLabResultRows(visitorId: string): Promise<LabResult[]> {
  return getDatabase().select().from(labResults).where(eq(labResults.visitorId, visitorId));
}

export async function getLabResults(visitorId: string): Promise<LabResultView[]> {
  return (await getLabResultRows(visitorId)).map(toView);
}

/**
 * Stores one run. The request carries only the config; the score is computed
 * here with the same engine the browser uses, so a client cannot report one.
 */
export async function recordLabRun(
  visitor: Visitor,
  levelId: string,
  body: unknown,
): Promise<LabResultView> {
  if (!visitor.displayName) {
    throw new ApiError(403, "USERNAME_REQUIRED", "برای ذخیره‌ی نتیجه اول باید یه اسم ثبت کنی.");
  }
  const content = getLabLevels().find((level) => level.id === levelId);
  if (!content || content.status !== "published") {
    throw new ApiError(404, "LEVEL_NOT_FOUND", "این تیکت پیدا نشد یا هنوز باز نشده.");
  }
  const level = toPlayableLevel(content);
  const input = readJsonObject(body);
  const config = parseLevelConfig(level, input.config);
  if (!config) throw new ApiError(400, "INVALID_CONFIG", "تنظیمات این اجرا معتبر نیست.");
  const missing = validateDraft(level.fields, config);
  if (missing) throw new ApiError(400, "INCOMPLETE_CONFIG", missing);

  const scored = scoreConfig(level, config);
  const correct = scored.evaluation.correct;
  const score = correct ? scored.score : 0;
  const passed = scored.passed && correct;
  const hintsUsed =
    typeof input.hintsUsed === "number" && Number.isInteger(input.hintsUsed)
      ? Math.max(0, Math.min(level.hints.length, input.hintsUsed))
      : 0;
  const solutionViewed = input.solutionViewed === true;
  const now = new Date();

  const [stored] = await getDatabase()
    .insert(labResults)
    .values({
      visitorId: visitor.id,
      levelId,
      bestConfig: config,
      bestScore: score,
      passed,
      runs: 1,
      hintsUsed,
      solutionViewed,
      firstPassedAt: passed ? now : null,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [labResults.visitorId, labResults.levelId],
      set: {
        bestConfig: sql`case when excluded.best_score > ${labResults.bestScore} then excluded.best_config else ${labResults.bestConfig} end`,
        bestScore: sql`greatest(${labResults.bestScore}, excluded.best_score)`,
        passed: sql`${labResults.passed} or excluded.passed`,
        runs: sql`${labResults.runs} + 1`,
        hintsUsed: sql`greatest(${labResults.hintsUsed}, excluded.hints_used)`,
        solutionViewed: sql`${labResults.solutionViewed} or excluded.solution_viewed`,
        firstPassedAt: sql`coalesce(${labResults.firstPassedAt}, excluded.first_passed_at)`,
        updatedAt: now,
      },
    })
    .returning();
  return toView(stored);
}
