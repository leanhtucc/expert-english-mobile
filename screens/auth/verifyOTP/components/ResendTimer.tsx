import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ResendTimerProps {
  initialSeconds?: number;
  onResend: () => void;
}

/**
 * Component đếm ngược thời gian gửi lại OTP
 */
export const ResendTimer: React.FC<ResendTimerProps> = ({ initialSeconds = 59, onResend }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    setCanResend(true);
    return undefined;
  }, [seconds]);

  const handleResend = () => {
    if (canResend) {
      onResend();
      setSeconds(initialSeconds);
      setCanResend(false);
    }
  };

  return (
    <View className="mb-8 items-center gap-1">
      <View className="flex-row items-center gap-1">
        <Text className="text-sm text-gray-400">{"Didn't receive the code?"}</Text>
        <TouchableOpacity onPress={handleResend} disabled={!canResend} activeOpacity={0.7}>
          <Text className={`text-sm font-bold ${canResend ? 'text-[#C6102E]' : 'text-gray-300'}`}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
      {!canResend && (
        <Text className="text-xs text-gray-400">
          Wait {String(Math.floor(seconds / 60)).padStart(2, '0')}:
          {String(seconds % 60).padStart(2, '0')}
        </Text>
      )}
    </View>
  );
};
