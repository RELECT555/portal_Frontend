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
  Avatar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  SearchRounded,
  EditNoteRounded,
  NewspaperRounded,
  ThumbUpOutlined,
  VisibilityOutlined,
  ChatBubbleOutline,
  PushPin,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { useDebounce } from '@/hooks';
import { NewsCard } from './components/NewsCard';
import { MOCK_NEWS_ITEMS, NEWS_STATS } from './mockData';
import type { NewsCategory } from './types';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from './types';
import styles from './NewsPage.module.scss';

const CATEGORY_TABS: NewsCategory[] = [
  'all',
  'company',
  'hr',
  'it',
  'finance',
  'events',
  'announcements',
];

type SortOption = 'recent' | 'popular' | 'discussed';

const SORT_LABELS: Record<SortOption, string> = {
  recent: 'Новые',
  popular: 'Популярные',
  discussed: 'Обсуждаемые',
};

const getInitials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const formatCount = (count: number): string => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
};

const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
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

  const filteredNews = useMemo(() => {
    let result = [...MOCK_NEWS_ITEMS];

    if (activeCategory !== 'all') {
      result = result.filter((n) => n.category === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.authorName.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q)),
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

    const pinned = result.filter((n) => n.isPinned);
    const rest = result.filter((n) => !n.isPinned);

    return [...pinned, ...rest];
  }, [activeCategory, debouncedSearch, sortBy]);

  const mainNews = useMemo(() => filteredNews.find((n) => n.isMain), [filteredNews]);

  const sidebarNews = useMemo(
    () => filteredNews.filter((n) => n.isPinned && !n.isMain).slice(0, 3),
    [filteredNews],
  );

  const gridNews = useMemo(
    () =>
      filteredNews.filter((n) => n.id !== mainNews?.id && !sidebarNews.some((s) => s.id === n.id)),
    [filteredNews, mainNews, sidebarNews],
  );

  const categoryIndex = CATEGORY_TABS.indexOf(activeCategory);

  const getCategoryCount = useCallback((cat: NewsCategory): number => {
    if (cat === 'all') return MOCK_NEWS_ITEMS.length;
    return MOCK_NEWS_ITEMS.filter((n) => n.category === cat).length;
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
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
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
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.03),
          }}
        />

        <div className={styles.heroContent}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <NewspaperRounded sx={{ fontSize: 28, color: 'primary.main' }} />
            <Typography
              variant="h4"
              component="span"
              fontWeight={800}
              color="primary.main"
              sx={{ letterSpacing: '0.02em' }}
            >
              Новости
            </Typography>
          </Box>
          <h1 className={styles.heroTitle}>Будьте в курсе событий</h1>
          <p className={styles.heroSubtitle}>
            Актуальные новости компании, важные объявления и ключевые события. Оставайтесь на связи
            с жизнью организации.
          </p>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{NEWS_STATS.totalNews}</span>
            <span className={styles.heroStatLabel}>Новостей</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{NEWS_STATS.thisMonth}</span>
            <span className={styles.heroStatLabel}>За месяц</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{NEWS_STATS.totalAuthors}</span>
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
                  {NEWS_CATEGORY_LABELS[cat]}
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
          placeholder="Поиск новостей..."
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
          to={`${ROUTES.POST_CONSTRUCTOR}?type=news`}
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
          Создать новость
        </Button>
      </div>

      {/* Featured section */}
      {mainNews && activeCategory === 'all' && !debouncedSearch.trim() && (
        <>
          <div className={styles.featured}>
            {/* Main featured news */}
            <article className={styles.featuredMain}>
              <Box
                className={styles.featuredMainImage}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: '25%',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  }}
                />
                {mainNews.coverImageUrl ? (
                  <Box
                    component="img"
                    src={mainNews.coverImageUrl}
                    alt={mainNews.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      inset: 0,
                    }}
                  />
                ) : (
                  <NewspaperRounded
                    sx={{
                      fontSize: 56,
                      color: (theme) => alpha(theme.palette.primary.main, 0.2),
                    }}
                  />
                )}

                <div className={styles.featuredMainImageOverlay}>
                  <Chip
                    label="Главная новость"
                    size="small"
                    color="primary"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      height: 22,
                    }}
                  />
                  <span className={styles.cardCategoryBadge}>
                    {NEWS_CATEGORY_LABELS[mainNews.category]}
                  </span>
                </div>
              </Box>

              <div className={styles.featuredMainBody}>
                <h2 className={styles.featuredMainTitle}>{mainNews.title}</h2>
                <p className={styles.featuredMainContent}>{mainNews.content}</p>

                {mainNews.tags.length > 0 && (
                  <div className={styles.featuredMainTags}>
                    {mainNews.tags.map((tag) => (
                      <span key={tag} className={styles.featuredMainTag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.featuredMainFooter}>
                <div className={styles.cardAuthor}>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                      color: 'primary.main',
                    }}
                  >
                    {getInitials(mainNews.authorName)}
                  </Avatar>
                  <div>
                    <span className={styles.cardAuthorName}>{mainNews.authorName}</span>
                    <span className={styles.cardDate}>
                      {' · '}
                      {dayjs(mainNews.publishedAt).format('DD MMM YYYY')}
                    </span>
                  </div>
                </div>
                <div className={styles.cardStats}>
                  <span className={styles.cardStat}>
                    <ThumbUpOutlined sx={{ fontSize: 14 }} />
                    {formatCount(mainNews.likesCount)}
                  </span>
                  <span className={styles.cardStat}>
                    <VisibilityOutlined sx={{ fontSize: 14 }} />
                    {formatCount(mainNews.viewsCount)}
                  </span>
                  <span className={styles.cardStat}>
                    <ChatBubbleOutline sx={{ fontSize: 14 }} />
                    {formatCount(mainNews.commentsCount)}
                  </span>
                </div>
              </div>
            </article>

            {/* Sidebar pinned news */}
            <div className={styles.featuredSidebar}>
              {sidebarNews.map((item) => {
                const catColor =
                  item.category !== 'all'
                    ? (NEWS_CATEGORY_COLORS[item.category] ?? '#64748b')
                    : '#64748b';
                return (
                  <div key={item.id} className={styles.featuredSideCard}>
                    <Box
                      className={styles.featuredSideImage}
                      sx={{ bgcolor: alpha(catColor, 0.06) }}
                    >
                      <NewspaperRounded sx={{ fontSize: 28, color: alpha(catColor, 0.3) }} />
                    </Box>
                    <div className={styles.featuredSideBody}>
                      <Chip
                        label={NEWS_CATEGORY_LABELS[item.category]}
                        size="small"
                        sx={{
                          alignSelf: 'flex-start',
                          height: 18,
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          bgcolor: alpha(catColor, 0.08),
                          color: catColor,
                          '& .MuiChip-label': { px: 0.75 },
                        }}
                      />
                      <h4 className={styles.featuredSideTitle}>{item.title}</h4>
                      <div className={styles.featuredSideMeta}>
                        <span>{dayjs(item.publishedAt).format('DD MMM')}</span>
                        <span>·</span>
                        <span>
                          <ThumbUpOutlined
                            sx={{ fontSize: 11, mr: 0.25, verticalAlign: 'text-bottom' }}
                          />
                          {item.likesCount}
                        </span>
                        <span>·</span>
                        <span>
                          <VisibilityOutlined
                            sx={{ fontSize: 11, mr: 0.25, verticalAlign: 'text-bottom' }}
                          />
                          {item.viewsCount}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {sidebarNews.length === 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    py: 4,
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                  }}
                >
                  <PushPin sx={{ fontSize: 24, mb: 1, opacity: 0.3 }} />
                  Нет закреплённых новостей
                </Box>
              )}
            </div>
          </div>

          {/* Section divider */}
          <div className={styles.sectionDivider}>
            <div className={styles.sectionDividerLine} />
            <span className={styles.sectionDividerLabel}>Все новости</span>
            <div className={styles.sectionDividerLine} />
          </div>
        </>
      )}

      {/* News grid */}
      {gridNews.length > 0 ? (
        <div className={styles.grid}>
          {gridNews.map((item) => (
            <NewsCard key={item.id} item={item} />
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
            <NewspaperRounded sx={{ fontSize: 28, color: 'primary.main', opacity: 0.7 }} />
          </Box>
          <Typography variant="h4" fontWeight={600}>
            Новости не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
            Попробуйте изменить фильтры или поисковый запрос
          </Typography>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
