import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, View } from 'react-native';

import { OptionItem } from './OptionItem';

interface MistakeCardProps {
  word: string;
  correctAnswer: string;
  yourAnswer: string;
  explanation?: string;
  options?: string[]; // Thêm mảng options
  onSelectOption?: (option: string) => void;
}

export const MistakeCard: React.FC<MistakeCardProps> = ({
  word,
  correctAnswer,
  explanation,
  options = [],
  onSelectOption,
}) => {
  // Tạo dữ liệu giả định 4 đáp án nếu data của bạn chưa truyền mảng options vào
  const displayOptions =
    options.length > 0 ? options : [correctAnswer, 'Optimized', 'Scaled', 'Neural Network'];

  return (
    <View className="w-full rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm">
      {/* Label Terminology & Info Icon */}
      <View className="mb-4 flex-row items-center justify-between">
        <View className="rounded-lg bg-[#F1F5F9] px-3 py-1.5">
          <Text className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Terminology
          </Text>
        </View>
        <Feather name="info" size={20} color="#FCA5A5" />
      </View>

      {/* Câu hỏi (hoặc từ vựng) */}
      <Text className="mb-2.5 text-[18px] font-bold leading-snug text-[#1E293B]">{word}</Text>

      {/* Giải thích / Gợi ý */}
      <Text className="mb-6 text-[14px] leading-relaxed text-[#94A3B8]">
        {explanation || 'Identify the correct industry term for biased or skewed results.'}
      </Text>

      {/* Danh sách các Option */}
      <View className="w-full">
        {displayOptions.map((opt, index) => {
          // Gắn chữ A, B, C, D vào đầu nếu chưa có
          const letter = String.fromCharCode(65 + index);
          const label = opt.startsWith(`${letter}.`) ? opt : `${letter}. ${opt}`;

          // Xác định xem thẻ này có phải là thẻ đúng cần bôi đỏ không
          const isCorrectOption = opt.includes(correctAnswer) || opt === correctAnswer;

          return (
            <OptionItem
              key={index}
              label={label}
              isCorrect={isCorrectOption}
              onPress={() => onSelectOption?.(opt)}
            />
          );
        })}
      </View>
    </View>
  );
};
