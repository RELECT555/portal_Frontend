import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CalendarMonth as CalendarIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import dayjs from 'dayjs';

export const CalendarWidget: React.FC = React.memo(() => {
  const today = dayjs();

  return (
    <Card
      sx={{
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CardContent sx={{ py: 3 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 1.5,
          }}
        >
          <CalendarIcon sx={{ fontSize: 20, color: 'primary.main' }} />
        </Box>
        <Typography
          fontWeight={800}
          color="primary.main"
          sx={{
            fontSize: '2.75rem',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {today.format('DD')}
        </Typography>
        <Typography
          fontWeight={500}
          sx={{ fontSize: '1.1rem', textTransform: 'capitalize', mt: 0.5, color: 'text.primary' }}
        >
          {today.format('MMMM')}
        </Typography>
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.12),
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              textTransform: 'capitalize',
              color: 'text.secondary',
              letterSpacing: '0.02em',
            }}
          >
            {today.format('dddd')}
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
            {today.format('YYYY')} г.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

CalendarWidget.displayName = 'CalendarWidget';
