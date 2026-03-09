import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

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
}

export const FillBlankScreen: React.FC<FillBlankScreenProps> = ({
  questions,
  onComplete,
  onBack,
  onClose,
}) => {
  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
    isCorrect,
    isLastQuestion,
    sentenceParts,
    progress,
    handleSelectAnswer,
    handleNext,
  } = useFillBlank({
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
        title="Fill in the Blank"
        subtitle="Complete the sentence"
        onBack={onBack}
        onClose={onClose}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress */}
        <ProgressBar current={progress.current} total={progress.total} className="mb-6" />

        {/* Question Card */}
        <QuestionCard
          beforeBlank={sentenceParts.before}
          afterBlank={sentenceParts.after}
          selectedAnswer={selectedAnswer || undefined}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          hint={currentQuestion.hint}
        />

        {/* Answer Options */}
        <View className="mt-6">
          <AnswerInput
            options={currentQuestion.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            isAnswered={isAnswered}
            onSelectAnswer={handleSelectAnswer}
          />
        </View>

        {/* Next Button */}
        {isAnswered && (
          <PrimaryButton
            label={isLastQuestion ? 'Finish' : 'Next Question'}
            onPress={handleNext}
            className="mt-4"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
