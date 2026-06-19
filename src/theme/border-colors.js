const palette = require('./color-palette');

module.exports = {
  transparent: 'transparent',
  current: 'currentColor',
  rorange: palette.rorange,
  purple: palette.purple,
  blue: palette.blue,
  green: palette.green,
  yellow: palette.yellow,
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
    DEFAULT: 'var(--elv-border-neutral)',
    100: palette.neutral[100],
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
