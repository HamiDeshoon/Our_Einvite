// src/performance/runLoop.ts
// Simple iterative performance measurement loop.
// Starts collectors, waits for a short period, checks convergence against default criteria,
// and logs the outcome. In a real CI environment this could be repeated until convergence.

import { initPerformanceCollectors, checkConvergence, getMetrics } from "./collect";
import { defaultCriteria } from "./config";

async function run(): Promise<void> {
  console.log("[Perf Loop] Starting performance collectors...");
  initPerformanceCollectors();

  // Wait for metrics to accumulate (e.g., 5 seconds).
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const converged = checkConvergence(defaultCriteria);
  console.log(`[Perf Loop] Convergence check: ${converged ? "✅" : "❌"}`);
  console.log("[Perf Loop] Collected metrics:", getMetrics());

  if (!converged) {
    console.warn("[Perf Loop] Performance targets not met. Consider optimizations.");
    // In a full loop, you might trigger rebuilds or configuration tweaks here.
  } else {
    console.log("[Perf Loop] Performance targets met. No further action required.");
  }
}

run().catch((e) => {
  console.error("[Perf Loop] Unexpected error:", e);
});
