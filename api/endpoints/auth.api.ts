import {
  AuthSendOtpRequest,
  CheckOtpRequest,
  LoginRequest,
  LoginResponse,
  LoginWithGoogleRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  SendOtpResponse,
  checkOtpResponse,
} from '@/types';

import { apiClient } from '../client';

/**
 * Auth API Endpoints
 */
export const authApi = {
  login: (data: LoginRequest) => apiClient.post<LoginResponse>('/auth/login', data),

  refreshToken: (data: RefreshTokenRequest) =>
    apiClient.post<RefreshTokenResponse>('/auth/refresh', data),

  logout: (data: LogoutRequest) => apiClient.post('/auth/logout', data),

  /**
   * Gửi OTP theo luồng động:
   * - exists = true  -> Login
   * - exists = false -> Verify OTP + Tạo mật khẩu
   */
  sendOtp: (data: AuthSendOtpRequest) => apiClient.post<SendOtpResponse>('/auth/otp/send', data),

  /**
   * Verify OTP, trả về verificationToken cho bước tạo mật khẩu
   */
  checkOtp: (data: CheckOtpRequest) => apiClient.post<checkOtpResponse>('/auth/otp/login', data),

  /**
   * Đăng ký sau khi verify OTP
   */
  register: (data: RegisterRequest) => apiClient.post<RegisterResponse>('/auth/register', data),

  loginWithGoogle: (data: LoginWithGoogleRequest) =>
    apiClient.post<LoginResponse>('/auth/google', data),
};
