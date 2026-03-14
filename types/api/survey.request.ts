export interface SubmitSurveyOptionRequest {
  current_status: string;
  industry_id: string;
  role_id: null | string;
  english_level: string;
  daily_learning_minutes: number;
  daily_reminder_enabled: boolean;
  reminder_time: string;
  custom_focus: string;
  course_duration_weeks: number;
}
