// src/api/client.ts
import axios, { AxiosError, AxiosInstance } from 'axios';

import { useAuthStore } from '../stores/auth.store';
// Lấy URL từ biến môi trường
import { apiConfig } from './config/api.config';

console.log('API baseURL from apiConfig:', apiConfig.baseURL); // Log baseURL để kiểm tra

// Phản hồi chuẩn từ backend cho /auth/refresh: CommonResponse<AuthResponseData>
type RefreshResponse = {
  success: boolean;
  data?: {
    accessToken: string;
  };
};

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
  config: any;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(req => {
    if (error) {
      req.reject(error);
    } else if (token) {
      req.config.headers.Authorization = `Bearer ${token}`;
      req.resolve(apiClient(req.config));
    }
  });
  failedQueue = [];
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.defaultHeaders,
  withCredentials: true,
});

apiClient.interceptors.request.use((config: any) => {
  const { token, accessToken } = useAuthStore.getState() as any;
  const bearer = accessToken ?? token;
  if (bearer && config.headers) {
    config.headers.Authorization = `Bearer ${bearer}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: any) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    if (!error.response) throw error;

    const status = error.response.status;
    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/register') ||
      originalRequest?.url?.includes('/auth/refresh') ||
      originalRequest?._retry;

    if (status !== 401 || isAuthEndpoint) {
      throw error;
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { refreshToken, clearAuth, setAccessToken } = useAuthStore.getState() as any;
      if (!refreshToken) {
        clearAuth?.();
        throw error;
      }

      const res = await axios.post<RefreshResponse>(
        `${apiConfig.baseURL}/auth/refresh`,
        { refreshToken },
        { withCredentials: true }
      );

      const newAccessToken = res.data.data?.accessToken;
      if (!newAccessToken) {
        clearAuth?.();
        throw error;
      }

      setAccessToken?.(newAccessToken);

      apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (err) {
      processQueue(err, null);
      const { clearAuth } = useAuthStore.getState() as any;
      clearAuth?.();
      throw err;
    } finally {
      isRefreshing = false;
    }
  }
);

/**
 * Simple API error wrapper to keep compatibility with existing imports.
 */
export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
