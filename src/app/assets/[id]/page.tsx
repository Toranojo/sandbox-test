import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { computeCurrentValue, computeAssetPriceHistory } from "@/lib/valuation";
import { generateAdvice } from "@/lib/advice";
import { CATEGORY_LABELS, type AssetCategory } from "@/lib/assetCategories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { LinkButton } from "@/components/ui/Button";
import { DeleteAssetButton } from "@/components/DeleteAssetButton";
import { AdviceCard } from "@/components/AdviceCard";
import { Sparkline } from "@/components/Sparkline";
import { formatJPY, formatPercent, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AssetDetailPage({ params }: { params: { id: string } }) {
  const asset = await prisma.asset.findUnique({ where: { id: params.id } });
  if (!asset) notFound();

  const currentValue = computeCurrentValue(asset);
  const history = computeAssetPriceHistory(asset);
  const advice = generateAdvice({
    purchasePrice: asset.purchasePrice,
    currentValue,
    purchaseDate: asset.purchaseDate,
    priceHistory: history,
  });

  const subtitle =
    asset.pricingMode === "WEIGHT"
      ? `${asset.weightGrams}g ${asset.purity ?? ""}`.trim()
      : [asset.brand, asset.model].filter(Boolean).join(" ") || "詳細未設定";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-light">
            <CategoryIcon category={asset.category as AssetCategory} />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-ink">{asset.name}</h1>
            <p className="text-sm text-muted">
              {CATEGORY_LABELS[asset.category as AssetCategory]} · {subtitle}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <LinkButton href={`/assets/${asset.id}/edit`} variant="secondary">
            編集
          </LinkButton>
          <DeleteAssetButton assetId={asset.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-hairline bg-white p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">現在評価額</p>
              <p className="mt-1 text-3xl font-light tabular-nums text-ink">{formatJPY(currentValue)}</p>
              <p
                className={`mt-2 text-sm font-medium tabular-nums ${
                  advice.profitAmount >= 0 ? "text-gold-dark" : "text-loss"
                }`}
              >
                {advice.profitAmount >= 0 ? "▲" : "▼"} {formatJPY(advice.profitAmount)} (
                {formatPercent(advice.profitPercent)})
              </p>
            </div>
            <Sparkline data={history} width={200} height={64} strokeWidth={2} />
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-6 text-sm">
            <div>
              <dt className="text-muted">購入価格</dt>
              <dd className="mt-1 font-medium tabular-nums text-ink">{formatJPY(asset.purchasePrice)}</dd>
            </div>
            <div>
              <dt className="text-muted">購入日</dt>
              <dd className="mt-1 font-medium text-ink">{formatDate(asset.purchaseDate)}</dd>
            </div>
            {asset.notes && (
              <div className="col-span-2">
                <dt className="text-muted">メモ</dt>
                <dd className="mt-1 text-ink">{asset.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        <AdviceCard advice={advice} />
      </div>
    </div>
  );
}
