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
      // Gọi API send OTP (Bạn có thể bỏ trường type nếu BE không cần, hoặc để mặc định)
      const response = await authApi.sendOtp({ email, type: 'login' });

      const payload = (response.data as SendOtpResponse).data;

      // Quan trọng: Trả về trạng thái exists (Đã tồn tại hay chưa)
      return payload?.exists;
    } catch (error: any) {
      console.log('🚨 LỖI GỌI API SEND OTP:', error.response?.data || error.message);
      showToast(error.response?.data?.message || 'Không thể kiểm tra email lúc này.', 'error');
      // Trả về null để UI biết là có lỗi, không thực hiện navigate
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
      console.log('🚨 Login Error Details:', {
        message: error.message,
        config: error.config,
        code: error.code,
        request: error.request,
        response: error.response,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
      console.log('🚨 FULL ERROR OBJECT:', error);
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
      console.log('🚨 LỖI GỌI API CHECK OTP:', {
        message: error.message,
        config: error.config,
        code: error.code,
        request: error.request,
        response: error.response,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
      console.log('🚨 FULL ERROR OBJECT:', error);
      showToast('Mã OTP không chính xác hoặc đã hết hạn.', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const registerNewAccount = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.register({
        platform: 'Mobile',
        username: username,
        email: email,
        password: password,
      });

      const payload = (response.data as RegisterResponse).data;

      // Đăng ký thành công! (Dù BE có trả về token hay không, ta cũng sẽ force user qua màn Login)
      if (response.data?.success || payload?.accessToken) {
        showToast('Tạo tài khoản thành công! Vui lòng đăng nhập.', 'success');
        return true; // Báo hiệu UI chuyển trang
      }
      return false;
    } catch (error: any) {
      console.log('🚨 LỖI GỌI API REGISTER:', error.response?.data || error.message);
      showToast(error?.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản.', 'error');
      return false;
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
      console.log('🚨 LỖI LẤY DATA USER:', {
        message: error.message,
        config: error.config,
        code: error.code,
        request: error.request,
        response: error.response,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
      console.log('🚨 FULL ERROR OBJECT:', error);
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
      console.log('🚨 LỖI UPDATE USER:', {
        message: error.message,
        config: error.config,
        code: error.code,
        request: error.request,
        response: error.response,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
      console.log('🚨 FULL ERROR OBJECT:', error);
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
      console.log('🚨 LỖI ĐỔI MẬT KHẨU:', {
        message: error.message,
        config: error.config,
        code: error.code,
        request: error.request,
        response: error.response,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
      console.log('🚨 FULL ERROR OBJECT:', error);
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
      console.log('🚨 LỖI DELETE USER:', {
        message: error.message,
        config: error.config,
        code: error.code,
        request: error.request,
        response: error.response,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
      console.log('🚨 FULL ERROR OBJECT:', error);
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
      console.log('🚨 LỖI GỌI API LOGOUT:', {
        message: error.message,
        config: error.config,
        code: error.code,
        request: error.request,
        response: error.response,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseHeaders: error.response?.headers,
      });
      console.log('🚨 FULL ERROR OBJECT:', error);
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
