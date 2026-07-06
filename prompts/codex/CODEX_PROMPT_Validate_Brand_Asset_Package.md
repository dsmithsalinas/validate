# Prompt for Codex - Validate Brand Asset Package

Use this prompt in Codex to generate the initial brand asset package for Validate.

---

## Prompt

You are working inside the `validate` repository.

Create a clean, minimal **brand asset package** for Validate based on the approved brand direction below.

### Product context

Validate is an AI-powered product investment reasoning engine.

Its purpose is to help product teams make better investment decisions before they invest engineering time, money, and organizational focus.

Validate evaluates **evidence**, not ideas.

The brand should feel:

- modern
- minimal
- trustworthy
- rigorous
- analytical
- calm
- product-led
- premium
- black-and-white only

Avoid:

- gradients
- colorful AI aesthetics
- generic sparkles
- robot motifs
- chat bubbles
- anything playful or gimmicky

---

### Approved logo concept

Use the **evidence-to-decision** visual metaphor.

The logo mark should represent:

- multiple evidence inputs
- converging into a clear decision
- a right-facing directional arrow or decision point
- simple geometric construction
- monochrome presentation

Primary logo direction:

- layered horizontal bars or tapered shapes
- converging toward a right-facing arrow
- black on white
- simple enough to work as an app icon

---

### Deliverables

Create the following repository structure:

```text
/brand
  /logo
  /exports
    /png
    /favicon
    /app-icon
    /social
  BRAND.md
  ASSET_EXPORTS.md
```

### Create these documentation files

#### 1. `/brand/BRAND.md`

Document:

- brand summary
- design rationale
- logo concept
- color system
- typography direction
- usage rules
- spacing guidance
- lockup guidance
- asset inventory

Use a concise, professional tone.

#### 2. `/brand/ASSET_EXPORTS.md`

Document all intended assets and export sizes, including:

- SVG master files
- PNG exports
- favicon sizes
- app icon sizes
- social image sizes

---

### Create these SVG assets

Inside `/brand/logo`, create placeholder or initial SVG files for:

- `validate-logo-primary.svg`
- `validate-logo-horizontal.svg`
- `validate-logo-stacked.svg`
- `validate-logo-icon.svg`
- `validate-logo-badge.svg`

The SVGs should be simple, geometric, monochrome, and consistent with the approved concept.

If needed, start with clean placeholder SVGs that can be refined later, but they should still reflect the brand direction.

---

### Export planning

Document these export targets in `ASSET_EXPORTS.md`:

#### Favicon

- 16x16
- 32x32

#### App icon

- 256x256
- 512x512
- 1024x1024

#### PNG logo exports

- transparent background
- black mark
- white mark
- icon only
- badge version

#### Social preview

- 1200x630

---

### Brand constraints

Color palette:

- Black `#000000`
- White `#FFFFFF`
- Supporting grays optional in docs only

Typography direction:

- clean sans-serif
- modern
- neutral
- highly legible

Recommended families to mention:

- Inter
- Geist
- SF Pro
- Helvetica-style sans

---

### Quality bar

The output should feel like the beginning of a real software company brand system, not a casual design note.

The documentation should be polished and portfolio-quality.

The assets should be practical, minimal, and consistent with Validate's philosophy.

---

## Suggested next step after completion

After creating the files, summarize:

1. What files were created
2. What still needs manual design refinement
3. Which asset should be finalized first for product use
