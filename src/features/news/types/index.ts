export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  coverImageUrl?: string;
  publishedAt: string;
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

export type NewsCategory = 'all' | 'company' | 'hr' | 'it' | 'finance' | 'events' | 'announcements';

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
