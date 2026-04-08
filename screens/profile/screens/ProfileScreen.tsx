import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import {
  IconCertificates,
  IconMoon,
  IconSignOut,
  IconStreakRed,
  IconWordRed,
  IconXpRed,
} from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useProfile } from '@/hooks/useProfile';
import { useAppStore } from '@/stores';

import {
  AvatarSection,
  LearningGoalCard,
  MenuRow,
  ProfileHeader,
  SkillProficiency,
  StatCard,
} from '../components';
import { ConfirmModal } from '../components/ConfirmModal';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const { user, stats, goal, logout } = useProfile();
  const setTheme = useAppStore(state => state.setTheme);
  const { colors, isDark } = useAppTheme();

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogoutConfirm = async () => {
    setLogoutModalVisible(false);

    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    });
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ProfileHeader title="Hồ sơ" onBack={() => navigation.goBack()} onShare={() => {}} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <AvatarSection
          avatar={user.avatar}
          name={user.name}
          email={user.email}
          level={user.level}
          onEdit={() => navigation.navigate('PersonalInformationScreen')}
        />
        <View className="mx-4 mb-4 flex-row justify-between">
          <View className="w-[31%]">
            <StatCard
              icon={<IconStreakRed width={26} height={26} color="#E53935" />}
              value={stats.streakDays.toString()}
              label="NGÀY"
              isDark={false}
            />
          </View>

          <View className="w-[31%]">
            <StatCard
              icon={<IconWordRed width={26} height={26} color="#4A90D9" />}
              value={stats.wordsLearned.toString()}
              label="TỪ"
              isDark={isDark}
            />
          </View>

          <View className="w-[31%]">
            <StatCard
              icon={<IconXpRed width={26} height={26} color="#F5A623" />}
              value={stats.totalXP.toString()}
              label="XP"
              isDark={isDark}
            />
          </View>
        </View>
        <View className="mx-4">
          <Text className="mb-4 text-[20px] font-extrabold" style={{ color: colors.text }}>
            Mục tiêu học tập
          </Text>
          <LearningGoalCard
            minutes={goal.minutesPerDay}
            progress={goal.progress}
            onChange={() => {}}
          />
        </View>
        <View className="mx-4 mb-5 mt-2">
          <SkillProficiency />
        </View>
        <View
          className="mx-4 mb-1 overflow-hidden rounded-3xl shadow-sm"
          style={{ backgroundColor: colors.card }}
        >
          <MenuRow
            icon={
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#F0F5FF]">
                <IconCertificates width={22} height={22} color="#4A90D9" />
              </View>
            }
            label="Chứng chỉ"
            subtitle="0 danh mục đã hoàn thành"
            onPress={() => {
              navigation.navigate('Certificates');
            }}
            isDark={false}
          />
        </View>

        <View
          className="mx-4 mb-8 mt-4 overflow-hidden rounded-3xl shadow-sm"
          style={{ backgroundColor: colors.card }}
        >
          <View className="ml-[60px] h-[1px]" style={{ backgroundColor: colors.borderMuted }} />

          <MenuRow
            icon={<IconMoon width={24} height={24} color="#4A5568" />}
            label="Chế độ tối"
            showChevron={false}
            right={
              <TouchableOpacity
                onPress={() => setTheme(isDark ? 'light' : 'dark')}
                activeOpacity={0.85}
                style={{
                  width: 50,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: isDark ? '#4CAF50' : '#E2E8F0',
                  justifyContent: 'center',
                  alignItems: isDark ? 'flex-start' : 'flex-end',
                  paddingHorizontal: 2,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.surfaceElevated,
                  }}
                />
              </TouchableOpacity>
            }
            isDark={isDark}
          />

          <View className="h-[1px] w-full" style={{ backgroundColor: colors.borderMuted }} />

          <MenuRow
            icon={<IconSignOut width={24} height={24} color="#E53935" />}
            label="Đăng xuất"
            textColor="#E53935"
            showChevron={false}
            onPress={() => setLogoutModalVisible(true)}
            isDark={isDark}
          />
        </View>
      </ScrollView>
      <ConfirmModal
        visible={isLogoutModalVisible}
        icon={<IconSignOut width={45} height={45} color="#FF3B30" />}
        title="Đăng xuất"
        description="Bạn có chắc muốn đăng xuất khỏi thiết bị này không?"
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogoutConfirm}
      />
    </View>
  );
}
