import React from 'react';
import { Text, View } from 'react-native';

import { IconLearningTip } from '@/components/icon';

interface HelpfulPhraseCardProps {
  phrase: string;
}

export const HelpfulPhraseCard: React.FC<HelpfulPhraseCardProps> = ({ phrase }) => {
  return (
    <View className="mb-4 rounded-full border border-red-200 bg-red-50 p-4">
      <View className="flex-row items-start gap-3">
        <View className="h-6 w-6 items-center justify-center">
          <IconLearningTip width={24} height={24} />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-sm font-semibold text-red-700">Helpful Phrase</Text>
          <Text className="text-base leading-6 text-gray-800">{phrase}</Text>
        </View>
      </View>
    </View>
  );
};
