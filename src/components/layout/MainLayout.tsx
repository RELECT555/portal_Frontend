import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { MobileSidebar } from './MobileSidebar';
import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => (
  <div className={styles.layout}>
    <Header />
    <MobileSidebar />
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
);
