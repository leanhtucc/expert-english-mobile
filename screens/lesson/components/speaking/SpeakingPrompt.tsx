import { Mic, MicOff, Volume2 } from 'lucide-react-native';

import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface SpeakingPromptProps {
  prompt: string;
  sampleAnswer?: string;
  onPlaySample?: () => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  isRecording?: boolean;
}

export const SpeakingPrompt: React.FC<SpeakingPromptProps> = ({
  prompt,
  sampleAnswer,
  onPlaySample,
  onStartRecording,
  onStopRecording,
  isRecording = false,
}) => {
  const [showSample, setShowSample] = useState(false);

  return (
    <View className="mx-5">
      {/* Prompt card */}
      <View className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <ThemedText className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
          Speaking Prompt
        </ThemedText>
        <ThemedText className="text-lg leading-7 text-gray-900">{prompt}</ThemedText>
      </View>

      {/* Recording button */}
      <View className="mb-6 items-center">
        <TouchableOpacity
          onPress={isRecording ? onStopRecording : onStartRecording}
          className={`h-20 w-20 items-center justify-center rounded-full ${
            isRecording ? 'bg-red-500' : 'bg-blue-600'
          }`}
          activeOpacity={0.8}
        >
          {isRecording ? <MicOff size={32} color="white" /> : <Mic size={32} color="white" />}
        </TouchableOpacity>
        <ThemedText className="mt-3 text-sm text-gray-500">
          {isRecording ? 'Tap to stop' : 'Tap to record'}
        </ThemedText>
      </View>

      {/* Sample answer */}
      {sampleAnswer && (
        <View className="rounded-2xl bg-gray-50 p-4">
          <TouchableOpacity
            onPress={() => setShowSample(!showSample)}
            className="flex-row items-center justify-between"
          >
            <ThemedText className="text-sm font-medium text-gray-600">
              {showSample ? 'Hide sample answer' : 'Show sample answer'}
            </ThemedText>
            {onPlaySample && (
              <TouchableOpacity
                onPress={onPlaySample}
                className="h-8 w-8 items-center justify-center rounded-full bg-blue-100"
              >
                <Volume2 size={16} color="#2563EB" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {showSample && (
            <ThemedText className="mt-3 text-base leading-6 text-gray-700">
              {sampleAnswer}
            </ThemedText>
          )}
        </View>
      )}
    </View>
  );
};
