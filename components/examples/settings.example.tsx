import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';

import { useAppStore } from '@/stores';

/**
 * Example Settings Component sử dụng App Store
 */
export default function SettingsExample() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    notificationsEnabled,
    toggleNotifications,
    soundEnabled,
    toggleSound,
    hapticEnabled,
    toggleHaptic,
  } = useAppStore();

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="mb-6 text-2xl font-bold">Settings</Text>

      {/* Theme */}
      <View className="mb-6">
        <Text className="mb-3 text-lg font-semibold">Theme</Text>
        <View className="flex-row gap-2">
          {(['light', 'dark', 'system'] as const).map(t => (
            <TouchableOpacity
              key={t}
              className={`flex-1 rounded-lg border py-3 ${
                theme === t ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
              }`}
              onPress={() => setTheme(t)}
            >
              <Text
                className={`text-center capitalize ${
                  theme === t ? 'font-semibold text-white' : 'text-gray-700'
                }`}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Language */}
      <View className="mb-6">
        <Text className="mb-3 text-lg font-semibold">Language</Text>
        <View className="flex-row gap-2">
          {(['en', 'vi'] as const).map(lang => (
            <TouchableOpacity
              key={lang}
              className={`flex-1 rounded-lg border py-3 ${
                language === lang ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
              }`}
              onPress={() => setLanguage(lang)}
            >
              <Text
                className={`text-center uppercase ${
                  language === lang ? 'font-semibold text-white' : 'text-gray-700'
                }`}
              >
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Toggles */}
      <View className="space-y-4">
        <SettingRow
          label="Notifications"
          value={notificationsEnabled}
          onToggle={toggleNotifications}
        />
        <SettingRow label="Sound" value={soundEnabled} onToggle={toggleSound} />
        <SettingRow label="Haptic Feedback" value={hapticEnabled} onToggle={toggleHaptic} />
      </View>
    </View>
  );
}

function SettingRow({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
      <Text className="text-base">{label}</Text>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  );
}
