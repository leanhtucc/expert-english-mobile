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
    <View className="mb-6 items-center">
      {canResend ? (
        <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
          <Text className="text-sm font-medium text-orange-500">Gửi lại mã</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-sm text-gray-600">
          Gửi lại mã sau <Text className="font-semibold text-orange-500">{seconds}s</Text>
        </Text>
      )}
    </View>
  );
};
