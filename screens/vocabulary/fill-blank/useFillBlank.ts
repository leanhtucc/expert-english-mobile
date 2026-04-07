import { useCallback, useState } from 'react';

// 1. CẬP NHẬT LẠI INTERFACE CHO KHỚP DATA API
export interface FillBlankQuestion {
  id?: string;
  beforeBlank: string; // Đã cắt sẵn từ [BLANK]
  afterBlank: string; // Đã cắt sẵn từ [BLANK]
  correctAnswer: string;
  options: string[];
  hint?: string;
}

interface UseFillBlankProps {
  questions: FillBlankQuestion[];
  onComplete?: (score: number) => void;
}

export const useFillBlank = ({ questions, onComplete }: UseFillBlankProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [eliminatedAnswers, setEliminatedAnswers] = useState<string[]>([]);
  const [, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentIndex];
  // Vì truyền từng câu vào nên questions.length thường là 1
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isAnswered || eliminatedAnswers.includes(answer)) return;
      setSelectedAnswer(answer);
    },
    [isAnswered, eliminatedAnswers]
  );

  const eliminateSelectedAnswer = useCallback(() => {
    if (!selectedAnswer || selectedAnswer === currentQuestion?.correctAnswer) return;

    setEliminatedAnswers(prev =>
      prev.includes(selectedAnswer) ? prev : [...prev, selectedAnswer]
    );
  }, [selectedAnswer, currentQuestion?.correctAnswer]);

  const handleNext = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setCorrectCount(prev => prev + 1);
      }
      return;
    }

    if (isLastQuestion) {
      // Tính điểm
      const score = selectedAnswer === currentQuestion.correctAnswer ? 100 : 0;
      onComplete?.(score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setEliminatedAnswers([]);
    }
  }, [isAnswered, isLastQuestion, selectedAnswer, currentQuestion?.correctAnswer, onComplete]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setEliminatedAnswers([]);
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
    eliminatedAnswers,
    isAnswered,
    isCorrect,
    isLastQuestion,
    // Trả thẳng dữ liệu cắt câu ra cho UI
    sentenceParts: {
      before: currentQuestion?.beforeBlank || '',
      after: currentQuestion?.afterBlank || '',
    },
    progress: {
      current: currentIndex + 1,
      total: questions.length,
    },
    handleSelectAnswer,
    eliminateSelectedAnswer,
    handleNext,
    reset,
    resetAnswer,
  };
};
