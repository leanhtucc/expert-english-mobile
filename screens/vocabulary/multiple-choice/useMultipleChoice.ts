import { useCallback, useState } from 'react';

export interface MultipleChoiceQuestion {
  id: string;
  word: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface UseMultipleChoiceProps {
  questions: MultipleChoiceQuestion[];
  onComplete?: (score: number) => void;
}

export const useMultipleChoice = ({ questions, onComplete }: UseMultipleChoiceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isAnswered) return;

      setSelectedAnswer(answer);
      setIsAnswered(true);

      if (answer === currentQuestion.correctAnswer) {
        setCorrectCount(prev => prev + 1);
      }
    },
    [isAnswered, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      const score = Math.round(((correctCount + (isCorrect ? 1 : 0)) / questions.length) * 100);
      onComplete?.(score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [isLastQuestion, correctCount, isCorrect, questions.length, onComplete]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
  }, []);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    selectedAnswer,
    isAnswered,
    isCorrect,
    isLastQuestion,
    progress: {
      current: currentIndex + 1,
      total: questions.length,
    },
    handleSelectAnswer,
    handleNext,
    reset,
  };
};
