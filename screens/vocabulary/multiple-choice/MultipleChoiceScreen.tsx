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
  onOpenHint?: () => void;
  progress?: { current: number; total: number };
}

export const MultipleChoiceScreen: React.FC<MultipleChoiceScreenProps> = ({
  questions,
  onComplete,
  onBack,
  onOpenHint,
  onClose,
  progress: externalProgress,
}) => {
  const insets = useSafeAreaInsets();
  const {
    currentQuestion,
    selectedAnswer,
    eliminatedAnswers,
    isAnswered,
    progress: internalProgress,
    isCorrect,
    handleSelectAnswer,
    eliminateSelectedAnswer,
    handleNext,
    resetAnswer,
  } = useMultipleChoice({
    questions,
    onComplete: onComplete ? (score: number) => onComplete(score, '') : undefined,
  });

  const [localWrongAttempts, setLocalWrongAttempts] = useState(0);
  const [isHintUsed, setIsHintUsed] = useState(false);

  // 🌟 STATE CHỐNG NHÁY (ANTI-GLITCH)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wrongReportedRef = useRef(false);

  // 🌟 RESET TẤT CẢ KHI CÓ CÂU HỎI MỚI VÀO
  useEffect(() => {
    setLocalWrongAttempts(0);
    setIsHintUsed(false);
    setIsTransitioning(false);
    wrongReportedRef.current = false;
  }, [currentQuestion?.question]);

  // LOGIC TRẢ LỜI SAI
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isAnswered && !isCorrect && !isTransitioning) {
      if (!wrongReportedRef.current) {
        setLocalWrongAttempts(prev => prev + 1);
        onComplete?.(0, selectedAnswer || '');
        wrongReportedRef.current = true;
      }

      timer = setTimeout(() => {
        eliminateSelectedAnswer();
        resetAnswer();
        wrongReportedRef.current = false;
      }, 700);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    isAnswered,
    isCorrect,
    resetAnswer,
    onComplete,
    selectedAnswer,
    isTransitioning,
    eliminateSelectedAnswer,
  ]);

  const handlePressHint = () => {
    setIsHintUsed(true);
    if (onOpenHint) onOpenHint();
  };

  // 🌟 HÀM KHI BẤM NEXT QUESTION (Giấu đi UI hiện tại ngay lập tức)
  const handlePressNextQuestion = () => {
    setIsTransitioning(true);
    handleNext();
  };

  if (!currentQuestion) return null;
  const displayProgress = externalProgress || internalProgress;

  // Nếu đang chuyển cảnh (vừa ấn Next xong), giả vờ như chưa trả lời để UI câu mới không bị nháy xanh
  const displayAsAnswered = isAnswered && !isTransitioning;

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
              showHintButton={localWrongAttempts >= 2}
              isHintUsed={isHintUsed}
              onPressHint={handlePressHint}
            />
          </View>

          <View className="w-full" key={currentQuestion.id || currentQuestion.question}>
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={`${option}-${index}`}
                label={option}
                isSelected={selectedAnswer === option}
                isCorrect={option === currentQuestion.correctAnswer}
                isHidden={eliminatedAnswers.includes(option)}
                isAnswered={displayAsAnswered} // 🌟 Sử dụng trạng thái chống nháy
                onPress={() => handleSelectAnswer(option)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* HIỂN THỊ NÚT SUBMIT NẾU CHƯA TRẢ LỜI HOẶC TRẢ LỜI SAI */}
      {(!displayAsAnswered || (displayAsAnswered && !isCorrect)) && (
        <View className="absolute bottom-5 left-0 right-0 z-40 w-full">
          <View
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            className="w-full border-t border-slate-200 bg-white px-5 pt-4"
          >
            <PrimaryButton
              label="Submit Answer"
              onPress={handleNext}
              disabled={!selectedAnswer || (displayAsAnswered && !isCorrect)}
            />
          </View>
        </View>
      )}

      {/* HIỂN THỊ NÚT NEXT NẾU TRẢ LỜI ĐÚNG */}
      {displayAsAnswered && isCorrect && (
        <CheckResultButton
          status="correct"
          text={'Next Question'}
          onPress={handlePressNextQuestion} // 🌟 Gọi hàm chuyển cảnh tức thời
        />
      )}
    </SafeAreaView>
  );
};
