import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import type { LeaderboardPlayer } from '../types';

interface PlayerAvatarProps {
  player: LeaderboardPlayer;
  size: number;
  ringColor: string;
  ringWidth?: number;
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  player,
  size,
  ringColor,
  ringWidth = 3,
}) => {
  const innerSize = size - ringWidth * 2 - 4;

  return (
    <View
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: ringColor,
          borderWidth: ringWidth,
        },
      ]}
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
          // @ts-ignore
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
};

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
