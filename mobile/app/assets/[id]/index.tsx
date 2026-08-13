import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { colors, radius, spacing } from "@/lib/theme";
import { deleteAsset, getAsset, ApiError } from "@/lib/api";
import type { AssetDetail } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/assetCategories";
import { formatDate, formatJPY, formatPercent } from "@/lib/format";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Sparkline } from "@/components/Sparkline";
import { AdviceCard } from "@/components/AdviceCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AssetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [asset, setAsset] = useState<AssetDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setError(null);
      getAsset(id)
        .then((data) => {
          if (!cancelled) setAsset(data);
        })
        .catch((e) => {
          if (!cancelled) setError(e instanceof ApiError ? e.message : "資産の取得に失敗しました。");
        });
      return () => {
        cancelled = true;
      };
    }, [id])
  );

  function confirmDelete() {
    Alert.alert("この資産を削除しますか？", "この操作は取り消せません。", [
      { text: "キャンセル", style: "cancel" },
      { text: "削除", style: "destructive", onPress: handleDelete },
    ]);
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteAsset(id);
      router.replace("/");
    } catch (e) {
      setDeleting(false);
      Alert.alert("削除に失敗しました", e instanceof ApiError ? e.message : undefined);
    }
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!asset) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.gold} />
      </View>
    );
  }

  const subtitle =
    asset.pricingMode === "WEIGHT"
      ? `${asset.weightGrams}g ${asset.purity ?? ""}`.trim()
      : [asset.brand, asset.model].filter(Boolean).join(" ") || "詳細未設定";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <CategoryIcon category={asset.category} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.name}>{asset.name}</Text>
          <Text style={styles.subtitle}>
            {CATEGORY_LABELS[asset.category]} · {subtitle}
          </Text>
        </View>
      </View>

      <Card>
        <View style={styles.valueRow}>
          <View>
            <Text style={styles.valueLabel}>現在評価額</Text>
            <Text style={styles.value}>{formatJPY(asset.currentValue)}</Text>
            <Text
              style={[styles.profit, { color: asset.advice.profitAmount >= 0 ? colors.goldDark : colors.loss }]}
            >
              {asset.advice.profitAmount >= 0 ? "▲" : "▼"} {formatJPY(asset.advice.profitAmount)} (
              {formatPercent(asset.advice.profitPercent)})
            </Text>
          </View>
          <Sparkline data={asset.history} width={140} height={56} />
        </View>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>購入価格</Text>
            <Text style={styles.metaValue}>{formatJPY(asset.purchasePrice)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>購入日</Text>
            <Text style={styles.metaValue}>{formatDate(asset.purchaseDate)}</Text>
          </View>
        </View>
        {asset.notes ? (
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>メモ</Text>
            <Text style={styles.metaValue}>{asset.notes}</Text>
          </View>
        ) : null}
      </Card>

      <AdviceCard advice={asset.advice} />

      <View style={styles.actions}>
        <Button title="編集" variant="secondary" onPress={() => router.push(`/assets/${asset.id}/edit`)} />
        <Button title={deleting ? "削除中..." : "削除"} variant="danger" onPress={confirmDelete} loading={deleting} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.paper,
    padding: spacing.lg,
  },
  errorText: {
    color: colors.loss,
    fontSize: 14,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 4,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.goldLight,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.ink,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  valueLabel: {
    fontSize: 13,
    color: colors.muted,
  },
  value: {
    fontSize: 28,
    fontWeight: "300",
    color: colors.ink,
    marginTop: 4,
  },
  profit: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.hairline,
    marginVertical: spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  metaItem: {
    marginTop: spacing.xs,
  },
  metaLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.ink,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm + 4,
  },
});
