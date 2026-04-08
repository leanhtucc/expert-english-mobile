import { Feather } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { IconRoadmap, IconUpload, ImageMascoNewRoadmap } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

import { PrimaryButton } from '../components/PrimaryButton';
import { WeekTimeline } from '../components/WeekTimeline';
import { useProgress } from '../hooks/useProgress';

export const WeekUnlockScreen = ({ navigation }: any) => {
  const { data, loading } = useProgress();
  const { isDark } = useAppTheme();

  if (loading || !data) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F7]">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Robot Image Card */}
        <View className="mb-6 mt-6 h-[280px] w-full items-center justify-center overflow-hidden shadow-lg">
          <ImageMascoNewRoadmap width={300} height={300} />
        </View>

        <Text className="mb-6 text-center text-[32px] font-extrabold text-[#2B1D1D]">
          Tuần 2 đã mở khóa!
        </Text>

        {/* Lộ trình 4 tuần (Ngang) */}
        <View
          className="mb-8 rounded-[24px] bg-[#FFF0EF] p-5 pt-6 shadow-sm"
          style={{
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
          }}
        >
          <View className="mb-2 flex-row items-center">
            <IconRoadmap width={20} height={20} color="#C8102E" />
            <Text className="ml-2 text-[16px] font-extrabold text-[#2B1D1D]">Lộ trình 4 tuần</Text>
          </View>
          <WeekTimeline items={data.weekTimeline} />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-10 w-full items-center justify-center rounded-[24px] bg-transparent py-10"
          style={{
            borderWidth: 2,
            borderColor: '#D1A3A4', // Màu hồng xám nhạt như thiết kế
            borderStyle: 'dashed', // 🌟 Ép cứng nét đứt bằng style của React Native
          }}
        >
          <View className="mb-4 h-[60px] w-[60px] items-center justify-center rounded-full bg-[#FFF0EF]">
            <IconUpload width={33} height={33} color="#C8102E" />
          </View>
          <Text className="mb-2 text-[17px] font-extrabold text-[#2B1D1D]">Nhấn để tải lên</Text>
          <Text className="text-[13px] font-medium text-[#7A6F6F]">
            Hỗ trợ PDF, DOCX, hoặc PPT (Tối đa 20MB)
          </Text>
        </TouchableOpacity>
        {/* ========================================== */}

        {/* Nút bấm */}
        <PrimaryButton
          title="Tiếp tục tạo lộ trình"
          icon={<Feather name="arrow-right" size={20} color="white" />}
          buttonHeight={60}
          onPress={() => navigation.navigate('RenewalScreen')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
