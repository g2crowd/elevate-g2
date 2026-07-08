const { resolve } = require('path');
const { addLegacySources, aliasLegacySelectors, unwrapComponentLayers } = require('./src/postcss/legacy-prefix');

const legacyPrefixOptions = {
  cwd: __dirname,
  directories: ['src', 'examples']
};

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-inline-svg')({ paths: [resolve(__dirname, 'src/assets/svg')] }),
    addLegacySources(legacyPrefixOptions),
    require('postcss-nesting')(),
    require('@tailwindcss/postcss')(),
    unwrapComponentLayers(),
    aliasLegacySelectors(legacyPrefixOptions),
    require('postcss-svgo')()
  ]
};
