import React, { useMemo } from 'react';
import { Breadcrumbs } from '@/components/shared';
import { CompanySectionCard } from './components/CompanySectionCard';
import { COMPANY_SECTIONS } from './companyData';
import styles from './CompanyPage.module.scss';

const CompanyPage: React.FC = () => {
  const sortedSections = useMemo(() => [...COMPANY_SECTIONS].sort((a, b) => a.order - b.order), []);

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Компания' }]} />

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
