export type CertificateStatus = 'completed' | 'expired';

export interface Certificate {
  id: string;
  title: string;
  date: string;
  status: CertificateStatus;
  imageUrl: string;
}

export const ACCENT = '#E8445A';
export const GOLD = '#F5A623';
export const BLUE = '#4A90D9';
export const ORANGE = '#F76E2E';
export const CARD_BG_LIGHT = '#F8F9FC';
export const CARD_BG_DARK = '#1E2028';
export const PRIMARY = '#E53935';
export const CARD_BG = '#FFF';
export const CARD_SHADOW = 'shadow-sm';
export const AVATAR_SIZE = 96;

export const MOCK_DATA: Certificate[] = [
  {
    id: '1',
    title: 'Tech English Mastery for Engineers',
    date: '12/05/2023',
    status: 'completed',
    imageUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Executive Communication Strategy',
    date: '28/08/2023',
    status: 'completed',
    imageUrl:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Fundamental Grammar Concepts',
    date: '01/01/2024',
    status: 'expired',
    imageUrl:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
  },
];
