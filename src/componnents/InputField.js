import React from "react";
import { TextInput } from "react-native-paper";

export default function TextInputField({
  label,
  value,
  onChangeText,
  mode = "outlined",
  style,
  ...props
}) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode={mode}
      style={[{ marginBottom: 12 }, style]}
      {...props} // permet d’ajouter d’autres props (keyboardType, secureTextEntry, etc.)
    />
  );
}
