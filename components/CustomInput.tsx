import { CustomInputProps } from "@/interfaces";
import cn from 'clsx';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function CustomInput({ placeholder = "Enter text", value, onChangeText, label, secureTextEntry = false, keyboardType = "default" }: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="w-full">
      <Text className="label">{label}</Text>

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={"#888"}
        className={cn("input", { "border-primary": isFocused, "border-gray-300": !isFocused })}
      />
    </View>
  )
}