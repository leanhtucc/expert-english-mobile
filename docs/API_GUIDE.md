# API Development Guide

## 📚 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Luồng hoạt động API](#luồng-hoạt-động-api)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Kiến trúc API](#kiến-trúc-api)
- [Interceptors](#interceptors)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
- [Tạo API mới](#tạo-api-mới)
- [Best Practices](#best-practices)
- [Error Handling](#error-handling)
- [Testing](#testing)

---

## 🎯 Giới thiệu

API trong project được tổ chức theo kiến trúc module hóa với các tầng rõ ràng:

- **Endpoints**: Chứa các API calls
- **Interceptors**: Xử lý request/response tự động
- **Config**: Cấu hình API
- **Types**: Định nghĩa types riêng cho API

---

## 🔄 Luồng hoạt động API

### Luồng hoàn chỉnh từ Component đến Server và ngược lại:

```
┌─────────────────────────────────────────────────────────────────┐
│                     1. COMPONENT/STORE                          │
│  const user = await authApi.login({ email, password })         │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                      2. API ENDPOINT                            │
│  authApi.login() → api/endpoints/auth.api.ts                   │
│  return apiClient.post('/auth/login', credentials)             │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                      3. API CLIENT                              │
│  apiClient.post() → api/client.ts                              │
│  Chuẩn bị request với config                                   │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              4. 📝 LOGGING INTERCEPTOR (Request)                │
│  console.log('🚀 API Request: POST /auth/login')               │
│  Log: config, body, headers                                     │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              5. 🔐 AUTH INTERCEPTOR                             │
│  const token = await SecureStore.getItemAsync('auth_token')    │
│  headers.Authorization = `Bearer ${token}`                      │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              6. 🌐 FETCH API (Network Request)                  │
│  fetch('https://api.expertenglish.com/auth/login', {           │
│    method: 'POST',                                              │
│    headers: {                                                   │
│      'Content-Type': 'application/json',                        │
│      'Authorization': 'Bearer xxx'  ← Auto added               │
│    },                                                           │
│    body: JSON.stringify({ email, password })                   │
│  })                                                             │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
                    ⏳ Chờ server xử lý...
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              7. 📥 NHẬN RESPONSE TỪ SERVER                      │
│  Status: 200 OK                                                 │
│  Body: { user: {...}, token: "jwt-token" }                     │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              8. ✅ KIỂM TRA RESPONSE                            │
│  if (!response.ok) → Throw ApiError                            │
│  Parse JSON: await response.json()                             │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              9. 🚨 ERROR INTERCEPTOR                            │
│  Nếu có lỗi:                                                    │
│   - 401 → "Unauthorized. Please login again."                  │
│   - 403 → "Forbidden. No permission."                          │
│   - 404 → "Resource not found."                                │
│   - 500 → "Server error. Try again later."                     │
│   - 0   → "Network error. Check connection."                   │
│   - 408 → "Request timeout."                                   │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              10. 📝 LOGGING INTERCEPTOR (Response)              │
│  console.log('✅ API Response: /auth/login')                   │
│  Log: data                                                      │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              11. 💾 PARSE & RETURN DATA                         │
│  Type-safe data: LoginResponse                                 │
│  return { user, token }                                         │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              12. ✨ COMPONENT/STORE NHẬN DATA                   │
│  const { user, token } = response                              │
│  - Store: set({ user, token, isAuthenticated: true })         │
│  - Component: Update UI                                         │
└─────────────────────────────────────────────────────────────────┘
```

### Ví dụ cụ thể:

```typescript
// Component
const handleLogin = async () => {
  try {
    // Bước 1: Gọi API
    const response = await authApi.login({
      email: 'user@example.com',
      password: '123456',
    });

    // Bước 12: Nhận data đã được xử lý
    console.log('User:', response.user);
    console.log('Token:', response.token);
  } catch (error) {
    // Bước 9: Error đã được interceptor xử lý
    console.error('Login failed:', error.message);
  }
};

// Bên trong, tất cả bước 2-11 tự động chạy!
// ✅ Token tự động thêm vào (nếu có)
// ✅ Request tự động log (khi dev)
// ✅ Error tự động parse thành message dễ hiểu
// ✅ Response tự động log (khi dev)
```

### Luồng khi có lỗi:

```
Component → API → Client → Interceptors → Fetch
                                            ↓
                                      ❌ Error 401
                                            ↓
                           Error Interceptor catch
                                            ↓
                      Parse: "Unauthorized. Login again."
                                            ↓
                           Throw ApiError(message, 401)
                                            ↓
                      Component catch → Show error
```

---

## 📁 Cấu trúc thư mục

```
api/
├── client.ts                    # API Client chính
├── index.ts                     # Export tất cả API
├── config/
│   ├── api.config.ts           # Cấu hình API
│   └── index.ts
├── endpoints/
│   ├── auth.api.ts             # Auth endpoints
│   ├── lessons.api.ts          # Lessons endpoints
│   └── index.ts
└── interceptors/
    ├── auth.interceptor.ts     # Tự động thêm token
    ├── error.interceptor.ts    # Xử lý errors
    ├── logging.interceptor.ts  # Log requests/responses
    └── index.ts

types/
├── api.types.ts                # Generic API types
├── api/
│   ├── *.request.ts            # Request types
│   ├── *.response.ts           # Response types
│   └── index.ts
└── entities/
    ├── *.entity.ts             # Entity models
    └── index.ts
```

---

## 🛡️ Interceptors

Interceptors là các hàm tự động chạy cho **MỌI** API request/response. Giống như "người gác cổng" kiểm tra và xử lý tự động!

### 1. Auth Interceptor (`api/interceptors/auth.interceptor.ts`)

**Mục đích**: Tự động thêm Bearer token vào mọi request

```typescript
// TRƯỚC KHI CÓ INTERCEPTOR (❌ Phải làm thủ công):
fetch('/api/users', {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Content-Type': 'application/json',
  },
});

// SAU KHI CÓ INTERCEPTOR (✅ Tự động):
apiClient.get('/users'); // Token tự động được thêm!
```

**Cách hoạt động**:

```typescript
export const authInterceptor = {
  onRequest: async (config: RequestInit): Promise<RequestInit> => {
    // Lấy token từ secure storage
    const token = await SecureStore.getItemAsync('auth_token');

    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`, // ← Tự động thêm
        },
      };
    }
    return config;
  },
};
```

**Lợi ích**:

- ✅ Không cần thêm token thủ công ở mỗi API call
- ✅ Token luôn được thêm nếu user đã login
- ✅ Tránh quên thêm token gây lỗi 401

### 2. Error Interceptor (`api/interceptors/error.interceptor.ts`)

**Mục đích**: Xử lý lỗi thống nhất cho tất cả API calls

```typescript
// TRƯỚC KHI CÓ INTERCEPTOR (❌ Lặp lại mọi nơi):
try {
  const response = await fetch('/api/users');
  if (!response.ok) {
    if (response.status === 401) {
      showToast('Please login again');
      redirectToLogin();
    } else if (response.status === 500) {
      showToast('Server error');
    }
  }
} catch (error) {
  showToast('Network error');
}

// SAU KHI CÓ INTERCEPTOR (✅ Tự động xử lý):
try {
  const users = await apiClient.get('/users');
} catch (error) {
  showToast(error.message); // Message đã được parse sẵn
}
```

**Cách hoạt động**:

```typescript
export const errorInterceptor = {
  onError: (error: unknown): never => {
    // Network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('Network error. Check your connection.', 0);
    }

    // Timeout error
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timeout. Try again.', 408);
    }

    // API errors với status codes
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 401:
          throw new ApiError('Unauthorized. Please login again.', 401);
        case 403:
          throw new ApiError('Forbidden. No permission.', 403);
        case 404:
          throw new ApiError('Resource not found.', 404);
        case 500:
          throw new ApiError('Server error. Try later.', 500);
        default:
          throw error;
      }
    }

    throw new ApiError('An unexpected error occurred.', 500);
  },
};
```

**Lợi ích**:

- ✅ Xử lý tất cả loại lỗi ở 1 nơi
- ✅ Error messages thống nhất, dễ hiểu cho user
- ✅ Không cần viết try-catch phức tạp ở mỗi component

### 3. Logging Interceptor (`api/interceptors/logging.interceptor.ts`)

**Mục đích**: Tự động log mọi request/response để debug

```typescript
// TRƯỚC KHI CÓ INTERCEPTOR (❌ Phải log thủ công):
console.log('🚀 Calling API:', '/auth/login');
console.log('Request data:', { email, password });
const response = await fetch('/auth/login', { ... });
console.log('✅ Response:', await response.json());

// SAU KHI CÓ INTERCEPTOR (✅ Tự động log):
await apiClient.post('/auth/login', { email, password });
// Console tự động hiển thị:
// 🚀 API Request: POST /auth/login
// Config: { method: 'POST', ... }
// Body: { email: '...', password: '***' }
// ✅ API Response: /auth/login
// Data: { user: {...}, token: '...' }
```

**Cách hoạt động**:

```typescript
export const loggingInterceptor = {
  // Log request
  onRequest: (endpoint: string, config: RequestInit): void => {
    if (apiConfig.enableLogging) {
      // Chỉ log khi dev mode
      console.group(`🚀 API Request: ${config.method || 'GET'} ${endpoint}`);
      console.log('Config:', config);
      if (config.body) {
        console.log('Body:', config.body);
      }
      console.groupEnd();
    }
  },

  // Log response
  onResponse: <T>(endpoint: string, data: T): void => {
    if (apiConfig.enableLogging) {
      console.group(`✅ API Response: ${endpoint}`);
      console.log('Data:', data);
      console.groupEnd();
    }
  },

  // Log error
  onError: (endpoint: string, error: unknown): void => {
    if (apiConfig.enableLogging) {
      console.group(`❌ API Error: ${endpoint}`);
      console.error('Error:', error);
      console.groupEnd();
    }
  },
};
```

**Lợi ích**:

- ✅ Debug dễ dàng, thấy rõ request/response
- ✅ Tự động tắt khi production (enableLogging: false)
- ✅ Không cần viết console.log ở mọi nơi

### Interceptors trong API Client

Tất cả 3 interceptors được tích hợp vào API Client:

```typescript
// api/client.ts
class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      // 1. Apply auth interceptor
      const configWithAuth = await authInterceptor.onRequest(options);

      // 2. Log request
      loggingInterceptor.onRequest(endpoint, configWithAuth);

      // 3. Make request
      const response = await fetch(url, configWithAuth);

      // 4. Parse response
      const data = await response.json();

      // 5. Log response
      loggingInterceptor.onResponse(endpoint, data);

      return data;
    } catch (error) {
      // 6. Log error
      loggingInterceptor.onError(endpoint, error);

      // 7. Handle error
      return errorInterceptor.onError(error);
    }
  }
}
```

---

## 🏗️ Kiến trúc API

### 1. API Client (`api/client.ts`)

API Client là core của hệ thống, tích hợp tất cả interceptors:

```typescript
import { apiClient } from '@/api';

// Tự động có:
// - Auth token trong header
// - Error handling
// - Request/Response logging
// - Timeout handling
```

### 2. Interceptors

#### Auth Interceptor

```typescript
// Tự động thêm Bearer token vào mọi request
const token = await SecureStore.getItemAsync('auth_token');
headers: {
  Authorization: `Bearer ${token}`;
}
```

#### Error Interceptor

```typescript
// Xử lý errors thống nhất
- 401: Unauthorized → redirect to login
- 403: Forbidden
- 404: Not Found
- 500: Server Error
- Timeout: Request timeout
- Network: Network error
```

#### Logging Interceptor

```typescript
// Log mọi request/response khi __DEV__ = true
🚀 API Request: POST /auth/login
✅ API Response: { user, token }
❌ API Error: Network error
```

### 3. Type Organization

#### Entities (Domain Models)

```typescript
// types/entities/user.entity.ts
export interface User {
  id: string;
  email: string;
  name: string;
}
```

#### Request Types

```typescript
// types/api/auth.request.ts
export interface LoginRequest {
  email: string;
  password: string;
}
```

#### Response Types

```typescript
// types/api/auth.response.ts
export interface LoginResponse {
  user: User;
  token: string;
}
```

---

## 💻 Hướng dẫn sử dụng

### Import API

```typescript
import { authApi, lessonsApi } from '@/api';
// hoặc
import { authApi } from '@/api/endpoints';
```

### Sử dụng trong Component

```typescript
import { authApi } from '@/api';
import { LoginRequest, LoginResponse } from '@/types';

export function LoginScreen() {
  const handleLogin = async (credentials: LoginRequest) => {
    try {
      const response: LoginResponse = await authApi.login(credentials);
      console.log('User:', response.user);
      console.log('Token:', response.token);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('API Error:', error.message);
        console.error('Status:', error.statusCode);
      }
    }
  };

  return (
    // UI code
  );
}
```

### Sử dụng trong Store (Zustand)

```typescript
import { create } from 'zustand';

import { authApi } from '@/api';
import { LoginRequest, User } from '@/types';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLoading: false,
  error: null,

  login: async credentials => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      set({ user: response.user, isLoading: false });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },
}));
```

---

## 🆕 Tạo API mới

### Bước 1: Định nghĩa Types

#### 1.1. Tạo Entity

```typescript
// types/entities/exercise.entity.ts
export interface Exercise {
  id: string;
  title: string;
  type: 'multiple-choice' | 'fill-blank' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}
```

#### 1.2. Tạo Request Types

```typescript
// types/api/exercise.request.ts
import type { Exercise } from '../entities';

export interface CreateExerciseRequest {
  title: string;
  type: Exercise['type'];
  difficulty: Exercise['difficulty'];
  points: number;
}

export interface UpdateExerciseRequest {
  title?: string;
  difficulty?: Exercise['difficulty'];
  points?: number;
}
```

#### 1.3. Tạo Response Types

```typescript
// types/api/exercise.response.ts
import type { Exercise } from '../entities';

export interface GetExerciseResponse {
  data: Exercise;
}

export interface CreateExerciseResponse {
  data: Exercise;
  message: string;
}
```

#### 1.4. Export Types

```typescript
// types/entities/index.ts
export * from './exercise.entity';

// types/api/index.ts
export * from './exercise.request';
export * from './exercise.response';
```

### Bước 2: Tạo API Endpoint

```typescript
// api/endpoints/exercise.api.ts
import type {
  CreateExerciseRequest,
  Exercise,
  PaginatedResponse,
  PaginationParams,
  UpdateExerciseRequest,
} from '@/types';

import { apiClient } from '../client';

/**
 * Exercise API Endpoints
 * Handles exercise-related API calls
 */
export const exerciseApi = {
  /**
   * Get all exercises
   * @param params - Pagination parameters
   * @returns Paginated exercises
   */
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Exercise>> => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : '';
    return await apiClient.get<PaginatedResponse<Exercise>>(`/exercises${queryString}`);
  },

  /**
   * Get exercise by ID
   * @param id - Exercise ID
   * @returns Single exercise
   */
  getById: async (id: string): Promise<Exercise> => {
    return await apiClient.get<Exercise>(`/exercises/${id}`);
  },

  /**
   * Create new exercise
   * @param data - Exercise data
   * @returns Created exercise
   */
  create: async (data: CreateExerciseRequest): Promise<Exercise> => {
    return await apiClient.post<Exercise>('/exercises', data);
  },

  /**
   * Update exercise
   * @param id - Exercise ID
   * @param data - Update data
   * @returns Updated exercise
   */
  update: async (id: string, data: UpdateExerciseRequest): Promise<Exercise> => {
    return await apiClient.put<Exercise>(`/exercises/${id}`, data);
  },

  /**
   * Delete exercise
   * @param id - Exercise ID
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/exercises/${id}`);
  },
};
```

### Bước 3: Export API

```typescript
// api/endpoints/index.ts
export { authApi } from './auth.api';
export { lessonsApi } from './lessons.api';
export { exerciseApi } from './exercise.api'; // ← Thêm dòng này
```

### Bước 4: Sử dụng API

```typescript
import { exerciseApi } from '@/api';

// Get all exercises
const exercises = await exerciseApi.getAll({
  page: 1,
  limit: 10,
});

// Get by ID
const exercise = await exerciseApi.getById('123');

// Create
const newExercise = await exerciseApi.create({
  title: 'Grammar Exercise 1',
  type: 'multiple-choice',
  difficulty: 'easy',
  points: 10,
});

// Update
const updated = await exerciseApi.update('123', {
  title: 'Updated Title',
});

// Delete
await exerciseApi.delete('123');
```

---

## ✅ Best Practices

### 1. Naming Conventions

```typescript
// ✅ Good
export const authApi = {
  login: async () => {},
  logout: async () => {},
};

// ❌ Bad
export const auth = {
  doLogin: async () => {},
  performLogout: async () => {},
};
```

### 2. Type Safety

```typescript
// ✅ Always use types
const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return await apiClient.post<LoginResponse>('/auth/login', data);
};

// ❌ No types
const login = async (data: any): Promise<any> => {
  return await apiClient.post('/auth/login', data);
};
```

### 3. Error Handling

```typescript
// ✅ Handle specific errors
try {
  await authApi.login(credentials);
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.statusCode) {
      case 401:
        showError('Invalid credentials');
        break;
      case 500:
        showError('Server error');
        break;
    }
  }
}

// ❌ Generic error handling
try {
  await authApi.login(credentials);
} catch (error) {
  console.error(error);
}
```

### 4. Documentation

```typescript
// ✅ Document every function
/**
 * Get user profile by ID
 * @param userId - User ID
 * @returns User profile with full details
 * @throws {ApiError} 404 if user not found
 */
getProfile: async (userId: string): Promise<User> => {
  return await apiClient.get<User>(`/users/${userId}`);
};
```

### 5. Query Parameters

```typescript
// ✅ Use type-safe query builder
const params: PaginationParams = {
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  order: 'desc',
};

const queryString = new URLSearchParams(params as Record<string, string>).toString();

// ❌ Manual string concatenation
const url = `/lessons?page=1&limit=20&sort=createdAt`;
```

---

## 🚨 Error Handling

### Error Types

```typescript
try {
  await api.someEndpoint();
} catch (error) {
  if (error instanceof ApiError) {
    // API errors (4xx, 5xx)
    console.log(error.message);
    console.log(error.statusCode);
    console.log(error.data);
  }
}
```

### Common Error Codes

| Code | Description   | Action                 |
| ---- | ------------- | ---------------------- |
| 400  | Bad Request   | Validate input data    |
| 401  | Unauthorized  | Redirect to login      |
| 403  | Forbidden     | Show permission error  |
| 404  | Not Found     | Show not found message |
| 500  | Server Error  | Retry or show error    |
| 0    | Network Error | Check connection       |
| 408  | Timeout       | Retry request          |

### Error Interceptor

```typescript
// api/interceptors/error.interceptor.ts
// Tự động xử lý tất cả errors
// Không cần handle manually trong mỗi API call
```

---

## 🧪 Testing

### Unit Test Example

```typescript
import { authApi } from '@/api';

describe('Auth API', () => {
  it('should login successfully', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await authApi.login(credentials);

    expect(response.user).toBeDefined();
    expect(response.token).toBeDefined();
  });

  it('should handle login error', async () => {
    const credentials = {
      email: 'invalid@example.com',
      password: 'wrong',
    };

    await expect(authApi.login(credentials)).rejects.toThrow(ApiError);
  });
});
```

---

## 📝 Checklist khi tạo API mới

- [ ] Tạo entity type trong `types/entities/`
- [ ] Tạo request types trong `types/api/`
- [ ] Tạo response types trong `types/api/`
- [ ] Export types trong `types/api/index.ts`
- [ ] Tạo API endpoint trong `api/endpoints/`
- [ ] Export API trong `api/endpoints/index.ts`
- [ ] Viết JSDoc cho mọi function
- [ ] Test API với mock data
- [ ] Update documentation này

---

## 🔗 Resources

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## 👥 Contributors

Maintained by the ExpertEnglish development team.

**Last Updated:** January 2026
