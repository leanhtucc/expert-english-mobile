import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface OptionButtonProps {
  label: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  onPress,
  disabled = false,
  className = '',
}) => {
  const getBackgroundColor = () => {
    if (isCorrect) return 'bg-green-100';
    if (isWrong) return 'bg-red-100';
    if (isSelected) return 'bg-red-50';
    return 'bg-white';
  };

  const getBorderColor = () => {
    if (isCorrect) return 'border-green-500';
    if (isWrong) return 'border-red-500';
    if (isSelected) return 'border-red-600';
    return 'border-gray-200';
  };

  const getTextColor = () => {
    if (isCorrect) return 'text-green-700';
    if (isWrong) return 'text-red-700';
    if (isSelected) return 'text-red-600';
    return 'text-gray-800';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={` ${getBackgroundColor()} ${getBorderColor()} mb-3 rounded-2xl border-2 p-4 ${disabled ? 'opacity-50' : 'active:opacity-70'} ${className} `}
    >
      <Text className={`${getTextColor()} text-center text-base font-medium`}>{label}</Text>
    </TouchableOpacity>
  );
};
