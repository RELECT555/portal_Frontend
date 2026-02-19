import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CalendarMonth as CalendarIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const CalendarWidget: React.FC = React.memo(() => {
  const today = dayjs();

  return (
    <Card
      sx={{
        background: '#ffffff',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CardContent sx={{ py: 3 }}>
        <CalendarIcon sx={{ fontSize: 28, color: 'primary.main', opacity: 0.8, mb: 0.5 }} />
        <Typography
          fontWeight={800}
          sx={{
            fontSize: '2.75rem',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'text.primary',
          }}
        >
          {today.format('DD')}
        </Typography>
        <Typography
          fontWeight={500}
          sx={{ fontSize: '1.1rem', textTransform: 'capitalize', mt: 0.5, color: 'primary.main' }}
        >
          {today.format('MMMM')}
        </Typography>
        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {today.format('dddd')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});
