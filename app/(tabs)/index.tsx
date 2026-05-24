import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { TaskItem } from "@/components/TaskItem";
import { colors } from "@/constants";
import type { RootState } from "@/store/store";
import { databaseUtils } from "@/utils/database";

export default function Index() {
  const tasks = useSelector((state: RootState) =>
    state.tasks.filter((task) => !task.completed),
  );

  const toggleTaskCompletion = async (taskId: number) => {
    try {
      await databaseUtils.toggleTaskCompletion(taskId);
    } catch (error) {
      Alert.alert("Unable to update task", "Please try again.");
      throw error;
    }
  };

  return (
    <View style={styles.screen}>
      <View pointerEvents="none" style={styles.blobLayer}>
        <View style={[styles.blob, styles.mintBlob]} />
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
                name="sparkles-outline"
                size={28}
                color={colors.primary[600]}
              />
            </View>
            <Text style={styles.title}>Ready to plan?</Text>
            <Text style={styles.subtitle}>
              Tap the plus button above and turn your next idea into a task.
            </Text>
          </View>
        }
        ListHeaderComponent={
          tasks.length > 0 ? (
            <View style={styles.header}>
              <View>
                <Text style={styles.heading}>My Tasks</Text>
                <Text style={styles.headerSubtitle}>
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in your
                  list
                </Text>
              </View>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{tasks.length}</Text>
              </View>
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
  countBadge: {
    alignItems: "center",
    backgroundColor: colors.primary[50],
    borderRadius: 14,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  countText: {
    color: colors.primary[700],
    fontSize: 19,
    fontWeight: "900",
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
    height: 260,
    right: -110,
    top: -70,
    width: 260,
  },
  peachBlob: {
    backgroundColor: colors.background.peach,
    bottom: 92,
    height: 210,
    left: -100,
    width: 210,
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
    backgroundColor: colors.primary[50],
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
