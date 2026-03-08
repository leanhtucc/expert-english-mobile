import type { HomeData } from '../types';

export const MOCK_HOME_DATA: HomeData = {
  userName: 'Alex Rivera',
  userLevel: 'B2',
  heroTitle: 'Ready to crush your goals?',
  heroSubtitle: 'You have 3 lessons scheduled for today.',
  scheduledLessonsCount: 3,
  todayFocus: [
    {
      id: '1',
      category: 'speaking_mastery',
      categoryLabel: 'SPEAKING MASTERY',
      title: 'Industry Pitch Prep',
      description:
        'Master 10 high-impact industry terms and practice your delivery style with AI feedback.',
      participantAvatars: [],
      extraParticipants: 12,
    },
  ],
  roadmap: [
    {
      id: '1',
      dayLabel: 'MON',
      dateLabel: 'JUL 10',
      title: 'Fundamentals & Jargon',
      status: 'completed',
    },
    {
      id: '2',
      dayLabel: 'TUE',
      dateLabel: 'TODAY',
      title: 'Vocabulary & Speaking',
      status: 'active',
    },
    {
      id: '3',
      dayLabel: 'WED',
      dateLabel: 'JUL 12',
      title: 'Email Etiquette & Tone',
      status: 'locked',
    },
  ],
};

export const CATEGORY_COLOR: Record<string, string> = {
  speaking_mastery: '#C8102E',
  vocabulary: '#2563EB',
  writing: '#7C3AED',
  listening: '#059669',
  grammar: '#D97706',
};
