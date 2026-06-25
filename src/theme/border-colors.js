const palette_vars = require('./color-palette-vars');

module.exports = {
  transparent: 'transparent',
  current: 'currentColor',
  rorange: palette_vars.rorange,
  purple: palette_vars.purple,
  blue: palette_vars.blue,
  green: palette_vars.green,
  yellow: palette_vars.yellow,
  whisper: {
    DEFAULT: 'var(--elv-border-whisper)',
  },
  light: {
    DEFAULT: 'var(--elv-border-light)',
  },
  medium: {
    DEFAULT: 'var(--elv-border-medium)',
  },
  dark: {
    DEFAULT: 'var(--elv-border-dark)',
  },
  inverted: {
    DEFAULT: 'var(--elv-border-inverted)',
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
    DEFAULT: 'var(--elv-border-neutral)',
    100: palette_vars.neutral[100],
  },
  info: {
    DEFAULT: 'var(--elv-border-info)',
  },
  success: {
    DEFAULT: 'var(--elv-border-success)',
  },
  critical: {
    DEFAULT: 'var(--elv-border-critical)',
  },
  warning: {
    DEFAULT: 'var(--elv-border-warning)',
  },
  primary: {
    DEFAULT: 'var(--elv-border-primary)',
  },
  focus: {
    DEFAULT: 'var(--elv-border-focus)',
  },
  'data-secondary-1': {
    DEFAULT: 'var(--elv-border-data-secondary-1)',
  },
};
