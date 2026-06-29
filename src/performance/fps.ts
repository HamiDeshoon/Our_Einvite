// src/performance/fps.ts
// Simple FPS monitor using requestAnimationFrame.

export function startFPSMonitor(): void {
  let frames = 0;
  let lastTime = performance.now();
  const tick = () => {
    frames++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      console.log(`[Performance] FPS: ${frames}`);
      frames = 0;
      lastTime = now;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
