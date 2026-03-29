import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface QuestionCardProps {
  word?: string;
  question: string;
  phonetic?: string;
  className?: string;
  showHintButton?: boolean; // Cờ bật tắt nút Gợi ý
  onPressHint?: () => void; // Hàm khi bấm nút Gợi ý
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  className = '',
  showHintButton = false,
  onPressHint,
}) => {
  return (
    <View
      className={`relative min-h-[140px] w-full rounded-[20px] border border-slate-100 bg-white shadow-sm ${className}`}
    >
      {/* KHU VỰC CÂU HỎI CHÍNH */}
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-center text-[18px] font-bold leading-7 text-[#1E293B]">
          {question}
        </Text>
      </View>

      {/* NÚT GỢI Ý NỔI Ở GÓC TRÊN CÙNG BÊN PHẢI (Chỉ hiện khi showHintButton = true) */}
      {showHintButton && (
        <TouchableOpacity
          onPress={onPressHint}
          activeOpacity={0.8}
          className="absolute top-[-15px] right-2 flex-row items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 shadow-sm"
        >
          <Feather name="map-pin" size={14} color="#C8102E" />
          <Text className="ml-1 text-[13px] font-bold text-[#C8102E]">Gợi ý</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
