import { Feather } from '@expo/vector-icons';

import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { WaveformAnimation } from './WaveAnimation';
import { COLORS } from './constants';
import { SpeakingState } from './types';

interface MicrophoneButtonProps {
  state: SpeakingState;
  onStart: () => void;
  onStop: () => void;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ state, onStart, onStop }) => {
  const isProcessing = state === 'PROCESSING';
  const isRecording = state === 'RECORDING';
  const isHidden = state === 'RESULT';

  if (isHidden) return null;

  return (
    <View className="items-center justify-end pb-2">
      {/* BAO BỌC TOÀN BỘ BẰNG TOUCHABLE: Để bấm vào Mic hay Sóng âm đều nhận lệnh */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={isRecording ? onStop : onStart}
        disabled={isProcessing}
        // Giữ min-h-[80px] để khi chuyển từ cục Mic (80px) sang Sóng âm (48px), dòng chữ bên dưới không bị giật nảy lên
        className="min-h-[80px] min-w-[150px] items-center justify-center"
      >
        {isRecording ? (
          <View style={{ position: 'absolute', top: 0, width: '100%' }}>
            <WaveformAnimation isRecording={isRecording} />
          </View>
        ) : (
          // 2. KHI CHƯA THU / ĐANG XỬ LÝ: Hiện cục Mic
          <View className="relative h-20 w-20 items-center justify-center rounded-full bg-[#FCE4E4]">
            <View
              className="z-10 h-[68px] w-[68px] items-center justify-center rounded-full bg-[#D32F2F] shadow-lg"
              style={{
                shadowColor: COLORS.primary,
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {isProcessing ? (
                <ActivityIndicator size="large" color="#FFF" />
              ) : (
                <Feather name="mic" size={28} color="#FFF" />
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>

      <Text
        className={`mt-2 text-[14px] font-bold ${
          isRecording ? 'text-[#D32F2F]' : 'text-[#64748B]'
        }`}
      >
        {isProcessing ? 'Đang chấm điểm...' : isRecording ? 'Nhấn để dừng' : 'Nhấn để nói'}
      </Text>
    </View>
  );
};
