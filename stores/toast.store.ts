import { create } from 'zustand';

// Định nghĩa các loại Toast hỗ trợ
type ToastType = 'success' | 'error' | 'warn';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  duration: number;

  // Actions
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>(set => ({
  // Khởi tạo giá trị mặc định
  visible: false,
  message: '',
  type: 'success',
  duration: 3000,

  // Hàm hiển thị Toast
  showToast: (message, type = 'success', duration = 3000) => {
    set({
      visible: true,
      message,
      type,
      duration,
    });
  },

  // Hàm ẩn Toast
  hideToast: () => {
    set({ visible: false });
  },
}));
