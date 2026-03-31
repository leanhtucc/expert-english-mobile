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

export interface RegisterRequest {
  platform: 'Web' | 'Mobile';
  password: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
}
export interface UpdateProfileRequest {
  fullname?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  dob?: string;
  gender?: string;
  avatar?: string;
  avatarUrl?: string;
}
export interface ExchangePasswordRequest {
  oldPass: string;
  newPass: string;
}
