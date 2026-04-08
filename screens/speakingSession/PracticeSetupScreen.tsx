import Feather from '@expo/vector-icons/Feather';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
  SPEAKING_EXERCISE_LV1,
  SPEAKING_EXERCISE_LV2,
  SpeakingExerciseTypeRef,
} from '@/types/api/speakingExercise.request';
import {
  parseExercisesByLessonResponse,
  speakingExerciseToScenarioPreview,
} from '@/types/api/speakingExercise.response';
import { ChatMessage, ScenarioPreview } from '@/types/speaking.types';
import { getTodayLessonIdFromRoadmap } from '@/utils/roadmapTodayLesson';

import { ProgressBar } from '../vocabulary/components';
import { LessonSummaryScreen } from '../vocabulary/result';
import { ChatBubbleAI } from './components/ChatBubbleAI';
import { ChatBubbleUser } from './components/ChatBubbleUser';
import { WaveformAnimation } from './components/WaveformAnimation';

type PracticeSetupScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type PracticeSetupRouteProp = RouteProp<RootStackParamList, 'PracticeSetup'>;
type SpeakingTab = 'basic' | 'advanced';
type SpeakingTabState = {
  currentExerciseIndex: number;
  hasRecorded: boolean;
  chatMessages: ChatMessage[];
  isFinished: boolean;
};
type ChatListProps = {
  isWaitingForSpeaking: boolean;
  hasScenario: boolean;
  chatMessages: ChatMessage[];
  isAwaitingCoachResponse: boolean;
  currentExerciseIndex: number;
};

const ChatList = React.memo(
  ({
    isWaitingForSpeaking,
    hasScenario,
    chatMessages,
    isAwaitingCoachResponse,
    currentExerciseIndex,
  }: ChatListProps) => {
    const scrollRef = useRef<ScrollView | null>(null);

    useEffect(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, [chatMessages, isAwaitingCoachResponse, isWaitingForSpeaking, currentExerciseIndex]);

    return (
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        onContentSizeChange={() => {
          scrollRef.current?.scrollToEnd({ animated: true });
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
        ) : hasScenario ? (
          <View>
            {chatMessages.length > 0 && (
              <View>
                {chatMessages.map(message =>
                  message.role === 'ai' ? (
                    <ChatBubbleAI
                      key={message.id}
                      message={{
                        id: message.id,
                        role: 'ai',
                        text: message.text,
                        translation: message.translation,
                        timestamp: message.timestamp,
                      }}
                      role="GIẢNG VIÊN"
                    />
                  ) : (
                    <ChatBubbleUser
                      key={message.id}
                      message={{
                        id: message.id,
                        role: 'user',
                        text: message.text,
                        translation: message.translation,
                        score: message.score,
                        timestamp: message.timestamp,
                      }}
                      role="HỌC VIÊN"
                      showWordFeedback={false}
                    />
                  )
                )}

                {isAwaitingCoachResponse && (
                  <ChatBubbleUser
                    message={{
                      id: `student-typing-${currentExerciseIndex}`,
                      role: 'user',
                      text: '',
                      timestamp: Date.now(),
                    }}
                    role="HỌC VIÊN"
                    showWordFeedback={false}
                    showTypingIndicator
                  />
                )}
              </View>
            )}
          </View>
        ) : null}
      </ScrollView>
    );
  }
);
ChatList.displayName = 'ChatList';

const prettyLog = (label: string, payload: unknown) => {
  try {
    console.log(label, JSON.stringify(payload, null, 2));
  } catch {
    console.log(label, payload);
  }
};

export const PracticeSetupScreen: React.FC = () => {
  const nextQuestionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const route = useRoute<PracticeSetupRouteProp>();
  const [activeSpeakingTab, setActiveSpeakingTab] = useState<SpeakingTab>('basic');
  const accessToken = useAuthStore(state => state.accessToken);
  const { data: roadmapData, loading: roadmapLoading } = useRoadmapData(accessToken || '');
  const lessonId = useMemo(
    () => route.params?.lessonId || getTodayLessonIdFromRoadmap(roadmapData),
    [route.params?.lessonId, roadmapData]
  );

  const selectedExerciseType: SpeakingExerciseTypeRef = useMemo(
    () => (activeSpeakingTab === 'advanced' ? SPEAKING_EXERCISE_LV2 : SPEAKING_EXERCISE_LV1),
    [activeSpeakingTab]
  );

  const {
    data: generateSpeakingResponse,
    exercisesByLesson,
    isLoading: speakingApiLoading,
  } = useGenerateSpeakingForLesson({
    lessonId,
    exerciseType: selectedExerciseType,
    enabled: !!lessonId,
  });
  const exercises = useMemo(() => {
    const parsed = parseExercisesByLessonResponse(exercisesByLesson);
    const strict = parsed.filter(ex => {
      const byTypeId = ex?.type_id === selectedExerciseType._id;
      const byTypeCode = (ex as any)?.type_info?.code === selectedExerciseType.code;
      return byTypeId || byTypeCode;
    });
    if (strict.length > 0) return strict;

    // Fallback cho backend response thiếu metadata type.
    const level = activeSpeakingTab === 'advanced' ? 2 : 1;
    return parsed.filter(ex => ex?.content?.speaking_level === level);
  }, [exercisesByLesson, selectedExerciseType._id, selectedExerciseType.code, activeSpeakingTab]);

  const [tabStates, setTabStates] = useState<Record<SpeakingTab, SpeakingTabState>>({
    basic: { currentExerciseIndex: 0, hasRecorded: false, chatMessages: [], isFinished: false },
    advanced: { currentExerciseIndex: 0, hasRecorded: false, chatMessages: [], isFinished: false },
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isAwaitingCoachResponse, setIsAwaitingCoachResponse] = useState(false);
  const currentExerciseIndex = tabStates[activeSpeakingTab].currentExerciseIndex;
  const hasRecorded = tabStates[activeSpeakingTab].hasRecorded;
  const chatMessages = tabStates[activeSpeakingTab].chatMessages;
  const isFinished = tabStates[activeSpeakingTab].isFinished;

  useEffect(() => {
    setTabStates({
      basic: { currentExerciseIndex: 0, hasRecorded: false, chatMessages: [], isFinished: false },
      advanced: {
        currentExerciseIndex: 0,
        hasRecorded: false,
        chatMessages: [],
        isFinished: false,
      },
    });
    setIsAwaitingCoachResponse(false);
  }, [lessonId]);

  useEffect(() => {
    return () => {
      if (nextQuestionTimeoutRef.current) {
        clearTimeout(nextQuestionTimeoutRef.current);
        nextQuestionTimeoutRef.current = null;
      }
    };
  }, []);

  const scenario: ScenarioPreview | null = useMemo(() => {
    const ex = exercises[currentExerciseIndex];
    if (!ex) return null;
    return speakingExerciseToScenarioPreview(ex);
  }, [exercises, currentExerciseIndex]);

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
  const isMicDisabled = isAwaitingCoachResponse || hasRecorded;
  const isRetryDisabled = isAwaitingCoachResponse;

  const goPrevExercise = () => {
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
      nextQuestionTimeoutRef.current = null;
    }
    const prevIndex = Math.max(0, currentExerciseIndex - 1);
    setTabStates(prev => ({
      ...prev,
      [activeSpeakingTab]: {
        ...prev[activeSpeakingTab],
        currentExerciseIndex: prevIndex,
        hasRecorded: false,
        chatMessages: prev[activeSpeakingTab].chatMessages.filter(message => {
          if (!message.id.startsWith('question-')) return false;
          const turn = Number((message.id.split('-')[1] ?? '-1').trim());
          return Number.isNaN(turn) || turn <= prevIndex;
        }),
      },
    }));
    setIsAwaitingCoachResponse(false);
  };

  const startRecording = async () => {
    setTabStates(prev => ({
      ...prev,
      [activeSpeakingTab]: { ...prev[activeSpeakingTab], hasRecorded: false },
    }));
    const ok = await startPronunciationRecording();
    if (ok) setIsRecording(true);
  };

  const stopRecording = async () => {
    const activeScenario = scenario;
    const isLastExercise = currentExerciseIndex >= exercises.length - 1;
    const uri = await stopPronunciationRecording();
    setIsRecording(false);
    setTabStates(prev => ({
      ...prev,
      [activeSpeakingTab]: { ...prev[activeSpeakingTab], hasRecorded: true },
    }));
    setIsAwaitingCoachResponse(true);
    let fb = null;
    try {
      fb = await submitAfterRecording(uri);
    } finally {
      setIsAwaitingCoachResponse(false);
    }
    prettyLog('[PracticeSetup] submitAfterRecording response', fb);

    if (activeScenario) {
      const now = Date.now();
      const userText = fb?.transcript?.trim() || activeScenario.exampleAnswer || '...';
      const learnerHint = fb?.learnerHint?.trim();
      const overallFeedback = fb?.overallFeedback?.trim();
      const aiText =
        [learnerHint, overallFeedback].filter(Boolean).join('\n\n') ||
        'Mình đã nhận câu trả lời của bạn. Chúng ta sang câu tiếp theo nhé.';

      setTabStates(prev => ({
        ...prev,
        [activeSpeakingTab]: {
          ...prev[activeSpeakingTab],
          chatMessages: [
            ...prev[activeSpeakingTab].chatMessages,
            {
              id: `user-${currentExerciseIndex}-${now}`,
              role: 'user',
              text: userText,
              translation: activeScenario.exampleAnswerTranslation,
              score: fb?.score,
              timestamp: now,
            },
            {
              id: `coach-${currentExerciseIndex}-${now}`,
              role: 'ai',
              text: aiText,
              timestamp: now + 1,
            },
          ],
        },
      }));
    }

    if (exercises.length === 0) return;

    // Hiện phản hồi bot xong thì chuyển câu hỏi tiếp theo ngay.
    if (isLastExercise) {
      setTabStates(prev => ({
        ...prev,
        [activeSpeakingTab]: { ...prev[activeSpeakingTab], isFinished: true },
      }));
    } else {
      const nextIndex = Math.min(exercises.length - 1, currentExerciseIndex + 1);
      if (nextQuestionTimeoutRef.current) {
        clearTimeout(nextQuestionTimeoutRef.current);
      }
      // Delay nhẹ để người dùng kịp đọc phản hồi trước khi sang câu kế.
      nextQuestionTimeoutRef.current = setTimeout(() => {
        setTabStates(prev => ({
          ...prev,
          [activeSpeakingTab]: {
            ...prev[activeSpeakingTab],
            currentExerciseIndex: nextIndex,
            hasRecorded: false,
          },
        }));
        nextQuestionTimeoutRef.current = null;
      }, 2500);
    }
  };

  const handleRetry = async () => {
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
      nextQuestionTimeoutRef.current = null;
    }
    const prevIndex = Math.max(0, currentExerciseIndex - 1);
    setTabStates(prev => ({
      ...prev,
      [activeSpeakingTab]: {
        ...prev[activeSpeakingTab],
        currentExerciseIndex: prevIndex,
        hasRecorded: false,
        chatMessages: prev[activeSpeakingTab].chatMessages.filter(message => {
          if (!message.id.startsWith('question-')) return false;
          const turn = Number((message.id.split('-')[1] ?? '-1').trim());
          return Number.isNaN(turn) || turn <= prevIndex;
        }),
      },
    }));
    setIsAwaitingCoachResponse(false);

    const ok = await startPronunciationRecording();
    if (ok) setIsRecording(true);
  };

  useEffect(() => {
    if (!scenario) return;
    setTabStates(prev => {
      const current = prev[activeSpeakingTab];
      const hasQuestion = current.chatMessages.some(m =>
        m.id.startsWith(`question-${currentExerciseIndex}-`)
      );
      if (hasQuestion) return prev;
      return {
        ...prev,
        [activeSpeakingTab]: {
          ...current,
          chatMessages: [
            ...current.chatMessages,
            {
              id: `question-${currentExerciseIndex}-${Date.now()}`,
              role: 'ai',
              text: scenario.question,
              translation: scenario.translation,
              timestamp: Date.now(),
            },
          ],
        },
      };
    });
  }, [activeSpeakingTab, currentExerciseIndex, scenario]);

  useEffect(() => {
    if (!lessonId) return;
    prettyLog('[PracticeSetup] exercisesByLesson response', {
      lessonId,
      levelCode: selectedExerciseType.code,
      response: exercisesByLesson,
    });
  }, [lessonId, selectedExerciseType.code, exercisesByLesson]);

  useEffect(() => {
    if (!lessonId || !generateSpeakingResponse) return;
    prettyLog('[PracticeSetup] generateSpeaking response', {
      lessonId,
      levelCode: selectedExerciseType.code,
      response: generateSpeakingResponse,
    });
  }, [lessonId, selectedExerciseType.code, generateSpeakingResponse]);

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
      <StatusBar style={isDark ? 'light' : 'dark'} />
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
            onPress={() => {
              setActiveSpeakingTab('basic');
            }}
            className="flex-1 rounded-2xl py-3"
            style={{
              borderWidth: 2,
              borderColor: activeSpeakingTab === 'basic' ? COLORS.primary : COLORS.inactiveBorder,
              backgroundColor:
                activeSpeakingTab === 'basic' ? COLORS.pinkSoft : COLORS.inactiveTabBg,
            }}
          >
            <Text
              className="text-center text-sm font-bold uppercase tracking-wide"
              style={{ color: activeSpeakingTab === 'basic' ? COLORS.primary : '#9CA3AF' }}
            >
              CƠ BẢN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveSpeakingTab('advanced');
            }}
            className="flex-1 rounded-2xl py-3"
            style={{
              borderWidth: 2,
              borderColor:
                activeSpeakingTab === 'advanced' ? COLORS.primary : COLORS.inactiveBorder,
              backgroundColor:
                activeSpeakingTab === 'advanced' ? COLORS.pinkSoft : COLORS.inactiveTabBg,
            }}
          >
            <Text
              className="text-center text-sm font-bold uppercase tracking-wide"
              style={{ color: activeSpeakingTab === 'advanced' ? COLORS.primary : '#9CA3AF' }}
            >
              NÂNG CAO
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ChatList
        isWaitingForSpeaking={isWaitingForSpeaking}
        hasScenario={!!scenario}
        chatMessages={chatMessages}
        isAwaitingCoachResponse={isAwaitingCoachResponse}
        currentExerciseIndex={currentExerciseIndex}
      />

      <View
        className={`border-t pt-4 ${isRecording ? 'px-0' : 'px-4'}`}
        style={{
          paddingBottom: Math.max(insets.bottom, 16),
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.bottomBarBg,
        }}
      >
        {!isRecording ? (
          <View className="relative min-h-[140px] w-full justify-center px-2">
            <View className="absolute left-2 top-1/2 -translate-y-1/2 items-center">
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
            </View>

            <View className="absolute right-2 top-1/2 -translate-y-1/2 items-center">
              <View className="w-[76px] items-center">
                <TouchableOpacity
                  onPress={() => void handleRetry()}
                  disabled={isRetryDisabled}
                  className="h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: COLORS.pinkSoft,
                    opacity: isRetryDisabled ? 0.4 : 1,
                  }}
                >
                  <IconRepeat width={28} height={28} color="#9CA3AF" />
                </TouchableOpacity>
                <Text className="mt-1 text-[10px] font-medium text-gray-500">Thử lại</Text>
              </View>
            </View>

            <View className="items-center self-center">
              <TouchableOpacity
                onPress={() => void startRecording()}
                disabled={isMicDisabled}
                className="h-[72px] w-[72px] items-center justify-center rounded-full shadow-lg"
                style={{
                  backgroundColor: COLORS.primary,
                  elevation: 8,
                  opacity: isMicDisabled ? 0.45 : 1,
                }}
              >
                <IconMicrophone width={30} height={30} color="#FFFFFF" />
              </TouchableOpacity>
              <Text className="mt-2 text-xs font-semibold text-gray-600">
                {isAwaitingCoachResponse ? 'Đang xử lý...' : 'Nhấn để nói'}
              </Text>
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
