import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  Star as StarIcon,
  ShoppingCart as CartIcon,
  Storefront as ProductIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { MERCH_CATEGORY_LABELS, MERCH_CATEGORY_COLORS } from '../types';
import type { MerchProduct } from '../types';
import styles from '../MerchShopPage.module.scss';

interface Props {
  product: MerchProduct;
  onClick?: (product: MerchProduct) => void;
  onQuickBuy?: (product: MerchProduct) => void;
}

const COVER_GRADIENTS = [
  'linear-gradient(145deg, #0c1929 0%, #0a1628 50%, #111827 100%)',
  'linear-gradient(145deg, #0f1a2e 0%, #1a0f2e 50%, #0d1117 100%)',
  'linear-gradient(145deg, #0d1f1a 0%, #0a1a14 50%, #111817 100%)',
  'linear-gradient(145deg, #1a0f1f 0%, #150a1a 50%, #110d17 100%)',
  'linear-gradient(145deg, #0f1629 0%, #0f0c24 50%, #0d1117 100%)',
  'linear-gradient(145deg, #191207 0%, #1a1508 50%, #17150d 100%)',
];

export const ProductCard: React.FC<Props> = React.memo(({ product, onClick, onQuickBuy }) => {
  const gradient = COVER_GRADIENTS[parseInt(product.id, 10) % COVER_GRADIENTS.length];
  const catColor = MERCH_CATEGORY_COLORS[product.category];
  const hasDiscount = product.oldPriceCoins && product.oldPriceCoins > product.priceCoins;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.priceCoins / product.oldPriceCoins!) * 100)
    : 0;

  const [justAdded, setJustAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const handleCardClick = useCallback(() => onClick?.(product), [onClick, product]);

  const handleBuyClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onQuickBuy?.(product);
      setJustAdded(true);
      clearTimeout(addedTimer.current);
      addedTimer.current = setTimeout(() => setJustAdded(false), 1200);
    },
    [onQuickBuy, product],
  );

  const stockPercent = product.isLimited
    ? Math.round((product.stockCount / (product.stockCount + product.soldCount)) * 100)
    : 0;

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.cardCover}>
        <div className={styles.cardCoverInner} style={{ background: gradient }}>
          {product.imageUrl ? (
            <img
              className={styles.cardImage}
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
            />
          ) : (
            <ProductIcon
              className={styles.cardPlaceholderIcon}
              sx={{ fontSize: 56, opacity: 0.12, color: catColor }}
            />
          )}
        </div>

        <div className={styles.cardBadges}>
          {product.isNew && (
            <span className={`${styles.cardBadge} ${styles.cardBadgeNew}`}>▸ NEW</span>
          )}
          {product.isBestseller && (
            <span className={`${styles.cardBadge} ${styles.cardBadgeBestseller}`}>★ ХИТ</span>
          )}
          {product.isLimited && (
            <span className={`${styles.cardBadge} ${styles.cardBadgeLimited}`}>◆ LIMITED</span>
          )}
          {hasDiscount && (
            <span className={`${styles.cardBadge} ${styles.cardBadgeDiscount}`}>
              −{discountPercent}%
            </span>
          )}
          {!product.inStock && (
            <span className={`${styles.cardBadge} ${styles.cardBadgeOutOfStock}`}>SOLD OUT</span>
          )}
        </div>

        <span className={styles.cardCategoryBadge} style={{ color: catColor }}>
          {MERCH_CATEGORY_LABELS[product.category]}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>{product.name}</div>
        <div className={styles.cardDescription}>{product.description}</div>

        {product.tags.length > 0 && (
          <div className={styles.cardTags}>
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.cardTag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {product.colors && product.colors.length > 0 && (
          <div className={styles.cardColors}>
            {product.colors.map((color) => (
              <span
                key={color}
                className={styles.cardColorDot}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {product.isLimited && product.inStock && (
          <div className={styles.stockBar}>
            <div className={styles.stockBarTrack}>
              <div className={styles.stockBarFill} style={{ width: `${stockPercent}%` }} />
            </div>
            <span className={styles.stockBarLabel}>Осталось {product.stockCount} шт.</span>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.cardPrice}>
          <span className={styles.cardPriceValue}>
            {product.priceCoins.toLocaleString('ru-RU')}
            <span className={styles.cardPriceCoin}> ₿</span>
          </span>
          {hasDiscount && (
            <span className={styles.cardPriceOld}>
              {product.oldPriceCoins!.toLocaleString('ru-RU')}
            </span>
          )}
        </div>

        <div className={styles.cardRating}>
          <StarIcon sx={{ fontSize: 13, color: '#fbbf24' }} />
          <span className={styles.cardRatingValue}>{product.rating}</span>
          <span className={styles.cardRatingCount}>({product.reviewsCount})</span>
        </div>

        <button
          className={`${styles.buyButton} ${!product.inStock ? styles.buyButtonDisabled : ''} ${justAdded ? styles.buyButtonAdded : ''}`}
          disabled={!product.inStock}
          onClick={handleBuyClick}
        >
          {justAdded ? (
            <>
              <CheckIcon sx={{ fontSize: 13 }} />
              ADDED
            </>
          ) : (
            <>
              <CartIcon sx={{ fontSize: 13 }} />
              {product.inStock ? 'BUY' : 'N/A'}
            </>
          )}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
