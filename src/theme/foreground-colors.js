const palette = require('./color-palette');

module.exports = {
  transparent: 'transparent',
  current: 'currentColor',
  rorange: palette.rorange,
  purple: palette.purple,
  blue: palette.blue,
  green: palette.green,
  yellow: palette.yellow,
  default: {
    DEFAULT: 'var(--elv-text-default)',
  },
  subtle: {
    DEFAULT: 'var(--elv-text-subtle)',
  },
  nonessential: {
    DEFAULT: 'var(--elv-text-nonessential)',
  },
  disabled: {
    DEFAULT: 'var(--elv-text-disabled)',
  },
  inverted: {
    DEFAULT: 'var(--elv-text-inverted)',
  },
  link: {
    DEFAULT: 'var(--elv-text-link)',
    hover: 'var(--elv-text-link-hover)',
    visited: 'var(--elv-text-link-visited)',
  },
  primary: {
    DEFAULT: 'var(--elv-text-primary)',
    hover: 'var(--elv-text-primary-hover)',
  },
  neutral: {
    0: palette.neutral[0],
    1: palette.neutral[1],
    5: palette.neutral[5],
    10: palette.neutral[10],
    20: palette.neutral[20],
    30: palette.neutral[30],
    40: palette.neutral[40],
    50: palette.neutral[50],
    70: palette.neutral[70],
    80: palette.neutral[80],
    90: palette.neutral[90],
    DEFAULT: 'var(--elv-text-neutral)',
    100: palette.neutral[100],
  },
  info: {
    DEFAULT: 'var(--elv-text-info)',
  },
  success: {
    DEFAULT: 'var(--elv-text-success)',
    data: 'var(--elv-text-success-data)',
  },
  warning: {
    DEFAULT: 'var(--elv-text-warning)',
  },
  critical: {
    DEFAULT: 'var(--elv-text-critical)',
  },
};
