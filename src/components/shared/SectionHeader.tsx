import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Props {
  title?: string;
  titleNode?: React.ReactNode;
  linkText?: string;
  linkTo?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<Props> = ({ title, titleNode, linkText, linkTo, action }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
    {titleNode ?? (
      <Typography variant="h4" component="h2" fontWeight={700}>
        {title}
      </Typography>
    )}
    {linkText && linkTo && (
      <Typography
        component={Link}
        to={linkTo}
        variant="caption"
        color="primary"
        sx={{
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          transition: 'gap 0.2s',
          '&:hover': { gap: 1 },
        }}
      >
        {linkText}
        <ArrowForward sx={{ fontSize: 14 }} />
      </Typography>
    )}
    {action}
  </Box>
);
