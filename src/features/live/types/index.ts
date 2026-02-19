export interface LivePublication {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  authorName: string;
  authorAvatar?: string;
  publishedAt: string;
  likesCount: number;
  heartsCount: number;
  viewsCount: number;
  commentsCount: number;
  tags: string[];
  category: LiveCategory;
  isPinned?: boolean;
}

export type LiveCategory = 'all' | 'corporate' | 'sport' | 'creative' | 'volunteer' | 'events';

export const LIVE_CATEGORY_LABELS: Record<LiveCategory, string> = {
  all: 'Все',
  corporate: 'Корп. культура',
  sport: 'Спорт',
  creative: 'Творчество',
  volunteer: 'Волонтёрство',
  events: 'Мероприятия',
};
