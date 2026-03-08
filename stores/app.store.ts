import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Language, Theme } from '@/types';

/**
 * App Store Interface
 */
interface AppState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Language
  language: Language;
  setLanguage: (language: Language) => void;

  // Notifications
  notificationsEnabled: boolean;
  toggleNotifications: () => void;

  // Network status
  isOnline: boolean;
  setOnlineStatus: (status: boolean) => void;

  // App settings
  soundEnabled: boolean;
  toggleSound: () => void;

  hapticEnabled: boolean;
  toggleHaptic: () => void;
}

/**
 * App Store with persistence
 * Lưu trữ settings và preferences
 */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'system',
      setTheme: theme => set({ theme }),

      // Language
      language: 'en',
      setLanguage: language => set({ language }),

      // Notifications
      notificationsEnabled: true,
      toggleNotifications: () => set({ notificationsEnabled: !get().notificationsEnabled }),

      // Network
      isOnline: true,
      setOnlineStatus: status => set({ isOnline: status }),

      // Sound
      soundEnabled: true,
      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),

      // Haptic
      hapticEnabled: true,
      toggleHaptic: () => set({ hapticEnabled: !get().hapticEnabled }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
