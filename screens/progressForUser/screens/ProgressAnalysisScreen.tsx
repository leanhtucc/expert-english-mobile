import { Feather } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconCheckVocab, IconNextButtonBlack, IconSpeedSpeaking } from '@/components/icon';

import { PerformanceCard } from '../components/PerformanceCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressChart } from '../components/ProgressChart';
import { useProgress } from '../hooks/useProgress';

const SPEAKING_PERCENT_DATA = [
  { day: 'MON', value: 72 },
  { day: 'TUE', value: 82 },
  { day: 'WED', value: 78 },
  { day: 'THU', value: 83 },
  { day: 'FRI', value: 85 },
  { day: 'SAT', value: 83 },
  { day: 'SUN', value: 78 },
];

export const ProgressAnalysisScreen = ({ navigation }: any) => {
  const { data, loading } = useProgress();

  if (loading || !data) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#F6F3F2]">
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="h-10 w-10 justify-center">
          <Feather name="arrow-left" size={24} color="#2B1D1D" />
        </TouchableOpacity>
        <Text className="text-[18px] font-extrabold text-[#2B1D1D]">Analysis</Text>
        <View className="h-10 w-10" />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mt-2 text-[11px] font-extrabold tracking-widest text-[#D90429]">
          PERFORMANCE REPORT
        </Text>

        <Text className="mb-6 mt-1 text-[32px] font-extrabold text-[#2B1D1D]">
          Vốn từ vựng bứt phá
        </Text>

        <PerformanceCard
          words={data.totalWords}
          increase={data.wordsIncrease}
          chartData={data.weeklyProgress}
        />

        <View
          className="mb-8 rounded-[24px] bg-white p-5 shadow-sm"
          style={{
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
          }}
        >
          <View className="mb-4 flex-row items-center">
            <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#FFF0F0]">
              <IconSpeedSpeaking width={20} height={20} color="#D90429" />
            </View>
            <View className="flex-1">
              <Text className="text-[18px] font-extrabold text-[#2B1D1D]">
                {`Kỹ năng Nói tăng +${data.skillIncrease}%!`}
              </Text>
              <Text className="mt-1 text-[13px] leading-5 text-[#7A6F6F]">
                Bạn đang có sự tiến bộ vượt bậc ở khả năng phản xạ và phát âm.
              </Text>
            </View>
          </View>

          {data.skillStats.map((skill, index) => (
            <View
              key={skill.id}
              className={`flex-row items-center justify-between rounded-2xl bg-[#FFF0EF] py-4 px-4 ${index !== data.skillStats.length - 1 ? 'mb-3' : ''}`}
            >
              <View className="flex-row items-center">
                <IconCheckVocab width={16} height={16} color="#D90429" />
                <Text className="ml-2 text-[14px] font-bold text-[#2B1D1D]">
                  {skill.name} <Text className="font-normal text-[#7A6F6F]">({skill.nameEn})</Text>
                </Text>
              </View>
              <Text className="text-[14px] font-bold text-[#D90429]">{`+${skill.percent}%`}</Text>
            </View>
          ))}

          <View className="mt-6">
            <ProgressChart
              data={SPEAKING_PERCENT_DATA}
              height={80}
              hideDots={false}
              showPercentSign={true}
              highlightIndex={4}
            />
          </View>
        </View>

        <PrimaryButton
          title="Tiếp tục"
          icon={<IconNextButtonBlack width={16} height={16} />}
          variant="secondary"
          rounded="2xl"
          onPress={() => navigation.navigate('WeekUnlock')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
