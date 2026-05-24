import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { colors } from "@/constants";
import type { RootState } from "@/store/store";

function formatDueDate(dueAt: string) {
  const date = new Date(dueAt);

  if (Number.isNaN(date.getTime())) {
    return { date: "No due date", time: "Not scheduled" };
  }

  return {
    date: date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

export default function TasksDetails() {
  const { taskId } = useLocalSearchParams<{ taskId?: string }>();
  const id = Number(taskId);
  const task = useSelector((state: RootState) =>
    state.tasks.find((item) => item.id === id),
  );

  if (!task) {
    return (
      <View style={styles.screen}>
        <DetailsHeader />
        <View style={styles.notFoundCard}>
          <View style={styles.notFoundIcon}>
            <Ionicons
              color={colors.text.muted}
              name="document-text-outline"
              size={30}
            />
          </View>
          <Text style={styles.notFoundTitle}>Task not found</Text>
          <Text style={styles.notFoundMessage}>
            This task may no longer be available in your list.
          </Text>
        </View>
      </View>
    );
  }

  const schedule = formatDueDate(task.dueAt);

  return (
    <View style={styles.screen}>
      <View pointerEvents="none" style={styles.blobLayer}>
        <View style={[styles.blob, styles.mintBlob]} />
        <View style={[styles.blob, styles.peachBlob]} />
      </View>

      <DetailsHeader />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View
              style={[
                styles.statusBadge,
                task.completed && styles.completedStatusBadge,
              ]}
            >
              <Ionicons
                color={
                  task.completed ? colors.primary[700] : colors.accent[700]
                }
                name={
                  task.completed
                    ? "checkmark-circle"
                    : "hourglass-outline"
                }
                size={15}
              />
              <Text
                style={[
                  styles.statusText,
                  task.completed && styles.completedStatusText,
                ]}
              >
                {task.completed ? "Completed" : "In progress"}
              </Text>
            </View>
            <Text style={styles.taskNumber}>#{task.id}</Text>
          </View>

          <Text
            style={[styles.title, task.completed && styles.completedTitle]}
          >
            {task.title}
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.sectionHeader}>
            <Ionicons
              color={colors.primary[600]}
              name="reader-outline"
              size={19}
            />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          <Text
            style={[
              styles.description,
              !task.description && styles.placeholderText,
            ]}
          >
            {task.description || "No description was added for this task."}
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.sectionHeader}>
            <Ionicons
              color={colors.primary[600]}
              name="calendar-outline"
              size={19}
            />
            <Text style={styles.sectionTitle}>Schedule</Text>
          </View>

          <View style={styles.scheduleGrid}>
            <View style={styles.scheduleTile}>
              <Text style={styles.scheduleLabel}>Due date</Text>
              <Text style={styles.scheduleValue}>{schedule.date}</Text>
            </View>
            <View style={styles.scheduleTile}>
              <Text style={styles.scheduleLabel}>Due time</Text>
              <Text style={styles.scheduleValue}>{schedule.time}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function DetailsHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Ionicons
          color={colors.text.primary}
          name="arrow-back-outline"
          size={23}
        />
      </Pressable>
      <Text style={styles.headerTitle}>Task Details</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.base,
    flex: 1,
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
    height: 240,
    right: -100,
    top: -60,
    width: 240,
  },
  peachBlob: {
    backgroundColor: colors.background.peach,
    bottom: -30,
    height: 200,
    left: -92,
    width: 200,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderColor: colors.border.subtle,
    borderRadius: 14,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  pressedButton: {
    transform: [{ scale: 0.96 }],
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: 19,
    fontWeight: "900",
  },
  headerSpacer: {
    width: 46,
  },
  content: {
    gap: 16,
    padding: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: colors.surface.elevated,
    borderColor: colors.border.subtle,
    borderRadius: 26,
    borderWidth: 1,
    gap: 18,
    padding: 22,
    shadowColor: colors.shadow.soft,
    shadowOffset: { height: 7, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 17,
  },
  heroTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusBadge: {
    alignItems: "center",
    backgroundColor: colors.accent[100],
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  completedStatusBadge: {
    backgroundColor: colors.primary[50],
  },
  statusText: {
    color: colors.accent[700],
    fontSize: 12,
    fontWeight: "800",
  },
  completedStatusText: {
    color: colors.primary[700],
  },
  taskNumber: {
    color: colors.text.muted,
    fontSize: 13,
    fontWeight: "800",
  },
  title: {
    color: colors.text.primary,
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 36,
  },
  completedTitle: {
    color: colors.text.muted,
    textDecorationLine: "line-through",
  },
  detailsCard: {
    backgroundColor: colors.surface.card,
    borderColor: colors.border.subtle,
    borderRadius: 22,
    borderWidth: 1,
    gap: 16,
    padding: 18,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "900",
  },
  description: {
    color: colors.text.secondary,
    fontSize: 15,
    lineHeight: 24,
  },
  placeholderText: {
    color: colors.text.muted,
    fontStyle: "italic",
  },
  scheduleGrid: {
    gap: 10,
  },
  scheduleTile: {
    backgroundColor: colors.background.soft,
    borderRadius: 14,
    gap: 5,
    padding: 14,
  },
  scheduleLabel: {
    color: colors.text.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  scheduleValue: {
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: "800",
  },
  notFoundCard: {
    alignItems: "center",
    backgroundColor: colors.surface.elevated,
    borderColor: colors.border.subtle,
    borderRadius: 24,
    borderWidth: 1,
    gap: 10,
    margin: 20,
    marginTop: 70,
    padding: 28,
  },
  notFoundIcon: {
    alignItems: "center",
    backgroundColor: colors.background.soft,
    borderRadius: 999,
    height: 62,
    justifyContent: "center",
    marginBottom: 4,
    width: 62,
  },
  notFoundTitle: {
    color: colors.text.primary,
    fontSize: 21,
    fontWeight: "900",
  },
  notFoundMessage: {
    color: colors.text.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});
