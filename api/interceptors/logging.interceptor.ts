import { apiConfig } from '../config';

/**
 * Logging Interceptor
 * Logs API requests and responses for debugging
 */
export const loggingInterceptor = {
  /**
   * Log request details
   */
  onRequest: (endpoint: string, config: RequestInit): void => {
    if (apiConfig.enableLogging) {
      console.group(`🚀 API Request: ${config.method || 'GET'} ${endpoint}`);
      console.log('Config:', config);
      if (config.body) {
        console.log('Body:', config.body);
      }
      console.groupEnd();
    }
  },

  /**
   * Log response details
   */
  onResponse: <T>(endpoint: string, data: T): void => {
    if (apiConfig.enableLogging) {
      console.group(`✅ API Response: ${endpoint}`);
      console.log('Data:', data);
      console.groupEnd();
    }
  },

  /**
   * Log error details
   */
  onError: (endpoint: string, error: unknown): void => {
    if (apiConfig.enableLogging) {
      console.group(`❌ API Error: ${endpoint}`);
      console.error('Error:', error);
      console.groupEnd();
    }
  },
};
