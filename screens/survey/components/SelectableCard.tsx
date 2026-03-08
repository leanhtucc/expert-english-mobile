import { CheckCircle2 } from 'lucide-react-native';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { IconRecommendedBadge } from '@/components/icon';

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
    const centeredBorder = isSelected
      ? 'border-[#C8102E]'
      : isRecommended
        ? 'border-amber-400'
        : 'border-gray-200';
    const centeredBg = isSelected ? 'bg-red-50' : 'bg-white';

    return (
      <View className="mb-3" style={{ paddingTop: isRecommended ? 13 : 0 }}>
        <TouchableOpacity
          onPress={onSelect}
          activeOpacity={0.85}
          className={`items-center justify-center rounded-2xl border py-5 ${centeredBorder} ${centeredBg}`}
          style={CARD_SHADOW}
        >
          <Text className={`text-[15px] font-semibold ${textCls}`}>{label}</Text>
        </TouchableOpacity>
        {isRecommended && (
          <View style={{ position: 'absolute', top: 0, left: 12 }} pointerEvents="none">
            <IconRecommendedBadge width={123} height={26} />
          </View>
        )}
      </View>
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
        <View className="rounded-x mr-4 h-10 w-10 items-center justify-center">
          <Icon width={22} height={22} />
        </View>
      )}

      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className={`flex-1 text-sm font-semibold ${textCls}`}>{label}</Text>
          {isSelected ? <CheckCircle2 size={22} color="#C8102E" strokeWidth={1.8} /> : null}
        </View>
        {description ? (
          <Text className="mt-0.5 text-xs leading-4 text-gray-400">{description}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
