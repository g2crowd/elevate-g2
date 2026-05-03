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
  css: {
    postcss: {
      plugins: [
        require('postcss-import')(),
        require('tailwindcss/nesting')(),
        require('tailwindcss')(resolve(__dirname, 'tailwind.build.config.js')),
        require('autoprefixer')(),
      ],
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist-site'),
    cssMinify: false,
    rollupOptions: {
      input: htmlFiles,
    },
  },
});
