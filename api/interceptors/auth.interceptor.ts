import * as SecureStore from 'expo-secure-store';

/**
 * Auth Interceptor
 * Automatically adds authentication token to requests
 */
export const authInterceptor = {
  /**
   * Add Authorization header to request
   */
  onRequest: async (config: RequestInit): Promise<RequestInit> => {
    try {
      const token = await SecureStore.getItemAsync('auth_token');

      if (token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }

    return config;
  },
};
