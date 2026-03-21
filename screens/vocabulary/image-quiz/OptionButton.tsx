import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
  const getContainerStyle = () => {
    if (!isAnswered) {
      return isSelected ? 'border-[#E11D48] bg-[#FFF1F2]' : 'border-slate-200 bg-white';
    }
    if (isCorrect) return 'border-[#22c55e] bg-[#f0fdf4]';
    if (isSelected && !isCorrect) return 'border-[#ef4444] bg-[#fef2f2]';
    return 'border-slate-200 bg-white opacity-50';
  };

  const getRadioColor = () => {
    if (!isAnswered) return isSelected ? 'border-[#E11D48]' : 'border-slate-300';
    if (isCorrect) return 'border-[#22c55e]';
    if (isSelected && !isCorrect) return 'border-[#ef4444]';
    return 'border-slate-300';
  };

  const getRadioInnerColor = () => {
    if (!isAnswered) return 'bg-[#E11D48]';
    if (isCorrect) return 'bg-[#22c55e]';
    if (isSelected && !isCorrect) return 'bg-[#ef4444]';
    return '';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isAnswered}
      activeOpacity={0.7}
      className={`mb-4 min-h-[64px] flex-row items-center justify-between rounded-3xl border-[2px] px-5 py-4 ${getContainerStyle()}`}
    >
      <Text
        className={`flex-1 pr-4 text-[15px] font-semibold ${isAnswered && isCorrect ? 'text-[#16a34a]' : 'text-[#334155]'}`}
      >
        {label}
      </Text>

      {/* Radio Button */}
      <View
        className={`h-6 w-6 items-center justify-center rounded-full border-[2.5px] ${getRadioColor()}`}
      >
        {(isSelected || (isAnswered && isCorrect)) && (
          <View className={`h-3 w-3 rounded-full ${getRadioInnerColor()}`} />
        )}
      </View>
    </TouchableOpacity>
  );
};
