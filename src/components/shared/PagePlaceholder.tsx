import React from 'react';
import { Box, Typography } from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';

interface Props {
  title: string;
  description?: string;
}

export const PagePlaceholder: React.FC<Props> = ({ title, description }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center',
      gap: 2,
    }}
  >
    <ConstructionIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
    <Typography variant="h2" color="text.primary">
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {description || 'Этот раздел находится в разработке'}
    </Typography>
  </Box>
);
