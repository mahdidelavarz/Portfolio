import { formatNumber, isolate, readChoice, readFlag } from "../format.ts";
import type {
  CardRender,
  CodeLine,
  Evaluation,
  LabConfig,
  Simulator,
} from "../types.ts";

export const CARD_COUNT = 60;
export const CLICKED_CARD_INDEX = 4;
export const SECOND_CLICK_OFFSET = 3;

const PAGE_LIMIT = 20;
const CARD_RENDER_MS = 1.2;
const PROP_COMPARE_MS = 0.03;
const GRID_RENDER_MS = 2;
const HEADER_RENDER_MS = 1;

const FIELDS = {
  memo: "memoCard",
  onAdd: "addHandler",
  functional: "functionalUpdate",
  style: "cardStyle",
  paginate: "firstPageOnly",
} as const;

const REASONS = {
  clicked: "inCart تغییر کرد",
  parentRendered: "والد رندر شد",
  freshHandler: "onAdd یه تابع تازه‌ست",
  handlerFollowsCart: "onAdd با عوض شدن cart تازه شد",
  freshStyle: "style یه شیء تازه‌ست",
  skipped: "propها یکسان؛ رد شد",
  hidden: "نمایش داده نمی‌شه",
};

function readOptions(config: LabConfig) {
  return {
    memo: readFlag(config, FIELDS.memo),
    onAdd: readChoice(config, FIELDS.onAdd),
    functional: readFlag(config, FIELDS.functional),
    style: readChoice(config, FIELDS.style),
    paginate: readFlag(config, FIELDS.paginate),
  };
}

export function visibleCardLimit(config: LabConfig): number {
  return readFlag(config, FIELDS.paginate) ? PAGE_LIMIT : CARD_COUNT;
}

/** A stable handler that closes over the first render's cart rebuilds the cart from scratch. */
export function losesCartItems(config: LabConfig): boolean {
  const options = readOptions(config);
  return options.onAdd === "callbackEmpty" && !options.functional;
}

function cardRenders(config: LabConfig, clickedIndex: number): CardRender[] {
  const options = readOptions(config);
  const limit = visibleCardLimit(config);
  return Array.from({ length: CARD_COUNT }, (_, index): CardRender => {
    if (index >= limit) return { state: "hidden", reason: REASONS.hidden };
    if (index === clickedIndex) return { state: "clicked", reason: REASONS.clicked };
    if (!options.memo) return { state: "rendered", reason: REASONS.parentRendered };
    const reasons: string[] = [];
    if (options.onAdd === "inline") reasons.push(REASONS.freshHandler);
    if (options.onAdd === "callbackCart") reasons.push(REASONS.handlerFollowsCart);
    if (options.style === "inline") reasons.push(REASONS.freshStyle);
    return reasons.length
      ? { state: "rendered", reason: reasons.join(" + ") }
      : { state: "skipped", reason: REASONS.skipped };
  });
}

/** Evaluates one click on the card at `clickedIndex`. */
export function evaluateClick(config: LabConfig, clickedIndex: number): Evaluation {
  const options = readOptions(config);
  const cards = cardRenders(config, clickedIndex);
  const limit = visibleCardLimit(config);
  const renderedCount = cards.filter((card) => card.state === "rendered" || card.state === "clicked").length;
  const click =
    GRID_RENDER_MS +
    HEADER_RENDER_MS +
    renderedCount * CARD_RENDER_MS +
    (options.memo ? limit * PROP_COMPARE_MS : 0);
  const staleCart = losesCartItems(config);

  return {
    metrics: { click },
    correct: !staleCart && !options.paginate,
    checks: [
      { id: "cart-count", passed: !staleCart },
      { id: "all-products", passed: !options.paginate },
    ],
    penalty: 0,
    details: { kind: "renders", cards, renderedCount },
  };
}

function evaluate(config: LabConfig): Evaluation {
  return evaluateClick(config, CLICKED_CARD_INDEX);
}

/** Counts the cards that re-rendered alongside the clicked one, grouped by reason. */
export function countRenderReasons(cards: CardRender[]): Array<{ reason: string; count: number }> {
  const counts = new Map<string, number>();
  for (const card of cards) {
    if (card.state === "rendered") counts.set(card.reason, (counts.get(card.reason) ?? 0) + 1);
  }
  return [...counts].map(([reason, count]) => ({ reason, count }));
}

function buildCode(config: LabConfig): CodeLine[] {
  const options = readOptions(config);
  const update = options.functional ? "setCart(c => [...c, id])" : "setCart([...cart, id])";
  const lines: CodeLine[] = [];
  const push = (key: string, text: string) => lines.push({ key, text });

  if (options.style === "hoisted") {
    push("styleConst", "const CARD_STYLE = { padding: 12 };");
    push("blank", "");
  }
  push("grid", "function ProductGrid({ products }) {");
  push("state", "  const [cart, setCart] = useState([]);");
  if (options.onAdd === "inline") {
    push("add", `  const addToCart = (id) => ${update};`);
  } else {
    push("add", "  const addToCart = useCallback(");
    push("add", `    (id) => ${update},`);
    push("add", `    [${options.onAdd === "callbackCart" ? "cart" : ""}]`);
    push("add", "  );");
  }
  push("blank", "");
  push("ret", "  return (");
  push("ret", "    <>");
  push("header", "      <Header cartCount={cart.length} />");
  push("map", options.paginate ? "      {products.slice(0, 20).map(p => (" : "      {products.map(p => (");
  push("use", "        <ProductCard");
  push("use", "          key={p.id}");
  push("use", "          product={p}");
  push("use", "          inCart={cart.includes(p.id)}");
  push("onAdd", options.onAdd === "inline" ? "          onAdd={() => addToCart(p.id)}" : "          onAdd={addToCart}");
  push("style", options.style === "hoisted" ? "          style={CARD_STYLE}" : "          style={{ padding: 12 }}");
  push("use", "        />");
  push("map", "      ))}");
  push("ret", "    </>");
  push("ret", "  );");
  push("grid", "}");
  push("blank", "");
  push("card", options.memo ? "const ProductCard = memo(function ProductCard(props) {" : "function ProductCard(props) {");
  push("cardBody", "  // image, title, price, badges: ~1.2ms per render");
  push("cardBody", "  return <Card {...props} />;");
  push("card", options.memo ? "});" : "}");
  return lines;
}

function describeChange(previous: LabConfig, next: LabConfig): string[] {
  const before = evaluate(previous);
  const after = evaluate(next);
  if (before.details.kind !== "renders" || after.details.kind !== "renders") return [];
  const notes = [
    `با یک کلیک، ${isolate(formatNumber(after.details.renderedCount))} کارت رندر شد (قبلاً ${isolate(formatNumber(before.details.renderedCount))}).`,
  ];
  for (const { reason, count } of countRenderReasons(after.details.cards)) {
    notes.push(`${isolate(formatNumber(count))} کارت دلیلش: ${reason}.`);
  }
  if (readFlag(next, FIELDS.memo) && after.metrics.click > before.metrics.click) {
    notes.push("memo بدون propهای پایدار فقط هزینه‌ی مقایسه رو اضافه کرد.");
  }
  return notes;
}

export interface ClickWork {
  costMs: number;
  cards: CardRender[];
}

/** What a click on the card at `index` costs the live shop for this config. */
export function clickWork(config: LabConfig, index: number): ClickWork {
  const evaluation = evaluateClick(config, index);
  const cards = evaluation.details.kind === "renders" ? evaluation.details.cards : [];
  return { costMs: evaluation.metrics.click, cards };
}

function renderedCountOf(evaluation: Evaluation): number {
  return evaluation.details.kind === "renders" ? evaluation.details.renderedCount : 0;
}

export const renderStormSimulator: Simulator = {
  key: "renderStorm",
  analysis: "renders",
  scenario: "click",
  defaults: {
    [FIELDS.memo]: false,
    [FIELDS.onAdd]: "inline",
    [FIELDS.functional]: false,
    [FIELDS.style]: "inline",
    [FIELDS.paginate]: false,
  },
  changes: [
    { complexity: 1, isApplied: (config) => readFlag(config, FIELDS.memo), revert: (config) => ({ ...config, [FIELDS.memo]: false }) },
    { complexity: 1, isApplied: (config) => config[FIELDS.onAdd] !== "inline", revert: (config) => ({ ...config, [FIELDS.onAdd]: "inline" }) },
    { complexity: 0.5, isApplied: (config) => readFlag(config, FIELDS.functional), revert: (config) => ({ ...config, [FIELDS.functional]: false }) },
    { complexity: 0.5, isApplied: (config) => config[FIELDS.style] === "hoisted", revert: (config) => ({ ...config, [FIELDS.style]: "inline" }) },
    { complexity: 1, isApplied: (config) => readFlag(config, FIELDS.paginate), revert: (config) => ({ ...config, [FIELDS.paginate]: false }) },
  ],
  metrics: ["click"],
  lineKeys: ["styleConst", "blank", "grid", "state", "add", "ret", "header", "map", "use", "onAdd", "style", "card", "cardBody"],
  chartTargets: ["render:cells"],
  checkIds: ["cart-count", "all-products"],
  explanationKeys: ["baseRendered", "cardCount", "bestRendered"],
  evaluate,
  buildCode,
  describeChange,
  explanationValues: (base, best) => ({
    baseRendered: isolate(formatNumber(renderedCountOf(base))),
    cardCount: isolate(formatNumber(CARD_COUNT)),
    bestRendered: isolate(formatNumber(renderedCountOf(best))),
  }),
};
