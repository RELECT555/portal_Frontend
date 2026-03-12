import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, KeyboardArrowDown, Check as CheckIcon } from '@mui/icons-material';
import { CATEGORY_TABS, MERCH_CATEGORY_LABELS, MERCH_CATEGORY_ICONS, SORT_OPTIONS } from '../types';
import type { MerchCategory, MerchSortOption } from '../types';
import styles from '../MerchShopPage.module.scss';

interface Props {
  activeCategory: MerchCategory;
  sortBy: MerchSortOption;
  searchQuery: string;
  onCategoryChange: (cat: MerchCategory) => void;
  onSortChange: (option: MerchSortOption) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MerchToolbar: React.FC<Props> = React.memo(
  ({ activeCategory, sortBy, searchQuery, onCategoryChange, onSortChange, onSearchChange }) => {
    const [sortOpen, setSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const handleToggleSort = useCallback((): void => setSortOpen((p) => !p), []);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
      <div className={styles.toolbar}>
        {CATEGORY_TABS.map((cat) => {
          const isActive = activeCategory === cat;
          const emoji = cat !== 'all' ? MERCH_CATEGORY_ICONS[cat] : undefined;

          return (
            <button
              key={cat}
              className={`${styles.categoryPill} ${isActive ? styles.categoryPillActive : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {emoji && <span className={styles.categoryEmoji}>{emoji}</span>}
              {MERCH_CATEGORY_LABELS[cat]}
            </button>
          );
        })}

        <div className={styles.toolbarSpacer} />

        <div className={styles.filterDropdownWrap} ref={sortRef}>
          <button className={styles.sortBtn} onClick={handleToggleSort}>
            Сортировка
            <KeyboardArrowDown
              className={`${styles.sortBtnIcon} ${sortOpen ? styles.sortBtnIconOpen : ''}`}
            />
          </button>

          {sortOpen && (
            <div className={styles.filterDropdown}>
              {SORT_OPTIONS.map(([key, label]) => (
                <button
                  key={key}
                  className={`${styles.filterDropdownItem} ${sortBy === key ? styles.filterDropdownItemActive : ''}`}
                  onClick={() => {
                    onSortChange(key);
                    setSortOpen(false);
                  }}
                >
                  {label}
                  {sortBy === key && <CheckIcon className={styles.filterDropdownCheck} />}
                </button>
              ))}
            </div>
          )}
        </div>

        <TextField
          size="small"
          placeholder="// поиск товаров…"
          value={searchQuery}
          onChange={onSearchChange}
          className={styles.searchField}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, opacity: 0.3, color: '#00fff1' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontFamily: '"JetBrains Mono", monospace',
                color: '#e0e7ff',
                bgcolor: 'rgba(255,255,255,0.03)',
                '& fieldset': { borderColor: 'rgba(0, 255, 241, 0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(0, 255, 241, 0.2) !important' },
                '&.Mui-focused fieldset': {
                  borderColor: '#00fff1 !important',
                  boxShadow: '0 0 12px rgba(0, 255, 241, 0.15)',
                },
                '& input': { color: '#e0e7ff' },
                '& input::placeholder': { color: 'rgba(224, 231, 255, 0.3)', opacity: 1 },
              },
            },
          }}
        />
      </div>
    );
  },
);

MerchToolbar.displayName = 'MerchToolbar';
