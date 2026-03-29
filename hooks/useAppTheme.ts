import { useMemo } from 'react';

import { Colors } from '@/constants/theme';

import { useColorScheme } from './use-color-scheme';

export type AppResolvedScheme = 'light' | 'dark';

/**
 * Màu theo chế độ sáng/tối (kể cả khi store = system).
 */
export function useAppTheme() {
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const colors = useMemo(() => Colors[scheme], [scheme]);

  return { colors, scheme: scheme as AppResolvedScheme, isDark };
}
