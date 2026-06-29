import React, { useState, useEffect, useRef } from 'react';
import { Heart, X } from 'lucide-react';

export default function FloatingButterfly() {
  const [position, setPosition] = useState({ x: 10, y: 30 });
  const [angle, setAngle] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Random movement loop
  useEffect(() => {
    if (isPopupOpen) return;

    const moveButterfly = () => {
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

      // Restrict range to stay away from immediate screen edges
      const nextX = Math.random() * (windowWidth - 120) + 40;
      const nextY = Math.random() * (windowHeight - 120) + 40;

      setPosition((prev) => {
        // Calculate heading angle
        const dx = nextX - prev.x;
        const dy = nextY - prev.y;
        let heading = (Math.atan2(dy, dx) * 180) / Math.PI;
        // Adjust angle because butterfly SVG faces upwards (90deg offset)
        setAngle(heading + 90);
        return { x: nextX, y: nextY };
      });
    };

    // Initial positioning
    moveButterfly();

    const interval = setInterval(moveButterfly, 6000); // changes position every 6 seconds
    return () => clearInterval(interval);
  }, [isPopupOpen]);

  const handleButterflyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  return (
    <>
      {/* Wrapper container has pointer-events-none so it doesn't block scrolling */}
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
      >
        {/* Animated Butterfly element */}
        <div
          onClick={handleButterflyClick}
          className="absolute cursor-pointer pointer-events-auto transition-all ease-in-out hover:scale-110 active:scale-95"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `rotate(${angle}deg)`,
            transitionDuration: '5.5s', // slow, realistic gliding speed
            width: '38px',
            height: '38px',
          }}
        >
          {/* Butterfly Graphic with fluttering wings */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Left Wing */}
            <div 
              className="absolute left-[3px] w-[16px] h-[24px] bg-gradient-to-tr from-rose-400 via-romantic-pink-400 to-amber-300 rounded-l-full origin-right shadow-sm"
              style={{
                animation: 'flutterLeft 0.12s infinite ease-in-out alternate',
              }}
            />
            {/* Right Wing */}
            <div 
              className="absolute right-[3px] w-[16px] h-[24px] bg-gradient-to-tl from-rose-400 via-romantic-pink-400 to-amber-300 rounded-r-full origin-left shadow-sm"
              style={{
                animation: 'flutterRight 0.12s infinite ease-in-out alternate',
              }}
            />
            {/* Body */}
            <div className="absolute w-[3px] h-[18px] bg-rose-700/90 rounded-full z-10" />
            {/* Small Antennae */}
            <div className="absolute top-[3px] w-[12px] h-[8px] border-t border-rose-800 rounded-t-full pointer-events-none opacity-80" />
          </div>
        </div>
      </div>

      {/* Sweet hidden surprise popup modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-rose-100 p-6 md:p-8 max-w-sm w-full text-center shadow-2xl relative animate-scaleIn">
            {/* Floating petals backdrop behind popup */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-radial-gradient from-romantic-pink-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
            
            <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Heart fill="#f43f5e" className="text-rose-500 animate-pulse" size={26} />
            </div>

            <h3 className="font-serif font-medium text-lg text-neutral-800 mb-2">
              You found my hidden surprise! ❤️
            </h3>
            
            <p className="font-sans font-light text-neutral-500 text-xs leading-relaxed mb-6">
              Just like this beautiful butterfly, you fluttered into my heart when I least expected it, and filled my whole world with colors I never knew existed. I love you, Jagriti.
            </p>

            <button
              onClick={() => setIsPopupOpen(false)}
              className="w-full py-2.5 bg-gradient-to-r from-romantic-pink-500 to-rose-500 text-white font-sans font-bold text-[10px] tracking-widest uppercase rounded-full shadow-md hover:shadow-rose-400/20 active:scale-97 cursor-pointer transition-all border border-white/10"
            >
              Continue Our Fairytale ✨
            </button>
          </div>
        </div>
      )}

      {/* Wing fluttering keyframe animations */}
      <style>{`
        @keyframes flutterLeft {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(70deg); }
        }
        @keyframes flutterRight {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-70deg); }
        }
      `}</style>
    </>
  );
}
