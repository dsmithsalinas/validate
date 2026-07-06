# Prompt for Codex - Generate Validate SVG Logo Set

Use this prompt in Codex to generate initial SVG logo assets.

---

## Context

You are working in the `validate` repository.

Validate is an AI-powered product investment reasoning engine.

The approved brand concept is:

> Evidence becomes decision.

The logo should represent multiple evidence inputs converging into a clear decision point.

The visual direction is a monochrome evidence-to-decision mark:

- stacked horizontal evidence lines
- converging into a right-facing arrow
- clean geometric construction
- black and white only
- minimal, precise, modern

---

## Task

Create initial SVG assets in:

```text
/brand/logo
```

Create these files:

```text
validate-logo-primary.svg
validate-logo-horizontal.svg
validate-logo-stacked.svg
validate-logo-icon.svg
validate-logo-badge.svg
```

---

## Design Requirements

### General

- SVG only
- black and white only
- no gradients
- no shadows
- no raster images
- no external font dependencies if possible
- clean viewBox values
- scalable
- simple paths or polygons
- readable at small sizes

### Mark

The mark should consist of:

- four horizontal evidence bars
- bars tapering or angling toward a single point
- a right-facing arrowhead
- consistent spacing
- strong silhouette

The mark should imply:

- evidence
- convergence
- decision
- clarity

### Wordmark

Use a simple text element for the wordmark in early versions.

Preferred label:

```text
Validate
```

Use a generic sans-serif stack if text is used:

```text
font-family="Inter, Geist, Helvetica, Arial, sans-serif"
```

Do not over-customize the wordmark yet.

---

## Asset Specifications

### validate-logo-icon.svg

Symbol only.

Recommended viewBox:

```text
0 0 128 128
```

### validate-logo-horizontal.svg

Icon plus wordmark.

Recommended viewBox:

```text
0 0 512 128
```

### validate-logo-primary.svg

Larger primary lockup.

Recommended viewBox:

```text
0 0 640 160
```

### validate-logo-stacked.svg

Icon above wordmark.

Recommended viewBox:

```text
0 0 320 320
```

### validate-logo-badge.svg

Black rounded square or circle with white mark.

Recommended viewBox:

```text
0 0 128 128
```

---

## Suggested SVG Geometry

For the icon, use four stacked bars:

- top bar
- upper middle bar
- lower middle bar
- bottom bar

Each bar should be a polygon that starts wide on the left and angles inward toward the arrow.

Then add a solid right-facing triangle arrowhead.

Example structure:

```svg
<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <g fill="#000000">
    <polygon points="8,24 70,24 90,44 78,44 62,32 8,32"/>
    <polygon points="8,44 78,44 94,58 80,58 66,52 8,52"/>
    <polygon points="8,64 80,64 94,70 78,70 66,72 8,72"/>
    <polygon points="8,84 62,84 78,72 90,72 70,104 8,104"/>
    <polygon points="88,42 120,64 88,86"/>
  </g>
</svg>
```

Refine the geometry so it feels balanced and professional.

---

## Acceptance Criteria

The created assets should:

- visually match the approved evidence-to-decision direction
- work in black on white
- work in white on black for badge use
- be simple enough for favicon use
- be clearly recognizable as one brand system
- avoid decorative complexity

---

## After Creating Files

Summarize:

1. Which SVG files were created.
2. Any geometry assumptions made.
3. Which asset should be visually refined first.
4. Whether the icon remains legible at small sizes.
