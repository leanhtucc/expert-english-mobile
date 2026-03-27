import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Theme } from '@/types/app.types';

/**
 * App Store Interface
 */
interface AppState {
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

  // Theme (dark/light)
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * App Store with persistence
 * Lưu trữ settings và preferences
 */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
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

      // Theme
      theme: 'light',
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
      // Sử dụng AsyncStorage cho React Native
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
