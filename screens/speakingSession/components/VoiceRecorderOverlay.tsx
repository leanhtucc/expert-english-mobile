import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { IconMicrophone } from '@/components/icon';
import { RecordingState } from '@/types/speaking.types';

import { WaveformAnimation } from './WaveformAnimation';

interface VoiceRecorderOverlayProps {
  visible: boolean;
  recordingState: RecordingState;
  onClose: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const VoiceRecorderOverlay: React.FC<VoiceRecorderOverlayProps> = ({
  visible,
  recordingState,
  onClose,
  onStartRecording,
  onStopRecording,
}) => {
  const micScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);

  useEffect(() => {
    if (recordingState === 'recording') {
      // Pulse animation for recording
      pulseOpacity.value = withRepeat(
        withSequence(withTiming(0.6, { duration: 1000 }), withTiming(0, { duration: 1000 })),
        -1,
        false
      );
    } else {
      pulseOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [recordingState, pulseOpacity]);

  const micAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: micScale.value }],
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const handleMicPress = () => {
    micScale.value = withSequence(withSpring(0.9, { damping: 10 }), withSpring(1, { damping: 10 }));

    if (recordingState === 'idle') {
      onStartRecording();
    } else if (recordingState === 'recording') {
      onStopRecording();
    }
  };

  const getInstructionText = () => {
    switch (recordingState) {
      case 'idle':
        return 'Tap to start speaking';
      case 'recording':
        return 'Recording... Tap to stop';
      case 'processing':
        return 'Processing your speech...';
      default:
        return '';
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/70 px-6">
        <View className="w-full max-w-sm items-center rounded-3xl bg-white p-8">
          {/* Close button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 h-8 w-8 items-center justify-center rounded-full bg-gray-200"
          >
            <Text className="text-lg font-bold text-gray-600">×</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text className="mb-8 text-xl font-bold text-gray-800">Voice Recording</Text>

          {/* Microphone button with pulse effect */}
          <View className="mb-8 items-center justify-center">
            {/* Pulse circles */}
            <Animated.View
              style={pulseAnimatedStyle}
              className="absolute h-32 w-32 rounded-full bg-red-500"
            />
            <Animated.View
              style={[pulseAnimatedStyle, { opacity: pulseOpacity.value * 0.5 }]}
              className="absolute h-40 w-40 rounded-full bg-red-500"
            />

            {/* Microphone button */}
            <TouchableOpacity
              onPress={handleMicPress}
              disabled={recordingState === 'processing'}
              activeOpacity={0.8}
            >
              <Animated.View
                style={micAnimatedStyle}
                className={`h-24 w-24 items-center justify-center rounded-full shadow-lg ${
                  recordingState === 'recording' ? 'bg-red-600' : 'bg-red-500'
                }`}
              >
                <IconMicrophone width={40} height={40} color="white" />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Waveform */}
          <View className="mb-6 w-full">
            <WaveformAnimation isRecording={recordingState === 'recording'} />
          </View>

          {/* Instruction text */}
          <Text className="text-center text-base text-gray-600">{getInstructionText()}</Text>

          {/* Recording indicator */}
          {recordingState === 'recording' && (
            <View className="mt-4 flex-row items-center">
              <View className="mr-2 h-2 w-2 rounded-full bg-red-500" />
              <Text className="text-sm font-medium text-red-600">Recording</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
