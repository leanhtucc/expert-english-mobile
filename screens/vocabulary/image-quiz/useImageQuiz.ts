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

  // 1. KHI BẤM CHỌN ĐÁP ÁN: Chỉ lưu vào selectedAnswer, KHÔNG khoá UI
  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isAnswered) return;
      setSelectedAnswer(answer);
    },
    [isAnswered]
  );

  // 2. KHI BẤM NÚT DƯỚI ĐÁY: Tách làm 2 giai đoạn
  const handleNext = useCallback(() => {
    // GIAI ĐOẠN 1: Chưa chốt đáp án -> Bấm Submit để chốt, tính điểm và hiện CheckResultButton
    if (!isAnswered) {
      setIsAnswered(true);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setCorrectAnswers(prev => [...prev, currentQuestion.id]);
      } else {
        setIncorrectAnswers(prev => [...prev, currentQuestion.id]);
      }
      return; // Dừng lại, không qua câu mới
    }

    // GIAI ĐOẠN 2: Đã chốt đáp án -> Bấm Next Question để qua câu mới hoặc kết thúc
    if (isLastQuestion) {
      const results: QuizResults = {
        totalQuestions: questions.length,
        correctAnswers: correctAnswers.length,
        incorrectAnswers: incorrectAnswers.length,
        score: Math.round((correctAnswers.length / questions.length) * 100),
      };
      onComplete?.(results);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [
    isAnswered,
    isLastQuestion,
    selectedAnswer,
    currentQuestion?.correctAnswer,
    currentQuestion?.id,
    questions.length,
    correctAnswers.length,
    incorrectAnswers.length,
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
