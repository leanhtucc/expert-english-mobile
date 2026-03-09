import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { SecondaryButton } from '../components/SecondaryButton';
import { MistakeCard } from './MistakeCard';

export interface MistakeItem {
  id: string;
  word: string;
  correctAnswer: string;
  yourAnswer: string;
  explanation?: string;
}

interface ReviewSessionScreenProps {
  mistakes: MistakeItem[];
  onReviewWord?: (wordId: string) => void;
  onRetakeQuiz?: () => void;
  onContinue?: () => void;
  onBack?: () => void;
}

export const ReviewSessionScreen: React.FC<ReviewSessionScreenProps> = ({
  mistakes,
  onReviewWord,
  onRetakeQuiz,
  onContinue,
  onBack,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <ScreenHeader title="Review & Master" subtitle="Learn from mistakes" onBack={onBack} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary */}
        <View className="mb-6 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 p-5">
          <Text className="mb-2 text-center text-2xl font-bold text-gray-800">
            {mistakes.length} {mistakes.length === 1 ? 'Mistake' : 'Mistakes'} to Review
          </Text>
          <Text className="text-center text-sm text-gray-600">
            Let&apos;s turn these into strengths!
          </Text>
        </View>

        {/* Mistakes List */}
        {mistakes.map(mistake => (
          <MistakeCard
            key={mistake.id}
            word={mistake.word}
            correctAnswer={mistake.correctAnswer}
            yourAnswer={mistake.yourAnswer}
            explanation={mistake.explanation}
            onReview={onReviewWord ? () => onReviewWord(mistake.id) : undefined}
          />
        ))}

        {/* Action Buttons */}
        <View className="mt-4 space-y-3">
          {onRetakeQuiz && (
            <PrimaryButton label="🔄 Retake Quiz" onPress={onRetakeQuiz} className="mb-3" />
          )}

          {onContinue && <SecondaryButton label="Continue Learning" onPress={onContinue} />}
        </View>

        {/* Motivational Message */}
        <View className="mt-6 rounded-2xl bg-blue-50 p-4">
          <Text className="text-center text-sm leading-5 text-blue-800">
            🌟 Every mistake is a learning opportunity. Review these words and try again!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
