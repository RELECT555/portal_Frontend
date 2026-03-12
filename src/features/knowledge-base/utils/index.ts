import { formatCount, formatDate as sharedFormatDate } from '@/lib/utils';
import { KB_CATEGORY_COLORS } from '../types';
import type { KBCategory, KBDocument } from '../types';

export const getCategoryColor = (category: Exclude<KBCategory, 'all'>): string =>
  KB_CATEGORY_COLORS[category] ?? '#64748b';

export const formatViewCount = formatCount;

export const formatDate = sharedFormatDate;

export const getFileTypeColor = (fileType: KBDocument['fileType']): string => {
  const map: Record<KBDocument['fileType'], string> = {
    pdf: '#ef4444',
    docx: '#3b82f6',
    xlsx: '#10b981',
    pptx: '#f59e0b',
    link: '#8b5cf6',
  };
  return map[fileType];
};
