import { ApiError } from '@/utils/api';

/**
 * Error Interceptor
 * Handles API errors and provides consistent error responses
 */
export const errorInterceptor = {
  /**
   * Handle response errors
   */
  onError: (error: unknown): never => {
    // Network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('Network error. Please check your connection.', 0);
    }

    // Timeout error
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timeout. Please try again.', 408);
    }

    // API error
    if (error instanceof ApiError) {
      // Handle specific status codes
      switch (error.statusCode) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          throw new ApiError('Unauthorized. Please login again.', 401);
        case 403:
          throw new ApiError('Forbidden. You do not have permission.', 403);
        case 404:
          throw new ApiError('Resource not found.', 404);
        case 500:
          throw new ApiError('Server error. Please try again later.', 500);
        default:
          throw error;
      }
    }

    // Unknown error
    throw new ApiError('An unexpected error occurred.', 500);
  },
};
