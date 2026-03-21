import React from 'react';
import { View } from 'react-native';

import { OptionButton } from '../components/OptionButton';

// Nhớ check lại đường dẫn này nhé

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
      {options.map((option, index) => {
        // Tự động gắn tiền tố A. B. C. D.
        const letter = String.fromCharCode(65 + index);
        const label = option.startsWith(`${letter}.`) ? option : `${letter}. ${option}`;

        return (
          <OptionButton
            key={index}
            label={label}
            isSelected={selectedAnswer === option}
            // Chỉ hiển thị đúng/sai khi người dùng ĐÃ BẤM SUBMIT (isAnswered = true)
            isCorrect={isAnswered ? option === correctAnswer : false}
            isWrong={isAnswered && selectedAnswer === option && option !== correctAnswer}
            onPress={() => onSelectAnswer(option)}
            disabled={isAnswered}
            className="mb-4" // Dùng mb-4 cho thoáng giống các màn khác
          />
        );
      })}
    </View>
  );
};
