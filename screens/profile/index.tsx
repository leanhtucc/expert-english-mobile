import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import React, { useState } from 'react';
import { Platform, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

import {
  IconCertificates,
  IconLearningGoal,
  IconPLay,
  IconStreakProfile,
  IconXp,
} from '@/components/icon';
import {
  formatXP,
  mockCertificates,
  mockLearningGoal,
  mockLearningStats,
  mockProfileData,
  mockUserProfile,
} from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

import { MenuRow, StatCard } from './components';
import { ACCENT, BLUE, GOLD, ORANGE } from './profile.constants';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const [darkMode, setDarkMode] = useState(mockProfileData.darkAppearance);

  const user = mockUserProfile;
  const stats = mockLearningStats;
  const goal = mockLearningGoal;
  const certs = mockCertificates;

  const totalMastered = certs.reduce((acc, c) => acc + c.masteredCategories, 0);
  const bgColor = isDark ? '#12131A' : '#F5F6FA';
  const textPrimary = isDark ? '#FFFFFF' : '#1A1A2E';
  const textSecondary = '#8A8FA8';

  return (
    <View className="flex-1" style={{ backgroundColor: bgColor }}>
      <View
        className="flex-row items-center justify-between px-4 pb-3"
        style={{ paddingTop: insets.top + 8 }}
      >
        <TouchableOpacity className="h-10 w-10 items-center justify-center" activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={textPrimary} />
        </TouchableOpacity>

        <Text className="text-lg font-bold tracking-wide" style={{ color: textPrimary }}>
          My Profile
        </Text>

        <TouchableOpacity className="h-10 w-10 items-center justify-center" activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={24} color={textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* ── Avatar ── */}
        <View className="mt-2 mb-6 items-center">
          <View className="relative mb-3">
            <View
              className="h-24 w-24 items-center justify-center rounded-full border-[3px]"
              style={{ borderColor: ACCENT }}
            >
              {user.avatar ? (
                <View className="relative h-[86px] w-[86px] overflow-hidden rounded-full">
                  {Platform.OS === 'web' ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: 86, height: 86, objectFit: 'cover' }}
                    />
                  ) : (
                    <Image
                      source={{ uri: user.avatar }}
                      contentFit="cover"
                      className="h-[86px] w-[86px]"
                    />
                  )}
                </View>
              ) : (
                <View
                  className="h-[86px] w-[86px] items-center justify-center rounded-full"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Ionicons name="person" size={44} color="#FFFFFF" />
                </View>
              )}
            </View>
            <View
              className="absolute bottom-0 left-20 rounded-full px-3 py-1"
              style={{ backgroundColor: ACCENT, transform: [{ translateX: -50 }] }}
            >
              <Text
                className="text-[10px] font-extrabold tracking-widest"
                style={{ color: '#FFFFFF' }}
              >
                LEVEL {user.level}
              </Text>
            </View>
          </View>

          <Text className="mb-1 text-[22px] font-bold" style={{ color: textPrimary }}>
            {user.name}
          </Text>
          <Text className="text-[13px]" style={{ color: '#8A8FA8' }}>
            {user.track} • {user.proficiency}
          </Text>
        </View>

        <View className="mx-4 mb-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold" style={{ color: textPrimary }}>
              Learning Stats
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-base font-semibold" style={{ color: ACCENT }}>
                Details
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between gap-1">
            <StatCard
              value={formatXP(stats.totalXP)}
              label="TOTAL XP"
              isDark={isDark}
              icon={<IconXp width={24} height={24} color={GOLD} />}
            />
            <StatCard
              value={stats.wordsLearned.toString()}
              label="WORDS"
              isDark={isDark}
              icon={<MaterialCommunityIcons name="translate" size={24} color={BLUE} />}
            />
            <StatCard
              value={stats.streakDays.toString()}
              label="STREAK"
              isDark={isDark}
              icon={<IconStreakProfile width={24} height={24} color={ORANGE} />}
            />
          </View>
        </View>

        <View className="mx-4 mb-4 overflow-hidden rounded-2xl shadow-sm">
          <MenuRow
            isDark={isDark}
            icon={
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: '#FFE8EA' }}
              >
                <IconLearningGoal width={20} height={20} color={ACCENT} />
              </View>
            }
            label="Learning Goal"
            subtitle={`${goal.wordsPerDay} words per day • ${goal.mode}`}
            right={<Ionicons name="chevron-forward" size={20} color={textSecondary} />}
          />

          <View
            className="ml-[68px] h-px"
            style={{ backgroundColor: isDark ? '#2A2C36' : '#F0F1F5' }}
          />

          <MenuRow
            isDark={isDark}
            icon={
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: '#E8F0FF' }}
              >
                <IconCertificates width={20} height={20} color={BLUE} />
              </View>
            }
            label="Certificates"
            subtitle={`${totalMastered} Mastered Categories`}
            right={<Ionicons name="chevron-forward" size={20} color={textSecondary} />}
          />

          <View
            className="ml-[68px] h-px"
            style={{ backgroundColor: isDark ? '#2A2C36' : '#F0F1F5' }}
          />

          <MenuRow
            isDark={isDark}
            icon={
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: '#EDE8FF' }}
              >
                <Ionicons name="moon" size={20} color="#7B5CF6" />
              </View>
            }
            label="Dark Appearance"
            subtitle="Reduce eye strain"
            right={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#D1D5DB', true: ACCENT }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D5DB"
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              />
            }
          />
        </View>
      </ScrollView>

      <View
        className="absolute left-0 right-0 flex bg-transparent px-4 pt-3"
        style={{ bottom: insets.bottom + 80, paddingBottom: 16 }}
      >
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-2xl py-[18px]"
          activeOpacity={0.85}
          style={{
            backgroundColor: ACCENT,
            shadowColor: ACCENT,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text
            className="text-[15px] font-extrabold tracking-[1.5px]"
            style={{ color: '#FFFFFF' }}
          >
            CONTINUE LEARNING
          </Text>
          <View style={{ marginLeft: 8 }}>
            <IconPLay width={16} height={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
