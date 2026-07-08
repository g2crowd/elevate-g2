import { describe, expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function importIndex(source, importPath) {
  return source.indexOf(`@import '${importPath}'`);
}

describe('theme variable import order', () => {
  test.each(['application.css', 'components-build.css'])(
    'loads Elevate theme variables after Tailwind theme in %s',
    (fileName) => {
      const source = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
      const tailwindThemeIndex = importIndex(source, 'tailwindcss/theme');
      const themeVarsIndex = importIndex(source, './theme-vars.css');

      expect(tailwindThemeIndex).toBeGreaterThanOrEqual(0);
      expect(themeVarsIndex).toBeGreaterThan(tailwindThemeIndex);
    },
  );
});
