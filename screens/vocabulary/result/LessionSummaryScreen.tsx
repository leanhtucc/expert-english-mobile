import { Feather } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import {
  IconLearningGoal,
  IconStreakRed,
  IconVoiceBlack,
  ImageResultLession,
} from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

import { ResultStatCard } from '../components';

export interface LessonSummaryData {
  totalWords: number;
  accuracy: number;
  timeSpent: string;
  masteredWords?: number;
  streak?: number;
  weakWords?: number;
}

interface LessonSummaryScreenProps {
  data: LessonSummaryData;
  onRestart?: () => void;
  onReviewWeak?: () => void;
  onClose?: () => void; // Thường dùng để quay về Home
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  showRadarChart?: boolean;
}

export const LessonSummaryScreen: React.FC<LessonSummaryScreenProps> = ({
  data,
  onRestart,
  onClose,
  primaryActionText = 'Start Speaking',
  onPrimaryAction,
  showRadarChart = false,
}) => {
  const insets = useSafeAreaInsets();
  const { isDark } = useAppTheme();

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <LinearGradient
        colors={['#FFE4E6', '#F9FAFB']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 400,
        }}
      />

      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        <ScrollView
          className="w-full flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: insets.bottom + 20,
          }}
        >
          {/* Header */}
          <View className="mb-10 w-full flex-row items-center">
            <TouchableOpacity
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm"
            >
              <MaterialIcons name="close" size={24} color="#0F172A" />
            </TouchableOpacity>

            <View className="mr-[40px] flex-1 items-center">
              <Text className="text-[16px] font-extrabold uppercase tracking-wider text-[#C6102E]">
                Lesson Summary
              </Text>
            </View>
          </View>

          {/* Mascot */}
          <View className={showRadarChart ? 'mb-6' : 'mb-12'}>
            <View className="h-[200px] w-[200px] items-center justify-center rounded-full bg-[#FFE4E6]/50">
              <ImageResultLession width={220} height={220} />
            </View>
          </View>

          <Text className="mb-2 text-center text-4xl font-extrabold text-[#0F172A]">
            Spectacular!
          </Text>

          <Text className="mb-8 text-center text-[16px] text-[#64748B]">
            You spoke better than yesterday.
          </Text>

          {/* Stats Row */}
          <View className="mb-8 w-full flex-row justify-between px-1">
            <ResultStatCard
              className="mx-1.5 flex-1"
              icon={<IconStreakRed width={24} height={24} />}
              label="STREAK"
              value={data.totalWords}
              valueOnTop={true}
            />

            <ResultStatCard
              className="mx-1.5 flex-1"
              icon={<IconLearningGoal width={24} height={24} />}
              label="OVERALL"
              value={`${data.accuracy}%`}
              valueOnTop={true}
            />

            <ResultStatCard
              className="mx-1.5 flex-1"
              icon={<MaterialIcons name="timer" size={28} color="#C6102E" />}
              label="TIME"
              value={data.timeSpent}
              valueOnTop={true}
            />
          </View>
          {/* Status Card */}
          <View className="mb-8 w-full overflow-hidden rounded-[16px] bg-[#FFF0F2]">
            <View className="absolute bottom-0 left-0 top-0 w-[6px] bg-[#9E001F]" />
            <View className="flex-row items-center px-4 py-3 pl-5">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#FCE4E4]">
                <Feather name="mic" size={18} color="#9E001F" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-[14px] font-extrabold uppercase text-[#1E293B]">
                  CHECKING STATUS
                </Text>
                <Text className="mt-0.5 text-[13px] text-[#64748B]">
                  Communicating with vendors about orders.
                </Text>
              </View>
            </View>
          </View>

          {/* Actions Container */}
          <View className="mt-auto w-full items-center px-2">
            <TouchableOpacity
              onPress={onPrimaryAction || onRestart}
              activeOpacity={0.8}
              className="w-full flex-row items-center justify-center rounded-[20px] bg-[#C6102E] px-5 py-[18px] shadow-md"
            >
              {primaryActionText === 'Start Speaking' && (
                <IconVoiceBlack width={20} height={20} className="mr-2" />
              )}
              <Text className="text-[18px] font-bold text-white">{primaryActionText}</Text>
              {primaryActionText !== 'Start Speaking' && (
                <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} className="mt-6 py-2" activeOpacity={0.6}>
              <Text className="text-[16px] font-bold uppercase tracking-widest text-[#64748B]">
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
