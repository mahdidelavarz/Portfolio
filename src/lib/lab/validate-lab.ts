import rawLevels from "../../data/lab-levels.json" with { type: "json" };
import { validateLabLevels } from "../../data/lab-validator.ts";
import { formatMs } from "./format.ts";
import { scoreConfig, toPlayableLevels, type PlayableLevel } from "./playable.ts";
import { withDefaults } from "./engine.ts";
import type { ConfigValue } from "./types.ts";

interface Expectation {
  label: string;
  config: Record<string, ConfigValue>;
  score: number;
  passed?: boolean;
  failedCheck?: string;
  primaryValue?: number;
}

const failures: string[] = [];

function expectEqual(context: string, actual: unknown, expected: unknown) {
  if (actual !== expected) failures.push(`${context}: expected ${String(expected)}, got ${String(actual)}`);
}

function checkLevel(level: PlayableLevel, expectations: Expectation[]) {
  for (const expectation of expectations) {
    const context = `${level.id} ${expectation.label}`;
    const result = scoreConfig(level, withDefaults(level.simulatorModel, expectation.config));
    expectEqual(`${context} score`, result.score, expectation.score);
    if (expectation.passed !== undefined) expectEqual(`${context} passed`, result.passed, expectation.passed);
    if (expectation.failedCheck) {
      const check = result.evaluation.checks.find((item) => item.id === expectation.failedCheck);
      expectEqual(`${context} check ${expectation.failedCheck} passed`, check?.passed, false);
    }
    if (expectation.primaryValue !== undefined) {
      expectEqual(
        `${context} ${level.primaryMetric.key}`,
        Math.round(result.evaluation.metrics[level.primaryMetric.key]),
        expectation.primaryValue,
      );
    }
  }
}

const levels = validateLabLevels(rawLevels);
const playable = new Map(toPlayableLevels(levels).map((level) => [level.id, level]));
const level = (id: string) => {
  const found = playable.get(id);
  if (!found) throw new Error(`Level ${id} is not playable.`);
  return found;
};

const waterfall = level("l1");
expectEqual("l1 base ready", waterfall.baseline.base.metrics.ready, 2860);
expectEqual("l1 best ready", waterfall.baseline.bestValue, 1160);
checkLevel(waterfall, [
  { label: "{A,B}", config: { parallelRequests: true, pricesWithProducts: true }, score: 100 },
  { label: "{A,C}", config: { parallelRequests: true, userInBackground: true }, score: 82 },
  { label: "{A}", config: { parallelRequests: true }, score: 60, passed: false },
  { label: "{A,B,C}", config: { parallelRequests: true, pricesWithProducts: true, userInBackground: true }, score: 92 },
  { label: "{D}", config: { earlySpinner: true }, score: 0 },
  { label: "{A,E}", config: { parallelRequests: true, pricesInParallel: true }, score: 0, failedCheck: "prices-shown" },
]);

const repeated = level("l4");
expectEqual("l4 base input", repeated.baseline.base.metrics.input, 91);
checkLevel(repeated, [
  { label: "memo+[products]", config: { statsStrategy: "memo", memoDeps: "products" }, score: 100 },
  { label: "child", config: { statsStrategy: "child" }, score: 95 },
  { label: "effect", config: { statsStrategy: "effect" }, score: 80 },
  { label: "debounce", config: { debounceSearch: true }, score: 60, passed: false },
  { label: "memo+[products,query]", config: { statsStrategy: "memo", memoDeps: "products_query" }, score: 0 },
  { label: "memoFilter", config: { memoizeFilter: true }, score: 0 },
  { label: "memo+[]", config: { statsStrategy: "memo", memoDeps: "empty" }, score: 0, failedCheck: "stats-refresh" },
]);

const renders = level("l9");
expectEqual("l9 base click", renders.baseline.base.metrics.click, 75);
checkLevel(renders, [
  {
    label: "memo+cbEmpty+functional+hoisted",
    config: { memoCard: true, addHandler: "callbackEmpty", functionalUpdate: true, cardStyle: "hoisted" },
    score: 100,
  },
  { label: "memo alone", config: { memoCard: true }, score: 0, primaryValue: 77 },
  {
    label: "cbEmpty without functional",
    config: { memoCard: true, addHandler: "callbackEmpty", cardStyle: "hoisted" },
    score: 0,
    failedCheck: "cart-count",
  },
  { label: "paginate", config: { firstPageOnly: true }, score: 0, failedCheck: "all-products" },
]);

if (failures.length) {
  console.error(`Lab validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(
  `Validated ${levels.length} lab level(s), ${playable.size} playable. ` +
    `l1 ${formatMs(waterfall.baseline.base.metrics.ready)} → ${formatMs(waterfall.baseline.bestValue)}.`,
);
