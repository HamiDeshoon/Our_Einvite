import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RSVP_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [attending, setAttending] = useState<'accept' | 'decline' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = formRef.current?.querySelectorAll('.form-animate');
      if (elements) {
        gsap.to(Array.from(elements), {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const form = formRef.current;
      if (!form) return;

      const body = {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
        guests: (form.elements.namedItem('guests') as HTMLSelectElement).value,
        attending: attending || '',
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        // Honeypot — bots fill this, the script ignores submissions that do.
        website: (form.elements.namedItem('website') as HTMLInputElement).value,
      };

      if (!RSVP_ENDPOINT) {
        // No endpoint configured — behave as if successful (dev mode).
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSubmitted(true);
        return;
      }

      const res = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or reach out to us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative py-[180px] max-md:py-[120px]"
      style={{ zIndex: 10, background: 'var(--color-champagne)' }}
    >
      <div className="max-w-[600px] mx-auto px-6">
        <p
          className="form-animate font-serif italic text-[14px] uppercase tracking-[0.1em] text-center mb-4 opacity-0 translate-y-4 text-deep-rose"
        >
          RSVP
        </p>

        <h2
          className="form-animate heading-lg font-light text-center mb-3 opacity-0 translate-y-4"
          style={{ color: 'var(--color-mahogany)' }}
        >
          Will You Be There?
        </h2>

        <p
          className="form-animate font-sans text-[16px] font-light text-center mb-12 opacity-0 translate-y-4"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          Please let us know by July 15th, 2026
        </p>

        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <select
                name="guests"
                required
                className="underline-input cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Number of Guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
              </select>
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <p
                className="font-sans text-[14px] font-medium uppercase tracking-[0.05em] mb-4"
                style={{ color: 'var(--color-warm-gray)' }}
              >
                Will you be attending?
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttending('accept')}
                  className={`rsvp-pill ${attending === 'accept' ? 'selected' : ''}`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('decline')}
                  className={`rsvp-pill ${attending === 'decline' ? 'selected' : ''}`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <textarea
                name="message"
                placeholder="Leave a message for the couple..."
                rows={3}
                className="underline-input resize-none"
              />
            </div>

            {/* Honeypot — hidden from humans, visible to bots */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {error && (
              <p
                className="form-animate font-sans text-[14px] text-center -mt-4"
                style={{ color: 'var(--color-deep-rose)' }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !attending}
              className="form-animate font-serif text-[16px] uppercase tracking-[0.08em] py-4 rounded-full transition-all duration-300 opacity-0 translate-y-4 scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: submitting ? 'var(--color-rose-gold)' : 'var(--color-mahogany)',
                color: 'var(--color-ivory)',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  (e.target as HTMLElement).style.background = 'var(--color-deep-rose)';
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting) {
                  (e.target as HTMLElement).style.background = 'var(--color-mahogany)';
                }
              }}
            >
              {submitting ? 'Sending...' : 'Send RSVP'}
            </button>
          </form>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto mb-6"
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-rose-gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3
              className="font-serif text-[34px] font-light mb-3"
              style={{ color: 'var(--color-mahogany)' }}
            >
              Thank You!
            </h3>
            <p
              className="font-sans text-[16px] font-light max-w-[350px] mx-auto"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              {attending === 'accept'
                ? 'We are so excited to celebrate with you!'
                : 'You will be missed. Thank you for letting us know.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
