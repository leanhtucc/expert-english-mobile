import React from 'react';
import { Text, View } from 'react-native';

interface QuestionCardProps {
  word?: string;
  question: string;
  phonetic?: string;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, className = '' }) => {
  return (
    <View
      // Bo viền xám nhẹ để thẻ câu hỏi nổi bật trên nền F8FAFC
      className={`min-h-[140px] w-full items-center justify-center rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm ${className}`}
    >
      <Text className="text-center text-[18px] font-bold leading-7 text-[#1E293B]">{question}</Text>
    </View>
  );
};
