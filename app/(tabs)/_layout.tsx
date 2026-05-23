import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { Button } from "@/components/ui/Button";
import { colors } from "@/constants";

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.background.base,
                },
                headerTintColor: colors.text.primary,
                headerTitleStyle: {
                    color: colors.text.primary,
                    fontWeight: "800",
                },
                headerRight: () => (
                    <Button
                        size="sm"
                        leftIcon={
                            <Ionicons
                                name="add"
                                size={24}
                                color={colors.text.inverse}
                            />
                        }
                        onPress={() => router.push("/form")}
                        style={styles.headerButton}
                    />
                ),
                sceneStyle: {
                    backgroundColor: colors.background.base,
                },
                tabBarActiveTintColor: colors.primary[600],
                tabBarInactiveTintColor: colors.text.muted,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "800",
                },
                tabBarStyle: {
                    backgroundColor: colors.background.soft,
                    borderColor: colors.border.subtle,
                    borderRadius: 28,
                    borderWidth: 1,
                    elevation: 8,
                    height: 68,
                    marginBottom: 34,
                    marginHorizontal: 16,
                    paddingBottom: 8,
                    paddingTop: 8,
                    shadowColor: colors.shadow.soft,
                    shadowOffset: { height: 8, width: 0 },
                    shadowOpacity: 0.14,
                    shadowRadius: 18,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="list"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="completed"
                options={{
                    title: "Completed",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabsLayout

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 16,
    },
});
