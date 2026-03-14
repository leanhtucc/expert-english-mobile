import { create } from 'zustand';

import type { UserInfo } from '@/types/entities/user.entity';

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  email?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuthData: (data: { accessToken: string; refreshToken: string; email?: string }) => void;
  clearAuth: () => void;
  setUser: (user: UserInfo) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  email: '',
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  // Gọi hàm này sau khi Login/Register thành công
  setAuthData: data =>
    set({
      token: data.accessToken,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      email: data.email,
      isAuthenticated: true,
    }),

  // Gọi hàm này khi Logout hoặc Token hết hạn
  clearAuth: () =>
    set({
      user: null,
      token: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      email: '',
    }),

  setUser: user => set({ user, isAuthenticated: true }),
  setAccessToken: token => set({ accessToken: token, token }),
  setRefreshToken: token => set({ refreshToken: token }),
}));
