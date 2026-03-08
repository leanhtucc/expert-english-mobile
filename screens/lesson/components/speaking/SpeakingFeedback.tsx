import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface SpeakingFeedbackProps {
  score: number; // 0-100
  pronunciation?: number;
  fluency?: number;
  accuracy?: number;
  feedback?: string;
}

export const SpeakingFeedback: React.FC<SpeakingFeedbackProps> = ({
  score,
  pronunciation,
  fluency,
  accuracy,
  feedback,
}) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (s: number) => {
    if (s >= 80) return 'bg-green-50 border-green-200';
    if (s >= 60) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <View className="mx-5">
      {/* Main score */}
      <View className={`mb-4 items-center rounded-2xl border p-6 ${getScoreBg(score)}`}>
        <ThemedText className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Overall Score
        </ThemedText>
        <ThemedText className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</ThemedText>
      </View>

      {/* Detail scores */}
      <View className="mb-4 flex-row gap-3">
        {pronunciation !== undefined && (
          <View className="flex-1 items-center rounded-xl border border-gray-100 bg-white p-3">
            <ThemedText className="mb-1 text-xs text-gray-500">Pronunciation</ThemedText>
            <ThemedText className={`text-xl font-bold ${getScoreColor(pronunciation)}`}>
              {pronunciation}
            </ThemedText>
          </View>
        )}
        {fluency !== undefined && (
          <View className="flex-1 items-center rounded-xl border border-gray-100 bg-white p-3">
            <ThemedText className="mb-1 text-xs text-gray-500">Fluency</ThemedText>
            <ThemedText className={`text-xl font-bold ${getScoreColor(fluency)}`}>
              {fluency}
            </ThemedText>
          </View>
        )}
        {accuracy !== undefined && (
          <View className="flex-1 items-center rounded-xl border border-gray-100 bg-white p-3">
            <ThemedText className="mb-1 text-xs text-gray-500">Accuracy</ThemedText>
            <ThemedText className={`text-xl font-bold ${getScoreColor(accuracy)}`}>
              {accuracy}
            </ThemedText>
          </View>
        )}
      </View>

      {/* Feedback */}
      {feedback && (
        <View className="rounded-xl bg-gray-50 p-4">
          <ThemedText className="mb-2 text-sm font-medium text-gray-600">Feedback</ThemedText>
          <ThemedText className="text-base leading-6 text-gray-700">{feedback}</ThemedText>
        </View>
      )}
    </View>
  );
};
