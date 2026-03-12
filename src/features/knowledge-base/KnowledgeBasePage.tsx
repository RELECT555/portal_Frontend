import React, { useState, useMemo, useCallback } from 'react';
import { SearchOffRounded, ViewListRounded, GridViewRounded } from '@mui/icons-material';
import { useDebounce } from '@/hooks';
import { Breadcrumbs, PageHero, FilterToolbar, EmptyState } from '@/components/shared';
import { CategoryGrid } from './components/CategoryGrid';
import { DocumentCard } from './components/DocumentCard';
import { MOCK_DOCUMENTS, KB_CATEGORIES, KB_STATS } from './mockData';
import type { KBCategory, KBSortOption } from './types';
import { KB_CATEGORY_LABELS, SORT_LABELS, SORT_OPTIONS, CATEGORY_TABS } from './types';
import styles from './KnowledgeBasePage.module.scss';

export type ViewMode = 'list' | 'grid';

const ACCENT = '#0d9488';

const HERO_STATS = [
  { value: KB_STATS.totalDocuments, label: 'документов' },
  { value: KB_STATS.categories, label: 'категорий' },
  { value: KB_STATS.updatedThisMonth, label: 'обновлено' },
];

const KnowledgeBasePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<KBCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<KBSortOption>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleCategoryChange = useCallback((cat: string): void => {
    setActiveCategory(cat as KBCategory);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: string): void => {
    setSortBy(option as KBSortOption);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode): void => {
    setViewMode(mode);
  }, []);

  const filteredDocuments = useMemo(() => {
    let result = [...MOCK_DOCUMENTS];

    if (activeCategory !== 'all') {
      result = result.filter((d) => d.category === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.department.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    const pinned = result.filter((d) => d.isPinned);
    const rest = result.filter((d) => !d.isPinned);

    switch (sortBy) {
      case 'popular':
        rest.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'alphabetical':
        rest.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
        break;
      case 'recent':
      default:
        rest.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    return [...pinned, ...rest];
  }, [activeCategory, debouncedSearch, sortBy]);

  const showCategories = activeCategory === 'all' && !debouncedSearch.trim();

  const viewToggle = (
    <div className={styles.viewToggle}>
      <button
        type="button"
        className={`${styles.viewToggleBtn} ${viewMode === 'list' ? styles.viewToggleBtnActive : ''}`}
        onClick={() => handleViewModeChange('list')}
        aria-label="Список"
      >
        <ViewListRounded sx={{ fontSize: 16 }} />
      </button>
      <button
        type="button"
        className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.viewToggleBtnActive : ''}`}
        onClick={() => handleViewModeChange('grid')}
        aria-label="Сетка"
      >
        <GridViewRounded sx={{ fontSize: 16 }} />
      </button>
    </div>
  );

  return (
    <div
      className={styles.page}
      style={{ '--accent': ACCENT, '--accent-rgb': '13, 148, 136' } as React.CSSProperties}
    >
      <Breadcrumbs items={[{ label: 'База знаний' }]} />

      <PageHero
        title="База знаний"
        subtitle="Документы, регламенты и инструкции компании — всё в одном месте"
        stats={HERO_STATS}
      />

      {showCategories && (
        <>
          <div className={styles.sectionDivider}>
            <div className={styles.sectionDividerLine} />
            <span className={styles.sectionDividerLabel}>Категории</span>
            <div className={styles.sectionDividerLine} />
          </div>
          <CategoryGrid
            categories={KB_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </>
      )}

      <div className={styles.sectionDivider}>
        <div className={styles.sectionDividerLine} />
        <span className={styles.sectionDividerLabel}>Документы</span>
        <div className={styles.sectionDividerLine} />
      </div>

      <FilterToolbar
        activeCategory={activeCategory}
        sortBy={sortBy}
        searchQuery={searchQuery}
        searchPlaceholder="Поиск документов..."
        categoryLabel="Категория"
        categoryTabs={CATEGORY_TABS as string[]}
        categoryLabels={KB_CATEGORY_LABELS}
        sortOptions={SORT_OPTIONS as [string, string][]}
        sortLabels={SORT_LABELS}
        defaultSort="recent"
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        accentColor={ACCENT}
        rightSlot={viewToggle}
      />

      {filteredDocuments.length > 0 ? (
        <div className={styles.documentList}>
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchOffRounded sx={{ fontSize: 24, color: '#6366f1', opacity: 0.4 }} />}
          title="Документы не найдены"
        />
      )}
    </div>
  );
};

export default KnowledgeBasePage;
