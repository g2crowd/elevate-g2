import { describe, expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const colors = require('./color-palette');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themeVarsPath = path.resolve(__dirname, '../css/theme-vars.css');
const themeVars = fs.readFileSync(themeVarsPath, 'utf8');

function cssVariableValue(name) {
  const match = themeVars.match(new RegExp(`${name}:\\s*([^;]+);`));

  return match?.[1]?.trim().toLowerCase();
}

describe('primitive color palette CSS variables', () => {
  test('exposes each palette tone as --elv-color-{palette}-{tone}', () => {
    for (const [paletteName, palette] of Object.entries(colors)) {
      if (typeof palette !== 'object') continue;

      for (const [tone, value] of Object.entries(palette)) {
        if (tone === 'DEFAULT') continue;

        expect(cssVariableValue(`--elv-color-${paletteName}-${tone}`)).toBe(
          value.toLowerCase(),
        );
      }
    }
  });
});
