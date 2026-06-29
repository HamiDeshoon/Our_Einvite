// src/performance/collect.ts
// Collect performance metrics (FPS and Web Vitals) and provide a simple convergence check.

// import { startFPSMonitor } from "./fps"; // removed unused import

// Types for stored metrics
interface Metrics {
  fps: number[]; // recent FPS samples
  webVitals: Record<string, number>;
}

const metrics: Metrics = {
  fps: [],
  webVitals: {},
};

// Helper to keep only recent FPS values (last 5 seconds)
function pruneFPS(): void {
  // const now = performance.now(); // removed unused variable
  // Not storing timestamps for simplicity; just keep up to 300 samples (~5 secs at 60fps)
  if (metrics.fps.length > 300) metrics.fps.splice(0, metrics.fps.length - 300);
}

// FPS monitor that pushes values into metrics.fps
export function initFPS(): void {
  let frames = 0;
  let lastTime = performance.now();
  const tick = () => {
    frames++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      const fps = frames;
      metrics.fps.push(fps);
      pruneFPS();
      // console.log(`[Performance] FPS: ${fps}`);
      frames = 0;
      lastTime = now;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Load web-vitals dynamically and store results
function loadWebVitals(): void {
  // Dynamically import web-vitals to avoid require and bundling issues.
  // @ts-ignore - ignore missing type declarations for web-vitals
  import('web-vitals')
    .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      const report = (metric: { name: string; value: number }) => {
        metrics.webVitals[metric.name] = metric.value;
      };
      getCLS(report);
      getFID(report);
      getFCP(report);
      getLCP(report);
      getTTFB(report);
    })
    .catch(() => {
      console.warn('web-vitals not installed; skipping metric collection.');
    });
}

// Initialize all collectors
export function initPerformanceCollectors(): void {
  initFPS();
  loadWebVitals();
}

// Simple convergence criteria
export interface ConvergenceCriteria {
  minFps?: number; // e.g., 55
  maxCLS?: number; // e.g., 0.1
  maxLCP?: number; // seconds
}

export function checkConvergence(criteria: ConvergenceCriteria): boolean {
  const avgFps = metrics.fps.reduce((a, b) => a + b, 0) / (metrics.fps.length || 1);
  const cls = metrics.webVitals["CLS"] ?? Infinity;
  const lcp = (metrics.webVitals["LCP"] ?? Infinity) / 1000; // convert ms to s if needed
  const fpsOk = criteria.minFps ? avgFps >= criteria.minFps : true;
  const clsOk = criteria.maxCLS ? cls <= criteria.maxCLS : true;
  const lcpOk = criteria.maxLCP ? lcp <= criteria.maxLCP : true;
  return fpsOk && clsOk && lcpOk;
}

// Export metrics for external scripts / debugging
export function getMetrics(): Metrics {
  return metrics;
}
