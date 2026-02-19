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
      <div className={styles.heroNews}>
        <MainNewsWidget news={MOCK_MAIN_NEWS} />
      </div>
      <div className={styles.newsList}>
        <NewsListWidget news={MOCK_NEWS} />
      </div>
      <div className={styles.calendar}>
        <CalendarWidget />
      </div>

      <div className={styles.ideasBank}>
        <IdeasBankWidget />
      </div>
      <div className={styles.peopleCarousel}>
        <PeopleCarousel
          birthdays={MOCK_BIRTHDAYS}
          newEmployees={MOCK_NEW_EMPLOYEES}
          anniversaries={MOCK_ANNIVERSARIES}
        />
      </div>

      <div className={styles.liveWidget}>
        <LiveWidget publications={liveSlice} />
      </div>
      <div className={styles.gratitudeWidget}>
        <GratitudeWidget entries={MOCK_GRATITUDE_FEED} />
      </div>

      <div className={styles.vacanciesWidget}>
        <VacanciesWidget vacancies={MOCK_VACANCIES} />
      </div>
      <div className={styles.libraryWidget}>
        <LibraryWidget books={MOCK_BOOKS} />
      </div>

      <div className={styles.knowledgeBase}>
        <KnowledgeBaseWidget documents={MOCK_KB_DOCUMENTS} />
      </div>
    </div>
  );
};

export default HomePage;
