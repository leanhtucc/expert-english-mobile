import Feather from '@expo/vector-icons/Feather';

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconBackButton, IconMicrophone, IconRepeat, IconStreakRed } from '@/components/icon';
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
import { PracticeMode, ScenarioPreview } from '@/types/speaking.types';
import { getTodayLessonIdFromRoadmap } from '@/utils/roadmapTodayLesson';

import { ChatBubbleAI } from './components/ChatBubbleAI';
import { PronunciationFeedbackCard } from './components/PronunciationFeedbackCard';
import { ScenarioCard } from './components/ScenarioCard';
import { WaveformAnimation } from './components/WaveformAnimation';

type PracticeSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PracticeSetup'>;

export const PracticeSetupScreen: React.FC = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const { data: roadmapData, loading: roadmapLoading } = useRoadmapData(accessToken || '');

  /** Tạm thời: chỉ lấy `_id` bài học "hôm nay" trên roadmap (không dùng route params). */
  const lessonId = useMemo(() => getTodayLessonIdFromRoadmap(roadmapData), [roadmapData]);

  const {
    exercisesByLesson,
    isLoading: speakingApiLoading,
    error: speakingApiError,
  } = useGenerateSpeakingForLesson({ lessonId, enabled: !!lessonId });

  const exercises = useMemo(
    () => parseExercisesByLessonResponse(exercisesByLesson),
    [exercisesByLesson]
  );

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  useEffect(() => {
    setCurrentExerciseIndex(0);
    setPronunciationFeedback(null);
  }, [lessonId, exercises.length]);

  const scenario: ScenarioPreview | null = useMemo(() => {
    const ex = exercises[currentExerciseIndex];
    if (!ex) return null;
    return speakingExerciseToScenarioPreview(ex);
  }, [exercises, currentExerciseIndex]);

  /** Chờ roadmap hoặc chờ hook speaking (chưa có mảng exercises). */
  const isWaitingForSpeaking =
    roadmapLoading || (!!lessonId && speakingApiLoading && exercises.length === 0);

  const totalQuestions = exercises.length;
  const currentQuestion =
    exercises.length > 0 ? Math.min(currentExerciseIndex + 1, exercises.length) : 0;
  const sessionProgressPct =
    exercises.length > 0 ? Math.round(((currentExerciseIndex + 1) / exercises.length) * 100) : 0;

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
  const selectedMode: PracticeMode = 'dual-explorer';
  const [practiceLevel, setPracticeLevel] = useState<'basic' | 'advanced'>('basic');
  const [isRecording, setIsRecording] = useState(false);
  /** Đã dừng ghi xong — hiển thị Thử lại + feedback, không chuyển màn */
  const [hasRecorded, setHasRecorded] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<PronunciationFeedback | null>(
    null
  );

  /** Ghi âm m4a + metering; dừng thì submit-pronunciation */
  const {
    micLevel,
    start: startPronunciationRecording,
    stop: stopPronunciationRecording,
  } = useSpeakingPronunciationRecorder();

  const { submitAfterRecording } = useSubmitSpeakingPronunciation({
    exercises,
    currentExerciseIndex,
    scenario,
    lessonId,
  });

  const streak = 5;

  const goPrevExercise = () => {
    setCurrentExerciseIndex(i => Math.max(0, i - 1));
    setHasRecorded(false);
    setPronunciationFeedback(null);
  };

  const goNextExercise = () => {
    if (exercises.length === 0) return;
    setCurrentExerciseIndex(i => Math.min(exercises.length - 1, i + 1));
    setHasRecorded(false);
    setPronunciationFeedback(null);
  };

  const startRecording = async () => {
    setHasRecorded(false);
    setPronunciationFeedback(null);
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
  };

  /** Tên giữ cho tương thích / tránh lỗi tham chiếu cũ — tương đương bắt đầu ghi */
  const handleStartSpeaking = startRecording;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }} edges={['top']}>
      {/* Header */}
      <View
        className="border-b px-4 pb-3 pt-2"
        style={{ borderBottomColor: COLORS.border, backgroundColor: COLORS.headerBg }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: isDark ? colors.surface : '#F3F4F6' }}
            hitSlop={8}
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

        <View className="mt-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <IconStreakRed width={22} height={22} />
            <Text className="text-[15px] font-bold" style={{ color: COLORS.primary }}>
              Streak {streak}
            </Text>
          </View>
          <Text className="text-xs font-bold tracking-wider" style={{ color: COLORS.textMuted }}>
            {isWaitingForSpeaking
              ? 'QUESTION …'
              : totalQuestions > 0
                ? `QUESTION ${currentQuestion}/${totalQuestions}`
                : 'QUESTION —'}
          </Text>
        </View>

        <View
          className="mt-3 mb-3 h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: isDark ? colors.border : '#E5E7EB' }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${sessionProgressPct}%`,
              backgroundColor: COLORS.primary,
            }}
          />
        </View>

        {/* CƠ BẢN / NÂNG CAO */}
        <View className="mt-4 flex-row gap-3">
          <TouchableOpacity
            onPress={() => setPracticeLevel('basic')}
            activeOpacity={0.85}
            className="flex-1 rounded-2xl py-3"
            style={{
              borderWidth: 2,
              borderColor: practiceLevel === 'basic' ? COLORS.primary : COLORS.inactiveBorder,
              backgroundColor: practiceLevel === 'basic' ? COLORS.pinkSoft : COLORS.inactiveTabBg,
            }}
          >
            <Text
              className="text-center text-sm font-bold uppercase tracking-wide"
              style={{ color: practiceLevel === 'basic' ? COLORS.primary : '#9CA3AF' }}
            >
              CƠ BẢN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPracticeLevel('advanced')}
            activeOpacity={0.85}
            className="flex-1 rounded-2xl py-3"
            style={{
              borderWidth: 2,
              borderColor: practiceLevel === 'advanced' ? COLORS.primary : COLORS.inactiveBorder,
              backgroundColor:
                practiceLevel === 'advanced' ? COLORS.pinkSoft : COLORS.inactiveTabBg,
            }}
          >
            <Text
              className="text-center text-sm font-bold uppercase tracking-wide"
              style={{ color: practiceLevel === 'advanced' ? COLORS.primary : '#9CA3AF' }}
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
        showsVerticalScrollIndicator={false}
      >
        {isWaitingForSpeaking ? (
          <View className="min-h-[320px] flex-1 justify-start pt-2">
            <ChatBubbleAI
              message={{
                id: 'loading',
                role: 'ai',
                text: '',
                timestamp: Date.now(),
              }}
              role={roadmapLoading ? 'LỘ TRÌNH' : 'SPEAKING'}
              mode={selectedMode}
              showTypingIndicator
            />
          </View>
        ) : !lessonId ? (
          <View className="min-h-[200px] items-center justify-center py-12">
            <Text className="text-center text-sm" style={{ color: COLORS.textMuted }}>
              Chưa có bài học trên lộ trình để luyện speaking.
            </Text>
          </View>
        ) : speakingApiError && exercises.length === 0 ? (
          <View className="min-h-[200px] items-center justify-center py-12">
            <Text className="text-center text-sm" style={{ color: COLORS.primary }}>
              Không tải được bài tập. Thử lại sau.
            </Text>
          </View>
        ) : exercises.length === 0 ? (
          <View className="min-h-[200px] items-center justify-center py-12">
            <Text className="text-center text-sm" style={{ color: COLORS.textMuted }}>
              Chưa có bài speaking cho bài học này.
            </Text>
          </View>
        ) : scenario ? (
          <View>
            <ScenarioCard
              scenario={scenario}
              mode={selectedMode}
              showUserBubble={hasRecorded}
              showWordFeedback={practiceLevel === 'advanced' && hasRecorded}
            />
            {hasRecorded && pronunciationFeedback ? (
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
            ) : null}
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom: idle = Câu trước | Mic | Tiếp theo — ghi âm = chỉ sóng full width + dừng */}
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
                  disabled={exercises.length === 0 || currentExerciseIndex === 0}
                  className="h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: COLORS.pinkSoft,
                    opacity: exercises.length === 0 || currentExerciseIndex === 0 ? 0.4 : 1,
                  }}
                  activeOpacity={0.85}
                >
                  <Feather name="chevron-left" size={26} color="#9CA3AF" />
                </TouchableOpacity>
                <Text className="mt-1 text-[10px] font-medium text-gray-500">Câu trước</Text>
              </View>

              <View className="items-center">
                <TouchableOpacity
                  onPress={() => void (hasRecorded ? handleRetry() : handleStartSpeaking())}
                  className="h-[72px] w-[72px] items-center justify-center rounded-full shadow-lg"
                  style={{
                    backgroundColor: COLORS.primary,
                    shadowColor: COLORS.primary,
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.35,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                  activeOpacity={0.85}
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
                  onPress={goNextExercise}
                  disabled={exercises.length === 0 || currentExerciseIndex >= exercises.length - 1}
                  className="h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: COLORS.nextBlue,
                    opacity:
                      exercises.length === 0 || currentExerciseIndex >= exercises.length - 1
                        ? 0.4
                        : 1,
                  }}
                  activeOpacity={0.85}
                >
                  <Feather name="chevron-right" size={26} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="mt-1 text-[10px] font-medium text-gray-500">Tiếp theo</Text>
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => void stopRecording()}
            activeOpacity={0.92}
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
