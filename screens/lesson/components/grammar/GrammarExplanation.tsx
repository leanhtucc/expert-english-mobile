import { BookOpen, Info } from 'lucide-react-native';

import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface Example {
  sentence: string;
  translation?: string;
  highlight?: string; // part of sentence to highlight
}

interface GrammarExplanationProps {
  title: string;
  rule: string;
  formula?: string;
  examples: Example[];
  tip?: string;
}

export const GrammarExplanation: React.FC<GrammarExplanationProps> = ({
  title,
  rule,
  formula,
  examples,
  tip,
}) => {
  return (
    <View className="mx-5">
      {/* Header */}
      <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <View className="mb-3 flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
            <BookOpen size={20} color="#0D9488" />
          </View>
          <ThemedText className="flex-1 text-lg font-bold text-gray-900">{title}</ThemedText>
        </View>
        <ThemedText className="text-base leading-6 text-gray-700">{rule}</ThemedText>
      </View>

      {/* Formula */}
      {formula && (
        <View className="mb-4 rounded-2xl border border-teal-100 bg-teal-50 p-4">
          <ThemedText className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
            Formula
          </ThemedText>
          <ThemedText className="text-center font-mono text-lg text-teal-800">{formula}</ThemedText>
        </View>
      )}

      {/* Examples */}
      <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <ThemedText className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
          Examples
        </ThemedText>
        <View className="gap-4">
          {examples.map((example, idx) => (
            <View key={idx} className="border-l-4 border-teal-400 pl-4">
              <ThemedText className="text-base text-gray-900">{example.sentence}</ThemedText>
              {example.translation && (
                <ThemedText className="mt-1 text-sm italic text-gray-500">
                  {example.translation}
                </ThemedText>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Tip */}
      {tip && (
        <View className="flex-row rounded-xl border border-amber-100 bg-amber-50 p-4">
          <Info size={20} color="#D97706" />
          <View className="ml-3 flex-1">
            <ThemedText className="mb-1 text-sm font-medium text-amber-800">Pro Tip</ThemedText>
            <ThemedText className="text-sm text-amber-700">{tip}</ThemedText>
          </View>
        </View>
      )}
    </View>
  );
};
