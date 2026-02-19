import React, { useState, useMemo, useCallback } from 'react';
import { Box, Button, Chip, TextField, InputAdornment, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  SearchRounded,
  WorkOutlineRounded,
  LocalFireDepartmentRounded,
  AddRounded,
} from '@mui/icons-material';
import classnames from 'classnames';
import { VacancyCard } from './components/VacancyCard';
import { VacancyDetailPanel } from './components/VacancyDetailPanel';
import { VacancyEditor } from './components/VacancyEditor';
import { MOCK_VACANCIES_FULL } from './mockData';
import type { Vacancy, VacancyDepartment } from './types';
import { VACANCY_DEPARTMENT_LABELS, VACANCY_DEPARTMENT_ICONS } from './types';
import styles from './VacanciesPage.module.scss';

const DEPARTMENTS: VacancyDepartment[] = [
  'all',
  'it',
  'hr',
  'finance',
  'logistics',
  'sales',
  'management',
  'support',
];

type SortOption = 'recent' | 'hot';

const SORT_LABELS: Record<SortOption, string> = {
  recent: 'Новые',
  hot: 'Срочные',
};

interface SortChipProps {
  sortKey: SortOption;
  label: string;
  isActive: boolean;
  onClick: (option: SortOption) => void;
}

const SortChip: React.FC<SortChipProps> = React.memo(({ sortKey, label, isActive, onClick }) => {
  const handleClick = useCallback((): void => {
    onClick(sortKey);
  }, [onClick, sortKey]);

  return (
    <Chip
      label={label}
      size="small"
      icon={
        sortKey === 'hot' ? (
          <LocalFireDepartmentRounded sx={{ fontSize: '14px !important' }} />
        ) : undefined
      }
      variant={isActive ? 'filled' : 'outlined'}
      color={isActive ? 'primary' : 'default'}
      onClick={handleClick}
      sx={{
        fontWeight: 600,
        fontSize: '0.7rem',
        cursor: 'pointer',
        borderColor: isActive ? undefined : 'divider',
      }}
    />
  );
});

interface DepartmentButtonProps {
  department: VacancyDepartment;
  isActive: boolean;
  count: number;
  onClick: (dept: VacancyDepartment) => void;
}

const DepartmentButton: React.FC<DepartmentButtonProps> = React.memo(
  ({ department, isActive, count, onClick }) => {
    const handleClick = useCallback((): void => {
      onClick(department);
    }, [onClick, department]);

    return (
      <button
        className={classnames(styles.sidebarItem, {
          [styles.sidebarItemActive]: isActive,
        })}
        onClick={handleClick}
      >
        <span
          className={classnames(styles.sidebarIcon, {
            [styles.sidebarIconActive]: isActive,
          })}
        >
          {VACANCY_DEPARTMENT_ICONS[department]}
        </span>
        <span className={styles.sidebarLabel}>{VACANCY_DEPARTMENT_LABELS[department]}</span>
        <span
          className={classnames(styles.sidebarCount, {
            [styles.sidebarCountActive]: isActive,
          })}
        >
          {count}
        </span>
      </button>
    );
  },
);

const VacanciesPage: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(MOCK_VACANCIES_FULL);
  const [activeDepartment, setActiveDepartment] = useState<VacancyDepartment>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | undefined>(undefined);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: SortOption): void => {
    setSortBy(option);
  }, []);

  const handleDepartmentChange = useCallback((dept: VacancyDepartment): void => {
    setActiveDepartment(dept);
  }, []);

  const handleVacancyClick = useCallback((vacancy: Vacancy): void => {
    setSelectedVacancy(vacancy);
  }, []);

  const handleCloseDetail = useCallback((): void => {
    setSelectedVacancy(null);
  }, []);

  const handleOpenEditor = useCallback((): void => {
    setEditingVacancy(undefined);
    setEditorOpen(true);
  }, []);

  const handleEditVacancy = useCallback((vacancy: Vacancy): void => {
    setSelectedVacancy(null);
    setEditingVacancy(vacancy);
    setEditorOpen(true);
  }, []);

  const handleCloseEditor = useCallback((): void => {
    setEditorOpen(false);
    setEditingVacancy(undefined);
  }, []);

  const handleSaveVacancy = useCallback((saved: Vacancy): void => {
    setVacancies((prev) => {
      const existingIndex = prev.findIndex((v) => v.id === saved.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = saved;
        return updated;
      }
      return [saved, ...prev];
    });
    setEditorOpen(false);
    setEditingVacancy(undefined);
  }, []);

  const getDepartmentCount = useCallback(
    (dept: VacancyDepartment): number => {
      if (dept === 'all') return vacancies.length;
      return vacancies.filter((v) => v.department === dept).length;
    },
    [vacancies],
  );

  const stats = useMemo(
    () => ({
      total: vacancies.length,
      hot: vacancies.filter((v) => v.isHot).length,
      departments: new Set(vacancies.map((v) => v.department).filter(Boolean)).size,
    }),
    [vacancies],
  );

  const filteredVacancies = useMemo(() => {
    let result = [...vacancies];

    if (activeDepartment !== 'all') {
      result = result.filter((v) => v.department === activeDepartment);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          (v.department && v.department.toLowerCase().includes(q)) ||
          (v.location && v.location.toLowerCase().includes(q)) ||
          (v.description && v.description.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case 'hot':
        result.sort((a, b) => {
          if (a.isHot && !b.isHot) return -1;
          if (!a.isHot && b.isHot) return 1;
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
        break;
      case 'recent':
      default:
        result.sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        );
    }

    return result;
  }, [vacancies, activeDepartment, searchQuery, sortBy]);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 70%)`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            left: '30%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.04)} 0%, transparent 70%)`,
          }}
        />

        <div className={styles.heroContent}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <WorkOutlineRounded sx={{ fontSize: 28, color: 'primary.main' }} />
            <Typography
              variant="h4"
              component="span"
              fontWeight={800}
              color="primary.main"
              sx={{ letterSpacing: '0.02em' }}
            >
              Вакансии
            </Typography>
          </Box>
          <h1 className={styles.heroTitle}>Присоединяйтесь к команде</h1>
          <p className={styles.heroSubtitle}>
            Актуальные вакансии компании. Найдите позицию, которая подходит именно вам, и станьте
            частью нашей команды.
          </p>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{stats.total}</span>
            <span className={styles.heroStatLabel}>Вакансий</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{stats.hot}</span>
            <span className={styles.heroStatLabel}>Срочных</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{stats.departments}</span>
            <span className={styles.heroStatLabel}>Отделов</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([key, label]) => (
            <SortChip
              key={key}
              sortKey={key}
              label={label}
              isActive={sortBy === key}
              onClick={handleSortChange}
            />
          ))}
        </Box>

        <div className={styles.toolbarSpacer} />

        <TextField
          className={styles.searchField}
          size="small"
          placeholder="Поиск вакансий..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '12px',
              bgcolor: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
              fontSize: '0.8125rem',
              '& fieldset': { borderColor: 'divider' },
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddRounded sx={{ fontSize: 18 }} />}
          onClick={handleOpenEditor}
          sx={{
            borderRadius: '12px',
            px: 2.5,
            fontWeight: 600,
            fontSize: '0.8125rem',
            flexShrink: 0,
            textTransform: 'none',
          }}
        >
          Создать вакансию
        </Button>
      </div>

      {/* Content: sidebar + list */}
      <div className={styles.content}>
        {/* Sidebar */}
        <nav className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <span className={styles.sidebarSectionLabel}>Отделы</span>
          </div>
          <div className={styles.sidebarList}>
            {DEPARTMENTS.map((dept) => {
              const count = getDepartmentCount(dept);
              if (dept !== 'all' && count === 0) return null;
              return (
                <DepartmentButton
                  key={dept}
                  department={dept}
                  isActive={activeDepartment === dept}
                  count={count}
                  onClick={handleDepartmentChange}
                />
              );
            })}
          </div>
        </nav>

        {/* Vacancy list */}
        {filteredVacancies.length > 0 ? (
          <div className={styles.list}>
            {filteredVacancies.map((vacancy) => (
              <VacancyCard
                key={vacancy.id}
                vacancy={vacancy}
                isSelected={selectedVacancy?.id === vacancy.id}
                onClick={handleVacancyClick}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Box
              className={styles.emptyIcon}
              sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06) }}
            >
              <WorkOutlineRounded sx={{ fontSize: 28, color: 'primary.main', opacity: 0.7 }} />
            </Box>
            <Typography variant="h4" fontWeight={600}>
              Вакансии не найдены
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
              Попробуйте изменить фильтры или поисковый запрос
            </Typography>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selectedVacancy && (
        <VacancyDetailPanel
          vacancy={selectedVacancy}
          onClose={handleCloseDetail}
          onEdit={handleEditVacancy}
        />
      )}

      {/* Editor */}
      {editorOpen && (
        <VacancyEditor
          vacancy={editingVacancy}
          onClose={handleCloseEditor}
          onSave={handleSaveVacancy}
        />
      )}
    </div>
  );
};

export default VacanciesPage;
