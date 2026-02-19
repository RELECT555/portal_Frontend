import React, { useMemo } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { SearchRounded, AddRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import type { NewsCategory, SortOption } from '../types';
import { NEWS_CATEGORY_LABELS, SORT_OPTIONS, CATEGORY_TABS } from '../types';
import { MOCK_NEWS_ITEMS } from '../mockData';
import styles from '../NewsPage.module.scss';

interface Props {
  activeCategory: NewsCategory;
  sortBy: SortOption;
  searchQuery: string;
  onCategoryChange: (cat: NewsCategory) => void;
  onSortChange: (option: SortOption) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SEARCH_SX = {
  borderRadius: '8px',
  bgcolor: 'rgba(0,0,0,0.04)',
  fontSize: '0.8125rem',
  height: 32,
  '& fieldset': { border: 'none' },
  '&:focus-within': {
    bgcolor: 'rgba(0,0,0,0.02)',
    boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.15)',
  },
  transition: 'all 0.2s ease',
} as const;

export const NewsToolbar: React.FC<Props> = React.memo(
  ({ activeCategory, sortBy, searchQuery, onCategoryChange, onSortChange, onSearchChange }) => {
    const categoryCounts = useMemo(() => {
      const counts = new Map<NewsCategory, number>();
      counts.set('all', MOCK_NEWS_ITEMS.length);
      for (const item of MOCK_NEWS_ITEMS) {
        counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
      }
      return counts;
    }, []);

    return (
      <div className={styles.toolbar}>
        <div className={styles.segmentedControl}>
          {CATEGORY_TABS.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`${styles.segmentedItem} ${isActive ? styles.segmentedItemActive : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                {NEWS_CATEGORY_LABELS[cat]}
                <span
                  className={`${styles.segmentedCount} ${isActive ? styles.segmentedCountActive : ''}`}
                >
                  {categoryCounts.get(cat) ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.sortGroup}>
          {SORT_OPTIONS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`${styles.sortPill} ${sortBy === key ? styles.sortPillActive : ''}`}
              onClick={() => onSortChange(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.toolbarSpacer} />

        <TextField
          className={styles.searchField}
          size="small"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ fontSize: 15, color: 'text.secondary', opacity: 0.6 }} />
              </InputAdornment>
            ),
            sx: SEARCH_SX,
          }}
        />

        <Link to={`${ROUTES.POST_CONSTRUCTOR}?type=news`} className={styles.createButton}>
          <AddRounded sx={{ fontSize: 15 }} />
          Новость
        </Link>
      </div>
    );
  },
);
