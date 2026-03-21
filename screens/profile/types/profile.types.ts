export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
}

export interface ProfileStats {
  streakDays: number;
  wordsLearned: number;
  totalXP: number;
  studyMinutes: number;
  lessonsFinished: number;
}

export interface LearningGoal {
  minutesPerDay: number;
  progress: number; // 0-1
}
