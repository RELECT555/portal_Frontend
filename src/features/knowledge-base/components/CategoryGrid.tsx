import React from 'react';
import { alpha } from '@mui/material/styles';
import {
  GavelRounded,
  AssignmentRounded,
  DescriptionRounded,
  ShieldRounded,
  SchoolRounded,
  HelpOutlineRounded,
  ArrowForwardRounded,
} from '@mui/icons-material';
import type { KBCategoryInfo, KBCategory } from '../types';
import styles from '../KnowledgeBasePage.module.scss';

const ICON_MAP: Record<string, React.ElementType> = {
  GavelRounded,
  AssignmentRounded,
  DescriptionRounded,
  ShieldRounded,
  SchoolRounded,
  HelpOutlineRounded,
};

interface Props {
  categories: KBCategoryInfo[];
  activeCategory: KBCategory;
  onCategoryChange: (cat: KBCategory) => void;
}

export const CategoryGrid: React.FC<Props> = React.memo(
  ({ categories, activeCategory, onCategoryChange }) => (
    <div className={styles.categoryGrid}>
      {categories.map((cat) => {
        const Icon = ICON_MAP[cat.icon];
        const isActive = activeCategory === cat.key;

        return (
          <div
            key={cat.key}
            className={`${styles.categoryCard} ${isActive ? styles.categoryCardActive : ''}`}
            style={{ ['--cat-color' as string]: cat.color }}
            onClick={() => onCategoryChange(isActive ? 'all' : cat.key)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCategoryChange(isActive ? 'all' : cat.key);
              }
            }}
          >
            <style>{`
              .${styles.categoryCard}[style*="--cat-color: ${cat.color}"]::before {
                background: linear-gradient(90deg, ${cat.color}, ${alpha(cat.color, 0.3)});
              }
            `}</style>

            <div className={styles.categoryCardTop}>
              <div
                className={styles.categoryCardIcon}
                style={{ background: alpha(cat.color, 0.08) }}
              >
                {Icon && <Icon sx={{ fontSize: 20, color: cat.color }} />}
              </div>
              <span className={styles.categoryCardCount}>{cat.count} док.</span>
            </div>

            <span className={styles.categoryCardLabel}>{cat.label}</span>
            <span className={styles.categoryCardDescription}>{cat.description}</span>

            <ArrowForwardRounded className={styles.categoryCardArrow} sx={{ fontSize: 16 }} />
          </div>
        );
      })}
    </div>
  ),
);
