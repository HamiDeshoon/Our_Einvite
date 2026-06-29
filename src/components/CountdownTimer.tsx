import { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Countdown timer component.
 * targetDate: ISO date string for the ceremony start.
 */
export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  useScrollAnimation(containerRef);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const update = () => {
      const now = Date.now();
      const diff = target - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const format = (ms: number) => {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSec / (3600 * 24));
    const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <section
      ref={containerRef}
      className="my-8 text-center fade-in"
      style={{ color: 'var(--color-espresso)' }}
    >
      <h2 className="font-serif text-2xl md:text-3xl mb-2">Countdown to the ceremony</h2>
      <p className="font-sans text-xl" aria-live="polite">{format(timeLeft)}</p>
    </section>
  );
}
