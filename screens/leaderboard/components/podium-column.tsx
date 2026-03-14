import React from 'react';
import { Text, View } from 'react-native';

import { IconRankTop1, IconRankTop2, IconRankTop3, IconTop1Cup } from '@/components/icon';
import { LeaderboardPlayer } from '@/data/mock-data';

import { RING_COLORS } from '../leaderboard.constants';
import { PlayerAvatar } from './player-avatar';

interface PodiumColumnProps {
  player: LeaderboardPlayer;
  rank: number;
  avatarSize: number;
  podiumHeight: number;
  podiumColor: string;
  nameColor?: string;
}

export function PodiumColumn({
  player,
  rank,
  avatarSize,
  podiumHeight,
  podiumColor,
  nameColor,
}: PodiumColumnProps) {
  const ringColor = RING_COLORS[rank];
  const isFirst = rank === 1;
  const ringWidth = isFirst ? 4 : 3;

  return (
    <View className="flex-1 items-center">
      {/* Avatar with overlays */}
      <View className="relative items-center justify-center" style={{ marginBottom: 8 }}>
        {/* Trophy on top for rank 1 */}
        {isFirst && (
          <View className="absolute z-10" style={{ top: -8, width: 48, height: 48 }}>
            <View className="items-center justify-center" style={{ width: 48, height: 48 }}>
              <IconTop1Cup width={28} height={28} />
            </View>
          </View>
        )}

        {/* Avatar */}
        <View style={{ marginTop: isFirst ? 36 : 0 }}>
          <PlayerAvatar
            player={player}
            size={avatarSize}
            ringColor={ringColor}
            ringWidth={ringWidth}
          />
        </View>

        {/* Rank badge overlay at bottom */}
        <View
          className="absolute items-center justify-center border-[3px] border-white"
          style={{
            bottom: -10,
            width: 35,
            height: 28,
            backgroundColor: ringColor,
            borderRadius: 14,
          }}
        >
          <Text className="text-base font-extrabold text-white">{rank}</Text>
        </View>
      </View>

      {/* Name */}
      <Text
        className="mt-3 text-center text-[14px] font-bold"
        style={{ color: nameColor ?? '#1A1A2E' }}
        numberOfLines={1}
      >
        {player.name}
      </Text>

      {/* Points */}
      <Text className="mb-3 text-[13px] font-bold" style={{ color: '#E8445A' }}>
        {player.points.toLocaleString()}
      </Text>

      {/* Podium block */}
      <View
        className="items-center justify-center"
        style={{
          width: '90%',
          height: podiumHeight,
          backgroundColor: podiumColor,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View className="h-12 w-12 items-center justify-center">
          {isFirst ? (
            <IconRankTop1 width={24} height={24} color="#FFFFFF" />
          ) : rank === 2 ? (
            <IconRankTop2 width={24} height={24} color="#FFFFFF" />
          ) : (
            <IconRankTop3 width={24} height={24} color="#FFFFFF" />
          )}
        </View>
      </View>
    </View>
  );
}
