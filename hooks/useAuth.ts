import { useState } from 'react';

import { authApi } from '@/api';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import type { LoginResponse, RegisterResponse, SendOtpResponse, checkOtpResponse } from '@/types';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastStore(state => state.showToast);

  // Lấy các action từ Store mới sửa
  const { setAuthData, clearAuth } = useAuthStore();

  const sendEmailOTP = async (email: string) => {
    setLoading(true);
    try {
      const response = await authApi.sendOtp({ email, type: 'login' });
      const payload = (response.data as SendOtpResponse).data;
      return payload?.exists;
    } catch (error: any) {
      console.log('🚨 LỖI 500 CHI TIẾT:', error.response?.data); // Xem kĩ cái object này
      showToast(error.response?.data?.message || 'Lỗi hệ thống (500)', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };
  /**
   * Hàm xử lý Đăng nhập
   * @param username - Có thể là Email hoặc chuỗi "admin" theo yêu cầu demo của Leader
   * @param password - Mật khẩu (ví dụ: "admin")
   */
  const loginWithEmail = async (username: string, password: string) => {
    setLoading(true);
    try {
      // 1. Gọi API Login tới Backend
      // Lưu ý: Ta truyền 'username' vào trường username của body request
      const response = await authApi.login({
        platform: 'Mobile',
        username: username,
        password: password,
      });

      // 2. Ép kiểu dữ liệu trả về theo LoginResponse
      const payload = (response.data as LoginResponse).data;

      // 3. Kiểm tra nếu Backend trả về accessToken thành công
      if (payload?.accessToken) {
        // Lưu toàn bộ thông tin token vào Zustand Store
        // setAuthData sẽ tự động chuyển trạng thái isAuthenticated sang true
        setAuthData({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          email: username, // Tạm thời lưu username vào trường email trong store
        });

        // Hiển thị thông báo thành công
        showToast('Đăng nhập thành công!', 'success');
        return true;
      }

      // Trường hợp trả về 200 nhưng không có token (hiếm gặp)
      showToast('Không nhận được mã truy cập từ hệ thống', 'error');
      return false;
    } catch (error: any) {
      // Bắt lỗi từ Server (400, 401, 500...) hoặc lỗi mạng
      const serverMessage = error?.response?.data?.message;

      console.log('🚨 Login Error Details:', error?.response?.data || error.message);

      showToast(serverMessage || 'Tài khoản hoặc mật khẩu không chính xác', 'error');
      return false;
    } finally {
      // Tắt trạng thái loading bất kể thành công hay thất bại
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

  const registerNewAccount = async (email: string, password: string, verificationToken: string) => {
    setLoading(true);
    try {
      const response = await authApi.register({ email, password, verificationToken });
      const payload = (response.data as RegisterResponse).data;

      if (payload?.accessToken) {
        setAuthData({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          email,
        });
        showToast('Tạo tài khoản thành công!', 'success');
        return true;
      }
      return false;
    } catch (error: any) {
      console.log('🚨 LỖI GỌI API REGISTER:', error?.response?.data || error.message);
      showToast(error?.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản.', 'error');
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
      // Dù API có lỗi hay không thì vẫn phải xóa token trên App
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
  };
};
