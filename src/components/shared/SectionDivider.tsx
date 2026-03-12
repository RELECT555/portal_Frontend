import React from 'react';
import styles from './SharedPage.module.scss';

interface Props {
  label: string;
  className?: string;
}

export const SectionDivider: React.FC<Props> = React.memo(({ label, className }) => (
  <div className={`${styles.sectionDivider} ${className ?? ''}`}>
    <div className={styles.sectionDividerLine} />
    <span className={styles.sectionDividerLabel}>{label}</span>
    <div className={styles.sectionDividerLine} />
  </div>
));
