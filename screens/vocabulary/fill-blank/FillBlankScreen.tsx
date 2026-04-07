import React, { useEffect, useRef, useState } from 'react';
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
  onOpenHint?: () => void;
  progress?: { current: number; total: number };
}

export const FillBlankScreen: React.FC<FillBlankScreenProps> = ({
  questions,
  onComplete,
  onBack,
  onOpenHint,
  progress: externalProgress,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const {
    currentQuestion,
    selectedAnswer,
    eliminatedAnswers,
    isAnswered,
    isCorrect,
    progress: internalProgress,
    sentenceParts,
    handleSelectAnswer,
    eliminateSelectedAnswer,
    handleNext,
    resetAnswer,
  } = useFillBlank({
    questions,
    onComplete: onComplete ? (score: number) => onComplete(score) : undefined,
  });

  // 🌟 STATE QUẢN LÝ GỢI Ý & CHỐNG NHÁY
  const [localWrongAttempts, setLocalWrongAttempts] = useState(0);
  const [isHintUsed, setIsHintUsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wrongReportedRef = useRef(false);

  // 🌟 RESET KHI CÂU HỎI THAY ĐỔI
  useEffect(() => {
    setLocalWrongAttempts(0);
    setIsHintUsed(false);
    setIsTransitioning(false);
    wrongReportedRef.current = false;
  }, [currentQuestion?.beforeBlank]); // Có thể lấy trước khoảng trống làm key nhận diện câu mới

  // LOGIC TRẢ LỜI SAI: Tăng biến đếm và báo lỗi
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isAnswered && !isCorrect && !isTransitioning) {
      if (!wrongReportedRef.current) {
        setLocalWrongAttempts(prev => prev + 1); // 🌟 TĂNG BIẾN ĐẾM LỖI
        onComplete?.(0); // Gọi báo lỗi cho Parent
        wrongReportedRef.current = true;
      }
      timer = setTimeout(() => {
        eliminateSelectedAnswer();
        resetAnswer();
        wrongReportedRef.current = false; // Reset cờ sai cho phép đếm lỗi lần sau
      }, 700);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAnswered, isCorrect, resetAnswer, onComplete, isTransitioning, eliminateSelectedAnswer]);

  const handlePressHint = () => {
    setIsHintUsed(true);
    if (onOpenHint) onOpenHint();
  };

  const handlePressNextQuestion = () => {
    setIsTransitioning(true); // 🌟 Kích hoạt chống nháy
    handleNext();
  };

  if (!currentQuestion) return null;
  const displayProgress = externalProgress || internalProgress;

  // Giả vờ như chưa trả lời nếu đang chuyển cảnh
  const displayAsAnswered = isAnswered && !isTransitioning;

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
        <View className="w-full px-5 pb-5 pt-4">
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
              isAnswered={displayAsAnswered} // 🌟 Truyền state đã chặn nháy
              isCorrect={isCorrect}
              hint={currentQuestion.hint}
              showHintButton={localWrongAttempts >= 2} // 🌟 CHỈ HIỆN KHI SAI >= 2 LẦN
              isHintUsed={isHintUsed}
              onPressHint={handlePressHint}
            />
          </View>
          <View className="w-full">
            <AnswerInput
              key={currentQuestion.id || sentenceParts.before}
              options={currentQuestion.options}
              selectedAnswer={selectedAnswer}
              correctAnswer={currentQuestion.correctAnswer}
              eliminatedAnswers={eliminatedAnswers}
              isAnswered={displayAsAnswered} // 🌟 Truyền state đã chặn nháy
              onSelectAnswer={handleSelectAnswer}
            />
          </View>
        </ScrollView>
      </View>

      {/* HIỂN THỊ NÚT SUBMIT NẾU CHƯA TRẢ LỜI HOẶC ĐANG SAI */}
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

      {/* HIỂN THỊ MODAL BÁO ĐÚNG KHI TRẢ LỜI ĐÚNG */}
      {displayAsAnswered && isCorrect && (
        <CheckResultButton
          status="correct"
          text={'Next Question'}
          onPress={handlePressNextQuestion}
        />
      )}
    </SafeAreaView>
  );
};
