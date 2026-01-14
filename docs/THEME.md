# 🎨 Theme System Documentation

## 📚 Tổng quan

Dự án sử dụng **Tailwind CSS** với theme system đầy đủ hỗ trợ:

- ✅ Color palette hoàn chỉnh
- ✅ Typography system
- ✅ Spacing & sizing
- ✅ Dark mode
- ✅ Animations
- ✅ React Native compatible

## 🎨 Colors

### Brand Colors

```typescript
// Primary - Blue (Education theme)
primary - 500; // #0091F5 - Main color
primary - 50; // Very light
primary - 900; // Very dark

// Secondary - Purple (Accent)
secondary - 500; // #8B5CF6 - Main color

// Success - Green
success - 500; // #10B981

// Warning - Yellow
warning - 500; // #F59E0B

// Error - Red
error - 500; // #EF4444
```

### Sử dụng trong JSX

```tsx
// With Tailwind classes
<View className="bg-primary-500">
  <Text className="text-white">Primary Button</Text>
</View>

// With theme config
import { colors } from '@/constants/theme.config';

<View style={{ backgroundColor: colors.primary[500] }}>
  <Text style={{ color: colors.neutral[50] }}>Text</Text>
</View>

// With theme hook (auto dark mode)
import { useThemeColors } from '@/hooks/use-theme';

function MyComponent() {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text.primary }}>
        Auto adapts to dark/light mode
      </Text>
    </View>
  );
}
```

## 🔤 Typography

### Font Sizes

```tsx
// Display sizes
<Text className="text-display-lg">Display Large</Text>
<Text className="text-display-md">Display Medium</Text>

// Heading sizes
<Text className="text-h1">Heading 1</Text>
<Text className="text-h2">Heading 2</Text>
<Text className="text-h3">Heading 3</Text>

// Body sizes
<Text className="text-body-lg">Large body text</Text>
<Text className="text-body">Normal body text</Text>
<Text className="text-body-sm">Small body text</Text>

// Labels
<Text className="text-label">Label text</Text>
<Text className="text-caption">Caption text</Text>
```

### Using Typography Config

```tsx
import { typography } from '@/constants/theme.config';

<Text style={typography.fontSize.h1}>Heading</Text>
<Text style={typography.fontSize.body}>Body</Text>
```

## 📏 Spacing

```tsx
// Tailwind classes
<View className="p-4">     {/* 16px */}
<View className="m-6">     {/* 24px */}
<View className="gap-3">   {/* 12px */}

// Custom spacing
import { spacing } from '@/constants/theme.config';

<View style={{ padding: spacing.md }}>      {/* 16px */}
<View style={{ margin: spacing.lg }}>       {/* 24px */}
<View style={{ gap: spacing['2xl'] }}>      {/* 48px */}
```

## 🔘 Border Radius

```tsx
// Tailwind classes
<View className="rounded-lg">    {/* 8px */}
<View className="rounded-xl">    {/* 12px */}
<View className="rounded-2xl">   {/* 16px */}
<View className="rounded-full">  {/* 9999px */}

// With config
import { borderRadius } from '@/constants/theme.config';

<View style={{ borderRadius: borderRadius.xl }}>
```

## 🌓 Dark Mode

### Setup

```tsx
import { useTheme, useThemeColors } from '@/hooks/use-theme';

function MyScreen() {
  const { isDark } = useTheme();
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text.primary }}>Auto dark mode!</Text>
    </View>
  );
}
```

### Theme Toggle

```tsx
import { useAppStore } from '@/stores';

function ThemeSettings() {
  const { theme, setTheme } = useAppStore();

  return (
    <>
      <Button onPress={() => setTheme('light')}>Light</Button>
      <Button onPress={() => setTheme('dark')}>Dark</Button>
      <Button onPress={() => setTheme('system')}>System</Button>
    </>
  );
}
```

### Themed Components

```tsx
import { Card, Surface, Text, View } from '@/components/themed';

// Auto adapts to theme
<View>
  <Text>Themed text</Text>
  <Card>Themed card</Card>
  <Surface>Themed surface</Surface>
</View>;
```

## 💫 Animations

```tsx
// Tailwind animation classes
<View className="animate-fade-in">
<View className="animate-slide-up">
<View className="animate-scale-in">
<View className="animate-pulse-slow">
<View className="animate-spin-slow">
```

## 🎯 Common Patterns

### Button Styles

```tsx
// Primary Button
<TouchableOpacity className="bg-primary-500 py-3 px-6 rounded-lg">
  <Text className="text-white font-semibold text-center">
    Primary
  </Text>
</TouchableOpacity>

// Secondary Button
<TouchableOpacity className="bg-secondary-500 py-3 px-6 rounded-lg">
  <Text className="text-white font-semibold text-center">
    Secondary
  </Text>
</TouchableOpacity>

// Outline Button
<TouchableOpacity className="border border-primary-500 py-3 px-6 rounded-lg">
  <Text className="text-primary-500 font-semibold text-center">
    Outline
  </Text>
</TouchableOpacity>

// Ghost Button
<TouchableOpacity className="py-3 px-6">
  <Text className="text-primary-500 font-semibold text-center">
    Ghost
  </Text>
</TouchableOpacity>
```

### Card Styles

```tsx
// Basic Card
<View className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
  <Text className="text-h5 mb-2">Card Title</Text>
  <Text className="text-body-sm text-neutral-600 dark:text-neutral-400">
    Card content
  </Text>
</View>

// Elevated Card
<View className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-md">
  <Text>Elevated Card</Text>
</View>
```

### Input Styles

```tsx
<TextInput
  className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-body dark:border-neutral-700 dark:bg-neutral-900"
  placeholderTextColor="#A3A3A3"
/>
```

## 📱 Example Component

```tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { colors, shadows, typography } from '@/constants/theme.config';
import { useThemeColors } from '@/hooks/use-theme';

export default function ProfileCard() {
  const themeColors = useThemeColors();

  return (
    <View
      className="rounded-2xl p-6"
      style={{
        backgroundColor: themeColors.card,
        borderWidth: 1,
        borderColor: themeColors.border,
        ...shadows.md,
      }}
    >
      <Text className="mb-2 text-h4" style={{ color: themeColors.text.primary }}>
        John Doe
      </Text>

      <Text className="mb-4 text-body-sm" style={{ color: themeColors.text.secondary }}>
        john@example.com
      </Text>

      <TouchableOpacity
        className="rounded-lg py-3"
        style={{ backgroundColor: colors.primary[500] }}
      >
        <Text className="text-center font-semibold text-white">View Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## 🎨 Theme Demo

Xem demo đầy đủ tại:

- [components/examples/theme-demo.example.tsx](../components/examples/theme-demo.example.tsx)

## 📚 Files

- [tailwind.config.js](../tailwind.config.js) - Tailwind config
- [constants/theme.config.ts](../constants/theme.config.ts) - Theme values
- [hooks/use-theme.ts](../hooks/use-theme.ts) - Theme hooks
- [components/themed/index.tsx](../components/themed/index.tsx) - Themed components

## ✨ Best Practices

### DO ✅

```tsx
// ✅ Use theme hooks for dynamic colors
const colors = useThemeColors();

// ✅ Use Tailwind classes when possible
<View className="bg-primary-500 p-4 rounded-lg">

// ✅ Combine Tailwind with style prop for complex styles
<View className="flex-1 p-4" style={shadows.md}>
```

### DON'T ❌

```tsx
// ❌ Hard-code colors
<View style={{ backgroundColor: '#0091F5' }}>

// ❌ Ignore dark mode
<Text style={{ color: '#000000' }}>

// ❌ Use inline styles for everything
<View style={{ padding: 16, borderRadius: 8, backgroundColor: 'white' }}>
```

## 🎯 Quick Reference

```tsx
// Import what you need
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/theme.config';
import { useTheme, useThemeColors } from '@/hooks/use-theme';
import { Text, View, Card, Surface } from '@/components/themed';
import { useAppStore } from '@/stores';

// Use theme
const { isDark } = useTheme();
const themeColors = useThemeColors();
const { theme, setTheme } = useAppStore();

// Apply styles
<View style={{ backgroundColor: colors.primary[500] }}>
<Text style={typography.fontSize.h2}>
<View style={{ ...shadows.md, borderRadius: borderRadius.lg }}>
```
