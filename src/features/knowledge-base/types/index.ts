export type KBCategory =
  | 'all'
  | 'regulations'
  | 'instructions'
  | 'templates'
  | 'policies'
  | 'onboarding'
  | 'faq';

export type KBSortOption = 'recent' | 'popular' | 'alphabetical';

export type KBDocumentStatus = 'active' | 'draft' | 'archived';

export interface KBDocument {
  id: string;
  title: string;
  description: string;
  category: Exclude<KBCategory, 'all'>;
  department: string;
  author: string;
  status: KBDocumentStatus;
  viewCount: number;
  downloadCount: number;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'link';
  fileSize?: string;
  tags: string[];
  isPinned?: boolean;
  isNew?: boolean;
  updatedAt: string;
  createdAt: string;
  source1C?: string;
}

export interface KBCategoryInfo {
  key: Exclude<KBCategory, 'all'>;
  label: string;
  icon: string;
  color: string;
  description: string;
  count: number;
}

export interface KBStats {
  totalDocuments: number;
  categories: number;
  updatedThisMonth: number;
}

export const KB_CATEGORY_LABELS: Record<KBCategory, string> = {
  all: 'Все',
  regulations: 'Регламенты',
  instructions: 'Инструкции',
  templates: 'Шаблоны',
  policies: 'Политики',
  onboarding: 'Онбординг',
  faq: 'FAQ',
};

export const KB_CATEGORY_COLORS: Record<Exclude<KBCategory, 'all'>, string> = {
  regulations: '#6366f1',
  instructions: '#0d9488',
  templates: '#f59e0b',
  policies: '#ef4444',
  onboarding: '#3b82f6',
  faq: '#8b5cf6',
};

export const KB_FILE_TYPE_LABELS: Record<KBDocument['fileType'], string> = {
  pdf: 'PDF',
  docx: 'Word',
  xlsx: 'Excel',
  pptx: 'PowerPoint',
  link: 'Ссылка',
};

export const SORT_LABELS: Record<KBSortOption, string> = {
  recent: 'Недавние',
  popular: 'Популярные',
  alphabetical: 'По алфавиту',
};

export const SORT_OPTIONS: [KBSortOption, string][] = Object.entries(SORT_LABELS) as [
  KBSortOption,
  string,
][];

export const CATEGORY_TABS: KBCategory[] = [
  'all',
  'regulations',
  'instructions',
  'templates',
  'policies',
  'onboarding',
  'faq',
];
