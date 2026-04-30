import { colors } from './color-palette';

export const dataColors = {
  data: {
    primary: {
      DEFAULT: colors.purple[100],
      tint1: colors.purple[80],
      tint2: colors.purple[60],
      tint3: colors.purple[40],
      tint4: colors.purple[30],
    },
    secondary: {
      1: colors.rorange[60],
      2: colors.green[60],
      3: colors.blue[60],
      4: colors.neutral[40],
    },
    tertiary: {
      1: colors.rorange[40],
      2: colors.green[40],
      3: colors.blue[40],
      4: colors.neutral[20],
    },
    neutral: {
      DEFAULT: colors.neutral[70],
      tint1: colors.neutral[50],
      tint2: colors.neutral[40],
      tint3: colors.neutral[30],
      tint4: colors.neutral[20],
    },
    success: {
      DEFAULT: colors.green[120],
      light: colors.green[40],
      text: colors.green[160],
    },
    critical: {
      DEFAULT: colors.rorange[120],
      light: colors.rorange[40],
      text: colors.rorange[140],
    },
  },
} as const;
