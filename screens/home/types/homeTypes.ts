export type LessonCategory =
  | 'speaking_mastery'
  | 'vocabulary'
  | 'writing'
  | 'listening'
  | 'grammar';

export type RoadmapItemStatus = 'completed' | 'active' | 'locked';

export interface TodayFocusLesson {
  id: string;
  category: LessonCategory;
  categoryLabel: string;
  title: string;
  description: string;
  participantAvatars: string[];
  extraParticipants?: number;
}

export interface RoadmapItem {
  id: string;
  dayLabel: string;
  dateLabel: string;
  title: string;
  status: RoadmapItemStatus;
}

export interface HomeData {
  userName: string;
  userLevel: string;
  heroTitle: string;
  heroSubtitle: string;
  scheduledLessonsCount: number;
  todayFocus: TodayFocusLesson[];
  roadmap: RoadmapItem[];
}
