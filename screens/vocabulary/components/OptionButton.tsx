import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconCheckAnswer } from '@/components/icon';

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
  // Logic màu chữ
  const getTextColor = () => {
    if (isCorrect) return 'text-[#16a34a]';
    if (isWrong) return 'text-[#dc2626]';
    if (isSelected) return 'text-[#E11D48]';
    return 'text-[#334155]';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      // ĐÃ THÊM `mb-2` VÀO ĐÂY ĐỂ ÉP BUỘC CÁC NÚT PHẢI CÁCH NHAU 8px
      className={`bg-white} mb-2 flex-row items-center justify-between rounded-2xl border-[1.5px] border-slate-200 px-5 py-6 ${
        disabled && !isCorrect && !isWrong ? 'opacity-60' : ''
      } ${className}`}
    >
      <Text className={`${getTextColor()} flex-1 pr-2 text-[15px] font-bold`}>{label}</Text>

      {/* Hiển thị Icon tương ứng với trạng thái */}
      <View className="ml-2">
        {/* NẾU ĐÚNG */}
        {isCorrect && <IconCheckAnswer width={20} height={20} color="#16a34a" />}

        {/* NẾU SAI */}
        {isWrong && <Feather name="x-circle" size={20} color="#dc2626" />}

        {/* NẾU ĐANG CHỌN (CHƯA CHỐT) */}
        {isSelected && !isCorrect && !isWrong && (
          <View className="h-[20px] w-[20px] items-center justify-center rounded-full border-[2.5px] border-[#E11D48]">
            <View className="h-2.5 w-2.5 rounded-full bg-[#E11D48]" />
          </View>
        )}

        {/* NẾU CHƯA CHỌN */}
        {!isSelected && !isCorrect && !isWrong && (
          <View className="h-[20px] w-[20px] rounded-full border-[2px] border-slate-300" />
        )}
      </View>
    </TouchableOpacity>
  );
};
