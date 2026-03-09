import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface OptionItemProps {
  label: string;
  isSelected?: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const OptionItem: React.FC<OptionItemProps> = ({
  label,
  isSelected = false,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={` ${isSelected ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white'} mb-3 rounded-2xl border-2 p-4 ${disabled ? 'opacity-50' : 'active:opacity-70'} `}
    >
      <Text className={`${isSelected ? 'text-red-600' : 'text-gray-800'} text-base font-medium`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
