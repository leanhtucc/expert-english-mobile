import React from 'react';
import { Text, View } from 'react-native';

import { IconNoteSuggesstion } from '@/components/icon';

interface HelpfulPhraseCardProps {
  phrase: string;
}

export const HelpfulPhraseCard: React.FC<HelpfulPhraseCardProps> = ({ phrase }) => {
  return (
    <View className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
      <View className="mb-2 flex-row items-center">
        <View className="mr-2 h-6 w-6 items-center justify-center">
          <IconNoteSuggesstion width={24} height={24} />
        </View>
        <Text className="text-sm font-semibold text-red-700">Helpful Phrase</Text>
      </View>
      <Text className="text-base leading-6 text-gray-800">{phrase}</Text>
    </View>
  );
};
