import type { LoginRequest, LoginResponse, User } from '@/types';
import { api } from '@/utils/api';

/**
 * Auth API Service
 */
export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return await api.post<LoginResponse>('/auth/login', credentials);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    return await api.get<User>('/auth/profile');
  },

  /**
   * Register new user
   */
  register: async (data: {
    email: string;
    password: string;
    name: string;
  }): Promise<LoginResponse> => {
    return await api.post<LoginResponse>('/auth/register', data);
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    return await api.post<{ token: string }>('/auth/refresh', { refreshToken });
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return await api.post<{ message: string }>('/auth/forgot-password', { email });
  },

  /**
   * Reset password
   */
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    return await api.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
    });
  },
};
