import React, { useMemo } from 'react';
import { Breadcrumbs } from '@/components/shared';
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
      <Breadcrumbs items={[{ label: 'Корпоративная культура' }]} />

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
