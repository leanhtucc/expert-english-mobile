import { MaterialIcons } from '@expo/vector-icons';

import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Image } from 'expo-image';

import { IconCertificateRenew, IconCertificatesCourse } from '@/components/icon';

export type CertificateStatus = 'completed' | 'expired';

export interface Certificate {
  id: string;
  title: string;
  date: string;
  status: CertificateStatus;
  imageUrl: string;
}

// Badge nằm gọn bên trong file này
const StatusBadge: React.FC<{ status: CertificateStatus }> = memo(({ status }) => {
  const isCompleted = status === 'completed';
  const label = isCompleted ? 'COMPLETED' : 'EXPIRED';
  const dotColor = isCompleted ? 'bg-[#10B981]' : 'bg-[#EF4444]';
  const textColor = isCompleted ? 'text-[#0F172A]' : 'text-[#EF4444]';

  return (
    <View className="absolute right-3 top-3 flex-row items-center rounded-full bg-white/95 px-2.5 py-1 shadow-sm">
      <View className={`mr-1.5 h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <Text className={`text-[10px] font-black uppercase tracking-wider ${textColor}`}>
        {label}
      </Text>
    </View>
  );
});
StatusBadge.displayName = 'StatusBadge';

export const CertificateCard: React.FC<{ data: Certificate }> = memo(({ data }) => {
  const isExpired = data.status === 'expired';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`mx-5 mb-5 overflow-hidden rounded-[20px] bg-white ${
        isExpired ? 'opacity-90' : ''
      }`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      {/* Thumbnail Banner */}
      <View className="relative h-[140px] w-full bg-slate-100">
        <Image
          source={{ uri: data.imageUrl }}
          className={`h-full w-full ${isExpired ? 'opacity-60 grayscale' : ''}`}
          contentFit="cover"
          transition={200}
        />
        <StatusBadge status={data.status} />
      </View>

      {/* Card Content */}
      <View className="p-4">
        <Text className="mb-2 text-[17px] font-bold text-[#1E293B]" numberOfLines={2}>
          {data.title}
        </Text>

        {/* Date Row */}
        <View className="mb-5 flex-row items-center gap-1.5">
          <MaterialIcons
            name={isExpired ? 'history' : 'calendar-today'}
            size={14}
            color="#8C7A78"
          />
          <Text className="text-[12px] text-[#8C7A78]">
            {isExpired ? 'Hết hạn' : 'Hoàn thành'}: {data.date}
          </Text>
        </View>

        {/* Footer Actions */}
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-[13px] font-bold ${isExpired ? 'text-[#8C7A78]' : 'text-[#C8102E]'}`}
          >
            {isExpired ? 'Gia hạn ngay' : 'Xem chi tiết'}
          </Text>
          <View
            className={`h-6 w-6 items-center justify-center rounded-full ${
              isExpired ? 'bg-slate-50' : 'bg-[#FFF0F1]'
            }`}
          >
            {isExpired ? (
              <IconCertificateRenew width={22} height={22} />
            ) : (
              <IconCertificatesCourse width={24} height={24} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});
CertificateCard.displayName = 'CertificateCard';
