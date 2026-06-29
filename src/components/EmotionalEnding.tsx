import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const poemLines = [
  "People say birthdays come once every year...",
  "But someone like you...",
  "Comes only once in a lifetime.",
  "Thank you for existing.",
  "Thank you for choosing me.",
  "Thank you for making ordinary days feel special.",
  "No matter how much time passes...",
  "I promise...",
  "I'll always pray for your happiness.",
  "Happy Birthday,",
  "My Bacha ❤️",
  "My Babu ❤️",
  "My Darling ❤️",
  "My Cutiee ❤️",
  "My Maalkin ❤️",
  "Forever Yours,",
  "Somu ❤️"
];

export default function EmotionalEnding() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersecting check so the typing only starts when the user reaches this section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startSequence();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startSequence = () => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setVisibleCount(index);
      if (index >= poemLines.length) {
        clearInterval(interval);
        setFinished(true);
        // Burst massive celebratory confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 }
        });
      }
    }, 2500); // appears every 2.5 seconds
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center py-24 px-4 overflow-hidden"
    >
      {/* 3D Starry/Cosmic Sky background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black pointer-events-none" />
      
      {/* Tiny glowing stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-12 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-24 right-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-rose-200 rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-12 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '3.5s' }} />
      </div>

      <div className="max-w-2xl text-center z-10 flex flex-col items-center">
        {/* Poem lines */}
        <div className="flex flex-col gap-4 md:gap-5.5 mb-12">
          {poemLines.map((line, idx) => {
            if (idx >= visibleCount) return null;

            // Highlight certain special designations
            const isName = line.startsWith("My ") || line.startsWith("Somu ") || line.startsWith("Forever ");
            const isHeading = line.startsWith("Happy Birthday");

            return (
              <p
                key={idx}
                className={`transition-all duration-1000 ease-out transform animate-scaleIn ${
                  isName 
                    ? 'font-cursive text-4xl md:text-5.5xl text-romantic-pink-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                    : isHeading
                    ? 'font-serif font-bold text-2xl md:text-4.5xl text-romantic-gold-300 tracking-wider uppercase'
                    : 'font-serif italic text-base sm:text-lg md:text-xl text-neutral-300 tracking-wide'
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>

        {/* Heart Beat Animation container */}
        {finished && (
          <div className="flex flex-col items-center justify-center animate-scaleIn">
            <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
              {/* Outer Golden Glow ring */}
              <div className="absolute inset-0 rounded-full bg-radial-gradient from-romantic-gold-100 to-transparent scale-125 blur-lg pointer-events-none opacity-40" />
              
              {/* Pulsing hearts */}
              <div className="absolute w-16 h-16 text-romantic-pink-400/20 animate-ping" style={{ animationDuration: '1.2s' }}>
                <Heart fill="currentColor" className="w-full h-full" />
              </div>
              
              <div className="absolute w-20 h-20 text-romantic-pink-300/30 animate-pulse" style={{ animationDuration: '0.8s' }}>
                <Heart fill="currentColor" className="w-full h-full" />
              </div>

              {/* Main Glowing solid heart */}
              <div className="relative w-14 h-14 text-romantic-pink-500 filter drop-shadow-[0_8px_16px_rgba(244,63,94,0.5)] cursor-pointer hover:scale-110 transition-transform">
                <Heart fill="currentColor" className="w-full h-full" />
              </div>
            </div>

            <h4 className="font-cursive text-4xl text-romantic-gold-100/90 tracking-wide animate-pulse">
              But... Our Story Never Ends. ∞
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}
