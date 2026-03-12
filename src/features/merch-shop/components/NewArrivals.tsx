import React, { useCallback } from 'react';
import { Storefront as ProductIcon, Star as StarIcon } from '@mui/icons-material';
import { MERCH_CATEGORY_COLORS } from '../types';
import type { MerchProduct } from '../types';
import styles from '../MerchShopPage.module.scss';

interface Props {
  products: MerchProduct[];
  onProductClick: (product: MerchProduct) => void;
}

export const NewArrivals: React.FC<Props> = React.memo(({ products, onProductClick }) => {
  if (products.length === 0) return null;

  return (
    <div className={styles.arrivals}>
      <div className={styles.arrivalsSectionHeader}>
        <span className={styles.arrivalsDot} />
        <span className={styles.arrivalsLabel}>НОВЫЕ ПОСТУПЛЕНИЯ</span>
        <div className={styles.arrivalsLine} />
      </div>
      <div className={styles.arrivalsTrack}>
        {products.map((p) => (
          <ArrivalCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
    </div>
  );
});

NewArrivals.displayName = 'NewArrivals';

const ArrivalCard: React.FC<{ product: MerchProduct; onClick: (p: MerchProduct) => void }> =
  React.memo(({ product, onClick }) => {
    const catColor = MERCH_CATEGORY_COLORS[product.category];
    const handleClick = useCallback(() => onClick(product), [onClick, product]);

    return (
      <div className={styles.arrivalCard} onClick={handleClick}>
        <div
          className={styles.arrivalCardImage}
          style={{ background: `linear-gradient(145deg, ${catColor}18, ${catColor}08, #0c0e1a)` }}
        >
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className={styles.arrivalCardImg} />
          ) : (
            <ProductIcon sx={{ fontSize: 36, opacity: 0.12, color: catColor }} />
          )}
          {product.isNew && <span className={styles.arrivalCardNewBadge}>NEW</span>}
        </div>
        <div className={styles.arrivalCardInfo}>
          <span className={styles.arrivalCardName}>{product.name}</span>
          <div className={styles.arrivalCardBottom}>
            <span className={styles.arrivalCardPrice}>
              {product.priceCoins.toLocaleString('ru-RU')} ₿
            </span>
            <div className={styles.arrivalCardRating}>
              <StarIcon sx={{ fontSize: 11, color: '#fbbf24' }} />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  });

ArrivalCard.displayName = 'ArrivalCard';
