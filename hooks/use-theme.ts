import { Colors } from '@/constants/theme';

import { useColorScheme } from './use-color-scheme';

/**
 * Chế độ sáng/tối theo cài đặt app (light / dark / system).
 */
export function useTheme() {
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';
  return {
    isDark,
    isLight: !isDark,
    theme: scheme as 'light' | 'dark',
  };
}

export function useThemedColor(lightColor: string, darkColor: string): string {
  const { isDark } = useTheme();
  return isDark ? darkColor : lightColor;
}

/**
 * Bảng màu đồng bộ với `constants/theme` + toggle Profile.
 */
export function useThemeColors() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  return {
    background: c.background,
    surface: c.surface,
    card: c.card,
    text: {
      primary: c.text,
      secondary: c.muted,
      tertiary: c.muted,
      disabled: c.muted,
    },
    primary: c.tint,
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    border: c.border,
    divider: c.borderMuted,
    hover: c.surface,
    pressed: c.border,
    focus: c.tint,
  };
}
