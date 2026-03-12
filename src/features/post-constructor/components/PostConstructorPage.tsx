import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  Typography,
  Button,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { ArrowBack, Visibility, Save, Publish } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { JSONContent } from '@tiptap/react';
import { ROUTES } from '@/lib/constants';
import { Breadcrumbs } from '@/components/shared';
import { usePostEditor } from '../hooks/usePostEditor';
import { useCreatePost } from '../hooks/useCreatePost';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { usePost } from '../hooks/usePosts';
import { PostEditor } from './PostEditor';
import { EditorMenuBar } from './EditorMenuBar';
import { PostPreview } from './PostPreview';
import { postSchema } from '../utils/postValidation';
import type { PostFormValues } from '../utils/postValidation';
import styles from '../styles/post-constructor.module.scss';

const AUTOSAVE_KEY = 'post-constructor-draft';
const AUTOSAVE_DELAY_MS = 3000;

const PostConstructorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: existingPost, isLoading: isLoadingPost } = usePost(id);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [editorContent, setEditorContent] = useState<JSONContent | undefined>();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const savedDraft = useMemo((): Partial<PostFormValues> | null => {
    if (isEditMode) return null;
    try {
      const raw = localStorage.getItem(AUTOSAVE_KEY);
      return raw ? (JSON.parse(raw) as Partial<PostFormValues>) : null;
    } catch {
      return null;
    }
  }, [isEditMode]);

  const defaultValues: PostFormValues = useMemo(() => {
    if (isEditMode && existingPost) {
      return {
        type: existingPost.type,
        title: existingPost.title,
        content: existingPost.content,
        coverImageUrl: existingPost.coverImageUrl ?? '',
        tags: existingPost.tags,
        status: existingPost.status,
        isMain: existingPost.isMain ?? false,
      };
    }

    if (savedDraft) {
      return {
        type: savedDraft.type ?? 'news',
        title: savedDraft.title ?? '',
        content: savedDraft.content ?? { type: 'doc', content: [{ type: 'paragraph' }] },
        coverImageUrl: savedDraft.coverImageUrl ?? '',
        tags: savedDraft.tags ?? [],
        status: savedDraft.status ?? 'draft',
        isMain: savedDraft.isMain ?? false,
      };
    }

    return {
      type: 'news',
      title: '',
      content: { type: 'doc', content: [{ type: 'paragraph' }] },
      coverImageUrl: '',
      tags: [],
      status: 'draft',
      isMain: false,
    };
  }, [isEditMode, existingPost, savedDraft]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isEditMode && existingPost) {
      reset({
        type: existingPost.type,
        title: existingPost.title,
        content: existingPost.content,
        coverImageUrl: existingPost.coverImageUrl ?? '',
        tags: existingPost.tags,
        status: existingPost.status,
        isMain: existingPost.isMain ?? false,
      });
      setTags(existingPost.tags);
      setEditorContent(existingPost.content);
    }
  }, [existingPost, isEditMode, reset]);

  useEffect(() => {
    if (!isEditMode && savedDraft?.tags) {
      setTags(savedDraft.tags);
    }
  }, [isEditMode, savedDraft]);

  const handleEditorUpdate = useCallback(
    (content: JSONContent): void => {
      setEditorContent(content);
      setValue('content', content, { shouldDirty: true });
    },
    [setValue],
  );

  const editor = usePostEditor({
    initialContent: defaultValues.content,
    onUpdate: handleEditorUpdate,
  });

  useEffect(() => {
    if (isEditMode) return;

    const subscription = watch((formValues) => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }

      autosaveTimerRef.current = setTimeout(() => {
        try {
          localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(formValues));
        } catch {
          // localStorage quota exceeded — silent
        }
      }, AUTOSAVE_DELAY_MS);
    });

    return () => {
      subscription.unsubscribe();
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [isEditMode, watch]);

  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  const onSubmit = useCallback(
    (values: PostFormValues): void => {
      if (isEditMode && id) {
        updateMutation.mutate(
          { id, ...values },
          {
            onSuccess: () => {
              setSnackbar({
                open: true,
                message: 'Пост обновлён',
                severity: 'success',
              });
            },
            onError: () => {
              setSnackbar({
                open: true,
                message: 'Ошибка при обновлении',
                severity: 'error',
              });
            },
          },
        );
      } else {
        createMutation.mutate(values, {
          onSuccess: () => {
            localStorage.removeItem(AUTOSAVE_KEY);
            setSnackbar({
              open: true,
              message: values.status === 'published' ? 'Пост опубликован' : 'Черновик сохранён',
              severity: 'success',
            });
            setTimeout(() => navigate(ROUTES.HOME), 1500);
          },
          onError: () => {
            setSnackbar({
              open: true,
              message: 'Ошибка при создании',
              severity: 'error',
            });
          },
        });
      }
    },
    [isEditMode, id, createMutation, updateMutation, navigate],
  );

  const handleSaveDraft = useCallback((): void => {
    setValue('status', 'draft');
    handleSubmit(onSubmit)();
  }, [setValue, handleSubmit, onSubmit]);

  const handlePublish = useCallback((): void => {
    setValue('status', 'published');
    handleSubmit(onSubmit)();
  }, [setValue, handleSubmit, onSubmit]);

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const watchedTitle = watch('title');
  const watchedType = watch('type');
  const watchedCoverImageUrl = watch('coverImageUrl');

  if (isEditMode && isLoadingPost) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: isEditMode ? 'Редактирование поста' : 'Новый пост' }]} />
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h2">{isEditMode ? 'Редактирование поста' : 'Новый пост'}</Typography>
          {isDirty && !isEditMode && (
            <Typography variant="caption" color="text.secondary">
              (черновик сохранён)
            </Typography>
          )}
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => setPreviewOpen(true)}
          >
            Предпросмотр
          </Button>
          <Button
            variant="outlined"
            startIcon={<Save />}
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            {isSaving ? 'Сохранение...' : 'Черновик'}
          </Button>
          <Button
            variant="contained"
            startIcon={<Publish />}
            onClick={handlePublish}
            disabled={isSaving}
          >
            Опубликовать
          </Button>
        </div>
      </div>

      {/* Layout */}
      <div className={styles.layout}>
        <div className={styles.editorColumn}>
          {/* Title field */}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Заголовок поста"
                fullWidth
                variant="standard"
                error={!!errors.title}
                helperText={errors.title?.message}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    py: 1,
                    px: 0,
                    mb: 2,
                  },
                }}
              />
            )}
          />

          {/* Editor */}
          <PostEditor editor={editor} />
        </div>

        <div className={styles.sidebarColumn}>
          <EditorMenuBar
            control={control}
            errors={errors}
            setValue={setValue}
            tags={tags}
            onTagsChange={setTags}
          />
        </div>
      </div>

      {/* Preview dialog */}
      <PostPreview
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={watchedTitle}
        content={editorContent}
        type={watchedType}
        coverImageUrl={watchedCoverImageUrl || undefined}
        tags={tags}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostConstructorPage;
