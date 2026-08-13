// Ported from ../../src/lib/assetCategories.ts (pure data/logic, no DOM deps).
import type { AssetCategory } from "./types";

export const WEIGHT_CATEGORIES: AssetCategory[] = ["GOLD", "PLATINUM", "SILVER"];
export const ITEM_CATEGORIES: AssetCategory[] = ["WATCH", "BAG", "JEWELRY", "OTHER"];

export function isWeightCategory(category: AssetCategory): boolean {
  return WEIGHT_CATEGORIES.includes(category);
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

export const CATEGORY_GROUPS: { label: string; categories: AssetCategory[] }[] = [
  { label: "貴金属", categories: ["GOLD", "PLATINUM", "SILVER"] },
  { label: "ブランド品", categories: ["WATCH", "BAG", "JEWELRY", "OTHER"] },
];

export const PURITY_OPTIONS: Record<"GOLD" | "PLATINUM" | "SILVER", { value: string; label: string }[]> = {
  GOLD: [
    { value: "K24", label: "K24 (純金)" },
    { value: "K22", label: "K22" },
    { value: "K18", label: "K18" },
    { value: "K14", label: "K14" },
    { value: "K10", label: "K10" },
  ],
  PLATINUM: [
    { value: "PT1000", label: "PT1000 (純プラチナ)" },
    { value: "PT950", label: "PT950" },
    { value: "PT900", label: "PT900" },
  ],
  SILVER: [
    { value: "SV1000", label: "SV1000 (純銀)" },
    { value: "SV925", label: "SV925 (スターリングシルバー)" },
  ],
};
