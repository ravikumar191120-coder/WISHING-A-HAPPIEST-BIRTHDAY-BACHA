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

interface TwinkleStar {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
}

export default function EmotionalEnding() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [stars, setStars] = useState<TwinkleStar[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hidden Final Climax States
  const [showFinalClimax, setShowFinalClimax] = useState(false);
  const [climaxStep, setClimaxStep] = useState(0);

  // Generate random twinkling stars on mount
  useEffect(() => {
    const generatedStars: TwinkleStar[] = [];
    for (let i = 0; i < 40; i++) {
      generatedStars.push({
        id: i,
        top: Math.random() * 90 + 5,
        left: Math.random() * 95 + 2.5,
        size: Math.random() * 1.5 + 1, // 1px to 2.5px
        duration: Math.random() * 3 + 2 // 2s to 5s twinkling period
      });
    }
    setStars(generatedStars);
  }, []);

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
        
        // Initial burst celebratory confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 }
        });

        // Trigger premium elegant fireworks after 2 seconds
        setTimeout(() => {
          triggerFireworksFinale();
        }, 2000);
      }
    }, 2500); // appears every 2.5 seconds
  };

  // Launch elegant premium fireworks (not too spammy, very beautiful)
  const triggerFireworksFinale = () => {
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);
      // Fireworks launched at varying locations
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.15, 0.45), y: randomInRange(0.2, 0.5) },
        colors: ['#fb7185', '#fda4af', '#f43f5e', '#fbbf24', '#f59e0b']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.55, 0.85), y: randomInRange(0.2, 0.5) },
        colors: ['#e879f9', '#f472b6', '#38bdf8', '#818cf8', '#fb7185']
      });
    }, 1500); // 1.5s intervals for realistic pacing
  };

  // Start sequential final climax typing/animations
  const handleFinalClimaxStart = () => {
    setShowFinalClimax(true);
    setClimaxStep(1);

    // Step 2 after 3 seconds
    setTimeout(() => {
      setClimaxStep(2);
    }, 3500);

    // Step 3 after 7 seconds
    setTimeout(() => {
      setClimaxStep(3);
    }, 7000);

    // Step 4 after 11.5 seconds
    setTimeout(() => {
      setClimaxStep(4);
    }, 11500);

    // Step 5 after 15 seconds
    setTimeout(() => {
      setClimaxStep(5);
    }, 15000);

    // Heartbeat remains alone after 19.5 seconds
    setTimeout(() => {
      setClimaxStep(6);
    }, 19500);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center py-28 px-4 overflow-hidden"
    >
      {/* Night Sky Cosmic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black pointer-events-none" />
      
      {/* Shooting Stars (twinkle & dash across periodically) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shooting-star star-1" />
        <div className="shooting-star star-2" />
        <div className="shooting-star star-3" />
      </div>

      {/* Dynamic Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Peaceful center announcement */}
      <div className="absolute top-10 flex flex-col items-center gap-1 z-10 opacity-70">
        <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-neutral-400">
          Under the Stars
        </span>
        <h5 className="font-serif italic text-xs text-rose-300">
          Make a wish, Birthday Girl ✨
        </h5>
      </div>

      {/* Poem Lines Container */}
      <div className="max-w-2xl text-center z-10 flex flex-col items-center mt-12">
        <div className="flex flex-col gap-4 md:gap-5.5 mb-14">
          {poemLines.map((line, idx) => {
            if (idx >= visibleCount) return null;

            const isName = line.startsWith("My ") || line.startsWith("Somu ") || line.startsWith("Forever ");
            const isHeading = line.startsWith("Happy Birthday");

            return (
              <p
                key={idx}
                className={`transition-all duration-1000 ease-out transform animate-scaleIn ${
                  isName 
                    ? 'font-cursive text-4xl md:text-5.5xl text-romantic-pink-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.35)]' 
                    : isHeading
                    ? 'font-serif font-bold text-2xl md:text-4xl text-romantic-gold-300 tracking-wider uppercase'
                    : 'font-serif italic text-base sm:text-lg md:text-xl text-neutral-300 tracking-wide'
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>

        {/* Heart Beat Animation & Final Climax Surprise Button */}
        {finished && (
          <div className="flex flex-col items-center justify-center animate-scaleIn space-y-8">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                {/* Outer Golden Glow ring */}
                <div className="absolute inset-0 rounded-full bg-radial-gradient from-romantic-gold-100 to-transparent scale-125 blur-lg pointer-events-none opacity-45" />
                
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

            {/* Climax Surprise Activation Button */}
            <div className="pt-6">
              <button
                onClick={handleFinalClimaxStart}
                className="px-8 py-3 rounded-full border border-rose-300/30 bg-rose-500/10 text-rose-300 text-xs font-bold font-sans tracking-widest uppercase hover:bg-rose-500/20 hover:border-rose-400/60 active:scale-97 cursor-pointer transition-all shadow-md select-none"
              >
                One Last Click... ❤️
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= CLIMAX OVERLAY ================= */}
      {showFinalClimax && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
          {/* Silent Heartbeat container in center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
            <div className="w-96 h-96 rounded-full bg-radial-gradient from-red-500/15 to-transparent animate-pulse scale-150" style={{ animationDuration: '1.4s' }} />
          </div>

          <div className="max-w-md w-full flex flex-col items-center justify-center space-y-6 z-10 min-h-[300px]">
            {climaxStep === 1 && (
              <p className="font-serif italic text-lg sm:text-xl text-neutral-300 tracking-wide leading-relaxed animate-fadeIn">
                "If someday life becomes difficult..."
              </p>
            )}

            {climaxStep === 2 && (
              <p className="font-serif italic text-lg sm:text-xl text-neutral-300 tracking-wide leading-relaxed animate-fadeIn">
                "Read this website again."
              </p>
            )}

            {climaxStep === 3 && (
              <p className="font-serif italic text-lg sm:text-xl text-neutral-300 tracking-wide leading-relaxed animate-fadeIn">
                "Because every word here came straight from my heart."
              </p>
            )}

            {climaxStep === 4 && (
              <p className="font-serif font-bold text-3xl sm:text-4xl text-rose-500 tracking-wider uppercase animate-scaleIn">
                "Happy Birthday, Jagriti ❤️"
              </p>
            )}

            {climaxStep === 5 && (
              <div className="space-y-3 animate-scaleIn">
                <p className="font-serif italic text-neutral-400 text-sm tracking-wide">
                  "Forever Yours,"
                </p>
                <h3 className="font-cursive text-5xl sm:text-6xl text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                  Somu ❤️
                </h3>
              </div>
            )}

            {/* Step 6: Pure silent heartbeat screen */}
            {climaxStep === 6 && (
              <div className="flex flex-col items-center animate-scaleIn">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <div className="absolute w-28 h-28 text-rose-600/15 animate-ping" style={{ animationDuration: '1.3s' }}>
                    <Heart fill="currentColor" className="w-full h-full" />
                  </div>
                  <div className="absolute w-24 h-24 text-rose-500/25 animate-pulse" style={{ animationDuration: '0.8s' }}>
                    <Heart fill="currentColor" className="w-full h-full" />
                  </div>
                  <div className="relative w-16 h-16 text-rose-500 filter drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                    <Heart fill="currentColor" className="w-full h-full" />
                  </div>
                </div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mt-6 animate-pulse">
                  Infinite heartbeat
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS Styles for Shooting Stars & Animations */}
      <style>{`
        /* Shooting Star effect */
        .shooting-star {
          position: absolute;
          left: 50%;
          top: 50%;
          height: 1.5px;
          background: linear-gradient(-45deg, rgba(255,255,255,1), rgba(255,255,255,0));
          border-radius: 999px;
          filter: drop-shadow(0 0 6px rgba(255,255,255,1));
          animation: tail 4s ease-in-out infinite, shooting 4s ease-in-out infinite;
          opacity: 0;
        }

        .star-1 {
          top: 10%;
          left: 80%;
          animation-delay: 1.2s;
        }

        .star-2 {
          top: 35%;
          left: 95%;
          animation-delay: 3s;
        }

        .star-3 {
          top: 5%;
          left: 40%;
          animation-delay: 5.2s;
        }

        @keyframes tail {
          0% { width: 0; }
          30% { width: 100px; }
          100% { width: 0; }
        }

        @keyframes shooting {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          30% {
            transform: translateX(-400px) translateY(400px) rotate(-45deg);
            opacity: 0;
          }
          100% {
            transform: translateX(-400px) translateY(400px) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
