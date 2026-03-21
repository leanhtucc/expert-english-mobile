import React from 'react';
import { Text, View } from 'react-native';

interface VocabularyCardProps {
  word: string;
  phonetic?: string;
  definition?: string;
  example?: string;
  translation?: string;
  className?: string;
  children?: React.ReactNode;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  phonetic,
  definition,
  example,
  translation,
  className = '',
  children,
}) => {
  return (
    <View className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}>
      {/* Word */}
      <Text className="mb-2 text-center text-3xl font-bold text-gray-800">{word}</Text>

      {/* Phonetic */}
      {phonetic && <Text className="mb-4 text-center text-base text-gray-500">{phonetic}</Text>}

      {/* Definition */}
      {definition && (
        <View className="mb-3">
          <Text className="mb-1 text-sm font-semibold text-gray-700">Definition:</Text>
          <Text className="text-base text-gray-600">{definition}</Text>
        </View>
      )}

      {/* Example */}
      {example && (
        <View className="mb-3">
          <Text className="mb-1 text-sm font-semibold text-gray-700">Example:</Text>
          <Text className="text-base italic text-gray-600">&ldquo;{example}&rdquo;</Text>
        </View>
      )}

      {/* Translation */}
      {translation && (
        <View className="mt-3 border-t border-gray-200 pt-3">
          <Text className="text-center text-sm text-gray-500">{translation}</Text>
        </View>
      )}

      {/* Custom Children */}
      {children && <View className="mt-4">{children}</View>}
    </View>
  );
};
