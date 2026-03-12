import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';
import { ROUTES } from '@/lib/constants';
import { Breadcrumbs } from '@/components/shared';
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
      <Breadcrumbs items={[{ label: 'Компания', to: ROUTES.COMPANY }, { label: section.title }]} />

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
