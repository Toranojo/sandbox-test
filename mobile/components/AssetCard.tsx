import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { colors, radius, spacing } from "@/lib/theme";
import { formatJPY, formatPercent } from "@/lib/format";
import { CATEGORY_LABELS } from "@/lib/assetCategories";
import { CategoryIcon } from "@/components/CategoryIcon";
import type { AssetListItem } from "@/lib/types";

export function AssetCard({ item }: { item: AssetListItem }) {
  const router = useRouter();
  const profit = item.currentValue - item.purchasePrice;
  const profitPercent = item.purchasePrice > 0 ? (profit / item.purchasePrice) * 100 : 0;
  const isGain = profit >= 0;
  const subtitle =
    item.pricingMode === "WEIGHT"
      ? `${item.weightGrams}g ${item.purity ?? ""}`.trim()
      : [item.brand, item.model].filter(Boolean).join(" ") || "詳細未設定";

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/assets/${item.id}`)}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <CategoryIcon category={item.category} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtitle}>
            {CATEGORY_LABELS[item.category]} · {subtitle}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.valueLabel}>現在評価額</Text>
          <Text style={styles.value}>{formatJPY(item.currentValue)}</Text>
        </View>
        <Text style={[styles.profit, { color: isGain ? colors.goldDark : colors.loss }]}>
          {isGain ? "▲" : "▼"} {formatPercent(profitPercent)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.md + 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm + 4,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.goldLight,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.ink,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: spacing.md,
  },
  valueLabel: {
    fontSize: 11,
    color: colors.muted,
  },
  value: {
    fontSize: 19,
    fontWeight: "600",
    color: colors.ink,
    marginTop: 2,
  },
  profit: {
    fontSize: 14,
    fontWeight: "600",
  },
});
