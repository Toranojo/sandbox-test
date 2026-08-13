// Mirrors the shapes returned by the web app's API (see
// ../../src/app/api/assets/route.ts and ../../src/lib/advice.ts, pricing.ts).
// Kept as plain types here since the mobile app has no direct Prisma access.

export type AssetCategory = "GOLD" | "PLATINUM" | "SILVER" | "WATCH" | "BAG" | "JEWELRY" | "OTHER";
export type PricingMode = "WEIGHT" | "ITEM";

export interface Asset {
  id: string;
  category: AssetCategory;
  pricingMode: PricingMode;
  name: string;
  brand: string | null;
  model: string | null;
  notes: string | null;
  weightGrams: number | null;
  purity: string | null;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssetListItem extends Asset {
  currentValue: number;
}

export interface PricePoint {
  date: string;
  price: number;
}

export type Verdict = "SELL_NOW" | "CONSIDER_SELLING" | "HOLD" | "WAIT";
export type Trend = "UP" | "DOWN" | "FLAT";

export interface AdviceResult {
  verdict: Verdict;
  profitAmount: number;
  profitPercent: number;
  trend: Trend;
  headline: string;
  explanation: string;
}

export interface AssetDetail extends Asset {
  currentValue: number;
  history: PricePoint[];
  advice: AdviceResult;
}

export interface AssetFormPayload {
  category: AssetCategory;
  name: string;
  purchasePrice: number;
  purchaseDate: string;
  notes?: string | null;
  weightGrams?: number;
  purity?: string | null;
  brand?: string | null;
  model?: string | null;
  quantity?: number;
}
