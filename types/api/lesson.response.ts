import { CommonResponse } from '../common';
import { PaginatedData } from './learningPath.response';

export interface LessonVocabularyDetail {
  _id: string;
  word: string;
  domain: string;
  phonetic: string;
  part_of_speech: string;
  definition_en: string;
  definition_vi: string;
  difficulty_level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  audio_url: string;
  image_url: string | null;
  created_at: string;
}

export interface ExampleSentence {
  _id: string;
  vocab_id: string;
  sentence_en: string;
  sentence_vi: string;
  context: string | null;
  created_at: string;
}

export interface LessonVocabulary {
  _id: string;
  lesson_id: string;
  vocab_id: string;
  order_index: number;
  flashcard_remembered_count: number;
  is_remembered: boolean;
  created_at: string;
}

export type LessonVocabularyResponse = CommonResponse<PaginatedData<LessonVocabulary>>;
export type VocabularyDetailResponse = CommonResponse<LessonVocabularyDetail>;
export type ExampleSentenceResponse = CommonResponse<PaginatedData<ExampleSentence>>;
