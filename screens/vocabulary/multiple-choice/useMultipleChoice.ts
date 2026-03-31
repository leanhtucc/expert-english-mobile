import { useCallback, useState } from 'react';

// CẬP NHẬT INTERFACE KHỚP VỚI DATA TỪ API
export interface MultipleChoiceQuestion {
  id?: string;
  word?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  phonetic?: string;
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
  const [, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentIndex];
  // Vì VocabularyLearning truyền vào mảng 1 phần tử, nên isLastQuestion luôn True (đúng ý đồ luồng)
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isAnswered) return;
      setSelectedAnswer(answer);
    },
    [isAnswered]
  );

  const handleNext = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setCorrectCount(prev => prev + 1);
      }
      return;
    }

    if (isLastQuestion) {
      // Tính điểm (Đúng = 100, Sai = 0 vì mảng có 1 câu)
      const score = selectedAnswer === currentQuestion.correctAnswer ? 100 : 0;
      onComplete?.(score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [isAnswered, isLastQuestion, selectedAnswer, currentQuestion?.correctAnswer, onComplete]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
  }, []);
  const resetAnswer = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
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
    resetAnswer,
  };
};
