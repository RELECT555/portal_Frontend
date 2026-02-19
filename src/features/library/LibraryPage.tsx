import React, { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '@/hooks';
import { HeroSection } from './components/HeroSection';
import { LibraryToolbar } from './components/LibraryToolbar';
import { FeaturedBooks } from './components/FeaturedBooks';
import { BookCard } from './components/BookCard';
import { LibraryEmptyState } from './components/LibraryEmptyState';
import { MOCK_BOOKS, LIBRARY_STATS } from './mockData';
import type { BookCategory, BookSortOption } from './types';
import styles from './LibraryPage.module.scss';

const LibraryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BookCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<BookSortOption>('recent');

  const handleCategoryChange = useCallback((cat: BookCategory): void => {
    setActiveCategory(cat);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: BookSortOption): void => {
    setSortBy(option);
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
    <div className={styles.page}>
      <HeroSection stats={LIBRARY_STATS} />

      <LibraryToolbar
        activeCategory={activeCategory}
        sortBy={sortBy}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
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
        <LibraryEmptyState />
      )}
    </div>
  );
};

export default LibraryPage;
