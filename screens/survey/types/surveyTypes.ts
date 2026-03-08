export type UserRole = 'student' | 'working_professional' | 'career_changer';

export type UserField =
  | 'it_software'
  | 'sales'
  | 'marketing'
  | 'business_management'
  | 'accounting'
  | 'healthcare_pharma'
  | 'other';

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type DailyGoal = 10 | 15 | 20 | 30;

export interface SurveyAnswers {
  role?: UserRole;
  field?: UserField;
  level?: EnglishLevel;
  dailyGoal?: DailyGoal;
  reminderEnabled: boolean;
  reminderTime: { hour: number; minute: number };
}

export interface StepProps {
  answers: SurveyAnswers;
  onUpdate: (updates: Partial<SurveyAnswers>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}
