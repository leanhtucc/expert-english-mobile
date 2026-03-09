import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { mockMatchPairs } from '../__mocks__';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { DropZone } from '../match-terms/DropZone';
import { TermItem } from '../match-terms/TermItem';

/**
 * Demo screen for testing Match Terms UI with mock data
 * Shows all states: unmatched, selected, paired, incorrect
 */
export const DemoMatchTermsScreen: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [mistakes, setMistakes] = useState(0);

  const terms = mockMatchPairs.map(p => ({ id: p.id, text: p.term }));
  const definitions = mockMatchPairs.map(p => ({ id: p.id, text: p.definition }));

  const handleTermPress = (termId: string) => {
    if (selectedTerm === termId) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(termId);
      // Find the correct definition and auto-match for demo purposes
      const pair = mockMatchPairs.find(p => p.id === termId);
      if (pair) {
        setTimeout(() => {
          setMatches({ ...matches, [termId]: pair.id });
          setSelectedTerm(null);
        }, 500);
      }
    }
  };

  const handleReset = () => {
    setMatches({});
    setMistakes(0);
    setSelectedTerm(null);
  };

  const isComplete = Object.keys(matches).length === mockMatchPairs.length;
  const matchedCount = Object.keys(matches).length;

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScreenHeader title="Match Terms Demo" onBack={() => console.log('Back')} />

      <View className="px-4 pt-6 pb-4">
        <ProgressBar current={matchedCount} total={mockMatchPairs.length} />
        <View className="mt-2 flex-row justify-between">
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Matched: {matchedCount} / {mockMatchPairs.length}
          </Text>
          <Text className="text-sm text-red-600 dark:text-red-400">Mistakes: {mistakes}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="mb-3 text-base font-semibold text-gray-700 dark:text-gray-300">
          Terms:
        </Text>
        <View className="mb-6 space-y-2">
          {terms.map(term => {
            const isMatched = !!matches[term.id];
            return (
              <TermItem
                key={term.id}
                id={term.id}
                text={term.text}
                isSelected={selectedTerm === term.id}
                isMatched={isMatched}
                onPress={() => !isMatched && handleTermPress(term.id)}
                type="term"
              />
            );
          })}
        </View>

        <Text className="mb-3 text-base font-semibold text-gray-700 dark:text-gray-300">
          Definitions:
        </Text>
        <View className="mb-6 space-y-2">
          {definitions.map(def => {
            const isMatched = Object.values(matches).includes(def.id);
            const matchedTerm = terms.find(t => matches[t.id] === def.id);
            return (
              <DropZone key={def.id} label={def.text} isEmpty={!isMatched}>
                {isMatched && matchedTerm && (
                  <View className="rounded-lg bg-green-50 p-4">
                    <Text className="font-semibold text-green-700">{matchedTerm.text}</Text>
                  </View>
                )}
              </DropZone>
            );
          })}
        </View>

        {isComplete && (
          <View className="mb-6 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <Text className="text-center text-lg font-bold text-green-700 dark:text-green-300">
              🎉 All paired correctly!
            </Text>
            <Text className="mt-2 text-center text-sm text-green-600 dark:text-green-400">
              Total mistakes: {mistakes}
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="px-6 py-6">
        <PrimaryButton
          label={isComplete ? 'Continue' : 'Reset'}
          onPress={isComplete ? () => console.log('Continue') : handleReset}
        />
      </View>

      {/* Debug Controls */}
      <View className="bg-gray-100 px-6 pb-6 dark:bg-gray-800">
        <Text className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
          Debug: Selected Term = {selectedTerm || 'None'}
        </Text>
      </View>
    </View>
  );
};
