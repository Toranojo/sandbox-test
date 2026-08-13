import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/lib/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.paper },
          headerShadowVisible: false,
          headerTintColor: colors.ink,
          contentStyle: { backgroundColor: colors.paper },
        }}
      >
        <Stack.Screen name="index" options={{ title: "資産トラッカー" }} />
        <Stack.Screen name="assets/new" options={{ title: "資産を登録" }} />
        <Stack.Screen name="assets/[id]/index" options={{ title: "資産詳細" }} />
        <Stack.Screen name="assets/[id]/edit" options={{ title: "資産を編集" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
