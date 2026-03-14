/**
 * Mock Data
 * Dữ liệu giả lập dùng chung toàn app khi chưa có API thực
 */
import { User } from '@sentry/react-native';

// ─────────────────────────────────────────────
// User / Profile
// ─────────────────────────────────────────────

export interface UserProfile extends User {
  name: string | undefined;
  avatar: any;
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
  _id: 'usr_001',
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

// ─────────────────────────────────────────────
// Leaderboard
// ─────────────────────────────────────────────

export interface LeaderboardPlayer {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  streakDays: number;
  isCurrentUser?: boolean;
}

export const mockLeaderboard: LeaderboardPlayer[] = [
  {
    id: 'ldr_001',
    rank: 1,
    name: 'Elena K.',
    avatar: 'https://picsum.photos/seed/elenak/200/200',
    points: 15820,
    streakDays: 90,
  },
  {
    id: 'ldr_002',
    rank: 2,
    name: 'James R.',
    avatar: 'https://picsum.photos/seed/jamesr/200/200',
    points: 12450,
    streakDays: 65,
  },
  {
    id: 'ldr_003',
    rank: 3,
    name: 'Chen W.',
    avatar: 'https://picsum.photos/seed/chenw/200/200',
    points: 11900,
    streakDays: 58,
  },
  {
    id: 'ldr_004',
    rank: 4,
    name: 'Marcus Miller',
    avatar: 'https://picsum.photos/seed/marcus/200/200',
    points: 10450,
    streakDays: 42,
  },
  {
    id: 'ldr_005',
    rank: 5,
    name: 'Sarah Jenkins',
    avatar: 'https://picsum.photos/seed/sarahj/200/200',
    points: 9820,
    streakDays: 18,
  },
  {
    id: 'ldr_006',
    rank: 6,
    name: 'Liam Torres',
    avatar: 'https://picsum.photos/seed/liam/200/200',
    points: 8750,
    streakDays: 30,
  },
  {
    id: 'ldr_007',
    rank: 7,
    name: 'Aisha Patel',
    avatar: 'https://picsum.photos/seed/aisha/200/200',
    points: 7600,
    streakDays: 22,
  },
  {
    id: 'ldr_042',
    rank: 42,
    name: 'You (Sarah C.)',
    avatar: 'https://picsum.photos/seed/alexchen/200/200',
    points: 1250,
    streakDays: 15,
    isCurrentUser: true,
  },
  {
    id: 'ldr_043',
    rank: 43,
    name: 'David Wu',
    avatar: 'https://picsum.photos/seed/davidwu/200/200',
    points: 1120,
    streakDays: 4,
  },
];
