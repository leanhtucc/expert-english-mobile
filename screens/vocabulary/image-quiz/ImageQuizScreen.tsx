import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { ImageQuestion } from './ImageQuestion';
import { OptionButton } from './OptionButton';
import { ImageQuizQuestion, useImageQuiz } from './useImageQuiz';

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
  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
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
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <ScreenHeader
        title="Image Quiz"
        subtitle="Identify the vocabulary"
        onBack={onBack}
        onClose={onClose}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress */}
        <ProgressBar current={progress.current} total={progress.total} className="mb-6" />

        {/* Image */}
        <ImageQuestion imageUrl={currentQuestion.imageUrl} className="mb-6" />

        {/* Question Text */}
        <Text className="mb-4 text-center text-lg font-semibold text-gray-800">
          Which specialized AI architecture is shown in this visualization?
        </Text>

        {/* Options */}
        <View className="mb-6">
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
      {/* Next Button fixed at bottom */}
      {isAnswered && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 16,
            backgroundColor: 'rgba(250,250,250,0.96)',
          }}
        >
          <PrimaryButton
            label={isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            onPress={handleNext}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
