import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export { getInitials, getCategoryColor as getDepartmentColor } from '@/lib/utils';

export const formatHireDate = (dateStr: string): string => {
  const date = dayjs(dateStr);
  const now = dayjs();
  if (now.year() === date.year()) return date.format('DD MMM');
  return date.format('DD MMM YYYY');
};
