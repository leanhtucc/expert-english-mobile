import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

/**
 * Component input email với validation
 */
export const EmailInput: React.FC<EmailInputProps> = ({ value, onChangeText, error }) => {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-sm font-medium text-gray-700">Email</Text>
      <TextInput
        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-base text-gray-900"
        placeholder="example@email.com"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
      />
      {error && <Text className="mt-2 text-sm text-red-500">{error}</Text>}
    </View>
  );
};
