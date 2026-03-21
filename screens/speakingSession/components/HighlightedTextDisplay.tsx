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
      <View className="mb-2 flex-row justify-end">
        <Text className="text-sm font-semibold text-gray-700">{title}</Text>
      </View>

      {/* Card content */}
      <View className="rounded-xl border border-gray-200 bg-white p-4">
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            rowGap: 20,
          }}
        >
          {segments.map((segment, index) => {
            if (segment.isCorrect) {
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#1F2937',
                    marginHorizontal: 4,
                  }}
                >
                  {segment.text}
                </Text>
              );
            }

            if (segment.correction) {
              return (
                <View key={index} style={{ marginHorizontal: 4, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: '#DC2626',
                      textDecorationLine: 'line-through',
                      fontSize: 16,
                      fontWeight: '500',
                    }}
                  >
                    {segment.text}
                  </Text>

                  <Text
                    style={{
                      backgroundColor: '#D1FAE5',
                      color: '#059669',
                      fontWeight: '600',
                      fontSize: 14,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 6,
                      marginTop: 2,
                    }}
                  >
                    {segment.correction}
                  </Text>
                </View>
              );
            }

            return (
              <Text
                key={index}
                style={{
                  fontSize: 16,
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
