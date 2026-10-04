import { getSimulator } from "../lib/lab/simulators/index.ts";
import type { Simulator } from "../lib/lab/types.ts";

export type LabFieldValue = boolean | string;
export type LabLevelStatus = "published" | "locked";
export type LabHintTab = "analysis" | "code";
export type ApproachKind =
  | "optimal"
  | "valid"
  | "partial"
  | "overkill"
  | "symptom"
  | "no-cause"
  | "broken";

export interface LabReporter {
  name: string;
  initials: string;
}

export interface LabTarget {
  metric: string;
  max: number;
  label: string;
}

export interface LabFieldOption {
  value: LabFieldValue;
  label: string;
}

export interface LabFieldCondition {
  field: string;
  equals: LabFieldValue;
}

export interface LabField {
  name: string;
  label: string;
  lineKeys: string[];
  options: LabFieldOption[];
  mono: boolean;
  note: string | null;
  visibleWhen: LabFieldCondition | null;
  requiredMessage: string | null;
}

export type LabHint =
  | { text: string; tab: "code"; lines: string[] }
  | { text: string; tab: "analysis"; chartElement: string };

export interface LabApproach {
  name: string;
  config: Record<string, LabFieldValue>;
  kind: ApproachKind;
}

export interface LabCheck {
  id: string;
  label: string;
  failure: string;
}

export interface PublishedLabLevel {
  id: string;
  slug: string;
  number: number;
  title: string;
  status: "published";
  simulator: string;
  reporter: LabReporter;
  report: string;
  primaryMetric: { key: string; label: string };
  healthLabel: string;
  targets: LabTarget[];
  constraint: string;
  analysis: { title: string; lead: string };
  fields: LabField[];
  hints: LabHint[];
  approaches: LabApproach[];
  checks: LabCheck[];
  concept: string;
  explanation: string[];
}

export interface LockedLabLevel {
  id: string;
  slug: string;
  number: number;
  title: string;
  status: "locked";
  summary: string;
}

export type LabLevel = PublishedLabLevel | LockedLabLevel;

const APPROACH_KINDS = new Set<string>(["optimal", "valid", "partial", "overkill", "symptom", "no-cause", "broken"]);
const PLACEHOLDER_PATTERN = /\{(\w+)\}/g;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string, context: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${context}: ${field} must be a non-empty string.`);
  }
  return value;
}

function optionalString(value: unknown, field: string, context: string): string | null {
  return value === undefined || value === null ? null : requiredString(value, field, context);
}

function positiveNumber(value: unknown, field: string, context: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    throw new Error(`${context}: ${field} must be a positive number.`);
  }
  return value;
}

function fieldValue(value: unknown, field: string, context: string): LabFieldValue {
  if (typeof value !== "boolean" && typeof value !== "string") {
    throw new Error(`${context}: ${field} must be a boolean or a string.`);
  }
  return value;
}

function nonEmptyArray(value: unknown, field: string, context: string): unknown[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${context}: ${field} must be a non-empty array.`);
  }
  return value;
}

function stringList(value: unknown, field: string, context: string): string[] {
  return nonEmptyArray(value, field, context).map((item, index) =>
    requiredString(item, `${field}[${index}]`, context),
  );
}

function assertKnown(values: string[], known: string[], field: string, context: string) {
  const unknown = values.filter((value) => !known.includes(value));
  if (unknown.length) {
    throw new Error(`${context}: ${field} has unknown value(s): ${unknown.join(", ")}.`);
  }
}

function validateField(value: unknown, simulator: Simulator, context: string): LabField {
  if (!isRecord(value)) throw new Error(`${context} must be an object.`);
  const name = requiredString(value.name, "name", context);
  const fieldContext = `${context} (${name})`;
  const lineKeys = stringList(value.lineKeys, "lineKeys", fieldContext);
  assertKnown(lineKeys, simulator.lineKeys, "lineKeys", fieldContext);
  const options = nonEmptyArray(value.options, "options", fieldContext).map((option, index) => {
    const optionContext = `${fieldContext}, option ${index}`;
    if (!isRecord(option)) throw new Error(`${optionContext} must be an object.`);
    return {
      value: fieldValue(option.value, "value", optionContext),
      label: requiredString(option.label, "label", optionContext),
    };
  });
  if (new Set(options.map((option) => option.value)).size !== options.length) {
    throw new Error(`${fieldContext}: option values must be unique.`);
  }
  let visibleWhen: LabFieldCondition | null = null;
  if (value.visibleWhen !== undefined && value.visibleWhen !== null) {
    if (!isRecord(value.visibleWhen)) throw new Error(`${fieldContext}: visibleWhen must be an object.`);
    visibleWhen = {
      field: requiredString(value.visibleWhen.field, "visibleWhen.field", fieldContext),
      equals: fieldValue(value.visibleWhen.equals, "visibleWhen.equals", fieldContext),
    };
  }
  if (value.mono !== undefined && typeof value.mono !== "boolean") {
    throw new Error(`${fieldContext}: mono must be a boolean.`);
  }
  return {
    name,
    label: requiredString(value.label, "label", fieldContext),
    lineKeys,
    options,
    mono: value.mono === true,
    note: optionalString(value.note, "note", fieldContext),
    visibleWhen,
    requiredMessage: optionalString(value.requiredMessage, "requiredMessage", fieldContext),
  };
}

function validateFieldSet(fields: LabField[], simulator: Simulator, context: string) {
  const names = fields.map((field) => field.name);
  const expected = Object.keys(simulator.defaults);
  if (names.length !== expected.length || expected.some((name) => !names.includes(name))) {
    throw new Error(`${context}: fields must be exactly ${expected.join(", ")}.`);
  }
  for (const field of fields) {
    const defaultValue = simulator.defaults[field.name];
    if (defaultValue === null) {
      if (!field.requiredMessage || !field.visibleWhen) {
        throw new Error(`${context}: field ${field.name} starts empty, so it needs visibleWhen and requiredMessage.`);
      }
    } else if (!field.options.some((option) => option.value === defaultValue)) {
      throw new Error(`${context}: default of ${field.name} is not one of its options.`);
    }
    if (field.visibleWhen) {
      const { field: target, equals } = field.visibleWhen;
      const controller = fields.find((item) => item.name === target);
      if (!controller || !controller.options.some((option) => option.value === equals)) {
        throw new Error(`${context}: visibleWhen of ${field.name} points to an unknown field value.`);
      }
    }
  }
}

function validateHint(value: unknown, simulator: Simulator, context: string): LabHint {
  if (!isRecord(value)) throw new Error(`${context} must be an object.`);
  const text = requiredString(value.text, "text", context);
  if (value.tab === "code") {
    const lines = stringList(value.lines, "lines", context);
    assertKnown(lines, simulator.lineKeys, "lines", context);
    return { text, tab: "code", lines };
  }
  if (value.tab === "analysis") {
    const chartElement = requiredString(value.chartElement, "chartElement", context);
    assertKnown([chartElement], simulator.chartTargets, "chartElement", context);
    return { text, tab: "analysis", chartElement };
  }
  throw new Error(`${context}: tab must be "code" or "analysis".`);
}

function validateApproach(value: unknown, fields: LabField[], context: string): LabApproach {
  if (!isRecord(value)) throw new Error(`${context} must be an object.`);
  if (!isRecord(value.config)) throw new Error(`${context}: config must be an object.`);
  const config: Record<string, LabFieldValue> = {};
  for (const [name, raw] of Object.entries(value.config)) {
    const field = fields.find((item) => item.name === name);
    const configValue = fieldValue(raw, `config.${name}`, context);
    if (!field || !field.options.some((option) => option.value === configValue)) {
      throw new Error(`${context}: config.${name} is not a valid field value.`);
    }
    config[name] = configValue;
  }
  const kind = requiredString(value.kind, "kind", context);
  if (!APPROACH_KINDS.has(kind)) throw new Error(`${context}: kind is invalid.`);
  return { name: requiredString(value.name, "name", context), config, kind: kind as ApproachKind };
}

function validateCheck(value: unknown, context: string): LabCheck {
  if (!isRecord(value)) throw new Error(`${context} must be an object.`);
  return {
    id: requiredString(value.id, "id", context),
    label: requiredString(value.label, "label", context),
    failure: requiredString(value.failure, "failure", context),
  };
}

function validateTarget(value: unknown, simulator: Simulator, context: string): LabTarget {
  if (!isRecord(value)) throw new Error(`${context} must be an object.`);
  const metric = requiredString(value.metric, "metric", context);
  assertKnown([metric], simulator.metrics, "metric", context);
  return {
    metric,
    max: positiveNumber(value.max, "max", context),
    label: requiredString(value.label, "label", context),
  };
}

function validatePublished(value: Record<string, unknown>, base: Omit<LockedLabLevel, "status" | "summary">, context: string): PublishedLabLevel {
  const simulatorKey = requiredString(value.simulator, "simulator", context);
  const simulator = getSimulator(simulatorKey);
  if (!simulator) throw new Error(`${context}: simulator "${simulatorKey}" is not registered.`);

  if (!isRecord(value.reporter)) throw new Error(`${context}: reporter must be an object.`);
  if (!isRecord(value.primaryMetric)) throw new Error(`${context}: primaryMetric must be an object.`);
  if (!isRecord(value.analysis)) throw new Error(`${context}: analysis must be an object.`);

  const targets = nonEmptyArray(value.targets, "targets", context).map((target, index) =>
    validateTarget(target, simulator, `${context}, target ${index}`),
  );
  const primaryKey = requiredString(value.primaryMetric.key, "primaryMetric.key", context);
  if (!targets.some((target) => target.metric === primaryKey)) {
    throw new Error(`${context}: primaryMetric.key must be one of the targets.`);
  }
  const fields = nonEmptyArray(value.fields, "fields", context).map((field, index) =>
    validateField(field, simulator, `${context}, field ${index}`),
  );
  validateFieldSet(fields, simulator, context);
  const hints = nonEmptyArray(value.hints, "hints", context).map((hint, index) =>
    validateHint(hint, simulator, `${context}, hint ${index}`),
  );
  const approaches = nonEmptyArray(value.approaches, "approaches", context).map((approach, index) =>
    validateApproach(approach, fields, `${context}, approach ${index}`),
  );
  const checks = nonEmptyArray(value.checks, "checks", context).map((check, index) =>
    validateCheck(check, `${context}, check ${index}`),
  );
  const checkIds = checks.map((check) => check.id);
  if (checkIds.length !== simulator.checkIds.length || simulator.checkIds.some((id) => !checkIds.includes(id))) {
    throw new Error(`${context}: checks must be exactly ${simulator.checkIds.join(", ")}.`);
  }
  const explanation = stringList(value.explanation, "explanation", context);
  const placeholders = explanation.flatMap((paragraph) =>
    [...paragraph.matchAll(PLACEHOLDER_PATTERN)].map((match) => match[1]),
  );
  assertKnown(placeholders, simulator.explanationKeys, "explanation placeholders", context);

  return {
    ...base,
    status: "published",
    simulator: simulatorKey,
    reporter: {
      name: requiredString(value.reporter.name, "reporter.name", context),
      initials: requiredString(value.reporter.initials, "reporter.initials", context),
    },
    report: requiredString(value.report, "report", context),
    primaryMetric: {
      key: primaryKey,
      label: requiredString(value.primaryMetric.label, "primaryMetric.label", context),
    },
    healthLabel: requiredString(value.healthLabel, "healthLabel", context),
    targets,
    constraint: requiredString(value.constraint, "constraint", context),
    analysis: {
      title: requiredString(value.analysis.title, "analysis.title", context),
      lead: requiredString(value.analysis.lead, "analysis.lead", context),
    },
    fields,
    hints,
    approaches,
    checks,
    concept: requiredString(value.concept, "concept", context),
    explanation,
  };
}

function validateLevel(value: unknown, index: number): LabLevel {
  const context = `Lab level at index ${index}`;
  if (!isRecord(value)) throw new Error(`${context} must be an object.`);
  const number = value.number;
  if (typeof number !== "number" || !Number.isInteger(number) || number < 1) {
    throw new Error(`${context}: number must be a positive integer.`);
  }
  const base = {
    id: requiredString(value.id, "id", context),
    slug: requiredString(value.slug, "slug", context),
    number,
    title: requiredString(value.title, "title", context),
  };
  if (value.status === "locked") {
    return { ...base, status: "locked", summary: requiredString(value.summary, "summary", context) };
  }
  if (value.status === "published") return validatePublished(value, base, context);
  throw new Error(`${context}: status must be "published" or "locked".`);
}

export function validateLabLevels(value: unknown): LabLevel[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("lab-levels.json must contain a non-empty array.");
  }
  const levels = value.map(validateLevel);
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const numbers = new Set<number>();

  for (const level of levels) {
    if (ids.has(level.id)) throw new Error(`Duplicate lab id: ${level.id}`);
    if (slugs.has(level.slug)) throw new Error(`Duplicate lab slug: ${level.slug}`);
    if (numbers.has(level.number)) throw new Error(`Duplicate lab number: ${level.number}`);
    ids.add(level.id);
    slugs.add(level.slug);
    numbers.add(level.number);
  }
  if (!levels.some((level) => level.status === "published")) {
    throw new Error("lab-levels.json must contain at least one published level.");
  }

  return levels.sort((a, b) => a.number - b.number);
}
