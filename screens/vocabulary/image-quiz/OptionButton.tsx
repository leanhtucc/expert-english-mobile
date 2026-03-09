import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isAnswered: boolean;
  onPress: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  isSelected,
  isCorrect,
  isAnswered,
  onPress,
}) => {
  const getButtonStyle = () => {
    if (!isAnswered) {
      return isSelected ? 'bg-red-50 border-red-600' : 'bg-white border-gray-200';
    }

    if (isCorrect) {
      return 'bg-green-100 border-green-500';
    }

    if (isSelected && !isCorrect) {
      return 'bg-red-100 border-red-500';
    }

    return 'bg-white border-gray-200 opacity-50';
  };

  const getTextStyle = () => {
    if (!isAnswered) {
      return isSelected ? 'text-red-600' : 'text-gray-800';
    }

    if (isCorrect) {
      return 'text-green-700';
    }

    if (isSelected && !isCorrect) {
      return 'text-red-700';
    }

    return 'text-gray-400';
  };

  const getIcon = () => {
    if (!isAnswered) return null;

    if (isCorrect) return '✓';
    if (isSelected && !isCorrect) return '✗';

    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isAnswered}
      className={` ${getButtonStyle()} mb-3 flex-row items-center justify-between rounded-2xl border-2 p-4 ${!isAnswered ? 'active:opacity-70' : ''} `}
    >
      <Text className={`${getTextStyle()} flex-1 text-base font-medium`}>{label}</Text>

      {getIcon() && <Text className={`${getTextStyle()} ml-2 text-xl font-bold`}>{getIcon()}</Text>}
    </TouchableOpacity>
  );
};
