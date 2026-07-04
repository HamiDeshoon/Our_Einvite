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
  const body4Ref = useRef<HTMLParagraphElement>(null);
  const body5Ref = useRef<HTMLParagraphElement>(null);
  const body6Ref = useRef<HTMLParagraphElement>(null);
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
      .to(body4Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .to(body5Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .to(body6Ref.current, {
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
              className="font-sans text-[18px] font-light leading-[1.8] mb-5 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              Some stories begin with grand gestures. Ours began with a simple class trip to Darake.
            </p>

            <p
              ref={body2Ref}
              className="font-sans text-[18px] font-light leading-[1.8] mb-5 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              A group of classmates had planned a day together—if we remember correctly, it was Amirhossein's birthday. It seemed like just another ordinary outing, but life has a funny way of hiding extraordinary moments in the most unexpected places.
            </p>

            <p
              ref={body3Ref}
              className="font-sans text-[18px] font-light leading-[1.8] mb-5 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              That day, our eyes met. In that single glance, the noise around us seemed to disappear, and something quietly changed forever.
            </p>

            <p
              ref={body4Ref}
              className="font-sans text-[18px] font-light leading-[1.8] mb-5 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              The years that followed weren't always easy. We shared countless laughs, faced our share of challenges, celebrated victories, and learned to grow—both together and as individuals. Every twist and turn became another chapter in the story that brought us here.
            </p>

            <p
              ref={body5Ref}
              className="font-sans text-[18px] font-light leading-[1.8] mb-5 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              And now, after all the ups and downs, we are beginning our greatest adventure yet.
            </p>

            <p
              ref={body6Ref}
              className="font-sans text-[18px] font-light leading-[1.8] mb-10 opacity-0 translate-y-4"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              We would be honored to have you celebrate this new chapter with us.
            </p>

            <blockquote ref={quoteRef} className="opacity-0 translate-y-4">
              <div className="decorative-line mb-6" />
              <p
                className="font-display text-[32px] max-md:text-[26px] leading-[1.4] italic"
                style={{ color: 'var(--color-rose-gold)' }}
              >
                <strong>Fatemeh & Hamid</strong>
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}