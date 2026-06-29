# Performance & Optimization Overview

This project now includes a lightweight performance measurement and iterative optimization loop:

- **UI Guidelines** – Fixed transition‑all usage, added `prefers-reduced-motion` checks, and ensured ARIA labels where required.
- **FPS Monitor** – `src/performance/fps.ts` records frame‑rates.
- **Web Vitals** – `src/performance/measure.ts` and `src/performance/collect.ts` dynamically import `web‑vitals` and store CLS, FID, FCP, LCP, TTFB.
- **Convergence Config** – `src/performance/config.ts` defines default criteria (≥55 FPS, CLS ≤ 0.1, LCP ≤ 2.5 s).
- **Iterative Loop** – `src/performance/runLoop.ts` starts collectors, waits 5 s, checks the criteria and logs the result. In CI you can repeat this until convergence is reached.
- **Backend Audit** – The repository is a pure front‑end SPA; no server‑side code or API routes exist, so no backend issues were found.
- **Output Formats** – All assets are static images referenced with explicit `width`/`height` via CSS. No JSON/CSV generation is present.

Run the loop with `node src/performance/runLoop.ts` (ensure `web‑vitals` is installed). Adjust the thresholds in `config.ts` as needed.
