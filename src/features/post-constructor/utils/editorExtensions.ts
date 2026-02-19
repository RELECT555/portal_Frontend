import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import CharacterCount from '@tiptap/extension-character-count';
import Youtube from '@tiptap/extension-youtube';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import type { Extensions } from '@tiptap/react';

export const createEditorExtensions = (): Extensions => [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
  }),
  Underline,
  Image.configure({
    inline: false,
    allowBase64: true,
    HTMLAttributes: {
      class: 'post-editor-image',
    },
  }),
  Link.configure({
    protocols: ['http', 'https', 'mailto', 'tel'],
    autolink: true,
    openOnClick: false,
    linkOnPaste: true,
    defaultProtocol: 'https',
    HTMLAttributes: {
      rel: 'noopener noreferrer',
      target: '_blank',
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Placeholder.configure({
    placeholder: 'Начните писать...',
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'post-editor-table',
    },
  }),
  TableRow,
  TableHeader,
  TableCell,
  CharacterCount,
  Youtube.configure({
    inline: false,
    HTMLAttributes: {
      class: 'post-editor-youtube',
    },
  }),
  TextStyle,
  Color.configure({
    types: [TextStyle.name],
  }),
  Highlight.configure({
    multicolor: true,
  }),
];
