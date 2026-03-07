import { Check } from 'lucide-react-native';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

export interface SelectableCardProps {
  value: string;
  label: string;
  description?: string;
  Icon?: React.FC<SvgProps>;
  isSelected: boolean;
  onSelect: () => void;
  isRecommended?: boolean;
  variant?: 'default' | 'centered';
}

const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
};

export const SelectableCard: React.FC<SelectableCardProps> = ({
  label,
  description,
  Icon,
  isSelected,
  onSelect,
  isRecommended,
  variant = 'default',
}) => {
  const borderCls = isSelected ? 'border-[#C8102E]' : 'border-gray-200';
  const bgCls = isSelected ? 'bg-red-50' : 'bg-white';
  const textCls = isSelected ? 'text-[#C8102E]' : 'text-gray-800';

  if (variant === 'centered') {
    return (
      <TouchableOpacity
        onPress={onSelect}
        activeOpacity={0.85}
        className={`mb-3 items-center justify-center rounded-2xl border py-4 ${borderCls} ${bgCls}`}
        style={CARD_SHADOW}
      >
        {isRecommended && (
          <Text className="mb-1 text-[10px] font-bold uppercase text-amber-500">RECOMMENDED</Text>
        )}
        <Text className={`text-[15px] font-semibold ${textCls}`}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.85}
      className={`mb-3 flex-row items-center rounded-2xl border p-4 ${borderCls} ${bgCls}`}
      style={CARD_SHADOW}
    >
      {Icon && (
        <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
          <Icon width={22} height={22} />
        </View>
      )}

      <View className="flex-1">
        <Text className={`text-sm font-semibold ${textCls}`}>{label}</Text>
        {description ? (
          <Text className="mt-0.5 text-xs leading-4 text-gray-400">{description}</Text>
        ) : null}
      </View>

      {isSelected ? (
        <View className="ml-2 h-6 w-6 items-center justify-center rounded-full bg-[#C8102E]">
          <Check size={13} color="#fff" strokeWidth={3} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
