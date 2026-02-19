import React from 'react';
import { Breadcrumbs, Typography, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavigateNext as ChevronIcon } from '@mui/icons-material';
import { ROUTES } from '@/lib/constants';
import { CultureCardComponent } from './components';
import { CULTURE_SECTIONS, CULTURE_AUTHOR } from './cultureData';
import styles from './CulturePage.module.scss';

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

const CulturePage: React.FC = () => (
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

      <div className={styles.authorRow}>
        <Avatar
          src={CULTURE_AUTHOR.avatarUrl}
          sx={{ width: 44, height: 44, bgcolor: 'primary.main' }}
        >
          {getInitials(CULTURE_AUTHOR.fullName)}
        </Avatar>
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{CULTURE_AUTHOR.fullName}</span>
          <span className={styles.authorPosition}>{CULTURE_AUTHOR.position}</span>
        </div>
      </div>
    </div>

    {CULTURE_SECTIONS.map((section) => (
      <div key={section.id} className={styles.section}>
        <h2 className={styles.sectionTitle}>{section.title}</h2>
        <div className={styles.grid}>
          {section.cards
            .sort((a, b) => a.order - b.order)
            .map((card, index) => (
              <CultureCardComponent key={card.id} card={card} index={index} />
            ))}
        </div>
      </div>
    ))}
  </div>
);

export default CulturePage;
