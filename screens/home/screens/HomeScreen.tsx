import { Bell } from 'lucide-react-native';

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import { IconFiledUser } from '@/components/icon';

import { HeroCard, RoadmapItem, TodayFocusCard } from '../components';
import { MOCK_HOME_DATA } from '../constants';

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const data = MOCK_HOME_DATA;

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <IconFiledUser width={24} height={24} />
          </View>
          <View>
            <Text style={styles.greetingSmall}>{greeting},</Text>
            <Text style={styles.greetingName}>{data.userName}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.bellBtn}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <Bell size={20} color="#374151" strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero Card */}
        <HeroCard level={data.userLevel} title={data.heroTitle} subtitle={data.heroSubtitle} />

        {/* Today's Focus */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today&apos;s Focus</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/(tabs)/lessons')}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {data.todayFocus.map(lesson => (
          <TodayFocusCard
            key={lesson.id}
            lesson={lesson}
            onStartSession={() => router.push('/(tabs)/lessons')}
          />
        ))}

        {/* Learning Roadmap */}
        <View style={styles.roadmapSection}>
          <Text style={styles.sectionTitle}>Learning Roadmap</Text>
          <View style={{ marginTop: 20 }}>
            {data.roadmap.map((item, index) => (
              <RoadmapItem key={item.id} item={item} isLast={index === data.roadmap.length - 1} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  greetingSmall: {
    fontSize: 12,
    color: '#6B7280',
  },
  greetingName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C8102E',
  },
  roadmapSection: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
});
