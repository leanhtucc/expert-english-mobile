export interface AuthSendOtpRequest {
  email: string;
  type: 'login' | 'signup';
}

export interface LoginRequest {
  platform: 'Web' | 'Mobile';
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
export interface LogoutRequest {
  refreshToken: string;
}

export interface SendOtpRequest {
  email: string;
  type: 'login' | 'signup';
}

export interface CheckOtpRequest {
  email: string;
  otp: string;
}

export interface LoginWithGoogleRequest {
  idToken: string;
}

/**
 * Đăng ký sau khi verify OTP
 * Sử dụng verificationToken trả về từ /auth/otp/login
 */
export interface RegisterRequest {
  email: string;
  password: string;
  verificationToken: string;
}
