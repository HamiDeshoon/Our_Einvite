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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out',
    })
    .to(name1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
    }, '-=0.7')
    .to(ampersandRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.6')
    .to(name2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
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
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.2)',
    }, '-=0.4')
    .to(scrollRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');

    // Parallax effect on scroll
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(name1Ref.current, {
        x: x * 0.5,
        y: y * 0.3,
        duration: 1.5,
        ease: 'power2.out'
      });
      gsap.to(name2Ref.current, {
        x: -x * 0.3,
        y: -y * 0.2,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.9) contrast(1.1)' }}
      >
        <source src="/sub.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="hero-video-overlay" />

      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-8 py-24 relative z-10">
        <div className="max-w-[50%] max-lg:max-w-[80%] max-md:max-w-full">
          <p
            ref={labelRef}
            className="font-serif italic text-[14px] uppercase tracking-[0.15em] mb-8 opacity-0 translate-y-4"
            style={{ color: 'var(--color-deep-rose)' }}
          >
            Together with their families
          </p>

          <h1 className="font-serif font-light leading-[0.95] tracking-[-0.03em] mb-6">
            <span
              ref={name1Ref}
              className="block heading-xl opacity-0 translate-y-8"
              style={{ color: 'var(--color-mahogany)', textShadow: '0 2px 30px rgba(254, 253, 251, 0.8)' }}
            >
              Fatemeh
            </span>
            <span
              ref={ampersandRef}
              className="block font-display text-[84px] max-lg:text-[64px] max-md:text-[48px] my-2 opacity-0 scale-90"
              style={{ color: 'var(--color-rose-gold)', transform: 'scale(0.9) rotate(-5deg)' }}
            >
              &
            </span>
            <span
              ref={name2Ref}
              className="block heading-xl opacity-0 translate-y-8"
              style={{ color: 'var(--color-mahogany)', textShadow: '0 2px 30px rgba(254, 253, 251, 0.8)' }}
            >
              Hamid
            </span>
          </h1>

          <p
            ref={subRef}
            className="font-sans text-[20px] font-light leading-[1.8] mt-6 max-w-[420px] opacity-0 translate-y-4"
            style={{ color: 'var(--color-warm-gray)' }}
          >
            request the pleasure of your company at their wedding celebration
          </p>

          <div
            ref={dateRef}
            className="inline-block mt-12 opacity-0 translate-y-4 scale-95"
          >
            <span
              className="font-serif text-[18px] px-10 py-4 rounded-full inline-block glass-card"
              style={{
                color: 'var(--color-mahogany)',
                letterSpacing: '0.15em',
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 scroll-indicator cursor-pointer"
        onClick={() => {
          const story = document.getElementById('our-story');
          story?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-rose-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <p className="font-sans text-[11px] uppercase tracking-widest mt-2 text-warm-gray">
          Scroll
        </p>
      </div>
    </section>
  );
}
