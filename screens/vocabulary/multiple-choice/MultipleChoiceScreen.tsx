import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckResultButton from '../components/CheckResultButton';
import { OptionButton } from '../components/OptionButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { QuestionCard } from './QuestionCard';
import { MultipleChoiceQuestion, useMultipleChoice } from './useMultipleChoice';

interface MultipleChoiceScreenProps {
  questions: MultipleChoiceQuestion[];
  onComplete?: (score: number, userPick: string) => void;
  onBack?: () => void;
  onClose?: () => void;
  progress?: { current: number; total: number };
}

export const MultipleChoiceScreen: React.FC<MultipleChoiceScreenProps> = ({
  questions,
  onComplete,
  onBack,
  onClose,
  progress: externalProgress,
}) => {
  const insets = useSafeAreaInsets();
  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
    progress: internalProgress,
    isCorrect,
    handleSelectAnswer,
    handleNext,
    resetAnswer, // Nhận hàm reset từ hook
  } = useMultipleChoice({
    questions,
    onComplete: onComplete ? (score: number) => onComplete(score, '') : undefined,
  });

  // LOGIC: KHI TRẢ LỜI SAI -> CHỜ 1.5 GIÂY RỒI RESET ĐỂ CHỌN LẠI
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isAnswered && !isCorrect) {
      timer = setTimeout(() => {
        resetAnswer();
      }, 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAnswered, isCorrect, resetAnswer]);

  if (!currentQuestion) {
    return null;
  }

  const displayProgress = externalProgress || internalProgress;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['left', 'right', 'top']}>
      <View className="z-10 w-full bg-white">
        <ScreenHeader
          title="Vocabulary Quiz"
          subtitle="MULTIPLE CHOICE"
          onBack={onBack}
          onClose={onClose}
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        <View className="w-full px-5 pt-4">
          <View className="mb-6">
            <ProgressBar
              current={displayProgress.current}
              total={displayProgress.total}
              variant="quiz"
            />
          </View>
        </View>

        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <QuestionCard question={currentQuestion.question} />
          </View>

          <View className="w-full" key={currentQuestion.id || currentQuestion.question}>
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                isSelected={selectedAnswer === option}
                isCorrect={option === currentQuestion.correctAnswer}
                isAnswered={isAnswered}
                onPress={() => handleSelectAnswer(option)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* DẢI NÚT CHỈ HIỆN KHI CHƯA CHỐT HOẶC TRẢ LỜI SAI */}
      {(!isAnswered || (isAnswered && !isCorrect)) && (
        <View className="absolute bottom-0 left-0 right-0 z-40 w-full">
          <View
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            className="w-full border-t border-slate-200 bg-white px-5 pt-4"
          >
            <PrimaryButton
              label="Submit Answer"
              onPress={handleNext}
              disabled={!selectedAnswer || (isAnswered && !isCorrect)}
            />
          </View>
        </View>
      )}

      {/* MODAL TRẢ LỜI ĐÚNG ĐẶT RA NGOÀI ĐỂ OVERLAY CHE KÍN MÀN HÌNH */}
      {isAnswered && isCorrect && (
        <CheckResultButton status="correct" text={'Next Question'} onPress={handleNext} />
      )}
    </SafeAreaView>
  );
};
