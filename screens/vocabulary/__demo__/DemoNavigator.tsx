import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { DemoFillBlankScreen } from './DemoFillBlankScreen';
// import { DemoFlashcardScreen } from './DemoFlashcardScreen';
import { DemoImageQuizScreen } from './DemoImageQuizScreen';
import { DemoLessonResultScreen } from './DemoLessonResultScreen';
import { DemoMatchTermsScreen } from './DemoMatchTermsScreen';
import { DemoMultipleChoiceScreen } from './DemoMultipleChoiceScreen';
import { DemoReviewSessionScreen } from './DemoReviewSessionScreen';

type DemoScreenType =
  | 'menu'
  | 'flashcard'
  | 'multipleChoice'
  | 'imageQuiz'
  | 'matchTerms'
  | 'ReviewSession'
  | 'reviewSession'
  | 'lessonResult';

interface DemoMenuItem {
  key: DemoScreenType;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const demoMenuItems: DemoMenuItem[] = [
  {
    key: 'flashcard',
    title: 'Flashcard',
    description: 'Interactive flip cards with audio',
    icon: '🎴',
    color: 'bg-blue-500',
  },
  {
    key: 'multipleChoice',
    title: 'Multiple Choice',
    description: 'Word meaning selection quiz',
    icon: '📝',
    color: 'bg-green-500',
  },
  {
    key: 'imageQuiz',
    title: 'Image Quiz',
    description: 'Visual vocabulary identification',
    icon: '🖼️',
    color: 'bg-purple-500',
  },
  {
    key: 'matchTerms',
    title: 'Match Terms',
    description: 'Pair terms with definitions',
    icon: '🔗',
    color: 'bg-orange-500',
  },
  {
    key: 'ReviewSession',
    title: 'Review Session',
    description: 'Review incorrect answers',
    icon: '📚',
    color: 'bg-red-500',
  },
  {
    key: 'reviewSession',
    title: 'Review Session',
    description: 'Review incorrect answers',
    icon: '📚',
    color: 'bg-red-500',
  },
  {
    key: 'lessonResult',
    title: 'Lesson Result',
    description: 'Summary and performance stats',
    icon: '🏆',
    color: 'bg-yellow-500',
  },
];

/**
 * Demo Navigator - Main entry point for testing vocabulary UI
 * Allows developers to quickly switch between exercise types
 */
export const DemoNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<DemoScreenType>('menu');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'multipleChoice':
        return <DemoMultipleChoiceScreen />;
      case 'imageQuiz':
        return <DemoImageQuizScreen />;
      case 'matchTerms':
        return <DemoMatchTermsScreen />;
      case 'ReviewSession':
        return <DemoFillBlankScreen />;
      case 'reviewSession':
        return <DemoReviewSessionScreen />;
      case 'lessonResult':
        return <DemoLessonResultScreen />;
      case 'menu':
      default:
        return <DemoMenu onSelectScreen={setCurrentScreen} />;
    }
  };

  // Show back button overlay when not on menu
  return <View className="flex-1">{renderScreen()}</View>;
};

/**
 * Demo Menu Component
 */
const DemoMenu: React.FC<{ onSelectScreen: (screen: DemoScreenType) => void }> = ({
  onSelectScreen,
}) => {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="bg-gradient-to-b from-blue-500 to-blue-600 px-6 pt-16 pb-6">
        <Text className="mb-2 text-3xl font-bold text-white">🧪 Vocabulary Demo</Text>
        <Text className="text-base text-blue-100">Test and debug UI components with mock data</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <Text className="mb-1 text-sm font-semibold text-yellow-700 dark:text-yellow-300">
            👨‍💻 Developer Mode
          </Text>
          <Text className="text-xs text-yellow-600 dark:text-yellow-400">
            All screens use mock data. No backend required.
          </Text>
        </View>

        <Text className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Exercise Types</Text>

        <View className="mb-6 space-y-3">
          {demoMenuItems.map(item => (
            <Pressable
              key={item.key}
              onPress={() => onSelectScreen(item.key)}
              className="flex-row items-center rounded-xl border-2 border-gray-200 bg-white p-4 active:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
            >
              <View className={`h-12 w-12 ${item.color} items-center justify-center rounded-lg`}>
                <Text className="text-2xl">{item.icon}</Text>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-base font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </Text>
                <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </Text>
              </View>
              <Text className="text-xl text-gray-400 dark:text-gray-600">›</Text>
            </Pressable>
          ))}
        </View>

        <View className="mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <Text className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
            💡 Testing Features
          </Text>
          <View className="space-y-1">
            <Text className="text-xs text-blue-600 dark:text-blue-400">✓ Mock data included</Text>
            <Text className="text-xs text-blue-600 dark:text-blue-400">
              ✓ All UI states testable
            </Text>
            <Text className="text-xs text-blue-600 dark:text-blue-400">
              ✓ Debug controls available
            </Text>
            <Text className="text-xs text-blue-600 dark:text-blue-400">✓ No backend required</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
