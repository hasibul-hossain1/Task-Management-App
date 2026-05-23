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
            backgroundColor: colors.neutral[200],
          },
          headerTintColor: colors.neutral[900],
          headerTitleStyle: {
            fontWeight: "700",
          },
          title: "Create Task",
        }}
      />
    </Stack>
  );
}
