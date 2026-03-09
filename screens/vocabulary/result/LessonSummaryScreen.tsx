import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { ResultStatCard } from './ResultStatCard';

export interface LessonSummaryData {
  totalWords: number;
  accuracy: number;
  timeSpent: string;
  masteredWords: number;
  streak?: number;
}

interface LessonSummaryScreenProps {
  data: LessonSummaryData;
  onStartSpeaking?: () => void;
  onViewVocabulary?: () => void;
  onContinue?: () => void;
  showSpeakingButton?: boolean;
}

export const LessonSummaryScreen: React.FC<LessonSummaryScreenProps> = ({
  data,
  onStartSpeaking,
  onViewVocabulary,
  onContinue,
  showSpeakingButton = true,
}) => {
  const getPerformanceMessage = () => {
    if (data.accuracy >= 90) return 'Spectacular!';
    if (data.accuracy >= 75) return 'Great Job!';
    if (data.accuracy >= 60) return 'Good Work!';
    return 'Keep Practicing!';
  };

  const getPerformanceSubtitle = () => {
    if (data.accuracy >= 90) {
      return `You've mastered ${data.masteredWords} new industry terms`;
    }
    return `You've learned ${data.masteredWords} new terms`;
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-red-50 to-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Badge */}
        <View className="mb-6 mt-4 items-center">
          <View className="rounded-2xl bg-white px-6 py-2 shadow-sm">
            <Text className="text-sm font-semibold text-red-600">LESSON SUMMARY</Text>
          </View>
        </View>

        {/* Mascot/Character */}
        <View className="mb-6 items-center">
          <View className="h-40 w-40 items-center justify-center rounded-full bg-red-100">
            {/* Placeholder for mascot image */}
            <Text className="text-6xl">🎉</Text>
          </View>
        </View>

        {/* Performance Title */}
        <Text className="mb-2 text-center text-4xl font-bold text-gray-800">
          {getPerformanceMessage()}
        </Text>

        <Text className="mb-8 text-center text-base text-gray-600">{getPerformanceSubtitle()}</Text>

        {/* Stats Grid */}
        <View className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <View className="flex-row justify-around">
            <ResultStatCard
              icon={<Text className="text-3xl">📚</Text>}
              value={data.totalWords}
              label="Total"
            />

            <View className="w-px bg-gray-200" />

            <ResultStatCard
              icon={<Text className="text-3xl">✓</Text>}
              value={`${data.accuracy}%`}
              label="Accuracy"
              valueColor="text-green-600"
            />

            <View className="w-px bg-gray-200" />

            <ResultStatCard
              icon={<Text className="text-3xl">⏱</Text>}
              value={data.timeSpent}
              label="Time"
            />
          </View>

          {data.streak && data.streak > 1 && (
            <>
              <View className="my-4 h-px bg-gray-200" />
              <View className="items-center">
                <Text className="mb-1 text-2xl">🔥</Text>
                <Text className="text-xl font-bold text-orange-600">{data.streak} Day Streak!</Text>
                <Text className="text-sm text-gray-500">Keep it up!</Text>
              </View>
            </>
          )}
        </View>

        {/* Action Buttons */}
        <View className="space-y-3">
          {showSpeakingButton && onStartSpeaking && (
            <PrimaryButton label="🎤 Start Speaking" onPress={onStartSpeaking} className="mb-3" />
          )}

          {onViewVocabulary && (
            <SecondaryButton
              label="📖 View My Vocabulary"
              onPress={onViewVocabulary}
              className="mb-3"
            />
          )}

          {onContinue && !showSpeakingButton && (
            <PrimaryButton label="Continue" onPress={onContinue} />
          )}
        </View>

        {/* Encouragement Message */}
        <View className="mt-8 rounded-2xl bg-blue-50 p-4">
          <Text className="text-center text-sm leading-5 text-blue-800">
            💡 Tip: Practice speaking these words aloud to improve retention!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
