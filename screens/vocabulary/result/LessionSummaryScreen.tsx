import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { LinearGradient } from 'expo-linear-gradient';

// <-- Import Gradient

import { IconLearningGoal, IconStreakRed, ImageResultLession } from '@/components/icon';

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
  onClose?: () => void;
}

export const LessonSummaryScreen: React.FC<LessonSummaryScreenProps> = ({
  data,
  onRestart,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const accentColor = '#D32F2F';
  const radarCenter = 130;
  const radarRadius = 80;
  const angles = [
    -Math.PI / 2,
    -Math.PI / 2 + (2 * Math.PI) / 5,
    -Math.PI / 2 + (4 * Math.PI) / 5,
    -Math.PI / 2 + (6 * Math.PI) / 5,
    -Math.PI / 2 + (8 * Math.PI) / 5,
  ];

  const radarData = [
    { label: 'Pronunciation', value: 85, dotColor: '#10B981' },
    { label: 'Relevance', value: 85, dotColor: '#F97316' },
    { label: 'Vocabulary', value: 68, dotColor: '#10B981' },
    { label: 'Grammar', value: 94, dotColor: '#F97316' },
    { label: 'Fluency', value: 72, dotColor: '#10B981' },
  ];

  const webs = [1, 0.8, 0.6, 0.4, 0.2].map(scale =>
    angles
      .map(
        a =>
          `${radarCenter + radarRadius * scale * Math.cos(a)},${radarCenter + radarRadius * scale * Math.sin(a)}`
      )
      .join(' ')
  );

  const dataPoints = radarData.map((item, i) => ({
    x: radarCenter + radarRadius * (item.value / 100) * Math.cos(angles[i]),
    y: radarCenter + radarRadius * (item.value / 100) * Math.sin(angles[i]),
    ...item,
  }));
  return (
    // Đổi thẻ bao ngoài cùng thành View để cấu hình nền tổng
    <View className="flex-1 bg-[#F9FAFB]">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

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
            paddingBottom: insets.bottom + 40,
          }}
        >
          {/* Header */}
          <View className="mb-10 w-full flex-row items-center">
            {/* Nút Close bọc trong hình tròn trắng giống Figma */}
            <TouchableOpacity
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm"
            >
              <MaterialIcons name="close" size={24} color="#0F172A" />
            </TouchableOpacity>

            {/* Chữ Header viết hoa và in đậm */}
            <View className="mr-[40px] flex-1 items-center">
              <Text className="text-[16px] font-extrabold uppercase tracking-wider text-[#C6102E]">
                Lesson Summary
              </Text>
            </View>
          </View>

          {/* Mascot/Character */}
          <View className="mb-16">
            <View className="h-[220px] w-[220px] items-center justify-center rounded-full bg-[#FFE4E6]/50">
              <ImageResultLession width={260} height={260} />
            </View>
          </View>

          <Text className="mb-2 text-center text-3xl font-bold text-[#0F172A]">Spectacular!</Text>

          <Text className="mb-10 text-center text-[15px] text-[#64748B]">
            You&apos;ve mastered <Text className="font-bold text-[#C6102E]">15 new</Text> industry
            terms.
          </Text>

          {/* Stats Row */}
          <View className="mb-8 w-full flex-row justify-between px-1">
            <ResultStatCard
              className="mx-1.5 flex-1"
              icon={<IconStreakRed width={24} height={24} />}
              label="STREAK" // Sửa lại thành in hoa cho giống thiết kế
              value={data.streak ?? data.totalWords}
              valueOnTop={true}
            />

            <ResultStatCard
              className="mx-1.5 flex-1"
              icon={<IconLearningGoal width={24} height={24} />}
              label="ACCURACY"
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
          <View className="items-center justify-center">
            <Svg width={260} height={260}>
              {webs.map((points, index) => (
                <Polygon
                  key={index}
                  points={points}
                  stroke="#F3F4F6"
                  strokeWidth="1.5"
                  fill="none"
                />
              ))}
              {angles.map((angle, index) => (
                <Line
                  key={index}
                  x1={radarCenter}
                  y1={radarCenter}
                  x2={radarCenter + radarRadius * Math.cos(angle)}
                  y2={radarCenter + radarRadius * Math.sin(angle)}
                  stroke="#F3F4F6"
                  strokeWidth="1.5"
                />
              ))}
              <Polygon
                points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')}
                fill={accentColor}
                fillOpacity="0.1"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {dataPoints.map((point, index) => (
                <Circle key={index} cx={point.x} cy={point.y} r="4" fill={point.dotColor} />
              ))}
              {dataPoints.map((point, index) => {
                const textR = radarRadius + 28;
                return (
                  <SvgText
                    key={index}
                    x={radarCenter + textR * Math.cos(angles[index])}
                    y={radarCenter + textR * Math.sin(angles[index])}
                    fontSize="12"
                    fontWeight="600"
                    fill="#4B5563"
                    textAnchor="middle"
                  >
                    {point.label}
                    <SvgText
                      x={radarCenter + textR * Math.cos(angles[index])}
                      y={radarCenter + textR * Math.sin(angles[index]) + 16}
                      fontSize="13"
                      fontWeight="bold"
                      fill={accentColor}
                      textAnchor="middle"
                    >
                      {point.value}%
                    </SvgText>
                  </SvgText>
                );
              })}
            </Svg>
          </View>

          <View className="mt-auto w-full px-2">
            <TouchableOpacity
              onPress={onRestart}
              activeOpacity={0.8}
              className="flex-row items-center justify-center rounded-2xl bg-[#C6102E] px-5 py-[16px] shadow-md"
            >
              {/* <IconVoiceBlack width={20} height={20} className="mr-2" /> */}
              <MaterialIcons name="arrow-back" size={24} color="white" className="mr-2" />
              <Text className="ml-2 text-[17px] font-bold text-white">Go back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
