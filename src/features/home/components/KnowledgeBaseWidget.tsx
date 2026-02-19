import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Description as DocIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { SectionHeader } from '@/components/shared';
import { ROUTES } from '@/lib/constants';
import type { KnowledgeBaseDocument } from '@/features/knowledge-base/types';

interface Props {
  documents: KnowledgeBaseDocument[];
}

export const KnowledgeBaseWidget: React.FC<Props> = React.memo(({ documents }) => (
  <Card>
    <CardContent>
      <SectionHeader
        title="Новое в Базе знаний"
        linkText="Все документы"
        linkTo={ROUTES.KNOWLEDGE_BASE}
      />
      {documents.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Нет документов
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: 1,
          }}
        >
          {documents.map((doc) => (
            <Box
              key={doc.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                py: 1.25,
                px: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'background 0.15s',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
                },
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.25,
                }}
              >
                <DocIcon sx={{ fontSize: 16, color: 'primary.main' }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontWeight: 500,
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.15s',
                  }}
                >
                  {doc.title}
                </Typography>
                {doc.category && (
                  <Chip
                    label={doc.category}
                    size="small"
                    sx={{ mt: 0.5, height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </CardContent>
  </Card>
));

KnowledgeBaseWidget.displayName = 'KnowledgeBaseWidget';
