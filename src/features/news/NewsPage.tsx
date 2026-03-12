import React, { useState, useMemo, useCallback } from 'react';
import { ArticleRounded } from '@mui/icons-material';
import { useDebounce } from '@/hooks';
import { Breadcrumbs, PageHero, FilterToolbar, EmptyState } from '@/components/shared';
import { ROUTES } from '@/lib/constants';
import { NewsCard } from './components/NewsCard';
import { FeaturedSection } from './components/FeaturedSection';
import { MOCK_NEWS_ITEMS, NEWS_STATS } from './mockData';
import type { NewsCategory, SortOption } from './types';
import { NEWS_CATEGORY_LABELS, SORT_LABELS, SORT_OPTIONS, CATEGORY_TABS } from './types';
import styles from './NewsPage.module.scss';

const ACCENT = '#0d9488';

const HERO_STATS = [
  { value: NEWS_STATS.totalNews, label: 'новостей' },
  { value: NEWS_STATS.thisMonth, label: 'за месяц' },
  { value: NEWS_STATS.totalAuthors, label: 'авторов' },
];

const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const handleCategoryChange = useCallback((cat: string): void => {
    setActiveCategory(cat as NewsCategory);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: string): void => {
    setSortBy(option as SortOption);
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

  const showFeatured = Boolean(mainNews) && activeCategory === 'all' && !debouncedSearch.trim();

  return (
    <div
      className={styles.page}
      style={{ '--accent': ACCENT, '--accent-rgb': '13, 148, 136' } as React.CSSProperties}
    >
      <Breadcrumbs items={[{ label: 'Компания', to: ROUTES.COMPANY }, { label: 'Новости' }]} />

      <PageHero
        title="Новости"
        subtitle="Последние события, анонсы и важные объявления компании"
        stats={HERO_STATS}
      />

      <FilterToolbar
        activeCategory={activeCategory}
        sortBy={sortBy}
        searchQuery={searchQuery}
        searchPlaceholder="Поиск новости..."
        categoryLabel="Категория"
        categoryTabs={CATEGORY_TABS as string[]}
        categoryLabels={NEWS_CATEGORY_LABELS}
        sortOptions={SORT_OPTIONS as [string, string][]}
        sortLabels={SORT_LABELS}
        defaultSort="recent"
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        accentColor={ACCENT}
      />

      {showFeatured && mainNews && (
        <FeaturedSection mainNews={mainNews} sidebarNews={sidebarNews} />
      )}

      {gridNews.length > 0 ? (
        <div className={styles.grid}>
          {gridNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<ArticleRounded sx={{ fontSize: 24, color: ACCENT, opacity: 0.4 }} />}
          title="Новости не найдены"
        />
      )}
    </div>
  );
};

export default NewsPage;
