import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const body1Ref = useRef<HTMLParagraphElement>(null);
  const body2Ref = useRef<HTMLParagraphElement>(null);
  const body3Ref = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(imageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
      })
      .to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.6')
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      }, '-=0.5')
      .to(body1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .to(body2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .to(body3Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .to(quoteRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative py-[140px] max-md:py-[100px]"
      style={{ zIndex: 10, background: 'var(--color-ivory)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-20 max-lg:gap-12 items-center">
          <div
            ref={imageRef}
            className="opacity-0 translate-y-10 scale-95"
          >
            <div className="glass-card p-4">
              <img
                src="/images/proposal_us.jpg"
                alt="Fatemeh and Hamid"
                className="w-full h-auto rounded-xl shadow-2xl"
                style={{ aspectRatio: '3/4', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="max-lg:pt-0">
            <p
              ref={labelRef}
              className="font-serif italic text-[14px] uppercase tracking-[0.1em] mb-4 opacity-0 translate-y-4 text-deep-rose"
            >
              Our Story
            </p>

            <h2
              ref={headlineRef}
              className="heading-lg font-light mb-8 opacity-0 translate-y-4"
              style={{ color: 'var(--color-mahogany)' }}
            >
              Where It All Began
            </h2>

            <p
              ref={body1Ref}
              className="font-sans text-[18px] font-light leading-[1.8] mb-6 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              It began with a glance across a crowded room — two souls recognizing something familiar
              in each other. Fatemeh's warmth drew Hamid in like gravity, and his quiet strength made
              her feel at home from the very first conversation.
            </p>

            <p
              ref={body2Ref}
              className="font-sans text-[18px] font-light leading-[1.8] mb-6 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              Through seasons of laughter and growth, they built a bond rooted in respect,
              adventure, and an unshakeable friendship. From sunrise walks along the Caspian coast
              to quiet evenings sharing dreams over tea, every moment deepened what they both knew
              was meant to be.
            </p>

            <p
              ref={body3Ref}
              className="font-sans text-[18px] font-light leading-[1.8] mb-12 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              Now, they stand ready to begin their greatest adventure — a lifetime of love,
              partnership, and the beautiful unknown that awaits.
            </p>

            <blockquote ref={quoteRef} className="opacity-0 translate-y-4">
              <div className="decorative-line mb-6" />
              <p
                className="font-display text-[32px] max-md:text-[26px] leading-[1.4] italic"
                style={{ color: 'var(--color-rose-gold)' }}
              >
                "Every love story is beautiful, but ours is my favorite."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}