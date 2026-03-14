import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  className = '',
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center rounded-2xl bg-gray-200 py-4 px-4 ${disabled ? 'opacity-50' : 'active:bg-gray-300'} ${className}`}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className="text-center text-base font-semibold text-gray-700">{label}</Text>
    </TouchableOpacity>
  );
};
