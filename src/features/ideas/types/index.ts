export type IdeaStatus = 'new' | 'review' | 'approved' | 'rejected' | 'implemented';

export type IdeaCategory = 'all' | 'process' | 'product' | 'culture' | 'tech' | 'other';

export type IdeaSortOption = 'recent' | 'popular' | 'discussed';

export interface Idea {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar?: string;
  status: IdeaStatus;
  category: Exclude<IdeaCategory, 'all'>;
  votesCount: number;
  commentsCount: number;
  createdAt: string;
  tags: string[];
  hasVoted?: boolean;
}

export interface IdeasStats {
  totalIdeas: number;
  implemented: number;
  inReview: number;
}

export const IDEA_STATUS_LABELS: Record<IdeaStatus, string> = {
  new: 'Новая',
  review: 'На рассмотрении',
  approved: 'Одобрена',
  rejected: 'Отклонена',
  implemented: 'Реализована',
};

export const IDEA_STATUS_COLORS: Record<IdeaStatus, string> = {
  new: '#3b82f6',
  review: '#f59e0b',
  approved: '#10b981',
  rejected: '#ef4444',
  implemented: '#6366f1',
};

export const IDEA_CATEGORY_LABELS: Record<IdeaCategory, string> = {
  all: 'Все',
  process: 'Процессы',
  product: 'Продукт',
  culture: 'Культура',
  tech: 'Технологии',
  other: 'Другое',
};

export const IDEA_CATEGORY_EMOJI: Record<Exclude<IdeaCategory, 'all'>, string> = {
  process: '\u2699\uFE0F',
  product: '\uD83D\uDE80',
  culture: '\uD83C\uDFA8',
  tech: '\uD83D\uDCBB',
  other: '\uD83D\uDCA1',
};

export const IDEA_CATEGORY_DESCRIPTIONS: Record<Exclude<IdeaCategory, 'all'>, string> = {
  process:
    '\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432',
  product:
    '\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430',
  culture:
    '\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0430\u044F \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u0430',
  tech: '\u041D\u043E\u0432\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438',
  other: '\u0420\u0430\u0437\u043D\u043E\u0435 \u0438 \u0434\u0440\u0443\u0433\u043E\u0435',
};

export const IDEA_CATEGORY_COLORS: Record<Exclude<IdeaCategory, 'all'>, string> = {
  process: '#0d9488',
  product: '#3b82f6',
  culture: '#ec4899',
  tech: '#6366f1',
  other: '#64748b',
};

export interface PresetTag {
  label: string;
  emoji: string;
}

export const PRESET_TAGS: PresetTag[] = [
  {
    label: '\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F',
    emoji: '\uD83E\uDD16',
  },
  { label: '\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B', emoji: '\uD83D\uDD04' },
  { label: '\u043F\u0440\u043E\u0434\u0443\u043A\u0442', emoji: '\uD83C\uDFAF' },
  { label: '\u043A\u043E\u043C\u0430\u043D\u0434\u0430', emoji: '\uD83E\uDD1D' },
  { label: '\u043E\u0444\u0438\u0441', emoji: '\uD83C\uDFE2' },
  { label: '\u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438', emoji: '\u2699\uFE0F' },
  { label: '\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044F', emoji: '\uD83D\uDCB0' },
  { label: '\u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C', emoji: '\u26A1' },
  { label: '\u0443\u0434\u043E\u0431\u0441\u0442\u0432\u043E', emoji: '\u2728' },
  { label: '\u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435', emoji: '\uD83C\uDF93' },
  { label: '\u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435', emoji: '\uD83D\uDCAA' },
  { label: '\u044D\u043A\u043E\u043B\u043E\u0433\u0438\u044F', emoji: '\uD83C\uDF3F' },
  {
    label: '\u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u044F',
    emoji: '\uD83D\uDCAC',
  },
  { label: '\u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430', emoji: '\uD83D\uDCCA' },
  { label: 'UX/UI', emoji: '\uD83C\uDFA8' },
  {
    label: '\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C',
    emoji: '\uD83D\uDD12',
  },
];

export const SORT_LABELS: Record<IdeaSortOption, string> = {
  recent: 'Новые',
  popular: 'Популярные',
  discussed: 'Обсуждаемые',
};

export const SORT_OPTIONS: [IdeaSortOption, string][] = Object.entries(SORT_LABELS) as [
  IdeaSortOption,
  string,
][];

export const CATEGORY_TABS: IdeaCategory[] = [
  'all',
  'process',
  'product',
  'culture',
  'tech',
  'other',
];
