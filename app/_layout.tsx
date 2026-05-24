import { Ionicons } from "@expo/vector-icons";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { TaskDatabaseSync } from "@/components/TaskDatabaseSync";
import { colors } from "@/constants";
import { db } from "@/src/db";
import store from "@/store/store";
import migrations from "../drizzle/migrations";

type DatabaseInitializationStatus = "loading" | "error";

type DatabaseInitializationScreenProps = {
  status: DatabaseInitializationStatus;
  errorMessage?: string;
};

function DatabaseInitializationScreen({
  status,
  errorMessage,
}: DatabaseInitializationScreenProps) {
  const isError = status === "error";

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={styles.statusScreen}>
        <View pointerEvents="none" style={styles.blobLayer}>
          <View style={[styles.blob, styles.mintBlob]} />
          <View style={[styles.blob, styles.peachBlob]} />
        </View>

        <View
          style={[styles.statusCard, isError && styles.statusCardError]}
        >
          <View
            style={[styles.iconBadge, isError && styles.iconBadgeError]}
          >
            {isError ? (
              <Ionicons
                color={colors.danger[600]}
                name="alert-circle-outline"
                size={34}
              />
            ) : (
              <ActivityIndicator color={colors.primary[600]} size="large" />
            )}
          </View>

          <Text style={styles.statusTitle}>
            {isError ? "Tasks could not be loaded" : "Preparing your tasks"}
          </Text>
          <Text style={styles.statusMessage}>
            {isError
              ? "We could not set up local storage. Please restart the app and try again."
              : "Getting your saved plans ready for you."}
          </Text>

          {isError && errorMessage ? (
            <View style={styles.errorDetail}>
              <Text numberOfLines={3} style={styles.errorDetailText}>
                {errorMessage}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

function AppNavigator() {
  return (
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
  );
}

export default function RootLayout() {
  const { success: isDatabaseReady, error: databaseError } = useMigrations(
    db,
    migrations,
  );

  return (
    <Provider store={store}>
      {databaseError ? (
        <DatabaseInitializationScreen
          status="error"
          errorMessage={databaseError.message}
        />
      ) : isDatabaseReady ? (
        <>
          <TaskDatabaseSync />
          <AppNavigator />
        </>
      ) : (
        <DatabaseInitializationScreen status="loading" />
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  statusScreen: {
    alignItems: "center",
    backgroundColor: colors.background.base,
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    padding: 24,
  },
  blobLayer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  blob: {
    borderRadius: 999,
    position: "absolute",
  },
  mintBlob: {
    backgroundColor: colors.background.glow,
    height: 270,
    right: -96,
    top: -72,
    width: 270,
  },
  peachBlob: {
    backgroundColor: colors.background.peach,
    bottom: 72,
    height: 220,
    left: -104,
    width: 220,
  },
  statusCard: {
    alignItems: "center",
    backgroundColor: colors.surface.elevated,
    borderColor: colors.border.subtle,
    borderRadius: 28,
    borderWidth: 1,
    gap: 12,
    padding: 28,
    shadowColor: colors.shadow.soft,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    width: "100%",
  },
  statusCardError: {
    borderColor: colors.danger[600],
  },
  iconBadge: {
    alignItems: "center",
    backgroundColor: colors.primary[50],
    borderRadius: 999,
    height: 68,
    justifyContent: "center",
    marginBottom: 4,
    width: 68,
  },
  iconBadgeError: {
    backgroundColor: colors.danger[50],
  },
  statusTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  statusMessage: {
    color: colors.text.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  errorDetail: {
    alignSelf: "stretch",
    backgroundColor: colors.danger[50],
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorDetailText: {
    color: colors.danger[600],
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
});
