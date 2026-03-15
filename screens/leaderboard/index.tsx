import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImageLinearBackground } from '@/components/icon';
import { mockLeaderboard } from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

import { LeaderboardRow, PodiumColumn } from './components';

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

  return (
    <View className="flex-1" style={{ backgroundColor: bgColor }}>
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-3"
        style={{ paddingTop: insets.top + 4, height: 48 + insets.top + 4 }}
      >
        <TouchableOpacity className="h-10 w-10 items-center justify-center" activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text className="text-[18px] font-bold" style={{ color: '#1A1A2E' }}>
          Leaderboard
        </Text>
        <TouchableOpacity
          className="h-10 w-10 items-center justify-center"
          activeOpacity={0.7}
          onPress={handleShare}
        >
          <Ionicons name="share-social-outline" size={24} color="#1A1A2E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* Podium section */}
        <View className="relative overflow-hidden">
          {/* Background gradient for podium only */}
          <View className="absolute left-0 right-0 top-0 bottom-0">
            <ImageLinearBackground width="100%" height="100%" />
          </View>

          {/* Podium content with padding */}
          <View className="px-4 pt-12 pb-0">
            {/* Podium columns: 2nd | 1st | 3rd */}
            <View className="flex-row items-end justify-center gap-3">
              <PodiumColumn
                player={second}
                rank={2}
                avatarSize={64}
                podiumHeight={80}
                podiumColor="#E0E4EE"
              />
              <PodiumColumn
                player={first}
                rank={1}
                avatarSize={84}
                podiumHeight={110}
                podiumColor="#D9142F"
              />
              <PodiumColumn
                player={third}
                rank={3}
                avatarSize={64}
                podiumHeight={70}
                podiumColor="#F0D9C8"
              />
            </View>
          </View>
        </View>

        {/* Ranking list */}
        <View className="px-4 pt-10 pb-4" style={{ backgroundColor: 'transparent' }}>
          {rest.map((player, index) => {
            const showGap =
              index > 0 &&
              rest[index - 1].rank < 40 &&
              player.rank >= 40 &&
              !rest[index - 1].isCurrentUser;

            return (
              <View key={player.id}>
                {showGap && (
                  <View className="items-center py-2">
                    <Text className="text-lg" style={{ color: '#CCCCCC', letterSpacing: 4 }}>
                      • • •
                    </Text>
                  </View>
                )}
                <LeaderboardRow player={player} isDark={isDark} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
