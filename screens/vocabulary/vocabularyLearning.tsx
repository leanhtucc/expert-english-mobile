import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { learningApi } from '@/api/endpoints/learning.api';
import { CustomText as Text } from '@/components/ui/CustomText';
import { useGenerateExercises } from '@/hooks/useGenerateExercises';
import { useLessonFlow } from '@/hooks/useLessonFlow';

// Import Screens
import { HintBottomSheet } from './components';
import { FillBlankScreen } from './fill-blank';
import { FlashcardScreen } from './flashcard/FlashcardScreen';
import { ImageQuizScreen } from './image-quiz';
import { MatchTermsScreen } from './match-terms';
import { MultipleChoiceScreen } from './multiple-choice';
import { RecordingScreen } from './recording';
import { LessonSummaryScreen } from './result';
import { SessonSummaryScreen } from './result/SessonSummaryScreen';

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

  // State quản lý tiến độ
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  // State quản lý lỗi sai cục bộ & Gợi ý
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHintSheet, setShowHintSheet] = useState(false);

  // Lưu trữ câu trả lời để nộp API
  const [userAnswers, setUserAnswers] = useState<UserAnswerItem[]>([]);
  const startTimeRef = useRef(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🌟 FIX: Thêm cờ để chống việc gọi API submit nhiều lần khi render lại
  const hasAutoSubmittedRef = useRef(false);

  // Hooks gọi API
  const { flashcards, refetch: refetchFlashcard, playAudio } = useLessonFlow(lessonId);
  const isPreparingQuiz = currentStep === 'PREPARING_QUIZ' || currentStep === 'DOING_QUIZ';

  const { exercises: rawQuizList, isLoading: isPreparingQuizLoading } = useGenerateExercises({
    lessonId,
    enabled: isPreparingQuiz,
  });

  const processedQuizList = useMemo(() => {
    if (!rawQuizList || rawQuizList.length === 0) return [];

    let sorted = [...rawQuizList].sort((a, b) => {
      const typeA = a.type || a.type_info?.code || '';
      const typeB = b.type || b.type_info?.code || '';
      const pA = TYPE_PRIORITY[typeA] || 99;
      const pB = TYPE_PRIORITY[typeB] || 99;
      return pA - pB;
    });

    return sorted.map(exercise => {
      const newEx = JSON.parse(JSON.stringify(exercise));
      if (newEx.type === 'multiple_choice' && newEx.questionData?.options) {
        newEx.questionData.options = shuffleArray(newEx.questionData.options);
      }
      return newEx;
    });
  }, [rawQuizList]);

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (isPreparingQuizLoading) {
      hasFetchedRef.current = true;
    }
  }, [isPreparingQuizLoading]);

  useEffect(() => {
    if (currentStep === 'PREPARING_QUIZ') {
      if (hasFetchedRef.current && !isPreparingQuizLoading) {
        if (processedQuizList.length > 0) {
          setCurrentStep('DOING_QUIZ');
          setCurrentQuizIndex(0);
          startTimeRef.current = Date.now();
        } else {
          Alert.alert('Thông báo', 'Hiện tại chưa có bài tập Quiz cho bài học này.');
          setCurrentStep('FLASHCARD_SUMMARY');
          hasFetchedRef.current = false;
        }
      }
    }
  }, [currentStep, isPreparingQuizLoading, processedQuizList.length]);

  const handleClose = () => navigation.canGoBack() && navigation.goBack();

  const handleAnswerSubmit = (
    scoreAchieved: number,
    answerData: { selection: string; correct: string; isCorrect: boolean }
  ) => {
    if (answerData.isCorrect) {
      setQuizScore(prev => prev + scoreAchieved);

      const newAnswer: UserAnswerItem = {
        exercise_id: processedQuizList[currentQuizIndex]._id,
        is_correct: answerData.isCorrect,
        score: scoreAchieved,
        userSelection: answerData.selection,
        correctContent: answerData.correct,
      };
      setUserAnswers(prev => [...prev, newAnswer]);

      setWrongAttempts(0);
      setShowHintSheet(false);

      if (currentQuizIndex < processedQuizList.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
      } else {
        setCurrentStep('FINAL_SUMMARY');
      }
    } else {
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
    }
  };

  // 🌟 SỬA ĐỔI: Hàm Submit ngầm không chứa handleClose() để tránh văng người dùng ra ngoài
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAutoSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      console.log('⏳ Đang tự động bắn dữ liệu kết quả lên Server ở background...');
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
      console.log('✅ Đã Auto Submit lưu kết quả thành công!');
    } catch (error) {
      console.error('🚨 Submit Error:', error);
      Alert.alert('Lỗi lưu kết quả', 'Có lỗi xảy ra khi đồng bộ kết quả của bạn với máy chủ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🌟 THÊM MỚI: Tự động chạy hàm Submit khi màn hình chuyển sang FINAL_SUMMARY
  useEffect(() => {
    if (currentStep === 'FINAL_SUMMARY' && !hasAutoSubmittedRef.current) {
      hasAutoSubmittedRef.current = true;
      handleAutoSubmit();
    }
  }, [currentStep, handleAutoSubmit]);

  // ==========================================
  // RENDER LOGIC
  // ==========================================

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
        primaryActionText="Start Quiz"
        onPrimaryAction={() => {
          hasFetchedRef.current = false;
          setCurrentStep('PREPARING_QUIZ');
        }}
        onRestart={async () => {
          await learningApi.resetLessonFlashcards({ lesson_id: lessonId });
          refetchFlashcard();
          setCurrentStep('FLASHCARD');
        }}
        onClose={handleClose}
      />
    );
  }

  if (currentStep === 'PREPARING_QUIZ') {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text className="mt-4 font-medium text-slate-500">Đang khởi tạo bài tập ôn tập...</Text>
      </View>
    );
  }

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
    const currentKey = `quiz-${currentQuizIndex}`;

    switch (currentQuiz.type) {
      case 'multiple_choice':
        QuizComponent = (
          <MultipleChoiceScreen
            questions={[currentQuiz.questionData]}
            key={currentKey}
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
            onOpenHint={() => setShowHintSheet(true)}
          />
        );
        break;
      case 'fill_in_blank':
        QuizComponent = (
          <FillBlankScreen
            questions={[currentQuiz.questionData]}
            key={currentKey}
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
            onOpenHint={() => setShowHintSheet(true)}
          />
        );
        break;
      case 'matching':
        QuizComponent = (
          <MatchTermsScreen
            pairs={currentQuiz.pairs}
            key={currentKey}
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
            onOpenHint={() => setShowHintSheet(true)}
          />
        );
        break;
      case 'image_quiz':
        QuizComponent = (
          <ImageQuizScreen
            questions={[currentQuiz.questionData]}
            key={currentKey}
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
          />
        );
        break;
      case 'speaking':
        QuizComponent = (
          <RecordingScreen
            key={currentKey}
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
        {QuizComponent}
        <HintBottomSheet
          isVisible={showHintSheet}
          onClose={() => setShowHintSheet(false)}
          vocabList={flashcards}
          onPlayAudio={playAudio}
        />
      </View>
    );
  }

  if (currentStep === 'FINAL_SUMMARY') {
    const isSpeakingDone = route.params?.isSpeakingDone || false;
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
        // 🌟 Điều khiển Ẩn/Hiện Radar bằng cờ này
        showRadarChart={isSpeakingDone}
        // 🌟 Đổi chữ trong Nút Action
        primaryActionText={isSpeakingDone ? 'Next lesson' : 'Start Speaking'}
        onPrimaryAction={() => {
          if (isSpeakingDone) {
            // Đã luyện xong cả Speaking -> Bấm Next Lesson thì đóng luồng học
            handleClose();
          } else {
            // Chưa luyện Speaking -> Điều hướng sang màn hình PracticeSetup
            (navigation as any).navigate('PracticeSetup', { lessonId });
          }
        }}
        onClose={handleClose}
      />
    );
  }
  return <ActivityIndicator size="large" color="#E11D48" className="flex-1 bg-white" />;
}
