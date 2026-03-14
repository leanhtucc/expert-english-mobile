import {
  AuthSendOtpRequest,
  CheckOtpRequest,
  LoginRequest,
  LoginResponse,
  LoginWithGoogleRequest,
  LogoutRequest,
  LogoutRessponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  SendOtpResponse,
  UserProfileResponse,
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

  logout: (data: LogoutRequest) => apiClient.post<LogoutRessponse>('/auth/logout', data),

  sendOtp: (data: AuthSendOtpRequest) => apiClient.post<SendOtpResponse>('/auth/otp/send', data),

  checkOtp: (data: CheckOtpRequest) => apiClient.post<checkOtpResponse>('/auth/otp/login', data),

  register: (data: RegisterRequest) => apiClient.post<RegisterResponse>('/auth/register', data),

  loginWithGoogle: (data: LoginWithGoogleRequest) =>
    apiClient.post<LoginResponse>('/auth/google', data),
  getDataUser: () => apiClient.get<UserProfileResponse>('/user/me'),
};
