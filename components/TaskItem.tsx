import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "@/constants";
import type { Task } from "@/features/tasks/tasksSlice";

type TaskItemProps = {
  task: Task;
  onPress: () => void;
  onToggleCompletion: () => Promise<void>;
};

function formatDueDate(dueAt: string) {
  const date = new Date(dueAt);

  if (Number.isNaN(date.getTime())) {
    return "No schedule";
  }

  return date.toLocaleString(undefined, {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  });
}

function hasDueDatePassed(dueAt: string) {
  const dueDate = new Date(dueAt);

  return (
    !Number.isNaN(dueDate.getTime()) &&
    dueDate.getTime() < Date.now()
  );
}

export function TaskItem({
  task,
  onPress,
  onToggleCompletion,
}: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayedCompleted, setDisplayedCompleted] = useState(task.completed);
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardTranslateX = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(1)).current;
  const hasPassedDueDate = hasDueDatePassed(task.dueAt);

  useEffect(() => {
    setDisplayedCompleted(task.completed);
  }, [task.completed]);

  const animateToggle = () =>
    new Promise<void>((resolve) => {
      Animated.parallel([
        Animated.sequence([
          Animated.spring(checkScale, {
            friction: 4,
            tension: 170,
            toValue: 1.25,
            useNativeDriver: true,
          }),
          Animated.spring(checkScale, {
            friction: 5,
            tension: 150,
            toValue: 1,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(170),
          Animated.parallel([
            Animated.timing(cardOpacity, {
              duration: 180,
              toValue: 0,
              useNativeDriver: true,
            }),
            Animated.timing(cardTranslateX, {
              duration: 180,
              toValue: 18,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start(() => resolve());
    });

  const handleToggleCompletion = async (event: GestureResponderEvent) => {
    event.stopPropagation();

    if (isUpdating) {
      return;
    }

    setIsUpdating(true);
    setDisplayedCompleted(!task.completed);
    await animateToggle();

    try {
      await onToggleCompletion();
    } catch {
      setDisplayedCompleted(task.completed);
      cardOpacity.setValue(1);
      cardTranslateX.setValue(0);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Animated.View
      style={{
        opacity: cardOpacity,
        transform: [{ translateX: cardTranslateX }],
      }}
    >
      <Pressable
        accessibilityLabel={`Open details for ${task.title}`}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <Pressable
          accessibilityLabel={
            displayedCompleted
              ? `Mark ${task.title} incomplete`
              : `Mark ${task.title} complete`
          }
          accessibilityRole="checkbox"
          accessibilityState={{
            checked: displayedCompleted,
            disabled: isUpdating,
          }}
          disabled={isUpdating}
          hitSlop={8}
          onPress={handleToggleCompletion}
          style={[
            styles.completionButton,
            displayedCompleted && styles.completedBadge,
          ]}
        >
          <Animated.View style={{ transform: [{ scale: checkScale }] }}>
            <Ionicons
              color={
                displayedCompleted ? colors.primary[600] : colors.text.muted
              }
              name={
                displayedCompleted
                  ? "checkmark-circle"
                  : "ellipse-outline"
              }
              size={25}
            />
          </Animated.View>
        </Pressable>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text
              numberOfLines={1}
              style={[
                styles.title,
                displayedCompleted && styles.completedTitle,
              ]}
            >
              {task.title}
            </Text>
            {displayedCompleted ? (
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>Done</Text>
              </View>
            ) : null}
            <Ionicons
              color={colors.text.muted}
              name="chevron-forward-outline"
              size={17}
            />
          </View>

          <View
            style={[styles.dueRow, hasPassedDueDate && styles.overdueDueRow]}
          >
            <Ionicons
              color={
                hasPassedDueDate ? colors.danger[600] : colors.primary[600]
              }
              name="time-outline"
              size={15}
            />
            <Text
              style={[
                styles.dueText,
                hasPassedDueDate && styles.overdueDueText,
              ]}
            >
              {formatDueDate(task.dueAt)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface.card,
    borderColor: colors.border.subtle,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    gap: 12,
    padding: 16,
    shadowColor: colors.shadow.soft,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
  },
  completionButton: {
    alignItems: "center",
    backgroundColor: colors.background.soft,
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  completedBadge: {
    backgroundColor: colors.primary[50],
  },
  content: {
    flex: 1,
    gap: 8,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  title: {
    color: colors.text.primary,
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
  },
  completedTitle: {
    color: colors.text.muted,
    textDecorationLine: "line-through",
  },
  statusPill: {
    backgroundColor: colors.primary[50],
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusText: {
    color: colors.primary[700],
    fontSize: 11,
    fontWeight: "800",
  },
  dueRow: {
    alignItems: "center",
    backgroundColor: colors.background.base,
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  dueText: {
    color: colors.text.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  overdueDueRow: {
    backgroundColor: colors.danger[50],
  },
  overdueDueText: {
    color: colors.danger[600],
  },
});

export default TaskItem;
