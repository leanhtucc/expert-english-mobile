import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  isDark: boolean;
}

const CARD_BG_LIGHT = '#F8F9FC';
const CARD_BG_DARK = '#1E2028';

export const StatCard: React.FC<StatCardProps> = ({ value, label, icon, isDark }) => (
  <View style={[styles.card, { backgroundColor: isDark ? CARD_BG_DARK : CARD_BG_LIGHT }]}>
    {icon}
    <Text style={[styles.value, { color: isDark ? '#FFF' : '#1A1A2E' }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
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
  icon: {
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  label: {
    fontSize: 9,
    color: '#8A8FA8',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
