import type { LabField, LabTarget } from "../../data/lab-validator.ts";
import type { ConfigValue, Direction, Evaluation, LabConfig, Simulator } from "./types.ts";

const SAME_VALUE_TOLERANCE = 0.5;
const BEST_TIE_TOLERANCE = 0.01;
const PENALTY_RANK_OFFSET = 1000;
const WASTE_COST = 8;
const EXTRA_COMPLEXITY_COST = 5;
const FAILED_TARGET_CAP = 60;
const DIRECTION_THRESHOLD = 0.03;

export interface ScoringLevel {
  simulator: Simulator;
  fields: LabField[];
  targets: LabTarget[];
  primaryMetric: { key: string };
}

export interface LevelBaseline {
  base: Evaluation;
  best: Evaluation;
  bestConfig: LabConfig;
  bestValue: number;
  bestComplexity: number;
}

export interface ScoreResult {
  score: number;
  evaluation: Evaluation;
  passed: boolean;
  wastedComplexity: number;
}

export type DiffOperation = "same" | "added" | "removed" | "gap";

export interface DiffLine {
  operation: DiffOperation;
  text: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function withDefaults(simulator: Simulator, partial: Record<string, ConfigValue>): LabConfig {
  return { ...simulator.defaults, ...partial };
}

export function configsEqual(a: LabConfig, b: LabConfig): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].every((key) => (a[key] ?? null) === (b[key] ?? null));
}

export function isFieldVisible(field: LabField, config: LabConfig): boolean {
  return !field.visibleWhen || config[field.visibleWhen.field] === field.visibleWhen.equals;
}

/** Returns the message of the first visible field that still needs a value. */
export function validateDraft(fields: LabField[], config: LabConfig): string | null {
  const missing = fields.find(
    (field) => field.requiredMessage && isFieldVisible(field, config) && config[field.name] === null,
  );
  return missing?.requiredMessage ?? null;
}

/** Every combination of field options, in the simulator's field order. */
export function enumerateConfigs(level: ScoringLevel): LabConfig[] {
  let configs: LabConfig[] = [{}];
  for (const name of Object.keys(level.simulator.defaults)) {
    const field = level.fields.find((item) => item.name === name);
    const values = field ? field.options.map((option) => option.value) : [level.simulator.defaults[name]];
    configs = configs.flatMap((config) => values.map((value) => ({ ...config, [name]: value })));
  }
  return configs;
}

export function complexityOf(simulator: Simulator, config: LabConfig): number {
  return simulator.changes.reduce(
    (total, change) => total + (change.isApplied(config) ? change.complexity : 0),
    0,
  );
}

export function meetsTargets(targets: LabTarget[], evaluation: Evaluation): boolean {
  return targets.every((target) => evaluation.metrics[target.metric] <= target.max);
}

export function computeBaseline(level: ScoringLevel): LevelBaseline {
  const { simulator } = level;
  const primary = level.primaryMetric.key;
  let best: { rank: number; complexity: number; config: LabConfig } | null = null;

  for (const config of enumerateConfigs(level)) {
    if (validateDraft(level.fields, config)) continue;
    const evaluation = simulator.evaluate(config);
    if (!evaluation.correct || !meetsTargets(level.targets, evaluation)) continue;
    const rank = evaluation.metrics[primary] + (evaluation.penalty ? PENALTY_RANK_OFFSET : 0);
    const complexity = complexityOf(simulator, config);
    const isBetter =
      !best ||
      rank < best.rank - BEST_TIE_TOLERANCE ||
      (Math.abs(rank - best.rank) < BEST_TIE_TOLERANCE && complexity < best.complexity);
    if (isBetter) best = { rank, complexity, config };
  }
  if (!best) throw new Error(`Simulator ${simulator.key} has no passing config.`);

  const bestEvaluation = simulator.evaluate(best.config);
  return {
    base: simulator.evaluate(simulator.defaults),
    best: bestEvaluation,
    bestConfig: best.config,
    bestValue: bestEvaluation.metrics[primary],
    bestComplexity: best.complexity,
  };
}

/**
 * Optimality of a config from 0 to 100: how much of the possible improvement it
 * captured, minus changes that had no effect, extra complexity beyond the best
 * solution and the simulator's own penalty. Missing a target caps it at 60.
 */
export function scoreOf(level: ScoringLevel, baseline: LevelBaseline, config: LabConfig): ScoreResult {
  const { simulator } = level;
  const primary = level.primaryMetric.key;
  const evaluation = simulator.evaluate(config);
  if (!evaluation.correct) return { score: 0, evaluation, passed: false, wastedComplexity: 0 };

  const baseValue = baseline.base.metrics[primary];
  const value = evaluation.metrics[primary];
  const quality = clamp((baseValue - value) / (baseValue - baseline.bestValue), 0, 1);

  let wastedComplexity = 0;
  for (const change of simulator.changes) {
    if (!change.isApplied(config)) continue;
    const without = simulator.evaluate(change.revert(config));
    const sameResult = Math.abs(without.metrics[primary] - value) < SAME_VALUE_TOLERANCE;
    const removesPenalty = evaluation.penalty === 0 && without.penalty > 0;
    if (without.correct && sameResult && !removesPenalty) wastedComplexity += change.complexity;
  }

  const extraComplexity =
    quality > 0.99
      ? Math.max(0, complexityOf(simulator, config) - wastedComplexity - baseline.bestComplexity) * EXTRA_COMPLEXITY_COST
      : 0;
  let score = quality * 100 - wastedComplexity * WASTE_COST - extraComplexity - evaluation.penalty;
  const passed = meetsTargets(level.targets, evaluation);
  if (!passed) score = Math.min(score, FAILED_TARGET_CAP);

  return { score: Math.round(clamp(score, 0, 100)), evaluation, passed, wastedComplexity };
}

export function runDirection(previousValue: number, nextValue: number): Direction {
  const relative = (nextValue - previousValue) / previousValue;
  if (relative < -DIRECTION_THRESHOLD) return "down";
  if (relative > DIRECTION_THRESHOLD) return "up";
  return "same";
}

/** Line diff (LCS) that keeps changed lines plus one line of context around them. */
export function lineDiff(before: string[], after: string[]): DiffLine[] {
  const rows = before.length;
  const columns = after.length;
  const common = Array.from({ length: rows + 1 }, () => new Array<number>(columns + 1).fill(0));
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = columns - 1; j >= 0; j--) {
      common[i][j] = before[i] === after[j]
        ? common[i + 1][j + 1] + 1
        : Math.max(common[i + 1][j], common[i][j + 1]);
    }
  }

  const full: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < rows && j < columns) {
    if (before[i] === after[j]) {
      full.push({ operation: "same", text: before[i] });
      i++;
      j++;
    } else if (common[i + 1][j] >= common[i][j + 1]) {
      full.push({ operation: "removed", text: before[i++] });
    } else {
      full.push({ operation: "added", text: after[j++] });
    }
  }
  while (i < rows) full.push({ operation: "removed", text: before[i++] });
  while (j < columns) full.push({ operation: "added", text: after[j++] });

  const isChange = (index: number) => full[index] !== undefined && full[index].operation !== "same";
  const result: DiffLine[] = [];
  let skipped = false;
  full.forEach((line, index) => {
    if (isChange(index) || isChange(index - 1) || isChange(index + 1)) {
      if (skipped && result.length) result.push({ operation: "gap", text: "" });
      result.push(line);
      skipped = false;
    } else {
      skipped = true;
    }
  });
  return result;
}
