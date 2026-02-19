import React, { useCallback, useMemo } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button, Divider } from '@mui/material';
import { FavoriteRounded, ArrowForward } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';
import type { GratitudeEntry } from '@/features/gratitude/types';

const VISIBLE_COUNT = 7;

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

interface EntryRowProps {
  entry: GratitudeEntry;
}

const EntryRow: React.FC<EntryRowProps> = React.memo(({ entry }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.25,
      py: 1,
      px: 0.75,
      mx: -0.75,
      borderRadius: 1,
      transition: 'background 0.15s',
      cursor: 'pointer',
      '&:hover': { bgcolor: (theme) => alpha(theme.palette.error.main, 0.04) },
    }}
  >
    <Avatar
      sx={{
        width: 30,
        height: 30,
        fontSize: '0.6rem',
        fontWeight: 700,
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
        color: 'error.main',
        flexShrink: 0,
      }}
    >
      {getInitials(entry.toName)}
    </Avatar>

    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="body2" fontWeight={600} noWrap>
        {entry.toName}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        noWrap
        sx={{ display: 'block', lineHeight: 1.3 }}
      >
        {entry.message}
      </Typography>
    </Box>

    <Typography
      variant="caption"
      color="text.disabled"
      sx={{ flexShrink: 0, whiteSpace: 'nowrap', fontSize: '0.65rem' }}
    >
      {formatDate(entry.createdAt)}
    </Typography>
  </Box>
));

export const GratitudeWidget: React.FC<Props> = React.memo(({ entries }) => {
  const navigate = useNavigate();
  const handleClick = useCallback((): void => {
    navigate(ROUTES.GRATITUDE);
  }, [navigate]);

  const visible = useMemo(() => entries.slice(0, VISIBLE_COUNT), [entries]);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FFF5F5 0%, #FFF0F6 100%)',
          px: 2,
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FavoriteRounded sx={{ fontSize: 14, color: '#fff' }} />
          </Box>
          <Typography variant="h4" fontWeight={700} sx={{ fontSize: '0.95rem' }}>
            Благодарности
          </Typography>
        </Box>
        <Typography
          component={Link}
          to={ROUTES.GRATITUDE}
          variant="caption"
          color="text.secondary"
          fontWeight={500}
          sx={{ fontSize: '0.7rem', textDecoration: 'none', '&:hover': { color: 'error.main' } }}
        >
          Все →
        </Typography>
      </Box>

      <CardContent
        sx={{ pt: 0.5, pb: '16px !important', flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {entries.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
            Пока нет благодарностей
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {visible.map((entry, idx) => (
              <React.Fragment key={entry.id}>
                <EntryRow entry={entry} />
                {idx < visible.length - 1 && <Divider sx={{ opacity: 0.4 }} />}
              </React.Fragment>
            ))}
          </Box>
        )}

        <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleClick}
            size="small"
            startIcon={<FavoriteRounded sx={{ fontSize: 14 }} />}
            endIcon={<ArrowForward sx={{ fontSize: 12 }} />}
            sx={{
              fontWeight: 600,
              fontSize: '0.8rem',
              py: 0.75,
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #dc2626, #ea580c)',
                boxShadow: '0 4px 14px rgba(239,68,68,0.3)',
              },
            }}
          >
            Сказать «спасибо»
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
});
