import { useEffect, useRef } from 'react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 300);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-[80px]"
      style={{
        zIndex: 10,
        background: 'var(--color-ivory)',
        borderTop: '1px solid rgba(183, 110, 121, 0.15)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <div className="section-divider mb-10" />
        <h3
          className="font-display text-[28px] font-normal mb-3"
          style={{ color: 'var(--color-mahogany)' }}
        >
          Fatemeh & Hamid
        </h3>

        <p
          className="font-sans text-[14px] font-light tracking-[0.15em] mb-4"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          13 . 08 . 2026
        </p>

        <p
          className="font-display text-[18px]"
          style={{ color: 'var(--color-rose-gold)' }}
        >
          With love and gratitude
        </p>
      </div>
    </footer>
  );
}