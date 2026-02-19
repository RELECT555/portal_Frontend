import React from 'react';
import { EditorContent } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import { Card, Typography } from '@mui/material';
import { EditorToolbar } from './EditorToolbar';
import styles from '../styles/editor-content.module.scss';

interface Props {
  editor: Editor | null;
}

export const PostEditor: React.FC<Props> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const charCount = editor.storage.characterCount?.characters() ?? 0;
  const wordCount = editor.storage.characterCount?.words() ?? 0;

  return (
    <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: '#e2e8f0' }}>
      <EditorToolbar editor={editor} />
      <div className={styles.editorWrapper}>
        <div className={styles.editorContent}>
          <EditorContent editor={editor} />
        </div>
        <div className={styles.characterCount}>
          <Typography variant="caption" component="span">
            {charCount} символов &middot; {wordCount} слов
          </Typography>
        </div>
      </div>
    </Card>
  );
};
