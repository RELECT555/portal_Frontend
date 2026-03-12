import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useDebounce } from '@/hooks';
import { HeroSection } from './components/HeroSection';
import { MerchToolbar } from './components/MerchToolbar';
import { ProductCard } from './components/ProductCard';
import { MerchEmptyState } from './components/MerchEmptyState';
import { FloatingCart } from './components/FloatingCart';
import { ProductModal } from './components/ProductModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CartToast } from './components/CartToast';
import { ScrollToTop } from './components/ScrollToTop';
import { NewArrivals } from './components/NewArrivals';
import { GameLauncher } from './components/GameLauncher';
import { CelebrationEffect } from './components/CelebrationEffect';
import { MOCK_MERCH_PRODUCTS, MERCH_SHOP_STATS, USER_BALANCE } from './mockData';
import type {
  MerchCategory,
  MerchSortOption,
  MerchProduct,
  MerchSize,
  CartItem,
  UserBalance,
} from './types';
import styles from './MerchShopPage.module.scss';

const MerchShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeCategory, setActiveCategory] = useState<MerchCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);
  const [sortBy, setSortBy] = useState<MerchSortOption>('popular');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MerchProduct | null>(null);
  const [toastProduct, setToastProduct] = useState<string | null>(null);
  const [balance, setBalance] = useState<UserBalance>(USER_BALANCE);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const handleWelcomeEnter = useCallback(() => setShowWelcome(false), []);

  const handleCoinsEarned = useCallback((coins: number) => {
    setBalance((prev) => ({ ...prev, coins: prev.coins + coins }));
  }, []);

  const handleTestCelebration = useCallback(() => {
    setShowCelebration(true);
  }, []);

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
  }, []);
  const handleToastDone = useCallback(() => setToastProduct(null), []);

  const handleCategoryChange = useCallback((cat: MerchCategory): void => {
    setActiveCategory(cat);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback((option: MerchSortOption): void => {
    setSortBy(option);
  }, []);

  const handleProductClick = useCallback((product: MerchProduct): void => {
    setSelectedProduct(product);
  }, []);

  const handleModalClose = useCallback(() => setSelectedProduct(null), []);

  const handleAddToCart = useCallback(
    (productId: string, quantity: number, size?: MerchSize, color?: string) => {
      const product = MOCK_MERCH_PRODUCTS.find((p) => p.id === productId);
      if (!product) return;

      setCartItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === productId && i.selectedSize === size && i.selectedColor === color,
        );
        if (existing) {
          return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + quantity } : i));
        }
        return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
      });

      setToastProduct(product.name);
    },
    [],
  );

  const handleQuickBuy = useCallback(
    (product: MerchProduct) => {
      handleAddToCart(product.id, 1, product.sizes?.[0], product.colors?.[0]);
    },
    [handleAddToCart],
  );

  const handleUpdateQuantity = useCallback((productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const handleClearCart = useCallback(() => setCartItems([]), []);

  const newArrivals = useMemo(
    () =>
      [...MOCK_MERCH_PRODUCTS]
        .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
        .slice(0, 6),
    [],
  );

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_MERCH_PRODUCTS];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case 'price-asc':
        result.sort((a, b) => a.priceCoins - b.priceCoins);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceCoins - a.priceCoins);
        break;
      case 'new':
      default:
        result.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    }

    return result;
  }, [activeCategory, debouncedSearch, sortBy]);

  const bestsellers = useMemo(
    () => filteredProducts.filter((p) => p.isBestseller).slice(0, 4),
    [filteredProducts],
  );

  const gridProducts = useMemo(
    () => filteredProducts.filter((p) => !bestsellers.some((b) => b.id === p.id)),
    [filteredProducts, bestsellers],
  );

  const showBestsellers =
    bestsellers.length > 0 && activeCategory === 'all' && !debouncedSearch.trim();

  if (showWelcome) {
    return <WelcomeScreen onEnter={handleWelcomeEnter} />;
  }

  return (
    <div className={styles.fullscreen}>
      <button className={styles.backButton} onClick={handleBack}>
        <ArrowBackIcon sx={{ fontSize: 18 }} />
        <span className={styles.backButtonLabel}>НАЗАД</span>
      </button>

      <div className={styles.page}>
        <HeroSection stats={MERCH_SHOP_STATS} balance={balance} />

        <GameLauncher onCoinsEarned={handleCoinsEarned} />

        <NewArrivals products={newArrivals} onProductClick={handleProductClick} />

        <MerchToolbar
          activeCategory={activeCategory}
          sortBy={sortBy}
          searchQuery={searchQuery}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
        />

        <div className={styles.resultsCounter}>
          Найдено: <span className={styles.resultsCounterValue}>{filteredProducts.length}</span>{' '}
          товаров
        </div>

        {showBestsellers && (
          <>
            <div className={styles.sectionDivider}>
              <div className={styles.sectionDividerLine} />
              <span className={styles.sectionDividerLabel}>🔥 Хиты продаж</span>
              <div className={styles.sectionDividerLine} />
            </div>
            <div className={styles.grid}>
              {bestsellers.map((product, idx) => (
                <div
                  key={product.id}
                  className={styles.cardAnimated}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <ProductCard
                    product={product}
                    onClick={handleProductClick}
                    onQuickBuy={handleQuickBuy}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {gridProducts.length > 0 ? (
          <>
            {showBestsellers && (
              <div className={styles.sectionDivider}>
                <div className={styles.sectionDividerLine} />
                <span className={styles.sectionDividerLabel}>Все товары</span>
                <div className={styles.sectionDividerLine} />
              </div>
            )}
            <div className={styles.grid}>
              {gridProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={styles.cardAnimated}
                  style={{
                    animationDelay: `${(showBestsellers ? bestsellers.length + idx : idx) * 80}ms`,
                  }}
                >
                  <ProductCard
                    product={product}
                    onClick={handleProductClick}
                    onQuickBuy={handleQuickBuy}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          !showBestsellers && <MerchEmptyState />
        )}
      </div>

      <FloatingCart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClear={handleClearCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={handleModalClose}
        onAddToCart={handleAddToCart}
      />

      <CartToast productName={toastProduct} onDone={handleToastDone} />
      <ScrollToTop />

      {/* TEST: Celebration effect trigger */}
      <button className={styles.testCelebrationBtn} onClick={handleTestCelebration}>
        🎉 TEST
      </button>

      <CelebrationEffect
        active={showCelebration}
        onComplete={handleCelebrationComplete}
        coinsAmount={750}
      />
    </div>
  );
};

export default MerchShopPage;
