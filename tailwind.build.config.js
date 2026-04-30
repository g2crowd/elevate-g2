const baseConfig = require('./src/tailwind.config');

module.exports = {
  ...baseConfig,
  content: [
    './src/css/**/*.css',
    './examples/**/*.html'
  ]
};
