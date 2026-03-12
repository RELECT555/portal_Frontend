import type { MoodEntry, MoodStats, MoodValue } from './types';

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(9 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60));
  return d.toISOString();
}

const moods: MoodValue[] = ['great', 'good', 'okay', 'bad', 'awful'];
const notes = [
  'Продуктивный день, много сделал по проекту',
  'Отличная встреча с командой',
  'Немного устал, но всё хорошо',
  'Было сложно сосредоточиться',
  'Классный обед с коллегами',
  'Завершил сложную задачу!',
  'Не выспался, но справился',
  'Получил хороший фидбек от руководителя',
  'Спорт после работы зарядил энергией',
  null,
  'Весь день на совещаниях',
  null,
  'Хорошая погода подняла настроение',
  'Небольшая ссора с коллегой',
  'Удалось помочь новичку в команде',
];
const tagSets = [
  ['работа', 'продуктивность'],
  ['работа'],
  ['здоровье', 'сон'],
  ['работа', 'стресс'],
  ['друзья', 'еда'],
  ['работа', 'творчество'],
  ['сон'],
  ['работа'],
  ['спорт', 'здоровье'],
  [],
  ['работа'],
  [],
  ['погода', 'отдых'],
  ['работа'],
  ['работа', 'команда'],
];

export const MOCK_MOOD_ENTRIES: MoodEntry[] = Array.from({ length: 30 }, (_, i) => ({
  id: `mood-${i + 1}`,
  mood: moods[Math.floor(Math.random() * 3.5)] as MoodValue,
  note: notes[i % notes.length],
  tags: tagSets[i % tagSets.length],
  recordedAt: daysAgo(i),
  createdAt: daysAgo(i),
})).sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());

export const MOCK_MOOD_STATS: MoodStats = {
  totalEntries: 30,
  thisWeek: 5,
  thisMonth: 22,
  streak: 7,
  distribution: {
    great: 8,
    good: 10,
    okay: 7,
    bad: 4,
    awful: 1,
  },
};
