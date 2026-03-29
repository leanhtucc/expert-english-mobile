import { Question } from './types';

export const COLORS = {
  primary: '#D32F2F',
  primaryLight: '#FCE4E4',
  background: '#F8FAFC',
  textMain: '#1E293B',
  textSub: '#64748B',
  white: '#FFFFFF',
};

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'word',
    text: 'Transformer',
    phonetic: "/træns'fɔ:rmər/",
    meaning: 'Cấu trúc mạng nơ-ron chuyên xử lý dữ liệu tuần tự.',
    imageUrl:
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 'q2',
    type: 'sentence',
    text: 'The model architecture uses a transformer block.',
    phonetic: "/ðə 'mɑ:dl ,ɑ:rkɪ'tektʃər 'ju:zɪz ə træns'fɔ:rmər blɑ:k/",
    meaning: 'Kiến trúc mô hình sử dụng một khối transformer.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
];
