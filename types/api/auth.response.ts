import type { User } from '../entities';

/**
 * Auth API Response Types
 */

/**
 * Login response
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * Register response
 */
export interface RegisterResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

/**
 * Token refresh response
 */
export interface RefreshTokenResponse {
  token: string;
  expiresIn?: number;
}

/**
 * Forgot password response
 */
export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

/**
 * Reset password response
 */
export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}
