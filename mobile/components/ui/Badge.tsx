import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/lib/theme";

type Tone = "gold" | "loss" | "neutral";

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: string }) {
  const toneStyle = TONE_STYLES[tone];
  return (
    <View style={[styles.badge, toneStyle.container]}>
      <Text style={[styles.text, toneStyle.text]}>{children}</Text>
    </View>
  );
}

const TONE_STYLES = {
  gold: { container: { backgroundColor: colors.goldLight }, text: { color: colors.goldDark } },
  loss: { container: { backgroundColor: "#F5E3E2" }, text: { color: colors.loss } },
  neutral: { container: { backgroundColor: colors.hairline }, text: { color: colors.muted } },
} as const;

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.full,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm + 4,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
