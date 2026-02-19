import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Box, TextField, InputAdornment, Typography, keyframes } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SearchRounded, EditNoteRounded, CampaignRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { ROUTES } from '@/lib/constants';
import { useDebounce } from '@/hooks';
import { LivePublicationCard } from './components/LivePublicationCard';
import { MOCK_LIVE_PUBLICATIONS, LIVE_STATS } from './mockData';
import type { LiveCategory } from './types';
import { LIVE_CATEGORY_LABELS } from './types';
import styles from './LivePage.module.scss';

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
`;

const CATEGORY_TABS: LiveCategory[] = [
  'all',
  'corporate',
  'sport',
  'creative',
  'volunteer',
  'events',
];

type SortOption = 'recent' | 'popular' | 'discussed';

const SORT_LABELS: Record<SortOption, string> = {
  recent: 'Новые',
  popular: 'Популярные',
  discussed: 'Обсуждаемые',
};

interface CategoryPillProps {
  category: LiveCategory;
  isActive: boolean;
  count: number;
  onClick: (cat: LiveCategory) => void;
}

const CategoryPill: React.FC<CategoryPillProps> = React.memo(
  ({ category, isActive, count, onClick }) => {
    const handleClick = useCallback((): void => {
      onClick(category);
    }, [onClick, category]);

    return (
      <button
        key={category}
        className={classnames(styles.categoryPill, { [styles.categoryPillActive]: isActive })}
        onClick={handleClick}
        type="button"
      >
        <span className={styles.categoryPillLabel}>{LIVE_CATEGORY_LABELS[category]}</span>
        <span
          className={classnames(styles.categoryPillCount, {
            [styles.categoryPillCountActive]: isActive,
          })}
        >
          {count}
        </span>
      </button>
    );
  },
);

interface SortButtonProps {
  sortKey: SortOption;
  label: string;
  isActive: boolean;
  onClick: (option: SortOption) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

const SortButton: React.FC<SortButtonProps> = React.memo(
  ({ sortKey, label, isActive, onClick, buttonRef }) => {
    const handleClick = useCallback((): void => {
      onClick(sortKey);
    }, [onClick, sortKey]);

    return (
      <button
        ref={buttonRef}
        className={classnames(styles.segmentedOption, {
          [styles.segmentedOptionActive]: isActive,
        })}
        onClick={handleClick}
        type="button"
      >
        {label}
      </button>
    );
  },
);

const LivePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<LiveCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const sortRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const segmentIndicatorRef = useRef<HTMLDivElement>(null);

  const updateSegmentIndicator = useCallback((): void => {
    const activeEl = sortRefs.current[sortBy];
    const indicator = segmentIndicatorRef.current;
    if (!activeEl || !indicator) return;

    const parent = activeEl.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    indicator.style.left = `${elRect.left - parentRect.left}px`;
    indicator.style.width = `${elRect.width}px`;
  }, [sortBy]);

  useEffect(() => {
    updateSegmentIndicator();
    window.addEventListener('resize', updateSegmentIndicator);
    return () => window.removeEventListener('resize', updateSegmentIndicator);
  }, [updateSegmentIndicator]);

  const handleCategoryChange = useCallback((cat: LiveCategory): void => {
    setActiveCategory(cat);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: SortOption): void => {
    setSortBy(option);
  }, []);

  const filteredPublications = useMemo(() => {
    let result = [...MOCK_LIVE_PUBLICATIONS];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.authorName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.viewsCount - a.viewsCount);
        break;
      case 'discussed':
        result.sort((a, b) => b.commentsCount - a.commentsCount);
        break;
      case 'recent':
      default:
        result.sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        );
    }

    const pinned = result.filter((p) => p.isPinned);
    const rest = result.filter((p) => !p.isPinned);

    return [...pinned, ...rest];
  }, [activeCategory, debouncedSearch, sortBy]);

  const getCategoryCount = useCallback((cat: LiveCategory): number => {
    if (cat === 'all') return MOCK_LIVE_PUBLICATIONS.length;
    return MOCK_LIVE_PUBLICATIONS.filter((p) => p.category === cat).length;
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero banner */}
      <div className={styles.hero}>
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.04),
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            left: '40%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
          }}
        />

        <div className={styles.heroContent}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: 'error.main',
                animation: `${pulse} 1.5s ease-in-out infinite`,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="h4"
              component="span"
              fontWeight={800}
              color="error.main"
              sx={{ letterSpacing: '0.05em' }}
            >
              LIVE
            </Typography>
          </Box>
          <h1 className={styles.heroTitle}>Наша жизнь в компании</h1>
          <p className={styles.heroSubtitle}>
            Публикации, события и активности сотрудников. Делитесь моментами и вдохновляйте коллег.
          </p>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{LIVE_STATS.totalPublications}</span>
            <span className={styles.heroStatLabel}>Публикаций</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{LIVE_STATS.thisMonth}</span>
            <span className={styles.heroStatLabel}>За месяц</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{LIVE_STATS.totalAuthors}</span>
            <span className={styles.heroStatLabel}>Авторов</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.categoryPills}>
          {CATEGORY_TABS.map((cat) => (
            <CategoryPill
              key={cat}
              category={cat}
              isActive={cat === activeCategory}
              count={getCategoryCount(cat)}
              onClick={handleCategoryChange}
            />
          ))}
        </div>

        <div className={styles.toolbarSpacer} />

        {/* macOS segmented control */}
        <div className={styles.segmentedControl}>
          <div className={styles.segmentedIndicator} ref={segmentIndicatorRef} />
          {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([key, label]) => (
            <SortButton
              key={key}
              sortKey={key}
              label={label}
              isActive={sortBy === key}
              onClick={handleSortChange}
              buttonRef={(el) => {
                sortRefs.current[key] = el;
              }}
            />
          ))}
        </div>

        <TextField
          className={styles.searchField}
          size="small"
          placeholder="Поиск публикаций..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '10px',
              bgcolor: 'background.paper',
              fontSize: '0.8125rem',
              '& fieldset': { borderColor: 'divider' },
              '&:hover fieldset': { borderColor: 'primary.light' },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                boxShadow: (theme) => `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`,
              },
            },
          }}
        />

        <Link to={ROUTES.POST_CONSTRUCTOR} className={styles.publishButton}>
          <span className={styles.publishButtonInner}>
            <EditNoteRounded sx={{ fontSize: 16 }} />
            Публикация
          </span>
        </Link>
      </div>

      {/* Publications grid */}
      {filteredPublications.length > 0 ? (
        <div className={styles.grid}>
          {filteredPublications.map((pub) => (
            <LivePublicationCard key={pub.id} publication={pub} isPinnedLayout={pub.isPinned} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Box
            className={styles.emptyIcon}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
            }}
          >
            <CampaignRounded sx={{ fontSize: 28, color: 'primary.main', opacity: 0.7 }} />
          </Box>
          <Typography variant="h4" fontWeight={600}>
            Публикации не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
            Попробуйте изменить фильтры или поисковый запрос
          </Typography>
        </div>
      )}
    </div>
  );
};

export default LivePage;
