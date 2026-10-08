import "server-only";

import rawLevels from "@/data/lab-levels.json";
import { validateLabLevels, type LabLevel } from "@/data/lab-validator";
import { toPlayableLevels } from "./playable";
import type { NetworkDetails } from "./types";

const levels = validateLabLevels(rawLevels);

/** All tickets, ordered by number. Plain content only, safe to pass to client components. */
export function getLabLevels(): LabLevel[] {
  return levels;
}

export interface LabShowcaseTicket {
  id: string;
  number: number;
  title: string;
  concept: string;
  metricLabel: string;
  baseValue: number;
  bestValue: number;
}

/** Playable tickets with their starting and best possible primary metric, for the hub page. */
export function getLabShowcase(): LabShowcaseTicket[] {
  return toPlayableLevels(levels).map((level) => ({
    id: level.id,
    number: level.number,
    title: level.title,
    concept: level.concept,
    metricLabel: level.primaryMetric.label,
    baseValue: level.baseline.base.metrics[level.primaryMetric.key],
    bestValue: level.baseline.bestValue,
  }));
}

export interface WaterfallPreview {
  before: NetworkDetails;
  after: NetworkDetails;
  targetMs: number;
  tickets: number;
}

/** The first network ticket as shipped and with its best fix, for the homepage preview. */
export function getWaterfallPreview(): WaterfallPreview | null {
  const playable = toPlayableLevels(levels);
  for (const level of playable) {
    const before = level.baseline.base.details;
    const after = level.baseline.best.details;
    const target = level.targets.find((item) => item.metric === level.primaryMetric.key);
    if (before.kind === "network" && after.kind === "network" && target) {
      return { before, after, targetMs: target.max, tickets: playable.length };
    }
  }
  return null;
}

export function getLabSummary(): { total: number; playable: number } {
  return {
    total: levels.length,
    playable: levels.filter((level) => level.status === "published").length,
  };
}
