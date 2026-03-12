export type MoodValue = 'great' | 'good' | 'okay' | 'bad' | 'awful';

export interface MoodEntry {
  id: string;
  mood: MoodValue;
  note: string | null;
  tags: string[];
  recordedAt: string;
  createdAt: string;
}

export interface MoodStats {
  totalEntries: number;
  thisWeek: number;
  thisMonth: number;
  streak: number;
  distribution: Record<MoodValue, number>;
}

export const MOOD_EMOJI: Record<MoodValue, string> = {
  great: '😊',
  good: '😃',
  okay: '😐',
  bad: '😔',
  awful: '😢',
};

export const MOOD_LABELS: Record<MoodValue, string> = {
  great: 'Отлично',
  good: 'Хорошо',
  okay: 'Нормально',
  bad: 'Плохо',
  awful: 'Ужасно',
};

export const MOOD_COLORS: Record<MoodValue, string> = {
  great: '#10b981',
  good: '#34d399',
  okay: '#fbbf24',
  bad: '#f97316',
  awful: '#ef4444',
};

export const MOOD_VALUES: MoodValue[] = ['great', 'good', 'okay', 'bad', 'awful'];

export const MOOD_TAG_PRESETS = [
  { label: 'работа', emoji: '💼' },
  { label: 'семья', emoji: '👨‍👩‍👧' },
  { label: 'здоровье', emoji: '💪' },
  { label: 'спорт', emoji: '🏃' },
  { label: 'отдых', emoji: '🏖️' },
  { label: 'друзья', emoji: '👥' },
  { label: 'творчество', emoji: '🎨' },
  { label: 'учёба', emoji: '📚' },
  { label: 'погода', emoji: '☀️' },
  { label: 'сон', emoji: '😴' },
  { label: 'еда', emoji: '🍕' },
  { label: 'путешествие', emoji: '✈️' },
];
