# EAS Development Build Setup Guide

## 📋 Bước 1: Cài đặt EAS CLI

```bash
# Cài đặt global
npm install -g eas-cli

# Kiểm tra version
eas --version
```

## 🔐 Bước 2: Login vào Expo Account

```bash
# Login
eas login

# Hoặc tạo account mới
eas register
```

Nhập email và password của Expo account.

## 🎯 Bước 3: Configure Project với EAS

```bash
# Initialize EAS trong project
eas init

# EAS sẽ:
# ✅ Tạo project ID
# ✅ Link với Expo account
# ✅ Cập nhật app.config.ts với projectId
```

**Lưu ý:** Sau khi chạy `eas init`, projectId sẽ tự động được thêm vào `app.config.ts`.

## 📱 Bước 4: Build Development Build

### Option A: Build cho Android

```bash
# Build APK (nhanh hơn, dùng cho testing)
npm run build:dev:android

# Hoặc dùng lệnh EAS trực tiếp
eas build --profile development --platform android
```

**Thời gian:** ~10-15 phút (lần đầu)

### Option B: Build cho iOS

```bash
# Build cho iOS Simulator (chỉ trên macOS)
npm run build:dev:ios

# Hoặc
eas build --profile development --platform ios
```

**Yêu cầu:**

- macOS
- Apple Developer account (nếu build cho device)
- iOS Simulator đã cài (nếu build cho simulator)

### Option C: Build cho cả hai

```bash
npm run build:dev:all
```

## 📥 Bước 5: Download & Install Build

### Android:

1. **Sau khi build xong**, EAS sẽ hiện link download
2. **Download APK** về máy hoặc điện thoại
3. **Install APK** trên Android device:
   ```bash
   # Nếu dùng adb
   adb install path/to/your-app.apk
   ```

### iOS:

1. **Sau khi build xong**, download file từ EAS
2. **Drag & drop** vào iOS Simulator
3. Hoặc dùng:
   ```bash
   # Install vào simulator
   xcrun simctl install booted path/to/your-app.app
   ```

## 🚀 Bước 6: Chạy Development Server

```bash
# Start Expo dev server
npm start
```

Trong terminal, bạn sẽ thấy:

```
› Press a │ open Android
› Press i │ open iOS
› Press w │ open web

› Scan QR code with Expo Go
```

## 📲 Bước 7: Connect Build với Dev Server

### Android/iOS Device:

1. Mở app vừa install (ExpertEnglish)
2. Ứng dụng sẽ hiện màn hình "Connect to Metro"
3. Chọn một trong các option:
   - **Scan QR Code**: Scan QR từ terminal
   - **Enter URL manually**: Nhập URL từ terminal
   - **Local network**: Tự động detect

### Development Server URL có dạng:

```
exp://192.168.1.xxx:8081
```

## ✅ Bước 8: Verify Setup

Sau khi connect thành công:

1. ✅ App sẽ load code từ dev server
2. ✅ Hot reload tự động khi save file
3. ✅ Console logs hiện trên terminal
4. ✅ Debug menu: Shake device hoặc press menu

## 🔧 Các Scripts Có Sẵn

```bash
# Development builds
npm run build:dev:android    # Build Android development
npm run build:dev:ios        # Build iOS development
npm run build:dev:all        # Build cả hai

# Preview builds (beta testing)
npm run build:preview        # Build preview cho QA

# Production builds
npm run build:prod           # Build production release
```

## 📊 Build Profiles trong eas.json

### Development Profile:

- ✅ Development client enabled
- ✅ Fast refresh
- ✅ Debug console
- ✅ React DevTools
- 📦 APK output (Android)
- 🔨 Debug build (iOS)

### Preview Profile:

- ✅ Internal distribution
- ✅ Staging environment
- 📦 APK output
- 🧪 For QA testing

### Production Profile:

- 🚀 Production ready
- 📦 AAB for Google Play
- 🍎 IPA for App Store
- ⚡ Optimized & minified

## 🐛 Troubleshooting

### Issue: "eas: command not found"

```bash
npm install -g eas-cli
# Hoặc
npx eas-cli --version
```

### Issue: Build failed - Missing credentials

```bash
# Configure credentials
eas credentials

# Hoặc để EAS tự động generate
eas build --profile development --platform android --clear-cache
```

### Issue: Can't connect to dev server

```bash
# Đảm bảo:
# 1. Máy tính và điện thoại cùng WiFi
# 2. Firewall không block port 8081
# 3. Dev server đang chạy (npm start)

# Restart dev server
npm start -- --clear
```

### Issue: Build quá lâu

```bash
# Check build status
eas build:list

# Cancel build nếu cần
eas build:cancel
```

## 🎯 Next Steps

Sau khi setup xong development build:

1. **Develop**: Code và test với hot reload
2. **Debug**: Dùng React DevTools và console
3. **Test**: Test trên real device
4. **Share**: Share build với team qua EAS
5. **Iterate**: Rebuild khi cần update native code

## 📚 Tài liệu tham khảo

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [EAS Workflows](https://docs.expo.dev/build/eas-json/)

## 💡 Tips

### Tip 1: Build cục bộ (nhanh hơn)

```bash
# Cài đặt local build tools
npm install -g expo-cli

# Build locally
npx expo run:android  # Build & run Android local
npx expo run:ios      # Build & run iOS local (macOS only)
```

### Tip 2: Share builds với team

```bash
# Build sẽ tự động lưu trên Expo servers
# Share link với team members
eas build:list
```

### Tip 3: Update OTA (Over-The-Air)

```bash
# Update JavaScript code mà không cần rebuild
eas update --branch development
```

### Tip 4: Check build logs

```bash
# View build logs
eas build:view [build-id]
```

## 🎉 Hoàn thành!

Giờ bạn có:

- ✅ Development build trên device
- ✅ Hot reload và fast refresh
- ✅ Debug tools
- ✅ Real device testing
- ✅ Native module support

Happy coding! 🚀
