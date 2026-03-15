import * as dotenv from 'dotenv';
import path from 'path';

import { ConfigContext, ExpoConfig } from 'expo/config';

// Đọc file .env dựa trên biến ENVFILE từ script (ví dụ: .env.dev)
const envFile = process.env.ENVFILE || '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'ExpertEnglish',
  slug: 'ExpertEnglish',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'expertenglish',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.expertenglish.app',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    package: 'com.expertenglish.app',
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
        dark: {
          backgroundColor: '#000000',
        },
      },
    ],
  ],
  experiments: {
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: '2f9d8f26-3a62-4986-bf9c-4b8077e0694c',
    },
    // Đưa các biến môi trường vào extra nếu cần dùng Constants.expoConfig
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    env: process.env.APP_ENV,
  },
});

export default config;
