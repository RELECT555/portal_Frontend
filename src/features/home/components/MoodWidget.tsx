import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { MOOD_VALUES, MOOD_EMOJI, MOOD_LABELS } from '@/features/mood/types';

const ACCENT = '#8b5cf6';

export const MoodWidget: React.FC = React.memo(() => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      '&:hover': {
        boxShadow: `0 8px 30px ${alpha(ACCENT, 0.1)}`,
      },
    }}
  >
    <Box
      sx={{
        px: 2.5,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: `linear-gradient(135deg, ${alpha(ACCENT, 0.03)} 0%, transparent 100%)`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '10px',
            bgcolor: alpha(ACCENT, 0.08),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            flexShrink: 0,
          }}
        >
          😊
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ fontSize: '0.95rem', lineHeight: 1.2 }}>
            Настроение
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem' }}>
            Дневник эмоций
          </Typography>
        </Box>
      </Box>
      <Box
        component={Link}
        to={ROUTES.MOOD}
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
          color: ACCENT,
          bgcolor: alpha(ACCENT, 0.06),
          transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
          '&:hover': {
            bgcolor: alpha(ACCENT, 0.12),
            transform: 'translateX(2px)',
          },
        }}
      >
        Открыть
        <ArrowForward sx={{ fontSize: 11 }} />
      </Box>
    </Box>

    <CardContent
      sx={{
        pt: 2,
        pb: '12px !important',
        px: 2.5,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 2, lineHeight: 1.4 }}
      >
        Как вы себя чувствуете сегодня?
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        {MOOD_VALUES.map((mood) => (
          <Box
            key={mood}
            component={Link}
            to={ROUTES.MOOD}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 1,
              borderRadius: 2,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: alpha(ACCENT, 0.06),
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box sx={{ fontSize: '1.5rem', lineHeight: 1 }}>{MOOD_EMOJI[mood]}</Box>
            <Typography
              variant="caption"
              sx={{ color: 'text.disabled', fontSize: '0.6rem', fontWeight: 500 }}
            >
              {MOOD_LABELS[mood]}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 'auto', pt: 1 }}>
        <Button
          component={Link}
          to={ROUTES.MOOD}
          fullWidth
          variant="contained"
          disableElevation
          size="small"
          endIcon={<ArrowForward sx={{ fontSize: '11px !important' }} />}
          sx={{
            fontWeight: 600,
            fontSize: '0.78rem',
            py: 0.9,
            borderRadius: 2,
            textTransform: 'none',
            bgcolor: alpha(ACCENT, 0.08),
            color: ACCENT,
            '&:hover': {
              bgcolor: alpha(ACCENT, 0.14),
            },
          }}
        >
          Открыть дневник настроения
        </Button>
      </Box>
    </CardContent>
  </Card>
));

MoodWidget.displayName = 'MoodWidget';
