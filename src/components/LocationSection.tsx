import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref);

  return (
    <section
      ref={ref}
      id="location"
      className="relative py-20 fade-in"
      style={{ zIndex: 10, background: 'var(--color-ivory)' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-serif italic text-[14px] uppercase tracking-[0.1em] mb-4 text-deep-rose">
            Find Us
          </p>
          <h2 className="heading-lg font-light mb-6" style={{ color: 'var(--color-mahogany)' }}>
            Wedding Location
          </h2>
          <p className="font-sans text-[18px] font-light mb-2" style={{ color: 'var(--color-warm-gray)' }}>
            Shahdokht Wedding Hall, Ahmadabad Mostofi, Tehran
          </p>
          <p className="font-sans text-[18px] font-light mb-8" style={{ color: 'var(--color-warm-gray)' }}>
            13 August 2026, 6:00 PM
          </p>
        </div>

        <div className="glass-card p-3 rounded-2xl overflow-hidden mx-auto" style={{ maxWidth: '800px' }}>
          <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '4/3', maxHeight: '450px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.3416593875154!2d51.2096296603599!3d35.65860216138485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8df9007207f015%3A0xa4accfcab4fcd142!2z2KjYp9i6INi52YXYp9ix2Kog2LTYp9mH2K_Yrtiq!5e0!3m2!1sen!2s!4v1783141964584!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Wedding location map"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/search/?api=1&query=35.658602%2C51.209630"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block animated-underline text-rose-gold font-serif text-[16px] uppercase tracking-[0.08em]"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}