import type { AssetCategory } from "@/lib/assetCategories";

// JPY per gram, pure (24K gold / PT1000 platinum / pure silver).
export const GRAM_BASELINES: Record<"GOLD" | "PLATINUM" | "SILVER", number> = {
  GOLD: 15800,
  PLATINUM: 6200,
  SILVER: 210,
};

// Known brand+model resale baselines, JPY, keyed by "brand:model" lowercased.
export const KNOWN_ITEM_BASELINES: Record<string, number> = {
  "rolex:submariner 116610ln": 1_650_000,
  "rolex:daytona 116500ln": 3_200_000,
  "rolex:datejust 126234": 980_000,
  "rolex:gmt-master ii 126710blro": 2_100_000,
  "rolex:explorer 214270": 850_000,
  "hermès:birkin 30": 2_500_000,
  "hermes:birkin 30": 2_500_000,
  "chanel:classic flap medium": 950_000,
  "louis vuitton:speedy 30": 180_000,
  "patek philippe:nautilus 5711": 8_500_000,
};

// Fallback JPY baseline per category when brand+model isn't recognized.
export const CATEGORY_FALLBACKS: Record<AssetCategory, number> = {
  WATCH: 350_000,
  BAG: 250_000,
  JEWELRY: 150_000,
  OTHER: 100_000,
  GOLD: GRAM_BASELINES.GOLD,
  PLATINUM: GRAM_BASELINES.PLATINUM,
  SILVER: GRAM_BASELINES.SILVER,
};

export function lookupKnownItemBaseline(brand: string | null | undefined, model: string | null | undefined): number | null {
  if (!brand || !model) return null;
  const key = `${brand}:${model}`.toLowerCase().trim();
  return KNOWN_ITEM_BASELINES[key] ?? null;
}
