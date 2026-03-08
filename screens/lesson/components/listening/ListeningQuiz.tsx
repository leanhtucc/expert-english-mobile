import { Check, X } from 'lucide-react-native';

import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface Option {
  id: string;
  text: string;
}

interface ListeningQuizProps {
  question: string;
  options: Option[];
  correctId: string;
  hint?: string;
  onAnswer?: (isCorrect: boolean, selectedId: string) => void;
}

export const ListeningQuiz: React.FC<ListeningQuizProps> = ({
  question,
  options,
  correctId,
  hint,
  onAnswer,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (id: string) => {
    if (answered) return;

    setSelectedId(id);
    setAnswered(true);

    const isCorrect = id === correctId;
    onAnswer?.(isCorrect, id);
  };

  const getOptionStyle = (id: string) => {
    if (!answered) {
      return 'border-gray-200 bg-white';
    }

    if (id === correctId) {
      return 'border-green-500 bg-green-50';
    }

    if (selectedId === id && id !== correctId) {
      return 'border-red-500 bg-red-50';
    }

    return 'border-gray-200 bg-white opacity-50';
  };

  return (
    <View className="mx-5 mt-4">
      {/* Question */}
      <View className="mb-4 rounded-xl bg-gray-50 p-4">
        <ThemedText className="text-center text-base font-medium text-gray-900">
          {question}
        </ThemedText>
        {hint && !answered && (
          <ThemedText className="mt-2 text-center text-sm italic text-gray-500">
            Hint: {hint}
          </ThemedText>
        )}
      </View>

      {/* Options */}
      <View className="gap-3">
        {options.map((option, idx) => (
          <TouchableOpacity
            key={option.id}
            activeOpacity={answered ? 1 : 0.7}
            onPress={() => handleSelect(option.id)}
            className={`flex-row items-center rounded-xl border-2 p-4 ${getOptionStyle(option.id)}`}
          >
            <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <ThemedText className="text-sm font-semibold text-gray-600">
                {String.fromCharCode(65 + idx)}
              </ThemedText>
            </View>
            <ThemedText className="flex-1 text-base text-gray-800">{option.text}</ThemedText>
            {answered && option.id === correctId && <Check size={20} color="#16A34A" />}
            {answered && selectedId === option.id && option.id !== correctId && (
              <X size={20} color="#DC2626" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
