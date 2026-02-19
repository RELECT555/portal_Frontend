import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

dayjs.extend(relativeTime);
dayjs.locale('ru');

const THOUSAND = 1000;
const HOURS_THRESHOLD = 24;

export const getInitials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

export const formatCount = (count: number): string => {
  if (count >= THOUSAND) return `${(count / THOUSAND).toFixed(1)}k`;
  return String(count);
};

export const formatRelativeDate = (dateStr: string): string => {
  const date = dayjs(dateStr);
  const now = dayjs();
  const diffHours = now.diff(date, 'hour');

  if (diffHours < HOURS_THRESHOLD) return date.fromNow();
  if (now.year() === date.year()) return date.format('DD MMM');
  return date.format('DD MMM YYYY');
};

export const estimateReadingTime = (content: string): number => {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
};

export const getCategoryColor = (category: string, colorsMap: Record<string, string>): string =>
  category !== 'all' ? (colorsMap[category] ?? '#64748b') : '#64748b';
