import React, { useState, useCallback } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

export const SearchWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`${ROUTES.TEAM}?search=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, navigate],
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        placeholder="Поиск сотрудника, документа или раздела..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 22 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            backgroundColor: 'background.paper',
            fontSize: '0.9rem',
            transition: 'box-shadow 0.2s, border-color 0.2s',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 16px rgba(27, 94, 59, 0.1)',
            },
          },
        }}
      />
    </Box>
  );
};
