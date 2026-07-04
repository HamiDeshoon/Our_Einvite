import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'The Wedding', href: '#the-wedding' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
<<<<<<< HEAD
        height: scrolled ? '56px' : '64px',
        background: scrolled ? 'rgba(254, 253, 251, 0.95)' : 'rgba(254, 253, 251, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(183, 110, 121, 0.2)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(62, 39, 35, 0.08)' : 'none',
=======
        height: '64px',
        background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(230, 230, 250, 0.9) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled 
          ? '1px solid var(--color-fairy-purple)' 
          : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(212, 184, 232, 0.3)' : 'none',
>>>>>>> fa50cdf0c42cd55bde6d10b109f6c7a4bfe57399
      }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 lg:px-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
<<<<<<< HEAD
          className="font-display text-[24px] font-normal tracking-tight"
          style={{ color: 'var(--color-mahogany)' }}
        >
          Fatemeh & Hamid
=======
          className="font-serif text-[20px] font-light tracking-tight transition-colors duration-300 hover:text-rose-gold"
          style={{ 
            color: 'var(--color-twilight)',
            textShadow: '0 1px 5px rgba(212, 184, 232, 0.3)'
          }}
        >
          ✦ Fatemeh &amp; Hamid ✦
>>>>>>> fa50cdf0c42cd55bde6d10b109f6c7a4bfe57399
        </a>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
<<<<<<< HEAD
              className="font-sans text-[13px] font-normal uppercase tracking-[0.08em] transition-colors duration-300 relative"
              style={{ color: 'var(--color-warm-gray)' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-mahogany)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-warm-gray)';
              }}
=======
              className="font-sans text-[13px] font-normal uppercase tracking-[0.08em] transition-all duration-300 hover:text-rose-gold relative group"
              style={{ color: 'var(--color-taupe)' }}
>>>>>>> fa50cdf0c42cd55bde6d10b109f6c7a4bfe57399
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-gold to-magic-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}