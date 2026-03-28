import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import {
  IconCertificates,
  IconMoon,
  IconSignOut,
  IconStreakRed,
  IconWordRed,
  IconXpRed,
} from '@/components/icon';
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
  const theme = useAppStore(state => state.theme);
  const setTheme = useAppStore(state => state.setTheme);
  const isDark = theme === 'dark';

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
    <View className="flex-1 bg-[#FFFFFF]">
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
              isDark={false}
            />
          </View>

          <View className="w-[31%]">
            <StatCard
              icon={<IconXpRed width={26} height={26} color="#F5A623" />}
              value={stats.totalXP.toString()}
              label="XP"
              isDark={false}
            />
          </View>
        </View>
        <View className="mx-4">
          <Text className="mb-4 text-[20px] font-extrabold text-[#0F172A]">Mục tiêu học tập</Text>
          <LearningGoalCard
            minutes={goal.minutesPerDay}
            progress={goal.progress}
            onChange={() => {}}
          />
        </View>
        <View className="mx-4 mb-5 mt-2">
          <SkillProficiency />
        </View>
        <View className="mx-4 mb-1 overflow-hidden rounded-3xl bg-white shadow-sm">
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

        <View className="mx-4 mb-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <View className="ml-[60px] h-[1px] bg-gray-100" />

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
                    backgroundColor: '#fff',
                  }}
                />
              </TouchableOpacity>
            }
            isDark={false}
          />

          <View className="h-[1px] w-full bg-gray-100" />

          <MenuRow
            icon={<IconSignOut width={24} height={24} color="#E53935" />}
            label="Đăng xuất"
            textColor="#E53935"
            showChevron={false}
            onPress={() => setLogoutModalVisible(true)}
            isDark={false}
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
