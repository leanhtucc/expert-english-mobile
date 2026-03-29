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

// Cập nhật lại entity LessonVocabulary để khớp với cấu trúc JSON trả về từ Postman
export interface LessonVocabulary {
  _id: string;
  lesson_id: string;
  vocab_id: string;
  order_index: number;

  // Thông tin chi tiết của từ vựng được lồng trực tiếp bên trong
  vocabulary: {
    _id: string;
    word: string;
    domain: string;
    phonetic: string;
    part_of_speech: string;
    definition_en: string;
    definition_vi: string;
    difficulty_level: string; // VD: "B1", "B2", v.v. (Trong ảnh là rỗng "")
    audio_url: string;
    image_url: string | null;
    createdAt: string;
    created_at: string;
  };

  // Mảng các câu ví dụ (Example Sentences) đi kèm với từ vựng này
  example_sentences: {
    _id: string;
    vocab_id: string;
    sentence_en: string;
    sentence_vi: string;
    context: string | null;
    audio_url: string;
  }[];

  // Các trường thông tin bổ sung nằm ở ngoài cùng
  sentence_en: string;
  sentence_vi: string;
  sentence_audio_url: string;
  vocab_audio_url: string;

  // Các trường theo dõi tiến độ học tập (Progress Tracking)
  flashcard_remembered_count: number;
  is_remembered: boolean;
  level: number;
  wrong_count: number;
  interval_days: number;
  next_review_at: string | null;
  is_weak: boolean;
  weak_correct_streak: number;
  quiz_type: string; // VD: "flashcard_quiz_meaning"
}
export interface SubmitLessonData {
  _id: string;
  user_id: string;
  exercise_id: string;
  lesson_id: string;
  answers: {
    example: string;
    meaning: string;
  }[];
  score: number;
  is_correct: boolean;
  time_spent_seconds: number;
  attempted_at: string;
}
export interface GenerateLessonData {
  created_exercise_ids: string[];
  selected_vocab_ids: string[];
}
// Dạng 1: Nối từ (Match Terms)
export interface MatchItem {
  id: string;
  text: string;
}
export interface MatchingContent {
  left: MatchItem[];
  right: MatchItem[];
}

// Dạng 2: Điền vào chỗ trống (Fill in the Blank)
export interface FillBlankSentence {
  answers: string[];
  sentence: string;
}
export interface FillBlankContent {
  sentences: FillBlankSentence[];
}

// Dạng 3: Trắc nghiệm (Multiple Choice)
export interface MCQItem {
  options: string[];
  phonetic?: string;
  question: string;
  correctAnswer: string;
}
export interface SpeakingTask {
  task_id: string;
  phonetic: string;
  vocab_id: string;
  question_type: string;
  reference_text: string;
}

export interface SpeakingContent {
  mode: 'word' | 'sentence';
  skill: string;
  tasks: SpeakingTask[];
  schema_version: number;
  speaking_level: number;
}
export interface MultipleChoiceContent {
  questions: MCQItem[];
}

// Gộp các loại Content lại (Để TypeScript không báo lỗi khi check type)
export type ExerciseContent = Partial<MatchingContent> &
  Partial<FillBlankContent> &
  Partial<MultipleChoiceContent> &
  Partial<SpeakingContent>;
// ==========================================
// 3. ENTITY CHÍNH (EXERCISE)
// ==========================================
export interface Exercise {
  _id: string;
  type_id: string;
  concept_id: string | null;
  vocab_id: string | null;
  title: string | null;
  instruction_en: string | null;
  instruction_vi: string | null;
  difficulty_level: string | null;
  skill_category: string | null;

  // Nội dung bài tập (Rất linh hoạt nhờ Union Types)
  content: ExerciseContent;

  duration_seconds: number | null;
  points: number;
  type_info: {
    _id: string;
    code: string; // VD: "matching", "fill_in_blank", "multiple_choice"
    name_en: string;
    name_vi: string;
    skill_category: string;
  };
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
}
export type ExercisePageResponse = CommonResponse<PaginatedData<Exercise>>;
export type GenerateLessonResponse = CommonResponse<GenerateLessonData>;
export type SubmitLessonResponse = CommonResponse<SubmitLessonData>;
export type LessonVocabularyResponse = CommonResponse<PaginatedData<LessonVocabulary>>;
export type VocabularyDetailResponse = CommonResponse<LessonVocabularyDetail>;
export type ExampleSentenceResponse = CommonResponse<PaginatedData<ExampleSentence>>;
