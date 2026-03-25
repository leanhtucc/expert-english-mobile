import { Feather } from '@expo/vector-icons';

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
  // Trạng thái khi User chọn sai đáp án này
  const isWrongAnswer = isAnswered && isSelected && !isCorrect;

  const getContainerStyle = () => {
    // 1. Trạng thái đã chốt và bị SAI
    if (isWrongAnswer) {
      return 'border-[#E2E8F0] bg-[#F8FAFC] opacity-60'; // Nền xám, mờ đi
    }

    // 2. Trạng thái đã chốt và ĐÚNG (Có thể tuỳ chỉnh nếu Figma ko yêu cầu)
    if (isAnswered && isCorrect && isSelected) {
      return 'border-[#22C55E] bg-[#F0FDF4]';
    }

    // 3. Trạng thái đang chọn (nhưng chưa Submit)
    if (isSelected && !isAnswered) {
      return 'border-[#C8102E] bg-white';
    }

    // 4. Trạng thái mặc định (chưa tương tác)
    return 'border-slate-200 bg-white';
  };

  const getTextColor = () => {
    if (isWrongAnswer) return 'text-[#9CA3AF] line-through decoration-1'; // Chữ xám, gạch ngang
    if (isAnswered && isCorrect && isSelected) return 'text-[#16A34A]';
    return 'text-[#1E293B]'; // Màu chữ đen đậm mặc định
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      // Vô hiệu hoá nếu đã trả lời (để đợi reset)
      disabled={isAnswered}
      activeOpacity={0.7}
      className={`mb-4 min-h-[64px] flex-row items-center justify-between rounded-3xl border-[2px] px-5 py-4 ${getContainerStyle()}`}
    >
      <Text className={`flex-1 pr-4 text-[15px] font-bold ${getTextColor()}`}>{label}</Text>

      {/* BIỂU TƯỢNG BÊN PHẢI (Radio / Dấu X) */}
      <View className="items-center justify-center">
        {isWrongAnswer ? (
          // NẾU SAI -> Hiện dấu X màu đỏ
          <Feather name="x" size={24} color="#C8102E" />
        ) : (
          // NẾU BÌNH THƯỜNG / ĐANG CHỌN / ĐÚNG -> Hiện Radio Button
          <View
            className={`h-6 w-6 items-center justify-center rounded-full border-[2px] ${
              isSelected && !isAnswered
                ? 'border-[#C8102E]' // Đang chọn
                : isAnswered && isCorrect && isSelected
                  ? 'border-[#22C55E]' // Đúng
                  : 'border-slate-300' // Mặc định
            }`}
          >
            {/* Lõi của Radio Button */}
            {isSelected && (
              <View
                className={`h-3 w-3 rounded-full ${
                  !isAnswered
                    ? 'bg-[#C8102E]' // Lõi đỏ khi đang chọn
                    : isAnswered && isCorrect
                      ? 'bg-[#22C55E]' // Lõi xanh khi đúng
                      : 'bg-transparent'
                }`}
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
