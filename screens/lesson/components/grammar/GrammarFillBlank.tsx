import { Check, X } from 'lucide-react-native';

import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface GrammarFillBlankProps {
  sentence: string; // Use ___ for blank
  correctAnswer: string;
  alternatives?: string[]; // other accepted answers
  hint?: string;
  onAnswer?: (isCorrect: boolean, userAnswer: string) => void;
}

export const GrammarFillBlank: React.FC<GrammarFillBlankProps> = ({
  sentence,
  correctAnswer,
  alternatives = [],
  hint,
  onAnswer,
}) => {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const allCorrectAnswers = [
    correctAnswer.toLowerCase(),
    ...alternatives.map(a => a.toLowerCase()),
  ];

  const handleSubmit = () => {
    if (submitted || !answer.trim()) return;

    const correct = allCorrectAnswers.includes(answer.trim().toLowerCase());
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer?.(correct, answer.trim());
  };

  // Split sentence around blank
  const parts = sentence.split('___');
  const beforeBlank = parts[0] || '';
  const afterBlank = parts[1] || '';

  return (
    <View className="mx-5">
      {/* Sentence with blank */}
      <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <ThemedText className="mb-4 text-xs font-semibold uppercase tracking-wide text-teal-600">
          Fill in the Blank
        </ThemedText>
        <View className="flex-row flex-wrap items-center">
          <ThemedText className="text-lg text-gray-900">{beforeBlank}</ThemedText>
          <View
            className={`mx-1 min-w-[80px] border-b-2 ${
              submitted ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-teal-400'
            }`}
          >
            <TextInput
              value={answer}
              onChangeText={setAnswer}
              placeholder="..."
              placeholderTextColor="#9CA3AF"
              editable={!submitted}
              className={`py-1 text-center text-lg ${
                submitted ? (isCorrect ? 'text-green-600' : 'text-red-600') : 'text-gray-900'
              }`}
            />
          </View>
          <ThemedText className="text-lg text-gray-900">{afterBlank}</ThemedText>
        </View>

        {hint && !submitted && (
          <ThemedText className="mt-4 text-sm italic text-gray-500">Hint: {hint}</ThemedText>
        )}
      </View>

      {/* Submit button */}
      {!submitted && (
        <TouchableOpacity
          onPress={handleSubmit}
          className={`items-center rounded-xl py-4 ${
            answer.trim() ? 'bg-teal-600' : 'bg-gray-200'
          }`}
          activeOpacity={0.8}
          disabled={!answer.trim()}
        >
          <ThemedText
            className={`text-base font-semibold ${answer.trim() ? 'text-white' : 'text-gray-400'}`}
          >
            Check Answer
          </ThemedText>
        </TouchableOpacity>
      )}

      {/* Result */}
      {submitted && (
        <View
          className={`flex-row items-center rounded-xl p-4 ${
            isCorrect ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          {isCorrect ? <Check size={24} color="#16A34A" /> : <X size={24} color="#DC2626" />}
          <View className="ml-3 flex-1">
            <ThemedText
              className={`text-base font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}
            >
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </ThemedText>
            {!isCorrect && (
              <ThemedText className="mt-1 text-sm text-gray-600">
                Correct answer: <ThemedText className="font-semibold">{correctAnswer}</ThemedText>
              </ThemedText>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
