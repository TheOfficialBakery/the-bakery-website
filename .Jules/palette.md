# Palette's Journal

This journal tracks critical UX and accessibility learnings.

## 2026-02-01 - Mobile Menu Focus Management
**Learning:** The custom mobile menu implementation relied solely on CSS classes for visibility without managing keyboard focus, causing accessibility barriers.
**Action:** When implementing custom overlays/menus, always couple `aria-expanded` state with explicit focus management (move to content on open, return to trigger on close).

## 2026-10-24 - Interactive Navigation Indicators
**Learning:** Visual navigation cues like "scroll down" arrows are often implemented as static elements, missing an opportunity for keyboard navigation and clear user intent.
**Action:** Convert purely visual navigation indicators into semantic anchor tags with `aria-label` to support both mouse/touch interaction and keyboard users.

## 2026-10-25 - Back to Top Focus Management
**Learning:** "Back to Top" buttons can trap keyboard focus at the bottom of the page, requiring users to tab backward through the entire document.
**Action:** Couple `window.scrollTo(0,0)` with explicit focus placement on the first interactive element (e.g., `.skip-link`) to reset the navigation context.
