import { memo } from "react";
import { formatNumber } from "@/lib/lab/format";
import { CATEGORIES, CATEGORY_HUES, type CatalogStats, type ShopProduct } from "@/lib/lab/shopCatalog";
import Num from "./Num";
import type { CardFlash } from "./useShopRuntime";

const flashClass: Record<CardFlash, string> = {
  clicked: "ring-2 ring-sky-400",
  rendered: "ring-2 ring-rose-500",
};

function ShopHeader({
  query,
  loaded,
  cartCount,
  userVisible,
  inputRef,
  onType,
}: {
  query: string;
  loaded: boolean;
  cartCount: number;
  userVisible: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onType: (value: string) => void;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-2.5 border-b border-slate-800 bg-slate-950/90 px-3 py-2.5 backdrop-blur sm:px-4">
      <span className="flex items-center gap-1.5 text-sm font-black text-white">
        <span aria-hidden="true" className="grid size-6 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-[11px] text-white">
          ک
        </span>
        <span className="hidden min-[400px]:inline">کالاستان</span>
      </span>
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">جستجو در محصولات</span>
        <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => onType(event.target.value)}
          disabled={!loaded}
          placeholder="جستجو در محصولات..."
          autoComplete="off"
          aria-label="جستجو در محصولات"
          className="w-full rounded-xl border border-slate-700/70 bg-slate-900 py-1.5 pl-2.5 pr-8 text-[13px] text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 disabled:opacity-50"
        />
      </label>
      <span className="relative grid size-8 shrink-0 place-items-center rounded-xl border border-slate-700/70 text-slate-300">
        <span className="sr-only">سبد خرید</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 7h15l-1.5 9h-12z" />
          <path d="M6 7 5 3H2" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
        <b className="absolute -left-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-cyan-400 px-1 text-[10px] text-slate-950">
          <Num>{formatNumber(cartCount)}</Num>
        </b>
      </span>
      <span
        className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black transition ${
          userVisible ? "bg-cyan-400/15 text-cyan-300" : "animate-pulse bg-slate-800"
        }`}
      >
        {userVisible ? "م" : ""}
      </span>
    </div>
  );
}

const ProductCard = memo(function ProductCard({
  product,
  index,
  inCart,
  pricesMissing,
  flash,
  onAdd,
}: {
  product: ShopProduct;
  index: number;
  inCart: boolean;
  pricesMissing: boolean;
  flash: CardFlash | undefined;
  onAdd: (productId: number, index: number) => void;
}) {
  const hue = CATEGORY_HUES[product.categoryIndex];
  return (
    <div className={`flex flex-col gap-1.5 rounded-2xl border border-slate-800 bg-slate-900/70 p-2 transition-shadow ${flash ? flashClass[flash] : ""}`}>
      <div
        aria-hidden="true"
        className="grid aspect-[4/3] place-items-center rounded-xl text-xl font-black"
        style={{ background: `hsl(${hue} 35% 17%)`, color: `hsl(${hue} 70% 72%)` }}
      >
        {CATEGORIES[product.categoryIndex][0]}
      </div>
      <div className="min-h-[3em] px-0.5 text-xs leading-normal text-slate-200">{product.name}</div>
      <div className={`px-0.5 text-xs font-bold ${pricesMissing ? "text-rose-300" : "text-white"}`}>
        {pricesMissing ? "—" : <><Num>{formatNumber(product.price)}</Num> <span className="font-normal text-slate-500">هزار تومان</span></>}
      </div>
      <button
        type="button"
        onClick={() => onAdd(product.id, index)}
        className={`rounded-lg px-1.5 py-1.5 text-[11.5px] font-bold transition ${
          inCart
            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
            : "border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10"
        }`}
      >
        {inCart ? "در سبد ✓" : "افزودن به سبد"}
      </button>
    </div>
  );
});

function StatTile({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <div className="rounded-xl bg-slate-900/70 px-3 py-2">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="text-sm font-black text-slate-100">
        <Num>{formatNumber(value)}</Num>
        {unit && <span className="mr-1 text-[10px] font-normal text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}

export interface ShopViewProps {
  loaded: boolean;
  showSpinner: boolean;
  userVisible: boolean;
  pricesMissing: boolean;
  query: string;
  shownQuery: string;
  cart: number[];
  flashes: Record<number, CardFlash>;
  products: ShopProduct[];
  stats: CatalogStats | null;
  totalProducts: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onType: (value: string) => void;
  onAdd: (productId: number, index: number) => void;
  onStockEvent: () => void;
}

/** The app under test: a storefront inside the browser frame, in the lab's palette. */
export default function ShopView(props: ShopViewProps) {
  const header = (
    <ShopHeader
      query={props.query}
      loaded={props.loaded}
      cartCount={props.cart.length}
      userVisible={props.userVisible}
      inputRef={props.inputRef}
      onType={props.onType}
    />
  );

  if (!props.loaded || !props.stats) {
    return (
      <div className="flex h-full flex-col">
        {props.userVisible && header}
        <div className="grid flex-1 place-items-center text-xs text-slate-500">
          {props.showSpinner && (
            <div className="text-center">
              <div className="mx-auto mb-3 size-7 rounded-full border-[3px] border-slate-800 border-t-cyan-400 motion-safe:animate-spin" />
              در حال بارگذاری محصولات…
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-[13px]">
      {header}
      <div className="grid grid-cols-2 gap-2 px-3 pt-3 sm:grid-cols-4 sm:px-4">
        <StatTile label="تعداد محصول" value={props.stats.count} />
        <StatTile label="میانگین قیمت" value={props.stats.averagePrice} unit="هزار تومان" />
        <StatTile label="ارزان‌ترین" value={props.stats.minPrice} />
        <StatTile label="گران‌ترین" value={props.stats.maxPrice} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(122px,1fr))] gap-2.5 px-3 py-3 sm:px-4">
        {props.products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            inCart={props.cart.includes(product.id)}
            pricesMissing={props.pricesMissing}
            flash={props.flashes[index]}
            onAdd={props.onAdd}
          />
        ))}
        {!props.products.length && (
          <div className="col-span-full py-10 text-center text-xs text-slate-500">چیزی با «{props.shownQuery}» پیدا نشد.</div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 px-3 py-3 text-[11.5px] text-slate-500 sm:px-4">
        <span><Num>{formatNumber(props.totalProducts)}</Num> محصول در انبار</span>
        <button
          type="button"
          onClick={props.onStockEvent}
          className="rounded-lg border border-dashed border-slate-700 px-2.5 py-1 transition hover:border-cyan-400/40 hover:text-cyan-300"
        >
          رویداد انبار: یه محصول تازه اضافه شد
        </button>
      </div>
    </div>
  );
}
