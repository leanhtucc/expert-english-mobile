import { Feather } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import ImageSessionSummary from '@/assets/svgs/output/ImageSessionSummary';

import { ResultStatCard } from '../components';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export interface LessonSummaryData {
  totalWords: number;
  accuracy: number;
  timeSpent: string;
}

interface LessonSummaryScreenProps {
  data: LessonSummaryData;
  onRestart?: () => void;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  onClose?: () => void;
}

export const SessonSummaryScreen: React.FC<LessonSummaryScreenProps> = ({
  data,
  onRestart,
  onPrimaryAction,
  primaryActionText = 'Start Quiz',
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const handleGoHome = () => {
    if (onClose) onClose();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent={false} />

      <ScrollView
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: insets.bottom + 24,
        }}
      >
        {/* Nút Tắt */}
        <View className="mb-8 w-full flex-row items-center">
          <TouchableOpacity onPress={handleGoHome} className="-ml-2 p-2">
            <Feather name="x" size={28} color="#0F172A" />
          </TouchableOpacity>
          <View className="mr-[30px] flex-1 items-center">
            <Text className="text-[18px] font-bold text-[#0F172A]">Session Summary</Text>
          </View>
        </View>

        {/* Mascot */}
        <View className="mb-6 items-center">
          <View className="h-[180px] w-[180px] items-center justify-center">
            <ImageSessionSummary width={360} height={360} />
          </View>
        </View>

        {/* Lời chúc */}
        <Text className="mb-3 text-center text-[28px] font-extrabold leading-9 text-[#0F172A]">
          Great job finishing the flashcards!
        </Text>

        <Text className="mb-8 px-4 text-center text-[16px] leading-6 text-[#64748B]">
          Time to review and lock these words into your memory.
        </Text>

        {/* 3 Thẻ thống kê */}
        <View className="mb-10 w-full flex-row justify-between">
          <ResultStatCard
            className="mx-1.5 flex-1"
            icon={<MaterialIcons name="school" size={24} color="#C8102E" />}
            label="Words"
            value={data.totalWords}
          />
          <ResultStatCard
            className="mx-1.5 flex-1"
            icon={<MaterialIcons name="verified" size={24} color="#C8102E" />}
            label="Accuracy"
            value={`${data.accuracy}%`}
          />
          <ResultStatCard
            className="mx-1.5 flex-1"
            icon={<MaterialIcons name="timer" size={24} color="#C8102E" />}
            label="Time"
            value={data.timeSpent}
          />
        </View>

        {/* Dải nút bấm dưới cùng */}
        <View className="mt-auto w-full">
          {/* Nút Restart Flashcards */}
          <SecondaryButton
            onPress={onRestart}
            label="Restart Flashcards"
            subtitle="Go through the full deck again"
            className="mb-4 rounded-[24px] border border-slate-200 shadow-sm"
            style={{ backgroundColor: '#FFFFFF' }}
            icon={
              <View className="mr-3 h-[48px] w-[48px] items-center justify-center rounded-full bg-[#FFF0F1]">
                <Feather name="rotate-cw" size={20} color="#C8102E" />
              </View>
            }
            rightIcon={<Feather name="chevron-right" size={24} color="#9CA3AF" />}
          />

          {/* Nút Start Quiz (Chuyển sang làm bài tập) */}
          <PrimaryButton
            onPress={onPrimaryAction ?? (() => {})}
            label={primaryActionText}
            className="rounded-[24px] py-[18px]"
            rightIcon={<Feather name="arrow-right" size={22} color="#FFF" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
