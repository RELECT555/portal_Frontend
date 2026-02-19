import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { CoverImageUpload } from './CoverImageUpload';
import type { PostType, PostStatus } from '../types';
import { POST_TYPE_LABELS, POST_STATUS_LABELS } from '../types';
import type { PostFormValues } from '../utils/postValidation';

interface Props {
  control: Control<PostFormValues>;
  errors: FieldErrors<PostFormValues>;
  setValue: UseFormSetValue<PostFormValues>;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const POST_TYPES = Object.entries(POST_TYPE_LABELS) as [PostType, string][];
const POST_STATUSES = Object.entries(POST_STATUS_LABELS) as [PostStatus, string][];

export const EditorMenuBar: React.FC<Props> = ({
  control,
  errors,
  setValue,
  tags,
  onTagsChange,
}) => {
  const [tagInput, setTagInput] = React.useState('');

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
        const updated = [...tags, trimmed];
        onTagsChange(updated);
        setValue('tags', updated);
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string): void => {
    const updated = tags.filter((t) => t !== tag);
    onTagsChange(updated);
    setValue('tags', updated);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Post type */}
      <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: '#e2e8f0' }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Настройки
          </Typography>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small" error={!!errors.type} sx={{ mb: 2 }}>
                <InputLabel>Тип поста</InputLabel>
                <Select
                  {...field}
                  label="Тип поста"
                  onChange={(e: SelectChangeEvent) => field.onChange(e.target.value)}
                >
                  {POST_TYPES.map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.type.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small" error={!!errors.status} sx={{ mb: 2 }}>
                <InputLabel>Статус</InputLabel>
                <Select
                  {...field}
                  label="Статус"
                  onChange={(e: SelectChangeEvent) => field.onChange(e.target.value)}
                >
                  {POST_STATUSES.map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="isMain"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value ?? false}
                    onChange={field.onChange}
                    color="primary"
                    size="small"
                  />
                }
                label="Закрепить"
                sx={{ mb: 0 }}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Cover image */}
      <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: '#e2e8f0' }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Обложка
          </Typography>
          <Controller
            name="coverImageUrl"
            control={control}
            render={({ field }) => (
              <CoverImageUpload
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.coverImageUrl?.message}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Tags */}
      <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: '#e2e8f0' }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Теги
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="Введите тег и нажмите Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            helperText={`${tags.length}/10 тегов`}
            disabled={tags.length >= 10}
          />
          {tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={() => handleTagRemove(tag)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
