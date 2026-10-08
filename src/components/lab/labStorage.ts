import { parseLevelConfig, type PlayableLevel } from "@/lib/lab/playable";
import type { Direction, LabConfig } from "@/lib/lab/types";

const STORAGE_KEY = "frontend-lab:v1";
const DIRECTIONS = new Set<unknown>(["down", "same", "up"]);

export interface RunRecord {
  previous: LabConfig;
  config: LabConfig;
  prediction: Direction;
  direction: Direction;
  firstPass: boolean;
}

export interface LevelProgress {
  draft: LabConfig;
  applied: LabConfig;
  runs: RunRecord[];
  hintsUsed: number;
  solutionShown: boolean;
  reproduced: boolean;
  solved: boolean;
  bestScore: number;
}

export interface StoredLab {
  currentLevelId: string;
  progress: Record<string, LevelProgress>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function freshProgress(level: PlayableLevel): LevelProgress {
  const defaults = level.simulatorModel.defaults;
  return {
    draft: { ...defaults },
    applied: { ...defaults },
    runs: [],
    hintsUsed: 0,
    solutionShown: false,
    reproduced: false,
    solved: false,
    bestScore: 0,
  };
}

function parseRun(value: unknown, level: PlayableLevel): RunRecord | null {
  if (!isRecord(value)) return null;
  const previous = parseLevelConfig(level, value.previous);
  const config = parseLevelConfig(level, value.config);
  if (!previous || !config) return null;
  if (!DIRECTIONS.has(value.prediction) || !DIRECTIONS.has(value.direction)) return null;
  if (typeof value.firstPass !== "boolean") return null;
  return {
    previous,
    config,
    prediction: value.prediction as Direction,
    direction: value.direction as Direction,
    firstPass: value.firstPass,
  };
}

function parseProgress(value: unknown, level: PlayableLevel): LevelProgress | null {
  if (!isRecord(value) || !Array.isArray(value.runs)) return null;
  const draft = parseLevelConfig(level, value.draft);
  const applied = parseLevelConfig(level, value.applied);
  const runs = value.runs.map((run) => parseRun(run, level));
  const { hintsUsed, bestScore, solutionShown, reproduced, solved } = value;
  if (!draft || !applied || runs.some((run) => run === null)) return null;
  if (typeof hintsUsed !== "number" || hintsUsed < 0 || hintsUsed > level.hints.length) return null;
  if (typeof bestScore !== "number" || bestScore < 0 || bestScore > 100) return null;
  if (typeof solutionShown !== "boolean" || typeof reproduced !== "boolean" || typeof solved !== "boolean") return null;
  return { draft, applied, runs: runs as RunRecord[], hintsUsed, solutionShown, reproduced, solved, bestScore };
}

/** Reads saved progress. Anything that doesn't match the current shape is ignored. */
export function readStoredLab(levelIds: string[], playable: PlayableLevel[]): Partial<StoredLab> | null {
  let parsed: unknown;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;

  const progress: Record<string, LevelProgress> = {};
  const storedProgress = isRecord(parsed.progress) ? parsed.progress : {};
  for (const level of playable) {
    const levelProgress = parseProgress(storedProgress[level.id], level);
    if (levelProgress) progress[level.id] = levelProgress;
  }
  const currentLevelId =
    typeof parsed.currentLevelId === "string" && levelIds.includes(parsed.currentLevelId)
      ? parsed.currentLevelId
      : undefined;
  return { currentLevelId, progress };
}

export function writeStoredLab(stored: StoredLab): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage can be full or blocked; progress then lives for this visit only.
  }
}
