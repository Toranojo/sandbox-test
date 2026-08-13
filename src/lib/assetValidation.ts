import { pricingModeForCategory, type AssetCategory, type PricingMode } from "@/lib/assetCategories";

const VALID_CATEGORIES: AssetCategory[] = ["GOLD", "PLATINUM", "SILVER", "WATCH", "BAG", "JEWELRY", "OTHER"];

export interface AssetInputResult {
  error?: string;
  data?: {
    category: AssetCategory;
    pricingMode: PricingMode;
    name: string;
    brand: string | null;
    model: string | null;
    weightGrams: number | null;
    purity: string | null;
    quantity: number;
    purchasePrice: number;
    purchaseDate: Date;
    notes: string | null;
    imageUrl: string | null;
  };
}

export function validateAndBuildAssetData(body: any): AssetInputResult {
  const { category, name, purchasePrice, purchaseDate } = body;

  if (!VALID_CATEGORIES.includes(category)) {
    return { error: "カテゴリを選択してください。" };
  }
  if (!name || typeof name !== "string" || !name.trim()) {
    return { error: "資産名を入力してください。" };
  }
  if (!purchasePrice || Number(purchasePrice) <= 0) {
    return { error: "購入価格を正しく入力してください。" };
  }
  if (!purchaseDate || isNaN(new Date(purchaseDate).getTime())) {
    return { error: "購入日を正しく入力してください。" };
  }

  const pricingMode = pricingModeForCategory(category);

  if (pricingMode === "WEIGHT") {
    const weightGrams = Number(body.weightGrams);
    if (!weightGrams || weightGrams <= 0) {
      return { error: "重量(グラム)を正しく入力してください。" };
    }
    return {
      data: {
        category,
        pricingMode,
        name: name.trim(),
        weightGrams,
        purity: body.purity || null,
        quantity: 1,
        purchasePrice: Math.round(Number(purchasePrice)),
        purchaseDate: new Date(purchaseDate),
        notes: body.notes || null,
        imageUrl: body.imageUrl || null,
        brand: null,
        model: null,
      },
    };
  }

  const quantity = body.quantity ? Number(body.quantity) : 1;
  if (!quantity || quantity <= 0) {
    return { error: "数量を正しく入力してください。" };
  }

  return {
    data: {
      category,
      pricingMode,
      name: name.trim(),
      brand: body.brand || null,
      model: body.model || null,
      quantity,
      purchasePrice: Math.round(Number(purchasePrice)),
      purchaseDate: new Date(purchaseDate),
      notes: body.notes || null,
      imageUrl: body.imageUrl || null,
      weightGrams: null,
      purity: null,
    },
  };
}
