import Feather from '@expo/vector-icons/Feather';

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconBackButton, IconMicrophone, IconRepeat } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useGenerateSpeakingForLesson } from '@/hooks/useGenerateSpeakingForLesson';
import { useRoadmapData } from '@/hooks/useRoadmapData';
import { useSpeakingPronunciationRecorder } from '@/hooks/useSpeakingPronunciationRecorder';
import { useSubmitSpeakingPronunciation } from '@/hooks/useSubmitSpeakingPronunciation';
import { RootStackParamList } from '@/navigation';
import { useAuthStore } from '@/stores/auth.store';
import {
  parseExercisesByLessonResponse,
  speakingExerciseToScenarioPreview,
} from '@/types/api/speakingExercise.response';
import type { PronunciationFeedback } from '@/types/api/submitPronunciation.response';
import { ScenarioPreview } from '@/types/speaking.types';
import { getTodayLessonIdFromRoadmap } from '@/utils/roadmapTodayLesson';

import { ProgressBar } from '../vocabulary/components';
import { LessonSummaryScreen } from '../vocabulary/result';
import { ChatBubbleAI } from './components/ChatBubbleAI';
import { PronunciationFeedbackCard } from './components/PronunciationFeedbackCard';
import { ScenarioCard } from './components/ScenarioCard';
import { WaveformAnimation } from './components/WaveformAnimation';

type PracticeSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PracticeSetup'>;

export const PracticeSetupScreen: React.FC = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const { data: roadmapData, loading: roadmapLoading } = useRoadmapData(accessToken || '');
  const lessonId = useMemo(() => getTodayLessonIdFromRoadmap(roadmapData), [roadmapData]);

  const { exercisesByLesson, isLoading: speakingApiLoading } = useGenerateSpeakingForLesson({
    lessonId,
    enabled: !!lessonId,
  });
  const exercises = useMemo(
    () => parseExercisesByLessonResponse(exercisesByLesson),
    [exercisesByLesson]
  );

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<PronunciationFeedback | null>(
    null
  );
  const [showFeedbackDetails, setShowFeedbackDetails] = useState(false);

  // 🌟 STATE QUẢN LÝ VIỆC HIỆN TỔNG KẾT NỘI BỘ
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setCurrentExerciseIndex(0);
    setPronunciationFeedback(null);
    setShowFeedbackDetails(false);
    setIsFinished(false);
  }, [lessonId, exercises.length]);

  // Trong file PracticeSetupScreen.tsx

  const scenario: ScenarioPreview | null = useMemo(() => {
    const ex = exercises[currentExerciseIndex];
    if (!ex) return null;

    const baseScenario = speakingExerciseToScenarioPreview(ex);

    if (pronunciationFeedback) {
      return {
        ...baseScenario,
        score: pronunciationFeedback.score,
        pronunciationSegments: [
          {
            // 🌟 CHỈNH Ở ĐÂY: Ưu tiên baseScenario.exampleAnswer (từ vựng gốc)
            // thay vì pronunciationFeedback.transcript (kết quả AI nghe được)
            text: baseScenario.exampleAnswer || pronunciationFeedback.referenceText || '...',
            isCorrect: pronunciationFeedback.passed,
          },
        ],
      };
    }

    return baseScenario;
  }, [exercises, currentExerciseIndex, pronunciationFeedback]);

  const isWaitingForSpeaking =
    roadmapLoading || (!!lessonId && speakingApiLoading && exercises.length === 0);
  const totalQuestions = exercises.length;
  const currentQuestion =
    exercises.length > 0 ? Math.min(currentExerciseIndex + 1, exercises.length) : 0;

  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const COLORS = useMemo(
    () => ({
      primary: '#D32F2F',
      bg: isDark ? colors.background : '#FFF8F7',
      pinkSoft: isDark ? colors.surface : '#FFF0EF',
      nextBlue: '#7DD3FC',
      headerBg: colors.surfaceElevated,
      border: colors.border,
      textMain: colors.text,
      textMuted: colors.muted,
      inactiveBorder: isDark ? colors.border : '#E5E7EB',
      inactiveTabBg: isDark ? colors.card : '#FFFFFF',
      bottomBarBg: colors.surfaceElevated,
    }),
    [colors, isDark]
  );

  const navigation = useNavigation<PracticeSetupScreenNavigationProp>();
  const {
    start: startPronunciationRecording,
    stop: stopPronunciationRecording,
    micLevel,
  } = useSpeakingPronunciationRecorder();
  const { submitAfterRecording } = useSubmitSpeakingPronunciation({
    exercises,
    currentExerciseIndex,
    scenario,
    lessonId,
  });

  const goPrevExercise = () => {
    setCurrentExerciseIndex(i => Math.max(0, i - 1));
    setHasRecorded(false);
    setPronunciationFeedback(null);
    setShowFeedbackDetails(false);
  };

  const goNextExercise = () => {
    if (exercises.length === 0) return;
    setCurrentExerciseIndex(i => Math.min(exercises.length - 1, i + 1));
    setHasRecorded(false);
    setPronunciationFeedback(null);
    setShowFeedbackDetails(false);
  };

  const startRecording = async () => {
    setHasRecorded(false);
    setPronunciationFeedback(null);
    setShowFeedbackDetails(false);
    const ok = await startPronunciationRecording();
    if (ok) setIsRecording(true);
  };

  const stopRecording = async () => {
    const uri = await stopPronunciationRecording();
    setIsRecording(false);
    setHasRecorded(true);
    const fb = await submitAfterRecording(uri);
    setPronunciationFeedback(fb);
  };

  const handleRetry = () => {
    setHasRecorded(false);
    setPronunciationFeedback(null);
    setShowFeedbackDetails(false);
  };

  // 🌟 NẾU ĐÃ BẤM HOÀN THÀNH: Render màn hình tổng kết đè lên luôn
  if (isFinished) {
    return (
      <LessonSummaryScreen
        data={{
          totalWords: exercises.length,
          accuracy: 85, // Bạn có thể tính toán điểm trung bình thực tế nếu muốn
          timeSpent: '05:20',
        }}
        showRadarChart={true}
        primaryActionText="Next lesson"
        onPrimaryAction={() => navigation.goBack()}
        onClose={() => {
          navigation.replace('TabNavigator', { screen: 'Home' });
        }}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }} edges={['top']}>
      <View
        className="border-b px-4 pb-4 pt-2"
        style={{ borderBottomColor: COLORS.border, backgroundColor: COLORS.headerBg }}
      >
        <View className="mb-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: isDark ? colors.surface : '#F3F4F6' }}
          >
            <IconBackButton width={16} height={16} iconColor={isDark ? '#FFFFFF' : '#0F172A'} />
          </TouchableOpacity>
          <Text
            className="flex-1 text-center text-[18px] font-bold"
            style={{ color: COLORS.textMain }}
          >
            Practice Setup
          </Text>
          <View className="h-10 w-10" />
        </View>
        <ProgressBar
          current={currentQuestion}
          total={totalQuestions}
          variant="quiz"
          className="mb-5"
        />
        <View className="mt-6 flex-row gap-3">
          <TouchableOpacity
            className="flex-1 rounded-2xl py-3"
            style={{
              borderWidth: 2,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.pinkSoft,
            }}
          >
            <Text
              className="text-center text-sm font-bold uppercase tracking-wide"
              style={{ color: COLORS.primary }}
            >
              CƠ BẢN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 rounded-2xl py-3"
            style={{
              borderWidth: 2,
              borderColor: COLORS.inactiveBorder,
              backgroundColor: COLORS.inactiveTabBg,
            }}
          >
            <Text
              className="text-center text-sm font-bold uppercase tracking-wide"
              style={{ color: '#9CA3AF' }}
            >
              NÂNG CAO
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 20,
          flexGrow: 1,
        }}
      >
        {isWaitingForSpeaking ? (
          <View className="min-h-[320px] flex-1 justify-start pt-2">
            <ChatBubbleAI
              message={{ id: 'loading', role: 'ai', text: '', timestamp: Date.now() }}
              role="SPEAKING"
              showTypingIndicator
            />
          </View>
        ) : scenario ? (
          <View>
            <ScenarioCard
              scenario={scenario}
              mode="dual-explorer"
              showUserBubble={hasRecorded}
              showWordFeedback={hasRecorded}
              onToggleFeedback={() => setShowFeedbackDetails(prev => !prev)}
              isFeedbackVisible={showFeedbackDetails}
            />
            {hasRecorded && pronunciationFeedback && showFeedbackDetails && (
              <PronunciationFeedbackCard
                feedback={pronunciationFeedback}
                textMain={COLORS.textMain}
                textMuted={COLORS.textMuted}
                borderColor={COLORS.border}
                surfaceBg={isDark ? colors.surface : '#FFFFFF'}
                accentColor={COLORS.primary}
                mistakeRowBg={isDark ? 'rgba(255,255,255,0.08)' : '#F3F4F6'}
                isDark={isDark}
              />
            )}
          </View>
        ) : null}
      </ScrollView>

      <View
        className={`border-t pt-4 ${isRecording ? 'px-0' : 'px-4'}`}
        style={{
          paddingBottom: Math.max(insets.bottom, 16),
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.bottomBarBg,
        }}
      >
        {!isRecording ? (
          <View className="min-h-[140px] w-full justify-center px-2">
            <View
              className="flex-row items-center justify-center"
              style={{ gap: 28, maxWidth: '100%' }}
            >
              <View className="w-[76px] items-center">
                <TouchableOpacity
                  onPress={goPrevExercise}
                  disabled={currentExerciseIndex === 0}
                  className="h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: COLORS.pinkSoft,
                    opacity: currentExerciseIndex === 0 ? 0.4 : 1,
                  }}
                >
                  <Feather name="chevron-left" size={26} color="#9CA3AF" />
                </TouchableOpacity>
                <Text className="mt-1 text-[10px] font-medium text-gray-500">Câu trước</Text>
              </View>

              <View className="items-center">
                <TouchableOpacity
                  onPress={() => void (hasRecorded ? handleRetry() : startRecording())}
                  className="h-[72px] w-[72px] items-center justify-center rounded-full shadow-lg"
                  style={{ backgroundColor: COLORS.primary, elevation: 8 }}
                >
                  {hasRecorded ? (
                    <IconRepeat width={34} height={34} color="#FFFFFF" />
                  ) : (
                    <IconMicrophone width={30} height={30} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
                <Text className="mt-2 text-xs font-semibold text-gray-600">
                  {hasRecorded ? 'Thử lại' : 'Nhấn để nói'}
                </Text>
              </View>

              <View className="w-[76px] items-center">
                <TouchableOpacity
                  onPress={() => {
                    if (currentExerciseIndex >= exercises.length - 1) {
                      // 🌟 THAY ĐỔI: SET FINISHED THAY VÌ NAVIGATE
                      setIsFinished(true);
                    } else {
                      goNextExercise();
                    }
                  }}
                  disabled={exercises.length === 0}
                  className="h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: COLORS.nextBlue }}
                >
                  {currentExerciseIndex >= exercises.length - 1 ? (
                    <Feather name="check" size={26} color="#FFFFFF" />
                  ) : (
                    <Feather name="chevron-right" size={26} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
                <Text className="mt-1 text-[10px] font-medium text-gray-500">
                  {currentExerciseIndex >= exercises.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => void stopRecording()}
            className="w-full items-center pb-2"
            style={{ minHeight: 120 }}
          >
            <WaveformAnimation
              isRecording={isRecording}
              barMaxHeight={56}
              warmPalette
              fullWidth
              amplitudes={[micLevel]}
            />
            <Text className="mt-3 text-sm font-semibold" style={{ color: COLORS.primary }}>
              Nhấn để dừng
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
