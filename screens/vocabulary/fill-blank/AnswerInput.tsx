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
    <View className="w-full">
      {options.map((option, index) => (
        <OptionButton
          key={index}
          label={option}
          isSelected={selectedAnswer === option}
          isCorrect={isAnswered ? option === correctAnswer : undefined}
          isWrong={isAnswered && selectedAnswer === option && option !== correctAnswer}
          onPress={() => onSelectAnswer(option)}
          disabled={isAnswered}
          className="mb-3"
        />
      ))}
    </View>
  );
};
