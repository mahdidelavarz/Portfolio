import { formatMs, isolate, readFlag } from "../format.ts";
import type {
  CodeLine,
  Evaluation,
  LabConfig,
  NetworkDetails,
  NetworkRequest,
  Simulator,
} from "../types.ts";

const USER_MS = 1000;
const CATEGORIES_MS = 400;
const PRODUCTS_MS = 900;
const PRODUCTS_WITH_PRICES_MS = 1100;
const PRICES_MS = 500;
const RENDER_MS = 60;
const SPINNER_MS = 30;
const HEADER_RENDER_MS = 10;

const FIELDS = {
  parallel: "parallelRequests",
  pricesWithProducts: "pricesWithProducts",
  userInBackground: "userInBackground",
  spinner: "earlySpinner",
  pricesInParallel: "pricesInParallel",
} as const;

const REQUEST_ORDER = ["user", "categories", "products", "prices"];

function readOptions(config: LabConfig) {
  return {
    parallel: readFlag(config, FIELDS.parallel),
    pricesWithProducts: readFlag(config, FIELDS.pricesWithProducts),
    userInBackground: readFlag(config, FIELDS.userInBackground),
    spinner: readFlag(config, FIELDS.spinner),
    pricesInParallel: readFlag(config, FIELDS.pricesInParallel),
  };
}

function scheduleRequests(config: LabConfig): Map<string, NetworkRequest> {
  const options = readOptions(config);
  const productsMs = options.pricesWithProducts ? PRODUCTS_WITH_PRICES_MS : PRODUCTS_MS;
  const productsLabel = options.pricesWithProducts ? "/products+prices" : "/products";
  const requests = new Map<string, NetworkRequest>();
  const add = (key: string, label: string, start: number, duration: number) =>
    requests.set(key, { key, label, start, end: start + duration, duration });
  const endOf = (key: string) => requests.get(key)?.end ?? 0;

  if (options.parallel) {
    add("user", "/user", 0, USER_MS);
    add("categories", "/categories", 0, CATEGORIES_MS);
    add("products", productsLabel, 0, productsMs);
    const group = ["categories", "products"];
    if (!options.userInBackground) group.push("user");
    if (options.pricesInParallel && !options.pricesWithProducts) {
      add("prices", "/prices", 0, PRICES_MS);
      group.push("prices");
    }
    const groupEnd = Math.max(...group.map(endOf));
    if (!options.pricesWithProducts && !options.pricesInParallel) {
      add("prices", "/prices", groupEnd, PRICES_MS);
    }
    return requests;
  }

  let time = 0;
  add("user", "/user", 0, USER_MS);
  if (!options.userInBackground) time = USER_MS;
  add("categories", "/categories", time, CATEGORIES_MS);
  time += CATEGORIES_MS;
  add("products", productsLabel, time, productsMs);
  if (options.pricesWithProducts) return requests;
  if (options.pricesInParallel) {
    add("prices", "/prices", time, PRICES_MS);
  } else {
    add("prices", "/prices", time + productsMs, PRICES_MS);
  }
  return requests;
}

function findCriticalPath(
  requests: Map<string, NetworkRequest>,
  needed: string[],
): string[] {
  const get = (key: string) => requests.get(key) as NetworkRequest;
  let current = needed.reduce((a, b) => (get(a).end >= get(b).end ? a : b));
  const path = [current];
  while (get(current).start > 0) {
    const predecessor = [...requests.values()].find(
      (request) => request.end === get(current).start && !path.includes(request.key),
    );
    if (!predecessor) break;
    path.unshift(predecessor.key);
    current = predecessor.key;
  }
  return path;
}

function evaluate(config: LabConfig): Evaluation {
  const options = readOptions(config);
  const requests = scheduleRequests(config);
  const needed = ["categories", "products"];
  if (requests.has("prices")) needed.push("prices");
  if (!options.userInBackground) needed.push("user");
  const renderAt = Math.max(...needed.map((key) => requests.get(key)?.end ?? 0));
  const ready = renderAt + RENDER_MS;
  const pricesMissing = options.pricesInParallel && !options.pricesWithProducts;
  const userEnd = requests.get("user")?.end ?? 0;
  const details: NetworkDetails = {
    kind: "network",
    requests: REQUEST_ORDER.flatMap((key) => requests.get(key) ?? []),
    criticalPath: findCriticalPath(requests, needed),
    renderAt,
    ready,
  };

  return {
    metrics: {
      ready,
      feedback: options.spinner ? SPINNER_MS : ready,
      header: options.userInBackground ? userEnd + HEADER_RENDER_MS : ready,
    },
    correct: !pricesMissing,
    checks: [
      { id: "prices-shown", passed: !pricesMissing },
      { id: "header-shown", passed: true },
    ],
    penalty: 0,
    details,
  };
}

function buildCode(config: LabConfig): CodeLine[] {
  const options = readOptions(config);
  const productsCall = options.pricesWithProducts
    ? "api('/products?withPrices=1')"
    : "api('/products')";
  const pricesSeparate = !options.pricesWithProducts;
  const lines: CodeLine[] = [];
  const push = (key: string, text: string) => lines.push({ key, text });

  push("head", "async function loadProductsPage() {");
  if (options.spinner) push("spin", "  showSpinner();");

  if (options.parallel) {
    if (options.userInBackground) push("user", "  const userReq = api('/user');   // not awaited");
    const names = options.userInBackground ? [] : ["user"];
    names.push("categories", "products");
    if (options.pricesInParallel && pricesSeparate) names.push("prices");
    push("group", `  const [${names.join(", ")}] = await Promise.all([`);
    if (!options.userInBackground) push("user", "    api('/user'),");
    push("categories", "    api('/categories'),");
    push("products", `    ${productsCall},`);
    if (options.pricesInParallel && pricesSeparate) push("prices", "    api('/prices', ids(products)),");
    push("group", "  ]);");
    if (pricesSeparate && !options.pricesInParallel) {
      push("prices", "  const prices = await api('/prices', ids(products));");
    }
  } else {
    push(
      "user",
      options.userInBackground
        ? "  const userReq = api('/user');   // not awaited"
        : "  const user = await api('/user');",
    );
    push("categories", "  const categories = await api('/categories');");
    if (options.pricesInParallel && pricesSeparate) {
      push("products", "  const [products, prices] = await Promise.all([");
      push("products", `    ${productsCall},`);
      push("prices", "    api('/prices', ids(products)),");
      push("products", "  ]);");
    } else {
      push("products", `  const products = await ${productsCall};`);
      if (pricesSeparate) push("prices", "  const prices = await api('/prices', ids(products));");
    }
  }

  push("blank", "");
  push(
    "render",
    options.pricesWithProducts
      ? "  render({ categories, products });"
      : "  render({ categories, products, prices });",
  );
  push("header", options.userInBackground ? "  userReq.then(renderHeader);" : "  renderHeader(user);");
  push("end", "}");
  return lines;
}

function describeChange(previous: LabConfig, next: LabConfig): string[] {
  const before = evaluate(previous);
  const after = evaluate(next);
  if (before.details.kind !== "network" || after.details.kind !== "network") return [];
  const beforeRequests = new Map(before.details.requests.map((request) => [request.key, request]));
  const afterRequests = new Map(after.details.requests.map((request) => [request.key, request]));
  const notes: string[] = [];

  for (const key of REQUEST_ORDER) {
    const was = beforeRequests.get(key);
    const now = afterRequests.get(key);
    if (was && !now) notes.push("درخواست `/prices` حذف شد.");
    else if (!was && now) notes.push(`درخواست \`${now.label}\` اضافه شد.`);
    else if (was && now) {
      if (was.duration !== now.duration) {
        notes.push(`\`${now.label}\` حالا ${isolate(formatMs(now.duration))} طول می‌کشه (قبلاً ${isolate(formatMs(was.duration))}).`);
      }
      if (was.start !== now.start) {
        notes.push(`\`${now.label}\` حالا از ${isolate(formatMs(now.start))} شروع می‌شه (قبلاً ${isolate(formatMs(was.start))}).`);
      }
    }
  }

  if (after.metrics.feedback !== before.metrics.feedback && readFlag(next, FIELDS.spinner)) {
    notes.push(`اسپینر از همون ${isolate(formatMs(SPINNER_MS))} اول دیده می‌شه، ولی محصولات هنوز در ${isolate(formatMs(after.details.ready))} می‌رسن.`);
  }
  const path = after.details.criticalPath.map((key) => afterRequests.get(key)?.label ?? key);
  notes.push(`مسیر بحرانی الان: \`${path.join(" → ")} → render\``);
  return notes;
}

export interface PageLoadPlan {
  readyAt: number;
  headerAt: number;
  showsSpinner: boolean;
  pricesMissing: boolean;
  headerWaitsForPage: boolean;
}

/** What the live shop needs to replay a page load for this config. */
export function pageLoadPlan(config: LabConfig): PageLoadPlan {
  const evaluation = evaluate(config);
  const options = readOptions(config);
  return {
    readyAt: evaluation.metrics.ready,
    headerAt: evaluation.metrics.header,
    showsSpinner: options.spinner,
    pricesMissing: !evaluation.correct,
    headerWaitsForPage: !options.userInBackground,
  };
}

function toggleChange(field: string, complexity: number) {
  return {
    complexity,
    isApplied: (config: LabConfig) => readFlag(config, field),
    revert: (config: LabConfig) => ({ ...config, [field]: false }),
  };
}

export const waterfallSimulator: Simulator = {
  key: "waterfall",
  analysis: "network",
  scenario: "reload",
  defaults: {
    [FIELDS.parallel]: false,
    [FIELDS.pricesWithProducts]: false,
    [FIELDS.userInBackground]: false,
    [FIELDS.spinner]: false,
    [FIELDS.pricesInParallel]: false,
  },
  changes: [
    toggleChange(FIELDS.parallel, 1),
    toggleChange(FIELDS.pricesWithProducts, 2),
    toggleChange(FIELDS.userInBackground, 1),
    toggleChange(FIELDS.spinner, 1),
    toggleChange(FIELDS.pricesInParallel, 1),
  ],
  metrics: ["ready", "feedback", "header"],
  lineKeys: ["head", "spin", "user", "categories", "group", "products", "prices", "blank", "render", "header", "end"],
  chartTargets: REQUEST_ORDER.map((key) => `request:${key}`),
  checkIds: ["prices-shown", "header-shown"],
  explanationKeys: ["baseReady"],
  evaluate,
  buildCode,
  describeChange,
  explanationValues: (base) => ({ baseReady: isolate(formatMs(base.metrics.ready)) }),
};
