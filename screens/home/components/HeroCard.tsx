import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ImageMasco } from '@/components/icon';

interface HeroCardProps {
  level: string;
  title: string;
  subtitle: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({ level, title, subtitle }) => (
  <View style={styles.card}>
    <View style={styles.inner}>
      <View style={styles.left}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LEVEL {level}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.mascotWrap}>
        <ImageMasco width={90} height={110} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: '#C8102E',
    overflow: 'hidden',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  left: {
    flex: 1,
    paddingRight: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.8)',
  },
  mascotWrap: {
    height: 112,
    width: 96,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
