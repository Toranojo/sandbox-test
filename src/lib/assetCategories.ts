// SQLite (via Prisma) has no native enum support, so Asset.category /
// Asset.pricingMode are plain strings in the DB. These app-level union types
// are the source of truth for valid values everywhere else in the codebase.
export type AssetCategory = "GOLD" | "PLATINUM" | "SILVER" | "WATCH" | "BAG" | "JEWELRY" | "OTHER";
export type PricingMode = "WEIGHT" | "ITEM";

export const WEIGHT_CATEGORIES: AssetCategory[] = ["GOLD", "PLATINUM", "SILVER"];
export const ITEM_CATEGORIES: AssetCategory[] = ["WATCH", "BAG", "JEWELRY", "OTHER"];

export function pricingModeForCategory(category: AssetCategory): PricingMode {
  return WEIGHT_CATEGORIES.includes(category) ? "WEIGHT" : "ITEM";
}

export const CATEGORY_LABELS: Record<AssetCategory, string> = {
  GOLD: "ゴールド",
  PLATINUM: "プラチナ",
  SILVER: "シルバー",
  WATCH: "腕時計",
  BAG: "バッグ",
  JEWELRY: "ジュエリー",
  OTHER: "その他",
};

export const CATEGORY_GROUP_LABELS: Record<"METAL" | "ITEM", string> = {
  METAL: "貴金属",
  ITEM: "ブランド品",
};

// Purity factor relative to pure (24K gold / PT1000 platinum / pure silver).
export const PURITY_OPTIONS: Record<Extract<AssetCategory, "GOLD" | "PLATINUM" | "SILVER">, { value: string; label: string; factor: number }[]> = {
  GOLD: [
    { value: "K24", label: "K24 (純金)", factor: 1.0 },
    { value: "K22", label: "K22", factor: 0.917 },
    { value: "K18", label: "K18", factor: 0.75 },
    { value: "K14", label: "K14", factor: 0.583 },
    { value: "K10", label: "K10", factor: 0.417 },
  ],
  PLATINUM: [
    { value: "PT1000", label: "PT1000 (純プラチナ)", factor: 1.0 },
    { value: "PT950", label: "PT950", factor: 0.95 },
    { value: "PT900", label: "PT900", factor: 0.9 },
  ],
  SILVER: [
    { value: "SV1000", label: "SV1000 (純銀)", factor: 1.0 },
    { value: "SV925", label: "SV925 (スターリングシルバー)", factor: 0.925 },
  ],
};

export function purityFactor(category: AssetCategory, purity: string | null | undefined): number {
  if (!purity) return 1.0;
  const options = (PURITY_OPTIONS as Record<string, { value: string; factor: number }[]>)[category];
  if (!options) return 1.0;
  const match = options.find((o) => o.value === purity);
  return match ? match.factor : 1.0;
}

export const CATEGORY_ICONS: Record<AssetCategory, string> = {
  GOLD: "gold-bar",
  PLATINUM: "gold-bar",
  SILVER: "gold-bar",
  WATCH: "watch",
  BAG: "bag",
  JEWELRY: "ring",
  OTHER: "gem",
};
