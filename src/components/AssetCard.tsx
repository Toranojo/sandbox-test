import Link from "next/link";
import type { Asset } from "@prisma/client";
import type { PricePoint } from "@/lib/pricing";
import { formatJPY, formatPercent } from "@/lib/format";
import { CATEGORY_LABELS, type AssetCategory } from "@/lib/assetCategories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Sparkline } from "@/components/Sparkline";

export function AssetCard({
  asset,
  currentValue,
  history,
}: {
  asset: Asset;
  currentValue: number;
  history: PricePoint[];
}) {
  const profit = currentValue - asset.purchasePrice;
  const profitPercent = asset.purchasePrice > 0 ? (profit / asset.purchasePrice) * 100 : 0;
  const isGain = profit >= 0;
  const subtitle =
    asset.pricingMode === "WEIGHT"
      ? `${asset.weightGrams}g ${asset.purity ?? ""}`.trim()
      : [asset.brand, asset.model].filter(Boolean).join(" ") || "詳細未設定";

  return (
    <Link
      href={`/assets/${asset.id}`}
      className="block rounded-2xl border border-hairline bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-light">
            <CategoryIcon category={asset.category as AssetCategory} />
          </div>
          <div>
            <p className="font-medium text-ink">{asset.name}</p>
            <p className="text-sm text-muted">{CATEGORY_LABELS[asset.category as AssetCategory]} · {subtitle}</p>
          </div>
        </div>
        <Sparkline data={history} />
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted">現在評価額</p>
          <p className="text-xl font-medium tabular-nums text-ink">{formatJPY(currentValue)}</p>
        </div>
        <p className={`text-sm font-medium tabular-nums ${isGain ? "text-gold-dark" : "text-loss"}`}>
          {isGain ? "▲" : "▼"} {formatPercent(profitPercent)}
        </p>
      </div>
    </Link>
  );
}
