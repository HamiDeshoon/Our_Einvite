import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '../lib/assets';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: asset('/images/Mirror_duo.jpg'), caption: 'Reflections of us' },
  { src: asset('/images/Elevator_duo.jpg'), caption: 'Going up together' },
  { src: asset('/images/Gang_pose_duo.jpg'), caption: 'Gang Gang!' },
  { src: asset('/images/Selfie_fatemeh_view.jpg'), caption: 'Through her eyes' },
  { src: asset('/images/Selfie_hamid_view.jpg'), caption: 'Through his eyes' },
  { src: asset('/images/proposal_us.jpg'), caption: 'The proposal' },
  { src: asset('/images/Intivation_pose.jpg'), caption: 'Just the two of us' },
  { src: asset('/images/North_trip.jpg'), caption: 'Northern adventures' },
  { src: asset('/images/First_trip.jpg'), caption: 'Our very first trip' },
  { src: asset('/images/Kebab_trio.jpg'), caption: 'Good food, great company' },
  { src: asset('/images/Wedding_flowers.jpg'), caption: 'Awaiting the big day' },
  { src: asset('/images/Wedding_ring.jpg'), caption: 'A promise forever' },
  { src: asset('/images/our_childhood.jpg'), caption: 'Two kids, two stories, one future' },
  { src: asset('/images/Graduation.jpg'), caption: 'Caps off to us' },
  { src: asset('/images/Graduation_party.jpg'), caption: 'We did it together' },
  { src: asset('/images/Fatemeh_childhood.jpg'), caption: 'Fatemeh, through the years' },
  { src: asset('/images/Hamid_defending_thesis.jpg'), caption: 'Hamid, a proud moment' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      const cards = gridRef.current?.querySelectorAll('.gallery-card');
      if (cards) {
        gsap.to(Array.from(cards), {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      const overlay = document.getElementById('gallery-overlay');
      if (overlay) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          onEnter: () => gsap.to(overlay, { opacity: 0.75, duration: 0.8 }),
          onLeave: () => gsap.to(overlay, { opacity: 1, duration: 0.8 }),
          onEnterBack: () => gsap.to(overlay, { opacity: 0.75, duration: 0.8 }),
          onLeaveBack: () => gsap.to(overlay, { opacity: 1, duration: 0.8 }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-[140px] max-md:py-[100px]"
      style={{ zIndex: 10, background: 'var(--color-ivory)' }}
    >
      {/* Decorative sparkle elements */}
      <div className="absolute top-10 left-1/4 text-3xl twinkle" style={{ color: 'var(--color-rose-gold)', animationDelay: '0.2s' }}>✦</div>
      <div className="absolute bottom-20 right-1/4 text-2xl twinkle" style={{ color: 'var(--color-deep-rose)', animationDelay: '0.7s' }}>✧</div>

      <div
        ref={headerRef}
        className="max-w-[800px] mx-auto px-6 lg:px-8 text-center mb-16 opacity-0 translate-y-[30px]"
      >
        <p
          className="font-serif italic text-[14px] uppercase tracking-[0.1em] mb-4 text-deep-rose"
        >
          A Glimpse of Us
        </p>

        <h2
          className="heading-lg font-light mb-6"
          style={{ color: 'var(--color-mahogany)' }}
        >
          Moments & Memories
        </h2>

        <p
          className="font-sans text-[18px] font-light max-w-[500px] mx-auto"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          A collection of our favorite moments — the laughter, the journeys, and the love that brought us here.
        </p>
      </div>

      <div
        ref={gridRef}
        className="max-w-[1200px] mx-auto px-6 lg:px-8"
      >
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {GALLERY_IMAGES.map((img, i) => (
            <figure
              key={i}
              className="gallery-card mb-6 break-inside-avoid opacity-0 translate-y-10 scale-95 glass-card overflow-hidden group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption
                className="font-serif italic text-[15px] py-4 px-5 text-center"
                style={{ color: 'var(--color-warm-gray)' }}
              >
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
