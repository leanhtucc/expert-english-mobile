import React from 'react';
import { Text, View } from 'react-native';

import { HintButton } from '../components/HintButton';

interface QuestionCardProps {
  beforeBlank: string;
  afterBlank: string;
  selectedAnswer?: string;
  isAnswered: boolean;
  isCorrect?: boolean;
  hint?: string;
  // Các props mới cho tính năng Gợi ý
  showHintButton?: boolean;
  isHintUsed?: boolean;
  onPressHint?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  beforeBlank,
  afterBlank,
  selectedAnswer,
  isAnswered,
  isCorrect,
  hint,
  showHintButton = false,
  isHintUsed = false,
  onPressHint,
}) => {
  const hasSelectedAnswer = Boolean(selectedAnswer);

  return (
    <View className="w-full rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm">
      {/* Câu hỏi có điền chỗ trống */}
      <Text className="mb-4 text-[18px] font-bold leading-snug text-[#1E293B]">
        {beforeBlank}
        <Text
          className={`font-black ${
            !hasSelectedAnswer
              ? 'text-slate-300'
              : !isAnswered
                ? 'text-[#0F172A]'
                : isCorrect
                  ? 'text-[#16a34a]'
                  : 'text-[#e11d48]'
          }`}
          style={{ textDecorationLine: 'underline' }}
        >
          {hasSelectedAnswer ? ` ${selectedAnswer} ` : ' ____________ '}
        </Text>
        {afterBlank}
      </Text>

      {/* Dòng hướng dẫn (Phụ) */}
      <Text className="text-[14px] leading-relaxed text-[#94A3B8]">
        {hint || 'Identify the correct industry term to complete the sentence.'}
      </Text>

      {/* 🌟 NÚT GỢI Ý (ĐƯỢC ĐẶT Ở ĐÂY CHO ĐÚNG UX) */}
      {showHintButton && (
        <View className="mt-2 items-center">
          <HintButton onPress={onPressHint || (() => {})} isUsed={isHintUsed} />
        </View>
      )}
    </View>
  );
};
