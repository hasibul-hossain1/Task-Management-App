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
      <View pointerEvents="none" style={styles.blobLayer}>
        <View style={[styles.blob, styles.mintBlob]} />
        <View style={[styles.blob, styles.peachBlob]} />
        <View style={[styles.blob, styles.skyBlob]} />
      </View>

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
                color={colors.primary[600]}
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
                color={colors.primary[600]}
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
    backgroundColor: colors.background.base,
    flex: 1,
    overflow: "hidden",
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
    height: 220,
    right: -92,
    top: -58,
    width: 220,
  },
  peachBlob: {
    backgroundColor: colors.background.peach,
    height: 190,
    left: -82,
    top: 146,
    width: 190,
  },
  skyBlob: {
    backgroundColor: colors.background.sky,
    bottom: -76,
    height: 210,
    right: -72,
    width: 210,
  },
  form: {
    gap: 22,
    padding: 22,
    zIndex: 1,
  },
  intro: {
    backgroundColor: colors.background.soft,
    borderColor: colors.border.subtle,
    borderRadius: 22,
    borderWidth: 1,
    gap: 6,
    marginBottom: 2,
    padding: 18,
    shadowColor: colors.shadow.soft,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
  },
  heading: {
    color: colors.text.primary,
    fontSize: 28,
    fontWeight: "900",
  },
  subheading: {
    color: colors.text.muted,
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
    backgroundColor: colors.accent[500],
    borderRadius: 999,
    height: 18,
    width: 4,
  },
  label: {
    color: colors.text.secondary,
    fontSize: 15,
    fontWeight: "800",
  },
  scheduleRow: {
    flexDirection: "row",
    gap: 12,
  },
  scheduleButton: {
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderColor: colors.border.default,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 64,
    paddingHorizontal: 16,
    shadowColor: colors.shadow.soft,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  scheduleButtonActive: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[600],
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  scheduleText: {
    flex: 1,
    gap: 2,
  },
  scheduleCaption: {
    color: colors.text.muted,
    fontSize: 12,
    fontWeight: "800",
  },
  scheduleValue: {
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: "800",
  },
  pickerCard: {
    backgroundColor: colors.surface.card,
    borderColor: colors.border.default,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    overflow: "hidden",
    shadowColor: colors.shadow.soft,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  doneButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  doneButtonText: {
    color: colors.primary[600],
    fontSize: 15,
    fontWeight: "800",
  },
  submitButton: {
    marginTop: 4,
  },
});
