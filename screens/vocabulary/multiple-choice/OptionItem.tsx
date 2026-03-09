import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface OptionItemProps {
  letter: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isAnswered: boolean;
  onPress: () => void;
}

export const OptionItem: React.FC<OptionItemProps> = ({
  letter,
  text,
  isSelected,
  isCorrect,
  isAnswered,
  onPress,
}) => {
  const getContainerStyle = () => {
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

  const getLetterStyle = () => {
    if (!isAnswered) {
      return isSelected ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600';
    }

    if (isCorrect) {
      return 'bg-green-500 text-white';
    }

    if (isSelected && !isCorrect) {
      return 'bg-red-500 text-white';
    }

    return 'bg-gray-100 text-gray-400';
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

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isAnswered}
      className={` ${getContainerStyle()} mb-3 flex-row items-center rounded-2xl border-2 p-4 ${!isAnswered ? 'active:opacity-70' : ''} `}
    >
      {/* Letter Badge */}
      <View
        className={`${getLetterStyle()} mr-4 h-10 w-10 items-center justify-center rounded-full`}
      >
        <Text className="font-bold">{letter}</Text>
      </View>

      {/* Option Text */}
      <Text className={`${getTextStyle()} flex-1 text-base font-medium`}>{text}</Text>

      {/* Check/Cross Icon */}
      {isAnswered && (
        <Text className={`${getTextStyle()} ml-2 text-xl font-bold`}>
          {isCorrect ? '✓' : isSelected ? '✗' : ''}
        </Text>
      )}
    </TouchableOpacity>
  );
};
