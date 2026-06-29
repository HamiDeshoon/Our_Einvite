import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiagonalCarousel from './components/DiagonalCarousel';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import OurStory from './sections/OurStory';
import TheWedding from './sections/TheWedding';
import Gallery from './sections/Gallery';
import RSVP from './sections/RSVP';
import Footer from './sections/Footer';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Callback to hide loading screen when carousel textures are ready
  const onDiagonalLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Init Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    // @ts-expect-error Lenis instance has no type definitions
    window.lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Fallback hide after a safety timeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 s max
  
    // Callback to hide loading screen when carousel textures are ready

    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Show loading overlay while isLoading is true
  if (isLoading) {
    return (
      <div className="loading-screen" data-testid="loading-screen">
        <h1 className="font-serif text-[32px] font-light tracking-[-0.02em] mb-3">
          Fatemeh & Hamid
        </h1>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--color-blush)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  // Render main content
  return (
    <>
      {/* Persistent background carousel */}
      <DiagonalCarousel onLoad={onDiagonalLoad} />

      {/* Diagonal overlay */}
      <div id="gallery-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Sections with fade‑in animation */}
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
