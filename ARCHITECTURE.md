# 📁 Project Architecture

## 🏗️ Cấu trúc dự án

```
ExpertEnglish/
├── types/              # Type definitions (TypeScript interfaces)
│   ├── api.types.ts    # Generic API types
│   ├── auth.types.ts   # Authentication types
│   ├── lesson.types.ts # Lesson types
│   ├── app.types.ts    # App settings types
│   └── index.ts        # Central export
│
├── services/           # API service layer
│   ├── auth.service.ts # Auth API calls
│   ├── lessons.service.ts # Lessons API calls
│   └── index.ts        # Central export
│
├── stores/             # Zustand state management
│   ├── auth.store.ts   # Auth store
│   ├── lessons.store.ts # Lessons store
│   ├── app.store.ts    # App settings store
│   └── index.ts        # Central export
│
├── utils/              # Utility functions
│   ├── api.ts          # API client
│   ├── config.ts       # Environment config
│   ├── logger.ts       # Logger utility
│   └── security.ts     # Security utilities
│
├── components/         # React components
│   ├── examples/       # Example components
│   └── ui/            # UI components
│
└── app/               # Expo Router screens
    ├── (tabs)/
    └── _layout.tsx
```

## 📦 Layer Architecture

### 1️⃣ Types Layer (`types/`)

**Mục đích**: Centralize tất cả TypeScript type definitions

```typescript
// Import types
import type { Lesson, LoginRequest, User } from '@/types';
```

**Best practices**:

- ✅ Định nghĩa tất cả interfaces ở đây
- ✅ Export qua `types/index.ts`
- ✅ Sử dụng `type` imports để tránh circular dependencies

### 2️⃣ API Layer (`api/`)

**Mục đích**: Xử lý tất cả API calls

```typescript
// Import API
import { authApi, lessonsApi } from '@/api';

// Sử dụng
const user = await authApi.login({ email, password });
const lessons = await lessonsApi.getAll();
```

**Best practices**:

- ✅ Mỗi domain có 1 service file (auth, lessons, etc.)
- ✅ Tất cả API calls phải qua services
- ✅ Return typed responses
- ✅ Không lưu state trong services

### 3️⃣ Stores Layer (`stores/`)

**Mục đích**: Quản lý global state với Zustand

```typescript
// Import stores
import { useAuthStore, useLessonsStore } from '@/stores';

// Sử dụng trong component
const { user, login } = useAuthStore();
const { data, fetchLessons } = useLessonsStore();
```

**Best practices**:

- ✅ Sử dụng services để gọi API
- ✅ Handle loading & error states
- ✅ Immutable state updates
- ✅ Type-safe actions

### 4️⃣ Utils Layer (`utils/`)

**Mục đích**: Shared utilities và helpers

```typescript
import { api } from '@/utils/api';
import { ENV } from '@/utils/config';
import { logger } from '@/utils/logger';
```

## 🔄 Data Flow

```
Component
    ↓ (call action)
Store (Zustand)
    ↓ (call service)
Service Layer
    ↓ (HTTP request)
API Client (utils/api.ts)
    ↓
Backend API
```

## 📝 Ví dụ sử dụng

### Tạo feature mới (VD: Users)

#### 1. Tạo Types (`types/user.types.ts`)

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}
```

#### 2. Tạo Service (`services/users.service.ts`)

```typescript
import type { CreateUserRequest, User } from '@/types';
import { api } from '@/utils/api';

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    return await api.get<User[]>('/users');
  },

  create: async (data: CreateUserRequest): Promise<User> => {
    return await api.post<User>('/users', data);
  },
};
```

#### 3. Tạo Store (`stores/users.store.ts`)

```typescript
import { create } from 'zustand';

import { usersApi } from '@/api';
import type { ApiState, User } from '@/types';

interface UsersState extends ApiState<User[]> {
  fetchUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersState>(set => ({
  data: null,
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await usersApi.getAll();
      set({ data: users, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
```

#### 4. Sử dụng trong Component

```typescript
import { useEffect } from 'react';
import { useUsersStore } from '@/stores';

export default function UsersScreen() {
  const { data, isLoading, fetchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <UserCard user={item} />}
    />
  );
}
```

## ✅ Best Practices

### DO ✅

```typescript
// ✅ Import từ central exports
import { User, Lesson } from '@/types';
import { authApi, lessonsApi } from '@/api';
import { useAuthStore } from '@/stores';

// ✅ Sử dụng type imports
import type { User } from '@/types';

// ✅ Handle errors properly
try {
  await authApi.login(credentials);
} catch (error) {
  logger.error('Login failed', error);
}
```

### DON'T ❌

```typescript
// ❌ Không gọi API trực tiếp từ components
const response = await fetch('/api/users');

// ❌ Không định nghĩa types inline trong stores/services
interface User { ... } // Wrong location!

// ❌ Không lưu state trong services
export const authService = {
  currentUser: null, // ❌ Wrong!
};
```

## 🎯 Lợi ích của Architecture này

1. **Separation of Concerns**: Mỗi layer có responsibility rõ ràng
2. **Type Safety**: Central types giúp maintain consistency
3. **Reusability**: Services có thể reuse ở nhiều stores
4. **Testability**: Dễ dàng test từng layer độc lập
5. **Maintainability**: Dễ tìm và sửa code
6. **Scalability**: Dễ mở rộng thêm features mới

## 📚 Resources

- [Types Documentation](./types/index.ts)
- [Services Documentation](./services/index.ts)
- [Stores Documentation](./stores/README.md)
