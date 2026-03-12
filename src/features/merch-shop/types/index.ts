export type MerchCategory =
  | 'all'
  | 'clothing'
  | 'accessories'
  | 'stationery'
  | 'drinkware'
  | 'tech'
  | 'gift-sets';

export type MerchSortOption = 'popular' | 'price-asc' | 'price-desc' | 'new';

export type MerchSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface MerchProduct {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  category: Exclude<MerchCategory, 'all'>;
  priceCoins: number;
  oldPriceCoins?: number;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  inStock: boolean;
  stockCount: number;
  sizes?: MerchSize[];
  colors?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isLimited?: boolean;
  tags: string[];
  addedAt: string;
}

export interface MerchShopStats {
  totalProducts: number;
  categories: number;
  soldThisMonth: number;
}

export interface UserBalance {
  coins: number;
  pendingCoins: number;
}

export interface CartItem {
  product: MerchProduct;
  quantity: number;
  selectedSize?: MerchSize;
  selectedColor?: string;
}

export const MERCH_CATEGORY_LABELS: Record<MerchCategory, string> = {
  all: 'Все',
  clothing: 'Одежда',
  accessories: 'Аксессуары',
  stationery: 'Канцелярия',
  drinkware: 'Кружки и термосы',
  tech: 'Техника',
  'gift-sets': 'Подарочные наборы',
};

export const MERCH_CATEGORY_ICONS: Record<Exclude<MerchCategory, 'all'>, string> = {
  clothing: '👕',
  accessories: '🎒',
  stationery: '📓',
  drinkware: '☕',
  tech: '🎧',
  'gift-sets': '🎁',
};

export const MERCH_CATEGORY_COLORS: Record<Exclude<MerchCategory, 'all'>, string> = {
  clothing: '#6366f1',
  accessories: '#f59e0b',
  stationery: '#0d9488',
  drinkware: '#ec4899',
  tech: '#3b82f6',
  'gift-sets': '#8b5cf6',
};

export const SORT_LABELS: Record<MerchSortOption, string> = {
  popular: 'Популярные',
  'price-asc': 'Дешевле',
  'price-desc': 'Дороже',
  new: 'Новинки',
};

export const SORT_OPTIONS: [MerchSortOption, string][] = Object.entries(SORT_LABELS) as [
  MerchSortOption,
  string,
][];

export const CATEGORY_TABS: MerchCategory[] = [
  'all',
  'clothing',
  'accessories',
  'stationery',
  'drinkware',
  'tech',
  'gift-sets',
];
