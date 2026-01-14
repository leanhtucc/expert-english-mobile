# Environment Variables Setup

## Quick Start

1. **Copy file mẫu:**

   ```bash
   # Windows
   copy .env.example .env

   # Linux/Mac
   cp .env.example .env
   ```

2. **Chỉnh sửa `.env`** với thông tin thật của bạn

3. **KHÔNG BAO GIỜ commit file `.env`** lên Git (đã có trong .gitignore)

## Files

- ✅ `.env.example` - File mẫu, commit lên Git
- ❌ `.env` - File thật của bạn, KHÔNG commit (đã ignore)
- ❌ `.env.local`, `.env.production` - KHÔNG commit (đã ignore)

## Cấu hình

```env
# API URL - Thay bằng API thật
EXPO_PUBLIC_API_URL=https://your-api.com

# Các keys thật
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-real-key
EXPO_PUBLIC_FACEBOOK_APP_ID=your-real-key
```

## Sử dụng trong code

```typescript
import { ENV } from '@/utils/config';

// Dùng ENV config
console.log(ENV.API_URL);
console.log(ENV.DEBUG_MODE);
```

## Note

- File `.env` chỉ tồn tại local, mỗi dev tự tạo
- Team share `.env.example` để biết cần config gì
- Production sẽ config trên server/CI/CD
