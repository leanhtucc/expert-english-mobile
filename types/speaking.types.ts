export type PracticeMode = 'dual-explorer' | 'english-master' | 'translation-hero';

export type MessageRole = 'ai' | 'user';

export type RecordingState = 'idle' | 'recording' | 'processing';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  translation?: string;
  audioUrl?: string;
  score?: number;
  timestamp: number;
  /** Từng đoạn để tô màu phát âm (Nâng cao) */
  pronunciationSegments?: HighlightedText[];
}

export interface ScenarioPreview {
  role: string;
  question: string;
  translation?: string;
  progress: number;
  exampleAnswer: string;
  exampleAnswerTranslation?: string;
  /** Gợi ý phát âm từng từ (màn Nâng cao) */
  pronunciationSegments?: HighlightedText[];
  score?: number;
}

export interface AIFeedback {
  helpfulPhrase: string;
  userAnswer: string;
  highlightedAnswer: HighlightedText[];
  insight: string;
  pronunciationScore: number;
  grammarScore: number;
}

export interface HighlightedText {
  text: string;
  correction?: string;
  isCorrect: boolean;
}

export interface LessonStep {
  id: string;
  question: string;
  expectedAnswer?: string;
  translation?: string;
}

export interface SpeakingSession {
  id: string;
  mode: PracticeMode;
  scenario: string;
  currentStep: number;
  totalSteps: number;
  messages: ChatMessage[];
  steps: LessonStep[];
}
