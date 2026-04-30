import { colors } from './color-palette';

export const borderColors = {
  transparent: colors.transparent,
  current: colors.current,
  whisper: {
    DEFAULT: colors.neutral[10],
  },
  light: {
    DEFAULT: colors.neutral[20],
  },
  medium: {
    DEFAULT: colors.neutral[40],
  },
  dark: {
    DEFAULT: colors.neutral[80],
  },
  inverted: {
    DEFAULT: colors.neutral[0],
  },
  neutral: {
    DEFAULT: colors.neutral[20],
  },
  info: {
    DEFAULT: colors.blue[100],
  },
  success: {
    DEFAULT: colors.green[120],
  },
  critical: {
    DEFAULT: colors.rorange[120],
  },
  warning: {
    DEFAULT: colors.yellow[100],
  },
  primary: {
    DEFAULT: colors.purple[100],
  },
  focus: {
    DEFAULT: colors.purple[40],
  },
  'data-secondary-1': {
    DEFAULT: colors.rorange[60],
  },
} as const;
