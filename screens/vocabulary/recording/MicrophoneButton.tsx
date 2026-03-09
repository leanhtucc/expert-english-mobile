import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface MicrophoneButtonProps {
  isRecording: boolean;
  isPaused: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isRecording,
  isPaused,
  onPress,
  disabled = false,
}) => {
  const getButtonStyle = () => {
    if (isRecording && !isPaused) {
      return 'bg-red-600 animate-pulse';
    }
    if (isPaused) {
      return 'bg-orange-500';
    }
    return 'bg-red-600';
  };

  const getIcon = () => {
    if (isRecording && !isPaused) {
      return '■'; // Stop icon
    }
    if (isPaused) {
      return '▶'; // Resume icon
    }
    return '🎤'; // Microphone icon
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={` ${getButtonStyle()} h-24 w-24 items-center justify-center rounded-full shadow-lg ${disabled ? 'opacity-50' : 'active:scale-95'} `}
    >
      <Text className="text-4xl text-white">{getIcon()}</Text>
    </TouchableOpacity>
  );
};
