import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const linkSchema = z.object({
  url: z.string().url('Введите корректный URL'),
});

type LinkFormValues = z.infer<typeof linkSchema>;

interface Props {
  open: boolean;
  initialUrl?: string;
  onClose: () => void;
  onSubmit: (url: string) => void;
  onRemove?: () => void;
}

export const LinkDialog: React.FC<Props> = ({ open, initialUrl, onClose, onSubmit, onRemove }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: { url: initialUrl ?? '' },
  });

  useEffect(() => {
    if (open) {
      reset({ url: initialUrl ?? '' });
    }
  }, [open, initialUrl, reset]);

  const handleFormSubmit = (values: LinkFormValues): void => {
    onSubmit(values.url);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>{initialUrl ? 'Редактировать ссылку' : 'Вставить ссылку'}</DialogTitle>
        <DialogContent>
          <TextField
            {...register('url')}
            label="URL"
            placeholder="https://example.com"
            fullWidth
            autoFocus
            error={!!errors.url}
            helperText={errors.url?.message}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          {initialUrl && onRemove && (
            <Button
              onClick={() => {
                onRemove();
                onClose();
              }}
              color="error"
            >
              Удалить ссылку
            </Button>
          )}
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">
            {initialUrl ? 'Обновить' : 'Вставить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
