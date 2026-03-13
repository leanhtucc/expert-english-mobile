import { ENV } from '@/utils/config';

/**
 * API Configuration
 * Central configuration for API client
 */
export const apiConfig = {
  /**
   * Base URL for API requests
   */
  baseURL: ENV.API_URL || '# http://192.168.1.16:3000',

  /**
   * Request timeout in milliseconds
   */
  timeout: 30000,

  /**
   * Default headers for all requests
   */
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  /**
   * Enable/disable request logging
   */
  enableLogging: __DEV__,

  /**
   * Enable/disable retry on failure
   */
  enableRetry: true,

  /**
   * Maximum retry attempts
   */
  maxRetries: 3,

  /**
   * Retry delay in milliseconds
   */
  retryDelay: 1000,
};
