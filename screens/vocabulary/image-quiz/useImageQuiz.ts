import { useCallback, useState } from 'react';

export interface ImageQuizQuestion {
  id: string;
  imageUrl: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

interface UseImageQuizProps {
  questions: ImageQuizQuestion[];
  onComplete?: (results: QuizResults) => void;
}

export interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
}

export const useImageQuiz = ({ questions, onComplete }: UseImageQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isAnswered) return;

      setSelectedAnswer(answer);
      setIsAnswered(true);

      if (answer === currentQuestion.correctAnswer) {
        setCorrectAnswers(prev => [...prev, currentQuestion.id]);
      } else {
        setIncorrectAnswers(prev => [...prev, currentQuestion.id]);
      }
    },
    [isAnswered, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      const results: QuizResults = {
        totalQuestions: questions.length,
        correctAnswers: correctAnswers.length + (isCorrect ? 1 : 0),
        incorrectAnswers: incorrectAnswers.length + (isCorrect ? 0 : 1),
        score: Math.round(((correctAnswers.length + (isCorrect ? 1 : 0)) / questions.length) * 100),
      };
      onComplete?.(results);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [
    isLastQuestion,
    questions.length,
    correctAnswers.length,
    incorrectAnswers.length,
    isCorrect,
    onComplete,
  ]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
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
