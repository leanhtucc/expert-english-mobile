import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface WritingPromptProps {
  title: string;
  instructions: string;
  placeholder?: string;
  minWords?: number;
  maxWords?: number;
  onTextChange?: (text: string) => void;
}

export const WritingPrompt: React.FC<WritingPromptProps> = ({
  title,
  instructions,
  placeholder = 'Start writing here...',
  minWords = 50,
  maxWords = 200,
  onTextChange,
}) => {
  const [text, setText] = useState('');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleChange = (value: string) => {
    setText(value);
    onTextChange?.(value);
  };

  const getWordCountColor = () => {
    if (wordCount < minWords) return 'text-amber-600';
    if (wordCount > maxWords) return 'text-red-600';
    return 'text-green-600';
  };

  return (
    <View className="mx-5">
      {/* Prompt card */}
      <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <ThemedText className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-600">
          Writing Task
        </ThemedText>
        <ThemedText className="mb-2 text-lg font-bold text-gray-900">{title}</ThemedText>
        <ThemedText className="text-base leading-6 text-gray-600">{instructions}</ThemedText>
      </View>

      {/* Writing area */}
      <View className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <TextInput
          value={text}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          className="min-h-[200px] p-4 text-base text-gray-900"
        />
        <View className="flex-row items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3">
          <ThemedText className="text-xs text-gray-500">
            {minWords}-{maxWords} words recommended
          </ThemedText>
          <ThemedText className={`text-sm font-semibold ${getWordCountColor()}`}>
            {wordCount} words
          </ThemedText>
        </View>
      </View>
    </View>
  );
};
