import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { mockFillBlankQuestions } from '../__mocks__';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { AnswerInput } from '../fill-blank/AnswerInput';
import { QuestionCard } from '../fill-blank/QuestionCard';

/**
 * Demo screen for testing Fill in the Blank UI with mock data
 * Shows all states: unanswered, typing, correct, incorrect
 */
export const DemoFillBlankScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = mockFillBlankQuestions[currentIndex];

  const handleSelectAnswer = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
    }
  };

  const handleCheckAnswer = () => {
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < mockFillBlankQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  // Split sentence to get before and after blank
  const words = currentQuestion.sentence.split(' ');
  const beforeBlank = words.slice(0, currentQuestion.blankIndex).join(' ');
  const afterBlank = words.slice(currentQuestion.blankIndex + 1).join(' ');

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScreenHeader title="Fill in the Blank Demo" onBack={() => console.log('Back')} />

      <View className="px-4 pt-6 pb-4">
        <ProgressBar current={currentIndex + 1} total={mockFillBlankQuestions.length} />
      </View>

      <View className="flex-1 px-6">
        <QuestionCard
          beforeBlank={beforeBlank}
          afterBlank={afterBlank}
          selectedAnswer={selectedAnswer || undefined}
          isAnswered={isAnswered}
          isCorrect={isAnswered ? isCorrect : undefined}
          hint={currentQuestion.hint}
        />

        <View className="mt-6">
          <AnswerInput
            options={currentQuestion.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            isAnswered={isAnswered}
            onSelectAnswer={handleSelectAnswer}
          />
        </View>

        {isAnswered && (
          <View
            className={`mt-4 rounded-lg p-4 ${
              isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
            }`}
          >
            <Text
              className={`mb-2 text-sm font-semibold ${
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              }`}
            >
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </Text>
            {!isCorrect && (
              <Text className="text-sm text-red-600 dark:text-red-400">
                Correct answer:{' '}
                <Text className="font-semibold">{currentQuestion.correctAnswer}</Text>
              </Text>
            )}
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
            Toggle Answered (Current:{isAnswered ? 'Answered' : 'Unanswered'})
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
