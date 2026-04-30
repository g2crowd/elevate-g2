# @g2crowd/elevate

G2 Elevate design system — Tailwind CSS theme, component styles, and design tokens.

## What's included

- **Design tokens** — color palette, semantic background/foreground/border colors, data visualization colors
- **Tailwind preset** — full theme config with `elv-` prefix, spacing scale, typography, shadows, animations
- **CSS component classes** — button, link, input, select, slide-out panel, pagination, dropdown menu
- **Figtree font** — variable-weight TTF included
- **Responsive safelist** — classes required for ViewComponent's `ResponsiveSizing` mixin

## Install

```bash
yarn add @g2crowd/elevate
```

## Usage

### Tailwind preset

Use the Elevate config as a Tailwind preset in your project:

```ts
// tailwind.config.ts
import elevateConfig from '@g2crowd/elevate/tailwind';

export default {
  presets: [elevateConfig],
  content: ['./src/**/*.{html,js,ts,tsx}'],
};
```

### Import the compiled CSS

To get all Elevate styles (Tailwind base + component classes + typography):

```ts
import '@g2crowd/elevate/css';
```

### Use design tokens directly

```ts
import { colors, backgroundColors, foregroundColors } from '@g2crowd/elevate';

// Access raw palette
colors.purple[100]; // '#5746b2'

// Access semantic tokens
backgroundColors.primary.DEFAULT; // '#5746b2'
foregroundColors.link.DEFAULT;    // '#0073f5'
```

## Development

```bash
yarn install
yarn build        # Build JS + CSS
yarn dev          # Watch mode (JS only)
yarn typecheck    # TypeScript check
yarn test         # Run tests
```

## Migration strategy

This package is being incrementally extracted from `engines/elevate/` in the UE monorepo. The migration order:

1. **Theme + Tailwind config** (this scaffold) — design tokens, colors, spacing, typography
2. **CSS component classes** — button, link, input, select, pagination, etc.
3. **Stimulus controllers** — interactive behavior (modal, dropdown, tooltip, etc.)
4. **ViewComponent Ruby classes** — server-side component definitions (separate gem)
