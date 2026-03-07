import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import {
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

import { LeaderboardPlayer, mockLeaderboard } from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const ACCENT = '#E8445A';
const GOLD = '#F5A623';
const SILVER = '#A8B0C0';
const BRONZE = '#CD8B5A';
const PODIUM_BG = '#FCEEF0';

const RING_COLORS: Record<number, string> = {
  1: GOLD,
  2: SILVER,
  3: BRONZE,
};

// ─────────────────────────────────────────────
// Avatar component
// ─────────────────────────────────────────────

function PlayerAvatar({
  player,
  size,
  ringColor,
  ringWidth = 3,
}: {
  player: LeaderboardPlayer;
  size: number;
  ringColor: string;
  ringWidth?: number;
}) {
  const innerSize = size - ringWidth * 2 - 4;

  return (
    <View
      style={[
        styles.avatarRing,
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

// ─────────────────────────────────────────────
// Podium column
// ─────────────────────────────────────────────

function PodiumColumn({
  player,
  avatarSize,
  podiumHeight,
  podiumColor,
  nameColor,
}: {
  player: LeaderboardPlayer;
  avatarSize: number;
  podiumHeight: number;
  podiumColor: string;
  nameColor?: string;
}) {
  const ringColor = RING_COLORS[player.rank] ?? ACCENT;
  const isFirst = player.rank === 1;

  return (
    <View style={styles.podiumColumn}>
      {/* Rank badge */}
      <View style={[styles.rankBadge, { backgroundColor: ringColor }]}>
        <Text style={styles.rankBadgeText}>{player.rank}</Text>
      </View>

      {/* Avatar */}
      <PlayerAvatar player={player} size={avatarSize} ringColor={ringColor} ringWidth={3} />

      {/* Name */}
      <Text style={[styles.podiumName, { color: nameColor ?? '#1A1A2E' }]} numberOfLines={1}>
        {player.name}
      </Text>

      {/* Points */}
      <Text style={[styles.podiumPoints, { color: ACCENT }]}>{player.points.toLocaleString()}</Text>

      {/* Podium block */}
      <View
        style={[
          styles.podiumBlock,
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
}

// ─────────────────────────────────────────────
// List row
// ─────────────────────────────────────────────

function LeaderboardRow({ player, isDark }: { player: LeaderboardPlayer; isDark: boolean }) {
  const isYou = player.isCurrentUser;
  const cardBg = isYou ? '#FFF0F2' : isDark ? '#1E2028' : '#FFFFFF';
  const borderColor = isYou ? ACCENT : 'transparent';
  const rankBg = isYou ? ACCENT : isDark ? '#2A2C36' : '#F0F1F5';
  const rankTextColor = isYou ? '#FFFFFF' : isDark ? '#AAAAAA' : '#888888';
  const nameColor = isDark ? '#FFFFFF' : '#1A1A2E';

  return (
    <View
      style={[styles.listRow, { backgroundColor: cardBg, borderColor, borderWidth: isYou ? 2 : 0 }]}
    >
      {/* Rank */}
      <View style={[styles.listRankBox, { backgroundColor: rankBg }]}>
        <Text style={[styles.listRankText, { color: rankTextColor }]}>{player.rank}</Text>
      </View>

      {/* Avatar */}
      <PlayerAvatar player={player} size={48} ringColor={isYou ? ACCENT : SILVER} ringWidth={2} />

      {/* Info */}
      <View style={styles.listInfo}>
        <Text style={[styles.listName, { color: nameColor }]} numberOfLines={1}>
          {player.name}
        </Text>
        <View style={styles.streakRow}>
          <Ionicons name="flame" size={13} color={ACCENT} />
          <Text style={styles.streakText}>{player.streakDays} day streak</Text>
        </View>
      </View>

      {/* Points */}
      <View style={styles.listPoints}>
        <Text style={[styles.listPointsValue, { color: isDark ? '#FFFFFF' : '#1A1A2E' }]}>
          {player.points.toLocaleString()}
        </Text>
        <Text style={styles.listPointsLabel}>POINTS</Text>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const bgColor = isDark ? '#13141A' : '#FFFFFF';

  const top3 = mockLeaderboard.filter(p => p.rank <= 3);
  const rest = mockLeaderboard.filter(p => p.rank > 3);

  const first = top3.find(p => p.rank === 1)!;
  const second = top3.find(p => p.rank === 2)!;
  const third = top3.find(p => p.rank === 3)!;

  const handleShare = async () => {
    await Share.share({ message: 'Check out the leaderboard on Expert English!' });
  };

  const textPrimary = isDark ? '#FFFFFF' : '#1A1A2E';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textPrimary }]}>Leaderboard</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={22} color={textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Podium section ── */}
        <View style={styles.podiumSection}>
          {/* Decorative elements */}
          <View style={styles.trophyDecor}>
            <MaterialCommunityIcons name="trophy-outline" size={36} color={GOLD} />
          </View>
          <View style={styles.partyDecor}>
            <MaterialCommunityIcons
              name="party-popper"
              size={32}
              color={ACCENT}
              style={{ opacity: 0.4 }}
            />
          </View>

          {/* Podium columns: 2nd | 1st | 3rd */}
          <View style={styles.podiumRow}>
            <PodiumColumn player={second} avatarSize={72} podiumHeight={90} podiumColor="#E0E4EE" />
            <PodiumColumn player={first} avatarSize={88} podiumHeight={130} podiumColor={ACCENT} />
            <PodiumColumn player={third} avatarSize={72} podiumHeight={70} podiumColor="#F0D9C8" />
          </View>
        </View>

        {/* ── List ── */}
        <View style={[styles.listSection, { backgroundColor: bgColor }]}>
          {rest.map((player, index) => (
            <React.Fragment key={player.id}>
              {/* Gap indicator between rank 7 and current user area */}
              {index > 0 &&
                rest[index - 1].rank < 40 &&
                player.rank >= 40 &&
                !rest[index - 1].isCurrentUser && (
                  <View style={styles.gapRow}>
                    <Text style={styles.gapDots}>• • •</Text>
                  </View>
                )}
              <LeaderboardRow player={player} isDark={isDark} />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  // Podium section
  podiumSection: {
    backgroundColor: PODIUM_BG,
    paddingTop: 16,
    paddingBottom: 0,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  trophyDecor: {
    position: 'absolute',
    top: 12,
    left: '50%',
    marginLeft: -18,
    opacity: 0.25,
  },
  partyDecor: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  podiumColumn: {
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
  avatarRing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  podiumName: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  podiumPoints: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  podiumBlock: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  // List
  listSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 10,
  },
  listRow: {
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
  listRankBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listRankText: {
    fontSize: 13,
    fontWeight: '700',
  },
  listInfo: {
    flex: 1,
  },
  listName: {
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
  listPoints: {
    alignItems: 'flex-end',
  },
  listPointsValue: {
    fontSize: 15,
    fontWeight: '800',
  },
  listPointsLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#AAAAAA',
    letterSpacing: 0.5,
  },
  // Gap
  gapRow: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  gapDots: {
    color: '#CCCCCC',
    fontSize: 16,
    letterSpacing: 4,
  },
});
