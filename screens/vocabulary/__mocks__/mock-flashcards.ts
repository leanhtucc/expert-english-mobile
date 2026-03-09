import { FlashcardItem } from '../flashcard/useFlashcard';

export const mockFlashcards: FlashcardItem[] = [
  {
    id: '1',
    word: 'Transformer',
    phonetic: '/trænsˈfɔːrmər/',
    definition:
      'A deep learning model architecture that uses self-attention mechanisms to process sequential data.',
    example: 'The Transformer architecture revolutionized natural language processing.',
    translation: 'Kiến trúc Transformer - Mô hình học sâu sử dụng cơ chế tự chú ý',
    audioUrl: 'https://example.com/audio/transformer.mp3',
  },
  {
    id: '2',
    word: 'Neural Network',
    phonetic: '/ˈnjʊərəl ˈnetwɜːrk/',
    definition:
      'A computing system inspired by biological neural networks that learns to perform tasks by considering examples.',
    example: 'Neural networks are the foundation of modern artificial intelligence.',
    translation: 'Mạng nơ-ron - Hệ thống tính toán mô phỏng mạng nơ-ron sinh học',
    audioUrl: 'https://example.com/audio/neural-network.mp3',
  },
  {
    id: '3',
    word: 'Algorithm',
    phonetic: '/ˈælɡərɪðəm/',
    definition: 'A step-by-step procedure or formula for solving a problem or completing a task.',
    example: 'Machine learning algorithms can detect patterns in large datasets.',
    translation: 'Thuật toán - Quy trình từng bước để giải quyết vấn đề',
    audioUrl: 'https://example.com/audio/algorithm.mp3',
  },
  {
    id: '4',
    word: 'Optimization',
    phonetic: '/ˌɒptɪmaɪˈzeɪʃən/',
    definition: 'The process of making something as effective or functional as possible.',
    example: 'Optimization techniques improve the performance of machine learning models.',
    translation: 'Tối ưu hóa - Quá trình làm cho hiệu quả nhất có thể',
    audioUrl: 'https://example.com/audio/optimization.mp3',
  },
  {
    id: '5',
    word: 'Dataset',
    phonetic: '/ˈdeɪtəset/',
    definition: 'A collection of related data organized in a structured format for analysis.',
    example: 'Training a model requires a large and diverse dataset.',
    translation: 'Tập dữ liệu - Tập hợp dữ liệu có cấu trúc để phân tích',
    audioUrl: 'https://example.com/audio/dataset.mp3',
  },
];
