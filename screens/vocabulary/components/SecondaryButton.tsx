import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface SecondaryButtonProps {
  label: string;
  subtitle?: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
  labelClassName?: string;
  subtitleClassName?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  centered?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  subtitle,
  onPress,
  disabled = false,
  className = '',
  style,
  labelClassName = 'text-[#0F172A]',
  subtitleClassName = 'text-[#64748B]',
  icon,
  rightIcon,
  centered = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={style}
      // Đồng bộ padding dọc py-[14px] để 2 nút bằng nhau chằn chặn
      className={`flex-row items-center rounded-2xl bg-[#F1F5F9] ${
        centered ? 'justify-center py-[18px]' : 'px-5 py-[18px] pr-6'
      } ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {/* Icon bên trái */}
      {icon && <View className={centered ? 'mr-1.5' : 'mr-4'}>{icon}</View>}

      {/* Cụm Text ở giữa */}
      <View
        className={`flex-shrink ${centered ? 'items-center justify-center' : 'flex-1 justify-center'}`}
      >
        <Text
          numberOfLines={1} // <-- QUAN TRỌNG: Ép chữ nằm trên 1 dòng
          adjustsFontSizeToFit // <-- Tự động co kích cỡ nếu chữ quá dài
          className={`text-[16px] font-bold ${centered ? 'text-center' : ''} ${labelClassName}`}
        >
          {label}
        </Text>
        {subtitle && <Text className={`mt-0.5 text-[14px] ${subtitleClassName}`}>{subtitle}</Text>}
      </View>

      {/* Icon mũi tên bên phải */}
      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </TouchableOpacity>
  );
};
