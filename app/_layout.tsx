import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { colors } from "@/constants";
import { db } from "@/src/db";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import migrations from "../drizzle/migrations";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
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
      </SafeAreaProvider>
    </Provider>
  );
}
