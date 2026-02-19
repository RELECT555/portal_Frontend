import React from 'react';
import { Card } from '@mui/material';
import { ArrowForward as ArrowIcon } from '@mui/icons-material';
import type { CultureCard as CultureCardType } from '../types';
import styles from './CultureCard.module.scss';

const GRADIENT_COLORS = [
  'linear-gradient(135deg, #1b5e3b 0%, #4caf50 100%)',
  'linear-gradient(135deg, #0d47a1 0%, #42a5f5 100%)',
  'linear-gradient(135deg, #e65100 0%, #ff9800 100%)',
  'linear-gradient(135deg, #4a148c 0%, #ce93d8 100%)',
  'linear-gradient(135deg, #880e4f 0%, #f48fb1 100%)',
  'linear-gradient(135deg, #004d40 0%, #80cbc4 100%)',
  'linear-gradient(135deg, #bf360c 0%, #ffab91 100%)',
  'linear-gradient(135deg, #1a237e 0%, #9fa8da 100%)',
];

interface Props {
  card: CultureCardType;
  index: number;
}

export const CultureCardComponent: React.FC<Props> = ({ card, index }) => (
  <Card className={styles.card} elevation={0} variant="outlined">
    <div className={styles.imageWrapper}>
      {card.imageUrl ? (
        <img src={card.imageUrl} alt={card.title} className={styles.image} loading="lazy" />
      ) : (
        <div
          className={styles.imagePlaceholder}
          style={{ background: GRADIENT_COLORS[index % GRADIENT_COLORS.length] }}
        />
      )}
    </div>

    <div className={styles.content}>
      <h3 className={styles.title}>{card.title}</h3>
      {card.description && <p className={styles.description}>{card.description}</p>}
    </div>

    <div className={styles.arrow}>
      <ArrowIcon sx={{ fontSize: 16 }} />
    </div>
  </Card>
);
