import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  onFocus?: () => void;
}

/**
 * Password input component
 */
export const PasswordInput = React.forwardRef<TextInput, PasswordInputProps>((props, ref) => {
  const { value, onChangeText, placeholder = 'Enter your password', error, onFocus } = props;
  return (
    <View className="mb-4">
      <TextInput
        ref={ref}
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
        onFocus={onFocus}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
      />
      {error && <Text className="mt-2 px-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
});

PasswordInput.displayName = 'PasswordInput';
