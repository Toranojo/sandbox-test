import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps } from "react-native";
import { colors, radius, spacing } from "@/lib/theme";

type Variant = "primary" | "secondary" | "danger";

export function Button({
  variant = "primary",
  title,
  loading,
  disabled,
  style,
  ...props
}: PressableProps & { variant?: Variant; title: string; loading?: boolean }) {
  const variantStyle = VARIANT_STYLES[variant];
  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
        style as any,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text.color as string} />
      ) : (
        <Text style={[styles.text, variantStyle.text]}>{title}</Text>
      )}
    </Pressable>
  );
}

const VARIANT_STYLES = {
  primary: {
    container: { backgroundColor: colors.ink },
    text: { color: colors.white },
  },
  secondary: {
    container: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.hairline },
    text: { color: colors.ink },
  },
  danger: {
    container: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.loss },
    text: { color: colors.loss },
  },
} as const;

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});
