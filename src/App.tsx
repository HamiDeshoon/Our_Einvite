import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiagonalCarousel from './components/DiagonalCarousel';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import OurStory from './sections/OurStory';
import TheWedding from './sections/TheWedding';
import Gallery from './sections/Gallery';
import RSVP from './sections/RSVP';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      // Hide loading screen after a brief delay
      const timer = setTimeout(() => {
        const loader = document.querySelector('.loading-screen');
        if (loader) {
          loader.classList.add('hidden');
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <>
      {/* Loading Screen */}
      <div className="loading-screen">
        <h1
          className="font-serif text-[32px] font-light tracking-[-0.02em] mb-3"
          style={{ color: 'var(--color-espresso)' }}
        >
          Fatemeh &amp; Hamid
        </h1>
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--color-blush)', borderTopColor: 'transparent' }}
        />
      </div>

      {/* Diagonal WebGL Carousel - persistent background */}
      <DiagonalCarousel onLoad={() => setLoaded(true)} />

      {/* Diagonal band overlay */}
      <div id="gallery-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Content Sections */}
      <main className="relative" style={{ zIndex: 10 }}>
        <Hero />
        <OurStory />
        <TheWedding />
        <Gallery />
        <RSVP />
        <Footer />
      </main>
    </>
  );
}

export default App;
