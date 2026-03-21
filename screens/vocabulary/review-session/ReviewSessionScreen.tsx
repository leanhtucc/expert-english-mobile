import { Feather } from '@expo/vector-icons';
import { ArrowRight } from 'lucide-react-native';

import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { MistakeCard } from './MistakeCard';

export interface MistakeItem {
  id: string;
  word: string;
  correctAnswer: string;
  yourAnswer: string;
  explanation?: string;
  options?: string[]; // Khai báo thêm trường options nếu có
}

interface ReviewSessionScreenProps {
  mistakes: MistakeItem[];
  onReviewWord?: (wordId: string) => void;
  onRetakeQuiz?: () => void;
  onContinue?: () => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const ReviewSessionScreen: React.FC<ReviewSessionScreenProps> = ({
  mistakes,
  onContinue,
  onBack,
  onClose,
}) => {
  const insets = useSafeAreaInsets();

  // State quản lý lỗi đang được hiển thị
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback an toàn nếu list lỗi trống
  if (!mistakes || mistakes.length === 0) return null;

  const currentMistake = mistakes[currentIndex];
  const totalMistakes = mistakes.length;
  const currentStep = currentIndex + 1;
  const mistakesRemaining = totalMistakes - currentStep;

  // Hàm chuyển sang lỗi tiếp theo
  const handleNext = () => {
    if (currentIndex < totalMistakes - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onContinue?.();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      {/* 1. HEADER */}
      <View className="w-full bg-white">
        <ScreenHeader
          title="Review Session"
          onClose={onClose || onBack}
          // Icon chấm hỏi bên góc phải
          rightAction={<Feather name="help-circle" size={20} color="#334155" />}
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        {/* 2. SECTION: MASTERY LEVEL (Progress) */}
        <View className="w-full px-5 pt-4">
          <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Mastery Level
          </Text>
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-[16px] font-bold text-[#1E293B]">Practice Progress</Text>
            <Text className="text-[14px] font-bold text-[#E11D48]">
              {currentStep} of {totalMistakes}
            </Text>
          </View>

          <ProgressBar current={currentStep} total={totalMistakes} className="mb-3" />

          <View className="flex-row items-center">
            <Feather name="alert-circle" size={14} color="#ef4444" />
            <Text className="ml-1.5 text-[12px] text-[#64748B]">
              {mistakesRemaining} Mistakes remaining
            </Text>
          </View>
        </View>

        {/* 3. SECTION: CURRENT FOCUS */}
        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Current Focus
          </Text>

          <MistakeCard
            word={currentMistake.word}
            correctAnswer={currentMistake.correctAnswer}
            yourAnswer={currentMistake.yourAnswer}
            explanation={currentMistake.explanation}
            options={currentMistake.options}
          />
        </ScrollView>
      </View>

      <View
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-5 pt-4"
      >
        <PrimaryButton
          label={currentIndex === totalMistakes - 1 ? 'Finish Review' : 'Check Answer'}
          onPress={handleNext}
          rightIcon={<ArrowRight width={20} height={20} fill="#fff" />}
        />
      </View>
    </SafeAreaView>
  );
};
