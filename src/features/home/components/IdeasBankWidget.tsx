import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

export const IdeasBankWidget: React.FC = React.memo(() => (
  <Card
    sx={{
      height: '100%',
      borderLeft: (theme) => `4px solid ${theme.palette.secondary.main}`,
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
          width: 52,
          height: 52,
          borderRadius: '14px',
          bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <LightbulbIcon sx={{ fontSize: 26, color: 'secondary.dark' }} />
      </Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Банк Идей
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, maxWidth: 200 }}>
        Знаете, как улучшить работу? Поделитесь предложением!
      </Typography>
      <Button
        component={Link}
        to={ROUTES.IDEAS}
        variant="outlined"
        color="secondary"
        sx={{
          borderRadius: 10,
          px: 3,
          fontWeight: 600,
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.06),
          },
        }}
      >
        Предложить идею
      </Button>
    </CardContent>
  </Card>
));

IdeasBankWidget.displayName = 'IdeasBankWidget';
