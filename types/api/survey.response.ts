import { CommonResponse } from '../common';

export interface SurveyResponseData {
  currentStatusOptions: [
    {
      value: string;
      labelEn: string;
      labelVi: string;
      descriptionEn: string;
    },
  ];
  englishLevelOptions: [
    {
      value: string;
      label: string;
      description: string;
    },
  ];
  dailyGoalOptions: [
    {
      value: number;
      label: string;
      recommended: boolean;
    },
  ];
  courseDurationOptions: [
    {
      value: number;
      label: string;
    },
  ];
  industries: [
    {
      value: string;
      label: string;
    },
  ];
  jobRoles: [
    {
      value: string;
      label: string;
    },
  ];
}
export type SurveyResponse = CommonResponse<SurveyResponseData>;

export interface submitSurveyResponse {
  success: boolean;
  profiled_id: string;
}

export type SubmitSurveyResponse = CommonResponse<submitSurveyResponse>;

export interface GenerateLearningPath4WeekData {
  path: {
    _id: string;
    name_en: string;
    name_vi: string;
    description: string;
    target_level: string;
    estimated_hours: number;
    industry_id: string;
    is_active: boolean;
    created_at: string;
  };
  modules: [
    {
      _id: string;
      path_id: string;
      name_en: string;
      name_vi: string;
      order_index: number;
      created_at: string;
    },
  ];
  lessonCount: number;
}

export type GenerateLearningPath4WeekResponse = CommonResponse<GenerateLearningPath4WeekData>;

export interface GenerateLearningPath7dayData {
  path: {
    _id: string;
    name_en: string;
    name_vi: string;
    description: string;
    target_level: string;
    estimated_hours: number;
    industry_id: string;
    is_active: boolean;
    created_at: string;
    certification_id: string;
  };
  module: {
    _id: string;
    path_id: string;
    name_en: string;
    name_vi: string;
    order_index: number;
    created_at: string;
  };
  lessons: [
    {
      _id: string;
      module_id: string;
      name_en: string;
      name_vi: string;
      order_index: number;
      lesson_type: 'Video' | 'Article' | 'Quiz' | 'vocabulary';
      estimated_minutes: number;
      created_at: string;
    },
  ];
  totalVocabularys: number;
}

export type GenerateLearningPath7dayResponse = CommonResponse<GenerateLearningPath7dayData>;
