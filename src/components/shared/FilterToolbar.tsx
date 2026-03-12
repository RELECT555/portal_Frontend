import React, { useMemo, useState, useRef, useCallback } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { SearchRounded, TuneRounded, CheckRounded } from '@mui/icons-material';
import { useClickOutside } from '@/hooks';
import styles from './SharedPage.module.scss';

interface FilterToolbarProps {
  activeCategory: string;
  sortBy: string;
  searchQuery: string;
  searchPlaceholder: string;
  categoryLabel: string;
  categoryTabs: string[];
  categoryLabels: Record<string, string>;
  categoryCounts?: Map<string, number>;
  sortOptions: [string, string][];
  sortLabels: Record<string, string>;
  defaultCategory?: string;
  defaultSort: string;
  onCategoryChange: (cat: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightSlot?: React.ReactNode;
  accentColor?: string;
}

const buildSearchSx = (r: number, g: number, b: number) =>
  ({
    borderRadius: '20px',
    bgcolor: 'rgba(0,0,0,0.04)',
    fontSize: '0.8125rem',
    height: 36,
    '& fieldset': { border: 'none' },
    '&:focus-within': {
      bgcolor: 'rgba(255,255,255,0.7)',
      boxShadow: `0 0 0 3px rgba(${r}, ${g}, ${b}, 0.08), 0 2px 8px rgba(${r}, ${g}, ${b}, 0.06)`,
      border: `1px solid rgba(${r}, ${g}, ${b}, 0.35)`,
    },
    transition: 'all 0.25s ease',
  }) as const;

const DEFAULT_SEARCH_SX = buildSearchSx(99, 102, 241);

export const FilterToolbar: React.FC<FilterToolbarProps> = React.memo(
  ({
    activeCategory,
    sortBy,
    searchQuery,
    searchPlaceholder,
    categoryLabel,
    categoryTabs,
    categoryLabels,
    categoryCounts,
    sortOptions,
    sortLabels,
    defaultCategory = 'all',
    defaultSort,
    onCategoryChange,
    onSortChange,
    onSearchChange,
    rightSlot,
    accentColor,
  }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const closeDropdown = useCallback(() => setDropdownOpen(false), []);
    useClickOutside(dropdownRef, closeDropdown, dropdownOpen);

    const hasActiveFilters = activeCategory !== defaultCategory || sortBy !== defaultSort;

    const searchSx = useMemo(() => {
      if (!accentColor) return DEFAULT_SEARCH_SX;
      const match = accentColor.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (!match) return DEFAULT_SEARCH_SX;
      return buildSearchSx(parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16));
    }, [accentColor]);

    return (
      <div className={styles.toolbar}>
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
              <div className={styles.filterSection}>
                <div className={styles.filterSectionLabel}>{categoryLabel}</div>
                {categoryTabs.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles.filterDropdownItem} ${isActive ? styles.filterDropdownItemActive : ''}`}
                      onClick={() => {
                        onCategoryChange(cat);
                        if (sortBy === defaultSort) setDropdownOpen(false);
                      }}
                    >
                      <span className={styles.filterDropdownItemLabel}>
                        {categoryLabels[cat]}
                        {categoryCounts && (
                          <span className={styles.filterDropdownCount}>
                            {categoryCounts.get(cat) ?? 0}
                          </span>
                        )}
                      </span>
                      {isActive && <CheckRounded className={styles.filterDropdownCheck} />}
                    </button>
                  );
                })}
              </div>

              <div className={styles.filterDivider} />

              <div className={styles.filterSection}>
                <div className={styles.filterSectionLabel}>Сортировка</div>
                {sortOptions.map(([key, label]) => {
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
                      onCategoryChange(defaultCategory);
                      onSortChange(defaultSort);
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

        {activeCategory !== defaultCategory && (
          <span className={styles.activeCategoryPill}>
            {categoryLabels[activeCategory]}
            <button
              type="button"
              className={styles.activeCategoryClose}
              onClick={() => onCategoryChange(defaultCategory)}
              aria-label="Сбросить категорию"
            >
              ×
            </button>
          </span>
        )}

        {sortBy !== defaultSort && (
          <span className={styles.activeCategoryPill}>
            {sortLabels[sortBy]}
            <button
              type="button"
              className={styles.activeCategoryClose}
              onClick={() => onSortChange(defaultSort)}
              aria-label="Сбросить сортировку"
            >
              ×
            </button>
          </span>
        )}

        <TextField
          className={styles.searchField}
          size="small"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ fontSize: 15, color: 'text.secondary', opacity: 0.6 }} />
              </InputAdornment>
            ),
            sx: searchSx,
          }}
        />

        <div className={styles.toolbarSpacer} />

        {rightSlot}
      </div>
    );
  },
);
