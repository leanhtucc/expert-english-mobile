import React from 'react';
import type { TextProps, ViewProps } from 'react-native';
import { Text as RNText, View as RNView } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme';

/**
 * Themed Text Component
 */
export function Text({ style, ...props }: TextProps) {
  const colors = useThemeColors();

  return <RNText style={[{ color: colors.text.primary }, style]} {...props} />;
}

/**
 * Themed View Component
 */
export function View({ style, ...props }: ViewProps) {
  const colors = useThemeColors();

  return <RNView style={[{ backgroundColor: colors.background }, style]} {...props} />;
}

/**
 * Card Component
 */
export function Card({ style, ...props }: ViewProps) {
  const colors = useThemeColors();

  return (
    <RNView
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}
    />
  );
}

/**
 * Surface Component
 */
export function Surface({ style, ...props }: ViewProps) {
  const colors = useThemeColors();

  return <RNView style={[{ backgroundColor: colors.surface }, style]} {...props} />;
}
