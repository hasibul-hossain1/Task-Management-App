import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants";

const Completed = () => {
  return (
    <View style={styles.screen}>
      <View pointerEvents="none" style={styles.blobLayer}>
        <View style={[styles.blob, styles.skyBlob]} />
        <View style={[styles.blob, styles.peachBlob]} />
      </View>

      <View style={styles.card}>
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
    </View>
  );
};

export default Completed;

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
