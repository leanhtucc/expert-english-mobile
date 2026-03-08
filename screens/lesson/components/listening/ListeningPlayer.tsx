import { Pause, Play, SkipBack, SkipForward } from 'lucide-react-native';

import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface ListeningPlayerProps {
  title: string;
  duration: string;
  currentTime?: string;
  progress?: number; // 0-100
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onSeek?: (progress: number) => void;
}

export const ListeningPlayer: React.FC<ListeningPlayerProps> = ({
  title,
  duration,
  currentTime = '0:00',
  progress = 0,
  isPlaying = false,
  onPlay,
  onPause,
  onSkipBack,
  onSkipForward,
}) => {
  return (
    <View className="mx-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Title */}
      <View className="border-b border-gray-50 p-5">
        <ThemedText className="mb-2 text-xs font-semibold uppercase tracking-wide text-orange-600">
          Listening Exercise
        </ThemedText>
        <ThemedText className="text-lg font-bold text-gray-900">{title}</ThemedText>
      </View>

      {/* Progress bar */}
      <View className="px-5 pt-4">
        <View className="h-2 overflow-hidden rounded-full bg-gray-100">
          <View className="h-full rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
        </View>
        <View className="mt-2 flex-row justify-between">
          <ThemedText className="text-xs text-gray-500">{currentTime}</ThemedText>
          <ThemedText className="text-xs text-gray-500">{duration}</ThemedText>
        </View>
      </View>

      {/* Controls */}
      <View className="flex-row items-center justify-center gap-4 py-5">
        <TouchableOpacity
          onPress={onSkipBack}
          className="h-12 w-12 items-center justify-center rounded-full bg-gray-100"
        >
          <SkipBack size={20} color="#374151" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={isPlaying ? onPause : onPlay}
          className="h-16 w-16 items-center justify-center rounded-full bg-orange-500"
        >
          {isPlaying ? (
            <Pause size={28} color="white" fill="white" />
          ) : (
            <Play size={28} color="white" fill="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSkipForward}
          className="h-12 w-12 items-center justify-center rounded-full bg-gray-100"
        >
          <SkipForward size={20} color="#374151" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
