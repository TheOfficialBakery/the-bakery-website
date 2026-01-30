# Design System

This document defines all design tokens and visual standards for The Bakery website.

## Color Palette

### Primary Colors (Warm Golden Browns)

Derived from the logo, these are the core brand colors.

| Name | Variable | Hex | Usage |
|------|----------|-----|-------|
| Bread Dark | `--bread-dark` | `#8B6914` | Primary accent, headings |
| Bread Medium | `--bread-medium` | `#A67C3D` | Secondary accent |
| Bread Light | `--bread-light` | `#C4A35A` | Borders, subtle accents |
| Bread Golden | `--bread-golden` | `#D4A843` | Highlights, hover states |

### Neutral Colors (Cream/Beige)

Background colors that complement the primary palette.

| Name | Variable | Hex | Usage |
|------|----------|-----|-------|
| Cream Dark | `--cream-dark` | `#E8DCC8` | Secondary backgrounds |
| Cream Light | `--cream-light` | `#F5EEE0` | Card backgrounds |
| Cream White | `--cream-white` | `#FDF9F3` | Page backgrounds |

### Dark Colors

For text and dark sections.

| Name | Variable | Hex | Usage |
|------|----------|-----|-------|
| Dark Brown | `--dark-brown` | `#2C2C2C` | Body text |
| Dark Black | `--dark-black` | `#1A1A1A` | Headings, footer |
| Dark Soft | `--dark-soft` | `#3D3D3D` | Secondary text |

## Gradients

```css
--gradient-bread: linear-gradient(135deg, var(--bread-dark) 0%, var(--bread-golden) 100%);
--gradient-cream: linear-gradient(180deg, var(--cream-white) 0%, var(--cream-light) 100%);
--gradient-dark: linear-gradient(135deg, var(--dark-black) 0%, var(--dark-brown) 100%);
```

## Typography

### Font Families

| Purpose | Font | Variable |
|---------|------|----------|
| Body | Outfit | `--font-primary` |
| Headings | Playfair Display | `--font-display` |

### Font Sizes

Use `clamp()` for responsive typography:

```css
/* Hero title */
font-size: clamp(2.5rem, 5vw, 4rem);

/* Section headings */
font-size: clamp(2rem, 4vw, 3rem);

/* Tagline */
font-size: clamp(1.2rem, 2.5vw, 1.6rem);
```

### Font Weights

| Weight | Usage |
|--------|-------|
| 400 | Body text |
| 600 | Buttons, links |
| 700 | Subheadings, bold text |
| 800 | Main headings |

## Spacing

### Section Padding

```css
--section-padding: 100px 0;  /* Desktop */
--section-padding: 80px 0;   /* Tablet */
--section-padding: 60px 0;   /* Mobile */
```

### Container

```css
max-width: 1200px;
padding: 0 24px;  /* Desktop */
padding: 0 16px;  /* Mobile */
```

## Shadows

Shadows use brand colors for a warmer feel:

```css
--shadow-soft: 0 4px 20px rgba(139, 105, 20, 0.1);
--shadow-medium: 0 8px 40px rgba(139, 105, 20, 0.15);
--shadow-strong: 0 20px 60px rgba(26, 26, 26, 0.2);
```

## Border Radius

| Element | Radius |
|---------|--------|
| Buttons | `50px` (pill shape) |
| Cards | `20px` - `24px` |
| Icons containers | `12px` |
| Image frames | `30px` |

## Transitions

```css
--transition-fast: 0.2s ease;
--transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

## Responsive Breakpoints

| Breakpoint | Target | CSS Media Query |
|------------|--------|-----------------|
| 1024px | Tablet Landscape | `@media (max-width: 1024px)` |
| 768px | Tablet Portrait | `@media (max-width: 768px)` |
| 480px | Mobile | `@media (max-width: 480px)` |
| 360px | Small Mobile | `@media (max-width: 360px)` |
| Touch | Touch Devices | `@media (hover: none) and (pointer: coarse)` |

## Icons

All icons should:

- Use the warm golden-brown color palette
- Be PNG format with transparent or white background
- Be sized at least 400x400px source
- Display at these sizes:
  - Feature icons: 40x40px
  - Product icons: 48-64px
  - Contact icons: 40-48px

## Focus States (Accessibility)

All interactive elements have `:focus-visible` styles:

```css
.btn:focus-visible,
.nav-links a:focus-visible,
.product-card:focus-visible {
    outline: 2px solid var(--bread-dark);
    outline-offset: 3px;
}
```
