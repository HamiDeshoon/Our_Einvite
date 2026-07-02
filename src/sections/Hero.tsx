import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const name1Ref = useRef<HTMLSpanElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const name2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(name1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.5')
    .to(ampersandRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .to(name2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.6')
    .to(subRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .to(dateRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .to(scrollRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center"
      style={{ zIndex: 10 }}
    >
      {/* Fairy sparkles decoration */}
      <div className="absolute top-20 left-10 text-4xl twinkle fairy-sparkle" style={{ color: 'var(--color-magic-gold)' }}>✦</div>
      <div className="absolute top-40 right-20 text-3xl twinkle fairy-sparkle" style={{ animationDelay: '0.5s', color: 'var(--color-fairy-pink-deep)' }}>✧</div>
      <div className="absolute bottom-40 left-1/4 text-2xl twinkle fairy-sparkle" style={{ animationDelay: '1s', color: 'var(--color-rose-gold)' }}>✦</div>
      <div className="absolute top-1/3 right-1/3 text-3xl twinkle fairy-sparkle" style={{ animationDelay: '1.5s', color: 'var(--color-magic-gold)' }}>✧</div>

      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-8 py-24">
        <div className="max-w-[45%] max-lg:max-w-[70%] max-md:max-w-full">
          <p
            ref={labelRef}
            className="font-serif italic text-[14px] uppercase tracking-[0.1em] mb-6 opacity-0 translate-y-4"
            style={{ color: 'var(--color-rose-gold)' }}
          >
            Together with their families
          </p>

          <h1 className="font-serif font-light leading-[0.95] tracking-[-0.02em]">
            <span
              ref={name1Ref}
              className="block text-[96px] max-lg:text-[72px] max-md:text-[56px] opacity-0 translate-y-6 float-animation"
              style={{ 
                color: 'var(--color-twilight)',
                textShadow: '0 4px 20px rgba(212, 184, 232, 0.5)'
              }}
            >
              Fatemeh
            </span>
            <span
              ref={ampersandRef}
              className="block font-serif italic text-[72px] max-lg:text-[56px] max-md:text-[44px] my-1 opacity-0 translate-y-4"
              style={{ 
                color: 'var(--color-rose-gold)',
                textShadow: '0 4px 15px rgba(183, 110, 121, 0.4)'
              }}
            >
              &amp;
            </span>
            <span
              ref={name2Ref}
              className="block text-[96px] max-lg:text-[72px] max-md:text-[56px] opacity-0 translate-y-6 float-animation"
              style={{ 
                color: 'var(--color-twilight)',
                textShadow: '0 4px 20px rgba(212, 184, 232, 0.5)',
                animationDelay: '0.3s'
              }}
            >
              Hamid
            </span>
          </h1>

          <p
            ref={subRef}
            className="font-sans text-[20px] font-light leading-[1.7] mt-6 max-w-[400px] opacity-0 translate-y-4"
            style={{ color: 'var(--color-taupe)' }}
          >
            request the pleasure of your company at their wedding celebration
          </p>

          <div
            ref={dateRef}
            className="inline-block mt-10 opacity-0 translate-y-4"
          >
            <span
              className="font-serif text-[16px] px-8 py-3 rounded-[50px] inline-block shimmer-effect glow-effect"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 184, 232, 0.3) 0%, rgba(232, 164, 184, 0.3) 100%)',
                border: '2px solid var(--color-rose-gold)',
                color: 'var(--color-twilight)',
                backdropFilter: 'blur(10px)',
              }}
            >
              ✦ 13 August 2026 ✦
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 scroll-indicator"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-rose-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
