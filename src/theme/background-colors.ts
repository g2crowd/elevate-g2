import { colors } from './color-palette';

export const backgroundColors = {
  transparent: colors.transparent,
  current: colors.current,
  primary: {
    5: colors.purple[5],
    10: colors.purple[10],
    20: colors.purple[20],
    30: colors.purple[30],
    40: colors.purple[40],
    60: colors.purple[60],
    80: colors.purple[80],
    DEFAULT: colors.purple[100],
    120: colors.purple[120],
  },
  neutral: {
    0: colors.neutral[0],
    1: colors.neutral[1],
    5: colors.neutral[5],
    10: colors.neutral[10],
    20: colors.neutral[20],
    DEFAULT: colors.neutral[20],
    40: colors.neutral[40],
    100: colors.neutral[100],
  },
  info: {
    20: colors.blue[20],
    DEFAULT: colors.blue[100],
  },
  critical: {
    20: colors.rorange[20],
    40: colors.rorange[40],
    DEFAULT: colors.rorange[120],
    140: colors.rorange[140],
  },
  warning: {
    20: colors.yellow[20],
    DEFAULT: colors.yellow[100],
  },
  success: {
    20: colors.green[20],
    40: colors.green[40],
    DEFAULT: colors.green[120],
  },
  brand: {
    DEFAULT: colors.rorange[100],
  },
  inverted: {
    DEFAULT: colors.neutral[0],
  },
} as const;
