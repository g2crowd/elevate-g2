const { resolve } = require('path');

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-inline-svg': { paths: [resolve(__dirname, 'src/assets/svg')] },
    'tailwindcss/nesting': {},
    tailwindcss: { config: './tailwind.build.config.js' },
    'postcss-svgo': {},
    autoprefixer: {}
  }
};
