const {
  scopedPreflightStyles,
  isolateInsideOfContainer
} = require('tailwindcss-scoped-preflight');

const palette = require('./theme/color-palette');
const data_colors = require('./theme/data-colors');
const background_colors = require('./theme/background-colors');
const foreground_colors = require('./theme/foreground-colors');
const border_colors = require('./theme/border-colors');
const responsive_safelist = require('./theme/responsive-safelist');

module.exports = {
  content: [],
  safelist: responsive_safelist,
  prefix: 'elv-',
  theme: {
    backgroundColor: {
      ...background_colors,
      ...data_colors
    },
    textColor: {
      ...palette,
      ...foreground_colors
    },
    borderColor: border_colors,
    fill: {
      ...foreground_colors,
      ...palette
    },
    stroke: {
      ...palette
    },
    outlineColor: {
      ...palette
    },
    borderRadius: {
      0: '0',
      '2xs': '0.125rem',
      xs: '0.25rem',
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.25rem',
      full: '9999rem',
      'pill-3xs': '0.5rem',
      'pill-2xs': '0.75rem',
      'pill-xs': '1rem',
      'pill-sm': '1.25rem',
      'pill-md': '1.5rem',
      'pill-lg': '3rem',
      'l-2xs': '0.125rem 0 0 0.125rem',
      'r-2xs': '0 0.125rem 0.125rem 0',
      't-2xs': '0.125rem 0.125rem 0 0',
      'b-2xs': '0 0 0.125rem 0.125rem',
      'l-xs': '0.25rem 0 0 0.25rem',
      'r-xs': '0 0.25rem 0.25rem 0',
      't-xs': '0.25rem 0.25rem 0 0',
      'b-xs': '0 0 0.25rem 0.25rem',
      'l-sm,': '0.5rem 0 0 0.5rem',
      'r-sm': '0 0.5rem 0.5rem 0',
      't-sm': '0.5rem 0.5rem 0 0',
      'b-sm': '0 0 0.5rem 0.5rem',
      'l-md': '0.75rem 0 0 0.75rem',
      'r-md': '0 0.75rem 0.75rem 0',
      't-md': '0.75rem 0.75rem 0 0',
      'b-md': '0 0 0.75rem 0.75rem',
      'l-lg': '1rem 0 0 1rem',
      'r-lg': '0 1rem 1rem 0',
      't-lg': '1rem 1rem 0 0',
      'b-lg': '0 0 1rem 1rem',
      'l-xl': '1.25rem 0 0 1.25rem',
      'r-xl': '0 1.25rem 1.25rem 0',
      't-xl': '1.25rem 1.25rem 0 0',
      'b-xl': '0 0 1.25rem 1.25rem'
    },
    borderWidth: {
      DEFAULT: '0.5px',
      0: '0',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px'
    },
    boxShadow: {
      0: 'none',
      1: '0px 0px 1px 0px rgba(32, 31, 35, 0.32), 0px 4px 4px 0px rgba(32, 31, 35, 0.04)',
      2: '0px 0px 1px 0px rgba(32, 31, 35, 0.32), 0px 8px 14px -2px rgba(32, 31, 35, 0.15)',
      3: '0px 0px 1px 0px rgba(32, 31, 35, 0.32), 0px 18px 28px -4px rgba(32, 31, 35, 0.15)',
      'left-1': '0px 0px 1px 0px rgba(32, 31, 35, 0.32), -4px 0px 4px 0px rgba(32, 31, 35, 0.04)',
      'left-2': '0px 0px 1px 0px rgba(32, 31, 35, 0.32), -8px 0px 14px -2px rgba(32, 31, 35, 0.15)',
      'left-3': '0px 0px 1px 0px rgba(32, 31, 35, 0.32), -18px 0px 28px -4px rgba(32, 31, 35, 0.15)',
      'right-1': '0px 0px 1px 0px rgba(32, 31, 35, 0.32), 4px 0px 4px 0px rgba(32, 31, 35, 0.04)',
      'right-2': '0px 0px 1px 0px rgba(32, 31, 35, 0.32), 8px 0px 14px -2px rgba(32, 31, 35, 0.15)',
      'right-3': '0px 0px 1px 0px rgba(32, 31, 35, 0.32), 18px 0px 28px -4px rgba(32, 31, 35, 0.15)',
      'ui-focus': '0px 0px 0px 0.5px rgb(255, 255, 255), 0px 0px 0px 3px rgb(195, 189, 229)',
      'button-secondary-press': '0px 0px 4px 1px rgba(32, 31, 35, 0.20)',
      'inset': 'inset 0 0 4px 1px rgba(32, 31, 35, 0.20)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
    },
    outlineWidth: {
      3: '3px'
    },
    spacing: {
      0: '0', px: '1px', 0.5: '0.125rem', 1.5: '0.375rem', 2.5: '0.625rem', 3.5: '0.875rem',
      ...Object.fromEntries(
        Array.from({ length: 100 }, (_, i) => [i + 1, `${(i + 1) * 0.25}rem`])
      )
    },
    fontFamily: {
      sans: ['Figtree', 'sans-serif'],
      body: ['Figtree', 'sans-serif'],
      heading: ['Figtree', 'sans-serif'],
      label: ['Figtree', 'sans-serif'],
      figtree: ['Figtree', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.3125rem',
      xl: '1.75rem',
      '2xl': '2.375rem',
      '3xl': '3.1875rem',
      '4xl': '4.1875rem',
      inherit: 'inherit'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    fontStyle: {
      'not-italic': 'normal',
      italic: 'italic'
    },
    lineHeight: {
      xs: '1rem',
      sm: '1.25rem',
      base: '1.5rem',
      lg: '1.75rem',
      xl: '2.25rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '5rem'
    },
    screens: {
      sm: '600px',
      md: '750px',
      lg: '1000px',
      xl: '1270px',
      '2xl': '1400px'
    },
    content: {
      '200B': '"\u200B"'
    },
    extend: {
      scale: {
        40: '0.4',
        60: '0.6'
      },
      keyframes: {
        translateXToZero: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        aiGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        dialogShake: {
          '0%': { transform: 'translateX(0)' },
          '15%': { transform: 'translateX(-8px)' },
          '30%': { transform: 'translateX(8px)' },
          '45%': { transform: 'translateX(-6px)' },
          '60%': { transform: 'translateX(6px)' },
          '75%': { transform: 'translateX(-3px)' },
          '90%': { transform: 'translateX(3px)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'slide-transition-in': 'translateXToZero 0.5s ease-in-out forwards',
        'ai-gradient': 'aiGradient 3s ease infinite',
        'dialog-shake': 'dialogShake 0.4s ease'
      },
      aspectRatio: {
        '18/9': '18 / 9'
      }
    }
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('[elv]')
    })
  ]
};
