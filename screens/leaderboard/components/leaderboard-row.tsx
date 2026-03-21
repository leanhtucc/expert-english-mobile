import React from 'react';
import { Text, View } from 'react-native';

import { IconStreak } from '@/components/icon';
import { LeaderboardPlayer } from '@/data/mock-data';

import { GOLD } from '../leaderboard.constants';
import { PlayerAvatar } from './player-avatar';

interface LeaderboardRowProps {
  player: LeaderboardPlayer;
  isDark: boolean;
}

export function LeaderboardRow({ player, isDark }: LeaderboardRowProps) {
  const isYou = player.isCurrentUser;

  // Current user gets special styling
  const cardBg = isYou ? '#E8445A' : isDark ? '#1E2028' : '#FFFFFF';
  const rankTextColor = isYou ? '#FFFFFF' : isDark ? '#AAAAAA' : '#888888';
  const nameColor = isYou ? '#FFFFFF' : isDark ? '#FFFFFF' : '#1A1A2E';
  const pointsColor = isYou ? '#FFFFFF' : isDark ? '#FFFFFF' : '#1A1A2E';
  const streakTextColor = isYou ? 'rgba(255,255,255,0.9)' : '#888';
  const pointsLabelColor = isYou ? 'rgba(255,255,255,0.7)' : '#AAAAAA';

  const card = (
    <View
      className="flex-row items-center gap-3 px-4"
      style={{
        backgroundColor: cardBg,
        paddingVertical: isYou ? 16 : 14,
        borderRadius: 18,
        shadowColor: isYou ? '#E8445A' : '#000',
        shadowOffset: { width: 0, height: isYou ? 8 : 2 },
        shadowOpacity: isYou ? 0.4 : 0.06,
        shadowRadius: isYou ? 12 : 6,
        elevation: isYou ? 8 : 3,
      }}
    >
      {/* Rank */}
      <View className="mb-2 h-12 w-12 items-center justify-center">
        <Text className="text-lg font-bold" style={{ color: rankTextColor }}>
          {player.rank}
        </Text>
      </View>

      {/* Avatar */}
      <PlayerAvatar player={player} size={48} ringColor={isYou ? GOLD : '#A8B0C0'} ringWidth={2} />

      {/* Info */}
      <View className="flex-1">
        <Text className="text-[16px] font-bold" style={{ color: nameColor }} numberOfLines={1}>
          {player.name}
        </Text>
        <View className="mt-0.5 flex-row items-center gap-1">
          <IconStreak width={14} height={14} />
          <Text className="text-xs" style={{ color: streakTextColor }}>
            {player.streakDays} day streak
          </Text>
        </View>
      </View>

      {/* Points */}
      <View className="items-end">
        <Text className="text-[18px] font-extrabold" style={{ color: pointsColor }}>
          {player.points.toLocaleString()}
        </Text>
        <Text
          className="text-[10px] font-semibold tracking-widest"
          style={{ color: pointsLabelColor }}
        >
          POINTS
        </Text>
      </View>
    </View>
  );

  if (isYou) {
    return (
      <View
        className="mb-6"
        style={{
          borderRadius: 22,
          borderWidth: 3,
          borderColor: '#FFD700',
          padding: 4,
          backgroundColor: '#FFD700',
          shadowColor: '#FFD700',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        {card}
      </View>
    );
  }

  return <View className="mb-6">{card}</View>;
}
