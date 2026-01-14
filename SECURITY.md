# 🛡️ Security & Best Practices

Dự án này đã được setup với các tính năng bảo mật và best practices sau:

## 🔐 Bảo mật (Security)

### 1. Environment Variables

- ✅ `.env.local` - File chứa biến môi trường (không commit)
- ✅ `.env.example` - Template cho team members
- ✅ `utils/config.ts` - Centralized config management

**Sử dụng:**

```typescript
import { ENV } from '@/utils/config';

console.log(ENV.API_URL);
```

### 2. Secure Storage

- ✅ `expo-secure-store` - Lưu trữ dữ liệu nhạy cảm
- ✅ `utils/security.ts` - Token & data encryption utilities

**Sử dụng:**

```typescript
import { SecureStorage, TokenManager } from '@/utils/security';

// Lưu token
await TokenManager.setAccessToken('your-token');

// Lưu dữ liệu bất kỳ
await SecureStorage.setObject('user', { id: 1, name: 'John' });
```

### 3. Crypto Functions

- ✅ SHA256 hashing
- ✅ UUID generation
- ✅ Random bytes generation

## 🎯 Code Quality

### 1. Git Hooks (Husky)

- ✅ **Pre-commit**: Tự động lint & format code trước khi commit
- ✅ **Commit-msg**: Validate commit message format

### 2. Commit Convention

Format: `type(scope): message`

**Types:**

- `feat`: Tính năng mới
- `fix`: Sửa bug
- `docs`: Thay đổi documentation
- `style`: Format code (không thay đổi logic)
- `refactor`: Refactor code
- `perf`: Cải thiện performance
- `test`: Thêm/sửa tests
- `chore`: Công việc bảo trì

**Ví dụ:**

```bash
git commit -m "feat: add login screen"
git commit -m "fix: resolve navigation bug"
git commit -m "docs: update README"
```

### 3. TypeScript Strict Mode

- ✅ Type checking enabled
- ✅ Strict null checks

### 4. Code Formatting

- ✅ Prettier - Auto format on save
- ✅ ESLint - Code linting
- ✅ Import sorting - Automatic import organization
- ✅ Tailwind class sorting

## 📦 Utilities

### API Client (`utils/api.ts`)

```typescript
import { api } from '@/utils/api';

// GET request
const data = await api.get('/users');

// POST request
await api.post('/login', { email, password });
```

### Logger (`utils/logger.ts`)

```typescript
import { logger } from '@/utils/logger';

logger.debug('Debug message', { data });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error occurred', error);
```

## 🚀 Scripts

```bash
# Development
npm start                 # Start Expo
npm run android          # Run on Android
npm run ios              # Run on iOS

# Code Quality
npm run lint             # Check linting
npm run lint:fix         # Auto fix linting issues
npm run format           # Format all files
npm run format:check     # Check formatting
npm run type-check       # TypeScript type checking
npm run validate         # Run all checks (type + lint + format)
```

## 📋 Checklist trước khi Production

- [ ] Đã setup `.env.production` với giá trị thực
- [ ] Đã test tất cả API endpoints
- [ ] Đã enable analytics (nếu cần)
- [ ] Đã enable crash reporting
- [ ] Đã update app version trong `app.json`
- [ ] Đã test trên cả Android & iOS
- [ ] Đã review và remove tất cả `console.log`
- [ ] Đã setup CI/CD (GitHub Actions, etc.)

## 🔒 Security Notes

⚠️ **KHÔNG BAO GIỜ:**

- Commit `.env` hoặc `.env.local`
- Commit API keys, tokens, passwords
- Hardcode sensitive data trong code
- Push code chứa `console.log` sensitive data

✅ **LUÔN LUÔN:**

- Sử dụng `SecureStorage` cho dữ liệu nhạy cảm
- Validate input từ users
- Handle errors properly
- Use TypeScript types
- Follow commit conventions
- Review code trước khi merge

## 📚 Resources

- [Expo Security](https://docs.expo.dev/guides/security/)
- [React Native Security](https://reactnative.dev/docs/security)
- [Conventional Commits](https://www.conventionalcommits.org/)
