import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { learningApi } from '@/api/endpoints/learning.api';
import { CustomText as Text } from '@/components/ui/CustomText';
import { useGenerateExercises } from '@/hooks/useGenerateExercises';
import { useLessonFlow } from '@/hooks/useLessonFlow';

import { HintBottomSheet } from './components';
import { FillBlankScreen } from './fill-blank';
import { FlashcardScreen } from './flashcard/FlashcardScreen';
import { ImageQuizScreen } from './image-quiz';
import { MatchTermsScreen } from './match-terms';
import { MultipleChoiceScreen } from './multiple-choice';
import { RecordingScreen } from './recording';
import { LessonSummaryScreen } from './result';
import { SessonSummaryScreen } from './result/SessonSummaryScreen';

// 🌟 Import Bottom Sheet Gợi Ý

// ==========================================
// HELPER: SẮP XẾP VÀ ĐẢO ĐÁP ÁN
// ==========================================
const TYPE_PRIORITY: Record<string, number> = {
  multiple_choice: 1, // Pronunciation / MCQ
  pronunciation: 1,
  matching: 2,
  fill_in_blank: 3,
  speaking: 4,
  speaking_lv1: 4,
};

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...(array || [])];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// ==========================================
// TYPES
// ==========================================
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

  // State quản lý danh sách Quiz
  const [processedQuizList, setProcessedQuizList] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  // State quản lý lỗi sai cục bộ & Gợi ý
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHintSheet, setShowHintSheet] = useState(false);

  // Lưu trữ câu trả lời để nộp API
  const [userAnswers, setUserAnswers] = useState<UserAnswerItem[]>([]);
  const startTimeRef = useRef(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks gọi API
  const { flashcards, refetch: refetchFlashcard, playAudio } = useLessonFlow(lessonId);
  const isPreparingQuiz = currentStep === 'PREPARING_QUIZ' || currentStep === 'DOING_QUIZ';

  const { exercises: rawQuizList, isLoading: isPreparingQuizLoading } = useGenerateExercises({
    lessonId,
    enabled: isPreparingQuiz,
  });

  // 1. XỬ LÝ DATA (SORT & SHUFFLE) KHI LẤY ĐƯỢC CÂU HỎI
  useEffect(() => {
    if (rawQuizList && rawQuizList.length > 0) {
      let sorted = [...rawQuizList].sort((a, b) => {
        const typeA = a.type || a.type_info?.code || '';
        const typeB = b.type || b.type_info?.code || '';
        const pA = TYPE_PRIORITY[typeA] || 99;
        const pB = TYPE_PRIORITY[typeB] || 99;
        return pA - pB;
      });

      sorted = sorted.map(exercise => {
        const newEx = JSON.parse(JSON.stringify(exercise));
        if (newEx.type === 'multiple_choice' && newEx.questionData?.options) {
          newEx.questionData.options = shuffleArray(newEx.questionData.options);
        }
        return newEx;
      });

      setProcessedQuizList(sorted);
    }
  }, [rawQuizList]);

  // 2. CHUYỂN TỪ LOADING SANG BẮT ĐẦU LÀM BÀI
  useEffect(() => {
    if (currentStep === 'PREPARING_QUIZ' && !isPreparingQuizLoading) {
      if (processedQuizList.length > 0) {
        setCurrentStep('DOING_QUIZ');
        setCurrentQuizIndex(0);
        startTimeRef.current = Date.now();
      } else {
        Alert.alert('Thông báo', 'Hiện tại chưa có bài tập Quiz cho bài học này.');
        setCurrentStep('FLASHCARD_SUMMARY');
      }
    }
  }, [processedQuizList.length, currentStep, isPreparingQuizLoading]);

  const handleClose = () => navigation.canGoBack() && navigation.goBack();

  // 3. XỬ LÝ KHI NGƯỜI DÙNG CHỌN ĐÁP ÁN
  const handleAnswerSubmit = (
    scoreAchieved: number,
    answerData: { selection: string; correct: string; isCorrect: boolean }
  ) => {
    if (answerData.isCorrect) {
      // TRẢ LỜI ĐÚNG: Tính điểm, lưu đáp án, chuyển câu
      setQuizScore(prev => prev + scoreAchieved);

      const newAnswer: UserAnswerItem = {
        exercise_id: processedQuizList[currentQuizIndex]._id,
        is_correct: answerData.isCorrect,
        score: scoreAchieved,
        userSelection: answerData.selection,
        correctContent: answerData.correct,
      };
      setUserAnswers(prev => [...prev, newAnswer]);

      // Reset lỗi & ẩn Hint
      setWrongAttempts(0);
      setShowHintSheet(false);

      if (currentQuizIndex < processedQuizList.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
      } else {
        setCurrentStep('FINAL_SUMMARY');
      }
    } else {
      // TRẢ LỜI SAI: Tăng lỗi. Màn hình con sẽ tự biết khi nào hiện nút Gợi ý dựa trên local state.
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
    }
  };

  // 4. HÀM NỘP BÀI CUỐI CÙNG
  const handleFinalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      console.log('⏳ Đang bắn dữ liệu lên Server...');
      const totalTime = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
      const timePerQuestion = Math.max(1, Math.floor(totalTime / (userAnswers.length || 1)));

      const submitPromises = userAnswers.map(ans => {
        return learningApi.submitLesson({
          exercise_id: ans.exercise_id,
          lesson_id: lessonId,
          is_correct: ans.is_correct,
          score: ans.score,
          time_spent_seconds: timePerQuestion,
          answers: { user_input: ans.userSelection, system_answer: ans.correctContent },
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

  // ==========================================
  // RENDER LOGIC
  // ==========================================

  // BƯỚC 1: HỌC FLASHCARD
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

  // BƯỚC 2: TỔNG KẾT FLASHCARD -> BẤM START QUIZ
  if (currentStep === 'FLASHCARD_SUMMARY') {
    return (
      <SessonSummaryScreen
        data={{ totalWords: flashcards.length, accuracy: 100, timeSpent: '02:30' }}
        primaryActionText="Start Quiz"
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

  // BƯỚC 3: ĐANG LÀM BÀI QUIZ
  if (currentStep === 'DOING_QUIZ' && processedQuizList.length > 0) {
    const currentQuiz = processedQuizList[currentQuizIndex];
    const progressData = { current: currentQuizIndex + 1, total: processedQuizList.length };

    const getCorrectAnswer = () => {
      if (currentQuiz.type === 'multiple_choice') return currentQuiz.questionData.correctAnswer;
      if (currentQuiz.type === 'fill_in_blank') return currentQuiz.questionData.correctAnswer;
      if (currentQuiz.type === 'speaking') return currentQuiz.questionData.text;
      return 'matched_success';
    };

    let QuizComponent = null;

    switch (currentQuiz.type) {
      case 'multiple_choice':
        QuizComponent = (
          <MultipleChoiceScreen
            questions={[currentQuiz.questionData]}
            onComplete={score =>
              handleAnswerSubmit(score, {
                selection: 'user_answered',
                correct: getCorrectAnswer(),
                isCorrect: score > 0,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
            onOpenHint={() => setShowHintSheet(true)} // 🌟 Truyền hàm mở Gợi ý
          />
        );
        break;
      case 'fill_in_blank':
        QuizComponent = (
          <FillBlankScreen
            questions={[currentQuiz.questionData]}
            onComplete={score =>
              handleAnswerSubmit(score, {
                selection: 'user_answered',
                correct: getCorrectAnswer(),
                isCorrect: score > 0,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
            // onOpenHint có thể thêm vào FillBlankScreen nếu bạn muốn
          />
        );
        break;
      case 'matching':
        QuizComponent = (
          <MatchTermsScreen
            pairs={currentQuiz.pairs}
            onComplete={score =>
              handleAnswerSubmit(score, {
                selection: 'matched_all',
                correct: 'matched_all',
                isCorrect: score === 100,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
            // onOpenHint có thể thêm vào MatchTermsScreen nếu bạn muốn
          />
        );
        break;
      case 'image_quiz':
        QuizComponent = (
          <ImageQuizScreen
            questions={[currentQuiz.questionData]}
            onComplete={score =>
              handleAnswerSubmit(score, {
                selection: 'user_answered',
                correct: 'image_answer',
                isCorrect: score > 0,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
            // onOpenHint có thể thêm vào ImageQuizScreen nếu bạn muốn
          />
        );
        break;
      case 'speaking':
        QuizComponent = (
          <RecordingScreen
            questions={[currentQuiz.questionData]}
            onComplete={() =>
              handleAnswerSubmit(100, {
                selection: 'user_recorded_audio',
                correct: getCorrectAnswer(),
                isCorrect: true,
              })
            }
            progress={progressData}
            onClose={handleClose}
            onBack={handleClose}
          />
        );
        break;
      default:
        QuizComponent = (
          <View className="flex-1 items-center justify-center bg-white">
            <Text>Dạng bài chưa hỗ trợ: {currentQuiz.type}</Text>
          </View>
        );
    }

    return (
      <View className="relative flex-1">
        {/* Render Form bài Quiz */}
        {QuizComponent}

        {/* 🌟 BOTTOM SHEET GỢI Ý TỪ VỰNG */}
        <HintBottomSheet
          isVisible={showHintSheet}
          onClose={() => setShowHintSheet(false)}
          vocabList={flashcards} // Truyền dữ liệu flashcards lấy từ useLessonFlow
          onPlayAudio={playAudio} // Sử dụng hàm playAudio từ hook useLessonFlow
        />
      </View>
    );
  }

  // BƯỚC 4: TỔNG KẾT VÀ BẮN API
  if (currentStep === 'FINAL_SUMMARY') {
    const accuracy =
      processedQuizList.length > 0
        ? Math.round((quizScore / (processedQuizList.length * 100)) * 100)
        : 0;
    const totalSeconds = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');

    return (
      <LessonSummaryScreen
        data={{ totalWords: processedQuizList.length, accuracy, timeSpent: `${mins}:${secs}` }}
        onPrimaryAction={handleFinalSubmit}
        onClose={handleClose}
      />
    );
  }

  // LOADING SCREEN (Chờ fetch Quiz)
  return <ActivityIndicator size="large" color="#E11D48" className="flex-1 bg-white" />;
}
