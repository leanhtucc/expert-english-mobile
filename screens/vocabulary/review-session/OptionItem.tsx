import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface OptionItemProps {
  label: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const OptionItem: React.FC<OptionItemProps> = ({
  label,
  isSelected = false,
  isCorrect = false,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      // Bỏ justify-between để icon ôm sát vào text
      className={`mb-3 flex-row items-center rounded-2xl border-[1.5px] px-5 py-4 ${
        isCorrect || isSelected ? 'border-[#E11D48] bg-[#FFF1F2]' : 'border-slate-100 bg-white'
      } ${disabled ? 'opacity-100' : ''}`}
    >
      <Text
        className={`text-[15px] font-bold ${
          isCorrect || isSelected ? 'text-[#1E293B]' : 'text-[#334155]'
        }`}
      >
        {label}
      </Text>

      {/* Dùng thẳng icon check-circle của Feather, cách chữ một khoảng ml-2.5 */}
      {(isCorrect || isSelected) && (
        <View className="ml-2.5">
          <Feather name="check-circle" size={18} color="#E11D48" />
        </View>
      )}
    </TouchableOpacity>
  );
};
