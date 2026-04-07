import { Feather } from '@expo/vector-icons';

import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
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

import { IconFlashCard, IconReview } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useLessonFlow } from '@/hooks/useLessonFlow';

import {
  VocabPalette,
  VocabularyItemCompact,
  VocabularyItemExpanded,
} from './components/VocabularyItem';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Header = React.memo(({ onBack, palette }: { onBack: () => void; palette: VocabPalette }) => (
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
));
Header.displayName = 'Header';

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
        initialNumToRender={8}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
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
        className="absolute bottom-0 left-0 right-0 border-t px-5 py-4 pb-8"
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
