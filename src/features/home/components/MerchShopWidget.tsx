import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import {
  Storefront as ShopIcon,
  MonetizationOn as CoinIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material';
import { SectionHeader } from '@/components/shared';
import { ROUTES } from '@/lib/constants';

export interface MerchPreviewItem {
  id: string;
  name: string;
  priceCoins: number;
  category: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

interface Props {
  items: MerchPreviewItem[];
  userCoins: number;
}

const ITEM_GRADIENTS = [
  'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
  'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
  'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
  'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
  'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
];

export const MerchShopWidget: React.FC<Props> = React.memo(({ items, userCoins }) => (
  <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid rgba(0,0,0,0.06)' }}>
    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
      <SectionHeader
        title="Корп-магазин мерча"
        linkText="Все товары"
        linkTo={ROUTES.MERCH_SHOP}
        action={
          <Chip
            icon={<CoinIcon sx={{ fontSize: 14 }} />}
            label={`${userCoins.toLocaleString('ru-RU')} ₿`}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              bgcolor: 'rgba(245, 158, 11, 0.08)',
              color: '#d97706',
              border: '1px solid rgba(245, 158, 11, 0.15)',
              '& .MuiChip-icon': { color: '#f59e0b' },
            }}
          />
        }
      />

      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Нет доступных товаров
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {items.map((item, idx) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.02)',
                  transform: 'translateX(2px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  background: ITEM_GRADIENTS[idx % ITEM_GRADIENTS.length],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <ShopIcon sx={{ fontSize: 20, opacity: 0.25 }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.name}
                  </Typography>
                  {item.isBestseller && <FireIcon sx={{ fontSize: 13, color: '#f59e0b' }} />}
                  {item.isNew && (
                    <Chip
                      label="NEW"
                      size="small"
                      sx={{
                        height: 16,
                        fontSize: '0.5625rem',
                        fontWeight: 700,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '& .MuiChip-label': { px: 0.5 },
                      }}
                    />
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {item.category}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.3,
                  flexShrink: 0,
                }}
              >
                <Typography variant="body2" fontWeight={700} color="text.primary">
                  {item.priceCoins}
                </Typography>
                <Typography variant="caption" fontWeight={500} color="text.secondary">
                  ₿
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </CardContent>
  </Card>
));

MerchShopWidget.displayName = 'MerchShopWidget';
