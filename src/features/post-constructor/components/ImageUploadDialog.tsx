import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const imageSchema = z.object({
  src: z.string().url('Введите корректный URL изображения'),
  alt: z.string().max(200, 'Максимум 200 символов').optional().or(z.literal('')),
});

type ImageFormValues = z.infer<typeof imageSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (src: string, alt?: string) => void;
}

export const ImageUploadDialog: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: { src: '', alt: '' },
  });

  useEffect(() => {
    if (open) {
      reset({ src: '', alt: '' });
    }
  }, [open, reset]);

  const handleFormSubmit = (values: ImageFormValues): void => {
    onSubmit(values.src, values.alt || undefined);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>Вставить изображение</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Укажите URL изображения. Загрузка файлов будет доступна после подключения бэкенда.
          </Typography>
          <TextField
            {...register('src')}
            label="URL изображения"
            placeholder="https://example.com/image.jpg"
            fullWidth
            autoFocus
            error={!!errors.src}
            helperText={errors.src?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            {...register('alt')}
            label="Описание (alt)"
            placeholder="Описание изображения"
            fullWidth
            error={!!errors.alt}
            helperText={errors.alt?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">
            Вставить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
