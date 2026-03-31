import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Status = 'none' | 'selected' | 'matched' | 'wrong';

interface TermItemProps {
  text: string;
  status: Status;
  onPress: () => void;
}

export const TermItem: React.FC<TermItemProps> = ({ text, status, onPress }) => {
  const getStyles = () => {
    switch (status) {
      case 'selected':
        return {
          container: 'border-[#C8102E] bg-white',
          text: 'font-bold text-[#C8102E]',
        };
      case 'matched':
        return {
          container: 'border-slate-200 bg-slate-50 opacity-40', // Mờ đi, nền hơi xám
          text: 'font-bold text-slate-400',
        };
      case 'wrong':
        return {
          container: 'border-[#EF4444] bg-[#FEF2F2]', // Nền đỏ lợt, viền đỏ đậm
          text: 'font-bold text-[#DC2626]',
        };
      case 'none':
      default:
        return {
          container: 'border-slate-200 bg-white',
          text: 'font-medium text-[#1E293B]',
        };
    }
  };

  const styles = getStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      // Khoá thẻ nếu đã nối đúng
      disabled={status === 'matched'}
      activeOpacity={0.7}
      className={`mb-3 min-h-[64px] items-center justify-center rounded-[16px] border-[2px] px-3 py-2 shadow-sm ${styles.container}`}
    >
      <Text className={`text-center text-[14px] ${styles.text}`}>{text}</Text>
    </TouchableOpacity>
  );
};
