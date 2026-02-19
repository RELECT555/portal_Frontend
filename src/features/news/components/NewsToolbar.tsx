import React, { useMemo, useState, useRef, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { SearchRounded, AddRounded, TuneRounded, CheckRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import type { NewsCategory, SortOption } from '../types';
import { NEWS_CATEGORY_LABELS, SORT_LABELS, SORT_OPTIONS, CATEGORY_TABS } from '../types';
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
  borderRadius: '20px',
  bgcolor: 'rgba(0,0,0,0.04)',
  fontSize: '0.8125rem',
  height: 36,
  '& fieldset': { border: 'none' },
  '&:focus-within': {
    bgcolor: 'rgba(255,255,255,0.7)',
    boxShadow: '0 0 0 3px rgba(13, 148, 136, 0.08), 0 2px 8px rgba(13, 148, 136, 0.06)',
    border: '1px solid rgba(13, 148, 136, 0.35)',
  },
  transition: 'all 0.25s ease',
} as const;

export const NewsToolbar: React.FC<Props> = React.memo(
  ({ activeCategory, sortBy, searchQuery, onCategoryChange, onSortChange, onSearchChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const hasActiveFilters = activeCategory !== 'all' || sortBy !== 'recent';

    const categoryCounts = useMemo(() => {
      const counts = new Map<NewsCategory, number>();
      counts.set('all', MOCK_NEWS_ITEMS.length);
      for (const item of MOCK_NEWS_ITEMS) {
        counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
      }
      return counts;
    }, []);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setDropdownOpen(false);
        }
      };
      if (dropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);

    return (
      <div className={styles.toolbar}>
        {/* Кнопка фильтров с дропдауном */}
        <div className={styles.filterDropdownWrap} ref={dropdownRef}>
          <button
            type="button"
            className={`${styles.filterBtn} ${hasActiveFilters ? styles.filterBtnActive : ''}`}
            onClick={() => setDropdownOpen((v) => !v)}
          >
            <TuneRounded
              className={`${styles.filterBtnIcon} ${dropdownOpen ? styles.filterBtnIconOpen : ''}`}
            />
            Фильтры
            {hasActiveFilters && <span className={styles.filterDot} />}
          </button>

          {dropdownOpen && (
            <div className={styles.filterDropdown}>
              {/* Категории */}
              <div className={styles.filterSection}>
                <div className={styles.filterSectionLabel}>Категория</div>
                {CATEGORY_TABS.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles.filterDropdownItem} ${isActive ? styles.filterDropdownItemActive : ''}`}
                      onClick={() => {
                        onCategoryChange(cat);
                        if (sortBy === 'recent') setDropdownOpen(false);
                      }}
                    >
                      <span className={styles.filterDropdownItemLabel}>
                        {NEWS_CATEGORY_LABELS[cat]}
                        <span className={styles.filterDropdownCount}>
                          {categoryCounts.get(cat) ?? 0}
                        </span>
                      </span>
                      {isActive && <CheckRounded className={styles.filterDropdownCheck} />}
                    </button>
                  );
                })}
              </div>

              <div className={styles.filterDivider} />

              {/* Сортировка */}
              <div className={styles.filterSection}>
                <div className={styles.filterSectionLabel}>Сортировка</div>
                {SORT_OPTIONS.map(([key, label]) => {
                  const isActive = sortBy === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`${styles.filterDropdownItem} ${isActive ? styles.filterDropdownItemActive : ''}`}
                      onClick={() => {
                        onSortChange(key);
                        setDropdownOpen(false);
                      }}
                    >
                      <span>{label}</span>
                      {isActive && <CheckRounded className={styles.filterDropdownCheck} />}
                    </button>
                  );
                })}
              </div>

              {hasActiveFilters && (
                <>
                  <div className={styles.filterDivider} />
                  <button
                    type="button"
                    className={styles.filterResetBtn}
                    onClick={() => {
                      onCategoryChange('all');
                      onSortChange('recent');
                      setDropdownOpen(false);
                    }}
                  >
                    Сбросить фильтры
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Активная категория как пилюля (если не "Все") */}
        {activeCategory !== 'all' && (
          <span className={styles.activeCategoryPill}>
            {NEWS_CATEGORY_LABELS[activeCategory]}
            <button
              type="button"
              className={styles.activeCategoryClose}
              onClick={() => onCategoryChange('all')}
              aria-label="Сбросить категорию"
            >
              ×
            </button>
          </span>
        )}

        {/* Активная сортировка как пилюля (если не "Новые") */}
        {sortBy !== 'recent' && (
          <span className={styles.activeCategoryPill}>
            {SORT_LABELS[sortBy]}
            <button
              type="button"
              className={styles.activeCategoryClose}
              onClick={() => onSortChange('recent')}
              aria-label="Сбросить сортировку"
            >
              ×
            </button>
          </span>
        )}

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

        <div className={styles.toolbarSpacer} />

        <Link to={`${ROUTES.POST_CONSTRUCTOR}?type=news`} className={styles.createButton}>
          <AddRounded sx={{ fontSize: 15 }} />
          Новость
        </Link>
      </div>
    );
  },
);
