import { CommonResponse } from '../common';
import { UserInfo } from '../entities/user.entity';

/**
 * Auth token payload
 */
export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  accessExpireAt: number;
  refreshExpireAt: number;
}

// Login / Google / Refresh / Logout share the same payload
export type LoginResponse = CommonResponse<AuthResponseData>;
export type LoginWithGoogleResponse = CommonResponse<AuthResponseData>;
export type RefreshTokenResponse = CommonResponse<AuthResponseData>;
export type LogoutResponse = CommonResponse<AuthResponseData>;

/**
 * User session information
 */
export interface UserSessionData {
  _id: string;
  ip: string;
  platform: 'Web' | 'Mobile';
  userAgent: Record<string, unknown>;
  origin: string;
  user: string; // ID của user
  userInfo: UserInfo;
  jti: string;
  exp: number;
}

export type UserProfileResponse = CommonResponse<UserInfo>;

/**
 * Dynamic email flow specific payloads
 */
export interface SendOtpData {
  /**
   * Nếu true: tài khoản đã tồn tại -> flow Login
   * Nếu false: chưa có tài khoản -> flow Đăng ký (OTP + tạo mật khẩu)
   */
  exists: boolean;
}

export type SendOtpResponse = CommonResponse<SendOtpData>;

export interface CheckOtpData {
  /**
   * Token tạm thời chứng minh email + OTP đã được verify,
   * dùng để gọi /auth/register ở bước tạo mật khẩu
   */
  verificationToken: string;
}

export type checkOtpResponse = CommonResponse<CheckOtpData>;

/**
 * Đăng ký sau khi verify OTP
 * Backend có thể trả cùng payload token như login
 */
export type RegisterResponse = CommonResponse<AuthResponseData>;

export type LogoutRessponse = {
  success: boolean;
};
