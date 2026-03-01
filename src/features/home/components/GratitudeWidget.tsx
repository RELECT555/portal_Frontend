import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button } from '@mui/material';
import { FavoriteRounded, ArrowForward } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import type { GratitudeEntry } from '@/features/gratitude/types';

const VISIBLE_COUNT = 5;

interface Props {
  entries: GratitudeEntry[];
}

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((p) => p.charAt(0))
    .join('')
    .toUpperCase();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

const AVATAR_COLORS = ['#f472b6', '#fb923c', '#a78bfa', '#34d399', '#60a5fa', '#fbbf24', '#f87171'];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface EntryRowProps {
  entry: GratitudeEntry;
}

const EntryRow: React.FC<EntryRowProps> = React.memo(({ entry }) => {
  const avatarColor = getAvatarColor(entry.toName);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        py: 1.25,
        px: 1.5,
        mx: -1.5,
        borderRadius: 2,
        transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.error.main, 0.03),
          transform: 'translateX(4px)',
        },
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          fontSize: '0.7rem',
          fontWeight: 700,
          bgcolor: alpha(avatarColor, 0.12),
          color: avatarColor,
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {getInitials(entry.toName)}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 650,
              fontSize: '0.8rem',
              color: 'text.primary',
              lineHeight: 1.3,
            }}
            noWrap
          >
            {entry.toName}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
              fontSize: '0.625rem',
              flexShrink: 0,
              fontWeight: 500,
            }}
          >
            {formatDate(entry.createdAt)}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            color: 'text.secondary',
            lineHeight: 1.4,
            fontSize: '0.73rem',
            fontStyle: 'italic',
            '&::before': { content: '"«"' },
            '&::after': { content: '"»"' },
          }}
          noWrap
        >
          {entry.message}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            color: 'text.disabled',
            fontSize: '0.65rem',
            mt: 0.25,
          }}
        >
          от {entry.fromName}
        </Typography>
      </Box>
    </Box>
  );
});

export const GratitudeWidget: React.FC<Props> = React.memo(({ entries }) => {
  const visible = useMemo(() => entries.slice(0, VISIBLE_COUNT), [entries]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        '&:hover': {
          boxShadow: (theme) => `0 8px 30px ${alpha(theme.palette.error.main, 0.08)}`,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.02)} 0%, transparent 100%)`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FavoriteRounded sx={{ fontSize: 16, color: 'error.main' }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ fontSize: '0.95rem', lineHeight: 1.2 }}>
              Благодарности
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem' }}>
              {entries.length} {entries.length === 1 ? 'запись' : 'записей'}
            </Typography>
          </Box>
        </Box>
        <Box
          component={Link}
          to={ROUTES.GRATITUDE}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.25,
            py: 0.4,
            borderRadius: '20px',
            fontSize: '0.68rem',
            fontWeight: 600,
            textDecoration: 'none',
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.06),
            transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.12),
              transform: 'translateX(2px)',
            },
          }}
        >
          Все
          <ArrowForward sx={{ fontSize: 11 }} />
        </Box>
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          pt: 1,
          pb: '12px !important',
          px: 2.5,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {entries.length === 0 ? (
          <Box
            sx={{
              py: 4,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <FavoriteRounded sx={{ fontSize: 32, color: 'text.disabled', opacity: 0.3 }} />
            <Typography variant="body2" color="text.secondary">
              Пока нет благодарностей
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              gap: 0.25,
            }}
          >
            {visible.map((entry) => (
              <EntryRow key={entry.id} entry={entry} />
            ))}
          </Box>
        )}

        {/* Footer button */}
        <Box sx={{ mt: 'auto', pt: 1.5 }}>
          <Button
            component={Link}
            to={ROUTES.GRATITUDE}
            fullWidth
            variant="contained"
            disableElevation
            size="small"
            startIcon={<FavoriteRounded sx={{ fontSize: '14px !important' }} />}
            endIcon={<ArrowForward sx={{ fontSize: '11px !important' }} />}
            sx={{
              fontWeight: 600,
              fontSize: '0.78rem',
              py: 0.9,
              borderRadius: 2,
              textTransform: 'none',
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              color: 'error.main',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.14),
              },
            }}
          >
            Сказать &laquo;спасибо&raquo;
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
});

EntryRow.displayName = 'EntryRow';
GratitudeWidget.displayName = 'GratitudeWidget';
