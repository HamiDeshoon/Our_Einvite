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
          With love and gratitude ✦
        </p>

        <div className="section-divider my-8" />

        <p
          className="font-serif text-[13px] uppercase tracking-[0.12em] mb-6"
          style={{ color: 'var(--color-deep-rose)' }}
        >
          Problems or Questions?
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <div className="text-center">
            <p className="font-serif text-[15px] mb-1" style={{ color: 'var(--color-mahogany)' }}>
              Hamid
            </p>
            <a
              href="tel:+989106180740"
              className="font-sans text-[14px] font-light tracking-wide transition-colors duration-300"
              style={{ color: 'var(--color-warm-gray)' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-rose-gold)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-warm-gray)'; }}
            >
              +98 910 618 0740
            </a>
          </div>

          <div
            className="hidden sm:block w-px h-8"
            style={{ background: 'var(--color-blush)' }}
          />

          <div className="text-center">
            <p className="font-serif text-[15px] mb-1" style={{ color: 'var(--color-mahogany)' }}>
              Fatemeh
            </p>
            <a
              href="tel:+989127241564"
              className="font-sans text-[14px] font-light tracking-wide transition-colors duration-300"
              style={{ color: 'var(--color-warm-gray)' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-rose-gold)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-warm-gray)'; }}
            >
              +98 912 724 1564
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
