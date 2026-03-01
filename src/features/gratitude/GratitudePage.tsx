import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, TextField, Autocomplete, Tooltip } from '@mui/material';
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

const REACTION_EMOJIS = ['❤️', '👏', '🔥', '🙌', '⭐'];

const MOCK_FEED: GratitudeEntry[] = [
  {
    id: '1',
    fromName: 'Иванова Мария',
    toName: 'Ляхов Алексей Федорович',
    toPosition: 'Системный аналитик',
    message: 'Огромное спасибо за помощь с аналитикой по проекту — всё чётко и в срок!',
    createdAt: '2026-02-19',
    reactions: { '❤️': 5, '👏': 3 },
  },
  {
    id: '2',
    fromName: 'Петров Дмитрий',
    toName: 'Битяй Елена Анатольевна',
    toPosition: 'Специалист',
    message: 'Лена, спасибо что всегда готова помочь и объяснить — ты настоящий командный игрок.',
    createdAt: '2026-02-18',
    reactions: { '🔥': 2, '🙌': 4, '❤️': 1 },
  },
  {
    id: '3',
    fromName: 'Смирнова Ольга',
    toName: 'Костикова Дарья Евгеньевна',
    toPosition: 'Клиент-менеджер',
    message: 'Дарья, благодарю за отличную работу с клиентами — получила очень хорошие отзывы.',
    createdAt: '2026-02-18',
    reactions: { '⭐': 6 },
  },
  {
    id: '4',
    fromName: 'Борискин Иван',
    toName: 'Назаров Николай Андреевич',
    toPosition: 'Системный администратор',
    message: 'Коля, спасибо за оперативное решение проблемы с сервером — спас весь отдел!',
    createdAt: '2026-02-17',
    reactions: { '🔥': 8, '👏': 3, '❤️': 2 },
  },
  {
    id: '5',
    fromName: 'Козлова Анна',
    toName: 'Тарасов Сергей Анатольевич',
    toPosition: 'Менеджер интернет-продаж',
    message: 'Сергей, спасибо за помощь с обучением — очень доступно и терпеливо объяснил.',
    createdAt: '2026-02-17',
    reactions: { '❤️': 3, '🙌': 1 },
  },
];

const TOTAL = 1168;
const WEEKLY_COUNT = 42;
const MONTHLY_COUNT = 187;

const pulseHeart = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
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
  reactions: Record<string, number>;
  activeReactions: Set<string>;
  onReact: (emoji: string) => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ entry, reactions, activeReactions, onReact }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: '#fff',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.06)',
        transition: 'all 0.25s ease',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 28px -8px ${alpha('#ef4444', 0.12)}, 0 2px 8px -2px rgba(0,0,0,0.06)`,
          borderColor: alpha('#ef4444', 0.15),
        },
      }}
    >
      <Box sx={{ p: 2.5 }}>
        {/* Quote bubble */}
        <Box
          sx={{
            bgcolor: alpha('#ef4444', 0.03),
            borderRadius: 2.5,
            px: 2.5,
            py: 2,
            mb: 2,
            position: 'relative',
            borderLeft: `2px solid ${alpha('#ef4444', 0.15)}`,
          }}
        >
          <FormatQuote
            sx={{
              fontSize: 28,
              color: alpha('#ef4444', 0.1),
              position: 'absolute',
              top: 6,
              right: 10,
              transform: 'rotate(180deg)',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.primary',
              fontSize: '0.875rem',
              position: 'relative',
            }}
          >
            {entry.message}
          </Typography>
        </Box>

        {/* Reactions row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2, flexWrap: 'wrap' }}>
          {Object.entries(reactions).map(([emoji, count]) => (
            <Box
              key={emoji}
              onClick={() => onReact(emoji)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.375,
                borderRadius: 2,
                fontSize: '0.75rem',
                cursor: 'pointer',
                userSelect: 'none',
                bgcolor: activeReactions.has(emoji) ? alpha('#ef4444', 0.1) : 'rgba(0,0,0,0.03)',
                border: '1px solid',
                borderColor: activeReactions.has(emoji) ? alpha('#ef4444', 0.25) : 'transparent',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: activeReactions.has(emoji) ? alpha('#ef4444', 0.14) : 'rgba(0,0,0,0.06)',
                },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              <span style={{ fontSize: '0.8rem', lineHeight: 1 }}>{emoji}</span>
              <Typography
                component="span"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: activeReactions.has(emoji) ? 600 : 500,
                  color: activeReactions.has(emoji) ? '#ef4444' : 'text.secondary',
                  lineHeight: 1,
                }}
              >
                {count}
              </Typography>
            </Box>
          ))}

          {/* Add reaction button */}
          <Box sx={{ position: 'relative' }}>
            <Tooltip title="Добавить реакцию" arrow>
              <Box
                onClick={() => setPickerOpen((v) => !v)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 26,
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor: pickerOpen ? 'rgba(0,0,0,0.06)' : 'transparent',
                  color: 'text.disabled',
                  fontSize: '0.85rem',
                  transition: 'all 0.15s ease',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' },
                }}
              >
                +
              </Box>
            </Tooltip>

            {/* Emoji picker */}
            {pickerOpen && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '100%',
                  left: 0,
                  mb: 0.5,
                  display: 'flex',
                  gap: 0.25,
                  bgcolor: '#fff',
                  borderRadius: 2.5,
                  px: 0.75,
                  py: 0.5,
                  boxShadow: '0 4px 20px -4px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
                  zIndex: 10,
                }}
              >
                {REACTION_EMOJIS.map((emoji) => (
                  <Box
                    key={emoji}
                    onClick={() => {
                      onReact(emoji);
                      setPickerOpen(false);
                    }}
                    sx={{
                      width: 30,
                      height: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      fontSize: '1rem',
                      transition: 'all 0.12s ease',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.05)',
                        transform: 'scale(1.2)',
                      },
                      '&:active': { transform: 'scale(0.9)' },
                    }}
                  >
                    {emoji}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Author row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: alpha('#ef4444', 0.08),
                color: '#ef4444',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              {getInitials(entry.fromName)}
            </Avatar>
            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ display: 'block', lineHeight: 1.3 }}
              >
                {entry.fromName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VolunteerActivism sx={{ fontSize: 11, color: alpha('#ef4444', 0.5) }} />
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', fontSize: '0.675rem', lineHeight: 1.2 }}
                >
                  {entry.toName} · {entry.toPosition}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: 'text.disabled', fontSize: '0.675rem', flexShrink: 0, ml: 1 }}
          >
            {formatDate(entry.createdAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

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
      gap: 1.5,
      px: 2.5,
      py: 2,
      borderRadius: 3,
      bgcolor: 'rgba(255,255,255,0.65)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid',
      borderColor: alpha(color, 0.1),
      flex: 1,
      minWidth: 160,
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: 'rgba(255,255,255,0.85)',
        boxShadow: `0 4px 16px -4px ${alpha(color, 0.12)}`,
      },
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2.5,
        bgcolor: alpha(color, 0.08),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1, color }}>
        {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', mt: 0.25, display: 'block', fontSize: '0.7rem' }}
      >
        {label}
      </Typography>
    </Box>
  </Box>
);

const GratitudePage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Reactions state: { entryId: { emoji: count } }
  const [reactionsMap, setReactionsMap] = useState<Record<string, Record<string, number>>>(() => {
    const init: Record<string, Record<string, number>> = {};
    MOCK_FEED.forEach((e) => {
      init[e.id] = { ...(e.reactions ?? {}) };
    });
    return init;
  });

  // Track which emojis the current user toggled
  const [myReactions, setMyReactions] = useState<Record<string, Set<string>>>(() => {
    const init: Record<string, Set<string>> = {};
    MOCK_FEED.forEach((e) => {
      init[e.id] = new Set();
    });
    return init;
  });

  const handleReact = (entryId: string, emoji: string): void => {
    setReactionsMap((prev) => {
      const entry = { ...prev[entryId] };
      const isActive = myReactions[entryId]?.has(emoji);
      if (isActive) {
        entry[emoji] = Math.max((entry[emoji] ?? 1) - 1, 0);
        if (entry[emoji] === 0) delete entry[emoji];
      } else {
        entry[emoji] = (entry[emoji] ?? 0) + 1;
      }
      return { ...prev, [entryId]: entry };
    });

    setMyReactions((prev) => {
      const set = new Set(prev[entryId]);
      if (set.has(emoji)) {
        set.delete(emoji);
      } else {
        set.add(emoji);
      }
      return { ...prev, [entryId]: set };
    });
  };

  const leftColumn = MOCK_FEED.filter((_, i) => i % 2 === 0);
  const rightColumn = MOCK_FEED.filter((_, i) => i % 2 === 1);

  return (
    <Box>
      {/* ─── Header ─── */}
      <Box
        sx={{
          borderRadius: 4,
          p: { xs: 2.5, md: 3.5 },
          mb: 3,
          background: `linear-gradient(135deg, ${alpha('#ef4444', 0.03)} 0%, ${alpha('#f59e0b', 0.03)} 100%)`,
          border: '1px solid',
          borderColor: alpha('#ef4444', 0.06),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2.5,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                background: `linear-gradient(135deg, ${alpha('#ef4444', 0.1)}, ${alpha('#ef4444', 0.16)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FavoriteRounded
                sx={{
                  fontSize: 22,
                  color: '#ef4444',
                  animation: `${pulseHeart} 2.5s ease-in-out infinite`,
                }}
              />
            </Box>
            <Box>
              <Typography variant="h3" fontWeight={700} sx={{ letterSpacing: '-0.01em' }}>
                Благодарности
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Говори «спасибо» коллегам за их вклад
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            disableElevation
            startIcon={<VolunteerActivism sx={{ fontSize: 18 }} />}
            onClick={() => setDialogOpen(true)}
            sx={{
              fontWeight: 600,
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              fontSize: '0.8125rem',
              bgcolor: '#ef4444',
              color: '#fff',
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#dc2626',
                boxShadow: `0 4px 14px -2px ${alpha('#ef4444', 0.4)}`,
              },
            }}
          >
            Сказать «спасибо»
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <StatBox
            icon={<FavoriteRounded sx={{ fontSize: 20, color: '#ef4444' }} />}
            value={TOTAL}
            label="всего «спасибо»"
            color="#ef4444"
          />
          <StatBox
            icon={<TrendingUp sx={{ fontSize: 20, color: '#10b981' }} />}
            value={WEEKLY_COUNT}
            label="на этой неделе"
            color="#10b981"
          />
          <StatBox
            icon={<WorkspacePremium sx={{ fontSize: 20, color: '#f59e0b' }} />}
            value={MONTHLY_COUNT}
            label="за месяц"
            color="#f59e0b"
          />
        </Box>
      </Box>

      {/* ─── Feed title ─── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <FormatQuote
          sx={{
            fontSize: 22,
            color: alpha('#ef4444', 0.35),
            transform: 'rotate(180deg)',
          }}
        />
        <Typography
          variant="body2"
          fontWeight={600}
          color="text.secondary"
          sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}
        >
          Лента благодарностей
        </Typography>
      </Box>

      {/* ─── Masonry 2-column grid ─── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
          alignItems: 'start',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {leftColumn.map((entry) => (
            <FeedCard
              key={entry.id}
              entry={entry}
              reactions={reactionsMap[entry.id] ?? {}}
              activeReactions={myReactions[entry.id] ?? new Set()}
              onReact={(emoji) => handleReact(entry.id, emoji)}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: { md: 3 } }}>
          {rightColumn.map((entry) => (
            <FeedCard
              key={entry.id}
              entry={entry}
              reactions={reactionsMap[entry.id] ?? {}}
              activeReactions={myReactions[entry.id] ?? new Set()}
              onReact={(emoji) => handleReact(entry.id, emoji)}
            />
          ))}
        </Box>
      </Box>

      {/* ─── Modal ─── */}
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
