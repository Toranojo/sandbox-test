import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { colors, radius, spacing } from "@/lib/theme";
import { getAssets, ApiError } from "@/lib/api";
import type { AssetCategory, AssetListItem } from "@/lib/types";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import { AssetCard } from "@/components/AssetCard";

type FilterKey = "ALL" | "METAL" | "ITEM";

const FILTERS: { key: FilterKey; label: string; categories: AssetCategory[] | null }[] = [
  { key: "ALL", label: "すべて", categories: null },
  { key: "METAL", label: "貴金属", categories: ["GOLD", "PLATINUM", "SILVER"] },
  { key: "ITEM", label: "ブランド品", categories: ["WATCH", "BAG", "JEWELRY", "OTHER"] },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [items, setItems] = useState<AssetListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("ALL");

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    setError(null);
    try {
      const data = await getAssets();
      setItems(data);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "資産の取得に失敗しました。");
    } finally {
      if (isRefresh) setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const filtered = useMemo(() => {
    if (!items) return [];
    const active = FILTERS.find((f) => f.key === filter);
    if (!active?.categories) return items;
    return items.filter((i) => active.categories!.includes(i.category));
  }, [items, filter]);

  const totalCurrentValue = useMemo(() => (items ?? []).reduce((s, i) => s + i.currentValue, 0), [items]);
  const totalPurchasePrice = useMemo(() => (items ?? []).reduce((s, i) => s + i.purchasePrice, 0), [items]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} />}
        ListHeaderComponent={
          items ? (
            <View style={styles.headerBlock}>
              <PortfolioSummary
                totalCurrentValue={totalCurrentValue}
                totalPurchasePrice={totalPurchasePrice}
                assetCount={items.length}
              />
              <View style={styles.filterRow}>
                {FILTERS.map((f) => (
                  <Pressable
                    key={f.key}
                    onPress={() => setFilter(f.key)}
                    style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
                  >
                    <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>{f.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <AssetCard item={item} />
          </View>
        )}
        ListEmptyComponent={
          error ? (
            <View style={styles.centerBlock}>
              <Text style={styles.errorText}>{error}</Text>
              <Pressable onPress={() => load()} style={styles.retryButton}>
                <Text style={styles.retryText}>再読み込み</Text>
              </Pressable>
            </View>
          ) : items === null ? (
            <View style={styles.centerBlock}>
              <ActivityIndicator color={colors.gold} />
            </View>
          ) : (
            <View style={styles.centerBlock}>
              <Text style={styles.emptyText}>
                {items.length === 0
                  ? "まだ資産が登録されていません。右下の「+」から追加しましょう。"
                  : "このカテゴリの資産はまだありません。"}
              </Text>
            </View>
          )
        }
      />
      <Pressable style={styles.fab} onPress={() => router.push("/assets/new")}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
    gap: spacing.sm + 4,
  },
  headerBlock: {
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  filterRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  filterChip: {
    borderRadius: radius.full,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  filterChipActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.muted,
  },
  filterTextActive: {
    color: colors.white,
  },
  cardWrap: {
    marginBottom: spacing.sm + 4,
  },
  centerBlock: {
    paddingTop: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    gap: spacing.md,
  },
  errorText: {
    color: colors.loss,
    fontSize: 14,
    textAlign: "center",
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: "center",
  },
  retryButton: {
    borderRadius: radius.full,
    paddingVertical: 8,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.ink,
  },
  retryText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  fabText: {
    color: colors.white,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "300",
  },
});
