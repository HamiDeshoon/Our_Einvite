import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: '/images/Mirror_duo.jpg', caption: 'Reflections of us' },
  { src: '/images/Elevator_duo.jpg', caption: 'Going up together' },
  { src: '/images/Gang_pose_duo.jpg', caption: 'Gang Gang!' },
  { src: '/images/Selfie_hamid_view.jpg', caption: 'Through his eyes' },
  { src: '/images/Selfie_fatemeh_view.jpg', caption: 'Through her eyes' },
  { src: '/images/proposal_us.jpg', caption: 'The proposal' },
  { src: '/images/Intivation_pose.jpg', caption: 'Just the two of us' },
  { src: '/images/North_trip.jpg', caption: 'Northern adventures' },
  { src: '/images/First_trip.jpg', caption: 'Our very first trip' },
  { src: '/images/Kebab_trio.jpg', caption: 'Good food, great company' },
  { src: '/images/Wedding_flowers.jpg', caption: 'Awaiting the big day' },
  { src: '/images/Wedding_ring.jpg', caption: 'A promise forever' },
  { src: '/images/our_childhood.jpg', caption: 'Two kids, two stories, one future' },
  { src: '/images/Graduation.jpg', caption: 'Proud of how far we have come' },
  { src: '/images/Graduation_party.jpg', caption: 'Celebrating every milestone' },
  { src: '/images/Fatemeh_childhood.jpg', caption: 'Fatemeh, through the years' },
  { src: '/images/Hamid_defending_thesis.jpg', caption: 'Hamid, a proud moment' },
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