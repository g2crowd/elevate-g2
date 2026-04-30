const palette = require('./color-palette');

module.exports = {
  transparent: palette.transparent,
  current: palette.current,
  whisper: {
    DEFAULT: palette.neutral[10],
  },
  light: {
    DEFAULT: palette.neutral[20],
  },
  medium: {
    DEFAULT: palette.neutral[40],
  },
  dark: {
    DEFAULT: palette.neutral[80],
  },
  inverted: {
    DEFAULT: palette.neutral[0],
  },
  neutral: {
    DEFAULT: palette.neutral[20],
  },
  info: {
    DEFAULT: palette.blue[100],
  },
  success: {
    DEFAULT: palette.green[120],
  },
  critical: {
    DEFAULT: palette.rorange[120],
  },
  warning: {
    DEFAULT: palette.yellow[100],
  },
  primary: {
    DEFAULT: palette.purple[100],
  },
  focus: {
    DEFAULT: palette.purple[40],
  },
  'data-secondary-1': {
    DEFAULT: palette.rorange[60],
  },
};
