import { CommonResponse } from '../common';
import { PaginatedData } from './learningPath.response';

export interface Vocabulary {
  _id: string;
  word: string;
  meaning_vi: string;
  meaning_en: string;
  pos: string; // Part of speech (noun, verb...)
  phonetic: string;
  audio_url: string;
  domain: string;
}

export interface ExampleSentence {
  _id: string;
  vocab_id: string;
  sentence_en: string;
  sentence_vi: string;
}

export interface LessonVocabulary {
  _id: string;
  lesson_id: string;
  vocab_id: string;
  order_index: number;
}

export type LessonVocabularyResponse = CommonResponse<PaginatedData<LessonVocabulary>>;
export type VocabularyDetailResponse = CommonResponse<Vocabulary>;
export type ExampleSentenceResponse = CommonResponse<PaginatedData<ExampleSentence>>;
