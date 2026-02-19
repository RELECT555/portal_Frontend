import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  Tabs,
  Tab,
  Chip,
  TextField,
  InputAdornment,
  Typography,
  keyframes,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SearchRounded, EditNoteRounded, CampaignRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
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

const LivePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<LiveCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const handleCategoryChange = useCallback((_: React.SyntheticEvent, value: number): void => {
    setActiveCategory(CATEGORY_TABS[value]);
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

  const categoryIndex = CATEGORY_TABS.indexOf(activeCategory);

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
        <Tabs
          value={categoryIndex}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              minHeight: 40,
              borderRadius: '10px',
              mx: 0.25,
              px: 1.5,
              transition: 'background 0.15s',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              },
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          {CATEGORY_TABS.map((cat) => (
            <Tab
              key={cat}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  {LIVE_CATEGORY_LABELS[cat]}
                  <Chip
                    label={getCategoryCount(cat)}
                    size="small"
                    sx={{
                      height: 18,
                      minWidth: 18,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      bgcolor: (theme) =>
                        cat === activeCategory
                          ? alpha(theme.palette.primary.main, 0.1)
                          : 'rgba(0,0,0,0.05)',
                      color: cat === activeCategory ? 'primary.main' : 'text.secondary',
                      '& .MuiChip-label': { px: 0.5 },
                    }}
                  />
                </Box>
              }
            />
          ))}
        </Tabs>

        <div className={styles.toolbarSpacer} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              size="small"
              variant={sortBy === key ? 'filled' : 'outlined'}
              color={sortBy === key ? 'primary' : 'default'}
              onClick={() => handleSortChange(key)}
              sx={{
                fontWeight: 600,
                fontSize: '0.7rem',
                cursor: 'pointer',
                borderColor: sortBy === key ? undefined : 'divider',
              }}
            />
          ))}
        </Box>

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
              borderRadius: '12px',
              bgcolor: '#f8fafb',
              fontSize: '0.8125rem',
              '& fieldset': { borderColor: 'divider' },
            },
          }}
        />

        <Button
          component={Link}
          to={ROUTES.POST_CONSTRUCTOR}
          variant="contained"
          color="primary"
          startIcon={<EditNoteRounded sx={{ fontSize: 18 }} />}
          sx={{
            borderRadius: '12px',
            px: 2.5,
            fontWeight: 600,
            fontSize: '0.8125rem',
            flexShrink: 0,
          }}
        >
          Публикация
        </Button>
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
