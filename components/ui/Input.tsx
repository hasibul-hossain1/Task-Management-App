import type { ReactNode } from "react";
import { forwardRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "@/constants";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      containerStyle,
      inputContainerStyle,
      inputStyle,
      editable = true,
      multiline = false,
      onBlur,
      onFocus,
      placeholderTextColor = colors.neutral[500],
      style,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const supportingText = error ?? helperText;

    return (
      <View style={[styles.container, containerStyle]}>
        {label ? (
          <View style={styles.labelRow}>
            <View style={styles.labelAccent} />
            <Text style={styles.label}>{label}</Text>
          </View>
        ) : null}

        <View
          style={[
            styles.inputContainer,
            isFocused && styles.focused,
            !!error && styles.error,
            !editable && styles.disabled,
            multiline && styles.multilineContainer,
            inputContainerStyle,
          ]}
        >
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}

          <TextInput
            ref={ref}
            editable={editable}
            multiline={multiline}
            placeholderTextColor={placeholderTextColor}
            style={[
              styles.input,
              multiline && styles.multilineInput,
              inputStyle,
              style,
            ]}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.(event);
            }}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            {...props}
          />

          {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
        </View>

        {supportingText ? (
          <Text style={[styles.supportingText, error && styles.errorText]}>
            {supportingText}
          </Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: "100%",
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
  inputContainer: {
    alignItems: "center",
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral[300],
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  focused: {
    borderColor: colors.accent[600],
  },
  error: {
    borderColor: "#dc2626",
  },
  disabled: {
    backgroundColor: colors.neutral[100],
    opacity: 0.7,
  },
  multilineContainer: {
    alignItems: "flex-start",
    minHeight: 104,
    paddingVertical: 12,
  },
  input: {
    color: colors.neutral[900],
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 24,
  },
  supportingText: {
    color: colors.neutral[500],
    fontSize: 13,
  },
  errorText: {
    color: "#dc2626",
  },
});

export default Input;
