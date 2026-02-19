import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import type { BookStatus } from '../types';
import { BOOK_CATEGORY_COLORS } from '../types';

dayjs.extend(relativeTime);
dayjs.locale('ru');

const HOURS_THRESHOLD = 24;

export const formatRelativeDate = (dateStr: string): string => {
  const date = dayjs(dateStr);
  const now = dayjs();
  const diffHours = now.diff(date, 'hour');

  if (diffHours < HOURS_THRESHOLD) return date.fromNow();
  if (now.year() === date.year()) return date.format('DD MMM');
  return date.format('DD MMM YYYY');
};

export const formatReturnDate = (dateStr: string): string => dayjs(dateStr).format('DD.MM.YYYY');

export const getCategoryColor = (category: string): string =>
  (BOOK_CATEGORY_COLORS as Record<string, string>)[category] ?? '#64748b';

export const getStatusColor = (status: BookStatus): string => {
  const STATUS_COLORS: Record<BookStatus, string> = {
    available: '#10b981',
    borrowed: '#f59e0b',
    reserved: '#6366f1',
  };
  return STATUS_COLORS[status];
};

export const formatRating = (rating: number): string => rating.toFixed(1);

export const pluralizeReviews = (count: number): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) return `${count} отзывов`;
  if (mod10 === 1) return `${count} отзыв`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} отзыва`;
  return `${count} отзывов`;
};

export const pluralizeBooks = (count: number): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) return `${count} книг`;
  if (mod10 === 1) return `${count} книга`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} книги`;
  return `${count} книг`;
};
