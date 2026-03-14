import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
}

/**
 * Password input component
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Enter your password',
  error,
}) => {
  return (
    <View className="mb-4">
      <TextInput
        className="rounded-3xl border border-gray-100 bg-white px-6 py-4 text-lg text-gray-900"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.04,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
        placeholder={placeholder}
        placeholderTextColor="#C0C0C0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
      />
      {error && <Text className="mt-2 px-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
};
