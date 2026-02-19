import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          query: ['@tanstack/react-query'],
          tiptap: [
            '@tiptap/starter-kit',
            '@tiptap/react',
            '@tiptap/pm',
            '@tiptap/extension-image',
            '@tiptap/extension-link',
            '@tiptap/extension-underline',
            '@tiptap/extension-text-align',
            '@tiptap/extension-placeholder',
            '@tiptap/extension-table',
            '@tiptap/extension-table-row',
            '@tiptap/extension-table-header',
            '@tiptap/extension-table-cell',
            '@tiptap/extension-character-count',
            '@tiptap/extension-youtube',
            '@tiptap/extension-color',
            '@tiptap/extension-text-style',
            '@tiptap/extension-highlight',
          ],
        },
      },
    },
  },
});
