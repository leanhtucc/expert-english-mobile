import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { useAppStore } from '@/stores';

/**
 * Color scheme hook that respects the user's theme setting (light/dark/system).
 * Tab navigator uses this hook to set tab bar background color.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const rnColorScheme = useRNColorScheme();
  const theme = useAppStore(state => state.theme);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Default to light until store is ready (prevents tab bar flash).
  if (!hasHydrated) {
    if (theme === 'dark') return 'dark';
    return 'light';
  }

  if (theme === 'system') {
    return rnColorScheme ?? 'light';
  }

  return theme;
}
