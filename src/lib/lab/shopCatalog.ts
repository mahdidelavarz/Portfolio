import { formatNumber } from "./format.ts";

export interface ShopProduct {
  id: number;
  categoryIndex: number;
  name: string;
  price: number;
}

export interface CatalogStats {
  count: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
}

export const CATEGORIES = ["کفش", "کیف", "ساعت", "عینک", "کلاه", "پیراهن", "شلوار", "جوراب"];
export const CATEGORY_HUES = [24, 200, 45, 280, 150, 340, 220, 100];

const ADJECTIVES = ["چرمی", "ورزشی", "کلاسیک", "مینیمال", "کتان", "اسپرت", "رسمی", "تابستانی", "زمستانی", "دست‌دوز", "راحتی", "پشمی"];
const PRODUCT_COUNT = 2000;
const SEED = 11;
const NEW_PRODUCT_ID_START = 100000;

let catalog: ShopProduct[] | null = null;

function generateCatalog(): ShopProduct[] {
  let seed = SEED;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: PRODUCT_COUNT }, (_, index) => {
    const categoryIndex = index % CATEGORIES.length;
    const adjective = ADJECTIVES[Math.floor(random() * ADJECTIVES.length)];
    return {
      id: index + 1,
      categoryIndex,
      name: `${CATEGORIES[categoryIndex]} ${adjective} ${formatNumber(100 + index)}`,
      price: Math.round(80 + random() * 2400),
    };
  });
}

/** The seeded shop catalog, generated on first use. */
export function getCatalog(): ShopProduct[] {
  catalog ??= generateCatalog();
  return catalog;
}

/** A product the "stock event" button adds; `addedCount` products came before it. */
export function createStockProduct(addedCount: number): ShopProduct {
  const id = NEW_PRODUCT_ID_START + addedCount;
  const categoryIndex = id % CATEGORIES.length;
  return {
    id,
    categoryIndex,
    name: `${CATEGORIES[categoryIndex]} تازه ${formatNumber(addedCount + 1)}`,
    price: 2900 + addedCount * 150,
  };
}

export function catalogStats(products: ShopProduct[]): CatalogStats {
  let total = 0;
  let minPrice = Infinity;
  let maxPrice = 0;
  for (const product of products) {
    total += product.price;
    minPrice = Math.min(minPrice, product.price);
    maxPrice = Math.max(maxPrice, product.price);
  }
  return { count: products.length, averagePrice: Math.round(total / products.length), minPrice, maxPrice };
}
