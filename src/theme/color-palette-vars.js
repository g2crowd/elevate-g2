const colors = require('./color-palette');

function defaultToneFor(paletteName, palette) {
  if (!palette.DEFAULT) return null;

  const defaultTone = Object.entries(palette).find(([tone, value]) => (
    tone !== 'DEFAULT' &&
    value.toLowerCase() === palette.DEFAULT.toLowerCase()
  ))?.[0];

  if (!defaultTone) {
    throw new Error(`No primitive tone matches ${paletteName}.DEFAULT`);
  }

  return defaultTone;
}

module.exports = Object.fromEntries(
  Object.entries(colors)
    .filter(([, palette]) => (
      palette &&
      typeof palette === 'object' &&
      !Array.isArray(palette)
    ))
    .map(([paletteName, palette]) => {
      const defaultTone = defaultToneFor(paletteName, palette);

      return [
        paletteName,
        Object.fromEntries(
          Object.keys(palette).map((tone) => [
            tone,
            `var(--elv-color-${paletteName}-${tone === 'DEFAULT' ? defaultTone : tone})`
          ]),
        ),
      ];
    }),
);
