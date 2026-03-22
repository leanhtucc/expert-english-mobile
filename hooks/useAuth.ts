import { useState } from 'react';

import { authApi } from '@/api';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import type {
  LoginResponse,
  RegisterResponse,
  SendOtpResponse,
  UserProfileResponse,
  checkOtpResponse,
} from '@/types';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastStore(state => state.showToast);

  const { setAuthData, clearAuth } = useAuthStore();

  const sendEmailOTP = async (email: string) => {
    setLoading(true);
    try {
      const response = await authApi.sendOtp({ email, type: 'login' });
      const payload = (response.data as SendOtpResponse).data;
      return payload?.exists;
    } catch (error: any) {
      console.log('🚨 LỖI 500 CHI TIẾT:', error.response?.data);
      showToast(error.response?.data?.message || 'Lỗi hệ thống (500)', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };
  /**
   * @param username
   * @param password
   */
  const loginWithEmail = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.login({
        platform: 'Mobile',
        username: username,
        password: password,
      });

      const payload = (response.data as LoginResponse).data;

      if (payload?.accessToken) {
        setAuthData({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          email: username,
          accessExpireAt: payload.accessExpireAt,
          refreshExpireAt: payload.refreshExpireAt,
        });
        showToast('Đăng nhập thành công!', 'success');
        return true;
      }

      showToast('Không nhận được mã truy cập từ hệ thống', 'error');
      return false;
    } catch (error: any) {
      const serverMessage = error?.response?.data?.message;

      console.log('🚨 Login Error Details:', error?.response?.data || error.message);

      showToast(serverMessage || 'Tài khoản hoặc mật khẩu không chính xác', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailOTP = async (email: string, otp: string) => {
    setLoading(true);
    try {
      const response = await authApi.checkOtp({ email, otp });
      const payload = (response.data as checkOtpResponse).data;
      return payload?.verificationToken;
    } catch (error: any) {
      console.log('🚨 LỖI GỌI API CHECK OTP:', error?.response?.data || error.message);
      showToast('Mã OTP không chính xác hoặc đã hết hạn.', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const registerNewAccount = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Gọi API với username và email riêng biệt
      const response = await authApi.register({
        platform: 'Mobile',
        username: username, // Nhận từ tham số truyền vào
        email: email,
        password: password,
      });

      const payload = (response.data as RegisterResponse).data;

      if (payload?.accessToken) {
        // 1. Lưu token vào AuthStore
        setAuthData({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          email: email, // Lưu email để định danh
          accessExpireAt: payload.accessExpireAt,
          refreshExpireAt: payload.refreshExpireAt,
        });

        // 2. Lấy thông tin Profile để check isSurvey
        const user = await fetchUserInfo();

        showToast('Tạo tài khoản thành công!', 'success');

        // Trả về user object để màn hình UI xử lý navigate
        return user;
      }
      return null;
    } catch (error: any) {
      console.log('🚨 LỖI GỌI API REGISTER:', error?.response?.data || error.message);
      showToast(error?.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản.', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };
  const fetchUserInfo = async () => {
    try {
      const response = await authApi.getDataUser();
      const userData = (response.data as UserProfileResponse).data;
      return userData;
    } catch (error: any) {
      console.log('🚨 LỖI LẤY DATA USER:', error?.response?.data || error.message);
      return null;
    }
  };
  const updateProfile = async (id: string, fullname: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullname', fullname);
      const response = await authApi.updateProfileUser(id, formData);

      if (response.data) {
        showToast('Cập nhật thông tin thành công!', 'success');
        return true;
      }
      return false;
    } catch (error: any) {
      console.log('🚨 LỖI UPDATE USER:', error?.response?.data || error.message);
      showToast(error?.response?.data?.message || 'Không thể cập nhật thông tin', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };
  const changeUserPassword = async (oldPass: string, newPass: string) => {
    setLoading(true);
    try {
      const response = await authApi.exchangePassword({ oldPass, newPass });

      if (response.data?.success) {
        showToast('Đổi mật khẩu thành công!', 'success');
        return true;
      }
      return false;
    } catch (error: any) {
      console.log('🚨 LỖI ĐỔI MẬT KHẨU:', error?.response?.data || error.message);
      showToast(error?.response?.data?.message || 'Không thể đổi mật khẩu lúc này', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };
  const deleteUserAccount = async (id: string) => {
    setLoading(true);
    try {
      await authApi.deleteAccount(id);
      clearAuth();
      showToast('Tài khoản đã được xoá thành công!', 'success');
      return true;
    } catch (error: any) {
      console.log('🚨 LỖI DELETE USER:', error?.response?.data || error.message);
      showToast(error?.response?.data?.message || 'Không thể xoá tài khoản lúc này', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      const { refreshToken } = useAuthStore.getState();
      await authApi.logout({ refreshToken: refreshToken ?? '' });
    } catch (error: any) {
      console.log('🚨 LỖI GỌI API LOGOUT:', error?.response?.data || error.message);
    } finally {
      clearAuth();
      setLoading(false);
    }
  };

  return {
    loading,
    sendEmailOTP,
    loginWithEmail,
    verifyEmailOTP,
    registerNewAccount,
    logoutUser,
    fetchUserInfo,
    updateProfile,
    deleteUserAccount,
    changeUserPassword,
  };
};
