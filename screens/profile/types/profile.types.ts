export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
}

export interface ProfileStats {
  streakDays: string;
  wordsLearned: string;
  totalXP: string;
  studyMinutes: number;
  lessonsFinished: number;
}

export interface LearningGoal {
  minutesPerDay: number;
  progress: number; // 0-1
}
