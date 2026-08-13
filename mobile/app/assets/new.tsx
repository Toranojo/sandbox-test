import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { colors, spacing } from "@/lib/theme";
import { AssetForm } from "@/components/AssetForm";

export default function NewAssetScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AssetForm />
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
});
