import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface OptionItemProps {
  letter?: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isAnswered: boolean;
  onPress: () => void;
}

export const OptionItem: React.FC<OptionItemProps> = ({
  text,
  isSelected,
  isCorrect,
  isAnswered,
  onPress,
}) => {
  // 1. Xác định màu nền và viền thẻ
  const getContainerStyle = () => {
    // KHI CHƯA CHỐT: Đang chọn thì viền đỏ
    if (!isAnswered) {
      return isSelected ? 'border-[#E11D48] bg-[#FFF1F2]' : 'border-slate-200 bg-white';
    }

    // KHI ĐÃ CHỐT:
    if (isCorrect) {
      return 'border-[#22c55e] bg-[#f0fdf4]'; // Đáp án chuẩn LUÔN LUÔN hiện Xanh lá
    }
    if (isSelected && !isCorrect) {
      return 'border-[#ef4444] bg-[#fef2f2]'; // Lỡ chọn sai thì thẻ đó hiện Đỏ
    }

    // Các đáp án sai khác không được chọn thì mờ đi
    return 'border-slate-200 bg-white opacity-50';
  };

  // 2. Xác định màu viền của hình tròn Radio
  const getRadioColor = () => {
    if (!isAnswered) return isSelected ? 'border-[#E11D48]' : 'border-slate-300';
    if (isCorrect) return 'border-[#22c55e]';
    if (isSelected && !isCorrect) return 'border-[#ef4444]';
    return 'border-slate-300';
  };

  // 3. Xác định màu chấm tròn bên trong Radio
  const getRadioInnerColor = () => {
    if (!isAnswered) return 'bg-[#E11D48]';
    if (isCorrect) return 'bg-[#22c55e]';
    if (isSelected && !isCorrect) return 'bg-[#ef4444]';
    return 'bg-transparent';
  };

  // 4. Xác định màu chữ
  const getTextColor = () => {
    if (!isAnswered) return 'text-[#334155]';
    if (isCorrect) return 'text-[#16a34a]'; // Chữ đáp án đúng đổi màu xanh
    if (isSelected && !isCorrect) return 'text-[#dc2626]'; // Chữ đáp án sai đổi màu đỏ
    return 'text-[#334155]';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isAnswered}
      activeOpacity={0.7}
      className={`mb-4 min-h-[72px] flex-row items-center justify-between rounded-2xl border-2 px-5 py-4 ${getContainerStyle()}`}
    >
      <Text className={`flex-1 pr-4 text-[16px] font-semibold ${getTextColor()}`}>{text}</Text>

      <View
        className={`h-6 w-6 items-center justify-center rounded-full border-[2.5px] ${getRadioColor()}`}
      >
        {/* Hiện chấm tròn bên trong nếu Đang chọn, hoặc khi chốt mà thẻ đó là đáp án đúng / đáp án người dùng chọn sai */}
        {(!isAnswered && isSelected) || (isAnswered && (isCorrect || isSelected)) ? (
          <View className={`h-3 w-3 rounded-full ${getRadioInnerColor()}`} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
