import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

import { Colors } from '@/constants/theme';
import type { AppResolvedScheme } from '@/hooks/useAppTheme';

export function buildNavigationTheme(scheme: AppResolvedScheme): Theme {
  const c = Colors[scheme];
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: c.tint,
      background: c.background,
      card: c.surfaceElevated,
      text: c.text,
      border: c.border,
      notification: c.tint,
    },
  };
}
