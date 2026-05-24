import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { TaskItem } from "@/components/TaskItem";
import { colors } from "@/constants";
import type { RootState } from "@/store/store";
import { databaseUtils } from "@/utils/database";

export default function Completed() {
  const tasks = useSelector((state: RootState) =>
    state.tasks.filter((task) => task.completed),
  );

  const toggleTaskCompletion = async (taskId: number) => {
    try {
      await databaseUtils.toggleTaskCompletion(taskId);
    } catch (error) {
      Alert.alert("Unable to update task", "Please try again.");
      throw error;
    }
  };

  const clearCompletedTasks = () => {
    Alert.alert(
      "Clear completed tasks?",
      "This will permanently remove every completed task.",
      [
        { style: "cancel", text: "Cancel" },
        {
          onPress: async () => {
            try {
              await databaseUtils.clearCompletedTasks();
            } catch {
              Alert.alert("Unable to clear tasks", "Please try again.");
            }
          },
          style: "destructive",
          text: "Clear",
        },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      <View pointerEvents="none" style={styles.blobLayer}>
        <View style={[styles.blob, styles.skyBlob]} />
        <View style={[styles.blob, styles.peachBlob]} />
      </View>

      <FlatList
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyContent : styles.listContent
        }
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.iconBadge}>
              <Ionicons
                name="checkmark-done-outline"
                size={30}
                color={colors.accent[700]}
              />
            </View>
            <Text style={styles.title}>Nothing completed yet</Text>
            <Text style={styles.subtitle}>
              Finished tasks will feel right at home here.
            </Text>
          </View>
        }
        ListHeaderComponent={
          tasks.length > 0 ? (
            <View style={styles.header}>
              <View>
                <Text style={styles.heading}>Completed</Text>
                <Text style={styles.headerSubtitle}>
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"} finished
                </Text>
              </View>
              <Pressable
                accessibilityLabel="Clear completed tasks"
                accessibilityRole="button"
                onPress={clearCompletedTasks}
                style={({ pressed }) => [
                  styles.clearButton,
                  pressed && styles.clearButtonPressed,
                ]}
              >
                <Ionicons
                  color={colors.danger[600]}
                  name="trash-outline"
                  size={16}
                />
                <Text style={styles.clearButtonText}>Clear completed</Text>
              </Pressable>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() =>
              router.push({
                pathname: "/tasksDetails",
                params: { taskId: item.id.toString() },
              })
            }
            onToggleCompletion={() => toggleTaskCompletion(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.base,
    flex: 1,
    overflow: "hidden",
  },
  list: {
    flex: 1,
    zIndex: 1,
  },
  listContent: {
    gap: 12,
    paddingBottom: 112,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 22,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  heading: {
    color: colors.text.primary,
    fontSize: 28,
    fontWeight: "900",
  },
  headerSubtitle: {
    color: colors.text.muted,
    fontSize: 14,
    marginTop: 4,
  },
  clearButton: {
    alignItems: "center",
    backgroundColor: colors.danger[50],
    borderColor: colors.danger[600],
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  clearButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  clearButtonText: {
    color: colors.danger[600],
    fontSize: 12,
    fontWeight: "800",
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
  skyBlob: {
    backgroundColor: colors.background.sky,
    height: 250,
    left: -100,
    top: -70,
    width: 250,
  },
  peachBlob: {
    backgroundColor: colors.background.peach,
    bottom: 96,
    height: 220,
    right: -105,
    width: 220,
  },
  emptyCard: {
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
  iconBadge: {
    alignItems: "center",
    backgroundColor: colors.accent[100],
    borderRadius: 999,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  title: {
    color: colors.text.primary,
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: colors.text.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});
