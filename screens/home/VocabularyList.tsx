import { Feather, Ionicons } from '@expo/vector-icons';

import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation, useRoute } from '@react-navigation/native';

import { IconFlashCard, IconReview, IconVoiceVocab } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useLessonFlow } from '@/hooks/useLessonFlow';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type VocabPalette = {
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

function useVocabPalette(): VocabPalette {
  const { colors, isDark } = useAppTheme();

  return useMemo(
    () => ({
      primary: '#D32F2F',
      bg: isDark ? colors.background : '#FFF8F7',
      card: colors.card,
      border: colors.border,
      textMain: colors.text,
      textSub: colors.muted,
      headerBg: colors.surfaceElevated,
      expandedBorder: isDark ? colors.border : '#FCE4E4',
      definitionAccent: isDark ? '#F87171' : '#A91220',
      exampleText: isDark ? colors.muted : '#4A4A4A',
      switchTrackOff: isDark ? colors.surface : '#FCE4E4',
      switchRowBg: isDark ? colors.surface : '#FFF0EF',
      bottomBarBg: colors.surfaceElevated,
      statusBarStyle: colors.statusBarStyle,
    }),
    [colors, isDark]
  );
}

const Header = ({ onBack, palette }: { onBack: () => void; palette: VocabPalette }) => (
  <View
    className="flex-row items-center border-b px-4 py-3"
    style={{ borderBottomColor: palette.border, backgroundColor: palette.headerBg }}
  >
    <TouchableOpacity className="h-10 w-10 justify-center" activeOpacity={0.7} onPress={onBack}>
      <Feather name="arrow-left" size={24} color={palette.textMain} />
    </TouchableOpacity>
    <Text className="flex-1 text-center text-[20px] font-bold" style={{ color: palette.textMain }}>
      Vocabulary List
    </Text>
    <View className="h-10 w-10" />
  </View>
);

const TagBadge = ({ text }: { text: string; type?: 'pos' | 'status' }) => {
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
};

// Cập nhật lại Component VocabularyItemCompact
const VocabularyItemCompact = ({
  item,
  onPlayAudio,
  palette,
}: {
  item: any;
  onPlayAudio: (url: string | null | undefined) => void;
  palette: VocabPalette;
}) => {
  // 🌟 Logic tạo Link ảnh Fallback: Dựa vào độ dài của từ để ra số ngẫu nhiên cố định (từ 1 đến 10)
  // Như vậy mỗi từ sẽ có 1 cái hình trừu tượng riêng biệt
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
      />
      <View className="flex-1 justify-center">
        <Text className="text-[16px] font-bold" style={{ color: palette.textMain }}>
          {item.word}
        </Text>
        <View className="mb-1 mt-1 self-start">
          <TagBadge text={item.partOfSpeech?.toUpperCase() || 'NEW'} />
        </View>
        <Text className="text-[13px]" style={{ color: palette.textSub }}>
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
};

// Cập nhật lại Component VocabularyItemExpanded
const VocabularyItemExpanded = ({
  item,
  onPlayAudio,
  palette,
}: {
  item: any;
  onPlayAudio: (url: string | null | undefined) => void;
  palette: VocabPalette;
}) => {
  // 🌟 Logic tạo Link ảnh Fallback tương tự như trên
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
        />
        <View className="flex-1 justify-center pt-1">
          <Text className="text-[18px] font-bold" style={{ color: palette.textMain }}>
            {item.word}
          </Text>
          <View className="mb-1 mt-1 self-start">
            <TagBadge text={item.partOfSpeech?.toUpperCase() || 'NEW'} />
          </View>
          <Text className="text-[14px]" style={{ color: palette.textSub }}>
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
      <Text className="mb-2 text-[15px] font-semibold" style={{ color: palette.definitionAccent }}>
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
};

export default function VocabularyListScreen() {
  const [isMeaningHidden, setIsMeaningHidden] = useState(false);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { lessonId } = route.params || {};
  const palette = useVocabPalette();

  const { loading, flashcards, error, playAudio } = useLessonFlow(lessonId);

  const toggleSwitch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsMeaningHidden(previousState => !previousState);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  if (loading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: palette.headerBg }}
      >
        <ActivityIndicator size="large" color={palette.primary} />
        <Text className="mt-4" style={{ color: palette.textSub }}>
          Đang tải danh sách từ vựng...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: palette.bg }}>
      <StatusBar barStyle={palette.statusBarStyle} backgroundColor={palette.headerBg} />
      <Header onBack={handleBack} palette={palette} />

      <View className="px-5 py-4">
        <View className="rounded-2xl p-4" style={{ backgroundColor: palette.switchRowBg }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text
                className="text-[17px] font-bold"
                style={{ color: isMeaningHidden ? palette.textMain : palette.textSub }}
              >
                Ẩn nghĩa từ vựng
              </Text>
              <Text
                className="mt-1 text-[13px]"
                style={{
                  color: palette.textSub,
                  opacity: isMeaningHidden ? 1 : 0.75,
                }}
              >
                {isMeaningHidden ? 'Đang ẩn nghĩa và ví dụ' : 'Đang hiển thị toàn bộ nội dung'}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleSwitch}
              style={{
                width: 56,
                height: 32,
                borderRadius: 16,
                backgroundColor: isMeaningHidden ? palette.primary : palette.switchTrackOff,
                justifyContent: 'center',
                alignItems: isMeaningHidden ? 'flex-end' : 'flex-start',
                paddingHorizontal: 2,
              }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: palette.bottomBarBg,
                  elevation: 2,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={flashcards}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="mt-10 text-center" style={{ color: palette.textSub }}>
            {error || 'Chưa có từ vựng nào.'}
          </Text>
        }
        renderItem={({ item }) =>
          isMeaningHidden ? (
            <VocabularyItemCompact item={item} onPlayAudio={playAudio} palette={palette} />
          ) : (
            <VocabularyItemExpanded item={item} onPlayAudio={playAudio} palette={palette} />
          )
        }
      />

      <View
        className="absolute bottom-10 left-0 right-0 border-t px-5 py-4 pb-8"
        style={{ borderTopColor: palette.border, backgroundColor: palette.bottomBarBg }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          className="w-full flex-row items-center justify-center rounded-[16px] py-4 shadow-md"
          style={{ backgroundColor: palette.primary, shadowColor: palette.primary }}
          onPress={() => {
            navigation.navigate('VocabularyLearning', { lessonId, startMode: 'FLASHCARD' });
          }}
        >
          <IconFlashCard width={20} height={20} color="#FFFFFF" />
          <Text className="ml-2 text-[16px] font-bold text-white">Review with Flashcard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-3 w-full flex-row items-center justify-center rounded-[16px] border-[1.5px] py-4"
          style={{ borderColor: palette.primary, backgroundColor: palette.card }}
          onPress={() => {
            navigation.navigate('VocabularyLearning', { lessonId, startMode: 'PREPARING_QUIZ' });
          }}
        >
          <IconReview width={20} height={20} color={palette.primary} />
          <Text className="ml-2 text-[16px] font-bold" style={{ color: palette.primary }}>
            Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
