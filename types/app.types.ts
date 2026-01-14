/**
 * App Settings Types
 */
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'vi';

export interface AppSettings {
  theme: Theme;
  language: Language;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
}
