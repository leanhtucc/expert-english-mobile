import { Volume2 } from 'lucide-react-native';

import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface VocabularyCardProps {
  word: string;
  pronunciation?: string;
  definition: string;
  example?: string;
  onPlayAudio?: () => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  pronunciation,
  definition,
  example,
  onPlayAudio,
}) => {
  const [showDefinition, setShowDefinition] = useState(false);

  return (
    <View className="mx-5 mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Word section */}
      <View className="border-b border-gray-50 p-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <ThemedText className="text-2xl font-bold text-gray-900">{word}</ThemedText>
            {pronunciation && (
              <ThemedText className="mt-1 text-sm text-gray-500">{pronunciation}</ThemedText>
            )}
          </View>
          {onPlayAudio && (
            <TouchableOpacity
              onPress={onPlayAudio}
              className="h-12 w-12 items-center justify-center rounded-full bg-blue-50"
            >
              <Volume2 size={24} color="#2563EB" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Definition section */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowDefinition(!showDefinition)}
        className="p-5"
      >
        {showDefinition ? (
          <>
            <ThemedText className="text-base leading-6 text-gray-700">{definition}</ThemedText>
            {example && (
              <View className="mt-4 rounded-xl bg-gray-50 p-3">
                <ThemedText className="text-sm italic text-gray-600">
                  &quot;{example}&quot;
                </ThemedText>
              </View>
            )}
          </>
        ) : (
          <View className="items-center py-4">
            <ThemedText className="text-sm font-medium text-blue-600">
              Tap to reveal definition
            </ThemedText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
