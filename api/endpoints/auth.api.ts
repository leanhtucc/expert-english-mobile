import { LoginRequest, LoginResponse, RegisterRequest, User } from '@/types/api';

import { apiClient } from '../client';

/**
 * Auth API Endpoints
 * Handles authentication-related API calls
 */
export const authApi = {
  /**
   * Login user with credentials
   * @param credentials - User email and password
   * @returns LoginResponse with user data and token
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return await apiClient.post<LoginResponse>('/auth/login', credentials);
  },

  /**
   * Register new user
   * @param data - Registration data (email, password, name)
   * @returns LoginResponse with user data and token
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    return await apiClient.post<LoginResponse>('/auth/register', data);
  },

  /**
   * Logout current user
   * @returns void
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  /**
   * Get current user profile
   * @returns User profile data
   */
  getProfile: async (): Promise<User> => {
    return await apiClient.get<User>('/auth/profile');
  },

  /**
   * Refresh access token
   * @param refreshToken - Current refresh token
   * @returns New access token
   */
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    return await apiClient.post<{ token: string }>('/auth/refresh', { refreshToken });
  },

  /**
   * Request password reset
   * @param email - User email
   * @returns Success message
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   * @param token - Reset token from email
   * @param newPassword - New password
   * @returns Success message
   */
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    return await apiClient.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
    });
  },
};
