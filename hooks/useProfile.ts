import { useState } from 'react';

import { LearningGoal, ProfileStats, UserProfile } from '../screens/profile/types/profile.types';

export function useProfile() {
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

  function logout() {
    // Implement
  }

  return { user, stats, goal, updateProfile, changePassword, logout };
}
