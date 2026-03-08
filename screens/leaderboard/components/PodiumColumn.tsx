import { MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ACCENT, RING_COLORS } from '../constants';
import type { LeaderboardPlayer } from '../types';
import { PlayerAvatar } from './PlayerAvatar';

interface PodiumColumnProps {
  player: LeaderboardPlayer;
  avatarSize: number;
  podiumHeight: number;
  podiumColor: string;
  nameColor?: string;
}

export const PodiumColumn: React.FC<PodiumColumnProps> = ({
  player,
  avatarSize,
  podiumHeight,
  podiumColor,
  nameColor,
}) => {
  const ringColor = RING_COLORS[player.rank] ?? ACCENT;
  const isFirst = player.rank === 1;

  return (
    <View style={styles.column}>
      <View style={[styles.rankBadge, { backgroundColor: ringColor }]}>
        <Text style={styles.rankBadgeText}>{player.rank}</Text>
      </View>

      <PlayerAvatar player={player} size={avatarSize} ringColor={ringColor} ringWidth={3} />

      <Text style={[styles.name, { color: nameColor ?? '#1A1A2E' }]} numberOfLines={1}>
        {player.name}
      </Text>

      <Text style={[styles.points, { color: ACCENT }]}>{player.points.toLocaleString()}</Text>

      <View
        style={[
          styles.block,
          {
            height: podiumHeight,
            backgroundColor: podiumColor,
            borderTopLeftRadius: isFirst ? 0 : 8,
            borderTopRightRadius: isFirst ? 0 : 8,
          },
        ]}
      >
        {isFirst ? (
          <MaterialCommunityIcons name="star-outline" size={28} color="#FFFFFF" />
        ) : (
          <MaterialCommunityIcons name="medal-outline" size={22} color={ringColor} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
  },
  rankBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  rankBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  points: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  block: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
