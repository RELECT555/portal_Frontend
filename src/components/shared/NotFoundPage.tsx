import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SearchOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

export const NotFoundPage: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: 2,
      textAlign: 'center',
    }}
  >
    <SearchOff sx={{ fontSize: 56, color: 'text.secondary', opacity: 0.4 }} />
    <Typography variant="h1" fontWeight={800} color="text.primary">
      404
    </Typography>
    <Typography variant="h4" fontWeight={600} color="text.primary">
      Страница не найдена
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
      Запрашиваемая страница не существует или была перемещена.
    </Typography>
    <Button component={Link} to={ROUTES.HOME} variant="contained" color="primary" sx={{ mt: 1 }}>
      На главную
    </Button>
  </Box>
);
