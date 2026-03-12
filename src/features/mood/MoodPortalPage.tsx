import React, { useState, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import {
  ArrowBackRounded,
  DeleteOutlineRounded,
  SendRounded,
  LocalFireDepartmentRounded,
  CalendarMonthRounded,
  BarChartRounded,
  EditNoteRounded,
  AddCircleOutlineRounded,
  DarkModeRounded,
  LightModeRounded,
} from '@mui/icons-material';
import { ROUTES } from '@/lib/constants';
import { useMoodEntries, useMoodStats, useCreateMood, useDeleteMood } from './hooks';
import { MOCK_MOOD_ENTRIES, MOCK_MOOD_STATS } from './mockData';
import { MOOD_VALUES, MOOD_EMOJI, MOOD_LABELS, MOOD_COLORS, MOOD_TAG_PRESETS } from './types';
import type { MoodValue, MoodEntry, MoodStats } from './types';
import styles from './MoodPortalPage.module.scss';

type TabId = 'record' | 'stats' | 'diary';
type ThemeId = 'dark' | 'light';

const TABS: readonly { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'record', label: 'Записать', icon: <AddCircleOutlineRounded sx={{ fontSize: 18 }} /> },
  { id: 'stats', label: 'Статистика', icon: <BarChartRounded sx={{ fontSize: 18 }} /> },
  { id: 'diary', label: 'Дневник', icon: <EditNoteRounded sx={{ fontSize: 18 }} /> },
];

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Доброй ночи!';
  if (h < 12) return 'Доброе утро!';
  if (h < 18) return 'Добрый день!';
  return 'Добрый вечер!';
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const entry = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = (today.getTime() - entry.getTime()) / 86_400_000;
  if (diff === 0) return 'Сегодня';
  if (diff === 1) return 'Вчера';
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

type CalendarCell = { date: Date; mood?: MoodValue; isToday: boolean };

function buildCalendar(entries: MoodEntry[]): CalendarCell[] {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const start = new Date(y, m, 1);
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const entryMap = new Map<string, MoodValue>();
  for (const e of entries) {
    const d = new Date(e.recordedAt);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!entryMap.has(key)) entryMap.set(key, e.mood);
  }

  const cells: CalendarCell[] = [];
  const dayOfWeek = (start.getDay() + 6) % 7;
  for (let i = 0; i < dayOfWeek; i++) cells.push({ date: new Date(0), isToday: false });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    const key = `${y}-${m}-${d}`;
    cells.push({ date, mood: entryMap.get(key), isToday: d === today.getDate() });
  }
  return cells;
}

function getSavedTheme(): ThemeId {
  try {
    const saved = localStorage.getItem('emo-portal-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* noop */
  }
  return 'light';
}

function dateKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ═══════════════════════════════════════════════
// Memoized sub-components for tab content
// ═══════════════════════════════════════════════

interface RecordTabProps {
  todayEntry: MoodEntry | undefined;
  selectedMood: MoodValue | null;
  setSelectedMood: (mood: MoodValue | null) => void;
  note: string;
  setNote: (note: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  onSubmit: () => void;
  isPending: boolean;
  entries: MoodEntry[];
  accentColor: string;
  onGoToDiary: () => void;
}

const RecordTab = memo<RecordTabProps>(function RecordTab({
  todayEntry,
  selectedMood,
  setSelectedMood,
  note,
  setNote,
  selectedTags,
  toggleTag,
  onSubmit,
  isPending,
  entries,
  accentColor,
  onGoToDiary,
}) {
  const recentEntries = useMemo(() => entries.slice(0, 3), [entries]);

  return (
    <div className={styles.tabContent}>
      <div className={styles.primaryCard}>
        <div className={styles.primaryTop}>
          <h2 className={styles.greetingTitle}>{getGreeting()}</h2>
          <p className={styles.greetingText}>
            {todayEntry
              ? `Сегодня вы чувствуете себя: ${MOOD_EMOJI[todayEntry.mood]} ${MOOD_LABELS[todayEntry.mood]}`
              : 'Как вы себя чувствуете сегодня?'}
          </p>
        </div>

        <div className={styles.moodGrid}>
          {MOOD_VALUES.map((mood) => (
            <button
              key={mood}
              type="button"
              className={`${styles.moodBtn} ${selectedMood === mood ? styles.moodBtnActive : ''}`}
              onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
            >
              <span className={styles.moodEmoji}>{MOOD_EMOJI[mood]}</span>
              <span className={styles.moodLabel}>{MOOD_LABELS[mood]}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className={styles.noteArea}>
            <textarea
              className={styles.noteTextarea}
              placeholder="Что повлияло на ваше настроение? (необязательно)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
            <div className={styles.tagCloud}>
              {MOOD_TAG_PRESETS.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  className={`${styles.tagChip} ${selectedTags.includes(t.label) ? styles.tagChipSelected : ''}`}
                  onClick={() => toggleTag(t.label)}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={onSubmit}
              disabled={isPending}
            >
              {isPending ? 'Сохраняем...' : 'Сохранить запись'}
              <SendRounded sx={{ fontSize: 15 }} />
            </button>
          </div>
        )}
      </div>

      {recentEntries.length > 0 && (
        <div className={styles.glassCard}>
          <div className={styles.cardHeader}>
            <EditNoteRounded sx={{ fontSize: 15, color: accentColor }} />
            <span className={styles.cardHeaderTitle}>Последние записи</span>
            <button type="button" className={styles.cardHeaderLink} onClick={onGoToDiary}>
              Все записи →
            </button>
          </div>
          <div className={styles.miniDiaryList}>
            {recentEntries.map((entry) => (
              <div key={entry.id} className={styles.miniDiaryEntry}>
                <span className={styles.miniDiaryEmoji}>{MOOD_EMOJI[entry.mood]}</span>
                <span className={styles.miniDiaryLabel}>{MOOD_LABELS[entry.mood]}</span>
                <span className={styles.miniDiaryDate}>
                  {formatDate(entry.recordedAt)}, {formatTime(entry.recordedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

interface StatsTabProps {
  stats: MoodStats;
  calendarCells: CalendarCell[];
  maxDistribution: number;
  monthName: string;
  accentColor: string;
}

const StatsTab = memo<StatsTabProps>(function StatsTab({
  stats,
  calendarCells,
  maxDistribution,
  monthName,
  accentColor,
}) {
  const distributionRows = useMemo(
    () =>
      MOOD_VALUES.map((mood) => {
        const count = stats.distribution[mood] ?? 0;
        const pct = maxDistribution > 0 ? (count / maxDistribution) * 100 : 0;
        return { mood, count, pct };
      }),
    [stats.distribution, maxDistribution],
  );

  return (
    <div className={styles.tabContent}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statCardValue}>{stats.totalEntries}</span>
          <span className={styles.statCardLabel}>Записей</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statCardValue}>{stats.thisWeek}</span>
          <span className={styles.statCardLabel}>За неделю</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statCardValue}>{stats.thisMonth}</span>
          <span className={styles.statCardLabel}>За месяц</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statCardValue} ${styles.statCardValueStreak}`}>
            <LocalFireDepartmentRounded sx={{ fontSize: 18 }} />
            {stats.streak}
          </span>
          <span className={styles.statCardLabel}>Дней подряд</span>
        </div>
      </div>

      <div className={styles.glassCard}>
        <div className={styles.cardHeader}>
          <CalendarMonthRounded sx={{ fontSize: 16, color: accentColor }} />
          <span className={styles.cardHeaderTitle}>Календарь — {monthName}</span>
        </div>
        <div className={styles.calendarGrid}>
          {DAY_LABELS.map((d) => (
            <div key={d} className={styles.calendarDayLabel}>
              {d}
            </div>
          ))}
          {calendarCells.map((cell, i) => {
            if (cell.date.getTime() === 0) {
              return <div key={`e-${i}`} className={styles.calendarCell} />;
            }
            const filled = Boolean(cell.mood);
            return (
              <div
                key={cell.date.toISOString()}
                className={`${styles.calendarCell} ${filled ? styles.calendarCellFilled : ''} ${cell.isToday ? styles.calendarCellToday : ''}`}
                style={filled ? { background: `${MOOD_COLORS[cell.mood!]}30` } : undefined}
                title={filled ? MOOD_LABELS[cell.mood!] : undefined}
              >
                {filled ? (
                  <span className={styles.calendarCellEmoji}>{MOOD_EMOJI[cell.mood!]}</span>
                ) : (
                  <span className={styles.calendarCellNum}>{cell.date.getDate()}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.glassCard}>
        <div className={styles.cardHeader}>
          <BarChartRounded sx={{ fontSize: 16, color: accentColor }} />
          <span className={styles.cardHeaderTitle}>Распределение настроений</span>
        </div>
        <div className={styles.distributionBars}>
          {distributionRows.map(({ mood, count, pct }) => (
            <div key={mood} className={styles.distributionRow}>
              <span className={styles.distributionEmoji}>{MOOD_EMOJI[mood]}</span>
              <span className={styles.distributionLabel}>{MOOD_LABELS[mood]}</span>
              <div className={styles.distributionBarWrap}>
                <div
                  className={styles.distributionBar}
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${MOOD_COLORS[mood]}bb, ${MOOD_COLORS[mood]}44)`,
                  }}
                />
              </div>
              <span className={styles.distributionCount}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

interface DiaryTabProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
  onGoToRecord: () => void;
  accentColor: string;
}

const DiaryTab = memo<DiaryTabProps>(function DiaryTab({
  entries,
  onDelete,
  onGoToRecord,
  accentColor,
}) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.glassCard}>
        <div className={styles.cardHeader}>
          <EditNoteRounded sx={{ fontSize: 16, color: accentColor }} />
          <span className={styles.cardHeaderTitle}>Все записи</span>
          <span className={styles.cardHeaderCount}>{entries.length}</span>
        </div>

        {entries.length > 0 ? (
          <div className={styles.diaryList}>
            {entries.map((entry) => (
              <DiaryEntryRow key={entry.id} entry={entry} onDelete={onDelete} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyDiary}>
            <span className={styles.emptyDiaryIcon}>📝</span>
            <span className={styles.emptyDiaryText}>Записей пока нет</span>
            <button type="button" className={styles.emptyDiaryBtn} onClick={onGoToRecord}>
              Записать настроение
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

interface DiaryEntryRowProps {
  entry: MoodEntry;
  onDelete: (id: string) => void;
}

const DiaryEntryRow = memo<DiaryEntryRowProps>(function DiaryEntryRow({ entry, onDelete }) {
  const handleDelete = useCallback(() => onDelete(entry.id), [entry.id, onDelete]);

  return (
    <div className={styles.diaryEntry}>
      <span className={styles.diaryEmoji}>{MOOD_EMOJI[entry.mood]}</span>
      <div className={styles.diaryBody}>
        <div className={styles.diaryMeta}>
          <span className={styles.diaryMoodLabel}>{MOOD_LABELS[entry.mood]}</span>
          <span className={styles.diaryDate}>
            {formatDate(entry.recordedAt)}, {formatTime(entry.recordedAt)}
          </span>
        </div>
        {entry.note && <p className={styles.diaryNote}>{entry.note}</p>}
        {entry.tags.length > 0 && (
          <div className={styles.diaryTags}>
            {entry.tags.map((tag) => (
              <span key={tag} className={styles.diaryTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        className={styles.diaryDeleteBtn}
        onClick={handleDelete}
        title="Удалить"
      >
        <DeleteOutlineRounded sx={{ fontSize: 14 }} />
      </button>
    </div>
  );
});

// ═══════════════════════════════════════════════
// Main page component
// ═══════════════════════════════════════════════

const MoodPortalPage: React.FC = () => {
  const [theme, setTheme] = useState<ThemeId>(getSavedTheme);
  const [activeTab, setActiveTab] = useState<TabId>('record');
  const [selectedMood, setSelectedMood] = useState<MoodValue | null>(null);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [snack, setSnack] = useState<{ message: string } | null>(null);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('emo-portal-theme', next);
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  const { data: apiEntries, isError: entriesError } = useMoodEntries();
  const { data: apiStats, isError: statsError } = useMoodStats();
  const createMood = useCreateMood();
  const deleteMood = useDeleteMood();

  const entries = useMemo(
    () => (entriesError || !apiEntries?.data ? MOCK_MOOD_ENTRIES : apiEntries.data),
    [apiEntries, entriesError],
  );
  const stats = useMemo(
    () => (statsError || !apiStats ? MOCK_MOOD_STATS : apiStats),
    [apiStats, statsError],
  );
  const calendarCells = useMemo(() => buildCalendar(entries), [entries]);
  const maxDistribution = useMemo(
    () => Math.max(...Object.values(stats.distribution), 1),
    [stats.distribution],
  );
  const monthName = useMemo(
    () => new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
    [],
  );

  const todayEntry = useMemo(() => {
    const now = new Date();
    const tk = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    return entries.find((e) => dateKey(e.recordedAt) === tk);
  }, [entries]);

  const accentColor = theme === 'light' ? '#0d9488' : '#a78bfa';

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const goToDiary = useCallback(() => setActiveTab('diary'), []);
  const goToRecord = useCallback(() => setActiveTab('record'), []);

  const handleSubmit = useCallback(() => {
    if (!selectedMood) return;
    createMood.mutate(
      { mood: selectedMood, note: note.trim() || undefined, tags: selectedTags },
      {
        onSuccess: () => {
          setSnack({ message: 'Настроение записано!' });
          setSelectedMood(null);
          setNote('');
          setSelectedTags([]);
          setActiveTab('diary');
        },
        onError: () => setSnack({ message: 'Не удалось сохранить запись' }),
      },
    );
  }, [selectedMood, note, selectedTags, createMood]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteMood.mutate(id, {
        onSuccess: () => setSnack({ message: 'Запись удалена' }),
        onError: () => setSnack({ message: 'Не удалось удалить' }),
      });
    },
    [deleteMood],
  );

  const closeSnack = useCallback(() => setSnack(null), []);

  return (
    <div className={`${styles.portal} ${theme === 'light' ? styles.portalLight : ''}`}>
      {theme === 'dark' && (
        <>
          <div className={styles.ambientOrb1} />
          <div className={styles.ambientOrb2} />
        </>
      )}

      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link to={ROUTES.HOME} className={styles.backLink}>
            <ArrowBackRounded sx={{ fontSize: 16 }} />
            <span className={styles.backLinkText}>Портал</span>
          </Link>
          <span className={styles.topBarTitle}>EMO-PORTAL</span>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          >
            {theme === 'dark' ? (
              <LightModeRounded sx={{ fontSize: 16 }} />
            ) : (
              <DarkModeRounded sx={{ fontSize: 16 }} />
            )}
          </button>
          <span className={styles.topBarStreak} title="Дней подряд">
            <LocalFireDepartmentRounded sx={{ fontSize: 14 }} />
            {stats.streak}
          </span>
        </div>

        <nav className={styles.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.id === 'diary' && entries.length > 0 && (
                <span className={styles.tabBadge}>{entries.length}</span>
              )}
            </button>
          ))}
        </nav>

        {activeTab === 'record' && (
          <RecordTab
            todayEntry={todayEntry}
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
            note={note}
            setNote={setNote}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            onSubmit={handleSubmit}
            isPending={createMood.isPending}
            entries={entries}
            accentColor={accentColor}
            onGoToDiary={goToDiary}
          />
        )}

        {activeTab === 'stats' && (
          <StatsTab
            stats={stats}
            calendarCells={calendarCells}
            maxDistribution={maxDistribution}
            monthName={monthName}
            accentColor={accentColor}
          />
        )}

        {activeTab === 'diary' && (
          <DiaryTab
            entries={entries}
            onDelete={handleDelete}
            onGoToRecord={goToRecord}
            accentColor={accentColor}
          />
        )}
      </div>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={3000}
        onClose={closeSnack}
        message={snack?.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default MoodPortalPage;
