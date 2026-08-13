import { useCallback, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { colors, spacing } from "@/lib/theme";
import { getAsset, ApiError } from "@/lib/api";
import type { AssetDetail } from "@/lib/types";
import { AssetForm } from "@/components/AssetForm";

export default function EditAssetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [asset, setAsset] = useState<AssetDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AssetForm asset={asset} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  content: {
    padding: spacing.lg,
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
});
