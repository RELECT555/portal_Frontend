import React, { useState, useMemo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { CampaignRounded } from '@mui/icons-material';
import { useDebounce } from '@/hooks';
import { LivePublicationCard } from './components/LivePublicationCard';
import { HeroSection } from './components/HeroSection';
import { LiveToolbar } from './components/LiveToolbar';
import { MOCK_LIVE_PUBLICATIONS, LIVE_STATS } from './mockData';
import type { LiveCategory, SortOption } from './types';
import styles from './LivePage.module.scss';

const LivePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<LiveCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

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

  return (
    <div className={styles.page}>
      <HeroSection stats={LIVE_STATS} />

      <LiveToolbar
        activeCategory={activeCategory}
        sortBy={sortBy}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
      />

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
