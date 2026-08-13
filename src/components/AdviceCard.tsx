import type { AdviceResult } from "@/lib/advice";
import { Badge } from "@/components/ui/Badge";
import { formatJPY, formatPercent } from "@/lib/format";

const VERDICT_TONE: Record<AdviceResult["verdict"], "gold" | "neutral" | "loss"> = {
  SELL_NOW: "gold",
  CONSIDER_SELLING: "gold",
  HOLD: "neutral",
  WAIT: "loss",
};

const TREND_LABEL: Record<AdviceResult["trend"], string> = {
  UP: "上昇傾向",
  DOWN: "下降傾向",
  FLAT: "横ばい",
};

export function AdviceCard({ advice }: { advice: AdviceResult }) {
  return (
    <div className="rounded-2xl border border-hairline bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">AIによる売り時アシスト</p>
        <Badge tone={VERDICT_TONE[advice.verdict]}>{TREND_LABEL[advice.trend]}</Badge>
      </div>
      <p className="mt-3 text-xl font-medium text-ink">{advice.headline}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{advice.explanation}</p>
      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-hairline pt-4 text-sm">
        <div>
          <p className="text-muted">今売却した場合の想定損益</p>
          <p
            className={`mt-1 text-lg font-medium tabular-nums ${
              advice.profitAmount >= 0 ? "text-gold-dark" : "text-loss"
            }`}
          >
            {formatJPY(advice.profitAmount)} ({formatPercent(advice.profitPercent)})
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">
        ※ この提案はシミュレーションデータと簡易ロジックによる参考情報です。売買の最終判断はご自身で行ってください。
      </p>
    </div>
  );
}
