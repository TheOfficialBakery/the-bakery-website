# Coding Standards

Follow these standards when contributing to The Bakery website.

---

## General Principles

1. **Keep it simple** - No unnecessary frameworks or libraries
2. **Mobile-first** - Always consider mobile experience
3. **Accessibility** - Use semantic HTML and proper alt texts
4. **Performance** - Optimize images, minimize HTTP requests
5. **Consistency** - Follow existing patterns

---

## HTML Standards

### Structure

```html
<!-- Use semantic HTML5 elements -->
<section id="unique-id" class="section-name">
    <div class="container">
        <!-- Content goes inside container -->
    </div>
</section>
```

### Naming Conventions

- IDs: lowercase, hyphens for spaces (`#about`, `#contact`)
- Classes: lowercase, hyphens (`.product-card`, `.hero-content`)
- Use BEM-like naming for components (`.card`, `.card-title`, `.card-image`)

### Attributes

```html
<!-- Always include alt text for images -->
<img src="image.png" alt="Descriptive alt text">

<!-- External links MUST include rel="noopener noreferrer" for security -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">Link</a>

<!-- Use aria-label for icon-only buttons -->
<button aria-label="Toggle menu">...</button>
```

### Comments

```html
<!-- Section: About -->
<section>...</section>

<!-- Component: Product Card -->
<div class="product-card">...</div>
```

---

## CSS Standards

### File Organization

Organize CSS in this order:

1. CSS Variables (`:root`)
2. Reset & Base Styles
3. Typography
4. Layout (Container, Grid)
5. Components (in order of appearance)
6. Responsive Styles (largest to smallest)

### CSS Variables

Always use CSS variables for:

- Colors
- Fonts
- Shadows
- Transitions
- Spacing (for section padding)

```css
/* Good */
color: var(--bread-dark);
font-family: var(--font-primary);

/* Avoid */
color: #8B6914;
font-family: 'Outfit', sans-serif;
```

### Naming

```css
/* Component */
.product-card { }

/* Component element */
.product-card h3 { }

/* Or with descriptive class */
.product-icon { }
.product-link { }

/* Modifier */
.btn-primary { }
.btn-large { }
```

### Responsive Design

```css
/* Desktop first, then breakpoints */
.element {
    /* Desktop styles */
}

@media (max-width: 768px) {
    .element {
        /* Tablet styles */
    }
}

@media (max-width: 480px) {
    .element {
        /* Mobile styles */
    }
}
```

### Units

| Use | For |
|-----|-----|
| `px` | Borders, shadows, small fixed values |
| `rem` | Font sizes, spacing |
| `%` | Widths, responsive layouts |
| `vw/vh` | Viewport-relative sizing |
| `clamp()` | Responsive typography |

### Comments

```css
/* ===================================
   Section Name
   =================================== */

/* Component description */
.component { }

/* Modifier - explains why */
.component--special { }
```

---

## JavaScript Standards

### Structure

```javascript
// ===================================
// Section Name
// ===================================

// Brief description of functionality
function functionName() {
    // Implementation
}
```

### Event Listeners

```javascript
// Use addEventListener, not inline handlers
element.addEventListener('click', handleClick);

// Use event delegation when possible
document.addEventListener('click', (e) => {
    if (e.target.matches('.button')) {
        handleButtonClick(e);
    }
});
```

### DOM Selection

```javascript
// Cache DOM queries
const navbar = document.querySelector('.navbar');
const cards = document.querySelectorAll('.product-card');

// Use specific selectors
document.querySelector('.product-card');  // Good
document.querySelector('div');            // Avoid
```

### Best Practices

- Use `const` by default, `let` only when reassignment is needed
- Avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Handle errors gracefully
- Wrap DOM-dependent code in `DOMContentLoaded`
- Use `requestAnimationFrame` for scroll/resize handlers (throttling)
- Keep styles in CSS files, not injected via JavaScript
- Read values from DOM instead of hardcoding (DRY principle)

### Performance

```javascript
// Use requestAnimationFrame for scroll handlers
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Do work here
            ticking = false;
        });
        ticking = true;
    }
});
```

---

## Image Standards

### File Naming

```
icon_[descriptive-name]_[timestamp].png
```

Example: `icon_fresh_memes_1769729644932.png`

### Formats

| Format | Use for |
|--------|---------|
| PNG | Icons, logos (need transparency) |
| JPG | Photos (if any added later) |
| WebP | Modern browsers (optional optimization) |

### Sizes

- Icons: Source at 400x400px minimum
- Logo: Keep original high-res, display at appropriate size via CSS
- Hero images: Max 1920px wide

### Optimization

Before committing, consider:

- Compressing PNGs with tools like TinyPNG
- Using appropriate quality settings for JPGs (80% usually fine)

---

## Git Commit Standards

### Commit Message Format

```
[type]: [brief description]

[optional longer description]
```

### Types

| Type | Usage |
|------|-------|
| `Add` | New feature or content |
| `Update` | Modify existing feature |
| `Fix` | Bug fix |
| `Style` | CSS/visual changes |
| `Docs` | Documentation |
| `Refactor` | Code restructure |

### Examples

```bash
git commit -m "Add: Magnets product category"
git commit -m "Fix: Scroll indicator visibility on mobile"
git commit -m "Update: Footer links"
git commit -m "Style: Improve button hover effects"
git commit -m "Docs: Add coding standards"
```

---

## Checklist Before Committing

- [ ] Test on desktop (Chrome, Firefox, Safari if possible)
- [ ] Test on mobile viewport (DevTools or real device)
- [ ] Check all links work
- [ ] Verify images have alt text
- [ ] Run through a linter if available
- [ ] Write a clear commit message
