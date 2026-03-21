import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  IconAvatar1,
  IconBackButton,
  IconFeedBackRealTime,
  IconNextButton,
  IconRepeat,
} from '@/components/icon';
import { RootStackParamList } from '@/navigation';
import { HighlightedText } from '@/types/speaking.types';

import { AIInsightCard } from './components/AIInsightCard';
import { HelpfulPhraseCard } from './components/HelpfulPhraseCard';
import { HighlightedTextDisplay } from './components/HighlightedTextDisplay';
import { ScoreBadge } from './components/ScoreBadge';

type AIFeedbackScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AIFeedback'>;

// Mock feedback data
const mockFeedback = {
  aiQuestion: 'When can we deploy the new security protocols across the regional servers?',
  helpfulPhrase: 'Try using: "Yesterday, I went to the store to buy very good."',
  highlightedAnswer: [
    { text: '"Yesterday,', isCorrect: true },
    { text: 'I', isCorrect: true },
    { text: 'was go', isCorrect: false, correction: 'went' },
    { text: 'to the store', isCorrect: true },
    { text: 'and', isCorrect: true },
    { text: 'is', isCorrect: false, correction: 'was' },
    { text: 'buy', isCorrect: true },
    { text: 'very good."', isCorrect: true },
  ] as HighlightedText[],
  insight:
    'Great effort! You used the present tense when talking about "Yesterday". In English, past events require the Past Simple tense instead of "for + verb".',
  pronunciationScore: 92,
  grammarScore: 60,
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
      <View className="mt-5 border-b border-gray-200 px-4 py-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
          >
            <IconBackButton width={15} height={15} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Practice Setup</Text>
          <View className="h-8 w-8" />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-sm font-semibold uppercase tracking-wide text-[#C8102E]">
              Security Protocol Scenario
            </Text>
            <Text className="text-sm text-gray-500">Step 4 of 5</Text>
          </View>

          <View className="h-1.5 overflow-hidden rounded-full bg-gray-200">
            <View className="h-full rounded-full bg-[#C8102E]" style={{ width: '80%' }} />
          </View>
        </View>

        <View className="mb-6">
          <View className="mb-3 flex-row items-center gap-3">
            <View className="h-12 w-12 overflow-hidden rounded-full">
              <IconAvatar1 width={48} height={48} />
            </View>
            <Text className="text-sm font-semibold text-gray-600">AI TUTOR</Text>
          </View>
          <View className="rounded-3xl bg-gray-50 p-4">
            <Text className="text-base leading-6 text-gray-900">{mockFeedback.aiQuestion}</Text>
          </View>
        </View>

        <HelpfulPhraseCard phrase={mockFeedback.helpfulPhrase} />

        <HighlightedTextDisplay segments={mockFeedback.highlightedAnswer} title="Your Answer" />

        <AIInsightCard insight={mockFeedback.insight} />

        <View className="mb-6">
          <View className="mb-4 flex-row items-center gap-2">
            <IconFeedBackRealTime width={24} height={24} />
            <Text className="text-lg font-bold text-gray-900">Real-time Feedback</Text>
          </View>

          <View className="flex-row">
            <View className="flex-1 pr-2">
              <ScoreBadge
                label="Pronunciation"
                score={mockFeedback.pronunciationScore}
                type="pronunciation"
              />
            </View>

            <View className="flex-1 pl-2">
              <ScoreBadge label="Grammar" score={mockFeedback.grammarScore} type="grammar" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="mb-9 border-t border-gray-200 bg-white px-5 py-3">
        <View className="flex-row gap-2">
          {/* Retry Button */}
          <TouchableOpacity
            onPress={handleRetry}
            className="items-center justify-center rounded-full border-2 border-red-500 bg-white px-6 py-4"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center gap-2">
              <IconRepeat width={20} height={20} color="#EF4444" />
              <Text className="text-sm font-bold text-red-500">Retry</Text>
            </View>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            className="flex-1 items-center justify-center rounded-full bg-red-500 py-4 shadow-lg"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center gap-2">
              <Text className="text-base font-bold text-white">Continue</Text>
              <IconNextButton width={16} height={16} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
