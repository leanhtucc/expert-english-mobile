import { ChevronLeft, X } from 'lucide-react-native';

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';

interface LessonHeaderProps {
  title: string;
  subtitle?: string;
  progress?: number; // 0-100
  onBack?: () => void;
  onClose?: () => void;
  showProgress?: boolean;
  accentColor?: string;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  title,
  subtitle,
  progress = 0,
  onBack,
  onClose,
  showProgress = true,
  accentColor = '#2563EB',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="border-b border-gray-100 bg-white" style={{ paddingTop: insets.top }}>
      {/* Navigation row */}
      <View className="flex-row items-center justify-between px-4 py-3">
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            className="-ml-2 h-10 w-10 items-center justify-center"
          >
            <ChevronLeft size={24} color="#374151" />
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}

        <View className="flex-1 items-center">
          <ThemedText className="text-base font-bold text-gray-900" numberOfLines={1}>
            {title}
          </ThemedText>
          {subtitle && <ThemedText className="mt-0.5 text-xs text-gray-500">{subtitle}</ThemedText>}
        </View>

        {onClose ? (
          <TouchableOpacity
            onPress={onClose}
            className="-mr-2 h-10 w-10 items-center justify-center"
          >
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
      </View>

      {/* Progress bar */}
      {showProgress && (
        <View className="h-1 bg-gray-100">
          <View
            className="h-full rounded-r-full"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              backgroundColor: accentColor,
            }}
          />
        </View>
      )}
    </View>
  );
};
