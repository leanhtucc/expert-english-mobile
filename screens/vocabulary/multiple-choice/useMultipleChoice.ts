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

  // 1. Chỉ cập nhật lựa chọn, KHÔNG khóa trạng thái
  const handleSelectAnswer = useCallback(
    (answer: string) => {
      // Nếu đã bấm Check Answer rồi thì không cho chọn lại nữa
      if (isAnswered) return;

      setSelectedAnswer(answer);
    },
    [isAnswered]
  );

  // 2. Tách nút bấm dưới đáy thành 2 giai đoạn:
  // Giai đoạn 1: Chốt đáp án (CHECK ANSWER)
  // Giai đoạn 2: Chuyển câu hỏi (NEXT QUESTION)
  const handleNext = useCallback(() => {
    // Nếu chưa chốt đáp án -> Bấm vào sẽ tính điểm và khóa UI lại để xem kết quả
    if (!isAnswered) {
      setIsAnswered(true);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setCorrectCount(prev => prev + 1);
      }
      return; // Dừng lại ở đây, không chuyển câu hỏi ngay
    }

    // Nếu ĐÃ chốt đáp án rồi -> Bấm vào để qua câu mới hoặc kết thúc
    if (isLastQuestion) {
      // Chú ý: correctCount lúc này đã được cộng điểm (nếu đúng) ở bước trên rồi
      const score = Math.round((correctCount / questions.length) * 100);
      onComplete?.(score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [
    isAnswered,
    isLastQuestion,
    correctCount,
    selectedAnswer,
    currentQuestion?.correctAnswer,
    questions.length,
    onComplete,
  ]);

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
