import { Feather, Ionicons } from '@expo/vector-icons';

// Thêm dòng này

import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconConceptVocab } from '@/components/icon';

// --- MÀU SẮC CHỦ ĐẠO TỪ THIẾT KẾ ---
const COLORS = {
  bg: '#FFF8F7',
  cardBg: '#FFFFFF',
  primary: '#C1121F',
  iconBgLight: '#FFF8F7',
  primaryLight: '#FECACA',
  textDark: '#2B2121',
  textGray: '#8C8281',
  lockedBg: '#F3F4F6',
  lockedText: '#A19B9A',
};

// --- COMPONENTS PHỤ ---

// 1. Header Màn hình
const Header = ({ title, onBack }: { title: string; onBack: () => void }) => (
  <View className="flex-row items-center justify-between px-5 pb-4 pt-2">
    <TouchableOpacity
      activeOpacity={0.7}
      className="h-10 w-10 justify-center"
      onPress={onBack} // Gọi hàm onBack khi bấm
    >
      <Feather name="chevron-left" size={28} color={COLORS.textDark} />
    </TouchableOpacity>
    <Text className="text-[18px] font-extrabold" style={{ color: COLORS.textDark }}>
      {title}
    </Text>
    <View className="h-10 w-10" />
  </View>
);

// 2. Thẻ Tiêu đề Section (Vocabulary, Speaking...)
const SectionHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <View className="mb-4 mt-2 flex-row items-center rounded-2xl border border-[#FFE9E8] bg-white p-2.5 pr-4">
    <View
      className="mr-3 h-10 w-10 items-center justify-center rounded-full"
      style={{ backgroundColor: COLORS.iconBgLight }}
    >
      {icon}
    </View>
    <View className="flex-1 justify-center">
      <Text className="text-[14px] font-bold" style={{ color: COLORS.textDark }}>
        {title}
      </Text>
      <Text className="mt-0.5 text-[11px] leading-[14px]" style={{ color: COLORS.textGray }}>
        {subtitle}
      </Text>
    </View>
  </View>
);

// 3. Item Bài học
type LessonStatus = 'completed' | 'current' | 'locked';

const LessonItem = ({
  status,
  title,
  desc,
}: {
  status: LessonStatus;
  title: string;
  desc: string;
}) => {
  const isLocked = status === 'locked';

  return (
    <View className="relative z-10 mb-6 flex-row">
      <View className="mr-2 w-12 items-center">
        {status === 'completed' && (
          <View
            className="z-10 h-10 w-10 items-center justify-center rounded-full border-[3px] border-white shadow-sm"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Feather name="check" size={16} color="white" />
          </View>
        )}
        {status === 'current' && (
          <View
            className="z-10 h-10 w-10 items-center justify-center rounded-full border-[4px]"
            style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primaryLight }}
          />
        )}
        {status === 'locked' && (
          <View
            className="z-10 h-10 w-10 items-center justify-center rounded-full border-[3px] border-white"
            style={{ backgroundColor: COLORS.lockedBg }}
          >
            <Feather name="lock" size={16} color="#9CA3AF" />
          </View>
        )}
      </View>

      <View className="flex-1 pt-0.5">
        <Text
          className={`text-[14px] font-bold ${isLocked ? 'text-gray-400' : ''}`}
          style={{ color: isLocked ? COLORS.lockedText : COLORS.textDark }}
        >
          {title}
        </Text>
        <Text
          className="mt-1 text-[12px] leading-relaxed"
          style={{ color: isLocked ? '#C4C0BF' : COLORS.textGray }}
        >
          {desc}
        </Text>
      </View>
    </View>
  );
};

// --- MÀN HÌNH CHÍNH ---

export default function DetailedDayScreen({ navigation }: { navigation: any }) {
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Truyền hàm xử lý vào prop onBack */}
      <Header title="Day 1: Fundamentals" onBack={handleBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <View
          className="mb-8 rounded-[32px] bg-white p-6"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.04,
            shadowRadius: 24,
            elevation: 5,
          }}
        >
          <Text className="mb-3 text-[22px] font-extrabold" style={{ color: COLORS.textDark }}>
            Today’s Challenge
          </Text>
          <Text className="mb-8 text-[14px] leading-[22px]" style={{ color: COLORS.textGray }}>
            Welcome to your personalized daily mix. We&apos;ve curated a series of dynamic exercises
            specifically designed for your current level.
          </Text>

          <SectionHeader
            icon={<IconConceptVocab width={20} height={20} color={COLORS.primary} />}
            title="Vocabulary & Concepts"
            subtitle="Dynamic cards & context quizzes"
          />

          <View className="relative mt-2">
            <View className="absolute bottom-[30px] left-[23px] top-[10px] z-0 w-[1.5px] bg-gray-100" />

            <LessonItem
              status="completed"
              title="1. Basic Operations"
              desc="Core verbs and essential workflows."
            />
            <LessonItem
              status="current"
              title="2. Warehouse Terms"
              desc="Inventory, racking, and storage types."
            />
            <LessonItem
              status="locked"
              title="3. Transportation"
              desc="Modes of transit and freight docs."
            />
            <LessonItem
              status="locked"
              title="4. Communication"
              desc="Modes of transit and freight docs."
            />
          </View>

          <View className="mt-2">
            <SectionHeader
              icon={<Feather name="mic" size={18} color={COLORS.primary} />}
              title="Situational Speaking"
              subtitle="Real-time tone & fluency practice"
            />

            <View className="relative mt-2">
              <View className="absolute bottom-[30px] left-[23px] top-[10px] z-0 w-[1.5px] bg-gray-100" />

              <LessonItem
                status="locked"
                title="1. Checking Status"
                desc="Communicating with vendors about orders."
              />
              <LessonItem
                status="locked"
                title="2. Handling Delays"
                desc="Professional ways to announce setbacks."
              />
            </View>
          </View>

          {/* FOOTER: AI Note */}
          <View className="mt-2 flex-row items-center border-t border-[#FFE1E0] pt-5">
            <View className="mr-4 flex-row items-center pl-1">
              <View className="z-10 h-9 w-9 items-center justify-center rounded-full bg-[#FFE9E8]">
                <Ionicons name="sparkles" size={14} color="#7A2D33" />
              </View>
              <View className="z-20 -ml-3 h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#FFE9E8]">
                <Text className="text-[11px] font-extrabold" style={{ color: '#000000' }}>
                  AI
                </Text>
              </View>
            </View>

            <Text className="flex-1 text-[12px] leading-4" style={{ color: '#5C4A48' }}>
              Exercises are generated in real-time based on your previous performance and learning
              goals.
            </Text>
          </View>
        </View>

        <View className="mb-8 px-2">
          <View className="mb-3 flex-row items-end justify-between">
            <Text
              className="text-[11px] font-extrabold uppercase tracking-widest"
              style={{ color: COLORS.primary }}
            >
              Daily Milestone
            </Text>
            <Text className="text-[12px] font-bold" style={{ color: COLORS.textDark }}>
              0/15 mins
            </Text>
          </View>

          <View className="h-[6px] w-full overflow-hidden rounded-full bg-[#FCE5E6]">
            <View className="h-full rounded-full bg-[#C1121F]" style={{ width: '5%' }} />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          className="w-full flex-row items-center justify-center rounded-[20px] py-4"
          style={{
            backgroundColor: COLORS.primary,
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
          onPress={() => {
            navigation.navigate('VocabularyListScreen');
          }}
        >
          <Text className="mr-2 text-[18px] font-bold text-white">Start Challenge</Text>
          <Ionicons name="flash" size={18} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
