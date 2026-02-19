import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
);
