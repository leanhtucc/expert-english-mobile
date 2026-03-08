import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CARD_BG_LIGHT = '#FFFFFF';
const CARD_BG_DARK = '#1E2028';

interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  right?: React.ReactNode;
  isDark: boolean;
  onPress?: () => void;
}

export const MenuRow: React.FC<MenuRowProps> = ({
  icon,
  label,
  subtitle,
  right,
  isDark,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[styles.row, { backgroundColor: isDark ? CARD_BG_DARK : CARD_BG_LIGHT }]}
  >
    <View style={styles.iconWrap}>{icon}</View>
    <View style={styles.textWrap}>
      <Text style={[styles.label, { color: isDark ? '#FFF' : '#1A1A2E' }]}>{label}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    <View>{right}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  iconWrap: {
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#8A8FA8',
  },
});
