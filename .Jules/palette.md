# Palette's Journal

This journal tracks critical UX and accessibility learnings.

## 2026-02-01 - Mobile Menu Focus Management
**Learning:** The custom mobile menu implementation relied solely on CSS classes for visibility without managing keyboard focus, causing accessibility barriers.
**Action:** When implementing custom overlays/menus, always couple `aria-expanded` state with explicit focus management (move to content on open, return to trigger on close).
