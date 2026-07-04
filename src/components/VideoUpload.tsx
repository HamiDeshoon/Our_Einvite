import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function VideoUpload() {
  const containerRef = useRef<HTMLElement | null>(null);
  useScrollAnimation(containerRef);

  return (
    <section 
      ref={containerRef} 
      className="my-16 max-w-4xl mx-auto fade-in" 
      id="video-invite"
      style={{ zIndex: 10 }}
    >
      <div className="glass-card p-8 md:p-12 text-center rounded-3xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-4 text-mahogany">
          Your Invitation Video
        </h2>
        <p className="font-sans text-[16px] text-warm-gray mb-6 max-w-[400px] mx-auto">
          The video above shares our story and wedding details.
        </p>
        <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
          <video
            src="/main.mp4"
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support the video element.
          </video>
        </div>
      </div>
    </section>
  );
}