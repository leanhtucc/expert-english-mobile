// --- KIỂU DỮ LIỆU ---
interface Vocabulary {
  id: string;
  word: string;
  type: string;
  phonetic: string;
  meaning: string;
  example: string;
  translation: string;
  status: 'NEW' | 'WEAK' | 'LEARNED';
  image: string;
}

export const MOCK_DATA: Vocabulary[] = [
  {
    id: '1',
    word: 'Apple',
    type: 'NOUN',
    phonetic: '/ˈæp.əl/',
    meaning: 'Quả táo',
    example: 'I eat an apple every morning.',
    translation: 'Tôi ăn một quả táo mỗi sáng.',
    status: 'NEW',
    image:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    word: 'Fragile',
    type: 'ADJ',
    phonetic: '/ˈfrædʒ.aɪl/',
    meaning: 'Mỏng manh, dễ vỡ',
    example: "Be careful with that vase, it's very fragile.",
    translation: 'Cẩn thận với cái bình đó, nó rất dễ vỡ.',
    status: 'WEAK',
    image:
      'https://images.unsplash.com/photo-1615486171448-4ffd3b5eb114?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    word: 'Consume',
    type: 'VERB',
    phonetic: '/kənˈsuːm/',
    meaning: 'Tiêu thụ, ăn uống',
    example: 'He consumes a lot of calories every day.',
    translation: 'Anh ấy tiêu thụ rất nhiều calo mỗi ngày.',
    status: 'LEARNED',
    image:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=200&q=80',
  },
];
