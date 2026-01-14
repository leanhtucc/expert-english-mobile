import { useColorScheme as useRNColorScheme } from 'react-native';

import { useAppStore } from '@/stores';

/**
 * Theme Hook
 * Returns current theme mode and colors
 */
export function useTheme() {
  const systemColorScheme = useRNColorScheme();
  const { theme: themeMode } = useAppStore();

  // Determine actual theme based on setting
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');

  return {
    isDark,
    isLight: !isDark,
    theme: isDark ? 'dark' : 'light',
  };
}

/**
 * Get themed color
 * Returns appropriate color based on theme
 */
export function useThemedColor(lightColor: string, darkColor: string): string {
  const { isDark } = useTheme();
  return isDark ? darkColor : lightColor;
}

/**
 * Theme Colors Hook
 * Returns theme-aware color palette
 */
export function useThemeColors() {
  const { isDark } = useTheme();

  return {
    // Background
    background: isDark ? '#0A0A0A' : '#FFFFFF',
    surface: isDark ? '#171717' : '#F5F5F5',
    card: isDark ? '#262626' : '#FFFFFF',

    // Text
    text: {
      primary: isDark ? '#FAFAFA' : '#0A0A0A',
      secondary: isDark ? '#A3A3A3' : '#525252',
      tertiary: isDark ? '#737373' : '#737373',
      disabled: isDark ? '#525252' : '#D4D4D4',
    },

    // Brand
    primary: '#0091F5',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',

    // Border
    border: isDark ? '#262626' : '#E5E5E5',
    divider: isDark ? '#171717' : '#F5F5F5',

    // Interactive
    hover: isDark ? '#262626' : '#F5F5F5',
    pressed: isDark ? '#404040' : '#E5E5E5',
    focus: '#0091F5',
  };
}
