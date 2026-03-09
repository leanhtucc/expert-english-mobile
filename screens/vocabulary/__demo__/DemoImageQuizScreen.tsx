import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { mockImageQuizQuestions } from '../__mocks__';
import { OptionButton } from '../components/OptionButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { ImageQuestion } from '../image-quiz/ImageQuestion';

/**
 * Demo screen for testing Image Quiz UI with mock data
 * Shows all states: unanswered, selected, correct, incorrect
 */
export const DemoImageQuizScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = mockImageQuizQuestions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
    }
  };

  const handleCheckAnswer = () => {
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < mockImageQuizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScreenHeader title="Image Quiz Demo" onBack={() => console.log('Back')} />

      <View className="px-4 pt-6 pb-4">
        <ProgressBar current={currentIndex + 1} total={mockImageQuizQuestions.length} />
      </View>

      <View className="flex-1 px-6">
        <ImageQuestion imageUrl={currentQuestion.imageUrl} />

        <Text className="mt-6 mb-4 text-center text-lg font-semibold text-gray-800 dark:text-white">
          What does this image represent?
        </Text>

        <View className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const showCorrect = isAnswered && option === currentQuestion.correctAnswer;
            const showIncorrect = isAnswered && isSelected && !isCorrect;

            return (
              <OptionButton
                key={index}
                label={option}
                isSelected={isSelected}
                isCorrect={showCorrect}
                isWrong={showIncorrect}
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
            Toggle Answered (Current: {isAnswered ? 'Answered' : 'Unanswered'})
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
