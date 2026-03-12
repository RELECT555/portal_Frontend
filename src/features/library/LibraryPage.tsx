import React, { useState, useMemo, useCallback } from 'react';
import { MenuBookRounded } from '@mui/icons-material';
import { useDebounce } from '@/hooks';
import { Breadcrumbs, PageHero, FilterToolbar, EmptyState } from '@/components/shared';
import { ROUTES } from '@/lib/constants';
import { FeaturedBooks } from './components/FeaturedBooks';
import { BookCard } from './components/BookCard';
import { MOCK_BOOKS, LIBRARY_STATS } from './mockData';
import type { BookCategory, BookSortOption } from './types';
import { BOOK_CATEGORY_LABELS, SORT_LABELS, SORT_OPTIONS, CATEGORY_TABS } from './types';
import styles from './LibraryPage.module.scss';

const ACCENT = '#0d9488';

const HERO_STATS = [
  { value: LIBRARY_STATS.totalBooks, label: 'книг' },
  { value: LIBRARY_STATS.available, label: 'доступно' },
  { value: LIBRARY_STATS.readers, label: 'читателей' },
];

const LibraryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BookCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<BookSortOption>('recent');

  const handleCategoryChange = useCallback((cat: string): void => {
    setActiveCategory(cat as BookCategory);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: string): void => {
    setSortBy(option as BookSortOption);
  }, []);

  const filteredBooks = useMemo(() => {
    let result = [...MOCK_BOOKS];

    if (activeCategory !== 'all') {
      result = result.filter((b) => b.category === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.borrowCount - a.borrowCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    }

    return result;
  }, [activeCategory, debouncedSearch, sortBy]);

  const featuredBooks = useMemo(
    () => filteredBooks.filter((b) => b.isFeatured).slice(0, 3),
    [filteredBooks],
  );

  const gridBooks = useMemo(
    () => filteredBooks.filter((b) => !featuredBooks.some((f) => f.id === b.id)),
    [filteredBooks, featuredBooks],
  );

  const showFeatured =
    featuredBooks.length > 0 && activeCategory === 'all' && !debouncedSearch.trim();

  return (
    <div
      className={styles.page}
      style={{ '--accent': ACCENT, '--accent-rgb': '13, 148, 136' } as React.CSSProperties}
    >
      <Breadcrumbs
        items={[{ label: 'База знаний', to: ROUTES.KNOWLEDGE_BASE }, { label: 'Библиотека' }]}
      />

      <PageHero
        title="Библиотека"
        subtitle="Корпоративная коллекция книг для профессионального роста"
        stats={HERO_STATS}
      />

      <FilterToolbar
        activeCategory={activeCategory}
        sortBy={sortBy}
        searchQuery={searchQuery}
        searchPlaceholder="Поиск книги..."
        categoryLabel="Жанр"
        categoryTabs={CATEGORY_TABS as string[]}
        categoryLabels={BOOK_CATEGORY_LABELS}
        sortOptions={SORT_OPTIONS as [string, string][]}
        sortLabels={SORT_LABELS}
        defaultSort="recent"
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        accentColor={ACCENT}
      />

      {showFeatured && <FeaturedBooks books={featuredBooks} />}

      {gridBooks.length > 0 ? (
        <>
          {showFeatured && (
            <div className={styles.sectionDivider}>
              <div className={styles.sectionDividerLine} />
              <span className={styles.sectionDividerLabel}>Все книги</span>
              <div className={styles.sectionDividerLine} />
            </div>
          )}
          <div className={styles.grid}>
            {gridBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={<MenuBookRounded sx={{ fontSize: 24, color: ACCENT, opacity: 0.4 }} />}
          title="Книги не найдены"
        />
      )}
    </div>
  );
};

export default LibraryPage;
