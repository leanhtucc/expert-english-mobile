import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ACCENT, SILVER } from '../constants';
import type { LeaderboardPlayer } from '../types';
import { PlayerAvatar } from './PlayerAvatar';

interface LeaderboardRowProps {
  player: LeaderboardPlayer;
  isDark: boolean;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ player, isDark }) => {
  const isYou = player.isCurrentUser;
  const cardBg = isYou ? '#FFF0F2' : isDark ? '#1E2028' : '#FFFFFF';
  const borderColor = isYou ? ACCENT : 'transparent';
  const rankBg = isYou ? ACCENT : isDark ? '#2A2C36' : '#F0F1F5';
  const rankTextColor = isYou ? '#FFFFFF' : isDark ? '#AAAAAA' : '#888888';
  const nameColor = isDark ? '#FFFFFF' : '#1A1A2E';

  return (
    <View
      style={[styles.row, { backgroundColor: cardBg, borderColor, borderWidth: isYou ? 2 : 0 }]}
    >
      <View style={[styles.rankBox, { backgroundColor: rankBg }]}>
        <Text style={[styles.rankText, { color: rankTextColor }]}>{player.rank}</Text>
      </View>

      <PlayerAvatar player={player} size={48} ringColor={isYou ? ACCENT : SILVER} ringWidth={2} />

      <View style={styles.info}>
        <Text style={[styles.name, { color: nameColor }]} numberOfLines={1}>
          {player.name}
        </Text>
        <View style={styles.streakRow}>
          <Ionicons name="flame" size={13} color={ACCENT} />
          <Text style={styles.streakText}>{player.streakDays} day streak</Text>
        </View>
      </View>

      <View style={styles.pointsWrap}>
        <Text style={[styles.pointsValue, { color: isDark ? '#FFFFFF' : '#1A1A2E' }]}>
          {player.points.toLocaleString()}
        </Text>
        <Text style={styles.pointsLabel}>POINTS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  rankBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 13,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  streakText: {
    fontSize: 12,
    color: '#888',
  },
  pointsWrap: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: 15,
    fontWeight: '800',
  },
  pointsLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#AAAAAA',
    letterSpacing: 0.5,
  },
});
