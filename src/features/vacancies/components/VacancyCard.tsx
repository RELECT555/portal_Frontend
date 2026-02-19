import React from 'react';
import { Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  LocationOnOutlined,
  WorkOutline,
  AccessTimeOutlined,
  LocalFireDepartmentRounded,
  OpenInNewRounded,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import classnames from 'classnames';
import type { Vacancy } from '../types';
import { VACANCY_DEPARTMENT_LABELS, VACANCY_EMPLOYMENT_LABELS } from '../types';
import type { VacancyDepartment, VacancyEmploymentType } from '../types';
import styles from '../VacanciesPage.module.scss';

interface Props {
  vacancy: Vacancy;
  isSelected: boolean;
  onClick: (vacancy: Vacancy) => void;
}

const getDepartmentColor = (department?: string): string => {
  const colors: Record<string, string> = {
    it: '#3b82f6',
    hr: '#6366f1',
    finance: '#f59e0b',
    logistics: '#ef4444',
    sales: '#10b981',
    management: '#8b5cf6',
    support: '#64748b',
  };
  return colors[department ?? ''] ?? '#0d9488';
};

export const VacancyCard: React.FC<Props> = React.memo(({ vacancy, isSelected, onClick }) => {
  const accentColor = getDepartmentColor(vacancy.department);

  const handleHhClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <div
      className={classnames(styles.card, { [styles.cardSelected]: isSelected })}
      onClick={() => onClick(vacancy)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(vacancy);
        }
      }}
    >
      <div className={styles.cardAccent} style={{ backgroundColor: accentColor }} />
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>
            {vacancy.isHot && (
              <LocalFireDepartmentRounded
                sx={{ fontSize: 16, color: '#ef4444', verticalAlign: 'text-bottom', mr: 0.5 }}
              />
            )}
            {vacancy.title}
          </span>
          <span className={styles.cardDate}>{dayjs(vacancy.publishedAt).format('DD MMM')}</span>
        </div>

        <div className={styles.cardMeta}>
          {vacancy.department && (
            <span className={styles.cardMetaItem}>
              <WorkOutline sx={{ fontSize: 14, color: accentColor }} />
              {VACANCY_DEPARTMENT_LABELS[vacancy.department as VacancyDepartment] ??
                vacancy.department}
            </span>
          )}
          {vacancy.location && (
            <span className={styles.cardMetaItem}>
              <LocationOnOutlined sx={{ fontSize: 14 }} />
              {vacancy.location}
            </span>
          )}
          {vacancy.experience && (
            <span className={styles.cardMetaItem}>
              <AccessTimeOutlined sx={{ fontSize: 14 }} />
              {vacancy.experience}
            </span>
          )}
        </div>

        <div className={styles.cardTags}>
          {vacancy.employmentType && (
            <Chip
              label={VACANCY_EMPLOYMENT_LABELS[vacancy.employmentType as VacancyEmploymentType]}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 600,
                bgcolor: alpha(accentColor, 0.08),
                color: accentColor,
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          )}
          {vacancy.isHot && (
            <Chip
              label="Срочная"
              size="small"
              color="error"
              sx={{
                height: 20,
                fontSize: '0.6rem',
                fontWeight: 700,
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          )}
          {vacancy.hhUrl && (
            <Chip
              component="a"
              href={vacancy.hhUrl}
              target="_blank"
              rel="noopener noreferrer"
              label="hh.ru"
              size="small"
              clickable
              onClick={handleHhClick}
              icon={<OpenInNewRounded sx={{ fontSize: '12px !important' }} />}
              sx={{
                height: 20,
                fontSize: '0.6rem',
                fontWeight: 700,
                bgcolor: '#d6001c10',
                color: '#d6001c',
                '& .MuiChip-label': { px: 0.5 },
                '& .MuiChip-icon': { color: '#d6001c', ml: 0.5 },
                '&:hover': { bgcolor: '#d6001c1a' },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});
