import { Feather } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconRoadmap, ImageMascoNewRoadmap } from '@/components/icon';

import { PrimaryButton } from '../components/PrimaryButton';
import { WeekTimeline } from '../components/WeekTimeline';
import { useProgress } from '../hooks/useProgress';

// eslint-disable-next-line no-empty-pattern
export const WeekUnlockScreen = ({}: any) => {
  const { data, loading } = useProgress();

  if (loading || !data) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F7]">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Robot Image Card */}
        <View className="mt-6 mb-6 h-[280px] w-full items-center justify-center overflow-hidden shadow-lg">
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

        <Text className="mb-4 text-[16px] font-extrabold text-[#2B1D1D]">Bài học tuần 2</Text>

        {/* ========================================== */}
        {/* TRỤC DỌC BÀI HỌC (VERTICAL TIMELINE) */}
        {/* ========================================== */}
        <View className="mb-8 pl-1">
          {data.weeklyLessons.map((lesson, index) => {
            const isLast = index === data.weeklyLessons.length - 1;

            return (
              <View key={lesson.id} className="mb-4 flex-row">
                {/* Cột Timeline bên trái - Tăng w-8 -> w-12 để chứa chấm to hơn */}
                <View className="relative mr-4 w-12 items-center">
                  {/* Đường dọc nối (Nằm dưới z-0) */}
                  {!isLast && (
                    // Điều chỉnh top-[36px] để đường kẻ xuất phát từ tâm của dấu chấm to 48px
                    <View className="absolute top-[36px] bottom-[-24px] z-0 w-[2px] bg-[#E5E7EB]" />
                  )}

                  {/* Dấu chấm: PHÓNG TO ĐÁNG KỂ (Viền hồng h-12 w-12 (~48px), lõi đỏ h-30 w-30) */}
                  {/* Điều chỉnh mt-[12px] để canh lề trên phù hợp với kích thước mới */}
                  <View className="z-10 mt-[12px] h-12 w-12 items-center justify-center rounded-full bg-[#FCE4E4]">
                    <View className="h-[35px] w-[35px] rounded-full bg-[#C8102E]" />
                  </View>
                </View>

                {/* Nội dung bài học */}
                <View
                  className={`flex-1 rounded-[16px] p-4 ${
                    lesson.isToday ? 'border border-[#C6102E33] bg-white' : 'bg-transparent'
                  }`}
                  style={
                    lesson.isToday
                      ? {
                          elevation: 3,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.06,
                          shadowRadius: 12,
                        }
                      : {}
                  }
                >
                  <Text
                    className={`text-[11px] font-extrabold uppercase tracking-widest ${
                      lesson.isToday ? 'text-[#C8102E]' : 'text-[#A19B9A]'
                    }`}
                  >
                    {`${lesson.day} • ${lesson.date}`}
                  </Text>
                  <Text
                    className={`mt-1 text-[16px] font-bold ${
                      lesson.isToday ? 'text-[#1F2937]' : 'text-[#9CA3AF]'
                    }`}
                  >
                    {lesson.title}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        {/* ========================================== */}

        {/* Nút bấm */}
        <PrimaryButton
          title="Bắt đầu ngay"
          icon={<Feather name="arrow-right" size={18} color="white" />}
          onPress={() => console.log('Bắt đầu bài học')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
