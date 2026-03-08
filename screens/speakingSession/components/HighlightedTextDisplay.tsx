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
    <View className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
      <Text className="mb-3 text-sm font-semibold text-gray-700">{title}</Text>
      <View className="flex-row flex-wrap">
        {segments.map((segment, index) => (
          <Text
            key={index}
            className={`text-base leading-7 ${
              segment.isCorrect ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {segment.text}
            {index < segments.length - 1 ? ' ' : ''}
          </Text>
        ))}
      </View>
    </View>
  );
};
