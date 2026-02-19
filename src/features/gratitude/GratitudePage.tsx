import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import { FavoriteRounded, EmojiEvents, Send, FormatQuote } from '@mui/icons-material';
import type { GratitudeTop, GratitudeEntry } from './types';

// ── Mock data ──────────────────────────────────────────────────────────────────

const MOCK_TOP: GratitudeTop[] = [
  {
    id: '1',
    fullName: 'Ляхов Алексей Федорович',
    position: 'Системный аналитик',
    receivedCount: 34,
  },
  { id: '2', fullName: 'Битяй Елена Анатольевна', position: 'Специалист', receivedCount: 28 },
  {
    id: '3',
    fullName: 'Костикова Дарья Евгеньевна',
    position: 'Клиент-менеджер',
    receivedCount: 21,
  },
  {
    id: '4',
    fullName: 'Назаров Николай Андреевич',
    position: 'Системный администратор',
    receivedCount: 17,
  },
  {
    id: '5',
    fullName: 'Тарасов Сергей Анатольевич',
    position: 'Менеджер интернет-продаж',
    receivedCount: 14,
  },
];

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

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const TOTAL = 1168;

// ── Helpers ────────────────────────────────────────────────────────────────────

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

// ── Sub-components ─────────────────────────────────────────────────────────────

const TopCard: React.FC<{ person: GratitudeTop; rank: number }> = ({ person, rank }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      py: 1.25,
      px: 1,
      mx: -1,
      borderRadius: 1.5,
      transition: 'background 0.15s',
      cursor: 'pointer',
      '&:hover': { background: 'rgba(0,0,0,0.03)' },
    }}
  >
    <Typography
      fontWeight={800}
      sx={{ minWidth: 22, color: MEDAL_COLORS[rank - 1] ?? 'text.disabled', fontSize: '1rem' }}
    >
      {rank}
    </Typography>
    <Avatar
      sx={{ width: 40, height: 40, bgcolor: 'primary.light', fontSize: '0.8rem', flexShrink: 0 }}
    >
      {getInitials(person.fullName)}
    </Avatar>
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography variant="body2" fontWeight={600} noWrap>
        {person.fullName}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap>
        {person.position}
      </Typography>
    </Box>
    {person.receivedCount !== undefined && (
      <Chip
        label={person.receivedCount}
        size="small"
        icon={
          <FavoriteRounded sx={{ fontSize: '12px !important', color: 'error.main !important' }} />
        }
        sx={{
          fontWeight: 700,
          fontSize: '0.7rem',
          bgcolor: 'transparent',
          border: '1px solid',
          borderColor: 'error.light',
          color: 'error.main',
        }}
      />
    )}
  </Box>
);

const FeedCard: React.FC<{ entry: GratitudeEntry }> = ({ entry }) => (
  <Card variant="outlined" sx={{ transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Avatar
          sx={{ width: 38, height: 38, bgcolor: 'error.light', fontSize: '0.75rem', flexShrink: 0 }}
        >
          {getInitials(entry.toName)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              mb: 0.25,
            }}
          >
            <Typography variant="body2" fontWeight={700} noWrap>
              {entry.toName}
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
              {formatDate(entry.createdAt)}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            {entry.toPosition}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'flex-start' }}>
            <FormatQuote sx={{ fontSize: 18, color: 'error.light', mt: 0.25, flexShrink: 0 }} />
            <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
              {entry.message}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
            от {entry.fromName}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// ── Page ───────────────────────────────────────────────────────────────────────

const GratitudePage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box>
      {/* Page header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FavoriteRounded sx={{ fontSize: 28, color: 'error.main' }} />
          <Typography variant="h2" fontWeight={700}>
            Благодарности
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          startIcon={<FavoriteRounded sx={{ fontSize: 16 }} />}
          onClick={() => setDialogOpen(true)}
          sx={{ fontWeight: 600 }}
        >
          Сказать «спасибо»
        </Button>
      </Box>

      {/* Stats bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ py: '12px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
              <Typography variant="h2" color="error.main" fontWeight={800} sx={{ lineHeight: 1 }}>
                {TOTAL.toLocaleString('ru-RU')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                «спасибо» сказано всего
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
              <Typography variant="h4" fontWeight={700}>
                {MOCK_FEED.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                на этой неделе
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Left: Top */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ position: 'sticky', top: 16 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                <EmojiEvents sx={{ fontSize: 18, color: 'warning.main' }} />
                <Typography variant="h4" fontWeight={700}>
                  Топ недели
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {MOCK_TOP.map((person, idx) => (
                  <React.Fragment key={person.id}>
                    <TopCard person={person} rank={idx + 1} />
                    {idx < MOCK_TOP.length - 1 && <Divider sx={{ opacity: 0.4 }} />}
                  </React.Fragment>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right: Feed */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            Лента благодарностей
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {MOCK_FEED.map((entry) => (
              <FeedCard key={entry.id} entry={entry} />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Say thanks dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FavoriteRounded sx={{ color: 'error.main', fontSize: 20 }} />
          Сказать «спасибо»
        </DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}
        >
          <TextField
            label="Кому"
            placeholder="Начните вводить имя сотрудника"
            fullWidth
            size="small"
          />
          <TextField
            label="Сообщение"
            placeholder="Напишите, за что вы благодарны..."
            fullWidth
            multiline
            rows={4}
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Отмена
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<Send sx={{ fontSize: 16 }} />}
            onClick={() => setDialogOpen(false)}
            sx={{ fontWeight: 600 }}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GratitudePage;
