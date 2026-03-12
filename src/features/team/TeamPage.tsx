import React, { useState, useMemo, useCallback } from 'react';
import { PeopleAltRounded } from '@mui/icons-material';
import { useDebounce } from '@/hooks';
import { Breadcrumbs, PageHero, FilterToolbar, EmptyState } from '@/components/shared';
import { TeamMemberCard } from './components/TeamMemberCard';
import { MOCK_TEAM_MEMBERS, TEAM_STATS } from './mockData';
import type { TeamDepartment, TeamSortOption } from './types';
import { TEAM_DEPARTMENT_LABELS, SORT_LABELS, SORT_OPTIONS, CATEGORY_TABS } from './types';
import styles from './TeamPage.module.scss';

const ACCENT = '#0d9488';

const HERO_STATS = [
  { value: TEAM_STATS.totalEmployees, label: 'сотрудников' },
  { value: TEAM_STATS.departments, label: 'отделов' },
  { value: TEAM_STATS.newThisMonth, label: 'новых' },
];

const TeamPage: React.FC = () => {
  const [activeDepartment, setActiveDepartment] = useState<TeamDepartment>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<TeamSortOption>('name');

  const handleDepartmentChange = useCallback((dep: string): void => {
    setActiveDepartment(dep as TeamDepartment);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: string): void => {
    setSortBy(option as TeamSortOption);
  }, []);

  const departmentCounts = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set('all', MOCK_TEAM_MEMBERS.length);
    for (const member of MOCK_TEAM_MEMBERS) {
      counts.set(member.department, (counts.get(member.department) ?? 0) + 1);
    }
    return counts;
  }, []);

  const filteredMembers = useMemo(() => {
    let result = [...MOCK_TEAM_MEMBERS];

    if (activeDepartment !== 'all') {
      result = result.filter((m) => m.department === activeDepartment);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (m) =>
          m.fullName.toLowerCase().includes(q) ||
          m.position.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime());
        break;
      case 'department':
        result.sort((a, b) => a.department.localeCompare(b.department));
        break;
      case 'name':
      default:
        result.sort((a, b) => a.fullName.localeCompare(b.fullName, 'ru'));
    }

    return result;
  }, [activeDepartment, debouncedSearch, sortBy]);

  return (
    <div
      className={styles.page}
      style={{ '--accent': ACCENT, '--accent-rgb': '13, 148, 136' } as React.CSSProperties}
    >
      <Breadcrumbs items={[{ label: 'Команда' }]} />

      <PageHero
        title="Команда"
        subtitle="Сотрудники компании, контакты и структура"
        stats={HERO_STATS}
      />

      <FilterToolbar
        activeCategory={activeDepartment}
        sortBy={sortBy}
        searchQuery={searchQuery}
        searchPlaceholder="Поиск сотрудника..."
        categoryLabel="Отдел"
        categoryTabs={CATEGORY_TABS as string[]}
        categoryLabels={TEAM_DEPARTMENT_LABELS}
        categoryCounts={departmentCounts}
        sortOptions={SORT_OPTIONS as [string, string][]}
        sortLabels={SORT_LABELS}
        defaultSort="name"
        onCategoryChange={handleDepartmentChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        accentColor={ACCENT}
      />

      {filteredMembers.length > 0 ? (
        <div className={styles.grid}>
          {filteredMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<PeopleAltRounded sx={{ fontSize: 24, color: ACCENT, opacity: 0.4 }} />}
          title="Сотрудники не найдены"
        />
      )}
    </div>
  );
};

export default TeamPage;
