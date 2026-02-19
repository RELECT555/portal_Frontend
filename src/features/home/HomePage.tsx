import React, { useMemo } from 'react';
import {
  MainNewsWidget,
  NewsListWidget,
  CalendarWidget,
  PeopleCarousel,
  IdeasBankWidget,
  LiveWidget,
  VacanciesWidget,
  GratitudeWidget,
  LibraryWidget,
  KnowledgeBaseWidget,
} from './components';
import {
  MOCK_MAIN_NEWS,
  MOCK_NEWS,
  MOCK_BIRTHDAYS,
  MOCK_NEW_EMPLOYEES,
  MOCK_ANNIVERSARIES,
  MOCK_LIVE_PUBLICATIONS,
  MOCK_GRATITUDE_FEED,
  MOCK_VACANCIES,
  MOCK_BOOKS,
  MOCK_KB_DOCUMENTS,
} from './mockData';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const liveSlice = useMemo(() => MOCK_LIVE_PUBLICATIONS.slice(0, 2), []);

  return (
    <div className={styles.dashboard}>
      <section className={styles.topRow}>
        <MainNewsWidget news={MOCK_MAIN_NEWS} />
        <NewsListWidget news={MOCK_NEWS} />
        <CalendarWidget />
      </section>

      <PeopleCarousel
        birthdays={MOCK_BIRTHDAYS}
        newEmployees={MOCK_NEW_EMPLOYEES}
        anniversaries={MOCK_ANNIVERSARIES}
      />

      <section className={styles.ideasLiveRow}>
        <IdeasBankWidget />
        <LiveWidget publications={liveSlice} />
      </section>

      <section className={styles.twoCol}>
        <VacanciesWidget vacancies={MOCK_VACANCIES} />
        <GratitudeWidget entries={MOCK_GRATITUDE_FEED} />
      </section>

      <section className={styles.twoCol}>
        <LibraryWidget books={MOCK_BOOKS} />
        <KnowledgeBaseWidget documents={MOCK_KB_DOCUMENTS} />
      </section>
    </div>
  );
};

export default HomePage;
