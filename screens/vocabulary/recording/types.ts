export type SpeakingState = 'IDLE' | 'PLAYING_AUDIO' | 'RECORDING' | 'PROCESSING' | 'RESULT';

export type Question = {
  id: string;
  type: 'word' | 'sentence';
  text: string;
  phonetic: string;
  meaning?: string;
  imageUrl?: string;
  audioUrl: string;
  vocab_id: string;
};
