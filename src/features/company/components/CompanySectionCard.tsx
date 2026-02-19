import React from 'react';
import { Card } from '@mui/material';
import { ArrowForward as ArrowIcon, Business as BusinessIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { CompanySection } from '../types';
import styles from './CompanySectionCard.module.scss';

interface Props {
  section: CompanySection;
}

export const CompanySectionCard: React.FC<Props> = ({ section }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/company/${section.slug}`);
  };

  return (
    <Card className={styles.card} onClick={handleClick} elevation={0} variant="outlined">
      <div className={styles.imageWrapper}>
        {section.imageUrl ? (
          <img src={section.imageUrl} alt={section.title} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>
            <BusinessIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.6)' }} />
          </div>
        )}
        <div className={styles.imageOverlay} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{section.title}</h3>
        {section.description && <p className={styles.description}>{section.description}</p>}
      </div>

      <div className={styles.arrow}>
        <ArrowIcon sx={{ fontSize: 16 }} />
      </div>
    </Card>
  );
};
