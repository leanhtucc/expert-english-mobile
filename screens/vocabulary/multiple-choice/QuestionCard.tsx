import React from 'react';
import { Text, View } from 'react-native';

interface QuestionCardProps {
  word: string;
  question: string;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, className = '' }) => {
  return (
    <View
      // ĐÃ THÊM LẠI: border-[3px] border-[#38bdf8] để bo viền xanh
      className={`min-h-[140px] w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ${className}`}
    >
      <Text className="text-center text-[18px] font-bold leading-7 text-[#1E293B]">
        &quot;{question}&quot;
      </Text>
    </View>
  );
};
