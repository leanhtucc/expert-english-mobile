import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { useAppStore } from '@/stores';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();
  const theme = useAppStore(state => state.theme);

  if (hasHydrated) {
    if (theme === 'system') return colorScheme ?? 'light';
    if (theme === 'dark') return 'dark';
    return 'light';
  }

  // Default to light while not hydrated to avoid UI mismatch.
  if (theme === 'dark') return 'dark';
  return 'light';
}
