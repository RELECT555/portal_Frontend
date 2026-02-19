import React, { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '@/hooks';
import { NewsCard } from './components/NewsCard';
import { HeroSection } from './components/HeroSection';
import { NewsToolbar } from './components/NewsToolbar';
import { FeaturedSection } from './components/FeaturedSection';
import { NewsEmptyState } from './components/NewsEmptyState';
import { MOCK_NEWS_ITEMS, NEWS_STATS } from './mockData';
import type { NewsCategory, SortOption } from './types';
import styles from './NewsPage.module.scss';

const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const handleCategoryChange = useCallback((cat: NewsCategory): void => {
    setActiveCategory(cat);
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

  const showFeatured = Boolean(mainNews) && activeCategory === 'all' && !debouncedSearch.trim();

  return (
    <div className={styles.page}>
      <HeroSection stats={NEWS_STATS} />

      <NewsToolbar
        activeCategory={activeCategory}
        sortBy={sortBy}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
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
        <NewsEmptyState />
      )}
    </div>
  );
};

export default NewsPage;
