import React, { useMemo } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { TermItem } from './TermItem';
import { MatchPair, useMatchTerms } from './useMatchTerms';

interface MatchTermsScreenProps {
  pairs: MatchPair[];
  onComplete?: (accuracy: number) => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const MatchTermsScreen: React.FC<MatchTermsScreenProps> = ({
  pairs,
  onComplete,
  onBack,
  onClose,
}) => {
  const {
    selectedTerm,
    selectedDefinition,
    matchedPairs,
    progress,
    handleSelectTerm,
    handleSelectDefinition,
  } = useMatchTerms({
    pairs,
    onComplete,
  });

  // Shuffle definitions for display
  const shuffledDefinitions = useMemo(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [pairs]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <ScreenHeader
        title="Vocabulary Quiz"
        subtitle="LEVEL: PROFESSIONAL AI"
        rightAction={<Text className="text-base font-semibold text-pink-500">Skip</Text>}
        onBack={onBack}
        onClose={onClose}
      />

      {/* Progress Bar and Progress Text */}
      <View className="px-6 pt-4 pb-2">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-xs font-medium text-gray-500">Matching Progress</Text>
          <Text className="text-xs font-bold text-pink-500">
            {progress.current} / {progress.total}
          </Text>
        </View>
        <ProgressBar current={progress.current} total={progress.total} className="mb-0" />
      </View>

      {/* Title and Subtitle */}
      <View className="px-6 pt-2 pb-2">
        <Text className="mb-1 text-xl font-bold text-gray-900">Connect the Terms</Text>
        <Text className="text-sm text-gray-500">
          Match the English AI terminology to its meaning.
        </Text>
      </View>

      {/* Two Column Layout */}
      <View className="flex-1 px-6 pb-24">
        <View className="flex-row">
          {/* Terms Column */}
          <View className="flex-1 pr-2">
            {/* No section title for clean look */}
            {pairs.map(pair => (
              <TermItem
                key={pair.id}
                id={pair.id}
                text={pair.term}
                isSelected={selectedTerm === pair.id}
                isMatched={matchedPairs.includes(pair.id)}
                onPress={() => handleSelectTerm(pair.id)}
                type="term"
              />
            ))}
          </View>

          {/* Definitions Column */}
          <View className="flex-1 pl-2">
            {/* No section title for clean look */}
            {shuffledDefinitions.map(pair => (
              <TermItem
                key={pair.id}
                id={pair.id}
                text={pair.definition}
                isSelected={selectedDefinition === pair.id}
                isMatched={matchedPairs.includes(pair.id)}
                onPress={() => handleSelectDefinition(pair.id)}
                type="definition"
              />
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Action Buttons hidden as requested */}
    </SafeAreaView>
  );
};
