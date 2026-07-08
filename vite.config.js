import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const examplesDir = resolve(__dirname, 'examples');
const htmlFiles = readdirSync(examplesDir)
  .filter(f => f.endsWith('.html'))
  .reduce((acc, file) => {
    const name = file.replace('.html', '');
    acc[name] = resolve(examplesDir, file);
    return acc;
  }, {});

export default defineConfig({
  root: 'examples',
  resolve: {
    alias: {
      '@elevate': resolve(__dirname, 'src'),
    },
  },
  // No inline css.postcss: Vite auto-loads postcss.config.js so the plugin
  // chain (incl. unwrapComponentLayers) stays the single source of truth.
  build: {
    outDir: resolve(__dirname, 'dist-site'),
    cssMinify: false,
    rollupOptions: {
      input: htmlFiles,
    },
  },
});
