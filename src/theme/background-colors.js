const palette = require('./color-palette');

module.exports = {
  transparent: palette.transparent,
  current: palette.current,
  primary: {
    5: palette.purple[5],
    10: palette.purple[10],
    20: palette.purple[20],
    30: palette.purple[30],
    40: palette.purple[40],
    60: palette.purple[60],
    80: palette.purple[80],
    DEFAULT: palette.purple[100],
    120: palette.purple[120],
  },
  neutral: {
    0: palette.neutral[0],
    1: palette.neutral[1],
    5: palette.neutral[5],
    10: palette.neutral[10],
    20: palette.neutral[20],
    DEFAULT: palette.neutral[20],
    40: palette.neutral[40],
    100: palette.neutral[100],
  },
  info: {
    20: palette.blue[20],
    DEFAULT: palette.blue[100],
  },
  critical: {
    20: palette.rorange[20],
    40: palette.rorange[40],
    DEFAULT: palette.rorange[120],
    140: palette.rorange[140],
  },
  warning: {
    20: palette.yellow[20],
    DEFAULT: palette.yellow[100],
  },
  success: {
    20: palette.green[20],
    40: palette.green[40],
    DEFAULT: palette.green[120],
  },
  brand: {
    DEFAULT: palette.rorange[100],
  },
  inverted: {
    DEFAULT: palette.neutral[0],
  },
};
