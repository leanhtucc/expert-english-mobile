import { apiConfig } from './config';
import { authInterceptor, errorInterceptor, loggingInterceptor } from './interceptors';

/**
 * Custom API Error
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API Client with interceptors and error handling
 */
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string, timeout: number = 30000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  /**
   * Make HTTP request with timeout and interceptors
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      // Apply auth interceptor
      const configWithAuth = await authInterceptor.onRequest(options);

      // Apply default headers
      const config: RequestInit = {
        ...configWithAuth,
        signal: controller.signal,
        headers: {
          ...apiConfig.defaultHeaders,
          ...configWithAuth.headers,
        },
      };

      // Log request
      loggingInterceptor.onRequest(endpoint, config);

      // Make request
      const response = await fetch(url, config);

      clearTimeout(timeoutId);

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      // Parse response
      const data = await response.json();

      // Log response
      loggingInterceptor.onResponse(endpoint, data);

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      // Log error
      loggingInterceptor.onError(endpoint, error);

      // Handle error
      return errorInterceptor.onError(error);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(apiConfig.baseURL, apiConfig.timeout);
