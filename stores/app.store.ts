import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    }),
    {
      name: 'app-storage',
      // Sử dụng AsyncStorage cho React Native
      // storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
