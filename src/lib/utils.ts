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

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Сегодня';
  if (diffDays === 1) return 'Вчера';
  if (diffDays < 7) return `${diffDays} дн. назад`;

  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const getCategoryColor = (category: string, colorsMap: Record<string, string>): string =>
  category !== 'all' ? (colorsMap[category] ?? '#64748b') : '#64748b';
