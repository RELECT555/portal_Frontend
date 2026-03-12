import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Close as CloseIcon,
  Star as StarIcon,
  ShoppingCart as CartIcon,
  Storefront as ProductIcon,
  Remove as MinusIcon,
  Add as PlusIcon,
} from '@mui/icons-material';
import { MERCH_CATEGORY_LABELS, MERCH_CATEGORY_COLORS } from '../types';
import type { MerchProduct, MerchSize } from '../types';
import styles from '../MerchShopPage.module.scss';

interface Props {
  product: MerchProduct | null;
  onClose: () => void;
  onAddToCart: (productId: string, quantity: number, size?: MerchSize, color?: string) => void;
}

export const ProductModal: React.FC<Props> = React.memo(({ product, onClose, onAddToCart }) => {
  const productId = product?.id;
  const [selectedSize, setSelectedSize] = useState<MerchSize | undefined>(product?.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const prevProductIdRef = useRef(productId);

  if (productId !== prevProductIdRef.current) {
    prevProductIdRef.current = productId;
    if (product) {
      setSelectedSize(product.sizes?.[0]);
      setSelectedColor(product.colors?.[0]);
      setQuantity(1);
    }
  }

  useEffect(() => {
    if (!product) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [product, onClose]);

  const handleAdd = useCallback((): void => {
    if (!product) return;
    onAddToCart(product.id, quantity, selectedSize, selectedColor);
    onClose();
  }, [product, quantity, selectedSize, selectedColor, onAddToCart, onClose]);

  if (!product) return null;

  const catColor = MERCH_CATEGORY_COLORS[product.category];
  const hasDiscount = product.oldPriceCoins && product.oldPriceCoins > product.priceCoins;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.priceCoins / product.oldPriceCoins!) * 100)
    : 0;

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={onClose}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>

        <div className={styles.modalBody}>
          <div className={styles.modalImage}>
            <div
              className={styles.modalImageInner}
              style={{
                background: `linear-gradient(145deg, ${catColor}15, ${catColor}08, #0c0e1a)`,
              }}
            >
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className={styles.modalImageImg} />
              ) : (
                <ProductIcon sx={{ fontSize: 100, opacity: 0.1, color: catColor }} />
              )}
            </div>

            <div className={styles.modalBadges}>
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
            </div>
          </div>

          <div className={styles.modalDetails}>
            <span className={styles.modalCategory} style={{ color: catColor }}>
              {MERCH_CATEGORY_LABELS[product.category]}
            </span>
            <h2 className={styles.modalTitle}>{product.name}</h2>
            <p className={styles.modalDescription}>{product.description}</p>

            <div className={styles.modalRating}>
              <StarIcon sx={{ fontSize: 16, color: '#fbbf24' }} />
              <span className={styles.modalRatingValue}>{product.rating}</span>
              <span className={styles.modalRatingCount}>({product.reviewsCount} отзывов)</span>
              <span className={styles.modalSold}>{product.soldCount} продано</span>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.modalSection}>
                <span className={styles.modalSectionLabel}>// РАЗМЕР</span>
                <div className={styles.modalSizes}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`${styles.modalSizeBtn} ${selectedSize === s ? styles.modalSizeBtnActive : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className={styles.modalSection}>
                <span className={styles.modalSectionLabel}>// ЦВЕТ</span>
                <div className={styles.modalColors}>
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`${styles.modalColorBtn} ${selectedColor === c ? styles.modalColorBtnActive : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelectedColor(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className={styles.modalSection}>
              <span className={styles.modalSectionLabel}>// КОЛИЧЕСТВО</span>
              <div className={styles.modalQty}>
                <button
                  className={styles.modalQtyBtn}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <MinusIcon sx={{ fontSize: 16 }} />
                </button>
                <span className={styles.modalQtyValue}>{quantity}</span>
                <button
                  className={styles.modalQtyBtn}
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  disabled={quantity >= product.stockCount}
                >
                  <PlusIcon sx={{ fontSize: 16 }} />
                </button>
                <span className={styles.modalStock}>В наличии: {product.stockCount} шт.</span>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.modalPrice}>
                <span className={styles.modalPriceValue}>
                  {(product.priceCoins * quantity).toLocaleString('ru-RU')} ₿
                </span>
                {hasDiscount && (
                  <span className={styles.modalPriceOld}>
                    {(product.oldPriceCoins! * quantity).toLocaleString('ru-RU')} ₿
                  </span>
                )}
              </div>
              <button
                className={styles.modalBuyBtn}
                onClick={handleAdd}
                disabled={!product.inStock}
              >
                <CartIcon sx={{ fontSize: 16 }} />
                {product.inStock ? 'ДОБАВИТЬ В КОРЗИНУ' : 'НЕТ В НАЛИЧИИ'}
              </button>
            </div>

            {product.tags.length > 0 && (
              <div className={styles.modalTags}>
                {product.tags.map((tag) => (
                  <span key={tag} className={styles.cardTag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

ProductModal.displayName = 'ProductModal';
