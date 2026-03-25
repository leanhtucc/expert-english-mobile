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
    <SafeAreaView className="flex-1 bg-[#F6F3F2]">
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

        <View
          className="mb-6 rounded-[24px] bg-white p-5 shadow-sm"
          style={{
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
          }}
        >
          <View className="mb-2 flex items-center justify-center">
            <IconRoadmap width={20} height={20} />
            <Text className="ml-2 text-[15px] font-extrabold text-[#2B1D1D]">Lộ trình 4 tuần</Text>
          </View>
          <WeekTimeline items={data.weekTimeline} />
        </View>

        <Text className="mb-4 text-[15px] font-extrabold text-[#2B1D1D]">Bài học tuần 2</Text>

        {/* Vertical Timeline List */}
        <View className="mb-8">
          {data.weeklyLessons.map((lesson, index) => (
            <View key={lesson.id} className="mb-4 flex-row">
              {/* Cột Timeline */}
              <View className="relative mr-4 items-center">
                <View
                  className={`h-4 w-4 rounded-full ${lesson.isToday ? 'bg-[#D90429]' : 'border-4 border-white bg-[#D90429]/80 shadow-sm'}`}
                />
                {index !== data.weeklyLessons.length - 1 && (
                  <View className="absolute top-4 bottom-[-16px] w-[2px] bg-[#F0EAEA]" />
                )}
              </View>
              {/* Nội dung bài học */}
              <View
                className={`flex-1 rounded-[16px] p-4 ${lesson.isToday ? 'bg-white shadow-sm' : ''}`}
                style={
                  lesson.isToday
                    ? {
                        elevation: 2,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 8,
                      }
                    : {}
                }
              >
                <Text
                  className={`text-[10px] font-bold tracking-widest ${lesson.isToday ? 'text-[#D90429]' : 'text-[#7A6F6F]'}`}
                >
                  {lesson.day} • {lesson.date}
                </Text>
                <Text
                  className={`mt-1 text-[15px] font-bold ${lesson.status === 'locked' ? 'text-[#A19B9A]' : 'text-[#2B1D1D]'}`}
                >
                  {lesson.title}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <PrimaryButton
          title="Bắt đầu ngay"
          icon="arrow-right"
          onPress={() => console.log('Bắt đầu bài học')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
