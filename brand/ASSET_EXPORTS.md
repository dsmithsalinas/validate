# Validate - ASSET_EXPORTS.md

**Status:** Working Draft  
**Version:** 0.1  
**Owner:** Dustin  
**Reviewer:** Chief Skeptic

---

## Purpose

This document defines the initial asset export plan for Validate's brand system.

The goal is to keep brand assets simple, consistent, and production-ready across:

- product UI
- repository documentation
- website usage
- app icons
- favicons
- social previews
- presentations

Validate's current brand direction is monochrome only: black, white, and supporting grays.

---

## Source Asset Principles

All primary brand assets should originate from SVG source files.

SVGs are the master files.

PNG files are exports.

Do not manually edit exported PNG files unless required for a specific platform constraint.

---

## Recommended File Structure

```text
/brand
  /logo
    validate-logo-primary.svg
    validate-logo-horizontal.svg
    validate-logo-stacked.svg
    validate-logo-icon.svg
    validate-logo-badge.svg
  /exports
    /png
    /favicon
    /app-icon
    /social
  BRAND.md
  ASSET_EXPORTS.md
```

---

## SVG Master Files

### `/brand/logo/validate-logo-primary.svg`

Primary full logo lockup.

Use for:

- landing page hero
- README header
- presentations
- brand documentation

Recommended composition:

- evidence-to-decision icon on the left
- Validate wordmark on the right
- black on transparent or white background

---

### `/brand/logo/validate-logo-horizontal.svg`

Compact horizontal lockup.

Use for:

- navigation headers
- product header
- documentation header
- GitHub README

Recommended composition:

- smaller icon on the left
- Validate wordmark on the right
- optimized for medium-width layouts

---

### `/brand/logo/validate-logo-stacked.svg`

Stacked lockup.

Use for:

- presentation covers
- square-ish spaces
- brand title slides

Recommended composition:

- icon centered above wordmark
- balanced vertical spacing

---

### `/brand/logo/validate-logo-icon.svg`

Symbol-only mark.

Use for:

- favicon source
- app icon source
- small UI surfaces
- compact brand references

Recommended composition:

- evidence-to-decision mark only
- no wordmark
- simplified enough to remain legible at small sizes

---

### `/brand/logo/validate-logo-badge.svg`

Circular or rounded-square badge version.

Use for:

- social profile image
- app icon variants
- dark-mode surfaces
- compact identity usage

Recommended composition:

- black badge
- white evidence-to-decision mark
- no wordmark

---

## PNG Logo Exports

Export from SVG source files.

### Transparent PNGs

```text
/brand/exports/png/validate-logo-primary-black-transparent.png
/brand/exports/png/validate-logo-primary-white-transparent.png
/brand/exports/png/validate-logo-horizontal-black-transparent.png
/brand/exports/png/validate-logo-horizontal-white-transparent.png
/brand/exports/png/validate-logo-icon-black-transparent.png
/brand/exports/png/validate-logo-icon-white-transparent.png
/brand/exports/png/validate-logo-badge-black-transparent.png
/brand/exports/png/validate-logo-badge-white-transparent.png
```

Recommended export widths:

- 512 px
- 1024 px
- 2048 px

Naming convention:

```text
<asset-name>-<color>-transparent-<width>.png
```

Example:

```text
validate-logo-horizontal-black-transparent-1024.png
```

---

## Favicon Exports

Source:

```text
/brand/logo/validate-logo-icon.svg
```

Exports:

```text
/brand/exports/favicon/favicon-16x16.png
/brand/exports/favicon/favicon-32x32.png
/brand/exports/favicon/favicon.ico
/brand/exports/favicon/apple-touch-icon.png
```

Recommended sizes:

- 16x16
- 32x32
- 180x180 Apple touch icon

Guidance:

Use the simplified icon mark.

Avoid the full wordmark at favicon sizes.

---

## App Icon Exports

Source:

```text
/brand/logo/validate-logo-badge.svg
```

Exports:

```text
/brand/exports/app-icon/app-icon-256.png
/brand/exports/app-icon/app-icon-512.png
/brand/exports/app-icon/app-icon-1024.png
```

Recommended sizes:

- 256x256
- 512x512
- 1024x1024

Guidance:

Use either:

- black rounded square with white mark
- white rounded square with black mark

The icon should remain simple enough to be identifiable at small sizes.

---

## Social Preview Exports

Source:

```text
/brand/logo/validate-logo-primary.svg
```

Exports:

```text
/brand/exports/social/social-preview-1200x630.png
/brand/exports/social/social-preview-square-1200x1200.png
```

Recommended sizes:

- 1200x630 for Open Graph / social sharing
- 1200x1200 for square social previews

Suggested layout:

- white or near-white background
- primary logo centered
- optional short line: "Evidence -> Reasoning -> Decision"

Avoid busy backgrounds.

---

## README / Documentation Usage

Recommended asset:

```text
/brand/logo/validate-logo-horizontal.svg
```

Usage:

- README header
- docs index page
- RFC cover sections

Keep documentation usage simple.

Do not over-brand technical files.

---

## Presentation Usage

Recommended assets:

- `validate-logo-primary.svg`
- `validate-logo-stacked.svg`
- `validate-logo-badge.svg`

Use cases:

- title slide
- footer mark
- section dividers
- portfolio walkthrough

---

## Color Variants

### Black Variant

Use on:

- white backgrounds
- light gray backgrounds
- documentation
- product UI

### White Variant

Use on:

- black backgrounds
- dark UI surfaces
- badges
- social profile images

### Gray Variant

Use sparingly for:

- brand guidelines
- inactive states
- layout examples

Gray should not replace the primary black/white system.

---

## Do Not Export

Avoid generating these variants unless a clear need exists:

- colorful versions
- gradient versions
- animated logos
- heavily shadowed logos
- 3D logos
- AI sparkle variants
- mascot versions

These conflict with the current Validate brand direction.

---

## Export Quality Checklist

Before accepting assets:

- Logo remains clear at small sizes.
- Mark works without the wordmark.
- SVG paths are clean.
- PNG exports are not blurry.
- Transparent versions have no stray background.
- White versions are visible on black.
- Black versions are visible on white.
- No unapproved colors are introduced.
- File names follow the naming convention.

---

## Open Questions

- Should the badge use a circle or rounded square as the default?
- Should the top evidence bar use grayscale, or should the mark be pure black?
- Should the arrowhead be visually larger for favicon legibility?
- Should the mark be simplified further for 16x16 usage?
- Should the wordmark be custom-drawn later rather than using a standard sans-serif?

---

## Current Recommendation

Use SVG master files as the source of truth and generate PNG exports only after the logo geometry is finalized.

Do not over-invest in export production until the core mark is converted into clean vector form.
