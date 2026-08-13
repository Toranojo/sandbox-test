import type { PricePoint } from "./pricing";

export type Verdict = "SELL_NOW" | "CONSIDER_SELLING" | "HOLD" | "WAIT";
export type Trend = "UP" | "DOWN" | "FLAT";

export interface AdviceInput {
  purchasePrice: number;
  currentValue: number;
  purchaseDate: Date;
  priceHistory: PricePoint[];
}

export interface AdviceResult {
  verdict: Verdict;
  profitAmount: number;
  profitPercent: number;
  trend: Trend;
  headline: string;
  explanation: string;
}

function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function detectTrend(history: PricePoint[]): Trend {
  if (history.length < 14) return "FLAT";
  const recent = history.slice(-7).map((p) => p.price);
  const prior = history.slice(-14, -7).map((p) => p.price);
  const recentAvg = average(recent);
  const priorAvg = average(prior);
  if (priorAvg === 0) return "FLAT";
  const ratio = recentAvg / priorAvg;
  if (ratio > 1.01) return "UP";
  if (ratio < 0.99) return "DOWN";
  return "FLAT";
}

function monthsHeld(purchaseDate: Date): number {
  const now = new Date();
  const months =
    (now.getFullYear() - purchaseDate.getFullYear()) * 12 + (now.getMonth() - purchaseDate.getMonth());
  return Math.max(0, months);
}

function formatYen(n: number): string {
  const sign = n < 0 ? "-" : "";
  return `${sign}¥${Math.abs(Math.round(n)).toLocaleString("ja-JP")}`;
}

function pickVerdict(profitPercent: number, trend: Trend): Verdict {
  if (profitPercent >= 15 && trend === "UP") return "SELL_NOW";
  if (profitPercent >= 15 && trend === "DOWN") return "CONSIDER_SELLING";
  if (profitPercent >= 5 && trend === "UP") return "HOLD";
  if (profitPercent < 0 && trend === "UP") return "HOLD";
  if (profitPercent < 0 && trend === "DOWN") return "WAIT";
  return "HOLD";
}

const HEADLINES: Record<Verdict, string> = {
  SELL_NOW: "売り時です",
  CONSIDER_SELLING: "売却を検討する価値があります",
  HOLD: "引き続き様子見で問題ありません",
  WAIT: "今は待ちましょう",
};

export function generateAdvice(input: AdviceInput): AdviceResult {
  const { purchasePrice, currentValue, purchaseDate, priceHistory } = input;
  const profitAmount = currentValue - purchasePrice;
  const profitPercent = purchasePrice > 0 ? (profitAmount / purchasePrice) * 100 : 0;
  const trend = detectTrend(priceHistory);
  const verdict = pickVerdict(profitPercent, trend);
  const held = monthsHeld(purchaseDate);
  const pctStr = `${profitPercent >= 0 ? "+" : ""}${Math.round(profitPercent)}%`;
  const holdStr = held >= 12 ? `${Math.floor(held / 12)}年${held % 12}ヶ月` : `${held}ヶ月`;

  let explanation: string;
  switch (verdict) {
    case "SELL_NOW":
      explanation = `購入時より約${Math.round(
        profitPercent
      )}%値上がりしており、直近の相場も上昇傾向が続いています。このまま保有し続けると相場が反落するリスクもあるため、利益を確定させる良いタイミングと言えます。今売却した場合の想定利益は${formatYen(
        profitAmount
      )}です。`;
      break;
    case "CONSIDER_SELLING":
      explanation = `購入時より約${Math.round(
        profitPercent
      )}%の含み益が出ていますが、直近では相場が下がり始めています。利益はまだ十分残っていますが、この傾向が続くと利益が目減りする可能性があるため、早めの売却も選択肢に入れてよいでしょう。想定利益は${formatYen(
        profitAmount
      )}です。`;
      break;
    case "WAIT":
      explanation = `現在の評価額は購入時より約${Math.abs(
        Math.round(profitPercent)
      )}%下回っており、直近の相場も下落傾向にあります。今売却すると${formatYen(
        profitAmount
      )}の損失が確定してしまうため、相場の回復を待つことをおすすめします。`;
      break;
    case "HOLD":
    default:
      if (profitPercent < 0) {
        explanation = `現在は購入時より約${Math.abs(
          Math.round(profitPercent)
        )}%の含み損ですが、直近の相場は回復傾向にあります。焦って損失を確定させず、もうしばらく様子を見るとよいでしょう。`;
      } else {
        explanation = `評価額は購入時とほぼ同水準（${pctStr}）で、相場も大きな動きはありません。急いで売却する理由は特にないため、このまま保有（保有期間: ${holdStr}）を続けて相場の動向を見守りましょう。`;
      }
      break;
  }

  return {
    verdict,
    profitAmount,
    profitPercent,
    trend,
    headline: HEADLINES[verdict],
    explanation,
  };
}
