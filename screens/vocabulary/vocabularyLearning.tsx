import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { learningApi } from '@/api/endpoints/learning.api';
import { CustomText as Text } from '@/components/ui/CustomText';
import { useGenerateExercises } from '@/hooks/useGenerateExercises';
import { useLessonFlow } from '@/hooks/useLessonFlow';

// Import Screens
import { FillBlankScreen } from './fill-blank';
import { FlashcardScreen } from './flashcard/FlashcardScreen';
import { ImageQuizScreen } from './image-quiz';
import { MatchTermsScreen } from './match-terms';
import { MultipleChoiceScreen } from './multiple-choice';
import { LessonSummaryScreen } from './result';
import { SessonSummaryScreen } from './result/SessonSummaryScreen';

interface UserAnswerItem {
  exercise_id: string;
  is_correct: boolean;
  score: number;
  userSelection: string;
  correctContent: string;
}

type Step = 'FLASHCARD' | 'FLASHCARD_SUMMARY' | 'PREPARING_QUIZ' | 'DOING_QUIZ' | 'FINAL_SUMMARY';

export default function VocabularyLearning() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<any, any>>();
  const { lessonId, startMode = 'FLASHCARD' } = route.params || {};

  const [currentStep, setCurrentStep] = useState<Step>(startMode);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  // LUU TRỮ CÂU TRẢ LỜI
  const [userAnswers, setUserAnswers] = useState<UserAnswerItem[]>([]);
  const startTimeRef = useRef(Date.now()); // Tính thời gian làm bài
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái chống bấm nhiều lần

  const { flashcards, refetch: refetchFlashcard } = useLessonFlow(lessonId);
  const isPreparingQuiz = currentStep === 'PREPARING_QUIZ' || currentStep === 'DOING_QUIZ';
  const { exercises: quizList, isLoading: isPreparingQuizLoading } = useGenerateExercises({
    lessonId,
    enabled: isPreparingQuiz,
  });

  // Tự động chuyển luồng khi chuẩn bị Quiz xong
  useEffect(() => {
    if (currentStep === 'PREPARING_QUIZ' && quizList.length > 0 && !isPreparingQuizLoading) {
      setCurrentStep('DOING_QUIZ');
      setCurrentQuizIndex(0);
      startTimeRef.current = Date.now(); // Bắt đầu tính giờ làm Quiz
    }
  }, [quizList.length, currentStep, isPreparingQuizLoading]);

  const handleClose = () => navigation.canGoBack() && navigation.goBack();

  // XỬ LÝ KHI QUA CÂU MỚI
  const handleNextQuiz = (
    scoreAchieved: number,
    answerData?: { selection: string; correct: string; isCorrect: boolean }
  ) => {
    setQuizScore(prev => prev + scoreAchieved);

    // Build object answer để nộp API
    if (answerData) {
      const newAnswer: UserAnswerItem = {
        exercise_id: quizList[currentQuizIndex]._id,
        is_correct: answerData.isCorrect,
        score: scoreAchieved,
        userSelection: answerData.selection,
        correctContent: answerData.correct,
      };
      setUserAnswers(prev => [...prev, newAnswer]);
    }

    if (currentQuizIndex < quizList.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setCurrentStep('FINAL_SUMMARY');
    }
  };

  // HÀM NỘP BÀI (GỌI API)
  const handleFinalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      console.log('⏳ Đang bắn dữ liệu lên Server...');
      const totalTime = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
      // Chia đều thời gian cho mỗi câu (vì API bắt gửi từng exercise 1)
      const timePerQuestion = Math.max(1, Math.floor(totalTime / (userAnswers.length || 1)));

      const submitPromises = userAnswers.map(ans => {
        return learningApi.submitLesson({
          exercise_id: ans.exercise_id,
          lesson_id: lessonId,
          is_correct: ans.is_correct,
          score: ans.score,
          time_spent_seconds: timePerQuestion,
          answers: {
            user_input: ans.userSelection,
            system_answer: ans.correctContent,
          },
        });
      });

      await Promise.all(submitPromises);
      console.log('✅ Đã submit thành công!');
      handleClose();
    } catch (error) {
      console.error('🚨 Submit Error:', error);
      Alert.alert('Lỗi', 'Không thể lưu kết quả. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER LOGIC ---
  if (currentStep === 'FLASHCARD') {
    return (
      <FlashcardScreen
        flashcards={flashcards as any}
        onComplete={() => setCurrentStep('FLASHCARD_SUMMARY')}
        onClose={handleClose}
        onBack={handleClose}
      />
    );
  }

  if (currentStep === 'FLASHCARD_SUMMARY') {
    return (
      <SessonSummaryScreen
        data={{ totalWords: flashcards.length, accuracy: 100, timeSpent: '02:30' }}
        onPrimaryAction={() => setCurrentStep('PREPARING_QUIZ')}
        onRestart={async () => {
          await learningApi.resetLessonFlashcards({ lesson_id: lessonId });
          refetchFlashcard();
          setCurrentStep('FLASHCARD');
        }}
        onClose={handleClose}
      />
    );
  }

  if (currentStep === 'DOING_QUIZ' && quizList.length > 0) {
    const currentQuiz = quizList[currentQuizIndex];
    const progressData = { current: currentQuizIndex + 1, total: quizList.length };

    // Logic lấy đáp án đúng gốc
    const getCorrectAnswer = () => {
      if (currentQuiz.type === 'multiple_choice') return currentQuiz.questionData.correctAnswer;
      if (currentQuiz.type === 'fill_in_blank') return currentQuiz.questionData.correctAnswer; // Lấy theo định dạng lúc nãy đã parse
      return 'matched_success';
    };

    switch (currentQuiz.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceScreen
            questions={[currentQuiz.questionData]}
            onComplete={score =>
              handleNextQuiz(score, {
                selection: 'user_answered',
                correct: getCorrectAnswer(),
                isCorrect: score > 0,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
          />
        );

      case 'fill_in_blank':
        return (
          <FillBlankScreen
            questions={[currentQuiz.questionData]}
            onComplete={score =>
              handleNextQuiz(score, {
                selection: 'user_answered',
                correct: getCorrectAnswer(),
                isCorrect: score > 0,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
          />
        );

      case 'matching':
        return (
          <MatchTermsScreen
            pairs={currentQuiz.pairs}
            onComplete={score =>
              handleNextQuiz(score, {
                selection: 'matched_all',
                correct: 'matched_all',
                isCorrect: score === 100,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
          />
        );

      case 'image_quiz':
        return (
          <ImageQuizScreen
            questions={[currentQuiz.questionData]} // Tuỳ bạn thiết lập ImageQuiz
            onComplete={score =>
              handleNextQuiz(score, {
                selection: 'user_answered',
                correct: 'image_answer',
                isCorrect: score > 0,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
          />
        );

      default:
        return (
          <View className="flex-1 items-center justify-center bg-white">
            <Text>Dạng bài chưa hỗ trợ</Text>
          </View>
        );
    }
  }

  if (currentStep === 'FINAL_SUMMARY') {
    // Độ chính xác = Tổng điểm đạt được / Điểm tối đa có thể đạt (Giả sử mỗi câu 100 điểm)
    const accuracy =
      quizList.length > 0 ? Math.round((quizScore / (quizList.length * 100)) * 100) : 0;

    // Tính toán thời gian hiển thị (Dạng MM:SS)
    const totalSeconds = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');

    return (
      <LessonSummaryScreen
        data={{
          totalWords: quizList.length,
          accuracy: accuracy,
          timeSpent: `${mins}:${secs}`,
        }}
        onPrimaryAction={handleFinalSubmit} // <--- GỌI API KHI BẤM NÚT NÀY
        onClose={handleClose}
      />
    );
  }

  return <ActivityIndicator size="large" color="#E11D48" className="flex-1 bg-white" />;
}
