import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

import {
  formatXP,
  mockCertificates,
  mockLearningGoal,
  mockLearningStats,
  mockProfileData,
  mockUserProfile,
} from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const ACCENT = '#E8445A';
const GOLD = '#F5A623';
const BLUE = '#4A90D9';
const ORANGE = '#F76E2E';
const CARD_BG_LIGHT = '#F8F9FC';
const CARD_BG_DARK = '#1E2028';

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function StatCard({
  value,
  label,
  icon,
  isDark,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <View style={[styles.statCard, { backgroundColor: isDark ? CARD_BG_DARK : CARD_BG_LIGHT }]}>
      {icon}
      <Text style={[styles.statValue, { color: isDark ? '#FFF' : '#1A1A2E' }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MenuRow({
  icon,
  label,
  subtitle,
  right,
  isDark,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  right?: React.ReactNode;
  isDark: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.menuRow, { backgroundColor: isDark ? CARD_BG_DARK : '#FFFFFF' }]}
    >
      <View style={styles.menuIconWrap}>{icon}</View>
      <View style={styles.menuTextWrap}>
        <Text style={[styles.menuLabel, { color: isDark ? '#FFF' : '#1A1A2E' }]}>{label}</Text>
        {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
      </View>
      <View>{right}</View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const [darkMode, setDarkMode] = useState(mockProfileData.darkAppearance);

  const user = mockUserProfile;
  const stats = mockLearningStats;
  const goal = mockLearningGoal;
  const certs = mockCertificates;

  const totalMastered = certs.reduce((acc, c) => acc + c.masteredCategories, 0);
  const bgColor = isDark ? '#12131A' : '#F5F6FA';
  const textPrimary = isDark ? '#FFFFFF' : '#1A1A2E';
  const textSecondary = '#8A8FA8';

  return (
    <View style={[styles.root, { backgroundColor: bgColor }]}>
      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: textPrimary }]}>My Profile</Text>

        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={24} color={textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* ── Avatar ── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            {user.avatar ? (
              <View style={styles.avatarImageWrap}>
                {Platform.OS === 'web' ? (
                  // @ts-ignore – img is valid JSX on web
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: 86, height: 86, objectFit: 'cover' }}
                  />
                ) : (
                  <Image
                    source={{ uri: user.avatar }}
                    contentFit="cover"
                    style={styles.avatarImage}
                  />
                )}
              </View>
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <Ionicons name="person" size={44} color="#FFFFFF" />
              </View>
            )}
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>LEVEL {user.level}</Text>
            </View>
          </View>

          <Text style={[styles.userName, { color: textPrimary }]}>{user.name}</Text>
          <Text style={styles.userTrack}>
            {user.track} • {user.proficiency}
          </Text>
        </View>

        {/* ── Learning Stats ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: textPrimary }]}>Learning Stats</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.detailsLink}>Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <StatCard
              value={formatXP(stats.totalXP)}
              label="TOTAL XP"
              isDark={isDark}
              icon={<Ionicons name="star" size={24} color={GOLD} style={styles.statIcon} />}
            />
            <StatCard
              value={stats.wordsLearned.toString()}
              label="WORDS"
              isDark={isDark}
              icon={
                <MaterialCommunityIcons
                  name="translate"
                  size={24}
                  color={BLUE}
                  style={styles.statIcon}
                />
              }
            />
            <StatCard
              value={stats.streakDays.toString()}
              label="STREAK"
              isDark={isDark}
              icon={<Ionicons name="flame" size={24} color={ORANGE} style={styles.statIcon} />}
            />
          </View>
        </View>

        {/* ── Settings / Menu ── */}
        <View style={[styles.section, styles.menuSection]}>
          {/* Learning Goal */}
          <MenuRow
            isDark={isDark}
            icon={
              <View style={[styles.menuIconCircle, { backgroundColor: '#FFE8EA' }]}>
                <MaterialCommunityIcons name="target" size={20} color={ACCENT} />
              </View>
            }
            label="Learning Goal"
            subtitle={`${goal.wordsPerDay} words per day • ${goal.mode}`}
            right={<Ionicons name="chevron-forward" size={20} color={textSecondary} />}
          />

          <View style={[styles.divider, { backgroundColor: isDark ? '#2A2C36' : '#F0F1F5' }]} />

          {/* Certificates */}
          <MenuRow
            isDark={isDark}
            icon={
              <View style={[styles.menuIconCircle, { backgroundColor: '#E8F0FF' }]}>
                <MaterialCommunityIcons name="monitor" size={20} color={BLUE} />
              </View>
            }
            label="Certificates"
            subtitle={`${totalMastered} Mastered Categories`}
            right={<Ionicons name="chevron-forward" size={20} color={textSecondary} />}
          />

          <View style={[styles.divider, { backgroundColor: isDark ? '#2A2C36' : '#F0F1F5' }]} />

          {/* Dark Appearance */}
          <MenuRow
            isDark={isDark}
            icon={
              <View style={[styles.menuIconCircle, { backgroundColor: '#EDE8FF' }]}>
                <Ionicons name="moon" size={20} color="#7B5CF6" />
              </View>
            }
            label="Dark Appearance"
            subtitle="Reduce eye strain"
            right={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#D1D5DB', true: ACCENT }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D5DB"
              />
            }
          />
        </View>
      </ScrollView>

      {/* ── Continue Learning Button ── */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.continueBtn} activeOpacity={0.85}>
          <Text style={styles.continueBtnText}>CONTINUE LEARNING ▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
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
    letterSpacing: 0.2,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  avatarRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  avatarImageWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    overflow: 'hidden',
    position: 'relative',
  },
  avatarImage: {
    width: 86,
    height: 86,
  },
  avatarFallback: {
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: ACCENT,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  userTrack: {
    fontSize: 13,
    color: '#8A8FA8',
  },

  // Section
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  detailsLink: {
    fontSize: 14,
    color: ACCENT,
    fontWeight: '600',
  },

  // Stat cards
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9,
    color: '#8A8FA8',
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Menu
  menuSection: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIconWrap: {
    marginRight: 12,
  },
  menuIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#8A8FA8',
  },
  divider: {
    height: 1,
    marginLeft: 68,
  },

  // Bottom button
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
  continueBtn: {
    backgroundColor: ACCENT,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
});
