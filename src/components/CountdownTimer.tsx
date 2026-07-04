import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
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

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  useEffect(() => {
    if (!boxesRef.current) return;

    const ctx = gsap.context(() => {
      const boxes = boxesRef.current?.querySelectorAll('.countdown-box');
      if (boxes) {
        gsap.to(Array.from(boxes), {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: boxesRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, boxesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="my-12 text-center fade-in"
      style={{ color: 'var(--color-mahogany)' }}
    >
      <h2 className="font-display text-2xl md:text-3xl mb-2">Countdown to the ceremony</h2>
      <div ref={boxesRef} className="flex justify-center gap-3 mt-6">
        {[
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Min' },
          { value: seconds, label: 'Sec' },
        ].map((item) => (
          <div
            key={item.label}
            className="countdown-box"
            style={{ opacity: 0, transform: 'scale(0.85) translateY(12px)' }}
          >
            <div className="font-display text-2xl">{item.value}</div>
            <div className="countdown-label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
