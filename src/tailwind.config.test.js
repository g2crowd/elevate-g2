import { describe, expect, it } from 'vitest';

import tailwindConfig from './tailwind.config.js';

describe('tailwind config', () => {
  it('exports the Elevate Tailwind contract', () => {
    expect(tailwindConfig.prefix).toBe('elv-');
    expect(tailwindConfig.darkMode).toBe('class');
    expect(tailwindConfig.content).toEqual([]);
    expect(tailwindConfig.theme.fontFamily.sans).toEqual(['Figtree', 'sans-serif']);
    expect(tailwindConfig.theme.screens).toMatchObject({
      sm: '600px',
      md: '750px',
      lg: '1000px',
      xl: '1270px',
      '2xl': '1400px'
    });
    expect(tailwindConfig.plugins).toHaveLength(1);
  });
});
