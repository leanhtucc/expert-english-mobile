import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { mockMultipleChoiceQuestions } from '../__mocks__';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { OptionItem } from '../multiple-choice/OptionItem';
import { QuestionCard } from '../multiple-choice/QuestionCard';

/**
 * Demo screen for testing Multiple Choice UI with mock data
 * Shows all states: unanswered, selected, correct, incorrect
 */
export const DemoMultipleChoiceScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = mockMultipleChoiceQuestions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
    }
  };

  const handleCheckAnswer = () => {
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < mockMultipleChoiceQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScreenHeader title="Multiple Choice Demo" onBack={() => console.log('Back')} />

      <View className="px-4 pt-6 pb-4">
        <ProgressBar current={currentIndex + 1} total={mockMultipleChoiceQuestions.length} />
      </View>

      <View className="flex-1 px-6">
        <QuestionCard word={currentQuestion.word} question={currentQuestion.question} />

        <View className="mt-6 space-y-3">
          {currentQuestion.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = selectedAnswer === option;
            const showCorrect = isAnswered && option === currentQuestion.correctAnswer;

            return (
              <OptionItem
                key={index}
                letter={letter}
                text={option}
                isSelected={isSelected}
                isCorrect={showCorrect}
                isAnswered={isAnswered}
                onPress={() => handleSelectOption(option)}
              />
            );
          })}
        </View>

        {isAnswered && (
          <View className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <Text className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
              Explanation:
            </Text>
            <Text className="text-sm text-blue-600 dark:text-blue-400">
              {currentQuestion.explanation}
            </Text>
          </View>
        )}
      </View>

      <View className="px-6 py-6">
        {!isAnswered ? (
          <PrimaryButton
            label="Check Answer"
            onPress={handleCheckAnswer}
            disabled={!selectedAnswer}
          />
        ) : (
          <PrimaryButton label="Next Question" onPress={handleNext} />
        )}
      </View>

      {/* Debug Controls */}
      <View className="bg-gray-100 px-6 pb-6 dark:bg-gray-800">
        <Text className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
          Debug Controls:
        </Text>
        <Pressable
          onPress={() => setIsAnswered(!isAnswered)}
          className="rounded-lg bg-blue-500 py-2 px-4"
        >
          <Text className="text-center text-sm text-white">
            Toggle Answered State (Current: {isAnswered ? 'Answered' : 'Unanswered'})
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
