import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Volume2, Music, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayPreloaderProps {
  onEnter: () => void;
}

export default function BirthdayPreloader({ onEnter }: BirthdayPreloaderProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Gathering stardust and memories...");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Progress simulation
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Update text based on progress
  useEffect(() => {
    if (loadingProgress < 30) {
      setLoadingText("Gathering stardust and memories... ✨");
    } else if (loadingProgress < 60) {
      setLoadingText("Tuning up background melodies... 🎵");
    } else if (loadingProgress < 85) {
      setLoadingText("Unwrapping your birthday smiles... 🌸");
    } else {
      setLoadingText("Ready to celebrate Jagriti! 💖");
    }
  }, [loadingProgress]);

  const handleEnterClick = () => {
    setIsFadingOut(true);
    // Extra mini confetti burst for the grand entrance
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#ffffff']
    });
    // Trigger callback to start background music after fading out begins
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  if (isFadingOut) {
    return (
      <div className="fixed inset-0 bg-neutral-950 z-50 transition-opacity duration-1000 ease-in-out opacity-0 pointer-events-none flex items-center justify-center">
        <Heart fill="currentColor" className="text-romantic-pink-500 scale-150 animate-ping" size={100} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-neutral-950 z-50 flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      
      {/* Immersive Cosmic Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-radial-gradient from-romantic-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-radial-gradient from-romantic-gold-300/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Floating Sparkles in Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Sparkles className="absolute top-12 left-1/3 text-romantic-gold-200 animate-pulse" size={24} />
        <Sparkles className="absolute bottom-16 right-1/4 text-romantic-pink-300 animate-pulse" size={18} style={{ animationDuration: '3s' }} />
        <Heart fill="currentColor" className="absolute top-1/2 right-12 text-romantic-pink-500/20 animate-bounce" size={14} />
      </div>

      <div className="max-w-md w-full text-center z-10 flex flex-col items-center">
        
        {!isLoaded ? (
          /* Loading Phase */
          <div className="flex flex-col items-center w-full animate-fadeIn">
            {/* Pulsing Gift/Heart Box Icon */}
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-romantic-pink-500/25 animate-ping" style={{ animationDuration: '1.5s' }} />
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-romantic-pink-400 flex items-center justify-center text-romantic-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <Gift size={28} className="animate-bounce" />
              </div>
            </div>

            <h2 className="font-serif font-medium text-romantic-gold-100 text-lg tracking-widest uppercase mb-2">
              Somu's Sweet Universe
            </h2>
            <p className="font-sans font-light text-neutral-400 text-xs mb-6 tracking-wide">
              Preparing a magical corner of the internet...
            </p>

            {/* Custom Premium Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3.5 max-w-[280px]">
              <div 
                style={{ width: `${loadingProgress}%` }}
                className="h-full bg-gradient-to-r from-romantic-pink-500 to-romantic-gold-300 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_#f43f5e]"
              />
            </div>

            <span className="font-sans font-light text-[11px] text-neutral-400 tracking-wide italic">
              {loadingText}
            </span>
          </div>
        ) : (
          /* Ready Phase (Beautiful Welcome Note) */
          <div className="flex flex-col items-center w-full animate-scaleIn">
            
            {/* Glowing heartbeat */}
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center cursor-pointer group" onClick={handleEnterClick}>
              <div className="absolute inset-0 rounded-full bg-romantic-pink-500/30 animate-ping" style={{ animationDuration: '1.2s' }} />
              <div className="absolute inset-0 rounded-full bg-romantic-gold-300/10 scale-125 blur-sm" />
              <div className="w-14 h-14 rounded-full bg-neutral-900 border border-romantic-pink-500 flex items-center justify-center text-romantic-pink-500 shadow-[0_0_25px_rgba(244,63,94,0.55)] group-hover:scale-105 transition-transform duration-300">
                <Heart fill="currentColor" size={22} className="animate-pulse" />
              </div>
            </div>

            <span className="text-[10px] uppercase font-sans tracking-widest text-romantic-gold-300 font-bold mb-2">
              For My Dearest Jagriti (My Bacha) ❤️
            </span>

            <h1 className="font-serif font-bold text-2.5xl md:text-3xl text-neutral-100 tracking-wide mb-5">
              Your Birthday Gift is Ready
            </h1>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 max-w-[360px] text-center backdrop-blur-md">
              <p className="font-sans font-light text-xs text-neutral-300 leading-relaxed mb-3">
                "Welcome to our magical little space. Today, as a beautiful soul completes 18 wonderful orbits around the sun, I've wrapped up our beautiful memories, sweet snaps, future dreams, and a letter straight from my heart."
              </p>
              <div className="flex items-center justify-center gap-1.5 text-romantic-gold-200 font-sans text-[10px] uppercase tracking-wider font-semibold">
                <Volume2 size={12} className="animate-pulse" /> Use Headphones for the best experience
              </div>
            </div>

            {/* Premium Call to Action */}
            <button
              onClick={handleEnterClick}
              className="px-8 py-3.5 bg-gradient-to-r from-romantic-pink-500 via-rose-500 to-romantic-gold-300 hover:scale-103 active:scale-97 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full shadow-lg hover:shadow-romantic-pink-500/20 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-white/20"
            >
              Enter Jagriti's Universe ✨
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
