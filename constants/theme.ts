/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

/** Màu dùng cho SafeArea / màn hình / thẻ — đồng bộ sáng tối */
export const Colors = {
  light: {
    text: '#11181C',
    background: '#F8FAFC',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    surface: '#F1F5F9',
    surfaceElevated: '#FFFFFF',
    border: '#E2E8F0',
    borderMuted: '#F1F5F9',
    muted: '#64748B',
    card: '#FFFFFF',
    statusBarStyle: 'dark-content' as const,
  },
  dark: {
    text: '#F4F4F5',
    background: '#0C0A09',
    tint: tintColorDark,
    icon: '#A8A29E',
    tabIconDefault: '#A8A29E',
    tabIconSelected: tintColorDark,
    surface: '#1C1917',
    surfaceElevated: '#292524',
    border: '#44403C',
    borderMuted: '#3F3F46',
    muted: '#A8A29E',
    card: '#292524',
    statusBarStyle: 'light-content' as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
