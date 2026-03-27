import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckResultButton from '../components/CheckResultButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { AnswerInput } from './AnswerInput';
import { QuestionCard } from './QuestionCard';
import { FillBlankQuestion, useFillBlank } from './useFillBlank';

interface FillBlankScreenProps {
  questions: FillBlankQuestion[];
  onComplete?: (score: number) => void;
  onBack?: () => void;
  onClose?: () => void;
  progress?: { current: number; total: number };
}

export const FillBlankScreen: React.FC<FillBlankScreenProps> = ({
  questions,
  onComplete,
  onBack,
  progress: externalProgress,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
    isCorrect,
    progress: internalProgress,
    sentenceParts,
    handleSelectAnswer,
    handleNext,
    resetAnswer,
  } = useFillBlank({
    questions,
    onComplete,
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

  // Cần thêm dependency cho useEffect thứ 2 để xoá state khi chuyển component (tuỳ chọn)
  // Nhưng key bọc dưới View đã lo việc này

  if (!currentQuestion) return null;

  const displayProgress = externalProgress || internalProgress;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['left', 'right', 'top']}>
      <View className="z-10 w-full bg-white">
        <ScreenHeader
          title="Vocabulary Quiz"
          subtitle="FILL IN THE BLANK"
          onBack={onBack}
          onClose={onClose}
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        <View className="w-full px-5 pt-4 pb-5">
          <ProgressBar
            current={displayProgress.current}
            total={displayProgress.total}
            variant="quiz"
          />
        </View>

        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8 w-full">
            <QuestionCard
              beforeBlank={sentenceParts.before}
              afterBlank={sentenceParts.after}
              selectedAnswer={selectedAnswer || undefined}
              isAnswered={isAnswered}
              isCorrect={isCorrect}
              hint={currentQuestion.hint}
            />
          </View>

          {/* 🌟 Truyền Key độc nhất của câu hỏi xuống AnswerInput để ép render lại 🌟 */}
          <View className="w-full">
            <AnswerInput
              // Thêm key ở đây
              key={currentQuestion.id || sentenceParts.before}
              options={currentQuestion.options}
              selectedAnswer={selectedAnswer}
              correctAnswer={currentQuestion.correctAnswer}
              isAnswered={isAnswered}
              onSelectAnswer={handleSelectAnswer}
            />
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
