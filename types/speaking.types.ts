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
}

export interface ScenarioPreview {
  role: string;
  question: string;
  progress: number;
  exampleAnswer: string;
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
