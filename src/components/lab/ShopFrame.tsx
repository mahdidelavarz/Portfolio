"use client";

import ShopView from "./ShopView";
import { useShopView, type ProgressPhase, type ShopConfigs, type ShopRuntime } from "./useShopRuntime";

const progressClass: Record<ProgressPhase, string> = {
  idle: "opacity-0",
  loading: "opacity-100 transition-[width] duration-75 ease-linear",
  done: "opacity-0 transition-[width,opacity] duration-200 [transition-delay:0s,300ms]",
};

const chromeButtonClass = "grid h-7 shrink-0 place-items-center rounded-lg border px-2 transition";
const idleButtonClass = "border-slate-700/70 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300";
const activeButtonClass = "border-cyan-400 bg-cyan-400/10 text-cyan-300";

/** A browser window around the shop, with reload, address bar and the render highlight toggle. */
export default function ShopFrame({ runtime, configs }: { runtime: ShopRuntime; configs: ShopConfigs }) {
  const { shop, products, stats, totalProducts } = useShopView(runtime.store, configs);
  const { actions } = runtime;

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 px-3 py-2.5">
          <span aria-hidden="true" className="hidden shrink-0 gap-1.5 pl-1 sm:flex" dir="ltr">
            <i className="size-2.5 rounded-full bg-rose-400/70" />
            <i className="size-2.5 rounded-full bg-amber-400/70" />
            <i className="size-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <button type="button" onClick={actions.reload} aria-label="بارگذاری دوباره" title="بارگذاری دوباره" className={`${chromeButtonClass} ${idleButtonClass}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M20 11a8 8 0 1 0-2.3 5.7" />
              <path d="M20 4v7h-7" />
            </svg>
          </button>
          <div dir="ltr" className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-slate-950/70 px-2.5 py-1 font-code text-xs text-slate-400">
            <svg className="shrink-0 text-emerald-400/80" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span className="truncate">
              kalastan.shop<span className="text-slate-600">/products</span>
            </span>
          </div>
          <button
            type="button"
            aria-pressed={shop.highlightRenders}
            onClick={actions.toggleHighlight}
            className={`${chromeButtonClass} whitespace-nowrap text-xs ${shop.highlightRenders ? activeButtonClass : idleButtonClass}`}
          >
            نمایش رندرها
          </button>
        </div>
        <div className="relative h-0.5 overflow-hidden">
          <i className={`absolute inset-y-0 right-0 bg-gradient-to-l from-cyan-400 to-blue-500 ${progressClass[shop.progressPhase]}`} style={{ width: `${shop.progressWidth}%` }} />
        </div>
        <div className="relative h-[calc(100dvh-20rem)] min-h-[380px] overflow-y-auto bg-slate-950 text-slate-200 [scrollbar-width:thin] lg:h-[620px] lg:max-h-[75vh] lg:min-h-0">
          <ShopView
            loaded={shop.loaded}
            showSpinner={shop.showSpinner}
            userVisible={shop.userVisible}
            pricesMissing={shop.pricesMissing}
            query={shop.query}
            shownQuery={shop.shownQuery}
            cart={shop.cart}
            flashes={shop.flashes}
            products={products}
            stats={stats}
            totalProducts={totalProducts}
            inputRef={runtime.inputRef}
            onType={actions.typeQuery}
            onAdd={actions.addToCart}
            onStockEvent={actions.addStockProduct}
          />
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500">
        <span>این اپ با همون کدی اجرا می‌شه که آخرین بار اجرا کردی.</span>
        {shop.timerText && (
          <span className="rounded-full border border-slate-700/60 bg-slate-900/60 px-2.5 py-0.5 tabular-nums text-slate-300">{shop.timerText}</span>
        )}
      </div>
    </div>
  );
}
