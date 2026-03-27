import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconCheckAnswer } from '@/components/icon';

export interface OptionButtonProps {
  label: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isAnswered?: boolean;
  onPress: () => void;
  className?: string;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  isSelected = false,
  isCorrect = false,
  isAnswered = false,
  onPress,
  className = '',
}) => {
  // Trạng thái user chọn SAI
  const isWrongAnswer = isAnswered && isSelected && !isCorrect;

  // Trạng thái user chọn ĐÚNG
  const isRightAnswer = isAnswered && isSelected && isCorrect;

  // 1. TÍNH TOÁN MÀU CONTAINER VÀ VIỀN
  const getContainerStyle = () => {
    if (isWrongAnswer) {
      return 'border-[#E2E8F0] bg-[#F8FAFC] opacity-60'; // Thẻ bị mờ đi khi chọn sai
    }
    if (isRightAnswer) {
      return 'border-[#22C55E] bg-[#F0FDF4]'; // Xanh lá CHỈ KHI chọn đúng thẻ này
    }
    if (isSelected && !isAnswered) {
      return 'border-[#C8102E] bg-white'; // Đỏ nổi bật khi đang chọn
    }
    return 'border-slate-200 bg-white opacity-90'; // Mặc định cho mọi thẻ khác (kể cả thẻ đúng mà chưa bị chọn)
  };

  // 2. TÍNH TOÁN MÀU CHỮ
  const getTextColor = () => {
    if (isWrongAnswer) return 'text-[#9CA3AF] line-through decoration-1';
    if (isRightAnswer) return 'text-[#16A34A]';
    if (isSelected && !isAnswered) return 'text-[#E11D48]';
    return 'text-[#1E293B]';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isAnswered}
      activeOpacity={0.7}
      className={`mb-4 min-h-[68px] flex-row items-center justify-between rounded-[24px] border-[2px] px-5 py-4 shadow-sm ${getContainerStyle()} ${className}`}
    >
      <Text className={`flex-1 pr-2 text-[16px] font-bold tracking-tight ${getTextColor()}`}>
        {label}
      </Text>

      {/* 3. TÍNH TOÁN ICON BÊN PHẢI */}
      <View className="ml-2 items-center justify-center">
        {/* NẾU CHỌN ĐÚNG */}
        {isRightAnswer && <IconCheckAnswer width={24} height={24} color="#16a34a" />}

        {/* NẾU CHỌN SAI */}
        {isWrongAnswer && <Feather name="x-circle" size={24} color="#dc2626" />}

        {/* NẾU ĐANG CHỌN (CHƯA CHỐT) */}
        {isSelected && !isAnswered && (
          <View className="h-6 w-6 items-center justify-center rounded-full border-[2.5px] border-[#E11D48]">
            <View className="h-2.5 w-2.5 rounded-full bg-[#E11D48]" />
          </View>
        )}

        {/* NẾU CHƯA LÀM GÌ HOẶC KHÔNG PHẢI THẺ ĐƯỢC CHỌN */}
        {!isSelected && <View className="h-6 w-6 rounded-full border-[2px] border-slate-300" />}
      </View>
    </TouchableOpacity>
  );
};
