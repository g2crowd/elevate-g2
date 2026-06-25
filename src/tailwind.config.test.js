import { describe, expect, it } from 'vitest';
import tailwindConfig from './tailwind.config';
import palette from './theme/color-palette';
import backgroundColors from './theme/background-colors';
import foregroundColors from './theme/foreground-colors';
import borderColors from './theme/border-colors';
import dataColors from './theme/data-colors';

const paletteColorGroups = ['rorange', 'purple', 'blue', 'green', 'yellow'];
const neutralToneKeys = [0, 1, 5, 10, 20, 30, 40, 50, 70, 80, 90, 100];

function primitiveVar(color, tone) {
  return `var(--elv-color-${color}-${tone})`;
}

describe('tailwind color tokens', () => {
  it('exposes all raw palette tones as background utilities while preserving semantic backgrounds', () => {
    const { backgroundColor } = tailwindConfig.theme;

    paletteColorGroups.forEach((color) => {
      Object.keys(palette[color]).forEach((tone) => {
        if (tone === 'DEFAULT') return;

        expect(backgroundColor[color][tone]).toBe(primitiveVar(color, tone));
      });
    });

    neutralToneKeys.forEach((tone) => {
      expect(backgroundColor.neutral[tone]).toBe(backgroundColors.neutral[tone]);
    });

    expect(backgroundColor.primary.DEFAULT).toBe(backgroundColors.primary.DEFAULT);
    expect(backgroundColor.neutral.DEFAULT).toBe(backgroundColors.neutral.DEFAULT);
    expect(backgroundColor.data.primary.DEFAULT).toBe(dataColors.data.primary.DEFAULT);
  });

  it('exposes all raw palette tones as text utilities while preserving semantic foregrounds', () => {
    const { textColor } = tailwindConfig.theme;

    paletteColorGroups.forEach((color) => {
      Object.keys(palette[color]).forEach((tone) => {
        if (tone === 'DEFAULT') return;

        expect(textColor[color][tone]).toBe(primitiveVar(color, tone));
      });
    });

    neutralToneKeys.forEach((tone) => {
      expect(textColor.neutral[tone]).toBe(foregroundColors.neutral[tone]);
    });

    expect(textColor.default.DEFAULT).toBe(foregroundColors.default.DEFAULT);
    expect(textColor.neutral.DEFAULT).toBe(foregroundColors.neutral.DEFAULT);
  });

  it('exposes all raw palette tones as border utilities while preserving semantic borders', () => {
    const { borderColor } = tailwindConfig.theme;

    paletteColorGroups.forEach((color) => {
      Object.keys(palette[color]).forEach((tone) => {
        if (tone === 'DEFAULT') return;

        expect(borderColor[color][tone]).toBe(primitiveVar(color, tone));
      });
    });

    neutralToneKeys.forEach((tone) => {
      expect(borderColor.neutral[tone]).toBe(borderColors.neutral[tone]);
    });

    expect(borderColor.focus.DEFAULT).toBe(borderColors.focus.DEFAULT);
    expect(borderColor.neutral.DEFAULT).toBe(borderColors.neutral.DEFAULT);
  });
});
