import React, { useCallback, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { IconButton, Select, MenuItem, Tooltip } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  InsertLink,
  Image as ImageIcon,
  YouTube,
  HorizontalRule,
  TableChart,
  Undo,
  Redo,
  Highlight as HighlightIcon,
} from '@mui/icons-material';
import classnames from 'classnames';
import { LinkDialog } from './LinkDialog';
import { ImageUploadDialog } from './ImageUploadDialog';
import styles from '../styles/post-constructor.module.scss';

interface Props {
  editor: Editor;
}

type HeadingLevel = '0' | '1' | '2' | '3';

export const EditorToolbar: React.FC<Props> = ({ editor }) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const currentHeading = (): HeadingLevel => {
    if (editor.isActive('heading', { level: 1 })) return '1';
    if (editor.isActive('heading', { level: 2 })) return '2';
    if (editor.isActive('heading', { level: 3 })) return '3';
    return '0';
  };

  const handleHeadingChange = useCallback(
    (e: SelectChangeEvent<string>): void => {
      const level = Number(e.target.value);
      if (level === 0) {
        editor.chain().focus().setParagraph().run();
      } else {
        editor
          .chain()
          .focus()
          .toggleHeading({ level: level as 1 | 2 | 3 })
          .run();
      }
    },
    [editor],
  );

  const handleLinkOpen = useCallback((): void => {
    setLinkDialogOpen(true);
  }, []);

  const handleLinkSubmit = useCallback(
    (url: string): void => {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    },
    [editor],
  );

  const handleLinkRemove = useCallback((): void => {
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  const handleImageSubmit = useCallback(
    (src: string, alt?: string): void => {
      editor.chain().focus().setImage({ src, alt }).run();
    },
    [editor],
  );

  const handleYoutubeInsert = useCallback((): void => {
    const url = window.prompt('Вставьте ссылку на YouTube видео');
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);

  const handleTableInsert = useCallback((): void => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      editor.chain().focus().setColor(e.target.value).run();
    },
    [editor],
  );

  const btnClass = (active: boolean): string =>
    classnames(styles.toolbarButton, { [styles.active]: active });

  return (
    <>
      <div className={styles.toolbar}>
        {/* Heading select */}
        <div className={styles.toolbarGroup}>
          <Select
            size="small"
            value={currentHeading()}
            onChange={handleHeadingChange}
            className={styles.headingSelect}
            variant="outlined"
            sx={{ height: 32, fontSize: '0.8125rem' }}
          >
            <MenuItem value="0">Параграф</MenuItem>
            <MenuItem value="1">Заголовок 1</MenuItem>
            <MenuItem value="2">Заголовок 2</MenuItem>
            <MenuItem value="3">Заголовок 3</MenuItem>
          </Select>
        </div>

        {/* Text formatting */}
        <div className={styles.toolbarGroup}>
          <Tooltip title="Жирный (Ctrl+B)">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('bold'))}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FormatBold fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Курсив (Ctrl+I)">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('italic'))}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <FormatItalic fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Подчёркнутый (Ctrl+U)">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('underline'))}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <FormatUnderlined fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Зачёркнутый">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('strike'))}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <FormatStrikethrough fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Выделение">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('highlight'))}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
              <HighlightIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Цвет текста">
            <input
              type="color"
              className={styles.colorInput}
              onChange={handleColorChange}
              value={(editor.getAttributes('textStyle').color as string) || '#000000'}
            />
          </Tooltip>
        </div>

        {/* Alignment */}
        <div className={styles.toolbarGroup}>
          <Tooltip title="По левому краю">
            <IconButton
              size="small"
              className={btnClass(editor.isActive({ textAlign: 'left' }))}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
              <FormatAlignLeft fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="По центру">
            <IconButton
              size="small"
              className={btnClass(editor.isActive({ textAlign: 'center' }))}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
            >
              <FormatAlignCenter fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="По правому краю">
            <IconButton
              size="small"
              className={btnClass(editor.isActive({ textAlign: 'right' }))}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
              <FormatAlignRight fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="По ширине">
            <IconButton
              size="small"
              className={btnClass(editor.isActive({ textAlign: 'justify' }))}
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            >
              <FormatAlignJustify fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Lists & Quote */}
        <div className={styles.toolbarGroup}>
          <Tooltip title="Маркированный список">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('bulletList'))}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <FormatListBulleted fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Нумерованный список">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('orderedList'))}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <FormatListNumbered fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Цитата">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('blockquote'))}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <FormatQuote fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Insert */}
        <div className={styles.toolbarGroup}>
          <Tooltip title="Ссылка">
            <IconButton
              size="small"
              className={btnClass(editor.isActive('link'))}
              onClick={handleLinkOpen}
            >
              <InsertLink fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Изображение">
            <IconButton
              size="small"
              className={styles.toolbarButton}
              onClick={() => setImageDialogOpen(true)}
            >
              <ImageIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="YouTube видео">
            <IconButton size="small" className={styles.toolbarButton} onClick={handleYoutubeInsert}>
              <YouTube fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Разделитель">
            <IconButton
              size="small"
              className={styles.toolbarButton}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <HorizontalRule fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Таблица (3x3)">
            <IconButton size="small" className={styles.toolbarButton} onClick={handleTableInsert}>
              <TableChart fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Undo / Redo */}
        <div className={styles.toolbarGroup}>
          <Tooltip title="Отменить (Ctrl+Z)">
            <IconButton
              size="small"
              className={styles.toolbarButton}
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Повторить (Ctrl+Y)">
            <IconButton
              size="small"
              className={styles.toolbarButton}
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <LinkDialog
        open={linkDialogOpen}
        initialUrl={editor.getAttributes('link').href as string | undefined}
        onClose={() => setLinkDialogOpen(false)}
        onSubmit={handleLinkSubmit}
        onRemove={editor.isActive('link') ? handleLinkRemove : undefined}
      />

      <ImageUploadDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onSubmit={handleImageSubmit}
      />
    </>
  );
};
