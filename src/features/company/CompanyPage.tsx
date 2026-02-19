import React, { useMemo } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavigateNext as ChevronIcon } from '@mui/icons-material';
import { ROUTES } from '@/lib/constants';
import { CompanySectionCard } from './components/CompanySectionCard';
import { COMPANY_SECTIONS } from './companyData';
import styles from './CompanyPage.module.scss';

const CompanyPage: React.FC = () => {
  const sortedSections = useMemo(() => [...COMPANY_SECTIONS].sort((a, b) => a.order - b.order), []);

  return (
    <div className={styles.page}>
      <Breadcrumbs separator={<ChevronIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Typography
          component={Link}
          to={ROUTES.HOME}
          variant="body2"
          color="text.secondary"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          Главная
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight={500}>
          Компания
        </Typography>
      </Breadcrumbs>

      <div className={styles.header}>
        <h1 className={styles.title}>О Компании</h1>
        <p className={styles.subtitle}>
          Узнайте больше о МЕДИПАЛ — наша миссия, история, ценности и направления деятельности
        </p>
      </div>

      <div className={styles.grid}>
        {sortedSections.map((section) => (
          <CompanySectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default CompanyPage;
