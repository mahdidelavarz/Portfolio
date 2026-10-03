import { formatMs, isolate, readChoice, readFlag } from "../format.ts";
import type {
  CodeLine,
  Evaluation,
  LabConfig,
  SegmentKind,
  Simulator,
  ThreadSegment,
  ThreadTask,
} from "../types.ts";

export const TYPED_TEXT = "کفش چرم";
export const KEY_GAP_MS = 110;
export const DEBOUNCE_MS = 300;

const TYPED_KEYS = [...TYPED_TEXT];
const STATS_MS = 80;
const FILTER_MS = 6;
const ROWS_RENDER_MS = 4;
const EVENT_MS = 1;
const INPUT_MS = 1;
const EFFECT_PENALTY = 15;

const FIELDS = {
  stats: "statsStrategy",
  deps: "memoDeps",
  debounce: "debounceSearch",
  memoFilter: "memoizeFilter",
} as const;

type Phase = "initial" | "keystroke";

function readOptions(config: LabConfig) {
  return {
    stats: readChoice(config, FIELDS.stats),
    deps: readChoice(config, FIELDS.deps),
    debounce: readFlag(config, FIELDS.debounce),
    memoFilter: readFlag(config, FIELDS.memoFilter),
  };
}

function sumMs(segments: ThreadSegment[]): number {
  return segments.reduce((total, segment) => total + segment.ms, 0);
}

function statsCost(config: LabConfig, phase: Phase): ThreadSegment {
  const { stats, deps } = readOptions(config);
  if (stats === "memo") {
    return phase === "initial" || deps === "products_query"
      ? { kind: "stats", ms: STATS_MS + 0.1 }
      : { kind: "cache", ms: 0.1 };
  }
  if (stats === "effect") return { kind: "stats", ms: 0 };
  if (stats === "child") {
    return phase === "initial"
      ? { kind: "stats", ms: STATS_MS + 0.2 }
      : { kind: "cache", ms: 0.15 };
  }
  return { kind: "stats", ms: STATS_MS };
}

function renderSegments(config: LabConfig, phase: Phase): ThreadSegment[] {
  const { stats, memoFilter } = readOptions(config);
  const segments: ThreadSegment[] = [
    { kind: "event", ms: EVENT_MS },
    { kind: "filter", ms: FILTER_MS + (memoFilter ? 0.1 : 0) },
  ];
  const statsSegment = statsCost(config, phase);
  if (statsSegment.ms > 0) segments.push(statsSegment);
  segments.push({ kind: "render", ms: ROWS_RENDER_MS });
  if (phase === "initial" && stats === "effect") {
    segments.push({ kind: "effect", ms: STATS_MS });
    segments.push({ kind: "render", ms: ROWS_RENDER_MS + 1 });
  }
  return segments;
}

function evaluate(config: LabConfig): Evaluation {
  const { stats, deps, debounce } = readOptions(config);
  const keyTimes = TYPED_KEYS.map((_, index) => index * KEY_GAP_MS);
  const lastKey = keyTimes[keyTimes.length - 1];
  const keystroke = renderSegments(config, "keystroke");
  const tasks: ThreadTask[] = [];
  const latencies: number[] = [];
  let busyUntil = 0;
  const addTask = (start: number, segments: ThreadSegment[]) => {
    const duration = sumMs(segments);
    tasks.push({ start, duration, segments });
    busyUntil = start + duration;
  };

  if (debounce) {
    for (const time of keyTimes) {
      addTask(Math.max(time, busyUntil), [{ kind: "input", ms: INPUT_MS }]);
      latencies.push(busyUntil - time);
    }
    addTask(Math.max(lastKey + DEBOUNCE_MS, busyUntil), keystroke);
  } else {
    for (const time of keyTimes) {
      addTask(Math.max(time, busyUntil), keystroke);
      latencies.push(busyUntil - time);
    }
  }

  const initialSegments = renderSegments(config, "initial");
  const statsFrozen = stats === "memo" && deps === "empty";

  return {
    metrics: {
      input: Math.max(...latencies),
      results: busyUntil - lastKey,
      initial: sumMs(initialSegments),
    },
    correct: !statsFrozen,
    checks: [
      { id: "stats-refresh", passed: !statsFrozen },
      { id: "results-match", passed: true },
    ],
    penalty: stats === "effect" ? EFFECT_PENALTY : 0,
    details: {
      kind: "thread",
      tasks,
      keyTimes,
      keyLabels: TYPED_KEYS,
      initialSegments,
    },
  };
}

function depsText(deps: LabConfig[string]): string {
  if (deps === "empty") return "";
  if (deps === "products") return "products";
  if (deps === "products_query") return "products, query";
  return "/* ? */";
}

function buildCode(config: LabConfig): CodeLine[] {
  const { stats, deps, debounce, memoFilter } = readOptions(config);
  const query = debounce ? "debounced" : "query";
  const lines: CodeLine[] = [];
  const push = (key: string, text: string) => lines.push({ key, text });

  push("head", "function ProductsPage({ products }) {");
  push("state", "  const [query, setQuery] = useState('');");
  if (debounce) push("debounce", "  const debounced = useDebounce(query, 300);");
  if (stats === "direct") push("stats", "  const stats = calculateStatistics(products);");
  if (stats === "memo") {
    push("stats", "  const stats = useMemo(");
    push("stats", "    () => calculateStatistics(products),");
    push("stats", `    [${depsText(deps)}]`);
    push("stats", "  );");
  }
  if (stats === "effect") {
    push("stats", "  const [stats, setStats] = useState(null);");
    push("stats", "  useEffect(() => {");
    push("stats", "    setStats(calculateStatistics(products));");
    push("stats", "  }, [products]);");
  }
  if (memoFilter) {
    push("filter", "  const filtered = useMemo(() =>");
    push("filter", `    products.filter(p => p.name.includes(${query})),`);
    push("filter", `    [products, ${query}]);`);
  } else {
    push("filter", "  const filtered = products.filter(p =>");
    push("filter", `    p.name.includes(${query}));`);
  }
  push("blank", "");
  push("ret", "  return (");
  push("ret", "    <>");
  push("search", "      <SearchBox value={query} onChange={setQuery} />");
  push(
    "statsbar",
    stats === "child"
      ? "      <StatsPanel products={products} />"
      : "      <StatsBar stats={stats} />",
  );
  push("grid", "      <ProductGrid items={filtered} />");
  push("ret", "    </>");
  push("ret", "  );");
  push("end", "}");
  if (stats === "child") {
    push("blank", "");
    push("child", "const StatsPanel = memo(({ products }) =>");
    push("child", "  <StatsBar stats={calculateStatistics(products)} />");
    push("child", ");");
  }
  return lines;
}

const SEGMENT_NAMES: Record<SegmentKind, string> = {
  event: "رویداد",
  input: "ورودی",
  filter: "فیلتر",
  stats: "calculateStatistics",
  cache: "کش",
  render: "رندر",
  effect: "effect",
};

function describeChange(previous: LabConfig, next: LabConfig): string[] {
  const before = evaluate(previous);
  const after = evaluate(next);
  if (after.details.kind !== "thread") return [];
  const options = readOptions(next);
  const lastTask = after.details.tasks[after.details.tasks.length - 1];
  const hasStats = lastTask.segments.some((segment) => segment.kind === "stats");
  const hasCache = lastTask.segments.some((segment) => segment.kind === "cache");
  const parts = lastTask.segments.map(
    (segment) => `${SEGMENT_NAMES[segment.kind]} ${isolate(formatMs(segment.ms))}`,
  );
  const notes = [`هر بار رندر صفحه: ${parts.join("، ")}.`];

  if (hasStats && options.stats === "memo") {
    notes.push("useMemo هست، ولی `calculateStatistics` هنوز با هر کلید اجرا شد چون یکی از وابستگی‌هاش با هر کلید عوض می‌شه.");
  } else if (hasStats) {
    notes.push("`calculateStatistics` با هر کلید از اول اجرا شد، در حالی که products عوض نشده بود.");
  }
  if (hasCache) notes.push("`calculateStatistics` روی کلیدها اجرا نشد. مقدار قبلی برگردونده شد.");
  if (options.debounce) {
    notes.push(`کاراکترها فوری نمایش داده شدن، ولی نتیجه‌ها ${isolate(formatMs(after.metrics.results))} بعد از آخرین کلید اومدن.`);
  }
  if (options.memoFilter) {
    notes.push("useMemo روی فیلتر کاری نکرد: query با هر کلید عوض می‌شه، پس کش هیچ‌وقت استفاده نشد و فقط هزینه‌ی مقایسه اضافه شد.");
  }
  if (after.metrics.initial !== before.metrics.initial) {
    notes.push(`اولین رندر صفحه: ${isolate(formatMs(after.metrics.initial))} (قبلاً ${isolate(formatMs(before.metrics.initial))}).`);
  } else {
    notes.push(`اولین رندر صفحه هنوز ${isolate(formatMs(after.metrics.initial))} طول می‌کشه.`);
  }
  if (options.stats === "effect") {
    notes.push("useEffect یه رندر اضافه در بارگذاری اول ساخت و آمار برای یه لحظه خالی نمایش داده شد.");
  }
  return notes;
}

export interface KeystrokeWork {
  debounced: boolean;
  workMs: number;
  inputMs: number;
}

/** What one keystroke costs the live shop's main thread for this config. */
export function keystrokeWork(config: LabConfig): KeystrokeWork {
  return {
    debounced: readOptions(config).debounce,
    workMs: sumMs(renderSegments(config, "keystroke")),
    inputMs: INPUT_MS,
  };
}

export function freezesStats(config: LabConfig): boolean {
  const { stats, deps } = readOptions(config);
  return stats === "memo" && deps === "empty";
}

export const repeatedCalculationSimulator: Simulator = {
  key: "repeatedCalculation",
  analysis: "thread",
  scenario: "type",
  defaults: {
    [FIELDS.stats]: "direct",
    [FIELDS.deps]: null,
    [FIELDS.debounce]: false,
    [FIELDS.memoFilter]: false,
  },
  changes: [
    { complexity: 1, isApplied: (config) => config[FIELDS.stats] === "memo", revert: (config) => ({ ...config, [FIELDS.stats]: "direct" }) },
    { complexity: 2, isApplied: (config) => config[FIELDS.stats] === "effect", revert: (config) => ({ ...config, [FIELDS.stats]: "direct" }) },
    { complexity: 2, isApplied: (config) => config[FIELDS.stats] === "child", revert: (config) => ({ ...config, [FIELDS.stats]: "direct" }) },
    { complexity: 1, isApplied: (config) => readFlag(config, FIELDS.debounce), revert: (config) => ({ ...config, [FIELDS.debounce]: false }) },
    { complexity: 1, isApplied: (config) => readFlag(config, FIELDS.memoFilter), revert: (config) => ({ ...config, [FIELDS.memoFilter]: false }) },
  ],
  metrics: ["input", "results", "initial"],
  lineKeys: ["head", "state", "debounce", "stats", "filter", "blank", "ret", "search", "statsbar", "grid", "end", "child"],
  chartTargets: ["thread:first-task"],
  checkIds: ["stats-refresh", "results-match"],
  explanationKeys: ["statsCost", "bestInitial"],
  evaluate,
  buildCode,
  describeChange,
  explanationValues: (_base, best) => ({
    statsCost: isolate(formatMs(STATS_MS)),
    bestInitial: isolate(formatMs(best.metrics.initial)),
  }),
};
