import { AlertCircle, CheckCircle } from 'lucide-react-native';

import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface Correction {
  original: string;
  corrected: string;
  explanation: string;
  type: 'grammar' | 'spelling' | 'punctuation' | 'style';
}

interface WritingFeedbackProps {
  score: number;
  corrections: Correction[];
  overallFeedback?: string;
}

export const WritingFeedback: React.FC<WritingFeedbackProps> = ({
  score,
  corrections,
  overallFeedback,
}) => {
  const getCorrectionColor = (type: Correction['type']) => {
    switch (type) {
      case 'grammar':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      case 'spelling':
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'punctuation':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'style':
        return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
    }
  };

  return (
    <View className="mx-5">
      {/* Score header */}
      <View className="mb-4 items-center rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <ThemedText className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Writing Score
        </ThemedText>
        <ThemedText
          className={`text-4xl font-bold ${score >= 70 ? 'text-green-600' : 'text-amber-600'}`}
        >
          {score}%
        </ThemedText>
        {corrections.length === 0 ? (
          <View className="mt-3 flex-row items-center">
            <CheckCircle size={16} color="#16A34A" />
            <ThemedText className="ml-2 text-sm text-green-600">No corrections needed!</ThemedText>
          </View>
        ) : (
          <View className="mt-3 flex-row items-center">
            <AlertCircle size={16} color="#D97706" />
            <ThemedText className="ml-2 text-sm text-amber-600">
              {corrections.length} correction{corrections.length > 1 ? 's' : ''} suggested
            </ThemedText>
          </View>
        )}
      </View>

      {/* Corrections list */}
      {corrections.length > 0 && (
        <View className="mb-4 gap-3">
          {corrections.map((correction, idx) => {
            const colors = getCorrectionColor(correction.type);
            return (
              <View key={idx} className={`rounded-xl border p-4 ${colors.bg} ${colors.border}`}>
                <View className="mb-2 flex-row items-center">
                  <View className={`rounded px-2 py-0.5 ${colors.bg}`}>
                    <ThemedText className={`text-xs font-semibold uppercase ${colors.text}`}>
                      {correction.type}
                    </ThemedText>
                  </View>
                </View>
                <View className="mb-2 flex-row items-center gap-2">
                  <ThemedText className="text-base text-red-500 line-through">
                    {correction.original}
                  </ThemedText>
                  <ThemedText className="text-gray-400">→</ThemedText>
                  <ThemedText className="text-base font-medium text-green-600">
                    {correction.corrected}
                  </ThemedText>
                </View>
                <ThemedText className="text-sm text-gray-600">{correction.explanation}</ThemedText>
              </View>
            );
          })}
        </View>
      )}

      {/* Overall feedback */}
      {overallFeedback && (
        <View className="rounded-xl bg-gray-50 p-4">
          <ThemedText className="mb-2 text-sm font-medium text-gray-600">
            Overall Feedback
          </ThemedText>
          <ThemedText className="text-base leading-6 text-gray-700">{overallFeedback}</ThemedText>
        </View>
      )}
    </View>
  );
};
