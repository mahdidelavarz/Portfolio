import "server-only";

import rawLevels from "@/data/lab-levels.json";
import { validateLabLevels, type LabLevel } from "@/data/lab-validator";
import { toPlayableLevels } from "./playable";

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

export function getLabSummary(): { total: number; playable: number } {
  return {
    total: levels.length,
    playable: levels.filter((level) => level.status === "published").length,
  };
}
