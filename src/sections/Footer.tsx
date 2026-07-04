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
<<<<<<< HEAD
        background: 'var(--color-ivory)',
        borderTop: '1px solid rgba(183, 110, 121, 0.15)',
=======
        background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.9) 0%, rgba(230, 230, 250, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--color-fairy-purple)',
>>>>>>> fa50cdf0c42cd55bde6d10b109f6c7a4bfe57399
      }}
    >
      {/* Decorative fairy elements */}
      <div className="absolute top-4 left-1/3 text-xl twinkle" style={{ color: 'var(--color-magic-gold)' }}>✦</div>
      <div className="absolute top-4 right-1/3 text-xl twinkle" style={{ animationDelay: '0.5s', color: 'var(--color-rose-gold)' }}>✧</div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <div className="section-divider mb-10" />
        <h3
<<<<<<< HEAD
          className="font-display text-[28px] font-normal mb-3"
          style={{ color: 'var(--color-mahogany)' }}
        >
          Fatemeh & Hamid
=======
          className="font-serif text-[24px] font-light mb-2"
          style={{ 
            color: 'var(--color-twilight)',
            textShadow: '0 2px 10px rgba(212, 184, 232, 0.3)'
          }}
        >
          ✦ Fatemeh &amp; Hamid ✦
>>>>>>> fa50cdf0c42cd55bde6d10b109f6c7a4bfe57399
        </h3>

        <p
          className="font-sans text-[14px] font-light tracking-[0.15em] mb-4"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          13 . 08 . 2026
        </p>

        <p
<<<<<<< HEAD
          className="font-display text-[18px]"
=======
          className="font-serif italic text-[16px]"
>>>>>>> fa50cdf0c42cd55bde6d10b109f6c7a4bfe57399
          style={{ color: 'var(--color-rose-gold)' }}
        >
          With love and gratitude ✦
        </p>
      </div>
    </footer>
  );
}