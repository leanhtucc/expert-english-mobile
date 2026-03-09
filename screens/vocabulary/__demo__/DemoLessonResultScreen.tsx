import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import {
  mockLessonResultAverage,
  mockLessonResultExcellent,
  mockLessonResultGood,
  mockLessonResultNeedsWork,
} from '../__mocks__';
import { LessonSummaryScreen } from '../result/LessonSummaryScreen';

/**
 * Demo screen for testing Lesson Result UI with mock data
 * Allows switching between different performance levels
 */
export const DemoLessonResultScreen: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<
    'excellent' | 'good' | 'average' | 'needsWork'
  >('excellent');

  const resultData = {
    excellent: mockLessonResultExcellent,
    good: mockLessonResultGood,
    average: mockLessonResultAverage,
    needsWork: mockLessonResultNeedsWork,
  }[selectedResult];

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      {/* Debug Controls at Top */}
      <View className="border-b border-gray-300 bg-gray-100 px-4 pt-12 pb-4 dark:border-gray-700 dark:bg-gray-800">
        <Text className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
          Debug: Select Performance Level
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {[
              { key: 'excellent', label: '🎉 Excellent (95%)' },
              { key: 'good', label: '👍 Good (80%)' },
              { key: 'average', label: '📚 Average (67%)' },
              { key: 'needsWork', label: '💪 Needs Work (50%)' },
            ].map(option => (
              <Pressable
                key={option.key}
                onPress={() => setSelectedResult(option.key as any)}
                className={`rounded-lg py-2 px-4 ${
                  selectedResult === option.key ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    selectedResult === option.key
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Actual Result Screen */}
      <LessonSummaryScreen
        data={resultData}
        onContinue={() => console.log('Continue')}
        onViewVocabulary={() => console.log('View vocabulary')}
      />
    </View>
  );
};
