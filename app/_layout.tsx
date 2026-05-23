import { Stack } from "expo-router";

import { colors } from "@/constants";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="form"
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.base,
          },
          headerTintColor: colors.text.primary,
          headerTitleStyle: {
            color: colors.text.primary,
            fontWeight: "700",
          },
          title: "Create Task",
        }}
      />
    </Stack>
  );
}
