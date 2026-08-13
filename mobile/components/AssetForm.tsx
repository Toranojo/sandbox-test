import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { colors, radius, spacing } from "@/lib/theme";
import { CATEGORY_GROUPS, CATEGORY_LABELS, PURITY_OPTIONS, isWeightCategory } from "@/lib/assetCategories";
import { formatDateInput } from "@/lib/format";
import { createAsset, updateAsset, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import type { Asset, AssetCategory } from "@/lib/types";

export function AssetForm({ asset }: { asset?: Asset }) {
  const router = useRouter();
  const isEdit = Boolean(asset);

  const [category, setCategory] = useState<AssetCategory>(asset?.category ?? "GOLD");
  const [name, setName] = useState(asset?.name ?? "");
  const [brand, setBrand] = useState(asset?.brand ?? "");
  const [model, setModel] = useState(asset?.model ?? "");
  const [weightGrams, setWeightGrams] = useState(asset?.weightGrams?.toString() ?? "");
  const [purity, setPurity] = useState(asset?.purity ?? "");
  const [quantity, setQuantity] = useState(asset?.quantity?.toString() ?? "1");
  const [purchasePrice, setPurchasePrice] = useState(asset?.purchasePrice?.toString() ?? "");
  const [purchaseDate, setPurchaseDate] = useState(
    asset ? formatDateInput(asset.purchaseDate) : formatDateInput(new Date())
  );
  const [notes, setNotes] = useState(asset?.notes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const weightMode = isWeightCategory(category);
  const purityChoices = weightMode ? PURITY_OPTIONS[category as "GOLD" | "PLATINUM" | "SILVER"] : [];

  async function handleSubmit() {
    setError(null);

    if (!name.trim()) return setError("資産名を入力してください。");
    if (!purchasePrice || Number(purchasePrice) <= 0) return setError("購入価格を正しく入力してください。");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(purchaseDate)) return setError("購入日はYYYY-MM-DD形式で入力してください。");
    if (weightMode) {
      if (!weightGrams || Number(weightGrams) <= 0) return setError("重量(グラム)を正しく入力してください。");
    } else if (!quantity || Number(quantity) <= 0) {
      return setError("数量を正しく入力してください。");
    }

    setSubmitting(true);
    const payload = {
      category,
      name: name.trim(),
      purchasePrice: Number(purchasePrice),
      purchaseDate,
      notes: notes || null,
      ...(weightMode
        ? { weightGrams: Number(weightGrams), purity: purity || null }
        : { brand: brand || null, model: model || null, quantity: Number(quantity) || 1 }),
    };

    try {
      const result = isEdit ? await updateAsset(asset!.id, payload) : await createAsset(payload);
      router.replace(`/assets/${result.id}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "登録に失敗しました。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.form}>
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.fieldLabel}>カテゴリ</Text>
      {CATEGORY_GROUPS.map((group) => (
        <View key={group.label} style={styles.groupBlock}>
          <Text style={styles.groupLabel}>{group.label}</Text>
          <View style={styles.chipRow}>
            {group.categories.map((c) => (
              <Chip key={c} label={CATEGORY_LABELS[c]} active={category === c} onPress={() => setCategory(c)} />
            ))}
          </View>
        </View>
      ))}

      <Field label="資産名">
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="例: ロレックス サブマリーナ" />
      </Field>

      {weightMode ? (
        <View style={styles.row}>
          <Field label="重量 (g)" style={styles.half}>
            <TextInput
              style={styles.input}
              value={weightGrams}
              onChangeText={setWeightGrams}
              keyboardType="decimal-pad"
            />
          </Field>
          <Field label="純度" style={styles.half}>
            <View style={styles.chipRow}>
              {purityChoices.map((p) => (
                <Chip key={p.value} label={p.value} active={purity === p.value} onPress={() => setPurity(p.value)} small />
              ))}
            </View>
          </Field>
        </View>
      ) : (
        <>
          <Field label="ブランド">
            <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="例: Rolex" />
          </Field>
          <Field label="モデル名">
            <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="例: Submariner 116610LN" />
          </Field>
          <Field label="数量">
            <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="number-pad" />
          </Field>
        </>
      )}

      <View style={styles.row}>
        <Field label="購入価格 (円)" style={styles.half}>
          <TextInput style={styles.input} value={purchasePrice} onChangeText={setPurchasePrice} keyboardType="number-pad" />
        </Field>
        <Field label="購入日" style={styles.half}>
          <TextInput style={styles.input} value={purchaseDate} onChangeText={setPurchaseDate} placeholder="YYYY-MM-DD" />
        </Field>
      </View>

      <Field label="メモ (任意)">
        <TextInput
          style={[styles.input, styles.textarea]}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />
      </Field>

      <View style={styles.actions}>
        <Button
          title={submitting ? "保存中..." : isEdit ? "変更を保存" : "資産を登録"}
          onPress={handleSubmit}
          loading={submitting}
        />
        <Button title="キャンセル" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: any }) {
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

function Chip({
  label,
  active,
  onPress,
  small,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  small?: boolean;
}) {
  return (
    <Text
      onPress={onPress}
      style={[
        styles.chip,
        small && styles.chipSmall,
        active ? styles.chipActive : styles.chipInactive,
      ]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md + 4,
  },
  errorBox: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#E3B3B1",
    backgroundColor: "#FBEEED",
    padding: spacing.sm + 4,
  },
  errorText: {
    color: colors.loss,
    fontSize: 13,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.ink,
  },
  groupBlock: {
    gap: 6,
    marginTop: 4,
  },
  groupLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm + 4,
    fontSize: 15,
    color: colors.ink,
  },
  textarea: {
    minHeight: 72,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  half: {
    flex: 1,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs + 2,
  },
  chip: {
    borderRadius: radius.full,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm + 6,
    fontSize: 13,
    fontWeight: "600",
    overflow: "hidden",
  },
  chipSmall: {
    paddingVertical: 6,
    paddingHorizontal: spacing.sm + 2,
    fontSize: 12,
  },
  chipActive: {
    backgroundColor: colors.ink,
    color: colors.white,
  },
  chipInactive: {
    backgroundColor: colors.white,
    color: colors.muted,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm + 4,
    marginTop: spacing.sm,
  },
});
