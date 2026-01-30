# File Structure

```
Website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── Original.png        # Logo image
├── CNAME               # Custom domain config (the-bakery.co)
├── AGENTS.md           # AI coding agent guidelines
├── .nojekyll           # Tells GitHub Pages to skip Jekyll
├── icons/              # Custom generated icons
│   ├── icon_fresh_memes_*.png
│   ├── icon_premium_quality_*.png
│   ├── icon_perfect_gifts_*.png
│   ├── icon_tshirt_*.png
│   ├── icon_mug_*.png
│   ├── icon_stickers_*.png
│   ├── icon_magnet_*.png
│   ├── icon_phone_case_*.png
│   ├── icon_wall_art_*.png
│   ├── icon_bag_*.png
│   ├── icon_email_*.png
│   ├── icon_shop_*.png
│   └── icon_social_*.png
└── docs/               # Documentation
    ├── README.md
    ├── project-overview.md
    ├── file-structure.md
    ├── design-system.md
    ├── components.md
    ├── adding-content.md
    ├── coding-standards.md
    └── deployment.md
```

## File Descriptions

### index.html

The main HTML file containing:

- `<head>` - Meta tags, Open Graph, fonts, CSS link
- Navigation bar
- Hero section
- About section
- Products section
- CTA Banner
- Contact section
- Footer

### styles.css

All styling organized in sections:

1. CSS Variables (design tokens)
2. Reset & Base Styles
3. Layout (Container)
4. Navigation
5. Hero Section
6. Buttons
7. Scroll Indicator
8. Section Styling
9. About Section
10. Products Section
11. CTA Banner
12. Contact Section
13. Footer
14. Responsive Design (5 breakpoints)
15. Touch Device Optimizations
16. Mobile Menu
17. Scroll Animations
18. Focus Styles (Accessibility)

### script.js

JavaScript functionality:

- Navbar scroll effects
- Mobile menu toggle (dynamically reads nav links from HTML)
- Smooth scrolling
- Intersection Observer animations
- Parallax effect on hero (with requestAnimationFrame throttling)
- Hover effects for product cards

### icons/

Custom generated PNG icons in the brand's warm golden-brown color palette. Each icon is approximately 400-500KB and sized for web use.

### CNAME

Contains the custom domain: `the-bakery.co`

### AGENTS.md

Guidelines for AI coding agents working on this project.

### .nojekyll

Empty file that tells GitHub Pages to serve files directly without Jekyll processing.
