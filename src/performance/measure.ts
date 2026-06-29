// src/performance/measure.ts
// Simple performance measurement using Web Vitals.
// This module safely loads web-vitals if available and logs core metrics.

// Reporter function
function report(metric: any) {
  console.log(`[Web Vitals] ${metric.name}: ${metric.value}`);
}

// Initialize web vitals collection if the package is present.
export async function initWebVitals() {
  try {
    // Dynamically import to avoid build errors when the package is missing.
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
    getCLS(report);
    getFID(report);
    getFCP(report);
    getLCP(report);
    getTTFB(report);
  } catch (e) {
    console.warn('web-vitals not installed; performance metrics are unavailable.');
  }
}

// Auto‑run in browser environments when included as a script.
if (typeof window !== 'undefined') {
  initWebVitals();
}
