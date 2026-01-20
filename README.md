# ExpertEnglish 📚

English learning mobile app built with React Native, Expo, and TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run android   # Android emulator/device
npm run ios       # iOS simulator (macOS only)
npm run web       # Web browser
```

## 📖 Documentation

- **[Development Guide](./docs/DEVELOPMENT.md)** - Complete setup & development workflow
- **[API Guide](./docs/API_GUIDE.md)** - API development guide với interceptors
- **[Architecture](./ARCHITECTURE.md)** - Project architecture & best practices
- **[Theme Guide](./docs/THEME.md)** - Theme customization
- **[Security](./SECURITY.md)** - Security guidelines
- **[Environment Setup](./README.ENV.md)** - Environment variables config

## ✨ Features

- 🔐 **Authentication** - Secure login/register với JWT tokens
- 📱 **Bottom Tab Navigation** - Clean navigation structure
- 🎨 **Dark Mode Support** - Complete theme system
- 🌍 **i18n** - Multi-language support (English/Vietnamese)
- 📊 **State Management** - Zustand stores
- 🔧 **Type-Safe API** - Full TypeScript support + Auto-complete
- 🛡️ **API Interceptors** - Auto auth token, error handling, logging
- 💾 **Secure Storage** - Encrypted data storage với expo-secure-store

## 🏗️ Tech Stack

- **React Native** 0.81.5 - Mobile framework
- **Expo** ~54.0 - Development platform
- **TypeScript** 5.9 - Type safety
- **Expo Router** 6.0 - File-based routing
- **Zustand** 5.0 - State management
- **TailwindCSS** (NativeWind) - Utility-first styling
- **React Navigation** 7.x - Navigation library

## 📁 Project Structure

```
ExpertEnglish/
├── api/                  # API layer
│   ├── client.ts        # API client với interceptors
│   ├── endpoints/       # API endpoints (auth, lessons)
│   ├── interceptors/    # Auth, Error, Logging interceptors
│   └── config/          # API configuration
├── app/                 # Expo Router app directory
│   ├── _layout.tsx     # Root layout
│   ├── index.tsx       # Entry point
│   └── modal.tsx       # Modal screen
├── screens/             # Screen components
│   ├── home.screen.tsx
│   └── explore.screen.tsx
├── navigation/          # Navigation configuration
│   ├── bottom-tab.navigator.tsx
│   └── navigation.service.ts
├── components/          # Reusable UI components
├── stores/              # Zustand state stores
│   ├── auth.store.ts
│   ├── lessons.store.ts
│   └── app.store.ts
├── types/               # TypeScript types
│   ├── api/            # API request/response types
│   ├── entities/       # Domain models
│   └── api.types.ts    # Generic API types
├── utils/               # Utility functions
├── hooks/               # Custom React hooks
├── constants/           # App constants
├── translations/        # i18n translations (en, vi)
└── docs/                # Documentation
```

## 🎯 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **Expo CLI** (installed automatically)

### Installation

1. **Clone & Install**

   ```bash
   git clone <repo-url>
   cd ExpertEnglish
   npm install
   ```

2. **Setup Environment**

   ```bash
   cp .env.example .env
   # Edit .env với your API URL
   ```

3. **Start Development**

   ```bash
   npm start
   ```

4. **Run on Device**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web
   - Scan QR code with Expo Go app

## 🔧 Development Scripts

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run on Web

# Code Quality
npm run lint           # Check code quality
npm run lint:fix       # Auto-fix lint issues
npm run format         # Format code with Prettier
npm run format:check   # Check formatting
npm run type-check     # TypeScript type checking
npm run validate       # Run all checks (type + lint + format)

# Utilities
npm run generate-icons # Generate app icons
npm run reset-project  # Reset to fresh project
```

## 📱 Building for Production

### Development Build

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Create development build
eas build --profile development --platform android
eas build --profile development --platform ios
```

### Production Build

```bash
eas build --profile production --platform all
```

## 💻 Code Examples

### Making API Calls

```typescript
import { authApi } from '@/api';

const handleLogin = async () => {
  try {
    const response = await authApi.login({ email, password });
    // ✅ Token tự động saved
    // ✅ Error tự động handled
    console.log('User:', response.user);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
```

### Using Zustand Stores

```typescript
import { useAuthStore } from '@/stores';

function LoginScreen() {
  const { login, user, isLoading, error } = useAuthStore();

  const handleSubmit = async () => {
    await login(email, password);
    // State tự động sync across all components
  };

  return (
    <View>
      <Text>{user?.name}</Text>
      {isLoading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
    </View>
  );
}
```

### Navigation

```typescript
import { goBack, navigate } from '@/navigation';

// Navigate to screen
navigate('Home');

// Go back
goBack();

// Reset navigation
resetRoot('Main');
```

## 🧪 Testing & Validation

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format checking
npm run format:check

# Run all validations
npm run validate
```

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run validation: `npm run validate`
4. Commit: `git commit -m 'feat: add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Create Pull Request

See [COMMIT_CONVENTION.md](./docs/COMMIT_CONVENTION.md) for commit guidelines.

## 📄 License

This project is private and proprietary.

## 👥 Team

Maintained by the ExpertEnglish development team.

---

**Version:** 1.0.0  
**Last Updated:** January 2026
