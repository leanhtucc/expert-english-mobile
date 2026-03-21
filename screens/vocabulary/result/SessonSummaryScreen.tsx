import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ImageSessionSummary from '@/assets/svgs/output/ImageSessionSummary';
import { IconReview } from '@/components/icon';

import { ResultStatCard } from '../components';
import { SecondaryButton } from './SecondaryButton';

export interface LessonSummaryData {
  totalWords: number;
  accuracy: number;
  timeSpent: string;
  masteredWords?: number;
  streak?: number;
  weakWords?: number;
}

interface LessonSummaryScreenProps {
  data: LessonSummaryData;
  onRestart?: () => void;
  onReviewWeak?: () => void;
  onClose?: () => void;
}

export const SessonSummaryScreen: React.FC<LessonSummaryScreenProps> = ({
  data,
  onRestart,
  onReviewWeak,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" translucent={false} />

      <ScrollView
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: insets.bottom + 40,
        }}
      >
        <View className="mb-10 w-full flex-row items-center">
          <TouchableOpacity onPress={onClose} className="p-2">
            <MaterialIcons name="close" size={28} color="#222" />
          </TouchableOpacity>
          <View className="mr-[30px] flex-1 items-center">
            <Text className="text-lg font-semibold text-[#0F172A]">Session Summary</Text>
          </View>
        </View>

        <View className="mb-10">
          <View className="h-[120px] w-[120px] items-center justify-center rounded-3xl bg-[#F3F6FB]">
            <ImageSessionSummary width={360} height={360} />
          </View>
        </View>

        <Text className="mb-2 text-center text-2xl font-bold text-[#0F172A]">
          Great job finishing the flashcards!
        </Text>

        <Text className="mb-6 text-center text-[15px] text-[#64748B]">
          Time to review and lock these words into your memory.
        </Text>

        <View className="mb-8 w-full flex-row justify-between px-1">
          <ResultStatCard
            className="mx-1.5 flex-1"
            icon={<MaterialIcons name="school" size={28} color="#C6102E" />}
            label="Words"
            value={data.totalWords}
          />

          <ResultStatCard
            className="mx-1.5 flex-1"
            icon={<MaterialIcons name="verified" size={28} color="#C6102E" />}
            label="Accuracy"
            value={`${data.accuracy}%`}
          />

          <ResultStatCard
            className="mx-1.5 flex-1"
            icon={<MaterialIcons name="timer" size={28} color="#C6102E" />}
            label="Time"
            value={data.timeSpent}
          />
        </View>

        <View className="mt-auto w-full px-2">
          <SecondaryButton
            onPress={onRestart}
            label="Restart Flashcards"
            subtitle="Go through the full deck again"
            className="mb-4 border border-gray-200 shadow-sm"
            style={{ backgroundColor: '#FFFFFF' }}
            icon={
              <View className="h-[52px] w-[52px] items-center justify-center rounded-full bg-red-50">
                <MaterialIcons name="refresh" size={28} color="#C6102E" />
              </View>
            }
            rightIcon={<MaterialIcons name="chevron-right" size={28} color="#9CA3AF" />}
          />

          <SecondaryButton
            onPress={onReviewWeak}
            label="Review Weak Words"
            labelClassName="text-white"
            subtitle={`Focus on the ${data.weakWords ?? 3} unknown words`}
            subtitleClassName="text-red-100"
            className="shadow-sm"
            style={{ backgroundColor: '#C6102E' }}
            icon={
              <View className="h-[52px] w-[52px] items-center justify-center rounded-full bg-white">
                <IconReview width={24} height={24} />
              </View>
            }
            rightIcon={<MaterialIcons name="arrow-forward" size={24} color="#FFF" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
