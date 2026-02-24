import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type IconName = 'google' | 'email' | 'facebook';

interface SocialButtonProps {
  iconName?: IconName;
  label: string;
  onPress: () => void;
  variant?: 'google' | 'email' | 'facebook';
}

/**
 * Component button đăng nhập với các mạng xã hội
 */
export const SocialButton: React.FC<SocialButtonProps> = ({
  iconName,
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

  const renderIcon = () => {
    const iconColor = variant === 'google' ? '#4285F4' : '#FFFFFF';
    const iconSize = 22;

    switch (iconName) {
      case 'google':
        return <AntDesign name="google" size={iconSize} color={iconColor} />;
      case 'email':
        return <MaterialCommunityIcons name="email-outline" size={iconSize} color={iconColor} />;
      case 'facebook':
        return <AntDesign name="facebook" size={iconSize} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center rounded-xl px-6 py-4 shadow-sm ${getButtonStyles()}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {iconName && <View className="mr-3">{renderIcon()}</View>}
      <Text className={`text-base font-semibold ${getTextStyles()}`} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
