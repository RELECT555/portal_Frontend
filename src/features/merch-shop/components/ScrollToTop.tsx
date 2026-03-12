import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';
import styles from '../MerchShopPage.module.scss';

interface Props {
  scrollContainer?: HTMLElement | null;
}

export const ScrollToTop: React.FC<Props> = React.memo(({ scrollContainer }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = scrollContainer || document.querySelector(`.${styles.fullscreen}`);
    if (!el) return;
    const handler = () => setVisible(el.scrollTop > 400);
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [scrollContainer]);

  const handleClick = useCallback((): void => {
    const el = scrollContainer || document.querySelector(`.${styles.fullscreen}`);
    el?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scrollContainer]);

  if (!visible) return null;

  return (
    <button className={styles.scrollTopBtn} onClick={handleClick}>
      <KeyboardArrowUp sx={{ fontSize: 22 }} />
    </button>
  );
});

ScrollToTop.displayName = 'ScrollToTop';
