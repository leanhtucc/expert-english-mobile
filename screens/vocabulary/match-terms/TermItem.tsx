import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface TermItemProps {
  id: string;
  text: string;
  isSelected: boolean;
  onPress: () => void;
  type: 'term' | 'definition';
}

export const TermItem: React.FC<TermItemProps> = ({ text, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`mb-4 min-h-[64px] items-center justify-center rounded-2xl border-[2px] px-3 py-3 shadow-sm ${
        isSelected ? 'border-[#E11D48] bg-[#FFF1F2]' : 'border-slate-200 bg-white'
      }`}
    >
      <Text
        className={`text-center text-[14.5px] ${
          isSelected ? 'font-bold text-[#E11D48]' : 'font-medium text-[#334155]'
        }`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
