import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';

import { authApi } from '@/api';
import { useToastStore } from '@/stores/toast.store';

import { LearningGoal, ProfileStats, UserProfile } from '../screens/profile/types/profile.types';

export function useProfile() {
  const showToast = useToastStore(state => state.showToast);

  const [user, setUser] = useState<UserProfile>({
    _id: 'usr_001',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    avatar: 'https://picsum.photos/seed/alexchen/200/200',
    level: 'Intermediate B1',
  });

  const [stats] = useState<ProfileStats>({
    streakDays: 18,
    wordsLearned: 482,
    studyMinutes: 20,
    lessonsFinished: 12,
    totalXP: 12500,
  });

  const [goal] = useState<LearningGoal>({
    minutesPerDay: 20,
    progress: 0.7,
  });

  function updateProfile(data: Partial<UserProfile>) {
    setUser((prev: any) => ({ ...prev, ...data }));
  }

  function changePassword() {
    // Implement
  }

  async function logout() {
    try {
      const refreshToken = (await AsyncStorage.getItem('refreshToken')) || 'dummy_refresh_token';

      await authApi.logout({ refreshToken });

      await AsyncStorage.clear();

      showToast('Logged out successfully.', 'success');
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      showToast('Logout failed. Please try again.', 'error');
      await AsyncStorage.clear();
      return true;
    }
  }

  return { user, stats, goal, updateProfile, changePassword, logout };
}
