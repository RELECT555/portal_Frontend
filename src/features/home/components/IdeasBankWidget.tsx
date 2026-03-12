import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Lightbulb as LightbulbIcon, TrendingUp, CheckCircleOutline } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

const MOCK_IDEAS_COUNT = 42;
const MOCK_IMPLEMENTED = 12;

export const IdeasBankWidget: React.FC = React.memo(() => (
  <Box
    sx={{
      height: '100%',
      borderRadius: 3,
      border: '1px solid',
      borderColor: alpha('#f59e0b', 0.1),
      background: `linear-gradient(160deg, ${alpha('#f59e0b', 0.04)} 0%, rgba(255,255,255,0.8) 100%)`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      p: 2.5,
      transition: 'all 0.2s ease',
      '&:hover': {
        boxShadow: `0 8px 28px -8px ${alpha('#f59e0b', 0.12)}`,
        borderColor: alpha('#f59e0b', 0.18),
      },
    }}
  >
    {/* Icon */}
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2.5,
        background: `linear-gradient(135deg, ${alpha('#f59e0b', 0.1)}, ${alpha('#f59e0b', 0.18)})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <LightbulbIcon sx={{ fontSize: 24, color: '#f59e0b' }} />
    </Box>

    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
      Банк Идей
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, maxWidth: 180 }}>
      Знаете, как улучшить работу? Поделитесь предложением!
    </Typography>

    {/* Mini stats */}
    <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <TrendingUp sx={{ fontSize: 14, color: '#f59e0b', opacity: 0.7 }} />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.675rem' }}>
          <Box component="span" sx={{ fontWeight: 700, color: '#f59e0b' }}>
            {MOCK_IDEAS_COUNT}
          </Box>{' '}
          за месяц
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <CheckCircleOutline sx={{ fontSize: 14, color: '#10b981', opacity: 0.7 }} />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.675rem' }}>
          <Box component="span" sx={{ fontWeight: 700, color: '#10b981' }}>
            {MOCK_IMPLEMENTED}
          </Box>{' '}
          внедрено
        </Typography>
      </Box>
    </Box>

    <Button
      component={Link}
      to={ROUTES.IDEAS}
      disableElevation
      variant="contained"
      sx={{
        borderRadius: 2.5,
        px: 2.5,
        py: 0.75,
        fontWeight: 600,
        fontSize: '0.8125rem',
        textTransform: 'none',
        bgcolor: '#f59e0b',
        color: '#fff',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: '#d97706',
          boxShadow: `0 4px 14px -2px ${alpha('#f59e0b', 0.4)}`,
        },
      }}
    >
      Предложить идею
    </Button>
  </Box>
));

IdeasBankWidget.displayName = 'IdeasBankWidget';
