import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'public/widget',
    emptyOutDir: false, // Don't delete other public assets
    lib: {
      entry: path.resolve(__dirname, 'src/widget-entry.tsx'),
      name: 'ReachTrustWidget',
      fileName: (format) => `widget.${format}.js`,
      formats: ['umd'],
    },
    rollupOptions: {
      // proper production bundle
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM',
        },
      },
      // Note: For a truly standalone widget, we might want to bundle React/ReactDOM 
      // if the target site doesn't have them. For this task, let's bundle them in 
      // so it works anywhere.
    },
    // Override commonjsOptions to include React if needed
    commonjsOptions: {
      include: /node_modules/,
    },
  },
  // We need to bundle dependencies for a standalone widget
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
