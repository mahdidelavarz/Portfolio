"use client";

import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { formatMs, isolate } from "@/lib/lab/format";
import {
  catalogStats,
  createStockProduct,
  getCatalog,
  type CatalogStats,
  type ShopProduct,
} from "@/lib/lab/shopCatalog";
import { getSimulator } from "@/lib/lab/simulators";
import {
  CLICKED_CARD_INDEX,
  SECOND_CLICK_OFFSET,
  clickWork,
  losesCartItems,
  visibleCardLimit,
} from "@/lib/lab/simulators/renderStorm";
import {
  DEBOUNCE_MS,
  KEY_GAP_MS,
  TYPED_TEXT,
  freezesStats,
  keystrokeWork,
} from "@/lib/lab/simulators/repeatedCalculation";
import { pageLoadPlan } from "@/lib/lab/simulators/waterfall";
import type { LabConfig, ScenarioKind } from "@/lib/lab/types";

export type CardFlash = "clicked" | "rendered";
export type ProgressPhase = "idle" | "loading" | "done";

export interface ShopState {
  loaded: boolean;
  userVisible: boolean;
  showSpinner: boolean;
  pricesMissing: boolean;
  query: string;
  shownQuery: string;
  addedProducts: ShopProduct[];
  statsSnapshot: CatalogStats | null;
  cart: number[];
  flashes: Record<number, CardFlash>;
  timerText: string;
  progressWidth: number;
  progressPhase: ProgressPhase;
  highlightRenders: boolean;
}

const PROGRESS_TICK_MS = 50;
const PROGRESS_CAP = 92;
const LOAD_POLL_MS = 60;
const FLASH_MS = 650;
const TYPING_START_MS = 250;
const FIRST_CLICK_MS = 300;
const SECOND_CLICK_MS = 1100;

const initialShop: ShopState = {
  loaded: false,
  userVisible: false,
  showSpinner: false,
  pricesMissing: false,
  query: "",
  shownQuery: "",
  addedProducts: [],
  statsSnapshot: null,
  cart: [],
  flashes: {},
  timerText: "",
  progressWidth: 0,
  progressPhase: "idle",
  highlightRenders: false,
};

/** Blocks the main thread on purpose: this is the cost the ticket asks the learner to remove. */
function busyWait(ms: number) {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    // spin
  }
}

function filterProducts(state: ShopState, limit: number): ShopProduct[] {
  return state.addedProducts
    .concat(getCatalog())
    .filter((product) => product.name.includes(state.shownQuery))
    .slice(0, limit);
}

export type ShopConfigs = Record<string, LabConfig>;

/** Shop state lives outside React state so typing re-renders only the shop, not the whole lab. */
export interface ShopStore {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => ShopState;
}

function configFor(configs: ShopConfigs, simulatorKey: string): LabConfig {
  return configs[simulatorKey] ?? getSimulator(simulatorKey)?.defaults ?? {};
}

/**
 * The live shop. Every behavior reads the config the learner last ran for the
 * matching simulator and applies its cost for real: delayed responses for the
 * page load, a busy main thread for typing and clicking.
 */
export function useShopRuntime(configs: ShopConfigs, highlightByDefault: boolean) {
  const shopRef = useRef(initialShop);
  const listeners = useRef(new Set<() => void>());
  const configsRef = useRef(configs);
  const timers = useRef(new Set<number>());
  const intervals = useRef(new Set<number>());
  const debounceTimer = useRef<number | null>(null);
  const flashTimer = useRef<number | null>(null);
  const userHighlight = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    configsRef.current = configs;
  }, [configs]);

  const update = useCallback((patch: Partial<ShopState> | ((state: ShopState) => Partial<ShopState>)) => {
    const changes = typeof patch === "function" ? patch(shopRef.current) : patch;
    shopRef.current = { ...shopRef.current, ...changes };
    listeners.current.forEach((listener) => listener());
  }, []);

  const store = useMemo<ShopStore>(
    () => ({
      subscribe: (listener) => {
        listeners.current.add(listener);
        return () => listeners.current.delete(listener);
      },
      getSnapshot: () => shopRef.current,
    }),
    [],
  );

  const schedule = useCallback((callback: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      callback();
    }, ms);
    timers.current.add(id);
  }, []);

  const repeat = useCallback((callback: () => void, ms: number) => {
    const id = window.setInterval(callback, ms);
    intervals.current.add(id);
    return () => {
      window.clearInterval(id);
      intervals.current.delete(id);
    };
  }, []);

  const clearAll = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    intervals.current.forEach((id) => window.clearInterval(id));
    timers.current.clear();
    intervals.current.clear();
    if (debounceTimer.current !== null) window.clearTimeout(debounceTimer.current);
    if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
    debounceTimer.current = null;
    flashTimer.current = null;
  }, []);

  const reload = useCallback(() => {
    clearAll();
    const plan = pageLoadPlan(configFor(configsRef.current, "waterfall"));
    update({
      loaded: false,
      userVisible: false,
      showSpinner: plan.showsSpinner,
      query: "",
      shownQuery: "",
      timerText: "",
      progressWidth: 0,
      progressPhase: "loading",
    });
    const startedAt = performance.now();
    const stopProgress = repeat(() => {
      const elapsed = performance.now() - startedAt;
      update({
        timerText: isolate(formatMs(elapsed)),
        progressWidth: Math.min(PROGRESS_CAP, (elapsed / plan.readyAt) * PROGRESS_CAP),
      });
    }, PROGRESS_TICK_MS);
    schedule(() => update({ userVisible: true }), plan.headerAt);
    schedule(() => {
      stopProgress();
      update((state) => ({
        loaded: true,
        pricesMissing: plan.pricesMissing,
        statsSnapshot: catalogStats(state.addedProducts.concat(getCatalog())),
        userVisible: state.userVisible || plan.headerWaitsForPage,
        timerText: `محصولات در ${isolate(formatMs(plan.readyAt))}`,
        progressWidth: 100,
        progressPhase: "done",
      }));
    }, plan.readyAt);
  }, [clearAll, repeat, schedule, update]);

  const typeQuery = useCallback((value: string) => {
    const work = keystrokeWork(configFor(configsRef.current, "repeatedCalculation"));
    if (!work.debounced) {
      busyWait(work.workMs);
      update({ query: value, shownQuery: value, flashes: {} });
      return;
    }
    busyWait(work.inputMs);
    update({ query: value });
    if (debounceTimer.current !== null) window.clearTimeout(debounceTimer.current);
    debounceTimer.current = window.setTimeout(() => {
      debounceTimer.current = null;
      busyWait(work.workMs);
      update((state) => ({ shownQuery: state.query, flashes: {} }));
    }, DEBOUNCE_MS);
  }, [update]);

  const addToCart = useCallback((productId: number, index: number) => {
    const config = configFor(configsRef.current, "renderStorm");
    const work = clickWork(config, index);
    const startedAt = performance.now();
    busyWait(work.costMs);
    update((state) => {
      const cart = losesCartItems(config)
        ? [productId]
        : state.cart.includes(productId) ? state.cart : [...state.cart, productId];
      const flashes: Record<number, CardFlash> = {};
      if (state.highlightRenders) {
        work.cards.forEach((card, cardIndex) => {
          if (card.state === "clicked") flashes[cardIndex] = "clicked";
          if (card.state === "rendered") flashes[cardIndex] = "rendered";
        });
      }
      return { cart, flashes, timerText: `کلیک: ${isolate(formatMs(performance.now() - startedAt))}` };
    });
    if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => update({ flashes: {} }), FLASH_MS);
  }, [update]);

  const whenLoaded = useCallback((callback: () => void) => {
    if (shopRef.current.loaded) {
      callback();
      return;
    }
    const stop = repeat(() => {
      if (!shopRef.current.loaded) return;
      stop();
      callback();
    }, LOAD_POLL_MS);
  }, [repeat]);

  const typeScenario = useCallback(() => {
    whenLoaded(() => {
      typeQuery("");
      inputRef.current?.focus({ preventScroll: true });
      const startedAt = performance.now();
      const step = (typedCount: number) => {
        if (typedCount >= TYPED_TEXT.length) {
          update({ timerText: `تایپ «${TYPED_TEXT}»: ${isolate(formatMs(performance.now() - startedAt))}` });
          return;
        }
        typeQuery(TYPED_TEXT.slice(0, typedCount + 1));
        schedule(() => step(typedCount + 1), KEY_GAP_MS);
      };
      schedule(() => step(0), TYPING_START_MS);
    });
  }, [schedule, typeQuery, update, whenLoaded]);

  const clickScenario = useCallback(() => {
    whenLoaded(() => {
      update({ query: "", shownQuery: "", cart: [] });
      const limit = visibleCardLimit(configFor(configsRef.current, "renderStorm"));
      const products = filterProducts(shopRef.current, limit);
      const second = CLICKED_CARD_INDEX + SECOND_CLICK_OFFSET;
      schedule(() => addToCart(products[CLICKED_CARD_INDEX].id, CLICKED_CARD_INDEX), FIRST_CLICK_MS);
      schedule(() => addToCart(products[second].id, second), SECOND_CLICK_MS);
    });
  }, [addToCart, schedule, update, whenLoaded]);

  const runScenario = useCallback((scenario: ScenarioKind) => {
    if (scenario === "reload") reload();
    if (scenario === "type") typeScenario();
    if (scenario === "click") clickScenario();
  }, [clickScenario, reload, typeScenario]);

  /** Stops running scenarios; a page load that was cut short starts again. */
  const cancelScenario = useCallback(() => {
    clearAll();
    if (shopRef.current.loaded) update({ progressPhase: "idle" });
    else reload();
  }, [clearAll, reload, update]);

  const addStockProduct = useCallback(() => {
    update((state) => ({ addedProducts: [createStockProduct(state.addedProducts.length), ...state.addedProducts] }));
  }, [update]);

  const toggleHighlight = useCallback(() => {
    userHighlight.current = !shopRef.current.highlightRenders;
    update((state) => ({ highlightRenders: !state.highlightRenders }));
  }, [update]);

  const resetCart = useCallback(() => update({ cart: [] }), [update]);

  useEffect(() => {
    update({ highlightRenders: highlightByDefault || userHighlight.current });
  }, [highlightByDefault, update]);

  useEffect(() => {
    reload();
    return clearAll;
  }, [reload, clearAll]);

  const actions = useMemo(
    () => ({ reload, typeQuery, addToCart, addStockProduct, toggleHighlight, runScenario, cancelScenario, resetCart }),
    [reload, typeQuery, addToCart, addStockProduct, toggleHighlight, runScenario, cancelScenario, resetCart],
  );

  return { store, inputRef, actions };
}

export type ShopRuntime = ReturnType<typeof useShopRuntime>;

const getServerSnapshot = () => initialShop;

/** Subscribes to the shop and derives what the storefront shows. Only the shop frame calls this. */
export function useShopView(store: ShopStore, configs: ShopConfigs) {
  const shop = useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot);
  const renderConfig = configFor(configs, "renderStorm");
  const statsConfig = configFor(configs, "repeatedCalculation");
  // The catalog is only touched once the page has loaded, which never happens during server rendering.
  const products = useMemo(
    () => (shop.loaded ? filterProducts(shop, visibleCardLimit(renderConfig)) : []),
    [shop, renderConfig],
  );
  const stats = useMemo(() => {
    if (!shop.loaded) return null;
    if (freezesStats(statsConfig) && shop.statsSnapshot) return shop.statsSnapshot;
    return catalogStats(shop.addedProducts.concat(getCatalog()));
  }, [shop.loaded, shop.addedProducts, shop.statsSnapshot, statsConfig]);

  return {
    shop,
    products,
    stats,
    totalProducts: shop.loaded ? shop.addedProducts.length + getCatalog().length : 0,
  };
}
