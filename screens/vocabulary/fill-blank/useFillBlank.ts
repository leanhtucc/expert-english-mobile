import { useCallback, useState } from 'react';

export interface FillBlankQuestion {
  id: string;
  sentence: string;
  blankIndex: number;
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
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const getSentenceParts = useCallback(() => {
    if (!currentQuestion) return { before: '', after: '' };

    const words = currentQuestion.sentence.split(' ');
    const before = words.slice(0, currentQuestion.blankIndex).join(' ');
    const after = words.slice(currentQuestion.blankIndex + 1).join(' ');

    return { before, after };
  }, [currentQuestion]);

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
      const score = Math.round((correctCount / questions.length) * 100);
      onComplete?.(score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [isLastQuestion, correctCount, questions.length, onComplete]);

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
    sentenceParts: getSentenceParts(),
    progress: {
      current: currentIndex + 1,
      total: questions.length,
    },
    handleSelectAnswer,
    handleNext,
    reset,
  };
};
