# 📁 Project Architecture

## 🏗️ Cấu trúc dự án

```
ExpertEnglish/
├── types/              # Type definitions (TypeScript interfaces)
│   ├── api/            # API request/response types
│   │   ├── auth.request.ts
│   │   ├── auth.response.ts
│   │   ├── lesson.request.ts
│   │   └── lesson.response.ts
│   ├── entities/       # Domain entities
│   │   ├── user.entity.ts
│   │   └── lesson.entity.ts
│   ├── api.types.ts    # Generic API types
│   ├── app.types.ts    # App settings types
│   ├── common.ts       # Common shared types
│   └── index.ts        # Central export
│
├── api/                # API layer
│   ├── endpoints/      # API endpoint definitions
│   │   ├── auth.api.ts       # Auth API calls
│   │   ├── lessons.api.ts    # Lessons API calls
│   │   └── index.ts
│   ├── interceptors/   # Request/Response interceptors
│   │   ├── auth.interceptor.ts    # Add auth token
│   │   ├── error.interceptor.ts   # Handle errors
│   │   ├── logging.interceptor.ts # Log requests
│   │   └── index.ts
│   ├── config/         # API configuration
│   │   ├── api.config.ts
│   │   └── index.ts
│   ├── client.ts       # HTTP client (fetch wrapper)
│   └── index.ts        # Central export
│
├── stores/             # Zustand state management
│   ├── auth.store.ts   # Auth store
│   ├── lessons.store.ts # Lessons store
│   ├── app.store.ts    # App settings store
│   └── index.ts        # Central export
│
├── navigation/         # React Navigation
│   ├── index.tsx       # Root navigator
│   ├── InitialNavigator.tsx  # Initial/Auth flow
│   ├── tab-navigator.tsx     # Bottom tabs
│   └── navigation.service.ts # Navigation helpers
│
├── screens/            # Screen components
│   ├── home.screen.tsx
│   ├── explore.screen.tsx
│   └── index.ts
│
├── components/         # React components
│   ├── examples/       # Example components
│   ├── themed/         # Themed components
│   └── ui/             # UI components
│
├── utils/              # Utility functions
│   ├── api.ts          # API utilities (deprecated)
│   ├── config.ts       # Environment config
│   ├── logger.ts       # Logger utility (Reactotron)
│   └── security.ts     # Security utilities
│
├── translations/       # i18n localization
│   ├── en.ts           # English
│   ├── vi.ts           # Vietnamese
│   └── index.ts
│
├── hooks/              # Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-theme.ts
│   └── use-theme-color.ts
│
├── constants/          # App constants
│   ├── theme.ts
│   └── theme.config.ts
│
└── App.tsx            # Root component (React Navigation)
```

## 📦 Layer Architecture

### 1️⃣ Types Layer (`types/`)

**Mục đích**: Centralize tất cả TypeScript type definitions

**Cấu trúc**:

- `api/` - Request/Response types cho API calls
- `entities/` - Domain models (User, Lesson, etc.)
- `*.types.ts` - Common types (API states, App config, etc.)

```typescript
// Import types
import type { LoginRequest, LoginResponse } from '@/types/api';
import type { ApiState } from '@/types/api.types';
import type { Lesson, User } from '@/types/entities';
```

**Best practices**:

- ✅ Định nghĩa tất cả interfaces ở đây
- ✅ Export qua `types/index.ts`
- ✅ Sử dụng `type` imports để tránh circular dependencies
- ✅ Tách riêng API types và Entity types

### 2️⃣ API Layer (`api/`)

**Mục đích**: Xử lý tất cả API calls với interceptors và error handling

**Cấu trúc**:

- `client.ts` - HTTP client wrapper (fetch API)
- `endpoints/` - API endpoint definitions
- `interceptors/` - Request/Response interceptors
- `config/` - API configuration

```typescript
// Import API
import { authApi, lessonsApi } from '@/api';
import { apiClient } from '@/api/client';

// Sử dụng trong stores
const response = await authApi.login({ email, password });
const lessons = await lessonsApi.getAll();
```

**Interceptors**:

```typescript
// Auth Interceptor - Tự động thêm token
authInterceptor.onRequest(config);

// Error Interceptor - Xử lý errors tập trung
errorInterceptor.onResponse(response);

// Logging Interceptor - Log tất cả requests (dev only)
loggingInterceptor.onRequest(config);
```

**Best practices**:

- ✅ Mỗi domain có 1 endpoint file (`auth.api.ts`, `lessons.api.ts`)
- ✅ Tất cả API calls phải qua `apiClient`
- ✅ Return typed responses
- ✅ Không lưu state trong API layer
- ✅ Sử dụng interceptors cho cross-cutting concerns

### 3️⃣ Stores Layer (`stores/`)

**Mục đích**: Quản lý global state với Zustand

```typescript
// Import stores
import { useAppStore, useAuthStore, useLessonsStore } from '@/stores';

// Sử dụng trong component
const { user, login, logout } = useAuthStore();
const { lessons, fetchLessons } = useLessonsStore();
const { theme, language, setTheme } = useAppStore();
```

**Best practices**:

- ✅ Sử dụng API endpoints để gọi backend
- ✅ Handle loading & error states trong store
- ✅ Immutable state updates
- ✅ Type-safe actions với TypeScript
- ✅ Tách riêng business logic khỏi UI

### 4️⃣ Navigation Layer (`navigation/`)

**Mục đích**: Quản lý navigation với React Navigation

**Cấu trúc**:

- `index.tsx` - Root Stack Navigator
- `InitialNavigator.tsx` - Auth flow (Login, SignUp, etc.)
- `tab-navigator.tsx` - Bottom Tab Navigator
- `navigation.service.ts` - Programmatic navigation helpers

```typescript
// Import navigation
import { goBack, navigate } from '@/navigation';
import type { RootStackParamList } from '@/navigation';

// Sử dụng
navigate('Login');
navigate('TabNavigator', { screen: 'Home' });
goBack();
```

**Best practices**:

- ✅ Type-safe navigation với ParamList
- ✅ Sử dụng `navigationRef` cho navigation ngoài component
- ✅ Centralized navigation logic
- ✅ Deep linking support

### 5️⃣ Screens Layer (`screens/`)

**Mục đích**: Screen components cho navigation

```typescript
// Import screens
import { ExploreScreen, HomeScreen } from '@/screens';
```

**Best practices**:

- ✅ Một screen = một file
- ✅ Sử dụng stores để access state
- ✅ Keep UI logic minimal
- ✅ Extract reusable logic to hooks

### 6️⃣ Utils Layer (`utils/`)

**Mục đích**: Shared utilities và helpers

```typescript
import { ENV } from '@/utils/config';
import { logger } from '@/utils/logger';
import { decrypt, encrypt } from '@/utils/security';
```

**Best practices**:

- ✅ Pure functions only
- ✅ Well-tested utilities
- ✅ No side effects

### 7️⃣ Translations Layer (`translations/`)

**Mục đích**: Internationalization (i18n)

```typescript
import { en, vi } from '@/translations';
import type { TranslationKeys } from '@/translations';
```

## 🔄 Data Flow

```
Screen Component
    ↓ (user action)
Store (Zustand)
    ↓ (call API endpoint)
API Endpoints
    ↓ (through interceptors)
API Client (client.ts)
    ↓ (HTTP request)
Backend API
    ↓ (response)
Interceptors (error handling, logging)
    ↓
Store (update state)
    ↓ (re-render)
Screen Component
```

## 🔌 Interceptors Flow

```
Request:
  Component → Store → API Endpoint
    → Auth Interceptor (add token)
    → Logging Interceptor (log request)
    → Fetch API

Response:
  Backend
    → Error Interceptor (handle errors)
    → Logging Interceptor (log response)
    → Store → Component
```

## 📝 Ví dụ sử dụng

### Tạo feature mới (VD: Users)

#### 1. Tạo Types

**`types/entities/user.entity.ts`**

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
```

**`types/api/user.request.ts`**

```typescript
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}
```

**`types/api/user.response.ts`**

```typescript
import type { User } from '@/types/entities';

export interface UsersListResponse {
  users: User[];
  total: number;
}
```

#### 2. Tạo API Endpoint (`api/endpoints/users.api.ts`)

```typescript
import type { CreateUserRequest, UpdateUserRequest, UsersListResponse } from '@/types/api';
import type { User } from '@/types/entities';

import { apiClient } from '../client';

export const usersApi = {
  getAll: async (): Promise<UsersListResponse> => {
    return await apiClient.get<UsersListResponse>('/users');
  },

  getById: async (id: string): Promise<User> => {
    return await apiClient.get<User>(`/users/${id}`);
  },

  create: async (data: CreateUserRequest): Promise<User> => {
    return await apiClient.post<User>('/users', data);
  },

  update: async (id: string, data: UpdateUserRequest): Promise<User> => {
    return await apiClient.put<User>(`/users/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
```

**Export trong `api/endpoints/index.ts`**

```typescript
export * from './auth.api';
export * from './lessons.api';
export * from './users.api'; // Add this
```

#### 3. Tạo Store (`stores/users.store.ts`)

```typescript
import { create } from 'zustand';

import { usersApi } from '@/api';
import type { CreateUserRequest, UpdateUserRequest } from '@/types/api';
import type { User } from '@/types/entities';
import { logger } from '@/utils/logger';

interface UsersState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  createUser: (data: CreateUserRequest) => Promise<void>;
  updateUser: (id: string, data: UpdateUserRequest) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await usersApi.getAll();
      set({ users: response.users, isLoading: false });
      logger.info('Users fetched successfully', { count: response.total });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      logger.error('Failed to fetch users', error);
    }
  },

  fetchUserById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await usersApi.getById(id);
      set({ selectedUser: user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      logger.error('Failed to fetch user', error);
    }
  },

  createUser: async (data: CreateUserRequest) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await usersApi.create(data);
      set(state => ({
        users: [...state.users, newUser],
        isLoading: false,
      }));
      logger.info('User created successfully', { userId: newUser.id });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      logger.error('Failed to create user', error);
    }
  },

  updateUser: async (id: string, data: UpdateUserRequest) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await usersApi.update(id, data);
      set(state => ({
        users: state.users.map(u => (u.id === id ? updatedUser : u)),
        selectedUser: state.selectedUser?.id === id ? updatedUser : state.selectedUser,
        isLoading: false,
      }));
      logger.info('User updated successfully', { userId: id });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      logger.error('Failed to update user', error);
    }
  },

  deleteUser: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await usersApi.delete(id);
      set(state => ({
        users: state.users.filter(u => u.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
        isLoading: false,
      }));
      logger.info('User deleted successfully', { userId: id });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      logger.error('Failed to delete user', error);
    }
  },

  clearError: () => set({ error: null }),
}));
```

**Export trong `stores/index.ts`**

```typescript
export { useAuthStore } from './auth.store';
export { useLessonsStore } from './lessons.store';
export { useAppStore } from './app.store';
export { useUsersStore } from './users.store'; // Add this
```

#### 4. Tạo Screen (`screens/users.screen.tsx`)

```typescript
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUsersStore } from '@/stores';
import type { User } from '@/types/entities';

export default function UsersScreen() {
  const { users, isLoading, error, fetchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText type="defaultSemiBold">Error: {error}</ThemedText>
      </ThemedView>
    );
  }

  const renderUser = ({ item }: { item: User }) => (
    <ThemedView style={styles.userCard}>
      <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
      <ThemedText>{item.email}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  userCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
});
```

#### 5. Thêm vào Navigation

**`navigation/tab-navigator.tsx`**

```typescript
import UsersScreen from '@/screens/users.screen';

// Trong Tab.Navigator
<Tab.Screen name="Users" component={UsersScreen} />
```

## ✅ Best Practices

### DO ✅

```typescript
// ✅ Import từ central exports
import { User, Lesson } from '@/types/entities';
import { LoginRequest, LoginResponse } from '@/types/api';
import { authApi, lessonsApi } from '@/api';
import { useAuthStore } from '@/stores';

// ✅ Sử dụng type imports cho type-only imports
import type { User } from '@/types/entities';

// ✅ Handle errors properly trong stores
try {
  await authApi.login(credentials);
} catch (error) {
  logger.error('Login failed', error);
  set({ error: error.message });
}

// ✅ Sử dụng apiClient cho tất cả API calls
import { apiClient } from '@/api/client';
const data = await apiClient.get<User>('/users/me');

// ✅ Type-safe navigation
import { navigate } from '@/navigation';
import type { RootStackParamList } from '@/navigation';
navigate('Login');

// ✅ Destructure stores properly
const { user, login, logout } = useAuthStore();

// ✅ Use logger thay vì console.log
logger.info('User logged in', { userId: user.id });
logger.error('API failed', error);
```

### DON'T ❌

```typescript
// ❌ Không gọi fetch trực tiếp từ components
const response = await fetch('/api/users');

// ❌ Không định nghĩa types inline trong stores/api
interface User { ... } // Wrong location! Should be in types/

// ❌ Không lưu state trong API layer
export const authApi = {
  currentUser: null, // ❌ Wrong! State belongs in stores
};

// ❌ Không import từ nested paths
import { authApi } from '@/api/endpoints/auth.api'; // Wrong
import { authApi } from '@/api'; // Correct

// ❌ Không dùng console.log trong production code
console.log('User data:', user); // Use logger instead

// ❌ Không ignore TypeScript errors
// @ts-ignore  // Fix the type instead!

// ❌ Không hardcode URLs
const API_URL = 'https://api.example.com'; // Use ENV from config
```

## 🎯 Lợi ích của Architecture này

1. **Separation of Concerns**: Mỗi layer có responsibility rõ ràng
   - Types: Type definitions
   - API: HTTP communication
   - Stores: State management
   - Navigation: Routing
   - Screens: UI logic
   - Components: Reusable UI

2. **Type Safety**: Central types giúp maintain consistency
   - Compile-time type checking
   - IntelliSense support
   - Refactoring safety

3. **Reusability**: API endpoints có thể reuse ở nhiều stores
   - Single source of truth cho API calls
   - Shared interceptors
   - Consistent error handling

4. **Testability**: Dễ dàng test từng layer độc lập
   - Mock API responses
   - Test stores in isolation
   - Unit test utilities

5. **Maintainability**: Dễ tìm và sửa code
   - Predictable file structure
   - Clear naming conventions
   - Centralized exports

6. **Scalability**: Dễ mở rộng thêm features mới
   - Follow same patterns
   - Add new endpoints/stores
   - Minimal code changes

7. **Developer Experience**:
   - Fast navigation với centralized exports
   - Auto-complete everywhere
   - Clear error messages
   - Reactotron debugging

## 🛠️ Tools & Libraries

### State Management

- **Zustand**: Lightweight state management
  - Simple API
  - No boilerplate
  - TypeScript first

### Navigation

- **React Navigation v7**: Native navigation
  - Stack Navigator
  - Bottom Tabs Navigator
  - Type-safe routing

### HTTP Client

- **Fetch API**: Native browser API
  - Custom wrapper (`apiClient`)
  - Interceptors pattern
  - TypeScript support

### Development Tools

- **Reactotron**: Debugging tool
  - State inspection
  - API monitoring
  - Custom logs

- **Sentry**: Error tracking
  - Production errors
  - Performance monitoring
  - User feedback

### UI & Styling

- **NativeWind**: Tailwind for React Native
  - Utility-first CSS
  - Dark mode support
  - Custom themes

- **Expo Image**: Optimized images
  - Fast loading
  - Caching
  - Placeholder support

### Localization

- **Custom i18n**: Simple translation system
  - Multiple languages (EN, VI)
  - Type-safe keys
  - Easy to extend

## 📚 Resources

- [API Guide](./docs/API_GUIDE.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Theme Guide](./docs/THEME.md)
- [Commit Convention](./docs/COMMIT_CONVENTION.md)
- [EAS Build Guide](./docs/EAS_BUILD_GUIDE.md)

## 🔐 Security Practices

- ✅ Tokens stored in `expo-secure-store`
- ✅ Auth interceptor adds token automatically
- ✅ Error interceptor sanitizes error messages
- ✅ Sentry enabled in production only
- ✅ Sensitive data encrypted
- ✅ HTTPS only for API calls

## 📦 Project Scripts

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios            # Run on iOS

# Code Quality
npm run lint           # Check ESLint
npm run lint:fix       # Fix ESLint issues
npm run format         # Format with Prettier
npm run type-check     # TypeScript check
npm run validate       # Run all checks

# Build
npm run build:dev:android    # Dev build for Android
npm run build:dev:ios        # Dev build for iOS
npm run build:preview        # Preview build
npm run build:prod           # Production build
```
