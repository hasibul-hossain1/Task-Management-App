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
      placeholderTextColor = colors.text.muted,
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
  inputContainer: {
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderColor: colors.border.default,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    gap: 8,
    minHeight: 54,
    paddingHorizontal: 16,
    shadowColor: colors.shadow.soft,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  focused: {
    borderColor: colors.border.focus,
  },
  error: {
    borderColor: colors.danger[600],
  },
  disabled: {
    backgroundColor: colors.surface.elevated,
    opacity: 0.7,
  },
  multilineContainer: {
    alignItems: "flex-start",
    minHeight: 118,
    paddingVertical: 14,
  },
  input: {
    color: colors.text.primary,
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
    color: colors.text.muted,
    fontSize: 13,
  },
  errorText: {
    color: colors.danger[600],
  },
});

export default Input;
