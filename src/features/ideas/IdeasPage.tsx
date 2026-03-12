import React, { useState, useMemo, useCallback } from 'react';
import { TextField, Snackbar, Button } from '@mui/material';
import {
  SendRounded,
  CloseRounded,
  CheckRounded,
  AddRounded,
  LightbulbRounded,
} from '@mui/icons-material';
import { useDebounce } from '@/hooks';
import { Breadcrumbs, PageHero, FilterToolbar, EmptyState } from '@/components/shared';
import { ROUTES } from '@/lib/constants';
import { IdeaCard } from './components/IdeaCard';
import { MOCK_IDEAS, IDEAS_STATS } from './mockData';
import {
  useIdeas,
  useIdeasStats,
  useCreateIdea,
  useUpdateIdeaStatus,
  useVoteIdea,
  useRemoveVoteIdea,
} from './hooks';
import type { IdeaCategory, IdeaSortOption, IdeaStatus } from './types';
import {
  IDEA_CATEGORY_LABELS,
  IDEA_CATEGORY_EMOJI,
  IDEA_CATEGORY_COLORS,
  CATEGORY_TABS,
  SORT_OPTIONS,
  SORT_LABELS,
  PRESET_TAGS,
} from './types';
import styles from './IdeasPage.module.scss';

const ACCENT = '#6366f1';

const CATEGORY_OPTIONS: Array<Exclude<IdeaCategory, 'all'>> = [
  'process',
  'product',
  'culture',
  'tech',
  'other',
];

const IdeasPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<IdeaCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<IdeaSortOption>('recent');
  const [createOpen, setCreateOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createCategory, setCreateCategory] = useState<Exclude<IdeaCategory, 'all'> | null>(null);
  const [createTags, setCreateTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [snack, setSnack] = useState<{ message: string } | null>(null);

  const apiParams = useMemo(
    () => ({ category: activeCategory !== 'all' ? activeCategory : undefined, limit: 200 }),
    [activeCategory],
  );
  const { data: apiData, isError: ideasError } = useIdeas(apiParams);
  const { data: apiStats, isError: statsError } = useIdeasStats();

  const createIdea = useCreateIdea();
  const updateStatus = useUpdateIdeaStatus();
  const voteIdea = useVoteIdea();
  const removeVoteIdea = useRemoveVoteIdea();

  const ideas = useMemo(() => {
    const list = ideasError || !apiData?.data ? MOCK_IDEAS : apiData.data;
    let result = [...list];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (idea) =>
          idea.title.toLowerCase().includes(q) ||
          idea.description.toLowerCase().includes(q) ||
          idea.authorName.toLowerCase().includes(q) ||
          idea.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.votesCount - a.votesCount);
        break;
      case 'discussed':
        result.sort((a, b) => b.commentsCount - a.commentsCount);
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [apiData, ideasError, debouncedSearch, sortBy]);

  const stats = useMemo(
    () => (statsError || !apiStats ? IDEAS_STATS : apiStats),
    [apiStats, statsError],
  );

  const heroStats = useMemo(
    () => [
      { value: stats.totalIdeas, label: 'идей' },
      { value: stats.implemented, label: 'реализовано' },
      { value: stats.inReview, label: 'на рассмотрении' },
    ],
    [stats],
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set('all', ideas.length);
    for (const idea of ideas) {
      counts.set(idea.category, (counts.get(idea.category) ?? 0) + 1);
    }
    CATEGORY_TABS.forEach((cat) => {
      if (!counts.has(cat)) counts.set(cat, 0);
    });
    return counts;
  }, [ideas]);

  const handleCategoryChange = useCallback((cat: string): void => {
    setActiveCategory(cat as IdeaCategory);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: string): void => {
    setSortBy(option as IdeaSortOption);
  }, []);

  const handleVote = useCallback(
    (id: string) => {
      const idea = ideas.find((i) => i.id === id);
      if (idea?.hasVoted) {
        removeVoteIdea.mutate(id, {
          onError: () => setSnack({ message: 'Не удалось снять голос' }),
        });
      } else {
        voteIdea.mutate(id, {
          onError: () => setSnack({ message: 'Не удалось проголосовать' }),
        });
      }
    },
    [ideas, voteIdea, removeVoteIdea],
  );

  const handleStatusChange = useCallback(
    (id: string, status: IdeaStatus) => {
      updateStatus.mutate(
        { id, payload: { status } },
        {
          onSuccess: () => setSnack({ message: 'Статус обновлён' }),
          onError: () => setSnack({ message: 'Не удалось изменить статус' }),
        },
      );
    },
    [updateStatus],
  );

  const toggleTag = useCallback((tag: string) => {
    setCreateTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  const addCustomTag = useCallback(() => {
    const val = customTagInput.trim().toLowerCase();
    if (val && !createTags.includes(val)) {
      setCreateTags((prev) => [...prev, val]);
    }
    setCustomTagInput('');
  }, [customTagInput, createTags]);

  const handleCustomTagKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addCustomTag();
      }
    },
    [addCustomTag],
  );

  const openCreate = (): void => {
    setCreateTitle('');
    setCreateDescription('');
    setCreateCategory(null);
    setCreateTags([]);
    setCustomTagInput('');
    setCreateOpen(true);
  };

  const closeCreate = (): void => setCreateOpen(false);

  const submitCreate = (): void => {
    if (!createTitle.trim() || !createDescription.trim()) {
      setSnack({ message: 'Заполните заголовок и описание' });
      return;
    }
    createIdea.mutate(
      {
        title: createTitle.trim(),
        description: createDescription.trim(),
        category: createCategory ?? 'other',
        tags: createTags,
      },
      {
        onSuccess: () => {
          closeCreate();
          setSnack({ message: 'Идея отправлена' });
        },
        onError: () => setSnack({ message: 'Не удалось создать идею' }),
      },
    );
  };

  const createButton = (
    <Button
      variant="contained"
      size="small"
      startIcon={<AddRounded />}
      onClick={openCreate}
      sx={{
        fontWeight: 600,
        borderRadius: 2,
        textTransform: 'none',
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.35)',
        flexShrink: 0,
      }}
    >
      Предложить идею
    </Button>
  );

  return (
    <div
      className={styles.page}
      style={{ '--accent': ACCENT, '--accent-rgb': '99, 102, 241' } as React.CSSProperties}
    >
      <Breadcrumbs
        items={[{ label: 'Корпоративная культура', to: ROUTES.CULTURE }, { label: 'Банк идей' }]}
      />

      <PageHero
        title="Банк идей"
        subtitle="Предлагайте идеи по улучшению работы компании"
        stats={heroStats}
      />

      <FilterToolbar
        activeCategory={activeCategory}
        sortBy={sortBy}
        searchQuery={searchQuery}
        searchPlaceholder="Поиск идеи..."
        categoryLabel="Категория"
        categoryTabs={CATEGORY_TABS as string[]}
        categoryLabels={IDEA_CATEGORY_LABELS}
        categoryCounts={categoryCounts}
        sortOptions={SORT_OPTIONS as [string, string][]}
        sortLabels={SORT_LABELS}
        defaultSort="recent"
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        accentColor={ACCENT}
        rightSlot={createButton}
      />

      {ideas.length > 0 ? (
        <div className={styles.grid}>
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onVote={handleVote}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<LightbulbRounded sx={{ fontSize: 24, color: ACCENT, opacity: 0.4 }} />}
          title="Идеи не найдены"
        />
      )}

      {createOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => e.target === e.currentTarget && closeCreate()}
        >
          <div className={styles.modalPanel}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalHeaderIcon}>💡</div>
                <div>
                  <h2 className={styles.modalTitle}>Предложить идею</h2>
                  <p className={styles.modalSubtitle}>
                    Любая идея может изменить компанию к лучшему ✨
                  </p>
                </div>
              </div>
              <button
                type="button"
                className={styles.modalClose}
                onClick={closeCreate}
                aria-label="Закрыть"
              >
                <CloseRounded sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div>
                <div className={styles.modalStepLabel}>
                  <span className={styles.modalStepNumber}>1</span>
                  <span className={styles.modalStepText}>Опишите идею</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <TextField
                    placeholder="Кратко сформулируйте суть идеи..."
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    fullWidth
                    size="small"
                    slotProps={{
                      input: {
                        sx: {
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
                        },
                      },
                    }}
                  />
                  <TextField
                    placeholder="Подробнее: что, зачем и как можно реализовать..."
                    value={createDescription}
                    onChange={(e) => setCreateDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    slotProps={{
                      input: {
                        sx: {
                          borderRadius: '12px',
                          fontSize: '0.8125rem',
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div>
                <div className={styles.modalStepLabel}>
                  <span className={styles.modalStepNumber}>2</span>
                  <span className={styles.modalStepText}>Выберите категорию</span>
                </div>
                <div className={styles.categoryGrid}>
                  {CATEGORY_OPTIONS.map((cat) => {
                    const isSelected = createCategory === cat;
                    const color = IDEA_CATEGORY_COLORS[cat];
                    return (
                      <button
                        key={cat}
                        type="button"
                        className={`${styles.categoryCard} ${isSelected ? styles.categoryCardSelected : ''}`}
                        style={
                          {
                            '--cat-color': color,
                            '--cat-bg': `${color}0F`,
                            '--cat-bg-hover': `${color}1A`,
                            '--cat-shadow': `${color}22`,
                          } as React.CSSProperties
                        }
                        onClick={() => setCreateCategory(isSelected ? null : cat)}
                      >
                        {isSelected && (
                          <span className={styles.categoryCardCheck}>
                            <CheckRounded sx={{ fontSize: 10, color: '#fff' }} />
                          </span>
                        )}
                        <span className={styles.categoryCardEmoji}>{IDEA_CATEGORY_EMOJI[cat]}</span>
                        <span className={styles.categoryCardLabel}>
                          {IDEA_CATEGORY_LABELS[cat]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className={styles.modalStepLabel}>
                  <span className={styles.modalStepNumber}>3</span>
                  <span className={styles.modalStepText}>Добавьте теги</span>
                </div>
                <div className={styles.tagsSection}>
                  <span className={styles.tagsSectionHint}>
                    Выберите подходящие или добавьте свои
                  </span>
                  <div className={styles.tagsCloud}>
                    {PRESET_TAGS.map((tag) => {
                      const isSelected = createTags.includes(tag.label);
                      return (
                        <button
                          key={tag.label}
                          type="button"
                          className={`${styles.tagChip} ${isSelected ? styles.tagChipSelected : ''}`}
                          onClick={() => toggleTag(tag.label)}
                        >
                          <span className={styles.tagChipEmoji}>{tag.emoji}</span>
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>

                  <TextField
                    className={styles.tagsCustomInput}
                    placeholder="Свой тег... нажмите Enter"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={handleCustomTagKeyDown}
                    onBlur={addCustomTag}
                    fullWidth
                    size="small"
                    slotProps={{
                      input: {
                        sx: {
                          borderRadius: '12px',
                          fontSize: '0.8125rem',
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.06)' },
                        },
                      },
                    }}
                  />

                  {createTags.length > 0 && (
                    <div className={styles.selectedTagsList}>
                      {createTags.map((tag) => {
                        const preset = PRESET_TAGS.find((p) => p.label === tag);
                        return (
                          <span key={tag} className={styles.selectedTag}>
                            {preset ? preset.emoji : '🏷️'} {tag}
                            <button
                              type="button"
                              className={styles.selectedTagRemove}
                              onClick={() => toggleTag(tag)}
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <span className={styles.modalFooterHint}>
                {createTitle.trim() && createDescription.trim()
                  ? '✅ Готово к отправке'
                  : 'Заполните заголовок и описание'}
              </span>
              <div className={styles.modalFooterActions}>
                <button type="button" className={styles.modalCancelBtn} onClick={closeCreate}>
                  Отмена
                </button>
                <button
                  type="button"
                  className={styles.modalSubmitBtn}
                  onClick={submitCreate}
                  disabled={
                    createIdea.isPending || !createTitle.trim() || !createDescription.trim()
                  }
                >
                  {createIdea.isPending ? 'Отправка…' : 'Отправить'}
                  <SendRounded sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={4000}
        onClose={() => setSnack(null)}
        message={snack?.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default IdeasPage;
