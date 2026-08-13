import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/lib/theme";
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
    <View style={styles.card}>
      <Text style={styles.label}>保有資産の評価額合計</Text>
      <Text style={styles.total}>{formatJPY(totalCurrentValue)}</Text>
      <View style={styles.row}>
        <Text style={[styles.profit, { color: isGain ? colors.goldDark : colors.loss }]}>
          {isGain ? "▲" : "▼"} {formatJPY(profit)} ({formatPercent(profitPercent)})
        </Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>購入価格合計 {formatJPY(totalPurchasePrice)}</Text>
        <Text style={styles.meta}>登録資産数 {assetCount}件</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.goldLight,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.lg,
  },
  label: {
    fontSize: 13,
    color: colors.muted,
  },
  total: {
    fontSize: 34,
    fontWeight: "300",
    color: colors.ink,
    marginTop: spacing.xs,
  },
  row: {
    marginTop: spacing.sm,
  },
  profit: {
    fontSize: 15,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  meta: {
    fontSize: 13,
    color: colors.muted,
  },
});
