import { Feather, Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import {
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

import { useNavigation } from '@react-navigation/native';

import { IconFlashCard, IconReview, IconVoiceVocab } from '@/components/icon';

import { MOCK_DATA } from './constants/dataHome.constants';

// --- BẬT LAYOUT ANIMATION CHO ANDROID ---
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- BỘ MÀU SẮC DÙNG CHUNG ---
const COLORS = {
  primary: '#D32F2F',
  bg: '#FFF8F7',
  card: '#FFFFFF',
  border: '#F0EAEA',
  textMain: '#222222',
  textSub: '#777777',
};
// --- KIỂU DỮ LIỆU ---
interface Vocabulary {
  id: string;
  word: string;
  type: string;
  phonetic: string;
  meaning: string;
  example: string;
  translation: string;
  status: 'NEW' | 'WEAK' | 'LEARNED';
  image: string;
}

// ==========================================
// CÁC COMPONENTS PHỤ
// ==========================================

const Header = ({ onBack }: { onBack: () => void }) => (
  <View className="flex-row items-center border-b border-[#F0EAEA] bg-white px-4 py-3">
    <TouchableOpacity
      className="h-10 w-10 justify-center"
      activeOpacity={0.7}
      onPress={onBack} // Gọi hàm onBack khi nhấn
    >
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

const VocabularyItemCompact = ({ item }: { item: Vocabulary }) => (
  <View className="mb-3 flex-row items-center rounded-[16px] border border-[#F0EAEA] bg-white p-3 shadow-sm">
    <Image
      source={{ uri: item.image }}
      className="mr-3 h-[60px] w-[60px] rounded-[12px] bg-gray-100"
    />

    <View className="flex-1 justify-center">
      <Text className="text-[16px] font-bold" style={{ color: COLORS.textMain }}>
        {item.word}
      </Text>
      <View className="mt-1 mb-1 self-start">
        <TagBadge text={item.type} />
      </View>
      <Text className="text-[13px]" style={{ color: COLORS.textSub }}>
        {item.phonetic}
      </Text>
    </View>

    <View className="flex-row items-center">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log('play audio')}
        className="p-2"
      >
        <IconVoiceVocab width={20} height={20} color={COLORS.primary} />
      </TouchableOpacity>
      <TagBadge text={item.status} />
    </View>
  </View>
);

const VocabularyItemExpanded = ({ item }: { item: Vocabulary }) => (
  <View className="mb-4 rounded-[20px] border border-[#FCE4E4] bg-white p-4 shadow-sm">
    <View className="flex-row">
      <Image
        source={{ uri: item.image }}
        className="mr-4 h-[60px] w-[60px] rounded-[14px] bg-gray-100"
      />

      <View className="flex-1 justify-center pt-1">
        <Text className="text-[18px] font-bold" style={{ color: COLORS.textMain }}>
          {item.word}
        </Text>
        <View className="mt-1 mb-1 self-start">
          <TagBadge text={item.type} />
        </View>
        <Text className="text-[14px]" style={{ color: COLORS.textSub }}>
          {item.phonetic}
        </Text>
      </View>

      <View className="flex-row items-center pt-1">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => console.log('play audio')}
          className="h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: '#A91220' }}
        >
          <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
        <View className="ml-2">
          <TagBadge text={item.status} />
        </View>
      </View>
    </View>

    <View className="my-4 h-[1px] w-full bg-[#F0EAEA]" />

    <Text className="mb-2 text-[15px] font-semibold" style={{ color: '#A91220' }}>
      {item.meaning}
    </Text>

    <View>
      <Text className="mb-1 text-[14px] text-[#4A4A4A]">&quot;{item.example}&quot;</Text>
      <Text className="text-[13px]" style={{ color: COLORS.textSub }}>
        {item.translation}
      </Text>
    </View>
  </View>
);

export default function VocabularyListScreen() {
  const [isMeaningShown, setIsMeaningShown] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsMeaningShown(previousState => !previousState);
  };
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Header onBack={handleBack} />

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
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: 2,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={MOCK_DATA}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
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
        {/* Primary Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="w-full flex-row items-center justify-center rounded-[16px] py-4 shadow-md"
          style={{ backgroundColor: COLORS.primary, shadowColor: COLORS.primary }}
        >
          <IconFlashCard width={20} height={20} color="#FFFFFF" />
          <Text className="ml-2 text-[16px] font-bold text-white">Review with Flashcard</Text>
        </TouchableOpacity>

        {/* Secondary Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-3 w-full flex-row items-center justify-center rounded-[16px] border-[1.5px] bg-white py-4"
          style={{ borderColor: COLORS.primary }}
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
