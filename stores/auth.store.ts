// Thêm import này
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { UserInfo } from '@/types/entities/user.entity';

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  email?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  accessExpireAt?: number | null; // THÊM DÒNG NÀY
  refreshExpireAt?: number | null; // THÊM DÒNG NÀY
  isAuthenticated: boolean;

  // Cập nhật kiểu dữ liệu truyền vào
  setAuthData: (data: {
    accessToken: string;
    refreshToken: string;
    email?: string;
    accessExpireAt: number;
    refreshExpireAt: number;
  }) => void;
  clearAuth: () => void;
  setUser: (user: UserInfo) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      email: '',
      accessToken: null,
      refreshToken: null,
      accessExpireAt: null,
      refreshExpireAt: null,
      isAuthenticated: false,

      // Cập nhật hàm set
      setAuthData: data =>
        set({
          token: data.accessToken,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessExpireAt: data.accessExpireAt,
          refreshExpireAt: data.refreshExpireAt,
          email: data.email,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          user: null,
          token: null,
          accessToken: null,
          refreshToken: null,
          accessExpireAt: null,
          refreshExpireAt: null,
          isAuthenticated: false,
          email: '',
        }),

      setUser: user => set({ user, isAuthenticated: true }),
      setAccessToken: token => set({ accessToken: token, token }),
      setRefreshToken: token => set({ refreshToken: token }),
    }),
    {
      name: 'auth-storage', // Tên key lưu trong AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
