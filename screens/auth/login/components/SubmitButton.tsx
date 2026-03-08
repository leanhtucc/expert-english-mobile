import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

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
  label = 'Next',
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`rounded-full px-6 py-[18px] ${isDisabled ? 'bg-gray-200' : 'bg-[#C6102E]'}`}
      style={
        !isDisabled
          ? {
              shadowColor: '#C6102E',
              shadowOpacity: 0.35,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 6,
            }
          : undefined
      }
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          <Text
            className={`text-base font-semibold tracking-wide ${isDisabled ? 'text-gray-400' : 'text-white'}`}
          >
            {label}
          </Text>
          <Ionicons name="arrow-forward" size={18} color={isDisabled ? '#9CA3AF' : '#FFFFFF'} />
        </View>
      )}
    </TouchableOpacity>
  );
};
