import { useEditor, Editor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/react';
import { createEditorExtensions } from '../utils/editorExtensions';

interface UsePostEditorOptions {
  initialContent?: JSONContent;
  onUpdate?: (content: JSONContent) => void;
}

export const usePostEditor = ({
  initialContent,
  onUpdate,
}: UsePostEditorOptions = {}): Editor | null => {
  const editor = useEditor({
    extensions: createEditorExtensions(),
    content: initialContent ?? {
      type: 'doc',
      content: [{ type: 'paragraph' }],
    },
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => {
      onUpdate?.(ed.getJSON());
    },
  });

  return editor;
};
