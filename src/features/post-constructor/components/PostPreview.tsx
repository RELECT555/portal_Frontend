import React, { useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import type { JSONContent } from '@tiptap/react';
import { renderContentToHtml } from '../utils/renderContent';
import type { PostType } from '../types';
import { POST_TYPE_LABELS } from '../types';
import styles from '../styles/editor-content.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  content: JSONContent | undefined;
  type: PostType;
  coverImageUrl?: string;
  tags: string[];
}

export const PostPreview: React.FC<Props> = ({
  open,
  onClose,
  title,
  content,
  type,
  coverImageUrl,
  tags,
}) => {
  const html = useMemo(() => (content ? renderContentToHtml(content) : ''), [content]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Предпросмотр</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label={POST_TYPE_LABELS[type]} size="small" color="primary" />
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>

        {coverImageUrl && (
          <Box
            component="img"
            src={coverImageUrl}
            alt="Обложка"
            sx={{
              width: '100%',
              maxHeight: 300,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 3,
            }}
          />
        )}

        <Typography variant="h1" sx={{ mb: 2 }}>
          {title || 'Без заголовка'}
        </Typography>

        <div className={styles.previewContent} dangerouslySetInnerHTML={{ __html: html }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
