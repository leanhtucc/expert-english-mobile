import React from 'react';
import { Text, View } from 'react-native';

interface ResultStatCardProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  valueColor?: string;
  className?: string;
  valueOnTop?: boolean;
}

export const ResultStatCard: React.FC<ResultStatCardProps> = ({
  icon,
  value,
  label,
  valueColor = 'text-[#0F172A]',
  className = '',
  valueOnTop = false,
}) => {
  return (
    <View
      className={`items-center justify-center rounded-[36px] border border-red-100 bg-white py-5 shadow-sm ${className}`}
    >
      {/* Icon */}
      {icon && <View className="mb-2">{icon}</View>}

      {valueOnTop ? (
        // TRƯỜNG HỢP LESSON: Số ở trên, Text ở dưới
        <>
          <Text className={`mb-1 text-[22px] font-extrabold ${valueColor}`}>{value}</Text>
          <Text className="text-[14px] font-medium text-[#64748B]">{label}</Text>
        </>
      ) : (
        // TRƯỜNG HỢP SESSION: Text ở trên, Số ở dưới
        <>
          <Text className="mb-0.5 text-[14px] font-medium text-[#64748B]">{label}</Text>
          <Text className={`text-[22px] font-extrabold ${valueColor}`}>{value}</Text>
        </>
      )}
    </View>
  );
};
