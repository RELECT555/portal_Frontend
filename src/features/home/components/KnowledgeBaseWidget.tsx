import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Description as DocIcon } from '@mui/icons-material';
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {documents.map((doc) => (
            <Box
              key={doc.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                py: 1,
                px: 1.5,
                mx: -1.5,
                borderRadius: 1.5,
                cursor: 'pointer',
                transition: 'background 0.15s',
                '&:hover': { background: 'rgba(0,0,0,0.02)' },
              }}
            >
              <DocIcon sx={{ fontSize: 18, color: 'primary.main', mt: 0.25, flexShrink: 0 }} />
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
