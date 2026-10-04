import type { LabApproach, LabLevel, PublishedLabLevel } from "../../data/lab-validator.ts";
import {
  computeBaseline,
  scoreOf,
  withDefaults,
  type LevelBaseline,
  type ScoreResult,
  type ScoringLevel,
} from "./engine.ts";
import { getSimulator } from "./simulators/index.ts";
import type { LabConfig, Simulator } from "./types.ts";

export type PlayableLevel = PublishedLabLevel & {
  simulatorModel: Simulator;
  baseline: LevelBaseline;
};

const PLACEHOLDER_PATTERN = /\{(\w+)\}/g;
const playableCache = new Map<string, PlayableLevel>();

/**
 * Joins validated level content with its simulator. Content is plain JSON so it
 * can cross the server/client boundary; the join happens wherever it is needed.
 */
export function toPlayableLevel(level: PublishedLabLevel): PlayableLevel {
  const cached = playableCache.get(level.id);
  if (cached && cached.slug === level.slug) return cached;
  const simulatorModel = getSimulator(level.simulator);
  if (!simulatorModel) throw new Error(`Simulator "${level.simulator}" is not registered.`);
  const playable: PlayableLevel = {
    ...level,
    simulatorModel,
    baseline: computeBaseline({ ...level, simulator: simulatorModel }),
  };
  playableCache.set(level.id, playable);
  return playable;
}

export function toPlayableLevels(levels: LabLevel[]): PlayableLevel[] {
  return levels.flatMap((level) => (level.status === "published" ? [toPlayableLevel(level)] : []));
}

/** The engine's view of a playable level. */
export function scoringLevel(level: PlayableLevel): ScoringLevel {
  return { simulator: level.simulatorModel, fields: level.fields, targets: level.targets, primaryMetric: level.primaryMetric };
}

export function scoreConfig(level: PlayableLevel, config: LabConfig): ScoreResult {
  return scoreOf(scoringLevel(level), level.baseline, config);
}

export function configFromApproach(level: PlayableLevel, approach: LabApproach): LabConfig {
  return withDefaults(level.simulatorModel, approach.config);
}

export function fillExplanation(level: PlayableLevel): string[] {
  const values = level.simulatorModel.explanationValues(level.baseline.base, level.baseline.best);
  return level.explanation.map((paragraph) =>
    paragraph.replace(PLACEHOLDER_PATTERN, (match, key: string) => values[key] ?? match),
  );
}
