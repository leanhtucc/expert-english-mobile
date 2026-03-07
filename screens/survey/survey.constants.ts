import type React from 'react';
import type { SvgProps } from 'react-native-svg';

import {
  IconAccounting,
  IconBag,
  IconBusinessManagement,
  IconCareerChange,
  IconHealthcarePharma,
  IconItSoftware,
  IconLevelA1,
  IconLevelA2,
  IconLevelB1,
  IconLevelB2,
  IconLevelC1,
  IconLevelC2,
  IconMarketing,
  IconOther,
  IconSales,
  IconStudent,
} from '@/components/icon';

export interface OptionItem {
  value: string;
  label: string;
  description?: string;
  Icon?: React.FC<SvgProps>;
  isRecommended?: boolean;
}

export const ROLE_OPTIONS: OptionItem[] = [
  {
    value: 'student',
    label: 'Student',
    description: 'Exams, school projects, or studying abroad prep.',
    Icon: IconStudent,
  },
  {
    value: 'working_professional',
    label: 'Working Professional',
    description: 'Specialized business English for your career growth.',
    Icon: IconBag,
  },
  {
    value: 'career_changer',
    label: 'Career Changer',
    description: 'Transitioning industries with new terminology.',
    Icon: IconCareerChange,
  },
];

export const FIELD_OPTIONS: OptionItem[] = [
  { value: 'it_software', label: 'IT / Software', Icon: IconItSoftware },
  { value: 'sales', label: 'Sales', Icon: IconSales },
  { value: 'marketing', label: 'Marketing', Icon: IconMarketing },
  { value: 'business_management', label: 'Business / Management', Icon: IconBusinessManagement },
  { value: 'accounting', label: 'Accounting', Icon: IconAccounting },
  { value: 'healthcare_pharma', label: 'Healthcare / Pharma', Icon: IconHealthcarePharma },
  { value: 'other', label: 'Other', Icon: IconOther },
];

export const LEVEL_OPTIONS: OptionItem[] = [
  {
    value: 'A1',
    label: 'A1 — Beginner',
    description:
      'Understand and use basic phrases; introduce yourself and answer simple personal questions.',
    Icon: IconLevelA1,
  },
  {
    value: 'A2',
    label: 'A2 — Elementary',
    description:
      'Communicate in simple, routine tasks; describe aspects of your background and environment.',
    Icon: IconLevelA2,
  },
  {
    value: 'B1',
    label: 'B1 — Intermediate',
    description:
      'Handle most situations while traveling; produce simple connected text on topics of personal interest.',
    Icon: IconLevelB1,
  },
  {
    value: 'B2',
    label: 'B2 — Upper Intermediate',
    description:
      'Understand complex text on concrete and abstract topics; interact with native speakers fluently.',
    Icon: IconLevelB2,
  },
  {
    value: 'C1',
    label: 'C1 — Advanced',
    description:
      'Express ideas fluently and spontaneously; use language flexibly for social and professional purposes.',
    Icon: IconLevelC1,
  },
  {
    value: 'C2',
    label: 'C2 — Proficient',
    description:
      'Understand with ease virtually everything heard or read; summarize information from different sources.',
    Icon: IconLevelC2,
  },
];

export const GOAL_OPTIONS: OptionItem[] = [
  { value: '10', label: '10 mins / day' },
  { value: '15', label: '15 mins / day', isRecommended: true },
  { value: '20', label: '20 mins / day' },
  { value: '30', label: '30 mins / day' },
];

export const HOUR_VALUES = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));

export const MINUTE_VALUES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));
