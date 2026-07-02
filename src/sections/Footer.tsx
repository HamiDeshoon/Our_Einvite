export default function Footer() {
  return (
    <footer
      className="relative py-[60px]"
      style={{
        zIndex: 10,
        background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.9) 0%, rgba(230, 230, 250, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--color-fairy-purple)',
      }}
    >
      {/* Decorative fairy elements */}
      <div className="absolute top-4 left-1/3 text-xl twinkle" style={{ color: 'var(--color-magic-gold)' }}>✦</div>
      <div className="absolute top-4 right-1/3 text-xl twinkle" style={{ animationDelay: '0.5s', color: 'var(--color-rose-gold)' }}>✧</div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <h3
          className="font-serif text-[24px] font-light mb-2"
          style={{ 
            color: 'var(--color-twilight)',
            textShadow: '0 2px 10px rgba(212, 184, 232, 0.3)'
          }}
        >
          ✦ Fatemeh &amp; Hamid ✦
        </h3>

        <p
          className="font-sans text-[14px] font-light tracking-[0.1em] mb-4"
          style={{ color: 'var(--color-taupe)' }}
        >
          13 . 08 . 2026
        </p>

        <p
          className="font-serif italic text-[16px]"
          style={{ color: 'var(--color-rose-gold)' }}
        >
          With love and gratitude ✦
        </p>
      </div>
    </footer>
  );
}
