import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DETAIL_CARDS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'When',
    detail: '13 August 2026',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Time',
    detail: '6:00 PM',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Where',
    detail: 'Shahdokht Wedding Hall, Ahmadabad Mostofi, Tehran',
  },
];

export default function TheWedding() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power4.out',
      })
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      }, '-=0.5');

      const cards = cardsRef.current?.children;
      if (cards) {
        tl.to(Array.from(cards), {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.2)',
        }, '-=0.4');
      }

      tl.to(btnRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="the-wedding"
      className="relative py-[140px] max-md:py-[100px]"
      style={{ zIndex: 10, background: 'var(--color-champagne)' }}
    >
      <div className="section-divider mb-[100px] max-md:mb-[60px]" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <p
          ref={labelRef}
          className="font-serif italic text-[14px] uppercase tracking-[0.1em] text-center mb-4 opacity-0 translate-y-4"
          style={{ color: 'var(--color-rose-gold)' }}
        >
          The Wedding Celebration
        </p>

        <h2
          ref={headlineRef}
          className="heading-lg font-light text-center mb-16 opacity-0 translate-y-4"
          style={{ color: 'var(--color-mahogany)' }}
        >
          Join Us in Celebration
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-3 max-md:grid-cols-1 gap-10 max-md:gap-8 mb-12"
        >
          {DETAIL_CARDS.map((card, i) => (
            <div
              key={card.title}
              className="text-center opacity-0 translate-y-[60px] scale-95"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="glass-card p-8 h-full">
                <div
                  className="inline-flex items-center justify-center mb-6 w-16 h-16 rounded-full"
                  style={{
                    color: 'var(--color-rose-gold)',
                    background: 'rgba(183, 110, 121, 0.1)'
                  }}
                >
                  {card.icon}
                </div>
                <h3
                  className="font-serif text-[24px] font-medium mb-4"
                  style={{ color: 'var(--color-mahogany)' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-sans text-[16px] font-light leading-[1.6]"
                  style={{ color: 'var(--color-warm-gray)' }}
                >
                  {card.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            ref={btnRef}
            onClick={() => setShowSchedule(!showSchedule)}
            className="animated-underline font-serif text-[16px] uppercase tracking-[0.08em] opacity-0 translate-y-4 bg-transparent border-none cursor-pointer"
            style={{ color: 'var(--color-mahogany)' }}
          >
            View Full Schedule
          </button>

          {showSchedule && (
            <div
              className="mt-10 max-w-[600px] mx-auto text-left p-10 rounded-2xl glass-card"
            >
              {[
                { time: '6:00 PM', event: 'Aryan Marriage Ceremony' },
                { time: '7:00 PM', event: 'Cake Cutting' },
                { time: '7:30 PM', event: 'Dance, Celebration & Reception' },
                { time: '9:00 PM', event: 'Dinner' },
                { time: 'Late Night', event: 'Continue celebration into the night' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-6 py-4"
                  style={{
                    borderBottom: i < 4 ? '1px solid rgba(183, 110, 121, 0.15)' : 'none',
                  }}
                >
                  <span
                    className="font-serif text-[18px] font-medium min-w-[110px]"
                    style={{ color: 'var(--color-rose-gold)' }}
                  >
                    {item.time}
                  </span>
                  <span
                    className="font-sans text-[16px] font-light"
                    style={{ color: 'var(--color-mahogany)' }}
                  >
                    {item.event}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
