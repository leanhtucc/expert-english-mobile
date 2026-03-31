import React from 'react';
import { View } from 'react-native';

import { OptionButton } from '../components/OptionButton';

interface AnswerInputProps {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  isAnswered: boolean;
  onSelectAnswer: (answer: string) => void;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  options,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  onSelectAnswer,
}) => {
  return (
    <View className="mt-2 w-full">
      {options.map((option, index) => {
        // Tự động gắn tiền tố A, B, C, D vào nhãn
        const letter = String.fromCharCode(65 + index);
        const label = option.startsWith(`${letter}.`) ? option : `${letter}. ${option}`;

        return (
          <OptionButton
            key={`${option}-${index}`} // 🌟 Ép key mạnh hơn để tránh tái sử dụng UI cũ
            label={label}
            isSelected={selectedAnswer === option}
            isCorrect={option === correctAnswer}
            isAnswered={isAnswered}
            onPress={() => onSelectAnswer(option)}
          />
        );
      })}
    </View>
  );
};
