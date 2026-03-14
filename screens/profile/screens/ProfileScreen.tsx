import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import {
  IconCertificates,
  IconClock,
  IconLessionFinish,
  IconPersonInfo,
  IconSignOut,
  IconStreak,
  IconWord,
  IconXp,
} from '@/components/icon';
import { useProfile } from '@/hooks/useProfile';

import {
  ActivityCard,
  AvatarSection,
  LearningGoalCard,
  MenuRow,
  ProfileHeader,
  StatCard,
} from '../components';
import { ConfirmModal } from '../components/ConfirmModal';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const { user, stats, goal, logout } = useProfile();
  const [darkMode, setDarkMode] = React.useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const handleLogoutConfirm = () => {
    setDeleteModalVisible(false);
    console.log('Đã xoá tài khoản!');
  };

  return (
    <View className="flex-1 bg-[#F8F6F6]">
      <ProfileHeader
        title="Profile"
        onBack={() => navigation.goBack()}
        onShare={() => {
          /* share logic */
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <AvatarSection
          avatar={user.avatar}
          name={user.name}
          email={user.email}
          level={user.level}
          onEdit={() => {
            /* edit logic */
          }}
        />
        <View className="mx-4 mb-4 flex-row justify-between">
          <View className="w-[31%]">
            <StatCard
              icon={<IconStreak width={26} height={26} color="#E53935" />}
              value={stats.streakDays.toString()}
              label="DAYS"
              isDark={false}
            />
          </View>

          <View className="w-[31%]">
            <StatCard
              icon={<IconWord width={26} height={26} color="#4A90D9" />}
              value={stats.wordsLearned.toString()}
              label="WORDS"
              isDark={false}
            />
          </View>

          <View className="w-[31%]">
            <StatCard
              icon={<IconXp width={26} height={26} color="#F5A623" />}
              value={stats.totalXP.toString()}
              label="XP"
              isDark={false}
            />
          </View>
        </View>
        <View className="mx-4 mb-5 mt-2">
          <Text className="mb-4 text-[20px] font-extrabold text-[#0F172A]">Activity Insights</Text>

          <ActivityCard
            icon={<IconClock width={20} height={20} color="#BE123C" />}
            title="Study Time"
            value={stats.studyMinutes + ' hrs'}
          />
          <ActivityCard
            icon={<IconLessionFinish width={20} height={20} color="#4A90D9" />}
            title="Lessons Finished"
            value={stats.lessonsFinished.toString()}
          />
        </View>
        <View className="mx-4">
          <Text className="mb-4 text-[20px] font-extrabold text-[#0F172A]">Learning Goal</Text>
          <LearningGoalCard
            minutes={goal.minutesPerDay}
            progress={goal.progress}
            onChange={() => {
              /* change goal logic */
            }}
          />
        </View>
        <View className="mx-4 mb-1 overflow-hidden rounded-3xl bg-white shadow-sm">
          <MenuRow
            icon={
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#F0F5FF]">
                <IconCertificates width={22} height={22} color="#4A90D9" />
              </View>
            }
            label="Certificates"
            subtitle="0 Mastered Categories"
            onPress={() => {
              /* navigate */
            }}
            isDark={false}
          />
        </View>

        <View className="mx-4 mb-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <MenuRow
            icon={<IconPersonInfo width={24} height={24} color="#4A5568" />}
            label="Personal information"
            onPress={() => navigation.navigate('PersonalInformationScreen')}
            isDark={false}
          />

          <View className="ml-[60px] h-[1px] bg-gray-100" />

          <MenuRow
            icon={<Ionicons name="moon-outline" size={24} color="#4A5568" />}
            label="Dark Appearance"
            showChevron={false}
            right={
              <TouchableOpacity
                onPress={() => setDarkMode(!darkMode)}
                activeOpacity={0.85}
                style={{
                  width: 50,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: darkMode ? '#4CAF50' : '#E2E8F0',
                  justifyContent: 'center',
                  alignItems: darkMode ? 'flex-start' : 'flex-end',
                  paddingHorizontal: 2,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#fff',
                    // Đã bỏ toàn bộ code shadow đi để nút phẳng y hệt như bản thiết kế Figma
                  }}
                />
              </TouchableOpacity>
            }
            isDark={false}
          />

          {/* Vạch kẻ ngang kéo dài hết */}
          <View className="h-[1px] w-full bg-gray-100" />

          <MenuRow
            icon={<IconSignOut width={24} height={24} color="#E53935" />}
            label="Logout"
            textColor="#E53935" // Chữ màu đỏ
            showChevron={false} // Không cần mũi tên
            onPress={logout}
            isDark={false}
          />
        </View>
      </ScrollView>
      <ConfirmModal
        visible={isDeleteModalVisible}
        icon={<IconSignOut width={45} height={45} color="#FF3B30" />}
        title="Delete Account?"
        description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleLogoutConfirm}
      />
    </View>
  );
}
