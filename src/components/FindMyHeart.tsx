import React, { useState, useEffect } from 'react';
import { Heart, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FindMyHeartProps {
  onNextStep: () => void;
}

const CUTE_ERRORS = [
  "Hehe... Not this one, Babu 🤭",
  "Try again, my sweet princess! 🌸",
  "My heart is hidden somewhere else! 🥰",
  "Keep looking, my bacha! 🧸",
  "Almost there, my love! 💕",
  "Oops, that's just a regular present! 🎁"
];

export default function FindMyHeart({ onNextStep }: FindMyHeartProps) {
  const [heartIndex, setHeartIndex] = useState(-1);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize randomized position on mount
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * 16);
    setHeartIndex(randomIndex);
    setRevealed([]);
    setShakeIndex(null);
    setErrorMessage(null);
    setIsSuccess(false);
  };

  const handleCardClick = (index: number) => {
    if (isSuccess || revealed.includes(index)) return;

    if (index === heartIndex) {
      // SUCCESS!
      setRevealed((prev) => [...prev, index]);
      setIsSuccess(true);
      setErrorMessage(null);
      
      // Infinite mini-explosions of love confetti
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

    } else {
      // WRONG CARD
      setRevealed((prev) => [...prev, index]);
      setShakeIndex(index);
      
      // Pick a random cute error message
      const randomMsg = CUTE_ERRORS[Math.floor(Math.random() * CUTE_ERRORS.length)];
      setErrorMessage(randomMsg);

      // Reset shake class after animation finishes
      setTimeout(() => {
        setShakeIndex(null);
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 p-6 md:p-8 shadow-xl text-center relative overflow-hidden">
      
      {/* Decorative top badges */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient from-romantic-pink-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-radial-gradient from-romantic-gold-100/20 to-transparent rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        <span className="text-romantic-pink-500 font-serif text-xs uppercase tracking-widest font-bold block mb-1.5">
          Interactive Mini-Game 1
        </span>
        <h3 className="font-serif font-medium text-2xl text-neutral-800 tracking-tight mb-2">
          Find My Heart ❤️
        </h3>
        <p className="font-sans font-light text-neutral-500 text-xs max-w-sm mx-auto mb-6 leading-relaxed">
          My heart is hidden inside one of these 16 cute gift packages. Can you find where it is? Click to open them!
        </p>

        {/* 4x4 Grid of Presents */}
        <div className="grid grid-cols-4 gap-3 max-w-[320px] mx-auto mb-6">
          {Array.from({ length: 16 }).map((_, index) => {
            const isRevealed = revealed.includes(index);
            const isCorrect = index === heartIndex;
            const isShaking = shakeIndex === index;

            return (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                disabled={isSuccess}
                className={`
                  aspect-square rounded-2xl flex items-center justify-center cursor-pointer select-none transition-all duration-300 relative overflow-hidden outline-none
                  ${isShaking ? 'animate-shake' : ''}
                  ${isRevealed 
                    ? isCorrect
                      ? 'bg-gradient-to-br from-romantic-pink-400 to-rose-600 text-white shadow-lg shadow-rose-500/30 border-none scale-102 ring-4 ring-rose-200'
                      : 'bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed scale-95'
                    : 'bg-white border-2 border-dashed border-romantic-pink-200/60 hover:border-romantic-pink-400 text-romantic-pink-400 hover:scale-103 shadow-sm hover:shadow-md'
                  }
                `}
                style={{
                  animation: isShaking ? 'shake 0.5s ease-in-out' : undefined
                }}
              >
                {isRevealed ? (
                  isCorrect ? (
                    <div className="relative animate-heartbeat">
                      <Heart fill="currentColor" size={26} className="text-white drop-shadow-md" />
                      {/* Radiating rings */}
                      <span className="absolute inset-0 scale-150 rounded-full border border-white/40 animate-ping" />
                    </div>
                  ) : (
                    <span className="text-lg opacity-40">💨</span>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-0.5 group-hover:scale-110 transition-transform duration-300">
                    <Gift size={20} className="stroke-[1.5] text-romantic-pink-400/80" />
                    <span className="text-[8px] font-sans text-romantic-pink-300/60 tracking-wider">🎁</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Speech bubble & Prompts */}
        <div className="min-h-[44px] flex items-center justify-center mb-6">
          {errorMessage && (
            <div className="bg-rose-50 text-rose-600 text-xs py-2 px-4 rounded-full border border-rose-100/80 animate-scaleIn shadow-sm flex items-center gap-1.5 font-sans">
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess && (
            <div className="bg-emerald-50 text-emerald-700 text-xs py-2.5 px-4 rounded-full border border-emerald-100 animate-scaleIn shadow-sm flex items-center gap-1.5 font-sans">
              ✨ Brilliant! You found it! ✨
            </div>
          )}
        </div>

        {/* Success Announcement Details */}
        {isSuccess ? (
          <div className="animate-fadeIn mt-2 p-5 bg-gradient-to-r from-rose-500/5 via-rose-500/10 to-amber-500/5 border border-rose-500/10 rounded-2xl mb-2">
            <p className="font-serif font-medium text-romantic-pink-600 text-sm leading-relaxed mb-1.5">
              "You found my heart...
            </p>
            <p className="font-serif font-medium text-romantic-pink-600 text-sm leading-relaxed mb-4">
              Because it has always belonged to you. ❤️"
            </p>
            
            <button
              onClick={onNextStep}
              className="mx-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-romantic-pink-500 to-rose-600 hover:scale-103 active:scale-97 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full shadow-md hover:shadow-rose-500/20 transition-all cursor-pointer border border-white/10"
            >
              Continue Our Journey ❤️ <ArrowRight size={13} className="animate-pulse" />
            </button>
          </div>
        ) : (
          revealed.length > 0 && (
            <button
              onClick={resetGame}
              className="text-[10px] font-sans font-semibold tracking-wider text-neutral-400 hover:text-romantic-pink-500 uppercase transition-colors"
            >
              Reset Board 🔄
            </button>
          )
        )}
      </div>

      {/* Styled shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
