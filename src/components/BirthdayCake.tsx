import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [isBlown, setIsBlown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);

    // Fire premium confetti bursts
    // 1. Center burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 }
    });

    // 2. Delayed left & right bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);

    // Open the cute wish popup after a short transition delay
    setTimeout(() => {
      setShowPopup(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/40 backdrop-blur-md rounded-3xl border border-rose-100/50 p-8 text-center shadow-xl relative overflow-hidden flex flex-col items-center">
      
      {/* Glow highlight behind the cake */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-radial-gradient from-rose-200/20 to-transparent rounded-full blur-xl pointer-events-none" />

      {/* Title */}
      <div className="mb-8 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100/60 rounded-full text-[10px] font-sans font-semibold text-rose-500 uppercase tracking-widest">
          <Sparkles size={10} className="animate-pulse" /> Time for Celebration
        </span>
        <h3 className="font-serif font-semibold text-2xl text-neutral-800 tracking-wide mt-2">
          Make a Sweet Wish 🎂
        </h3>
        <p className="font-sans font-light text-neutral-500 text-xs mt-1 max-w-xs mx-auto">
          Every dream is closer when blown with love. Tap the button to blow the candle!
        </p>
      </div>

      {/* The Visual Cake Canvas Container */}
      <div className="relative w-full h-56 flex items-end justify-center mb-8 select-none">
        
        {/* Cake Stand Plate */}
        <div className="absolute bottom-2 w-56 h-3 bg-neutral-100 border border-neutral-200 rounded-full shadow-md z-10 flex items-center justify-center">
          <div className="w-48 h-0.5 bg-white/80 rounded-full" />
        </div>
        
        {/* Cake Layer Bottom */}
        <div className="absolute bottom-5 w-44 h-16 bg-gradient-to-b from-rose-100 to-rose-200 rounded-2xl border-b border-rose-300 shadow-inner z-20 overflow-hidden flex flex-col justify-end">
          {/* Dripping Chocolate/Strawberry cream effect */}
          <div className="w-full h-4 bg-rose-300/80 rounded-b-lg flex gap-1 px-1">
            <div className="w-3 h-5 bg-rose-300/80 rounded-b-full -mt-1" />
            <div className="w-4 h-7 bg-rose-300/80 rounded-b-full -mt-1" />
            <div className="w-3 h-4 bg-rose-300/80 rounded-b-full -mt-1" />
            <div className="w-4 h-6 bg-rose-300/80 rounded-b-full -mt-1" />
            <div className="w-3 h-5 bg-rose-300/80 rounded-b-full -mt-1" />
            <div className="w-5 h-8 bg-rose-300/80 rounded-b-full -mt-1" />
            <div className="w-3 h-4 bg-rose-300/80 rounded-b-full -mt-1" />
            <div className="w-4 h-5 bg-rose-300/80 rounded-b-full -mt-1" />
          </div>
          {/* Confetti decorations on bottom layer */}
          <div className="absolute inset-0 p-3 flex flex-wrap gap-3 pointer-events-none justify-center">
            <div className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          </div>
        </div>

        {/* Cake Layer Top */}
        <div className="absolute bottom-18 w-34 h-12 bg-gradient-to-b from-rose-50 to-rose-100 rounded-xl border-b border-rose-200/80 shadow-md z-30 flex flex-col justify-end overflow-hidden">
          {/* Decorative frosting line */}
          <div className="w-full h-2.5 bg-rose-200 rounded-b-md flex gap-1 px-1">
            <div className="w-2.5 h-3.5 bg-rose-200 rounded-b-full" />
            <div className="w-3 h-4.5 bg-rose-200 rounded-b-full" />
            <div className="w-2.5 h-3 bg-rose-200 rounded-b-full" />
            <div className="w-3.5 h-4 bg-rose-200 rounded-b-full" />
            <div className="w-2.5 h-3.5 bg-rose-200 rounded-b-full" />
            <div className="w-3 h-4 bg-rose-200 rounded-b-full" />
          </div>
          {/* Little colorful sprinkles */}
          <div className="absolute inset-0 p-2 flex flex-wrap gap-2 pointer-events-none justify-center">
            <div className="w-1 h-1 bg-yellow-400 rounded-full" />
            <div className="w-1 h-1 bg-pink-400 rounded-full" />
            <div className="w-1 h-1 bg-teal-400 rounded-full" />
          </div>
        </div>

        {/* Strawberries on Top */}
        <div className="absolute bottom-29 w-28 h-5 z-40 flex justify-around px-2">
          <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm flex items-center justify-center relative">
            <div className="w-1 h-1 bg-yellow-200 rounded-full absolute top-1" />
          </div>
          <div className="w-5 h-5 bg-red-500 rounded-full shadow-sm flex items-center justify-center relative -mt-1.5">
            <div className="w-1 h-1 bg-yellow-200 rounded-full absolute top-1.5" />
          </div>
          <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm flex items-center justify-center relative">
            <div className="w-1 h-1 bg-yellow-200 rounded-full absolute top-1" />
          </div>
        </div>

        {/* Tall Elegant Candle */}
        <div className="absolute bottom-30 w-3.5 h-14 bg-gradient-to-r from-violet-300 via-pink-300 to-indigo-300 rounded-md shadow-sm z-40 flex flex-col justify-between overflow-hidden">
          {/* Stripes */}
          <div className="w-full h-1 bg-white/40 -rotate-12 transform" />
          <div className="w-full h-1 bg-white/40 -rotate-12 transform" />
          <div className="w-full h-1 bg-white/40 -rotate-12 transform" />
          <div className="w-full h-1 bg-white/40 -rotate-12 transform" />
        </div>

        {/* Wick */}
        <div className="absolute bottom-44 w-0.5 h-3 bg-neutral-700 z-40" />

        {/* Glowing Flickering Flame */}
        {!isBlown ? (
          <div 
            className="absolute bottom-[187px] w-5 h-8 bg-gradient-to-b from-amber-300 via-orange-400 to-red-500 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.8)] z-50 animate-flicker origin-bottom"
            style={{
              animation: 'flicker 0.15s infinite alternate ease-in-out'
            }}
          />
        ) : (
          /* Smoke Puff when blown */
          <div 
            className="absolute bottom-[187px] w-4 h-8 bg-neutral-400/40 rounded-full blur-sm z-50 animate-smoke"
            style={{
              animation: 'smokeAway 1.8s ease-out forwards'
            }}
          />
        )}
      </div>

      {/* Interactive Button */}
      <button
        onClick={handleBlowCandle}
        disabled={isBlown}
        className={`relative z-20 px-8 py-3 rounded-full text-xs font-bold font-sans tracking-widest uppercase transition-all shadow-md active:scale-97 cursor-pointer border border-white/20 select-none ${
          isBlown 
            ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-rose-500 to-romantic-pink-500 text-white hover:shadow-lg hover:shadow-rose-400/20'
        }`}
      >
        {isBlown ? "Candle Blown! 🎂" : "Blow the Candle 🕯️"}
      </button>

      {/* Cute Wish Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-rose-100 p-6 md:p-8 max-w-sm w-full text-center shadow-2xl relative animate-scaleIn">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-radial-gradient from-romantic-pink-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
            
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 border border-amber-100">
              <Sparkles className="text-amber-500 animate-pulse" size={26} />
            </div>

            <h3 className="font-serif font-semibold text-xl text-neutral-800 mb-2">
              Make a wish, Jagriti ❤️
            </h3>
            
            <p className="font-sans font-light text-neutral-500 text-xs leading-relaxed mb-6">
              Close your eyes, take a sweet breath, and let your heart dream. Today, the stars are listening to everything you wish for! ✨
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-sans font-bold text-[10px] tracking-widest uppercase rounded-full shadow-md hover:shadow-amber-400/20 active:scale-97 cursor-pointer transition-all border border-white/10"
            >
              My Wish is Made 🌠
            </button>
          </div>
        </div>
      )}

      {/* Custom keyframe animations */}
      <style>{`
        @keyframes flicker {
          0% { transform: scale(1) rotate(-1deg); filter: brightness(1); }
          100% { transform: scale(1.1) rotate(1deg); filter: brightness(1.2); }
        }
        @keyframes smokeAway {
          0% { transform: translateY(0) scale(0.6); opacity: 0.8; }
          40% { transform: translateY(-20px) scale(1.2) rotate(15deg); opacity: 0.5; filter: blur(2px); }
          100% { transform: translateY(-45px) scale(0.2) rotate(-15deg); opacity: 0; filter: blur(4px); }
        }
      `}</style>
    </div>
  );
}
