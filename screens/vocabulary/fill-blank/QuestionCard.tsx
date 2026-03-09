import React from 'react';
import { Text, View } from 'react-native';

interface QuestionCardProps {
  beforeBlank: string;
  afterBlank: string;
  selectedAnswer?: string;
  isAnswered: boolean;
  isCorrect?: boolean;
  hint?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  beforeBlank,
  afterBlank,
  selectedAnswer,
  isAnswered,
  isCorrect,
  hint,
}) => {
  const getBlankStyle = () => {
    if (!isAnswered) return 'bg-gray-100 border-gray-300';
    if (isCorrect) return 'bg-green-100 border-green-500';
    return 'bg-red-100 border-red-500';
  };

  const getBlankTextStyle = () => {
    if (!isAnswered) return 'text-gray-400';
    if (isCorrect) return 'text-green-700';
    return 'text-red-700';
  };

  return (
    <View className="rounded-2xl bg-white p-6 shadow-sm">
      {/* Sentence with blank */}
      <View className="mb-4 flex-row flex-wrap items-center justify-center">
        <Text className="text-center text-lg leading-8 text-gray-800">{beforeBlank} </Text>

        <View
          className={` ${getBlankStyle()} min-w-[100px] items-center justify-center rounded-lg border-2 px-4 py-2`}
        >
          <Text className={`${getBlankTextStyle()} text-lg font-semibold`}>
            {selectedAnswer || '______'}
          </Text>
        </View>

        <Text className="text-center text-lg leading-8 text-gray-800"> {afterBlank}</Text>
      </View>

      {/* Hint */}
      {hint && !isAnswered && (
        <View className="mt-4 rounded-xl bg-blue-50 p-3">
          <Text className="text-center text-sm text-blue-700">💡 Hint: {hint}</Text>
        </View>
      )}

      {/* Feedback */}
      {isAnswered && (
        <View className={`mt-4 rounded-xl p-3 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <Text
            className={`text-center text-sm font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}
          >
            {isCorrect ? '✓ Correct!' : '✗ Try again next time'}
          </Text>
        </View>
      )}
    </View>
  );
};
