import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { OptionItem } from './OptionItem';
import { QuestionCard } from './QuestionCard';
import { MultipleChoiceQuestion, useMultipleChoice } from './useMultipleChoice';

interface MultipleChoiceScreenProps {
  questions: MultipleChoiceQuestion[];
  onComplete?: (score: number) => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const MultipleChoiceScreen: React.FC<MultipleChoiceScreenProps> = ({
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
    progress,
    handleSelectAnswer,
    handleNext,
  } = useMultipleChoice({
    questions,
    onComplete,
  });

  if (!currentQuestion) {
    return null;
  }

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <ScreenHeader
        title="Word Meaning"
        subtitle="Multiple Choice"
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
          word={currentQuestion.word}
          question={currentQuestion.question}
          className="mb-6"
        />

        {/* Options */}
        <View className="mb-6">
          {currentQuestion.options.map((option, index) => (
            <OptionItem
              key={index}
              letter={optionLetters[index]}
              text={option}
              isSelected={selectedAnswer === option}
              isCorrect={option === currentQuestion.correctAnswer}
              isAnswered={isAnswered}
              onPress={() => handleSelectAnswer(option)}
            />
          ))}
        </View>

        {/* Explanation */}
        {isAnswered && currentQuestion.explanation && (
          <View className={`mb-6 rounded-2xl p-4 ${isCorrect ? 'bg-green-50' : 'bg-blue-50'}`}>
            <Text
              className={`mb-2 text-sm font-semibold ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}
            >
              {isCorrect ? '✓ Correct!' : 'ℹ Good to know'}
            </Text>
            <Text className={`text-sm leading-5 ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
              {currentQuestion.explanation}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {isAnswered && (
          <PrimaryButton label={isLastQuestion ? 'Finish' : 'Next Question'} onPress={handleNext} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
