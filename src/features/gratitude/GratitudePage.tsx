import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import {
  FavoriteRounded,
  Send,
  FormatQuote,
  Close,
  VolunteerActivism,
  WorkspacePremium,
  TrendingUp,
} from '@mui/icons-material';
import type { GratitudeEntry } from './types';
import styles from './GratitudePage.module.scss';

const MOCK_FEED: GratitudeEntry[] = [
  {
    id: '1',
    fromName: 'Иванова Мария',
    toName: 'Ляхов Алексей Федорович',
    toPosition: 'Системный аналитик',
    message: 'Огромное спасибо за помощь с аналитикой по проекту — всё чётко и в срок!',
    createdAt: '2026-02-19',
  },
  {
    id: '2',
    fromName: 'Петров Дмитрий',
    toName: 'Битяй Елена Анатольевна',
    toPosition: 'Специалист',
    message: 'Лена, спасибо что всегда готова помочь и объяснить — ты настоящий командный игрок.',
    createdAt: '2026-02-18',
  },
  {
    id: '3',
    fromName: 'Смирнова Ольга',
    toName: 'Костикова Дарья Евгеньевна',
    toPosition: 'Клиент-менеджер',
    message: 'Дарья, благодарю за отличную работу с клиентами — получила очень хорошие отзывы.',
    createdAt: '2026-02-18',
  },
  {
    id: '4',
    fromName: 'Борискин Иван',
    toName: 'Назаров Николай Андреевич',
    toPosition: 'Системный администратор',
    message: 'Коля, спасибо за оперативное решение проблемы с сервером — спас весь отдел!',
    createdAt: '2026-02-17',
  },
  {
    id: '5',
    fromName: 'Козлова Анна',
    toName: 'Тарасов Сергей Анатольевич',
    toPosition: 'Менеджер интернет-продаж',
    message: 'Сергей, спасибо за помощь с обучением — очень доступно и терпеливо объяснил.',
    createdAt: '2026-02-17',
  },
];

const TOTAL = 1168;
const WEEKLY_COUNT = 42;
const MONTHLY_COUNT = 187;
const pulseHeart = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
`;

const MOCK_EMPLOYEE_NAMES = [
  'Ляхов Алексей Федорович',
  'Битяй Елена Анатольевна',
  'Костикова Дарья Евгеньевна',
  'Назаров Николай Андреевич',
  'Тарасов Сергей Анатольевич',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p.charAt(0))
    .join('')
    .toUpperCase();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

interface FeedCardProps {
  entry: GratitudeEntry;
}

const FeedCard: React.FC<FeedCardProps> = ({ entry }) => (
  <Card
    sx={{
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'visible',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => `0 16px 40px -12px ${alpha(theme.palette.error.main, 0.2)}`,
        borderColor: (theme) => alpha(theme.palette.error.main, 0.2),
      },
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: -1,
        left: 24,
        right: 24,
        height: 3,
        borderRadius: '0 0 4px 4px',
        background: (theme) =>
          `linear-gradient(90deg, ${alpha(theme.palette.error.light, 0.4)}, ${alpha(theme.palette.error.main, 0.6)}, ${alpha(theme.palette.error.light, 0.4)})`,
      }}
    />

    <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ pt: 0.5 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
              color: 'error.main',
              fontSize: '0.85rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {getInitials(entry.fromName)}
          </Avatar>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {entry.fromName}
            </Typography>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ flexShrink: 0, fontSize: '0.7rem' }}
            >
              {formatDate(entry.createdAt)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'flex-start',
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.03),
              borderRadius: 3,
              p: 2,
              position: 'relative',
            }}
          >
            <FormatQuote
              sx={{
                fontSize: 32,
                color: (theme) => alpha(theme.palette.error.main, 0.15),
                position: 'absolute',
                top: 4,
                left: 8,
                transform: 'rotate(180deg)',
              }}
            />
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ lineHeight: 1.7, pl: 3, fontStyle: 'italic' }}
            >
              {entry.message}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1.5 }}>
            <VolunteerActivism sx={{ fontSize: 14, color: 'error.light' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              для {entry.toName}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              · {entry.toPosition}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

interface StatBoxProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
}

const StatBox: React.FC<StatBoxProps> = ({ icon, value, label, color }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      px: 3,
      py: 2,
      borderRadius: 3,
      bgcolor: (theme) => alpha(theme.palette[color as 'error' | 'warning' | 'success'].main, 0.06),
      flex: 1,
      minWidth: 160,
      transition: 'all 0.2s',
      '&:hover': {
        bgcolor: (theme) =>
          alpha(theme.palette[color as 'error' | 'warning' | 'success'].main, 0.1),
        transform: 'translateY(-2px)',
      },
    }}
  >
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        bgcolor: (theme) =>
          alpha(theme.palette[color as 'error' | 'warning' | 'success'].main, 0.12),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h3" fontWeight={800} color={`${color}.main`} sx={{ lineHeight: 1 }}>
        {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: 'block' }}>
        {label}
      </Typography>
    </Box>
  </Box>
);

const GratitudePage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.04)} 0%, ${alpha(theme.palette.warning.main, 0.04)} 50%, ${alpha(theme.palette.error.light, 0.02)} 100%)`,
          borderRadius: 5,
          p: { xs: 2.5, md: 4 },
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.error.main, 0.3)}`,
              }}
            >
              <FavoriteRounded
                sx={{
                  fontSize: 24,
                  color: '#fff',
                  animation: `${pulseHeart} 2s ease-in-out infinite`,
                }}
              />
            </Box>
            <Box>
              <Typography variant="h2" fontWeight={800}>
                Благодарности
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Говори «спасибо» коллегам за их вклад
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="error"
            startIcon={<VolunteerActivism sx={{ fontSize: 18 }} />}
            onClick={() => setDialogOpen(true)}
            sx={{
              fontWeight: 700,
              px: 3,
              py: 1.25,
              borderRadius: 3,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
              boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.error.main, 0.35)}`,
              '&:hover': {
                boxShadow: (theme) => `0 6px 24px ${alpha(theme.palette.error.main, 0.45)}`,
                transform: 'translateY(-2px)',
              },
            }}
          >
            Сказать «спасибо»
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <StatBox
            icon={<FavoriteRounded sx={{ fontSize: 22, color: 'error.main' }} />}
            value={TOTAL}
            label="всего «спасибо»"
            color="error"
          />
          <StatBox
            icon={<TrendingUp sx={{ fontSize: 22, color: 'success.main' }} />}
            value={WEEKLY_COUNT}
            label="на этой неделе"
            color="success"
          />
          <StatBox
            icon={<WorkspacePremium sx={{ fontSize: 22, color: 'warning.main' }} />}
            value={MONTHLY_COUNT}
            label="за месяц"
            color="warning"
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
        <FormatQuote
          sx={{
            fontSize: 28,
            color: (theme) => alpha(theme.palette.error.main, 0.3),
            transform: 'rotate(180deg)',
          }}
        />
        <Typography variant="h4" fontWeight={800}>
          Лента благодарностей
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {MOCK_FEED.map((entry) => (
          <FeedCard key={entry.id} entry={entry} />
        ))}
      </Box>

      {dialogOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialogOpen(false);
          }}
        >
          <div className={styles.modalPanel}>
            <div className={styles.modalAccent} />

            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalIcon}>
                  <VolunteerActivism sx={{ color: '#ef4444', fontSize: 20 }} />
                </div>
                <div>
                  <p className={styles.modalTitle}>Сказать «спасибо»</p>
                  <p className={styles.modalSubtitle}>Выразите благодарность коллеге</p>
                </div>
              </div>
              <button
                className={styles.modalClose}
                onClick={() => setDialogOpen(false)}
                aria-label="Закрыть"
              >
                <Close sx={{ fontSize: 16 }} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <Autocomplete
                options={MOCK_EMPLOYEE_NAMES}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Кому"
                    placeholder="Начните вводить имя сотрудника"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ef4444',
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' },
                    }}
                  />
                )}
                freeSolo
              />
              <TextField
                label="Сообщение"
                placeholder="Напишите, за что вы благодарны..."
                fullWidth
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ef4444',
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' },
                }}
              />
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.modalCancelBtn} onClick={() => setDialogOpen(false)}>
                Отмена
              </button>
              <button className={styles.modalSubmitBtn} onClick={() => setDialogOpen(false)}>
                Отправить
                <Send className={styles.modalSubmitIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default GratitudePage;
