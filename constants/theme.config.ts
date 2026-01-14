/**
 * Theme Colors
 * Centralized color definitions for the app
 */

export const colors = {
  // Primary
  primary: {
    50: '#E6F4FE',
    100: '#CCE9FD',
    200: '#99D3FB',
    300: '#66BDF9',
    400: '#33A7F7',
    500: '#0091F5',
    600: '#0074C4',
    700: '#005793',
    800: '#003A62',
    900: '#001D31',
  },
  // Secondary
  secondary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  // Success
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  // Warning
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  // Error
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  // Neutral
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  // Semantic colors
  background: {
    light: '#FFFFFF',
    dark: '#0A0A0A',
  },
  surface: {
    light: '#F5F5F5',
    dark: '#171717',
  },
} as const;

/**
 * Typography
 */
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
  },
  fontSize: {
    // Display
    displayLg: { fontSize: 60, lineHeight: 72 },
    displayMd: { fontSize: 48, lineHeight: 58 },
    displaySm: { fontSize: 36, lineHeight: 45 },
    // Headings
    h1: { fontSize: 32, lineHeight: 42, fontWeight: '700' as const },
    h2: { fontSize: 28, lineHeight: 36, fontWeight: '700' as const },
    h3: { fontSize: 24, lineHeight: 32, fontWeight: '600' as const },
    h4: { fontSize: 20, lineHeight: 28, fontWeight: '600' as const },
    h5: { fontSize: 18, lineHeight: 25, fontWeight: '600' as const },
    h6: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
    // Body
    bodyLg: { fontSize: 18, lineHeight: 29 },
    body: { fontSize: 16, lineHeight: 26 },
    bodySm: { fontSize: 14, lineHeight: 21 },
    // Label/Caption
    label: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
    caption: { fontSize: 12, lineHeight: 17 },
    overline: { fontSize: 10, lineHeight: 15, fontWeight: '600' as const },
  },
} as const;

/**
 * Spacing
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
} as const;

/**
 * Border Radius
 */
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  '4xl': 32,
  full: 9999,
} as const;

/**
 * Shadows (React Native compatible)
 */
export const shadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 16,
  },
} as const;

/**
 * Theme object
 */
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;
