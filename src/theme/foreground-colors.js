const palette_vars = require('./color-palette-vars');

module.exports = {
  transparent: 'transparent',
  current: 'currentColor',
  rorange: palette_vars.rorange,
  purple: palette_vars.purple,
  blue: palette_vars.blue,
  green: palette_vars.green,
  yellow: palette_vars.yellow,
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
    0: palette_vars.neutral[0],
    1: palette_vars.neutral[1],
    5: palette_vars.neutral[5],
    10: palette_vars.neutral[10],
    20: palette_vars.neutral[20],
    30: palette_vars.neutral[30],
    40: palette_vars.neutral[40],
    50: palette_vars.neutral[50],
    70: palette_vars.neutral[70],
    80: palette_vars.neutral[80],
    90: palette_vars.neutral[90],
    DEFAULT: 'var(--elv-text-neutral)',
    100: palette_vars.neutral[100],
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
