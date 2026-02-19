import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TextField,
  Button,
  IconButton,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from '@mui/material';
import { CloseRounded, AddRounded, DeleteOutlineRounded, LinkRounded } from '@mui/icons-material';
import type { Vacancy, VacancyDepartment, VacancyEmploymentType } from '../types';
import { VACANCY_DEPARTMENT_LABELS, VACANCY_EMPLOYMENT_LABELS } from '../types';
import styles from '../VacanciesPage.module.scss';

const DEPARTMENT_OPTIONS: VacancyDepartment[] = [
  'it',
  'hr',
  'finance',
  'logistics',
  'sales',
  'management',
  'support',
];

const EMPLOYMENT_OPTIONS: VacancyEmploymentType[] = [
  'full-time',
  'part-time',
  'contract',
  'internship',
];

interface VacancyFormData {
  title: string;
  department: string;
  location: string;
  experience: string;
  employmentType: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  conditions: string[];
  isHot: boolean;
  hhUrl: string;
}

const EMPTY_FORM: VacancyFormData = {
  title: '',
  department: '',
  location: '',
  experience: '',
  employmentType: 'full-time',
  description: '',
  responsibilities: [''],
  requirements: [''],
  conditions: [''],
  isHot: false,
  hhUrl: '',
};

const buildFormFromVacancy = (vacancy: Vacancy): VacancyFormData => ({
  title: vacancy.title,
  department: vacancy.department ?? '',
  location: vacancy.location ?? '',
  experience: vacancy.experience ?? '',
  employmentType: vacancy.employmentType ?? 'full-time',
  description: vacancy.description ?? '',
  responsibilities: vacancy.responsibilities?.length ? vacancy.responsibilities : [''],
  requirements: vacancy.requirements?.length ? vacancy.requirements : [''],
  conditions: vacancy.conditions?.length ? vacancy.conditions : [''],
  isHot: vacancy.isHot ?? false,
  hhUrl: vacancy.hhUrl ?? '',
});

interface Props {
  vacancy?: Vacancy;
  onClose: () => void;
  onSave: (vacancy: Vacancy) => void;
}

const isValidHhUrl = (url: string): boolean => {
  if (!url) return true;
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith('hh.ru');
  } catch {
    return false;
  }
};

export const VacancyEditor: React.FC<Props> = React.memo(({ vacancy, onClose, onSave }) => {
  const [form, setForm] = useState<VacancyFormData>(
    vacancy ? buildFormFromVacancy(vacancy) : EMPTY_FORM,
  );

  const isEditing = Boolean(vacancy);

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

  const updateField = useCallback(
    <K extends keyof VacancyFormData>(key: K, value: VacancyFormData[K]): void => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateListItem = useCallback(
    (
      field: 'responsibilities' | 'requirements' | 'conditions',
      index: number,
      value: string,
    ): void => {
      setForm((prev) => {
        const list = [...prev[field]];
        list[index] = value;
        return { ...prev, [field]: list };
      });
    },
    [],
  );

  const addListItem = useCallback(
    (field: 'responsibilities' | 'requirements' | 'conditions'): void => {
      setForm((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
    },
    [],
  );

  const removeListItem = useCallback(
    (field: 'responsibilities' | 'requirements' | 'conditions', index: number): void => {
      setForm((prev) => {
        const list = prev[field].filter((_, i) => i !== index);
        return { ...prev, [field]: list.length > 0 ? list : [''] };
      });
    },
    [],
  );

  const hhUrlValid = useMemo(() => isValidHhUrl(form.hhUrl), [form.hhUrl]);

  const canSave = useMemo(
    (): boolean => form.title.trim().length > 0 && hhUrlValid,
    [form.title, hhUrlValid],
  );

  const handleSave = useCallback((): void => {
    if (!canSave) return;

    const filterEmpty = (list: string[]): string[] => list.filter((s) => s.trim());

    const result: Vacancy = {
      id: vacancy?.id ?? `new-${Date.now()}`,
      title: form.title.trim(),
      department: form.department || undefined,
      location: form.location.trim() || undefined,
      experience: form.experience.trim() || undefined,
      employmentType: (form.employmentType as VacancyEmploymentType) || undefined,
      description: form.description.trim() || undefined,
      responsibilities: filterEmpty(form.responsibilities),
      requirements: filterEmpty(form.requirements),
      conditions: filterEmpty(form.conditions),
      isHot: form.isHot,
      hhUrl: form.hhUrl.trim() || undefined,
      publishedAt: vacancy?.publishedAt ?? new Date().toISOString().split('T')[0],
    };

    onSave(result);
  }, [canSave, form, vacancy, onSave]);

  const renderListSection = (
    title: string,
    field: 'responsibilities' | 'requirements' | 'conditions',
    placeholder: string,
  ): React.ReactNode => (
    <div className={styles.editorSection}>
      <div className={styles.editorSectionHeader}>
        <span className={styles.editorSectionTitle}>{title}</span>
        <Tooltip title="Добавить пункт">
          <IconButton size="small" onClick={() => addListItem(field)}>
            <AddRounded sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </div>
      <div className={styles.editorListItems}>
        {form[field].map((item, index) => (
          <div key={index} className={styles.editorListItem}>
            <TextField
              fullWidth
              size="small"
              placeholder={placeholder}
              value={item}
              onChange={(e) => updateListItem(field, index, e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                },
              }}
            />
            {form[field].length > 1 && (
              <IconButton
                size="small"
                onClick={() => removeListItem(field, index)}
                sx={{ color: 'text.secondary', flexShrink: 0 }}
              >
                <DeleteOutlineRounded sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.editorOverlay} onClick={handleOverlayClick}>
      <div className={styles.editorPanel}>
        <div className={styles.editorHeader}>
          <h2 className={styles.editorTitle}>
            {isEditing ? 'Редактировать вакансию' : 'Новая вакансия'}
          </h2>
          <IconButton size="small" onClick={onClose}>
            <CloseRounded sx={{ fontSize: 20 }} />
          </IconButton>
        </div>

        <div className={styles.editorBody}>
          {/* Title */}
          <TextField
            fullWidth
            label="Название вакансии"
            placeholder="Например: Frontend-разработчик"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            required
            InputProps={{ sx: { borderRadius: '10px', fontSize: '0.875rem' } }}
            InputLabelProps={{ sx: { fontSize: '0.8125rem' } }}
          />

          {/* Row: Department + Employment */}
          <div className={styles.editorRow}>
            <TextField
              select
              fullWidth
              label="Отдел"
              value={form.department}
              onChange={(e) => updateField('department', e.target.value)}
              InputProps={{ sx: { borderRadius: '10px', fontSize: '0.8125rem' } }}
              InputLabelProps={{ sx: { fontSize: '0.8125rem' } }}
            >
              <MenuItem value="">Не указан</MenuItem>
              {DEPARTMENT_OPTIONS.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {VACANCY_DEPARTMENT_LABELS[dept]}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Тип занятости"
              value={form.employmentType}
              onChange={(e) => updateField('employmentType', e.target.value)}
              InputProps={{ sx: { borderRadius: '10px', fontSize: '0.8125rem' } }}
              InputLabelProps={{ sx: { fontSize: '0.8125rem' } }}
            >
              {EMPLOYMENT_OPTIONS.map((et) => (
                <MenuItem key={et} value={et}>
                  {VACANCY_EMPLOYMENT_LABELS[et]}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* Row: Location + Experience */}
          <div className={styles.editorRow}>
            <TextField
              fullWidth
              label="Локация"
              placeholder="Москва"
              value={form.location}
              onChange={(e) => updateField('location', e.target.value)}
              InputProps={{ sx: { borderRadius: '10px', fontSize: '0.8125rem' } }}
              InputLabelProps={{ sx: { fontSize: '0.8125rem' } }}
            />

            <TextField
              fullWidth
              label="Опыт работы"
              placeholder="От 2 лет"
              value={form.experience}
              onChange={(e) => updateField('experience', e.target.value)}
              InputProps={{ sx: { borderRadius: '10px', fontSize: '0.8125rem' } }}
              InputLabelProps={{ sx: { fontSize: '0.8125rem' } }}
            />
          </div>

          {/* hh.ru link */}
          <div className={styles.editorHhField}>
            <span className={styles.editorHhLabel}>
              <LinkRounded sx={{ fontSize: 16 }} />
              Ссылка на hh.ru
            </span>
            <TextField
              fullWidth
              size="small"
              placeholder="https://hh.ru/vacancy/12345678"
              value={form.hhUrl}
              onChange={(e) => updateField('hhUrl', e.target.value)}
              error={!hhUrlValid}
              helperText={!hhUrlValid ? 'Ссылка должна вести на hh.ru' : undefined}
              InputProps={{
                sx: {
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  bgcolor: '#fff',
                },
              }}
            />
            <span className={styles.editorHhHint}>
              Вставьте ссылку на вакансию с hh.ru. Кандидаты смогут перейти напрямую для отклика.
            </span>
          </div>

          {/* Description */}
          <TextField
            fullWidth
            label="Описание вакансии"
            placeholder="Краткое описание позиции..."
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            InputProps={{ sx: { borderRadius: '10px', fontSize: '0.8125rem' } }}
            InputLabelProps={{ sx: { fontSize: '0.8125rem' } }}
          />

          {/* Lists */}
          {renderListSection('Обязанности', 'responsibilities', 'Например: Разработка интерфейсов')}
          {renderListSection('Требования', 'requirements', 'Например: Опыт от 2 лет')}
          {renderListSection('Условия', 'conditions', 'Например: ДМС')}

          {/* Hot checkbox */}
          <div className={styles.editorCheckbox}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.isHot}
                  onChange={(e) => updateField('isHot', e.target.checked)}
                  color="error"
                  size="small"
                />
              }
              label="Срочная вакансия"
              slotProps={{
                typography: {
                  sx: { fontSize: '0.8125rem', fontWeight: 500 },
                },
              }}
            />
          </div>
        </div>

        <div className={styles.editorFooter}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.8125rem',
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.secondary',
              px: 3,
            }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!canSave}
            sx={{
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.8125rem',
              textTransform: 'none',
              px: 3,
            }}
          >
            {isEditing ? 'Сохранить' : 'Создать вакансию'}
          </Button>
        </div>
      </div>
    </div>
  );
});
