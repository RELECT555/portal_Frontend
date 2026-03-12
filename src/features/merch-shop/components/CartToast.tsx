import React, { useEffect } from 'react';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import styles from '../MerchShopPage.module.scss';

interface Props {
  productName: string | null;
  onDone: () => void;
}

export const CartToast: React.FC<Props> = React.memo(({ productName, onDone }) => {
  useEffect(() => {
    if (!productName) return;
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [productName, onDone]);

  if (!productName) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.toastIcon}>
        <CartIcon sx={{ fontSize: 16 }} />
      </div>
      <div className={styles.toastContent}>
        <span className={styles.toastTitle}>Добавлено в корзину</span>
        <span className={styles.toastProduct}>{productName}</span>
      </div>
      <div className={styles.toastProgress} />
    </div>
  );
});

CartToast.displayName = 'CartToast';
