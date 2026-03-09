import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MistakeCardProps {
  word: string;
  correctAnswer: string;
  yourAnswer: string;
  explanation?: string;
  onReview?: () => void;
}

export const MistakeCard: React.FC<MistakeCardProps> = ({
  word,
  correctAnswer,
  yourAnswer,
  explanation,
  onReview,
}) => {
  return (
    <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
      {/* Word */}
      <Text className="mb-3 text-xl font-bold text-gray-800">{word}</Text>

      {/* Your Answer */}
      <View className="mb-2">
        <Text className="mb-1 text-sm text-gray-500">Your answer:</Text>
        <View className="rounded-lg border border-red-200 bg-red-50 p-3">
          <Text className="text-base text-red-700">✗ {yourAnswer}</Text>
        </View>
      </View>

      {/* Correct Answer */}
      <View className="mb-3">
        <Text className="mb-1 text-sm text-gray-500">Correct answer:</Text>
        <View className="rounded-lg border border-green-200 bg-green-50 p-3">
          <Text className="text-base text-green-700">✓ {correctAnswer}</Text>
        </View>
      </View>

      {/* Explanation */}
      {explanation && (
        <View className="mb-3 rounded-lg bg-blue-50 p-3">
          <Text className="text-sm leading-5 text-blue-700">{explanation}</Text>
        </View>
      )}

      {/* Review Button */}
      {onReview && (
        <TouchableOpacity onPress={onReview} className="mt-2 rounded-xl bg-red-600 py-3">
          <Text className="text-center text-sm font-semibold text-white">Review This Word</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
