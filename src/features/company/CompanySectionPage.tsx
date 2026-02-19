import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs, Typography, Box } from '@mui/material';
import { NavigateNext as ChevronIcon, Construction as ConstructionIcon } from '@mui/icons-material';
import { ROUTES } from '@/lib/constants';
import { COMPANY_SECTIONS } from './companyData';

const CompanySectionPage: React.FC = () => {
  const { section: sectionSlug } = useParams<{ section: string }>();

  const section = useMemo(
    () => COMPANY_SECTIONS.find((s) => s.slug === sectionSlug),
    [sectionSlug],
  );

  if (!section) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4">Раздел не найден</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Breadcrumbs separator={<ChevronIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Typography
          component={Link}
          to={ROUTES.HOME}
          variant="body2"
          color="text.secondary"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          Главная
        </Typography>
        <Typography
          component={Link}
          to={ROUTES.COMPANY}
          variant="body2"
          color="text.secondary"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          Компания
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight={500}>
          {section.title}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h1" sx={{ mb: 2 }}>
        {section.title}
      </Typography>

      {section.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
          {section.description}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 8,
          gap: 2,
          backgroundColor: 'background.paper',
          borderRadius: 3,
        }}
      >
        <ConstructionIcon sx={{ fontSize: 56, color: 'text.secondary' }} />
        <Typography variant="body1" color="text.secondary">
          Контент раздела в разработке
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanySectionPage;
