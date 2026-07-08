# @g2crowd/elevate

G2 Elevate design system — Tailwind CSS theme, component styles, and design tokens.

## What's included

- **Design tokens** — color palette, semantic background/foreground/border colors, data visualization colors
- **Tailwind preset** — full theme config with `elv-` prefix, spacing scale, typography, shadows, animations
- **CSS component classes** — button, link, input, select, slide-out panel, pagination, dropdown menu, status badge, spin loader, progress bar
- **Figtree font** — variable-weight TTF included
- **Responsive safelist** — classes required for ViewComponent's `ResponsiveSizing` mixin

## Install

```bash
yarn add @g2crowd/elevate
```

## Usage

### Tailwind preset

Use the Elevate config as a Tailwind preset in your project:

```js
// tailwind.config.js
const elevateConfig = require('@g2crowd/elevate/tailwind');

module.exports = {
  presets: [elevateConfig],
  content: ['./src/**/*.{html,js,jsx}'],
};
```

### Import the compiled CSS

```js
import '@g2crowd/elevate/css';
```

### Use design tokens directly

```js
const { colors, backgroundColors, foregroundColors } = require('@g2crowd/elevate');

colors.purple[100];                // '#5746b2'
backgroundColors.primary.DEFAULT;  // '#5746b2'
foregroundColors.link.DEFAULT;     // '#0073f5'
```

The compiled CSS also exposes primitive palette tones as custom properties:

```css
color: var(--elv-color-purple-100);
background-color: var(--elv-color-rorange-20);
border-color: var(--elv-color-neutral-40);
```

Use `--elv-bg-*`, `--elv-text-*`, and `--elv-border-*` for semantic UI roles. Use
`--elv-color-{palette}-{tone}` when a raw palette tone is needed.

## Component examples

```bash
yarn examples
```

Opens a static HTML page showcasing every CSS component with all variants, sizes, and states.

## Development

```bash
yarn install
yarn build       # Build CSS
yarn test        # Run tests
yarn examples    # Build + open component library in browser
```

## Migration strategy

This package is being incrementally extracted from `engines/elevate/` in the UE monorepo. The migration order:

1. **Theme + Tailwind config** — design tokens, colors, spacing, typography
2. **CSS component classes** — button, link, input, select, pagination, status badge, etc.
3. **JS behaviors** — loading widget, interactive components (to be ported from UE's widget system)
4. **ViewComponent Ruby classes** — server-side component definitions (separate gem)
