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
                headerStyle: {
                    backgroundColor: colors.neutral[200],
                },
                headerTintColor: colors.neutral[900],
                headerRight: () => (
                    <Button
                        size="sm"
                        leftIcon={
                            <Ionicons
                                name="add"
                                size={24}
                                color={colors.neutral.white}
                            />
                        }
                        onPress={() => router.push("/form")}
                        style={styles.headerButton}
                    />
                ),
                sceneStyle: {
                    backgroundColor: colors.neutral[100],
                },
                tabBarActiveTintColor: colors.accent[600],
                tabBarInactiveTintColor: colors.neutral[500],
                tabBarStyle: {
                    backgroundColor: colors.neutral[200],
                    borderColor: colors.neutral[300],
                    borderRadius: 24,
                    borderWidth: 1,
                    elevation: 4,
                    height: 64,
                    marginBottom: 40,
                    marginHorizontal: 16,
                    paddingBottom: 8,
                    paddingTop: 8,
                    shadowColor: colors.neutral[900],
                    shadowOffset: { height: 2, width: 0 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
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
