import React, { useEffect, useRef, useState } from 'react';
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
  onComplete?: (score: number, userPick?: string) => void;
  onBack?: () => void;
  onClose?: () => void;
  onOpenHint?: () => void; // 🌟 Thêm Props này để Parent bật Bottom Sheet Flashcard
  progress?: { current: number; total: number };
}

export const MultipleChoiceScreen: React.FC<MultipleChoiceScreenProps> = ({
  questions,
  onComplete,
  onBack,
  onClose,
  onOpenHint,
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
    resetAnswer,
  } = useMultipleChoice({
    questions,
    onComplete: onComplete ? (score: number) => onComplete(score, '') : undefined,
  });

  // 🌟 STATE QUẢN LÝ LỖI SAI CỤC BỘ (Để hiện nút Gợi ý)
  const [localWrongAttempts, setLocalWrongAttempts] = useState(0);
  const wrongReportedRef = useRef(false);

  // LOGIC: KHI TRẢ LỜI SAI -> TĂNG LỖI -> CHỜ 1.5s -> RESET ĐỂ CHỌN LẠI
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isAnswered && !isCorrect) {
      if (!wrongReportedRef.current) {
        // Tăng biến đếm số lần chọn sai
        setLocalWrongAttempts(prev => prev + 1);

        onComplete?.(0, selectedAnswer || ''); // Báo cho Parent biết là sai
        wrongReportedRef.current = true;
      }

      timer = setTimeout(() => {
        resetAnswer();
        wrongReportedRef.current = false;
      }, 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAnswered, isCorrect, resetAnswer, onComplete, selectedAnswer]);

  if (!currentQuestion) return null;
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
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 160, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8 mt-2">
            <QuestionCard
              question={currentQuestion.question}
              showHintButton={localWrongAttempts >= 2} // 🌟 Hiện nút khi sai >= 2 lần
              onPressHint={onOpenHint} // 🌟 Gọi hàm của Parent để mở Bottom Sheet Flashcard
            />
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

      {isAnswered && isCorrect && (
        <CheckResultButton status="correct" text={'Next Question'} onPress={handleNext} />
      )}
    </SafeAreaView>
  );
};
