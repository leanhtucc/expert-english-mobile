import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

/**
 * Email input component
 */
export const EmailInput: React.FC<EmailInputProps> = ({ value, onChangeText, error }) => {
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
        placeholder="nghoa2006@gmail.com"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
      />
      {error && <Text className="mt-2 px-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
};
