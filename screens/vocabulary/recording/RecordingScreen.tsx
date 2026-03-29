import { Feather, Ionicons } from '@expo/vector-icons';

import React, { useEffect, useRef } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Iconscoring } from '@/components/icon';

import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { MicrophoneButton } from './MicrophoneButton';
import { MOCK_QUESTIONS } from './constants';
import { Question } from './types';
import { useRecording } from './useRecording';

interface RecordingScreenProps {
  questions?: Question[];
  route?: any;
  onComplete?: (score: number) => void;
  onBack?: () => void;
  onClose?: () => void;
  progress?: { current: number; total: number };
}

export const RecordingScreen: React.FC<RecordingScreenProps> = ({
  questions,
  route,
  onComplete,
  onBack,
  onClose,
  progress: externalProgress,
}) => {
  const insets = useSafeAreaInsets();
  const safeQuestions = questions || route?.params?.questions || MOCK_QUESTIONS;

  const {
    state,
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    playSampleAudio,
    startRecording,
    stopRecordingAndScore,
    handleRetry,
  } = useRecording({ questions: safeQuestions, onComplete });

  const wrongReportedRef = useRef(false);

  // LOGIC: Nếu thu âm trả về điểm thấp (Ví dụ < 70) -> Báo lỗi để kích hoạt Hint
  useEffect(() => {
    if (state === 'RESULT' && score !== null && score < 70) {
      if (!wrongReportedRef.current) {
        onComplete?.(0); // Gửi cờ sai
        wrongReportedRef.current = true;
      }
    } else if (state === 'IDLE' || state === 'RECORDING') {
      // Reset khi bấm thu âm lại
      wrongReportedRef.current = false;
    }
  }, [state, score, onComplete]);

  const displayProgress = externalProgress || {
    current: currentIndex + 1,
    total: totalQuestions || 1,
  };

  if (!currentQuestion) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['left', 'right', 'top']}>
      {/* ... Giữ nguyên toàn bộ UI ... */}
      <View className="z-10 w-full bg-white">
        <ScreenHeader
          title="Speaking Practice"
          subtitle="PRONUNCIATION"
          onBack={onBack}
          onClose={onClose}
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        <View className="w-full px-5 pt-4 pb-2">
          <ProgressBar
            current={displayProgress.current}
            total={displayProgress.total}
            variant="quiz"
          />
        </View>

        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="rounded-[24px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {currentQuestion.type === 'word' && currentQuestion.imageUrl && (
              <View className="mb-6 h-[180px] w-full items-center justify-center">
                <Image
                  source={{ uri: currentQuestion.imageUrl }}
                  className="h-[320px] w-[320px]"
                  resizeMode="contain"
                />
              </View>
            )}

            <Text
              className={`font-extrabold text-[#1E293B] ${currentQuestion.type === 'word' ? 'text-[32px]' : 'text-[24px] leading-8'}`}
            >
              {currentQuestion.text}
            </Text>
            <Text className="mt-2 text-[15px] text-[#64748B]">{currentQuestion.phonetic}</Text>

            <View className="mt-5 rounded-xl border-l-[3px] border-[#D32F2F] bg-[#FFF8F8] p-4">
              <Text className="text-[15px] leading-6 text-[#4A4A4A]">
                &quot;{currentQuestion.meaning}&quot;
              </Text>
            </View>

            <View className="mt-6 flex-row items-center justify-between">
              <TouchableOpacity
                onPress={playSampleAudio}
                className={`flex-1 flex-row items-center justify-center rounded-2xl bg-[#D32F2F] py-[14px] ${state === 'PLAYING_AUDIO' ? 'opacity-70' : ''}`}
              >
                <Ionicons name="volume-medium" size={22} color="#FFF" />
                <Text className="ml-2 text-[17px] font-bold text-white">Listen</Text>
              </TouchableOpacity>

              <View className="ml-4 min-w-[100px] flex-row items-center justify-center rounded-2xl bg-[#FCE4E4] px-8 py-[14px]">
                <Iconscoring width={20} height={20} color="#D32F2F" />
                {score !== null && (
                  <Text className="ml-2 text-[16px] font-extrabold text-[#D32F2F]">{score}%</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 z-40 w-full">
        <View
          style={{ paddingBottom: Math.max(insets.bottom, 4) }}
          className="w-full bg-[#F8FAFC] px-5 pt-2"
        >
          {state !== 'RESULT' ? (
            <MicrophoneButton
              state={state}
              onStart={startRecording}
              onStop={stopRecordingAndScore}
            />
          ) : (
            <View className="flex-row items-center justify-between pt-4 pb-4">
              <TouchableOpacity
                onPress={handleRetry}
                className="mr-3 flex-row items-center justify-center rounded-full bg-[#FCE4E4] px-6 py-[18px]"
              >
                <Feather name="rotate-ccw" size={18} color="#9E001F" />
                <Text className="ml-2 text-[16px] font-bold text-[#9E001F]">Try Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  onComplete?.(score || 100); // 🌟 Bấm NEXT thì pass luôn điểm số hiện tại về
                }}
                className="flex-1 flex-row items-center justify-center rounded-full bg-[#C8102E] py-[18px]"
                style={{
                  shadowColor: '#C8102E',
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 4,
                }}
              >
                <Text className="mr-2 text-[16px] font-bold text-white">Next</Text>
                <Feather name="arrow-right" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
