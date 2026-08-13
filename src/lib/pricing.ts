import type { AssetCategory } from "@/lib/assetCategories";
import { GRAM_BASELINES, CATEGORY_FALLBACKS, lookupKnownItemBaseline } from "./priceBaselines";

export interface PricePoint {
  date: string; // YYYY-MM-DD
  price: number;
}

// Volatility (daily max drift, as a fraction) per asset key prefix. Precious
// metals are steadier day-to-day than resale-market items.
const METAL_VOLATILITY = 0.006;
const ITEM_VOLATILITY = 0.01;

// Deterministic string hash -> seeded PRNG (mulberry32-style). Same seed
// always produces the same sequence, so prices are stable across reloads on
// the same day but still look like a real fluctuating market over time.
function seededRandom(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function next() {
    h = Math.imul(h ^ (h >>> 16), 2246822519);
    h = Math.imul(h ^ (h >>> 13), 3266489917);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function isMetalKey(assetKey: string): boolean {
  return assetKey.startsWith("GOLD") || assetKey.startsWith("PLATINUM") || assetKey.startsWith("SILVER");
}

/**
 * Generates a deterministic trailing daily price series ending today,
 * starting from `basePrice`. Each day's price is derived from the previous
 * day's via a small seeded pseudo-random drift, so the same (assetKey, day)
 * combination always yields the same price, but the series still reads as a
 * plausible fluctuating market when viewed across days.
 */
function generateWalk(assetKey: string, basePrice: number, days: number): PricePoint[] {
  const volatility = isMetalKey(assetKey) ? METAL_VOLATILITY : ITEM_VOLATILITY;
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - (days - 1));

  const points: PricePoint[] = [];
  let price = basePrice;
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const key = dateKey(d);
    const rand = seededRandom(`${assetKey}|${key}`)();
    const drift = (rand - 0.5) * 2 * volatility;
    price = i === 0 ? basePrice : price * (1 + drift);
    points.push({ date: key, price: Math.round(price) });
  }
  return points;
}

function resolveAssetKeyAndBase(
  category: AssetCategory,
  opts: { brand?: string | null; model?: string | null }
): { assetKey: string; basePrice: number } {
  if (category === "GOLD" || category === "PLATINUM" || category === "SILVER") {
    return { assetKey: category, basePrice: GRAM_BASELINES[category] };
  }
  const known = lookupKnownItemBaseline(opts.brand, opts.model);
  if (known != null) {
    const key = `${opts.brand}:${opts.model}`.toLowerCase().trim();
    return { assetKey: `ITEM:${key}`, basePrice: known };
  }
  return { assetKey: `ITEM:${category}:generic`, basePrice: CATEGORY_FALLBACKS[category] };
}

export function pricePerGram(category: "GOLD" | "PLATINUM" | "SILVER"): number {
  const { assetKey, basePrice } = resolveAssetKeyAndBase(category, {});
  const history = generateWalk(assetKey, basePrice, 30);
  return history[history.length - 1].price;
}

export function itemUnitPrice(
  brand: string | null | undefined,
  model: string | null | undefined,
  category: AssetCategory
): number {
  const { assetKey, basePrice } = resolveAssetKeyAndBase(category, { brand, model });
  const history = generateWalk(assetKey, basePrice, 30);
  return history[history.length - 1].price;
}

export function getCurrentPrice(
  category: AssetCategory,
  opts: { brand?: string | null; model?: string | null } = {}
): number {
  const { assetKey, basePrice } = resolveAssetKeyAndBase(category, opts);
  const history = generateWalk(assetKey, basePrice, 30);
  return history[history.length - 1].price;
}

export function getPriceHistory(
  category: AssetCategory,
  opts: { brand?: string | null; model?: string | null } = {},
  days = 30
): PricePoint[] {
  const { assetKey, basePrice } = resolveAssetKeyAndBase(category, opts);
  return generateWalk(assetKey, basePrice, days);
}
