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

  // 1. KHI BẤM CHỌN ĐÁP ÁN: Chỉ lưu vào selectedAnswer, KHÔNG khoá UI nếu chưa Submit
  const handleSelectAnswer = useCallback(
    (answer: string) => {
      // Nếu đã chốt đáp án (đang hiện modal đúng hoặc đang trong 1.5s chờ reset sai) thì không cho chọn
      if (isAnswered) return;
      setSelectedAnswer(answer);
    },
    [isAnswered]
  );

  // 2. KHI BẤM NÚT DƯỚI ĐÁY HOẶC NEXT
  const handleNext = useCallback(() => {
    // GIAI ĐOẠN 1: Bấm Submit Answer
    if (!isAnswered) {
      setIsAnswered(true); // Bắt đầu lock UI để hiện kết quả (đúng hoặc sai)

      if (selectedAnswer === currentQuestion.correctAnswer) {
        setCorrectAnswers(prev => [...prev, currentQuestion.id]);
      } else {
        setIncorrectAnswers(prev => [...prev, currentQuestion.id]);
        // LƯU Ý: Không tự qua câu tiếp theo ở đây, ImageQuizScreen sẽ dùng useEffect để gọi resetAnswer sau 1.5s
      }
      return;
    }

    // GIAI ĐOẠN 2: Bấm nút "Next Question" trên Modal Đúng
    // Chỉ chạy vào đây khi user ĐÃ TRẢ LỜI ĐÚNG và bấm nút Next
    if (isAnswered && isCorrect) {
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
    }
  }, [
    isAnswered,
    isCorrect,
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

  // Gọi hàm này sau 1.5s khi trả lời sai để mở lại UI
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
