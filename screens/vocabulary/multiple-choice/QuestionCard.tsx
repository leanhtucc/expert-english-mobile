import React from 'react';
import { Text, View } from 'react-native';

interface QuestionCardProps {
  word: string;
  question: string;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ word, question, className = '' }) => {
  return (
    <View className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}>
      {/* Word */}
      <View className="mb-4 items-center">
        <Text className="mb-2 text-3xl font-bold text-red-600">{word}</Text>
        <View className="h-1 w-16 rounded-full bg-red-600" />
      </View>

      {/* Question */}
      <Text className="text-center text-lg leading-7 text-gray-700">{question}</Text>
    </View>
  );
};
