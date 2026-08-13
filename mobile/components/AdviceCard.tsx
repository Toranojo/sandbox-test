import { StyleSheet, Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { colors, spacing } from "@/lib/theme";
import { formatJPY, formatPercent } from "@/lib/format";
import type { AdviceResult, Verdict, Trend } from "@/lib/types";

const VERDICT_TONE: Record<Verdict, "gold" | "neutral" | "loss"> = {
  SELL_NOW: "gold",
  CONSIDER_SELLING: "gold",
  HOLD: "neutral",
  WAIT: "loss",
};

const TREND_LABEL: Record<Trend, string> = {
  UP: "上昇傾向",
  DOWN: "下降傾向",
  FLAT: "横ばい",
};

export function AdviceCard({ advice }: { advice: AdviceResult }) {
  return (
    <Card>
      <View style={styles.headerRow}>
        <Text style={styles.eyebrow}>AIによる売り時アシスト</Text>
        <Badge tone={VERDICT_TONE[advice.verdict]}>{TREND_LABEL[advice.trend]}</Badge>
      </View>
      <Text style={styles.headline}>{advice.headline}</Text>
      <Text style={styles.explanation}>{advice.explanation}</Text>
      <View style={styles.divider} />
      <Text style={styles.label}>今売却した場合の想定損益</Text>
      <Text style={[styles.profit, { color: advice.profitAmount >= 0 ? colors.goldDark : colors.loss }]}>
        {formatJPY(advice.profitAmount)} ({formatPercent(advice.profitPercent)})
      </Text>
      <Text style={styles.disclaimer}>
        ※ この提案はシミュレーションデータと簡易ロジックによる参考情報です。売買の最終判断はご自身で行ってください。
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: colors.muted,
    textTransform: "uppercase",
  },
  headline: {
    fontSize: 19,
    fontWeight: "600",
    color: colors.ink,
    marginTop: spacing.sm + 4,
  },
  explanation: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    marginTop: spacing.xs + 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.hairline,
    marginVertical: spacing.md,
  },
  label: {
    fontSize: 13,
    color: colors.muted,
  },
  profit: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  disclaimer: {
    fontSize: 11,
    color: colors.muted,
    marginTop: spacing.md,
  },
});
