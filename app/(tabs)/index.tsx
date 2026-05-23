import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants";

export default function Index() {
  return (
    <View style={styles.screen}>
      <View pointerEvents="none" style={styles.blobLayer}>
        <View style={[styles.blob, styles.mintBlob]} />
        <View style={[styles.blob, styles.peachBlob]} />
      </View>

      <View style={styles.card}>
        <View style={styles.iconBadge}>
          <Ionicons name="sparkles-outline" size={28} color={colors.primary[600]} />
        </View>
        <Text style={styles.title}>Ready to plan?</Text>
        <Text style={styles.subtitle}>
          Tap the plus button above and turn your next idea into a task.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: colors.background.base,
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    padding: 22,
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
  card: {
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
    zIndex: 1,
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
