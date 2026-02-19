import React from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface Props {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

export const CoverImageUpload: React.FC<Props> = ({ value, onChange, error }) => (
  <Box>
    <TextField
      label="URL обложки"
      placeholder="https://example.com/cover.jpg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      size="small"
      error={!!error}
      helperText={error}
    />
    {value && (
      <Box
        sx={{
          mt: 1.5,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          component="img"
          src={value}
          alt="Обложка"
          sx={{
            width: '100%',
            height: 160,
            objectFit: 'cover',
            display: 'block',
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <IconButton
          size="small"
          onClick={() => onChange('')}
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            bgcolor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
        <Typography variant="caption" color="text.secondary" sx={{ p: 1, display: 'block' }}>
          Загрузка файлов будет доступна после подключения бэкенда
        </Typography>
      </Box>
    )}
  </Box>
);
