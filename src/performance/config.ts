// src/performance/config.ts
// Default convergence criteria for performance evaluation.

export interface ConvergenceCriteria {
  minFps?: number; // Minimum average FPS expected.
  maxCLS?: number; // Maximum Cumulative Layout Shift.
  maxLCP?: number; // Maximum Largest Contentful Paint (seconds).
}

export const defaultCriteria: ConvergenceCriteria = {
  minFps: 55,
  maxCLS: 0.1,
  maxLCP: 2.5,
};
