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
      <TextInput
        className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-base text-gray-900"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.04,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
        placeholder="Enter your email"
        placeholderTextColor="#C0C0C0"
        value={value}
        onChangeText={onChangeText}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
      />
      {error && <Text className="mt-2 px-1 text-xs text-red-500">{error}</Text>}
    </View>
  );
};
