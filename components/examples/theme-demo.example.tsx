import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { borderRadius, colors, shadows, spacing, typography } from '@/constants/theme.config';
import { useTheme, useThemeColors } from '@/hooks/use-theme';
import { useAppStore } from '@/stores';

/**
 * Theme Demo Component
 * Showcase all theme elements
 */
export default function ThemeDemo() {
  const { isDark } = useTheme();
  const themeColors = useThemeColors();
  const { setTheme } = useAppStore();

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: themeColors.background }}>
      <View className="p-6">
        {/* Header */}
        <Text
          className="text-h2 mb-2"
          style={{ color: themeColors.text.primary, ...typography.fontSize.h2 }}
        >
          Theme System
        </Text>
        <Text className="text-body-sm mb-6" style={{ color: themeColors.text.secondary }}>
          Current mode: {isDark ? 'Dark' : 'Light'}
        </Text>

        {/* Theme Toggle */}
        <View className="mb-8">
          <Text className="text-h5 mb-3" style={{ color: themeColors.text.primary }}>
            Theme Modes
          </Text>
          <View className="flex-row gap-2">
            {(['light', 'dark', 'system'] as const).map(mode => (
              <TouchableOpacity
                key={mode}
                onPress={() => setTheme(mode)}
                className="flex-1 rounded-lg py-3"
                style={{
                  backgroundColor: themeColors.surface,
                  borderWidth: 1,
                  borderColor: themeColors.border,
                }}
              >
                <Text
                  className="text-center font-semibold capitalize"
                  style={{ color: themeColors.text.primary }}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Colors */}
        <View className="mb-8">
          <Text className="text-h5 mb-3" style={{ color: themeColors.text.primary }}>
            Brand Colors
          </Text>
          <View className="flex-row flex-wrap gap-3">
            <ColorSwatch name="Primary" color={colors.primary[500]} />
            <ColorSwatch name="Secondary" color={colors.secondary[500]} />
            <ColorSwatch name="Success" color={colors.success[500]} />
            <ColorSwatch name="Warning" color={colors.warning[500]} />
            <ColorSwatch name="Error" color={colors.error[500]} />
          </View>
        </View>

        {/* Typography */}
        <View className="mb-8">
          <Text className="text-h5 mb-3" style={{ color: themeColors.text.primary }}>
            Typography
          </Text>
          <View className="gap-3">
            <Text style={{ color: themeColors.text.primary, ...typography.fontSize.h1 }}>
              Heading 1
            </Text>
            <Text style={{ color: themeColors.text.primary, ...typography.fontSize.h2 }}>
              Heading 2
            </Text>
            <Text style={{ color: themeColors.text.primary, ...typography.fontSize.h3 }}>
              Heading 3
            </Text>
            <Text style={{ color: themeColors.text.primary, ...typography.fontSize.body }}>
              Body text with normal weight
            </Text>
            <Text style={{ color: themeColors.text.secondary, ...typography.fontSize.bodySm }}>
              Small body text
            </Text>
            <Text style={{ color: themeColors.text.tertiary, ...typography.fontSize.caption }}>
              Caption text
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View className="mb-8">
          <Text className="text-h5 mb-3" style={{ color: themeColors.text.primary }}>
            Buttons
          </Text>
          <View className="gap-3">
            <TouchableOpacity
              className="rounded-lg px-6 py-3"
              style={{ backgroundColor: colors.primary[500] }}
            >
              <Text className="text-center font-semibold text-white">Primary Button</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-lg px-6 py-3"
              style={{ backgroundColor: colors.secondary[500] }}
            >
              <Text className="text-center font-semibold text-white">Secondary Button</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-lg border px-6 py-3"
              style={{
                backgroundColor: 'transparent',
                borderColor: themeColors.border,
              }}
            >
              <Text
                className="text-center font-semibold"
                style={{ color: themeColors.text.primary }}
              >
                Outline Button
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards */}
        <View className="mb-8">
          <Text className="text-h5 mb-3" style={{ color: themeColors.text.primary }}>
            Cards
          </Text>
          <View
            className="mb-3 rounded-xl p-4"
            style={{
              backgroundColor: themeColors.card,
              borderWidth: 1,
              borderColor: themeColors.border,
              ...shadows.sm,
            }}
          >
            <Text className="text-h6 mb-1" style={{ color: themeColors.text.primary }}>
              Card Title
            </Text>
            <Text style={{ color: themeColors.text.secondary }}>
              This is a card component with themed colors
            </Text>
          </View>

          <View
            className="rounded-xl p-4"
            style={{
              backgroundColor: themeColors.card,
              borderWidth: 1,
              borderColor: themeColors.border,
              ...shadows.md,
            }}
          >
            <Text className="text-h6 mb-1" style={{ color: themeColors.text.primary }}>
              Card with Shadow
            </Text>
            <Text style={{ color: themeColors.text.secondary }}>
              This card has medium shadow elevation
            </Text>
          </View>
        </View>

        {/* Spacing */}
        <View className="mb-8">
          <Text className="text-h5 mb-3" style={{ color: themeColors.text.primary }}>
            Spacing System
          </Text>
          <View className="gap-2">
            {Object.entries(spacing).map(([key, value]) => (
              <View key={key} className="flex-row items-center gap-3">
                <View
                  style={{
                    width: value,
                    height: 24,
                    backgroundColor: colors.primary[500],
                    borderRadius: 4,
                  }}
                />
                <Text style={{ color: themeColors.text.secondary }}>
                  {key}: {value}px
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Color Swatch Component
 */
function ColorSwatch({ name, color }: { name: string; color: string }) {
  return (
    <View className="items-center">
      <View
        style={{
          width: 60,
          height: 60,
          backgroundColor: color,
          borderRadius: borderRadius.lg,
          marginBottom: 8,
        }}
      />
      <Text className="text-caption text-neutral-600">{name}</Text>
    </View>
  );
}
