import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { AnnouncementTicker } from './AnnouncementTicker';
import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => (
  <div className={styles.layout}>
    <Header />
    <AnnouncementTicker />
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
);
