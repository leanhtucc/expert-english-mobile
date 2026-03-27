import React from 'react';
import { Text, View } from 'react-native';

import { IconStreakRed } from '@/components/icon';

export type ProgressVariant = 'default' | 'flashcard' | 'quiz' | 'match' | 'review';

interface ProgressBarProps {
  current: number;
  total: number;
  variant?: ProgressVariant;
  streak?: number; // Truyền số câu đúng liên tiếp vào đây
  className?: string;
  hideLabels?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  variant = 'default',
  streak = 0,
  className = '',
  hideLabels = false,
}) => {
  // Tránh lỗi chia cho 0
  const validTotal = total > 0 ? total : 1;
  const percentage = Math.round((current / validTotal) * 100);

  // Hàm render chữ bên trên thanh Bar tùy theo từng màn hình
  const renderLabels = () => {
    if (hideLabels) return null;

    // 1. MÀN HÌNH FLASHCARD
    if (variant === 'flashcard') {
      return (
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Daily Goal
          </Text>
          <Text className="text-[12px] font-bold text-[#E11D48]">
            {current} / {total} Words
          </Text>
        </View>
      );
    }

    // 2. MÀN HÌNH QUÍZ / FILL BLANK / MULTIPLE CHOICE
    if (variant === 'quiz') {
      const showStreak = streak >= 3;
      return (
        <View className="mb-2 flex-row items-center justify-between">
          {showStreak ? (
            <View className="flex-row items-center">
              <IconStreakRed width={16} height={16} />
              <Text className="ml-1 text-[11px] font-bold uppercase tracking-wider text-[#E11D48]">
                Streak {streak}
              </Text>
            </View>
          ) : (
            <Text className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Daily Goal
            </Text>
          )}
          <Text className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Question {current} / {total}
          </Text>
        </View>
      );
    }

    // 3. MÀN HÌNH MATCH TERMS
    if (variant === 'match') {
      return (
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[13.5px] font-semibold text-[#64748B]">Matching Progress</Text>
          <Text className="text-[13.5px] font-bold text-[#94A3B8]">
            Question {current} / {total}
          </Text>
        </View>
      );
    }

    // 4. MÀN HÌNH REVIEW
    if (variant === 'review') {
      return (
        <View className="mb-2 flex-row items-baseline justify-between">
          <Text className="text-[16px] font-bold text-[#1E293B]">Practice Progress</Text>
          <Text className="text-[14px] font-bold text-[#E11D48]">
            {current} of {total}
          </Text>
        </View>
      );
    }

    // Default (nếu không truyền variant)
    return (
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-[12px] font-bold text-[#94A3B8]">Progress</Text>
        <Text className="text-[12px] font-bold text-[#E11D48]">{percentage}%</Text>
      </View>
    );
  };

  return (
    <View className={`w-full ${className}`}>
      {renderLabels()}
      <View className="h-2.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
        <View className="h-full rounded-full bg-[#E11D48]" style={{ width: `${percentage}%` }} />
      </View>
    </View>
  );
};
