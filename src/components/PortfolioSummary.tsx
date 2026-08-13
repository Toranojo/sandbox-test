import { formatJPY, formatPercent } from "@/lib/format";

export function PortfolioSummary({
  totalCurrentValue,
  totalPurchasePrice,
  assetCount,
}: {
  totalCurrentValue: number;
  totalPurchasePrice: number;
  assetCount: number;
}) {
  const profit = totalCurrentValue - totalPurchasePrice;
  const profitPercent = totalPurchasePrice > 0 ? (profit / totalPurchasePrice) * 100 : 0;
  const isGain = profit >= 0;

  return (
    <div className="rounded-2xl border border-hairline bg-gradient-to-br from-white to-gold-light/30 p-8">
      <p className="text-sm text-muted">保有資産の評価額合計</p>
      <p className="mt-2 text-4xl font-light tabular-nums text-ink sm:text-5xl">
        {formatJPY(totalCurrentValue)}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className={`font-medium tabular-nums ${isGain ? "text-gold-dark" : "text-loss"}`}>
          {isGain ? "▲" : "▼"} {formatJPY(profit)} ({formatPercent(profitPercent)})
        </span>
        <span className="text-muted">購入価格合計 {formatJPY(totalPurchasePrice)}</span>
        <span className="text-muted">登録資産数 {assetCount}件</span>
      </div>
    </div>
  );
}
