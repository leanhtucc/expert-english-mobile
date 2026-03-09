import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

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
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <ScreenHeader
        title="Match the Terms"
        subtitle="Connect terms with definitions"
        onBack={onBack}
        onClose={onClose}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress */}
        <ProgressBar current={progress.current} total={progress.total} className="mb-6" />

        {/* Instructions */}
        <View className="mb-6 rounded-2xl bg-blue-50 p-4">
          <Text className="text-center text-sm text-blue-800">
            💡 Tap a term, then tap its matching definition
          </Text>
        </View>

        {/* Two Column Layout */}
        <View className="flex-row">
          {/* Terms Column */}
          <View className="flex-1 pr-2">
            <Text className="mb-3 text-sm font-bold text-gray-700">TERMS</Text>
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
            <Text className="mb-3 text-sm font-bold text-gray-700">DEFINITIONS</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};
