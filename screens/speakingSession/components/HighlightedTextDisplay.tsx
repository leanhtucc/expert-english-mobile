import React from 'react';
import { Text, View } from 'react-native';

import { HighlightedText } from '@/types/speaking.types';

interface HighlightedTextDisplayProps {
  segments: HighlightedText[];
  title?: string;
}

export const HighlightedTextDisplay: React.FC<HighlightedTextDisplayProps> = ({
  segments,
  title = 'Your Answer',
}) => {
  return (
    <View className="mb-4">
      {/* Title outside card, top right */}
      <View className="mb-2 flex-row justify-end">
        <Text className="text-sm font-semibold text-gray-700">{title}</Text>
      </View>

      {/* Card content */}
      <View className="rounded-xl border border-gray-200 bg-white p-4">
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            paddingTop: -10,
          }}
        >
          {segments.map((segment, index) => {
            // Correct word - render normally as part of sentence
            if (segment.isCorrect) {
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: 22,
                    fontWeight: '500',
                    color: '#1F2937',
                    marginHorizontal: 4,
                  }}
                >
                  {segment.text}
                </Text>
              );
            }

            // Incorrect word with correction
            // Corrected word appears in sentence, incorrect word floats above
            if (segment.correction) {
              return (
                <View key={index} style={{ marginHorizontal: 4, alignItems: 'center' }}>
                  {/* Incorrect word above - red strikethrough */}
                  <Text
                    style={{
                      color: '#DC2626',
                      textDecorationLine: 'line-through',
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    {segment.text}
                  </Text>
                  {/* Corrected word in sentence - green box */}
                  <Text
                    style={{
                      backgroundColor: '#D1FAE5',
                      color: '#059669',
                      fontWeight: '600',
                      fontSize: 18,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}
                  >
                    {segment.correction}
                  </Text>
                </View>
              );
            }

            // Incorrect word without correction
            return (
              <Text
                key={index}
                style={{
                  fontSize: 22,
                  fontWeight: '500',
                  color: '#DC2626',
                  textDecorationLine: 'line-through',
                  marginHorizontal: 4,
                }}
              >
                {segment.text}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};
