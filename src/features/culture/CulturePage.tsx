import React, { useMemo } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavigateNext as ChevronIcon } from '@mui/icons-material';
import { ROUTES } from '@/lib/constants';
import { CultureCardComponent } from './components';
import { CULTURE_SECTIONS } from './cultureData';
import styles from './CulturePage.module.scss';

const CulturePage: React.FC = () => {
  const sortedSections = useMemo(
    () =>
      CULTURE_SECTIONS.map((section) => ({
        ...section,
        cards: [...section.cards].sort((a, b) => a.order - b.order),
      })),
    [],
  );

  return (
    <div className={styles.page}>
      <Breadcrumbs separator={<ChevronIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Typography
          component={Link}
          to={ROUTES.HOME}
          variant="body2"
          color="primary"
          sx={{ '&:hover': { textDecoration: 'underline' } }}
        >
          Главная
        </Typography>
        <Typography variant="body2" color="primary" fontWeight={500}>
          Корпоративная культура
        </Typography>
      </Breadcrumbs>

      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Корпоративная культура</h1>
      </div>

      {sortedSections.map((section) => (
        <div key={section.id} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <div className={styles.grid}>
            {section.cards.map((card, index) => (
              <CultureCardComponent key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CulturePage;
