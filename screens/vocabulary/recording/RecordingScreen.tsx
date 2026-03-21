import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';

import { ScreenHeader } from '../components/ScreenHeader';
import { SecondaryButton } from '../components/SecondaryButton';
import { MicrophoneButton } from './MicrophoneButton';
import { WaveAnimation } from './WaveAnimation';
import { useRecording } from './useRecording';

interface RecordingScreenProps {
  word: string;
  phonetic?: string;
  onComplete?: (audioUrl: string) => void;
  onSkip?: () => void;
  onBack?: () => void;
}

export const RecordingScreen: React.FC<RecordingScreenProps> = ({
  word,
  phonetic,
  onComplete,
  onSkip,
  onBack,
}) => {
  const {
    isRecording,
    isPaused,
    formattedDuration,
    isAnalyzing,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useRecording({
    onRecordingComplete: onComplete,
  });

  const handleMicPress = () => {
    if (!isRecording) {
      startRecording();
    } else if (isPaused) {
      resumeRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <ScreenHeader
        title="Recording & Feedback"
        subtitle="Practice pronunciation"
        onBack={onBack}
      />

      <View className="flex-1 items-center justify-center px-6">
        {/* Word Display */}
        <View className="mb-8">
          <Text className="mb-2 text-center text-5xl font-bold text-gray-800">{word}</Text>
          {phonetic && <Text className="text-center text-xl text-gray-500">{phonetic}</Text>}
        </View>

        {/* Recording Status */}
        {isAnalyzing ? (
          <View className="mb-8 items-center">
            <ActivityIndicator size="large" color="#DC2626" />
            <Text className="mt-4 text-lg text-gray-600">Analyzing your pronunciation...</Text>
          </View>
        ) : (
          <>
            {/* Wave Animation */}
            <View className="mb-8 h-32 items-center justify-center">
              <WaveAnimation isActive={isRecording && !isPaused} />
            </View>

            {/* Microphone Button */}
            <View className="mb-6 items-center">
              <MicrophoneButton
                isRecording={isRecording}
                isPaused={isPaused}
                onPress={handleMicPress}
              />
            </View>

            {/* Duration */}
            {isRecording && (
              <Text className="mb-4 font-mono text-2xl font-bold text-red-600">
                {formattedDuration}
              </Text>
            )}

            {/* Instructions */}
            <View className="mb-6 max-w-md rounded-2xl bg-white p-5 shadow-sm">
              <Text className="text-center text-base leading-6 text-gray-700">
                {!isRecording
                  ? '🎤 Tap the microphone to start recording'
                  : isPaused
                    ? '▶ Tap to resume recording'
                    : '■ Tap to stop and analyze'}
              </Text>
            </View>

            {/* Action Buttons */}
            {!isRecording && (
              <View className="w-full max-w-md space-y-3">
                {isRecording && (
                  <SecondaryButton
                    label={isPaused ? 'Resume' : 'Pause'}
                    onPress={isPaused ? resumeRecording : pauseRecording}
                    className="mb-3"
                  />
                )}

                {onSkip && !isRecording && (
                  <SecondaryButton label="Skip for now" onPress={onSkip} />
                )}
              </View>
            )}
          </>
        )}

        {/* Tips */}
        <View className="absolute bottom-8 left-6 right-6">
          <View className="rounded-2xl bg-blue-50 p-4">
            <Text className="text-center text-sm leading-5 text-blue-800">
              💡 Speak clearly and at a normal pace for best results
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
