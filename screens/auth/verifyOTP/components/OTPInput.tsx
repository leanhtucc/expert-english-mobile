import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onChangeOTP?: (otp: string) => void;
}

/**
 * Component input OTP với 6 ô riêng biệt
 */
export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, onChangeOTP }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Focus vào ô đầu tiên khi mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChangeText = (text: string, index: number) => {
    // Chỉ cho phép nhập số
    if (text && !/^\d+$/.test(text)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // Chỉ lấy ký tự cuối cùng
    setOtp(newOtp);

    // Notify parent
    const otpString = newOtp.join('');
    onChangeOTP?.(otpString);

    // Auto focus ô tiếp theo
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newOtp.every(digit => digit !== '') && otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Xử lý phím Backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="mb-8 flex-row justify-between gap-2">
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={ref => {
              inputRefs.current[index] = ref;
            }}
            className={`h-16 flex-1 rounded-2xl border text-center text-2xl font-bold ${
              otp[index]
                ? 'border-[#C6102E] bg-rose-50 text-gray-900'
                : 'border-gray-200 bg-gray-50 text-gray-900'
            }`}
            value={otp[index]}
            onChangeText={text => handleChangeText(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
    </View>
  );
};
