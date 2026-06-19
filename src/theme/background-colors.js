const palette = require('./color-palette');

module.exports = {
  transparent: 'transparent',
  current: 'currentColor',
  rorange: palette.rorange,
  purple: palette.purple,
  blue: palette.blue,
  green: palette.green,
  yellow: palette.yellow,
  primary: {
    5: 'var(--elv-bg-primary-5)',
    10: 'var(--elv-bg-primary-10)',
    20: 'var(--elv-bg-primary-20)',
    30: 'var(--elv-bg-primary-30)',
    40: 'var(--elv-bg-primary-40)',
    60: 'var(--elv-bg-primary-60)',
    80: 'var(--elv-bg-primary-80)',
    DEFAULT: 'var(--elv-bg-primary)',
    120: 'var(--elv-bg-primary-120)',
  },
  neutral: {
    0: 'var(--elv-bg-neutral-0)',
    1: 'var(--elv-bg-neutral-1)',
    5: 'var(--elv-bg-neutral-5)',
    10: 'var(--elv-bg-neutral-10)',
    20: 'var(--elv-bg-neutral-20)',
    30: palette.neutral[30],
    DEFAULT: 'var(--elv-bg-neutral)',
    40: 'var(--elv-bg-neutral-40)',
    50: palette.neutral[50],
    70: palette.neutral[70],
    80: palette.neutral[80],
    90: palette.neutral[90],
    100: 'var(--elv-bg-neutral-100)',
  },
  info: {
    20: 'var(--elv-bg-info-20)',
    DEFAULT: 'var(--elv-bg-info)',
  },
  critical: {
    20: 'var(--elv-bg-critical-20)',
    40: 'var(--elv-bg-critical-40)',
    DEFAULT: 'var(--elv-bg-critical)',
    140: 'var(--elv-bg-critical-140)',
  },
  warning: {
    20: 'var(--elv-bg-warning-20)',
    DEFAULT: 'var(--elv-bg-warning)',
  },
  success: {
    20: 'var(--elv-bg-success-20)',
    40: 'var(--elv-bg-success-40)',
    DEFAULT: 'var(--elv-bg-success)',
  },
  brand: {
    DEFAULT: 'var(--elv-bg-brand)',
  },
  inverted: {
    DEFAULT: 'var(--elv-bg-inverted)',
  },
};
