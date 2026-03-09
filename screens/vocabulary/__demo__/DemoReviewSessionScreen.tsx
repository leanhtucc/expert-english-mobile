import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { mockMistakes } from '../__mocks__';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { MistakeCard } from '../review-session/MistakeCard';

/**
 * Demo screen for testing Review Session UI with mock data
 * Shows incorrect answers with explanations
 */
export const DemoReviewSessionScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScreenHeader title="Review Session Demo" onBack={() => console.log('Back')} />

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
            Review Your Mistakes
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400">
            Let&apos;s go over what you got wrong and learn from it.
          </Text>
        </View>

        <View className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <Text className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
            📚 {mockMistakes.length} mistakes found
          </Text>
          <Text className="mt-1 text-xs text-yellow-600 dark:text-yellow-400">
            Review these carefully to master them
          </Text>
        </View>

        <View className="mb-8 space-y-4">
          {mockMistakes.map((mistake, index) => (
            <View key={mistake.id}>
              <Text className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-500">
                Mistake {index + 1}
              </Text>
              <MistakeCard
                word={mistake.word}
                correctAnswer={mistake.correctAnswer}
                yourAnswer={mistake.yourAnswer}
                explanation={mistake.explanation}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="border-t border-gray-200 px-6 py-6 dark:border-gray-700">
        <PrimaryButton label="Continue to Results" onPress={() => console.log('Continue')} />
      </View>
    </View>
  );
};
