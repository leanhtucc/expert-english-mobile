import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface SubmitButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}

/**
 * Button submit form với các trạng thái disabled và loading
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  disabled = false,
  loading = false,
  label = 'Tiếp tục',
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`mb-6 rounded-xl px-6 py-4 ${isDisabled ? 'bg-gray-300' : 'bg-orange-500'}`}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text
          className={`text-center text-base font-semibold ${
            isDisabled ? 'text-gray-500' : 'text-white'
          }`}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
