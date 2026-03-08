import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/navigation';
import { HighlightedText } from '@/types/speaking.types';

import { AIInsightCard } from './components/AIInsightCard';
import { HelpfulPhraseCard } from './components/HelpfulPhraseCard';
import { HighlightedTextDisplay } from './components/HighlightedTextDisplay';
import { ScoreBadge } from './components/ScoreBadge';

type AIFeedbackScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AIFeedback'>;

// Mock feedback data
const mockFeedback = {
  helpfulPhrase: 'Try using: "Yesterday, I went to the store to buy very good."',
  highlightedAnswer: [
    { text: '"Yesterday,', isCorrect: true },
    { text: 'I', isCorrect: true },
    { text: 'was go', isCorrect: false },
    { text: 'to the store', isCorrect: true },
    { text: 'and', isCorrect: true },
    { text: 'is', isCorrect: false },
    { text: 'buy', isCorrect: true },
    { text: 'very good."', isCorrect: true },
  ] as HighlightedText[],
  insight:
    'Great effort! You used the present tense when talking about "Yesterday". In English, past events require the Past Simple tense instead of "for + verb".',
  pronunciationScore: 92,
  grammarScore: 85,
};

export const AIFeedbackScreen: React.FC = () => {
  const navigation = useNavigation<AIFeedbackScreenNavigationProp>();
  // Future: Use route.params to get user answer and display actual feedback
  // const route = useRoute<RouteProp<RootStackParamList, 'AIFeedback'>>();
  // const userAnswer = route.params?.userAnswer || '';

  const handleRetry = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    // Navigate back and simulate next question
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-gray-200 px-5 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3 h-10 w-10 items-center justify-center"
          >
            <Text className="text-2xl text-gray-700">←</Text>
          </TouchableOpacity>
          <Text className="flex-1 text-xl font-bold text-gray-800">Speaking Practice</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Title */}
        <View className="mb-4">
          <View className="mb-4 rounded-lg bg-red-500 px-4 py-3">
            <Text className="text-sm font-semibold uppercase tracking-wide text-white">
              Security Protocol Scenario
            </Text>
            <Text className="mt-1 text-xs text-white/90">Step 4 of 5</Text>
          </View>
        </View>

        {/* Helpful Phrase */}
        <HelpfulPhraseCard phrase={mockFeedback.helpfulPhrase} />

        {/* User Answer with Highlights */}
        <HighlightedTextDisplay segments={mockFeedback.highlightedAnswer} title="Your Answer" />

        {/* AI Insight */}
        <AIInsightCard insight={mockFeedback.insight} />

        {/* Real-time Feedback Scores */}
        <View className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <Text className="mb-4 text-sm font-semibold text-gray-700">Real-time Feedback</Text>
          <View className="flex-row justify-around">
            <ScoreBadge
              label="Pronunciation"
              score={mockFeedback.pronunciationScore}
              type="pronunciation"
            />
            <ScoreBadge label="Grammar" score={mockFeedback.grammarScore} type="grammar" />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="border-t border-gray-200 bg-white px-5 py-4">
        <View className="flex-row gap-3">
          {/* Retry Button */}
          <TouchableOpacity
            onPress={handleRetry}
            className="flex-1 items-center rounded-full border-2 border-red-500 bg-white py-4"
            activeOpacity={0.8}
          >
            <Text className="text-base font-bold text-red-500">Retry</Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            className="flex-1 items-center rounded-full bg-red-500 py-4 shadow-lg"
            activeOpacity={0.8}
          >
            <Text className="text-base font-bold text-white">Continue →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
