## 2026-02-01 - Massive Image Asset Bottleneck
**Learning:** Found a 7.6MB hero image (`Original.webp`) being served to all users, including as a 50px logo. This single asset was likely blocking the main thread and LCP. Checking file sizes is a critical first step in performance auditing.
**Action:** Always run `ls -lh` or `du -h` on asset directories immediately to catch low-hanging fruit like unoptimized media.

## 2026-02-01 - Layout Thrashing in Mouse Handlers
**Learning:** Identified a `getBoundingClientRect()` call inside a `mousemove` event listener. This forces a synchronous style recalculation and layout on every frame the mouse moves, causing significant jank (layout thrashing).
**Action:** Cache layout properties (like element bounds) outside of high-frequency event handlers. Update these cached values only when necessary (e.g., on `resize` or `scroll` events).

## 2026-02-02 - Oversized Icon Assets
**Learning:** Identified multiple icon assets in `icons/` that were 100KB-300KB each but displayed at only 40px. This wasted ~1.5MB of bandwidth.
**Action:** Resize localized assets to their maximum display dimensions (plus density buffer) rather than serving source-quality files.

## 2026-02-03 - Scroll Handler Optimization
- **Problem:** Reading layout properties (e.g., `offsetHeight`, `scrollTop`) inside a `scroll` event listener or `requestAnimationFrame` loop forces the browser to recalculate layout (reflow) on every frame, causing "layout thrashing" and poor performance.
- **Solution:** Cache these values in variables outside the loop and update them only when necessary (e.g., inside a `resize` event listener). This ensures the loop only performs cheap read/write operations (like setting `transform`).

## 2026-02-04 - Cumulative Layout Shift from Missing Image Dimensions
**Learning:** Missing `width` and `height` attributes on images causes the browser to allocate space only after the image header downloads and is parsed, resulting in a layout shift (CLS) and negatively impacting Core Web Vitals.
**Action:** Always explicitly define `width` and `height` attributes on `<img>` tags matching the intrinsic aspect ratio/size to reserve layout space immediately.

## 2026-02-05 - Conditional Event Listener Attachment
**Learning:** Attaching heavy event listeners (like `mousemove` for visual effects) globally consumes resources even when the effect is not visible.
**Action:** Use `IntersectionObserver` to dynamically attach and detach event listeners based on the visibility of the target element.
