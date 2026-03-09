import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

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
      className={`flex-row items-center justify-center rounded-2xl border-2 border-red-600 bg-white py-4 px-6 ${disabled ? 'opacity-50' : 'active:bg-red-50'} ${className} `}
    >
      {icon && <>{icon}</>}
      <Text className="text-center text-base font-semibold text-red-600">{label}</Text>
    </TouchableOpacity>
  );
};
