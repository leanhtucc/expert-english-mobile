import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { CheckResultButton } from '../components';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { ImageQuestion } from './ImageQuestion';
import { OptionButton } from './OptionButton';
import { ImageQuizQuestion, useImageQuiz } from './useImageQuiz';

// <-- Import file này

interface ImageQuizScreenProps {
  questions: ImageQuizQuestion[];
  onComplete?: (results: any) => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const ImageQuizScreen: React.FC<ImageQuizScreenProps> = ({
  questions,
  onComplete,
  onBack,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
    isCorrect, // Lấy thêm trạng thái Đúng/Sai từ hook
    isLastQuestion,
    progress,
    handleSelectAnswer,
    handleNext,
  } = useImageQuiz({
    questions,
    onComplete,
  });

  if (!currentQuestion) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      <View className="w-full bg-white">
        <ScreenHeader
          title="Image Quiz"
          subtitle="Identify the vocabulary"
          onBack={onBack}
          onClose={onClose}
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        <View className="w-full px-5 pt-5 pb-2">
          <ProgressBar current={progress.current} total={progress.total} />
        </View>

        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8 w-full">
            <ImageQuestion imageUrl={currentQuestion.imageUrl} />
          </View>

          <Text className="mb-8 px-2 text-center text-[18px] font-bold text-[#1E293B]">
            {currentQuestion.correctAnswer ||
              'Which specialized AI architecture is shown in this visualization?'}
          </Text>

          <View className="w-full">
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

      {/* DẢI NÚT ĐÁY MÀN HÌNH: CHUYỂN ĐỔI GIỮA NÚT SUBMIT BÌNH THƯỜNG VÀ CHECK RESULT */}
      <View className="absolute bottom-[-25px] left-0 right-0 w-full">
        {!isAnswered ? (
          // Khi CHƯA CHỐT ĐÁP ÁN: Hiện Primary Button bình thường
          <View
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            className="w-full border-t border-slate-200 bg-white px-5 pt-4"
          >
            <PrimaryButton label="Submit Answer" onPress={handleNext} disabled={!selectedAnswer} />
          </View>
        ) : (
          // Khi ĐÃ CHỐT ĐÁP ÁN: Hiện thanh CheckResult bay lên
          <CheckResultButton
            status={isCorrect ? 'correct' : 'wrong'}
            text={isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            showIconNext={true}
            onPress={handleNext}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
