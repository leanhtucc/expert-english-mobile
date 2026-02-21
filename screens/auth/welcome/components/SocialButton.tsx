import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SocialButtonProps {
  icon?: string;
  label: string;
  onPress: () => void;
  variant?: 'google' | 'email' | 'facebook';
}

/**
 * Component button đăng nhập với các mạng xã hội
 */
export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  onPress,
  variant = 'google',
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'google':
        return 'bg-white border-2 border-gray-200';
      case 'email':
        return 'bg-orange-500';
      case 'facebook':
        return 'bg-blue-600';
      default:
        return 'bg-white border-2 border-gray-200';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'google':
        return 'text-gray-800';
      case 'email':
      case 'facebook':
        return 'text-white';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center rounded-xl px-6 py-4 ${getButtonStyles()}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && (
        <View className="mr-3">
          <Text className="text-xl">{icon}</Text>
        </View>
      )}
      <Text className={`text-base font-semibold ${getTextStyles()}`}>{label}</Text>
    </TouchableOpacity>
  );
};
