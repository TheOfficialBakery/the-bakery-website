# Components Guide

This document describes each component of the website and how to modify them.

---

## Navigation

### Structure

```html
<nav class="navbar">
    <div class="nav-container">
        <a href="#" class="nav-logo">
            <img src="Original.png" alt="The Bakery Logo" class="nav-logo-img">
        </a>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="[REDBUBBLE_URL]" target="_blank" rel="noopener noreferrer" class="nav-cta">Visit Shop</a>
        <button class="mobile-menu-btn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
        </button>
    </div>
</nav>
```

### Behavior

- Adds `.scrolled` class when user scrolls down (adds background blur)
- Mobile menu button visible only on screens < 768px
- Nav links hidden on mobile (replaced by hamburger menu)
- Mobile menu dynamically reads links from `.nav-links` and `.nav-cta` elements

### Mobile Menu

The mobile menu is created dynamically via JavaScript and styled in CSS. It reads navigation links from the existing HTML to stay in sync (DRY principle).

```css
/* Mobile menu styles are in styles.css */
.mobile-menu { ... }
.mobile-menu.active { ... }
.mobile-nav-links { ... }
.mobile-nav-cta { ... }
```

---

## Hero Section

### Structure

```html
<section id="home" class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
        <div class="hero-logo-container">
            <img src="Original.png" alt="The Bakery" class="hero-logo">
        </div>
        <h1 class="hero-title">Welcome to <span>The Bakery</span></h1>
        <p class="hero-tagline">We Don't Cook We Bake!</p>
        <p class="hero-description">[Description text]</p>
        <div class="hero-buttons">
            <a href="[URL]" class="btn btn-primary">...</a>
            <a href="#about" class="btn btn-secondary">Learn More</a>
        </div>
    </div>
    <div class="scroll-indicator">...</div>
</section>
```

### Animations

- Logo: floating animation (up/down)
- Content: fade-up animation on load
- Scroll indicator: scrollDown animation (hidden on mobile)

---

## About Section

### Structure

```html
<section id="about" class="about">
    <div class="container">
        <div class="about-content">
            <div class="about-text">
                <span class="section-label">Our Story</span>
                <h2>Title with <span>Highlight</span></h2>
                <p>...</p>
                <div class="about-features">
                    <!-- Feature items -->
                </div>
            </div>
            <div class="about-image">
                <div class="image-frame">
                    <img src="Original.png" alt="The Bakery Logo" class="about-logo">
                </div>
                <div class="floating-badge">Est. 2026</div>
            </div>
        </div>
    </div>
</section>
```

### Feature Item Template

```html
<div class="feature">
    <div class="feature-icon">
        <img src="icons/icon_[name].png" alt="[Alt text]">
    </div>
    <div class="feature-text">
        <h4>[Title]</h4>
        <p>[Description]</p>
    </div>
</div>
```

---

## Products Section

### Structure

```html
<section id="shop" class="products">
    <div class="container">
        <div class="section-header">
            <span class="section-label">Our Collection</span>
            <h2>Fresh From the <span>Oven</span></h2>
            <p>[Subtitle]</p>
        </div>
        <div class="products-grid">
            <!-- Product cards -->
        </div>
        <div class="products-cta">
            <a href="[URL]" class="btn btn-primary btn-large">View All Products</a>
        </div>
    </div>
</section>
```

### Product Card Template

```html
<a href="[REDBUBBLE_CATEGORY_URL]" target="_blank" rel="noopener noreferrer" class="product-card">
    <div class="product-icon">
        <img src="icons/icon_[name].png" alt="[Product]">
    </div>
    <h3>[Product Name]</h3>
    <p>[Description]</p>
    <span class="product-link">Shop Now →</span>
</a>
```

### Current Product Categories

| Product | Icon File | Redbubble iaCode |
|---------|-----------|------------------|
| T-Shirts | icon_tshirt_*.png | u-tees |
| Mugs | icon_mug_*.png | u-mugs |
| Stickers | icon_stickers_*.png | all-stickers |
| Magnets | icon_magnet_*.png | u-die-cut-magnet |
| Phone Cases | icon_phone_case_*.png | u-phone-cases |
| Wall Art | icon_wall_art_*.png | u-prints |

---

## CTA Banner

### Structure

```html
<section class="cta-banner">
    <div class="container">
        <div class="cta-content">
            <h2>[Call to action heading]</h2>
            <p>[Supporting text]</p>
            <a href="[URL]" class="btn btn-light">[Button text]</a>
        </div>
    </div>
</section>
```

---

## Contact Section

### Structure

```html
<section id="contact" class="contact">
    <div class="container">
        <div class="section-header">...</div>
        <div class="contact-content">
            <div class="contact-info">
                <!-- Contact cards -->
            </div>
        </div>
    </div>
</section>
```

### Contact Card Template

```html
<div class="contact-card">
    <div class="contact-icon">
        <img src="icons/icon_[name].png" alt="[Type]">
    </div>
    <h4>[Title]</h4>
    <a href="[link]">[Display text]</a>
    <!-- OR -->
    <p>[Text]</p>
</div>
```

---

## Footer

### Structure

```html
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-brand">
                <img src="Original.png" alt="The Bakery" class="footer-logo">
                <p class="footer-tagline">We Don't Cook We Bake!</p>
            </div>
            <div class="footer-links">
                <div class="footer-column">
                    <h4>[Column title]</h4>
                    <ul>
                        <li><a href="#">[Link]</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 The Bakery. All rights reserved.</p>
            <p>Products available on <a href="[URL]">Redbubble</a></p>
        </div>
    </div>
</footer>
```

---

## Button Variants

| Class | Usage |
|-------|-------|
| `.btn` | Base button class (required) |
| `.btn-primary` | Gold gradient, white text |
| `.btn-secondary` | Transparent with border |
| `.btn-light` | White background |
| `.btn-large` | Larger padding for CTAs |

---

## Accessibility

All interactive elements have focus styles for keyboard navigation:

```css
.btn:focus-visible,
.product-card:focus-visible,
.nav-links a:focus-visible {
    outline: 2px solid var(--bread-dark);
    outline-offset: 3px;
}
```

### External Links

All external links must include security attributes:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>
```
