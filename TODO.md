# @g2crowd/elevate — Component Migration TODO

Status of extracting Elevate design system CSS from UE's Rails engine into this npm package.

## Legend

| Column | Meaning |
|--------|---------|
| **UE Refs** | Render calls outside `engines/elevate/` (app/, packs/, other engines) |
| **Complexity** | Effort to extract CSS: **L**ow (<20 elv- refs), **M**edium (20–60), **H**igh (60+), **XH** (100+ or deep sub-tree) |
| **Style** | Current UE approach: `SV` = StyleVariants (needs full extraction), `CSS` = already has a CSS file, `BEM` = already converted to BEM, `mix` = combination |

---

## Done (in package today — v0.8.0)

| Component | UE Refs | CSS Lines | Notes |
|-----------|---------|-----------|-------|
| button | 634 | 246 | Reference implementation, live in prod for months |
| link | 151 | 69 | |
| input | — | 72 | Shared by text_input, search_input, number_input |
| select | — | 42 | Shared by collection_select, selectbox |
| pagination | 1 | 92 | |
| avatar | 6 | 64 | Fully BEM (`avatar avatar--{size}`) |
| breadcrumbs | 6 | 51 | |
| chip | 20 | 101 | |
| notification-badge | 4 | 58 | |
| progress-bar | 6 | 50 | |
| spin-loader | 24 | 40 | |
| status-badge | 106 | 97 | |
| tab | 10 | 82 | |
| button-group | 33 | 66 | |
| **vendor/select2** | — | 727 | |
| **vendor/choices** | — | — | |

---

## Tier 1 — High Impact, Low-Medium Complexity

These are heavily used across UE and straightforward to extract (mostly StyleVariants → BEM).

| Component | UE Refs | Complexity | Style | What to extract |
|-----------|---------|------------|-------|-----------------|
| **typography** | 1950+ | M | SV | Font sizes, weights, line-heights. The most-used component — every `P`, `H`, `Span`, `Label`, `Div` variant. Consider a `typography.css` with classes like `text--sm`, `text--md`, etc. The ViewComponent can keep rendering these. |
| **icon** | 697 | L | SV | Just sizing (`icon--xs` through `icon--xl`) + fill utilities. SVG icons are inline, no CSS for the icons themselves. |
| **content-card** | 323 | M | SV | Card container with padding, border, border-radius variants. 87 elv- refs but pattern is repetitive. |
| **inset-card** | 72 | L | SV | Simpler card variant — colored background, padding. 8 elv- refs. |

## Tier 2 — Medium Impact, Medium Complexity

Used regularly, need thoughtful CSS extraction.

| Component | UE Refs | Complexity | Style | What to extract |
|-----------|---------|------------|-------|-----------------|
| **icon-button** | 49 | H | SV | Round/square button wrapping an icon. 102 elv- refs, Stimulus controller. Shares traits with button but distinct sizing/shape. |
| **notification** | 32 | M | SV | Toast-like notification bar. 47 elv- refs, Stimulus controller for dismiss. |
| **toast** | 13 | M | SV | Similar to notification but positioned fixed. 51 elv- refs, Stimulus controller. |
| **control-button** | 18 | H | SV | Specialized button variant. 85 elv- refs. |
| **product-avatar** | 65 | M | SV | Avatar with product-specific decorations. 43 elv- refs. Depends on avatar CSS. |
| **star-rating** | 14 | L | SV | SVG stars + size variants. 4 elv- refs in component (most styling in SVG). Has sub-component. |
| **table** | 50 | H | SV | Table container, rows, headers, sortable headers, bulk actions. 7 sub-directories. 8 elv- refs in root but scattered across sub-components. Stimulus controller. |
| **dropdown-menu** | 12 | M | SV+CSS | 33 elv- refs, Stimulus controller, Floating UI. Already has 16-line CSS file in UE. 2 sub-components (item, divider). |
| **popover** | 18 | M | SV | 49 elv- refs, Stimulus controller, Floating UI. Similar to tooltip but with richer content. |

## Tier 3 — Lower Impact or Higher Complexity

Less frequently used, or complex enough to warrant careful planning.

| Component | UE Refs | Complexity | Style | What to extract |
|-----------|---------|------------|-------|-----------------|
| **slide-out-panel** | 28 | L | CSS | Already has a 31-line BEM CSS file in UE (`slide-out-panel`, `--third`, `--half`, `--full`). Just needs to move into package. Easiest win. |
| **accordion** | 35 | M | SV | Two sub-components (list, show_more). List items have 16 elv- refs, show_more has 13. |
| **product-chip** | 16 | L | SV | 21 elv- refs. Small chip with product avatar. |
| **sentiment-chip** | 10 | M | SV | 33 elv- refs. Colored chip for sentiment display. |
| **solution-chip** | 4 | M | SV | 35 elv- refs. Similar to product-chip. |
| **product-details** | 30 | M | SV | 25 elv- refs. Product info layout. |
| **number-change** | 8 | L | SV | 7 elv- refs. Up/down indicator with number. |
| **filter-dropdown** | 10 | H | SV | 99 elv- refs, Stimulus controller. Complex dropdown with search/filter. |
| **index-nav** | 3 | M | SV | 12 elv- refs, Stimulus controller. Side navigation. 2 sub-components. |
| **rating-distribution-bar** | 1 | L | SV | 23 elv- refs. Bar chart for review distribution. |
| **simple-table-body** | — | L | SV | 16 elv- refs. Simpler table variant. |
| **media-carousel** | — | M | CSS | Already has 63-line CSS file in UE. Swiper integration. |

## Tier 4 — Form System

The form system is the biggest single body of work. Each sub-component has its own styling. Recommend extracting incrementally — the shared `input.css` and `select.css` already cover the base input/select styling.

| Component | UE Refs | Complexity | Style | What to extract |
|-----------|---------|------------|-------|-----------------|
| **form/toggle** | 15 | H | SV | 52+63 elv- refs across toggle + toggle_input. Custom switch UI. |
| **form/check-box** | 28 | H | SV | 70 elv- refs. Custom checkbox with SVG check icon. Group variant adds 14 more. |
| **form/radio-button** | 18 | H | SV | 58 elv- refs. Custom radio with unselect variant (+22). Group adds 3. |
| **form/number-radio-button** | 3 | M | SV | 54 elv- refs. Numeric radio selector. Group adds 16. |
| **form/text-input** | 18 | M | SV | 32 elv- refs. Already uses `input.css` for base. Mostly layout (icon positioning). Copy sub-component adds 3. |
| **form/text-area** | 9 | L | SV | 3+3 elv- refs. Inherits from text-input. |
| **form/file-input** | 0 | M | SV | 45 elv- refs. Drag-and-drop file upload UI. |
| **form/search-input** | 0 | L | SV | 13 elv- refs. Results sub-component adds 15. |
| **form/label** | 48 | L | SV | 21 elv- refs. Shared across all form fields. |
| **form/helper-text** | 12 | L | SV | 16 elv- refs. Error/success/default states. |
| **form/reorder** | 6 | L | SV | Drag-and-drop list. Item + drag_handle sub-components. |

## Not Migrating

| Component | Reason |
|-----------|--------|
| **modal** | Implementation needs rework before extracting |
| **slide-out-panel** | Implementation needs rework before extracting |
| **tooltip** | Basically the Nessy tooltip, not worth extracting |
| **form/combobox** | Deprecated — "it's trash" |
| **form/selectbox** | Deprecated — replaced by `enhanced: true` select |
| **tailwind-viewer** | Dev-only debug tool |

---

## Recommended Order of Work

### Phase 1 — Cards & Icons
1. **icon** — highest usage (697 refs), trivial CSS (just sizing)
2. **content-card** — 323 refs, repetitive padding/border pattern
3. **inset-card** — 72 refs, simpler variant of content-card

### Phase 2 — Interactive Components
4. **icon-button** — 49 refs, round icon buttons
5. **control-button** — 18 refs, specialized buttons
6. **notification** — 32 refs, notification bar
7. **toast** — 13 refs, fixed-position notifications
8. **dropdown-menu** — already has partial CSS file, 12 refs but foundational
9. **popover** — 18 refs, floating content panel

### Phase 3 — Data Display
10. **table** — 50 refs, complex but high-value
11. **star-rating** — 14 refs, SVG-based
12. **accordion** — 35 refs, expand/collapse
13. **number-change** — 8 refs, simple indicator
14. **rating-distribution-bar** — 1 ref, bar chart

### Phase 4 — Product-Specific Chips
15. **product-avatar** — 65 refs, depends on avatar
16. **product-chip** — 16 refs
17. **sentiment-chip** — 10 refs
18. **solution-chip** — 4 refs
19. **product-details** — 30 refs

### Phase 5 — Form System
20. **form/label** + **form/helper-text** — shared across all fields
21. **form/toggle** — custom switch, high complexity
22. **form/check-box** — custom checkbox
23. **form/radio-button** — custom radio
24. **form/text-input** — layout around existing input.css
25. **form/text-area** — inherits from text-input
26. **form/number-radio-button** — numeric selector
27. **form/file-input** — drag-and-drop
28. **form/search-input** — search with results
29. **form/reorder** — drag-and-drop list

### Phase 6 — Remaining
30. **filter-dropdown** — complex, low usage
31. **index-nav** — low usage
32. **media-carousel** — move existing CSS file
33. **simple-table-body** — low usage
34. **typography** — most refs (1950+) but most complex to extract due to the ViewComponent generating different HTML elements (p, h1-h6, span, div, label). May be better as Tailwind theme utilities than BEM classes. Needs design discussion.

---

## Notes

- **Typography is a special case.** It's by far the most-used component but its styling is deeply tied to Tailwind's text utilities (`elv-text-base`, `elv-leading-base`, etc.) and semantic HTML elements. Extracting it as BEM would mean classes like `text--sm`, `text--md`, `text--lg` for every element type × size × weight combination. This might be better served by keeping it as Tailwind theme config rather than CSS components. Discuss before starting.

- **Media carousel** already has a CSS file but it's tightly coupled to Swiper.js. Move it as a vendor-style file (`vendor/swiper.css`) rather than a component.

- **Form system** depends on the shared `input.css` and `select.css` already in the package. The remaining work is mostly custom controls (toggle, checkbox, radio) and layout (text-input icon positioning, file-input drop zone).

- **Each component migration** follows the same pattern established with the first batch: write BEM CSS in this package → update UE ViewComponent `before_render` to emit BEM classes → update tests to assert BEM/ARIA instead of utilities.
