const palette = require('./color-palette');

module.exports = {
  data: {
    primary: {
      DEFAULT: palette.purple[100],
      tint1: palette.purple[80],
      tint2: palette.purple[60],
      tint3: palette.purple[40],
      tint4: palette.purple[30],
    },
    secondary: {
      1: palette.rorange[60],
      2: palette.green[60],
      3: palette.blue[60],
      4: palette.neutral[40],
    },
    tertiary: {
      1: palette.rorange[40],
      2: palette.green[40],
      3: palette.blue[40],
      4: palette.neutral[20],
    },
    neutral: {
      DEFAULT: palette.neutral[70],
      tint1: palette.neutral[50],
      tint2: palette.neutral[40],
      tint3: palette.neutral[30],
      tint4: palette.neutral[20],
    },
    success: {
      DEFAULT: palette.green[120],
      light: palette.green[40],
      text: palette.green[160],
    },
    critical: {
      DEFAULT: palette.rorange[120],
      light: palette.rorange[40],
      text: palette.rorange[140],
    },
  },
};
