## 2026-02-01 - Massive Image Asset Bottleneck
**Learning:** Found a 7.6MB hero image (`Original.webp`) being served to all users, including as a 50px logo. This single asset was likely blocking the main thread and LCP. Checking file sizes is a critical first step in performance auditing.
**Action:** Always run `ls -lh` or `du -h` on asset directories immediately to catch low-hanging fruit like unoptimized media.
