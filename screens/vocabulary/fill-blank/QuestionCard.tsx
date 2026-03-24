import React from 'react';
import { Text, View } from 'react-native';

interface QuestionCardProps {
  beforeBlank: string;
  afterBlank: string;
  selectedAnswer?: string;
  isAnswered: boolean;
  isCorrect?: boolean;
  hint?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  beforeBlank,
  afterBlank,
  selectedAnswer,
  isAnswered,
  isCorrect,
  hint,
}) => {
  return (
    <View className="w-full rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm">
      {/* Câu hỏi có điền chỗ trống */}
      <Text className="mb-5 text-[18px] font-bold leading-snug text-[#1E293B]">
        {/* Phần trước khoảng trống */}
        {beforeBlank}

        {/* Khoảng trống / Đáp án */}
        <Text
          className={`font-black ${
            !isAnswered
              ? 'text-slate-300' // Luôn xám nếu chưa chốt đáp án
              : isCorrect
                ? 'text-[#16a34a]' // Xanh lá nếu chốt và đúng
                : 'text-[#e11d48]' // Đỏ nếu chốt và sai
          }`}
          style={{ textDecorationLine: 'underline' }}
        >
          {/* CHỈ HIỆN ĐÁP ÁN NẾU ĐÃ BẤM CHỐT */}
          {isAnswered && selectedAnswer ? ` ${selectedAnswer} ` : ' ____________ '}
        </Text>

        {/* Phần sau khoảng trống */}
        {afterBlank}
      </Text>

      {/* Hint / Instruction */}
      <Text className="text-[14px] leading-relaxed text-[#94A3B8]">
        {hint || 'Identify the correct industry term for biased or skewed results.'}
      </Text>
    </View>
  );
};
