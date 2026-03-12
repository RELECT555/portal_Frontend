import React, { useState, useCallback } from 'react';
import {
  ShoppingCart as CartIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  DeleteOutline as DeleteIcon,
} from '@mui/icons-material';
import type { CartItem } from '../types';
import styles from '../MerchShopPage.module.scss';

interface Props {
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClear: () => void;
}

export const FloatingCart: React.FC<Props> = React.memo(
  ({ items, onUpdateQuantity, onRemoveItem, onClear }) => {
    const [open, setOpen] = useState(false);
    const toggle = useCallback(() => setOpen((p) => !p), []);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalCoins = items.reduce((sum, i) => sum + i.product.priceCoins * i.quantity, 0);

    if (items.length === 0) return null;

    return (
      <>
        <button className={styles.cartFab} onClick={toggle}>
          <CartIcon sx={{ fontSize: 20 }} />
          <span className={styles.cartFabBadge}>{totalItems}</span>
        </button>

        {open && (
          <>
            <div className={styles.cartOverlay} onClick={toggle} />
            <div className={styles.cartPanel}>
              <div className={styles.cartPanelHeader}>
                <span className={styles.cartPanelTitle}>
                  // КОРЗИНА <span className={styles.cartPanelCount}>[{totalItems}]</span>
                </span>
                <button className={styles.cartPanelClose} onClick={toggle}>
                  <CloseIcon sx={{ fontSize: 18 }} />
                </button>
              </div>

              <div className={styles.cartPanelItems}>
                {items.map((item) => (
                  <div key={item.product.id} className={styles.cartItem}>
                    <div className={styles.cartItemInfo}>
                      <span className={styles.cartItemName}>{item.product.name}</span>
                      {item.selectedSize && (
                        <span className={styles.cartItemMeta}>Размер: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <span className={styles.cartItemMeta}>
                          Цвет:{' '}
                          <span
                            className={styles.cartItemColorDot}
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </span>
                      )}
                    </div>
                    <div className={styles.cartItemActions}>
                      <div className={styles.cartItemQty}>
                        <button
                          className={styles.cartItemQtyBtn}
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                        >
                          <RemoveIcon sx={{ fontSize: 14 }} />
                        </button>
                        <span className={styles.cartItemQtyValue}>{item.quantity}</span>
                        <button
                          className={styles.cartItemQtyBtn}
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                        >
                          <AddIcon sx={{ fontSize: 14 }} />
                        </button>
                      </div>
                      <span className={styles.cartItemPrice}>
                        {(item.product.priceCoins * item.quantity).toLocaleString('ru-RU')} ₿
                      </span>
                      <button
                        className={styles.cartItemRemove}
                        onClick={() => onRemoveItem(item.product.id)}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cartPanelFooter}>
                <div className={styles.cartPanelTotal}>
                  <span className={styles.cartPanelTotalLabel}>ИТОГО:</span>
                  <span className={styles.cartPanelTotalValue}>
                    {totalCoins.toLocaleString('ru-RU')} ₿
                  </span>
                </div>
                <div className={styles.cartPanelButtons}>
                  <button className={styles.cartClearBtn} onClick={onClear}>
                    ОЧИСТИТЬ
                  </button>
                  <button className={styles.cartCheckoutBtn}>ОФОРМИТЬ</button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  },
);

FloatingCart.displayName = 'FloatingCart';
