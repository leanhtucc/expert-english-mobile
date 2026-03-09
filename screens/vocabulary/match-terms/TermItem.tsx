import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TermItemProps {
  id: string;
  text: string;
  isSelected: boolean;
  isMatched: boolean;
  onPress: () => void;
  type: 'term' | 'definition';
}

export const TermItem: React.FC<TermItemProps> = ({ text, isSelected, isMatched, onPress }) => {
  const getContainerStyle = () => {
    if (isMatched) {
      return 'bg-green-100 border-green-500 opacity-70';
    }
    if (isSelected) {
      return 'bg-red-50 border-red-600';
    }
    return 'bg-white border-gray-200';
  };

  const getTextStyle = () => {
    if (isMatched) {
      return 'text-green-700 line-through';
    }
    if (isSelected) {
      return 'text-red-600';
    }
    return 'text-gray-800';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isMatched}
      className={` ${getContainerStyle()} mb-3 rounded-2xl border-2 p-4 ${!isMatched ? 'active:opacity-70' : ''} `}
    >
      <View className="flex-row items-center justify-between">
        <Text className={`${getTextStyle()} flex-1 text-base font-medium`}>{text}</Text>

        {isMatched && <Text className="ml-2 text-xl text-green-600">✓</Text>}
      </View>
    </TouchableOpacity>
  );
};
