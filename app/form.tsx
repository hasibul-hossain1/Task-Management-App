import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { colors } from "@/constants";

type PickerMode = "date" | "time";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueAt, setDueAt] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<PickerMode | null>(null);

  const formattedDate = dueAt.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = dueAt.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const handleDueAtChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (event.type === "dismissed") {
      setPickerMode(null);
      return;
    }

    if (selectedDate) {
      setDueAt(selectedDate);
    }

    if (Platform.OS === "android") {
      setPickerMode(null);
    }
  };
  const handleSubmit = () => {
    console.log({
      description,
      dueAt,
      title,
    });
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <View style={styles.form}>
        <View style={styles.intro}>
          <Text style={styles.heading}>New Task</Text>
          <Text style={styles.subheading}>
            Add a clear title and a helpful description.
          </Text>
        </View>

        <Input
          label="Task title"
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
        />

        <Input
          label="Task description"
          placeholder="Write task details"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />

        <View style={styles.scheduleField}>
          <View style={styles.labelRow}>
            <View style={styles.labelAccent} />
            <Text style={styles.label}>Due date & time</Text>
          </View>

          <View style={styles.scheduleRow}>
            <Pressable
              onPress={() => setPickerMode("date")}
              style={({ pressed }) => [
                styles.scheduleButton,
                pickerMode === "date" && styles.scheduleButtonActive,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={22}
                color={colors.accent[600]}
              />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleCaption}>Date</Text>
                <Text style={styles.scheduleValue}>{formattedDate}</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setPickerMode("time")}
              style={({ pressed }) => [
                styles.scheduleButton,
                pickerMode === "time" && styles.scheduleButtonActive,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="time-outline"
                size={22}
                color={colors.accent[600]}
              />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleCaption}>Time</Text>
                <Text style={styles.scheduleValue}>{formattedTime}</Text>
              </View>
            </Pressable>
          </View>

          {pickerMode ? (
            <View style={styles.pickerCard}>
              {Platform.OS === "ios" ? (
                <Pressable
                  onPress={() => setPickerMode(null)}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </Pressable>
              ) : null}

              <DateTimePicker
                value={dueAt}
                mode={pickerMode}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDueAtChange}
              />
            </View>
          ) : null}
        </View>

        <Button
          title="Create Task"
          fullWidth
          size="lg"
          disabled={!title.trim()}
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Form;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.neutral[100],
    flex: 1,
  },
  form: {
    gap: 20,
    padding: 20,
  },
  intro: {
    gap: 4,
    marginBottom: 4,
  },
  heading: {
    color: colors.neutral[900],
    fontSize: 24,
    fontWeight: "700",
  },
  subheading: {
    color: colors.neutral[500],
    fontSize: 15,
    lineHeight: 21,
  },
  scheduleField: {
    gap: 8,
  },
  labelRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  labelAccent: {
    backgroundColor: colors.accent[600],
    borderRadius: 999,
    height: 16,
    width: 4,
  },
  label: {
    color: colors.neutral[700],
    fontSize: 15,
    fontWeight: "700",
  },
  scheduleRow: {
    flexDirection: "row",
    gap: 12,
  },
  scheduleButton: {
    alignItems: "center",
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral[300],
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 58,
    paddingHorizontal: 14,
  },
  scheduleButtonActive: {
    borderColor: colors.accent[600],
  },
  pressed: {
    opacity: 0.82,
  },
  scheduleText: {
    flex: 1,
    gap: 2,
  },
  scheduleCaption: {
    color: colors.neutral[500],
    fontSize: 12,
    fontWeight: "600",
  },
  scheduleValue: {
    color: colors.neutral[900],
    fontSize: 15,
    fontWeight: "700",
  },
  pickerCard: {
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral[300],
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  doneButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  doneButtonText: {
    color: colors.accent[600],
    fontSize: 15,
    fontWeight: "700",
  },
  submitButton: {
    marginTop: 4,
  },
});
