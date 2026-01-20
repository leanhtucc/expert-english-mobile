import { create } from 'zustand';

import { authApi } from '@/api';
import { User } from '@/types/entities';
import { logger } from '@/utils/logger';

/**
 * Auth Store Interface
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearError: () => void;
}

/**
 * Auth Store
 * Quản lý authentication state
 */
export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.login({ email, password });

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });

      logger.info('User logged in successfully', { userId: response.user.id });
    } catch (error: any) {
      set({
        error: error.message || 'Login failed',
        isLoading: false,
      });
      logger.error('Login failed', error);
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await authApi.logout();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      logger.info('User logged out');
    } catch (error: any) {
      logger.error('Logout failed', error);
      set({ isLoading: false });
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.register({ email, password, name, acceptTerms: true });

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });

      logger.info('User registered successfully', { userId: response.user.id });
    } catch (error: any) {
      set({
        error: error.message || 'Registration failed',
        isLoading: false,
      });
      logger.error('Registration failed', error);
      throw error;
    }
  },

  setUser: (user: User) => set({ user, isAuthenticated: true }),

  setToken: (token: string) => set({ token }),

  clearError: () => set({ error: null }),
}));
