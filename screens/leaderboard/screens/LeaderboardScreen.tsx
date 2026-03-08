import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import { mockLeaderboard } from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

import { LeaderboardRow, PodiumColumn } from '../components';
import { ACCENT, GOLD, PODIUM_BG } from '../constants';

export const LeaderboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isDark } = useTheme();

  const bgColor = isDark ? '#13141A' : '#FFFFFF';
  const textPrimary = isDark ? '#FFFFFF' : '#1A1A2E';

  const top3 = mockLeaderboard.filter(p => p.rank <= 3);
  const rest = mockLeaderboard.filter(p => p.rank > 3);

  const first = top3.find(p => p.rank === 1)!;
  const second = top3.find(p => p.rank === 2)!;
  const third = top3.find(p => p.rank === 3)!;

  const handleShare = async () => {
    await Share.share({ message: 'Check out the leaderboard on Expert English!' });
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textPrimary }]}>Leaderboard</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={22} color={textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Podium section */}
        <View style={styles.podiumSection}>
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

          {/* 2nd | 1st | 3rd */}
          <View style={styles.podiumRow}>
            <PodiumColumn player={second} avatarSize={72} podiumHeight={90} podiumColor="#E0E4EE" />
            <PodiumColumn player={first} avatarSize={88} podiumHeight={130} podiumColor={ACCENT} />
            <PodiumColumn player={third} avatarSize={72} podiumHeight={70} podiumColor="#F0D9C8" />
          </View>
        </View>

        {/* List */}
        <View style={[styles.listSection, { backgroundColor: bgColor }]}>
          {rest.map((player, index) => (
            <React.Fragment key={player.id}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  listSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 10,
  },
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
