import type { Asset } from "@prisma/client";
import { getCurrentPrice, getPriceHistory, type PricePoint } from "./pricing";
import { purityFactor, type AssetCategory } from "./assetCategories";

/** Current total market value of the asset, in JPY. */
export function computeCurrentValue(asset: Asset): number {
  const category = asset.category as AssetCategory;
  if (asset.pricingMode === "WEIGHT") {
    const grams = asset.weightGrams ?? 0;
    const perGram = getCurrentPrice(category);
    return Math.round(grams * purityFactor(category, asset.purity) * perGram);
  }
  const unitPrice = getCurrentPrice(category, { brand: asset.brand, model: asset.model });
  return Math.round(unitPrice * asset.quantity);
}

/** Trailing daily value history (JPY total, not per-unit) for charting. */
export function computeAssetPriceHistory(asset: Asset, days = 30): PricePoint[] {
  const category = asset.category as AssetCategory;
  const history = getPriceHistory(category, { brand: asset.brand, model: asset.model }, days);
  if (asset.pricingMode === "WEIGHT") {
    const grams = asset.weightGrams ?? 0;
    const factor = purityFactor(category, asset.purity);
    return history.map((p) => ({ date: p.date, price: Math.round(p.price * grams * factor) }));
  }
  return history.map((p) => ({ date: p.date, price: Math.round(p.price * asset.quantity) }));
}
