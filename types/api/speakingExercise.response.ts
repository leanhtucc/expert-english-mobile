import type { ScenarioPreview } from '@/types/speaking.types';

/** Task trong content speaking (mode word / …) */
export interface SpeakingExerciseTask {
  task_id: string;
  phonetic: string;
  vocab_id: string;
  question_type: string;
  reference_text: string;
}

export interface SpeakingExerciseContent {
  mode: string;
  skill: string;
  tasks: SpeakingExerciseTask[];
  schema_version: number;
  speaking_level: number;
}

/** Một exercise trong GET /exercises/by-lesson/:id */
export interface SpeakingLessonExercise {
  _id: string;
  type_id: string;
  concept_id: string | null;
  vocab_id: string;
  title: string;
  instruction_en: string | null;
  instruction_vi: string | null;
  difficulty_level: string | null;
  skill_category: string;
  content: SpeakingExerciseContent;
  duration_seconds: number | null;
  points: number;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
  lesson_id: string;
  exercise_id: string;
  order_index: number;
  is_required: boolean;
  type_info: unknown | null;
}

export interface ExercisesByLessonApiResponse {
  success: boolean;
  data: SpeakingLessonExercise[];
}

export function parseExercisesByLessonResponse(raw: unknown): SpeakingLessonExercise[] {
  if (!raw || typeof raw !== 'object') return [];
  const o = raw as Record<string, unknown>;

  if (o.success === true && Array.isArray(o.data)) {
    return o.data as SpeakingLessonExercise[];
  }

  const nested = o.data;
  if (
    nested &&
    typeof nested === 'object' &&
    'data' in nested &&
    Array.isArray((nested as ExercisesByLessonApiResponse).data)
  ) {
    const inner = nested as ExercisesByLessonApiResponse;
    if (inner.success && Array.isArray(inner.data)) return inner.data;
  }

  return [];
}

/**
 * Map exercise API → ScenarioPreview cho ScenarioCard (word speaking).
 */
export function speakingExerciseToScenarioPreview(ex: SpeakingLessonExercise): ScenarioPreview {
  const task = ex.content?.tasks?.[0];
  const word =
    (task?.reference_text || '').trim() || ex.title.replace(/^Speaking:\s*/i, '').trim() || '…';

  const rolePart = ex.title.includes(':') ? ex.title.split(':')[0].trim() : 'Speaking';
  const role = rolePart.toUpperCase();

  const question =
    ex.instruction_en?.trim() ||
    ex.instruction_vi?.trim() ||
    (ex.content?.mode === 'word'
      ? `Practice pronouncing: "${word}"`
      : `Complete the speaking task: "${word}"`);

  return {
    role,
    question,
    translation: ex.instruction_vi?.trim() || undefined,
    progress: Math.min(99, 55 + Math.min(ex.order_index, 7) * 5),
    exampleAnswer: word,
    exampleAnswerTranslation: undefined,
    pronunciationSegments: word
      ? [{ text: word, isCorrect: true }]
      : [{ text: '…', isCorrect: true }],
  };
}
