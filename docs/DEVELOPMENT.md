# Development Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
# Start Expo development server
npm start

# Or run on specific platform:
npm run android   # Android emulator/device
npm run ios       # iOS simulator (macOS only)
npm run web       # Web browser
```

### 3. Development Scripts

```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check

# Validate all (type-check + lint + format)
npm run validate
```

## 📋 Prerequisites

### Required:

- **Node.js**: v18 hoặc mới hơn
- **npm**: v9 hoặc mới hơn
- **Expo CLI**: Tự động cài khi chạy `npm start`

### Optional (theo platform):

- **Android**: Android Studio + Android SDK
- **iOS**: Xcode (macOS only)
- **Physical Device**: Expo Go app

## 🏗️ Project Structure

```
ExpertEnglish/
├── api/                  # API endpoints và client
│   ├── client.ts        # API client chính
│   ├── endpoints/       # API endpoints
│   ├── interceptors/    # Request/Response interceptors
│   └── config/          # API configuration
├── app/                 # Expo Router screens
├── screens/             # Screen components
├── navigation/          # Navigation config
├── components/          # Reusable components
├── stores/              # Zustand stores
├── types/               # TypeScript types
├── utils/               # Utilities
├── hooks/               # Custom hooks
├── constants/           # Constants
├── translations/        # i18n translations
└── docs/                # Documentation
```

## 🔧 Configuration Files

- `app.config.ts` - Expo configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - TailwindCSS configuration
- `eslint.config.js` - ESLint configuration

## 📱 Running on Devices

### Expo Go (Easiest):

1. Install Expo Go app on your phone
2. Run `npm start`
3. Scan QR code

### Development Build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Create development build
eas build --profile development --platform android
# or
eas build --profile development --platform ios
```

## 🐛 Troubleshooting

### "Module not found" errors:

```bash
# Clear cache
npm start -- --clear

# Or
npx expo start -c
```

### Type errors:

```bash
npm run type-check
```

### Port already in use:

```bash
# Kill process on port 8081
npx kill-port 8081
```

## 📚 Documentation

- [API Guide](./API_GUIDE.md) - API development guide
- [Architecture](../ARCHITECTURE.md) - Project architecture
- [Theme Guide](./THEME.md) - Theme customization
- [Commit Convention](./COMMIT_CONVENTION.md) - Git commit rules

## 🎯 Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Run validation: `npm run validate`
4. Commit: `git commit -m "feat: your feature"`
5. Push: `git push origin feature/your-feature`
6. Create Pull Request

## 🌐 Environment Variables

Create `.env` file (see `README.ENV.md`):

```env
API_URL=https://api.expertenglish.com
API_TIMEOUT=30000
```

## 🔐 Secure Storage

Project uses `expo-secure-store` for:

- Auth tokens
- User credentials
- Sensitive data

## 🎨 Styling

- **TailwindCSS** với NativeWind
- **Theme system** hỗ trợ dark mode
- **Custom fonts** và icons

## 📦 Key Dependencies

- **expo**: ~54.0.31
- **react**: 19.1.0
- **react-native**: 0.81.5
- **expo-router**: ~6.0.21
- **zustand**: ^5.0.10
- **@react-navigation/bottom-tabs**: ^7.4.0

## ✅ Ready to Code!

```bash
npm install
npm start
```

Press `a` for Android, `i` for iOS, or `w` for Web!
