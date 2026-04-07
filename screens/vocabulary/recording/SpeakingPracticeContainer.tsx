import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { apiConfig } from '@/api';
import { learningApi } from '@/api/endpoints/learning.api';
import { CustomText as Text } from '@/components/ui/CustomText';
import { useGenerateSpeakingForLesson } from '@/hooks/useGenerateSpeakingForLesson';

import { RecordingScreen } from './RecordingScreen';
import { Question } from './types';

const resolveUrl = (url?: string | null) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('file://')) return url;
  return `${apiConfig.baseURL}${url}`;
};

interface SpeakingPracticeContainerProps {
  lessonId: string;
  onClose: () => void;
  onBack: () => void;
}

export const SpeakingPracticeContainer: React.FC<SpeakingPracticeContainerProps> = ({
  lessonId,
  onClose,
  onBack,
}) => {
  const {
    exercisesByLesson,
    isLoading: exercisesLoading,
    error: genError,
  } = useGenerateSpeakingForLesson({ lessonId });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFetchingVocab, setIsFetchingVocab] = useState(false);

  useEffect(() => {
    const loadVocabDetails = async () => {
      console.log('[SpeakingPracticeContainer] exercisesByLesson input:', exercisesByLesson);
      if (!Array.isArray(exercisesByLesson) || exercisesByLesson.length === 0) {
        console.log('[SpeakingPracticeContainer] no array or empty exercisesByLesson');
        return;
      }

      setIsFetchingVocab(true);
      try {
        const loadedQuestions: Question[] = [];

        for (const exercise of exercisesByLesson) {
          const vocabId = exercise.vocab_id;
          console.log('[SpeakingPracticeContainer] fetching vocab:', vocabId);
          if (!vocabId) continue;

          try {
            const res = await learningApi.getVocabularyDetail(vocabId);
            const vocab = res.data?.data;
            if (vocab) {
              loadedQuestions.push({
                id: vocab._id,
                vocab_id: vocab._id,
                type: 'word',
                text: vocab.word || exercise.content?.tasks?.[0]?.reference_text || '',
                phonetic: vocab.phonetic || '',
                meaning: vocab.definition_vi || vocab.definition_en || '',
                imageUrl: resolveUrl(vocab.image_url),
                audioUrl: resolveUrl(vocab.audio_url),
              });
            }
          } catch (e) {
            console.error('Lỗi lấy chi tiết vocab cho', vocabId, e);
          }
        }

        if (loadedQuestions.length === 0) {
          Alert.alert('Thông báo', 'Không thể tải chi tiết từ vựng để luyện nói.');
          onBack();
        } else {
          setQuestions(loadedQuestions);
        }
      } catch {
        Alert.alert('Lỗi', 'Không thể tải dữ liệu luyện nói.');
        onBack();
      } finally {
        setIsFetchingVocab(false);
      }
    };

    if (exercisesByLesson && exercisesByLesson.length > 0) {
      loadVocabDetails();
    } else if (exercisesByLesson && exercisesByLesson.length === 0 && !exercisesLoading) {
      Alert.alert('Thông báo', 'Không tìm thấy bài tập luyện nói nào.');
      onBack();
    }
  }, [exercisesByLesson, exercisesLoading, onBack]);

  if (exercisesLoading || isFetchingVocab) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text className="mt-4 font-medium text-slate-500">Đang chuẩn bị bài luyện nói...</Text>
      </View>
    );
  }

  if (genError || exercisesByLesson?.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-5">
        <Text className="text-center font-medium text-slate-500">
          Hiện không có dữ liệu luyện nói cho bài học này.
        </Text>
      </View>
    );
  }

  if (questions.length === 0) return null;

  return (
    <RecordingScreen
      questions={questions}
      lessonId={lessonId}
      onClose={onClose}
      onBack={onBack}
      onComplete={() => {
        // Sau khi hoàn thành hết các câu
        onBack();
      }}
    />
  );
};
