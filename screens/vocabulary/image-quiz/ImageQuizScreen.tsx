import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { CheckResultButton, OptionButton } from '../components';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { ImageQuestion } from './ImageQuestion';
import { ImageQuizQuestion, useImageQuiz } from './useImageQuiz';

interface ImageQuizScreenProps {
  questions: ImageQuizQuestion[];
  onComplete?: (results: any) => void;
  onBack?: () => void;
  onClose?: () => void;
  progress?: { current: number; total: number };
}

export const ImageQuizScreen: React.FC<ImageQuizScreenProps> = ({
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
    isCorrect,
    isLastQuestion,
    progress: internalProgress,
    handleSelectAnswer,
    handleNext,
    resetAnswer,
  } = useImageQuiz({
    questions,
    onComplete,
  });

  // LOGIC: KHI TRẢ LỜI SAI -> CHỜ 1.5 GIÂY RỒI RESET ĐỂ CHỌN LẠI
  useEffect(() => {
    // Sử dụng ReturnType để TypeScript tự động nhận diện đúng kiểu của môi trường hiện tại
    let timer: ReturnType<typeof setTimeout>;

    if (isAnswered && !isCorrect) {
      timer = setTimeout(() => {
        resetAnswer();
      }, 1500);
    }

    // Luôn luôn trả về hàm dọn dẹp ở cuối để chiều lòng TypeScript
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
        <ScreenHeader title="Industry Quiz" subtitle="" onBack={onBack} onClose={onClose} />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        <View className="w-full px-5 pb-2 pt-5">
          <ProgressBar
            current={displayProgress.current}
            total={displayProgress.total}
            variant="quiz"
          />
        </View>

        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8 w-full">
            <ImageQuestion imageUrl={currentQuestion.imageUrl} />
          </View>

          <Text className="mb-8 px-2 text-center text-[18px] font-extrabold text-[#1E293B]">
            {currentQuestion.correctAnswer ||
              'Which specialized AI architecture is shown in this visualization?'}
          </Text>

          <View className="w-full" key={currentQuestion.id}>
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={`${currentQuestion.id}-${index}`}
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
        <CheckResultButton
          status="correct"
          text={isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          onPress={handleNext}
        />
      )}
    </SafeAreaView>
  );
};
