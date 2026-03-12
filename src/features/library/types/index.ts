export type BookCategory =
  | 'all'
  | 'business'
  | 'management'
  | 'self-development'
  | 'it'
  | 'finance'
  | 'psychology'
  | 'fiction';

export type BookProject =
  | 'all'
  | 'portal'
  | 'mobile-app'
  | 'crm'
  | 'erp'
  | 'analytics'
  | 'infrastructure';

export type BookSortOption = 'recent' | 'popular' | 'rating';

export type BookStatus = 'available' | 'borrowed' | 'reserved';

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  category: Exclude<BookCategory, 'all'>;
  project?: Exclude<BookProject, 'all'>;
  rating: number;
  reviewsCount: number;
  borrowCount: number;
  pageCount: number;
  year: number;
  status: BookStatus;
  borrowedBy?: string;
  returnDate?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  tags: string[];
  addedAt: string;
}

export interface LibraryStats {
  totalBooks: number;
  available: number;
  readers: number;
}

export const BOOK_CATEGORY_LABELS: Record<BookCategory, string> = {
  all: 'Все',
  business: 'Бизнес',
  management: 'Менеджмент',
  'self-development': 'Саморазвитие',
  it: 'IT',
  finance: 'Финансы',
  psychology: 'Психология',
  fiction: 'Художественная',
};

export const BOOK_CATEGORY_COLORS: Record<Exclude<BookCategory, 'all'>, string> = {
  business: '#0d9488',
  management: '#6366f1',
  'self-development': '#f59e0b',
  it: '#3b82f6',
  finance: '#10b981',
  psychology: '#ec4899',
  fiction: '#8b5cf6',
};

export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  available: 'Доступна',
  borrowed: 'На руках',
  reserved: 'Забронирована',
};

export const BOOK_PROJECT_LABELS: Record<BookProject, string> = {
  all: 'Все проекты',
  portal: 'Портал',
  'mobile-app': 'Мобильное приложение',
  crm: 'CRM',
  erp: 'ERP',
  analytics: 'Аналитика',
  infrastructure: 'Инфраструктура',
};

export const PROJECT_TABS: BookProject[] = [
  'all',
  'portal',
  'mobile-app',
  'crm',
  'erp',
  'analytics',
  'infrastructure',
];

export const SORT_LABELS: Record<BookSortOption, string> = {
  recent: 'Новые',
  popular: 'Популярные',
  rating: 'По рейтингу',
};

export const SORT_OPTIONS: [BookSortOption, string][] = Object.entries(SORT_LABELS) as [
  BookSortOption,
  string,
][];

export const CATEGORY_TABS: BookCategory[] = [
  'all',
  'business',
  'management',
  'self-development',
  'it',
  'finance',
  'psychology',
  'fiction',
];
