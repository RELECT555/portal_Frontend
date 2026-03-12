import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Typography, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { NavigateNext, HomeRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <Box sx={{ mb: 2.5 }}>
    <Box
      component="nav"
      aria-label="breadcrumb"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.75),
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.divider, 0.12),
        borderRadius: '12px',
        px: 1.5,
        py: 0.75,
        boxShadow: (theme) =>
          `0 1px 3px ${alpha(theme.palette.common.black, 0.04)}, 0 0 0 0.5px ${alpha(theme.palette.divider, 0.06)}`,
      }}
    >
      <MuiBreadcrumbs
        separator={
          <NavigateNext
            sx={{
              fontSize: 15,
              color: (theme) => alpha(theme.palette.text.secondary, 0.4),
            }}
          />
        }
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: 0,
          },
          '& .MuiBreadcrumbs-separator': {
            mx: 0.25,
          },
          '& .MuiBreadcrumbs-li': {
            lineHeight: 1,
          },
        }}
      >
        {/* Home */}
        <Typography
          component={Link}
          to={ROUTES.HOME}
          variant="body2"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.8125rem',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            borderRadius: '8px',
            px: 0.75,
            py: 0.375,
            transition: 'all 0.15s ease',
            '&:hover': {
              color: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.07),
            },
          }}
        >
          <HomeRounded sx={{ fontSize: 15, opacity: 0.85 }} />
          Главная
        </Typography>

        {/* Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast || !item.to) {
            return (
              <Typography
                key={item.label}
                variant="body2"
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  color: 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 260,
                  px: 0.75,
                  py: 0.375,
                }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Typography
              key={item.label}
              component={Link}
              to={item.to}
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                borderRadius: '8px',
                px: 0.75,
                py: 0.375,
                transition: 'all 0.15s ease',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.07),
                },
              }}
            >
              {item.label}
            </Typography>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  </Box>
);
