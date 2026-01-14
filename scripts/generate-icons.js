const { generateImageAsync } = require('@expo/image-utils');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

const __filename =
  typeof __filename !== 'undefined' ? __filename : require('url').fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  const assetsDir = path.join(__dirname, '..', 'assets', 'images');
  const sourceImage = path.join(assetsDir, 'expert-english-logo.png');

  if (!fs.existsSync(sourceImage)) {
    console.error('❌ Không tìm thấy file: expert-english-logo.png');
    console.log('📝 Vui lòng lưu logo vào: assets/images/expert-english-logo.png');
    return;
  }

  console.log('🎨 Đang tạo icons...\n');

  try {
    // 1. App Icon (1024x1024)
    console.log('📱 Generating app icon (1024x1024)...');
    await generateImageAsync(
      { projectRoot: process.cwd(), cacheType: 'icon' },
      {
        src: sourceImage,
        width: 1024,
        height: 1024,
        resizeMode: 'cover',
        backgroundColor: '#0A4A6B',
      },
      path.join(assetsDir, 'icon.png')
    );

    // 2. Favicon (48x48)
    console.log('🌐 Generating favicon (48x48)...');
    await generateImageAsync(
      { projectRoot: process.cwd(), cacheType: 'icon' },
      {
        src: sourceImage,
        width: 48,
        height: 48,
        resizeMode: 'cover',
        backgroundColor: '#0A4A6B',
      },
      path.join(assetsDir, 'favicon.png')
    );

    // 3. Splash Icon (400x400)
    console.log('💦 Generating splash icon (400x400)...');
    await generateImageAsync(
      { projectRoot: process.cwd(), cacheType: 'icon' },
      {
        src: sourceImage,
        width: 400,
        height: 400,
        resizeMode: 'contain',
        backgroundColor: 'transparent',
      },
      path.join(assetsDir, 'splash-icon.png')
    );

    // 4. Android Adaptive Icons (1024x1024 each)
    console.log('🤖 Generating Android adaptive icons...');

    // Foreground (logo only)
    await generateImageAsync(
      { projectRoot: process.cwd(), cacheType: 'icon' },
      {
        src: sourceImage,
        width: 1024,
        height: 1024,
        resizeMode: 'contain',
        backgroundColor: 'transparent',
      },
      path.join(assetsDir, 'android-icon-foreground.png')
    );

    // Background
    await generateImageAsync(
      { projectRoot: process.cwd(), cacheType: 'icon' },
      {
        src: sourceImage,
        width: 1024,
        height: 1024,
        resizeMode: 'cover',
        backgroundColor: '#0A4A6B',
      },
      path.join(assetsDir, 'android-icon-background.png')
    );

    // Monochrome (grayscale)
    await generateImageAsync(
      { projectRoot: process.cwd(), cacheType: 'icon' },
      {
        src: sourceImage,
        width: 1024,
        height: 1024,
        resizeMode: 'contain',
        backgroundColor: 'transparent',
      },
      path.join(assetsDir, 'android-icon-monochrome.png')
    );

    console.log('\n✅ Tất cả icons đã được tạo thành công!');
    console.log('\n📝 Files đã tạo:');
    console.log('  - icon.png (1024x1024)');
    console.log('  - favicon.png (48x48)');
    console.log('  - splash-icon.png (400x400)');
    console.log('  - android-icon-foreground.png (1024x1024)');
    console.log('  - android-icon-background.png (1024x1024)');
    console.log('  - android-icon-monochrome.png (1024x1024)');
    console.log('\n🚀 Chạy: npx expo start --clear để áp dụng icons mới');
  } catch (error) {
    console.error('❌ Lỗi khi tạo icons:', error.message);
    console.error(error.stack);
  }
}

generateIcons();
