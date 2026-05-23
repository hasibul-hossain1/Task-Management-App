import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "@/constants";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  title?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Button({
  title,
  children,
  variant = "solid",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const content = children ?? title;
  const textColor =
    variant === "solid" ? colors.text.inverse : colors.primary[700];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          {typeof content === "string" ? (
            <Text style={[styles.text, { color: textColor }, textStyle]}>
              {content}
            </Text>
          ) : (
            content
          )}
          {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  sm: {
    minHeight: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  md: {
    minHeight: 44,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  lg: {
    minHeight: 52,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  solid: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
    borderWidth: 1,
    elevation: 4,
    shadowColor: colors.shadow.emerald,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  outline: {
    backgroundColor: colors.surface.card,
    borderColor: colors.border.default,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: colors.neutral.transparent,
    borderColor: colors.neutral.transparent,
    borderWidth: 1,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontSize: 16,
    fontWeight: "800",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
