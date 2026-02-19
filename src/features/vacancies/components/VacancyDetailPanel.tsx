import React, { useEffect, useCallback, useRef } from 'react';
import { Button, Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  CloseRounded,
  OpenInNewRounded,
  ContentCopyRounded,
  EditRounded,
} from '@mui/icons-material';
import type { Vacancy, VacancyDepartment, VacancyEmploymentType } from '../types';
import { VACANCY_DEPARTMENT_LABELS, VACANCY_EMPLOYMENT_LABELS } from '../types';
import styles from '../VacanciesPage.module.scss';

interface Props {
  vacancy: Vacancy;
  onClose: () => void;
  onEdit?: (vacancy: Vacancy) => void;
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

export const VacancyDetailPanel: React.FC<Props> = React.memo(({ vacancy, onClose, onEdit }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const accentColor = getDepartmentColor(vacancy.department);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent): void => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <div className={styles.detailOverlay} onClick={handleOverlayClick}>
      <div className={styles.detailPanel} ref={panelRef}>
        <div className={styles.detailHeader}>
          <button className={styles.detailClose} onClick={onClose} aria-label="Закрыть">
            <CloseRounded sx={{ fontSize: 16 }} />
          </button>
          <h2 className={styles.detailTitle}>{vacancy.title}</h2>
          <div className={styles.detailChips}>
            {vacancy.department && (
              <Chip
                label={
                  VACANCY_DEPARTMENT_LABELS[vacancy.department as VacancyDepartment] ??
                  vacancy.department
                }
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  bgcolor: alpha(accentColor, 0.1),
                  color: accentColor,
                }}
              />
            )}
            {vacancy.employmentType && (
              <Chip
                label={VACANCY_EMPLOYMENT_LABELS[vacancy.employmentType as VacancyEmploymentType]}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  bgcolor: 'rgba(0,0,0,0.05)',
                  color: 'text.secondary',
                }}
              />
            )}
            {vacancy.isHot && (
              <Chip
                label="Срочная вакансия"
                size="small"
                color="error"
                sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700 }}
              />
            )}
          </div>
        </div>

        <div className={styles.detailBody}>
          <div className={styles.detailInfoGrid}>
            {vacancy.location && (
              <div className={styles.detailInfoItem}>
                <span className={styles.detailInfoLabel}>Локация</span>
                <span className={styles.detailInfoValue}>{vacancy.location}</span>
              </div>
            )}
            {vacancy.experience && (
              <div className={styles.detailInfoItem}>
                <span className={styles.detailInfoLabel}>Опыт</span>
                <span className={styles.detailInfoValue}>{vacancy.experience}</span>
              </div>
            )}
            {vacancy.employmentType && (
              <div className={styles.detailInfoItem}>
                <span className={styles.detailInfoLabel}>Занятость</span>
                <span className={styles.detailInfoValue}>
                  {VACANCY_EMPLOYMENT_LABELS[vacancy.employmentType]}
                </span>
              </div>
            )}
            {vacancy.hhUrl && (
              <a
                href={vacancy.hhUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailInfoItem}
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <span className={styles.detailInfoLabel}>Ссылка на hh.ru</span>
                <span className={styles.detailHhLink}>
                  <OpenInNewRounded sx={{ fontSize: 14 }} />
                  Открыть на hh.ru
                </span>
              </a>
            )}
          </div>

          {vacancy.description && (
            <div className={styles.detailSection}>
              <h3 className={styles.detailSectionTitle}>О вакансии</h3>
              <p className={styles.detailDescription}>{vacancy.description}</p>
            </div>
          )}

          {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
            <div className={styles.detailSection}>
              <h3 className={styles.detailSectionTitle}>Обязанности</h3>
              <ul className={styles.detailList}>
                {vacancy.responsibilities.map((item) => (
                  <li key={item} className={styles.detailListItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {vacancy.requirements && vacancy.requirements.length > 0 && (
            <div className={styles.detailSection}>
              <h3 className={styles.detailSectionTitle}>Требования</h3>
              <ul className={styles.detailList}>
                {vacancy.requirements.map((item) => (
                  <li key={item} className={styles.detailListItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {vacancy.conditions && vacancy.conditions.length > 0 && (
            <div className={styles.detailSection}>
              <h3 className={styles.detailSectionTitle}>Условия</h3>
              <ul className={styles.detailList}>
                {vacancy.conditions.map((item) => (
                  <li key={item} className={styles.detailListItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.detailFooter}>
          {vacancy.hhUrl ? (
            <Button
              component="a"
              href={vacancy.hhUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<OpenInNewRounded sx={{ fontSize: 16 }} />}
              sx={{
                flex: 1,
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.8125rem',
                textTransform: 'none',
                py: 1,
                bgcolor: '#d6001c',
                '&:hover': { bgcolor: '#b5001a' },
              }}
            >
              Откликнуться на hh.ru
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled
              sx={{
                flex: 1,
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.8125rem',
                textTransform: 'none',
                py: 1,
              }}
            >
              Ссылка на hh.ru не прикреплена
            </Button>
          )}
          {onEdit && (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<EditRounded sx={{ fontSize: 16 }} />}
              onClick={() => onEdit(vacancy)}
              sx={{
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.8125rem',
                textTransform: 'none',
                borderColor: 'divider',
                color: 'text.secondary',
                py: 1,
                '&:hover': { borderColor: 'text.secondary' },
              }}
            >
              Изменить
            </Button>
          )}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ContentCopyRounded sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.8125rem',
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.secondary',
              py: 1,
              '&:hover': { borderColor: 'text.secondary' },
            }}
          >
            Скопировать
          </Button>
        </div>
      </div>
    </div>
  );
});
