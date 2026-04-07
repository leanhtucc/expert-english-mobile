import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';

import { authApi } from '@/api';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';

import { LearningGoal, ProfileStats, UserProfile } from '../screens/profile/types/profile.types';

export function useProfile() {
  const showToast = useToastStore(state => state.showToast);

  const [user, setUser] = useState<UserProfile>({
    _id: 'usr_001',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    avatar: 'https://picsum.photos/seed/alexchen/200/200',
    level: 'Level 24 • Advanced Learner',
  });

  const [stats] = useState<ProfileStats>({
    streakDays: '42 Days',
    wordsLearned: '1,250',
    studyMinutes: 20,
    lessonsFinished: 12,
    totalXP: '8.4k',
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
      const { refreshToken, clearAuth } = useAuthStore.getState();

      if (refreshToken) {
        await authApi.logout({ refreshToken });
      }

      clearAuth();
      await AsyncStorage.clear();

      showToast('Logged out successfully.', 'success');
      return true;
    } catch (error: any) {
      console.error('Logout failed:', error);
      useAuthStore.getState().clearAuth();
      await AsyncStorage.clear();

      if (error?.response?.status === 401) {
        showToast('Logged out successfully.', 'success');
      } else {
        showToast('Logout failed. Please try again.', 'error');
      }
      return true;
    }
  }

  return { user, stats, goal, updateProfile, changePassword, logout };
}
