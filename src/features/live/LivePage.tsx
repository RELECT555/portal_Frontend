import React, { useState, useMemo, useCallback } from 'react';
import { CampaignRounded } from '@mui/icons-material';
import { useDebounce } from '@/hooks';
import { Breadcrumbs, PageHero, FilterToolbar, EmptyState } from '@/components/shared';
import { ROUTES } from '@/lib/constants';
import { LivePublicationCard } from './components/LivePublicationCard';
import { MOCK_LIVE_PUBLICATIONS, LIVE_STATS } from './mockData';
import type { LiveCategory, SortOption } from './types';
import { LIVE_CATEGORY_LABELS, SORT_LABELS, SORT_OPTIONS, CATEGORY_TABS } from './types';
import styles from './LivePage.module.scss';

const ACCENT = '#ec4899';

const HERO_STATS = [
  { value: LIVE_STATS.totalPublications, label: 'публикаций' },
  { value: LIVE_STATS.thisMonth, label: 'за месяц' },
  { value: LIVE_STATS.totalAuthors, label: 'авторов' },
];

const LivePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<LiveCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const handleCategoryChange = useCallback((cat: string): void => {
    setActiveCategory(cat as LiveCategory);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: string): void => {
    setSortBy(option as SortOption);
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

  return (
    <div
      className={styles.page}
      style={{ '--accent': ACCENT, '--accent-rgb': '236, 72, 153' } as React.CSSProperties}
    >
      <Breadcrumbs
        items={[{ label: 'Корпоративная культура', to: ROUTES.CULTURE }, { label: 'Лайв' }]}
      />

      <PageHero
        title="Лайв"
        subtitle="Жизнь компании глазами сотрудников — события, спорт и творчество"
        stats={HERO_STATS}
      />

      <FilterToolbar
        activeCategory={activeCategory}
        sortBy={sortBy}
        searchQuery={searchQuery}
        searchPlaceholder="Поиск публикации..."
        categoryLabel="Категория"
        categoryTabs={CATEGORY_TABS as string[]}
        categoryLabels={LIVE_CATEGORY_LABELS}
        sortOptions={SORT_OPTIONS as [string, string][]}
        sortLabels={SORT_LABELS}
        defaultSort="recent"
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        accentColor={ACCENT}
      />

      {filteredPublications.length > 0 ? (
        <div className={styles.grid}>
          {filteredPublications.map((pub) => (
            <LivePublicationCard key={pub.id} publication={pub} isPinnedLayout={pub.isPinned} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<CampaignRounded sx={{ fontSize: 24, color: ACCENT, opacity: 0.4 }} />}
          title="Публикации не найдены"
        />
      )}
    </div>
  );
};

export default LivePage;
