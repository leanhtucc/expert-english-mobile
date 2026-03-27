import { Feather, Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
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
import { useLessonFlow } from '@/hooks/useLessonFlow';

// BỔ SUNG HOOK

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const COLORS = {
  primary: '#D32F2F',
  bg: '#FFF8F7',
  card: '#FFFFFF',
  border: '#F0EAEA',
  textMain: '#222222',
  textSub: '#777777',
};

// ... (Giữ nguyên các component: Header, TagBadge) ...
const Header = ({ onBack }: { onBack: () => void }) => (
  <View className="flex-row items-center border-b border-[#F0EAEA] bg-white px-4 py-3">
    <TouchableOpacity className="h-10 w-10 justify-center" activeOpacity={0.7} onPress={onBack}>
      <Feather name="arrow-left" size={24} color={COLORS.textMain} />
    </TouchableOpacity>
    <Text className="flex-1 text-center text-[20px] font-bold" style={{ color: COLORS.textMain }}>
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

// Map dữ liệu từ FlashcardData (API) sang UI
const VocabularyItemCompact = ({ item }: { item: any }) => (
  <View className="mb-3 flex-row items-center rounded-[16px] border border-[#F0EAEA] bg-white p-3 shadow-sm">
    <Image
      source={{ uri: item.imageUrl || 'https://via.placeholder.com/60' }} // Ảnh mặc định nếu null
      className="mr-3 h-[60px] w-[60px] rounded-[12px] bg-gray-100"
    />
    <View className="flex-1 justify-center">
      <Text className="text-[16px] font-bold" style={{ color: COLORS.textMain }}>
        {item.word}
      </Text>
      <View className="mt-1 mb-1 self-start">
        <TagBadge text={item.partOfSpeech?.toUpperCase() || 'NEW'} />
      </View>
      <Text className="text-[13px]" style={{ color: COLORS.textSub }}>
        {item.phonetic}
      </Text>
    </View>
    <View className="flex-row items-center">
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-2"
        onPress={() => console.log('play audio:', item.audioUrl)}
      >
        <IconVoiceVocab width={20} height={20} color={COLORS.primary} />
      </TouchableOpacity>
      <TagBadge text={item.isRemembered ? 'LEARNED' : 'NEW'} />
    </View>
  </View>
);

const VocabularyItemExpanded = ({ item }: { item: any }) => (
  <View className="mb-4 rounded-[20px] border border-[#FCE4E4] bg-white p-4 shadow-sm">
    <View className="flex-row">
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/60' }}
        className="mr-4 h-[60px] w-[60px] rounded-[14px] bg-gray-100"
      />
      <View className="flex-1 justify-center pt-1">
        <Text className="text-[18px] font-bold" style={{ color: COLORS.textMain }}>
          {item.word}
        </Text>
        <View className="mt-1 mb-1 self-start">
          <TagBadge text={item.partOfSpeech?.toUpperCase() || 'NEW'} />
        </View>
        <Text className="text-[14px]" style={{ color: COLORS.textSub }}>
          {item.phonetic}
        </Text>
      </View>
      <View className="flex-row items-center pt-1">
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: '#A91220' }}
        >
          <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
        <View className="ml-2">
          <TagBadge text={item.isRemembered ? 'LEARNED' : 'NEW'} />
        </View>
      </View>
    </View>
    <View className="my-4 h-[1px] w-full bg-[#F0EAEA]" />
    <Text className="mb-2 text-[15px] font-semibold" style={{ color: '#A91220' }}>
      {item.definitionVi}
    </Text>
    <View>
      <Text className="mb-1 text-[14px] text-[#4A4A4A]">&quot;{item.exampleEn}&quot;</Text>
      <Text className="text-[13px]" style={{ color: COLORS.textSub }}>
        {item.exampleVi}
      </Text>
    </View>
  </View>
);

export default function VocabularyListScreen() {
  const [isMeaningShown, setIsMeaningShown] = useState(false);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { lessonId } = route.params || {};

  // GỌI API ĐỂ LẤY DANH SÁCH TỪ VỰNG TỪ LESSON_ID
  const { loading, flashcards, error } = useLessonFlow(lessonId);

  const toggleSwitch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsMeaningShown(previousState => !previousState);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="mt-4 text-gray-500">Đang tải danh sách từ vựng...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header onBack={handleBack} />

      {/* ... (Phần switch Ẩn/Hiện nghĩa giữ nguyên) ... */}
      <View className="px-5 py-4">
        <View className="flex-row items-center justify-between rounded-2xl bg-[#FFF0EF] p-4">
          <View className="flex-1 pr-4">
            <Text
              className="text-[17px] font-bold"
              style={{ color: isMeaningShown ? '#3B2828' : '#A89B9A' }}
            >
              Ẩn nghĩa từ vựng
            </Text>
            <Text
              className="mt-1 text-[13px]"
              style={{ color: isMeaningShown ? '#5C4A48' : '#C2B8B7' }}
            >
              {isMeaningShown ? 'Đang hiển thị toàn bộ nội dung' : 'Đang ẩn nghĩa và ví dụ'}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleSwitch}
            style={{
              width: 56,
              height: 32,
              borderRadius: 16,
              backgroundColor: isMeaningShown ? COLORS.primary : '#FCE4E4',
              justifyContent: 'center',
              alignItems: isMeaningShown ? 'flex-end' : 'flex-start',
              paddingHorizontal: 2,
            }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: '#fff',
                elevation: 2,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={flashcards} // SỬ DỤNG DATA THẬT
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-500">{error || 'Chưa có từ vựng nào.'}</Text>
        }
        renderItem={({ item }) =>
          isMeaningShown ? (
            <VocabularyItemExpanded item={item} />
          ) : (
            <VocabularyItemCompact item={item} />
          )
        }
      />

      {/* FIXED BOTTOM BUTTONS */}
      <View className="absolute bottom-6 left-0 right-0 border-t border-[#F0EAEA] bg-white px-5 py-4 pb-8">
        {/* Nút 1: Vào thẳng Flashcard */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="w-full flex-row items-center justify-center rounded-[16px] py-4 shadow-md"
          style={{ backgroundColor: COLORS.primary, shadowColor: COLORS.primary }}
          onPress={() => {
            console.log('📖 [VocabList] Chuyển sang Học Flashcard');
            navigation.navigate('VocabularyLearning', { lessonId, startMode: 'FLASHCARD' });
          }}
        >
          <IconFlashCard width={20} height={20} color="#FFFFFF" />
          <Text className="ml-2 text-[16px] font-bold text-white">Review with Flashcard</Text>
        </TouchableOpacity>

        {/* Nút 2: Vào thẳng Quiz */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-3 w-full flex-row items-center justify-center rounded-[16px] border-[1.5px] bg-white py-4"
          style={{ borderColor: COLORS.primary }}
          onPress={() => {
            console.log('🎮 [VocabList] Chuyển sang Làm Bài Tập (Quiz)');
            navigation.navigate('VocabularyLearning', { lessonId, startMode: 'PREPARING_QUIZ' });
          }}
        >
          <IconReview width={20} height={20} color={COLORS.primary} />
          <Text className="ml-2 text-[16px] font-bold" style={{ color: COLORS.primary }}>
            Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
