import { colors } from './color-palette';

export const foregroundColors = {
  transparent: colors.transparent,
  current: colors.current,
  default: {
    DEFAULT: colors.neutral[100],
  },
  subtle: {
    DEFAULT: colors.neutral[80],
  },
  nonessential: {
    DEFAULT: colors.neutral[70],
  },
  disabled: {
    DEFAULT: colors.neutral[20],
  },
  inverted: {
    DEFAULT: colors.neutral[0],
  },
  link: {
    DEFAULT: colors.blue[100],
    hover: colors.blue[120],
    visited: colors.blue[80],
  },
  primary: {
    DEFAULT: colors.purple[100],
    hover: colors.purple[120],
  },
  neutral: {
    DEFAULT: colors.neutral[80],
  },
  info: {
    DEFAULT: colors.blue[160],
  },
  success: {
    DEFAULT: colors.green[160],
    data: colors.green[120],
  },
  warning: {
    DEFAULT: colors.yellow[160],
  },
  critical: {
    DEFAULT: colors.rorange[140],
  },
} as const;
