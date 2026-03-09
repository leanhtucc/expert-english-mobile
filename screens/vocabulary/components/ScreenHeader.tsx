import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onClose?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  onClose,
  rightAction,
  className = '',
}) => {
  return (
    <View className={`flex-row items-center justify-between px-4 py-3 ${className}`}>
      {/* Left Action */}
      <View className="w-10">
        {onBack && (
          <TouchableOpacity onPress={onBack} className="p-2">
            <Text className="text-xl">←</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <View className="flex-1 items-center">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        {subtitle && <Text className="mt-1 text-sm text-gray-500">{subtitle}</Text>}
      </View>

      {/* Right Action */}
      <View className="w-10">
        {onClose && (
          <TouchableOpacity onPress={onClose} className="p-2">
            <Text className="text-xl">✕</Text>
          </TouchableOpacity>
        )}
        {rightAction}
      </View>
    </View>
  );
};
