import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { FlashcardItem } from './useFlashcard';

interface FlashcardCardProps {
  card: FlashcardItem;
  isFlipped: boolean;
  onFlip: () => void;
  onPlayAudio?: () => void;
}

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  isFlipped,
  onFlip,
  onPlayAudio,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onFlip} className="w-full">
      <View className="min-h-[300px] justify-center rounded-2xl bg-white p-6 shadow-sm">
        {!isFlipped ? (
          // Front: Word
          <View className="items-center">
            <Text className="mb-3 text-center text-4xl font-bold text-gray-800">{card.word}</Text>

            {card.phonetic && (
              <Text className="mb-4 text-center text-lg text-gray-500">{card.phonetic}</Text>
            )}

            {onPlayAudio && (
              <TouchableOpacity onPress={onPlayAudio} className="mt-4 rounded-full bg-red-600 p-4">
                <Text className="text-2xl text-white">🔊</Text>
              </TouchableOpacity>
            )}

            <Text className="mt-8 text-sm text-gray-400">Tap to see definition</Text>
          </View>
        ) : (
          // Back: Definition & Example
          <View>
            <View className="mb-4">
              <Text className="mb-2 text-sm font-semibold text-red-600">Definition:</Text>
              <Text className="text-base leading-6 text-gray-700">{card.definition}</Text>
            </View>

            {card.example && (
              <View className="mb-4">
                <Text className="mb-2 text-sm font-semibold text-red-600">Example:</Text>
                <Text className="text-base italic leading-6 text-gray-600">
                  &ldquo;{card.example}&rdquo;
                </Text>
              </View>
            )}

            {card.translation && (
              <View className="mt-4 border-t border-gray-200 pt-4">
                <Text className="text-center text-sm text-gray-500">{card.translation}</Text>
              </View>
            )}

            <Text className="mt-6 text-center text-sm text-gray-400">Tap to flip back</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
