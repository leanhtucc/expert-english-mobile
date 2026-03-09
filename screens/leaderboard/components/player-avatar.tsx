import React from 'react';
import { Platform, View } from 'react-native';

import { Image } from 'expo-image';

import { LeaderboardPlayer } from '@/data/mock-data';

interface PlayerAvatarProps {
  player: LeaderboardPlayer;
  size: number;
  ringColor: string;
  ringWidth?: number;
}

export function PlayerAvatar({ player, size, ringColor, ringWidth = 3 }: PlayerAvatarProps) {
  const innerSize = size - ringWidth * 2 - 4;

  return (
    <View
      className="items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: ringColor,
        borderWidth: ringWidth,
      }}
    >
      <View
        style={{
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize / 2,
          overflow: 'hidden',
        }}
      >
        {Platform.OS === 'web' ? (
          // @ts-ignore – img is valid JSX on web
          <img
            src={player.avatar}
            alt={player.name}
            style={{ width: innerSize, height: innerSize, objectFit: 'cover' }}
          />
        ) : (
          <Image
            source={{ uri: player.avatar }}
            contentFit="cover"
            style={{ width: innerSize, height: innerSize }}
          />
        )}
      </View>
    </View>
  );
}
