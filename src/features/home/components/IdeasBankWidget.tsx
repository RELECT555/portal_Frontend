import React, { useCallback } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

export const IdeasBankWidget: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const handleClick = useCallback((): void => {
    navigate(ROUTES.IDEAS);
  }, [navigate]);

  return (
    <Card
      sx={{
        background: 'linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%)',
        border: '1px solid rgba(245, 166, 35, 0.2)',
        height: '100%',
        '&:hover': {
          borderColor: 'rgba(245, 166, 35, 0.4)',
          boxShadow: '0 8px 24px rgba(245, 166, 35, 0.15)',
        },
      }}
    >
      <CardContent
        sx={{
          textAlign: 'center',
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            background: 'rgba(245, 166, 35, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <LightbulbIcon sx={{ fontSize: 28, color: 'secondary.dark' }} />
        </Box>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Банк Идей
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, maxWidth: 200 }}>
          Знаете, как улучшить работу? Поделитесь предложением!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          sx={{ borderRadius: 10, px: 3, fontWeight: 600, color: '#fff' }}
        >
          Предложить идею
        </Button>
      </CardContent>
    </Card>
  );
});
