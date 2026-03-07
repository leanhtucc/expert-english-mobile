/**
 * Mock Data
 * Dữ liệu giả lập dùng chung toàn app khi chưa có API thực
 */
import { User } from '@/types/entities';

// ─────────────────────────────────────────────
// User / Profile
// ─────────────────────────────────────────────

export interface UserProfile extends User {
  level: number;
  track: string;
  proficiency: 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Proficient';
}

export interface LearningStats {
  totalXP: number;
  wordsLearned: number;
  streakDays: number;
}

export interface LearningGoal {
  wordsPerDay: number;
  mode: 'Casual' | 'Regular' | 'Serious' | 'Intense';
}

export interface Certificate {
  id: string;
  title: string;
  masteredCategories: number;
  totalCategories: number;
  completedAt: string;
}

export interface ProfileMockData {
  user: UserProfile;
  stats: LearningStats;
  learningGoal: LearningGoal;
  certificates: Certificate[];
  darkAppearance: boolean;
}

// ─────────────────────────────────────────────
// Mock values
// ─────────────────────────────────────────────

export const mockUserProfile: UserProfile = {
  id: 'usr_001',
  email: 'alex.chen@example.com',
  name: 'Alex Chen',
  avatar: 'https://picsum.photos/seed/alexchen/200/200',
  role: 'student',
  level: 14,
  track: 'AI Engineering Track',
  proficiency: 'Advanced',
  createdAt: '2025-01-15T08:00:00Z',
  updatedAt: '2026-03-07T10:00:00Z',
};

export const mockLearningStats: LearningStats = {
  totalXP: 12500,
  wordsLearned: 482,
  streakDays: 18,
};

export const mockLearningGoal: LearningGoal = {
  wordsPerDay: 20,
  mode: 'Serious',
};

export const mockCertificates: Certificate[] = [
  {
    id: 'cert_001',
    title: 'Tech English Fundamentals',
    masteredCategories: 3,
    totalCategories: 5,
    completedAt: '2025-12-01T00:00:00Z',
  },
  {
    id: 'cert_002',
    title: 'Business Communication',
    masteredCategories: 2,
    totalCategories: 4,
    completedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'cert_003',
    title: 'AI & Machine Learning Vocabulary',
    masteredCategories: 1,
    totalCategories: 6,
    completedAt: '2026-02-20T00:00:00Z',
  },
];

export const mockProfileData: ProfileMockData = {
  user: mockUserProfile,
  stats: mockLearningStats,
  learningGoal: mockLearningGoal,
  certificates: mockCertificates,
  darkAppearance: false,
};

// ─────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────

/** Định dạng XP: 12500 → "12.5k" */
export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1).replace('.0', '')}k`;
  }
  return xp.toString();
}
