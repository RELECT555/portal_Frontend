export type NewsCategory = 'all' | 'company' | 'hr' | 'it' | 'finance' | 'events' | 'announcements';

export type SortOption = 'recent' | 'popular' | 'discussed';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  coverImageUrl?: string;
  publishedAt: string;
  readingTimeMin?: number;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isMain?: boolean;
  isPinned?: boolean;
  authorName: string;
  authorAvatar?: string;
  category: NewsCategory;
  tags: string[];
}

export interface NewsStats {
  totalNews: number;
  thisMonth: number;
  totalAuthors: number;
}

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  all: 'Все',
  company: 'Компания',
  hr: 'HR',
  it: 'IT',
  finance: 'Финансы',
  events: 'Мероприятия',
  announcements: 'Объявления',
};

export const NEWS_CATEGORY_COLORS: Record<Exclude<NewsCategory, 'all'>, string> = {
  company: '#0d9488',
  hr: '#6366f1',
  it: '#3b82f6',
  finance: '#f59e0b',
  events: '#ec4899',
  announcements: '#ef4444',
};

export const SORT_LABELS: Record<SortOption, string> = {
  recent: 'Новые',
  popular: 'Популярные',
  discussed: 'Обсуждаемые',
};

export const SORT_OPTIONS: [SortOption, string][] = Object.entries(SORT_LABELS) as [
  SortOption,
  string,
][];

export const CATEGORY_TABS: NewsCategory[] = [
  'all',
  'company',
  'hr',
  'it',
  'finance',
  'events',
  'announcements',
];
