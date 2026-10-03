export type ConfigValue = boolean | string | null;
export type LabConfig = Record<string, ConfigValue>;
export type Direction = "down" | "same" | "up";

export interface CodeLine {
  key: string;
  text: string;
}

export interface CheckResult {
  id: string;
  passed: boolean;
}

export interface ConfigChange {
  complexity: number;
  isApplied: (config: LabConfig) => boolean;
  revert: (config: LabConfig) => LabConfig;
}

export interface NetworkRequest {
  key: string;
  label: string;
  start: number;
  end: number;
  duration: number;
}

export interface NetworkDetails {
  kind: "network";
  requests: NetworkRequest[];
  criticalPath: string[];
  renderAt: number;
  ready: number;
}

export type SegmentKind =
  | "event"
  | "input"
  | "filter"
  | "stats"
  | "cache"
  | "render"
  | "effect";

export interface ThreadSegment {
  kind: SegmentKind;
  ms: number;
}

export interface ThreadTask {
  start: number;
  duration: number;
  segments: ThreadSegment[];
}

export interface ThreadDetails {
  kind: "thread";
  tasks: ThreadTask[];
  keyTimes: number[];
  keyLabels: string[];
  initialSegments: ThreadSegment[];
}

export type CardState = "clicked" | "rendered" | "skipped" | "hidden";

export interface CardRender {
  state: CardState;
  reason: string;
}

export interface RenderDetails {
  kind: "renders";
  cards: CardRender[];
  renderedCount: number;
}

export type AnalysisDetails = NetworkDetails | ThreadDetails | RenderDetails;
export type AnalysisKind = AnalysisDetails["kind"];
export type ScenarioKind = "reload" | "type" | "click";

export interface Evaluation {
  metrics: Record<string, number>;
  correct: boolean;
  checks: CheckResult[];
  penalty: number;
  details: AnalysisDetails;
}

/**
 * A simulator is the deterministic cost model behind one ticket. It knows the
 * shape of the config, how each config performs and what code it produces.
 * Everything here is pure so it can run on the server as well as the client.
 */
export interface Simulator {
  key: string;
  analysis: AnalysisKind;
  scenario: ScenarioKind;
  defaults: LabConfig;
  changes: ConfigChange[];
  metrics: string[];
  lineKeys: string[];
  chartTargets: string[];
  checkIds: string[];
  explanationKeys: string[];
  evaluate: (config: LabConfig) => Evaluation;
  buildCode: (config: LabConfig) => CodeLine[];
  describeChange: (previous: LabConfig, next: LabConfig) => string[];
  explanationValues: (base: Evaluation, best: Evaluation) => Record<string, string>;
}
