/**
 * Generic API Types
 */

/**
 * Generic API State Interface
 */
export interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Generic API Response Wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  statusCode?: number;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  message: string;
  error?: string;
  statusCode: number;
  timestamp?: string;
}

/**
 * Pagination Parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * API Request Config
 */
export interface ApiRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  timeout?: number;
}
