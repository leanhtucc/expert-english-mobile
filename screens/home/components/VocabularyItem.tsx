import { Ionicons } from '@expo/vector-icons';

import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Image } from 'expo-image';

import { IconVoiceVocab } from '@/components/icon';

export type VocabPalette = {
  primary: string;
  bg: string;
  card: string;
  border: string;
  textMain: string;
  textSub: string;
  headerBg: string;
  expandedBorder: string;
  definitionAccent: string;
  exampleText: string;
  switchTrackOff: string;
  switchRowBg: string;
  bottomBarBg: string;
  statusBarStyle: 'light-content' | 'dark-content';
};

export const TagBadge = memo(({ text }: { text: string; type?: 'pos' | 'status' }) => {
  let bgClass = 'bg-gray-100';
  let textClass = 'text-gray-600';
  if (text === 'NOUN') {
    bgClass = 'bg-[#E3F2FD]';
    textClass = 'text-[#1976D2]';
  } else if (text === 'VERB') {
    bgClass = 'bg-[#E8F5E9]';
    textClass = 'text-[#388E3C]';
  } else if (text === 'ADJ') {
    bgClass = 'bg-[#F3E5F5]';
    textClass = 'text-[#7B1FA2]';
  } else if (text === 'NEW') {
    bgClass = 'bg-[#FCF0F1]';
    textClass = 'text-[#3B2828]';
  } else if (text === 'WEAK') {
    bgClass = 'bg-[#FFF9C4]';
    textClass = 'text-[#F57F17]';
  } else if (text === 'LEARNED') {
    bgClass = 'bg-[#E0F2F1]';
    textClass = 'text-[#00796B]';
  }

  return (
    <View className={`items-center justify-center rounded-[6px] px-2 py-0.5 ${bgClass} ml-2`}>
      <Text className={`text-[10px] font-bold uppercase tracking-wider ${textClass}`}>{text}</Text>
    </View>
  );
});
TagBadge.displayName = 'TagBadge';

export const VocabularyItemCompact = memo(
  ({
    item,
    onPlayAudio,
    palette,
  }: {
    item: any;
    onPlayAudio: (url: string | null | undefined) => void;
    palette: VocabPalette;
  }) => {
    const seed = item.word ? (item.word.length % 10) + 1 : 1;
    const fallbackImage = `https://picsum.photos/seed/${seed}10/200/200`;

    return (
      <View
        className="mb-3 flex-row items-center rounded-[16px] border p-3 shadow-sm"
        style={{ borderColor: palette.border, backgroundColor: palette.card }}
      >
        <Image
          source={{ uri: item.imageUrl || fallbackImage }}
          className="mr-3 h-[60px] w-[60px] rounded-[12px] bg-gray-100"
          transition={200}
          cachePolicy="disk"
        />
        <View className="flex-1 justify-center">
          <Text className="text-[16px] font-bold" style={{ color: palette.textMain }}>
            {item.word}
          </Text>
          <View className="mb-1 mt-1 flex-row self-start">
            <TagBadge text={item.partOfSpeech?.toUpperCase() || 'NEW'} />
          </View>
          <Text className="ml-2 text-[13px]" style={{ color: palette.textSub }}>
            {item.phonetic}
          </Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            className="p-2"
            onPress={() => onPlayAudio(item.audioUrl)}
          >
            <IconVoiceVocab width={20} height={20} color={palette.primary} />
          </TouchableOpacity>
          <TagBadge text={item.isRemembered ? 'LEARNED' : 'NEW'} />
        </View>
      </View>
    );
  }
);
VocabularyItemCompact.displayName = 'VocabularyItemCompact';

export const VocabularyItemExpanded = memo(
  ({
    item,
    onPlayAudio,
    palette,
  }: {
    item: any;
    onPlayAudio: (url: string | null | undefined) => void;
    palette: VocabPalette;
  }) => {
    const seed = item.word ? (item.word.length % 10) + 1 : 1;
    const fallbackImage = `https://picsum.photos/seed/${seed}10/200/200`;

    return (
      <View
        className="mb-4 rounded-[20px] border p-4 shadow-sm"
        style={{ borderColor: palette.expandedBorder, backgroundColor: palette.card }}
      >
        <View className="flex-row">
          <Image
            source={{ uri: item.imageUrl || fallbackImage }}
            className="mr-4 h-[60px] w-[60px] rounded-[14px] bg-gray-100"
            transition={200}
            cachePolicy="disk"
          />
          <View className="flex-1 justify-center pt-1">
            <Text className="text-[18px] font-bold" style={{ color: palette.textMain }}>
              {item.word}
            </Text>
            <View className="mb-1 mt-1 flex-row self-start">
              <TagBadge text={item.partOfSpeech?.toUpperCase() || 'NEW'} />
            </View>
            <Text className="ml-2 text-[14px]" style={{ color: palette.textSub }}>
              {item.phonetic}
            </Text>
          </View>
          <View className="flex-row items-center pt-1">
            <TouchableOpacity
              activeOpacity={0.7}
              className="h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: '#A91220' }}
              onPress={() => onPlayAudio(item.audioUrl)}
            >
              <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
            <View className="ml-2">
              <TagBadge text={item.isRemembered ? 'LEARNED' : 'NEW'} />
            </View>
          </View>
        </View>
        <View className="my-4 h-[1px] w-full" style={{ backgroundColor: palette.border }} />
        <Text
          className="mb-2 text-[15px] font-semibold"
          style={{ color: palette.definitionAccent }}
        >
          {item.definitionVi}
        </Text>
        <View>
          <Text className="mb-1 text-[14px]" style={{ color: palette.exampleText }}>
            &quot;{item.exampleEn}&quot;
          </Text>
          <Text className="text-[13px]" style={{ color: palette.textSub }}>
            {item.exampleVi}
          </Text>
        </View>
      </View>
    );
  }
);
VocabularyItemExpanded.displayName = 'VocabularyItemExpanded';
