import Constants from 'expo-constants';

/**
 * Environment Configuration
 * Centralized configuration management
 */
export const ENV = {
  // App Info
  APP_NAME: Constants.expoConfig?.name || 'ExpertEnglish',
  APP_VERSION: Constants.expoConfig?.version || '1.0.0',
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',

  // API Configuration
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://prolingo-be.iuptit.com',
  API_TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10),

  // Feature Flags
  ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_CRASH_REPORTING: process.env.EXPO_PUBLIC_ENABLE_CRASH_REPORTING === 'true',
  DEBUG_MODE: process.env.EXPO_PUBLIC_DEBUG_MODE === 'true',

  // Check if running in development
  isDevelopment: process.env.EXPO_PUBLIC_ENVIRONMENT === 'development',
  isProduction: process.env.EXPO_PUBLIC_ENVIRONMENT === 'production',
} as const;

/**
 * Validate environment variables
 */
export function validateEnv() {
  const required = ['EXPO_PUBLIC_API_URL'];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing.join(', '));
  }

  if (ENV.DEBUG_MODE) {
    console.log('🔧 Environment Configuration:', {
      environment: ENV.ENVIRONMENT,
      apiUrl: ENV.API_URL,
      analytics: ENV.ENABLE_ANALYTICS,
    });
  }
}
