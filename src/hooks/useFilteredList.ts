import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export interface SortConfig<T> {
  key: string;
  compare: (a: T, b: T) => number;
}

export interface FilteredListOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  categoryField?: keyof T;
  arraySearchFields?: (keyof T)[];
  defaultSort?: string;
  sorts?: Record<string, (a: T, b: T) => number>;
}

export interface FilteredListResult<T> {
  filtered: T[];
  activeCategory: string;
  searchQuery: string;
  sortBy: string;
  handleCategoryChange: (cat: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (option: string) => void;
  setActiveCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  setSortBy: (s: string) => void;
}

export function useFilteredList<T extends Record<string, unknown>>(
  options: FilteredListOptions<T>,
): FilteredListResult<T> {
  const {
    items,
    searchFields,
    categoryField,
    arraySearchFields = [],
    defaultSort = 'recent',
    sorts = {},
  } = options;

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(defaultSort);
  const debouncedSearch = useDebounce(searchQuery);

  const handleCategoryChange = useCallback((cat: string): void => {
    setActiveCategory(cat);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: string): void => {
    setSortBy(option);
  }, []);

  const filtered = useMemo(() => {
    let result = [...items];

    if (activeCategory !== 'all' && categoryField) {
      result = result.filter((item) => item[categoryField] === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((item) => {
        const matchText = searchFields.some((field) => {
          const val = item[field];
          return typeof val === 'string' && val.toLowerCase().includes(q);
        });
        const matchArray = arraySearchFields.some((field) => {
          const val = item[field];
          return Array.isArray(val) && val.some((v: string) => v.toLowerCase().includes(q));
        });
        return matchText || matchArray;
      });
    }

    const sortFn = sorts[sortBy];
    if (sortFn) result.sort(sortFn);

    return result;
  }, [
    items,
    activeCategory,
    categoryField,
    debouncedSearch,
    searchFields,
    arraySearchFields,
    sortBy,
    sorts,
  ]);

  return {
    filtered,
    activeCategory,
    searchQuery,
    sortBy,
    handleCategoryChange,
    handleSearchChange,
    handleSortChange,
    setActiveCategory,
    setSearchQuery,
    setSortBy,
  };
}
