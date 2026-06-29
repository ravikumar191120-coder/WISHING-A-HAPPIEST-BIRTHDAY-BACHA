import React, { useState } from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Reward {
  title: string;
  desc: string;
  color: string;
}

const rewards: Reward[] = [
  { title: "Infinite Hugs 🎫", desc: "Redeemable anytime, anywhere! Fully non-expirable.", color: "#f43f5e" },
  { title: "Coffee Date ☕", desc: "Somu takes you to your favorite cozy cafe, all expenses paid.", color: "#dfb15b" },
  { title: "Late Night Call 📞", desc: "No hanging up first! We talk until you fall asleep peacefully.", color: "#8b5cf6" },
  { title: "Full Authority 👑", desc: "You are the absolute Maalkin for the whole day! Your wish is command.", color: "#06b6d4" },
  { title: "Silly Head Massage 🧸", desc: "Full 30 minutes of absolute relaxation and head pats.", color: "#10b981" },
  { title: "Surprise Gift Box 🎁", desc: "A sweet, custom hand-made chocolate/gift coming your way.", color: "#ec4899" }
];

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<Reward | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  const spinTheWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinResult(null);

    // Generate random full rotations plus specific angle offsets
    const sectorsCount = rewards.length;
    const selectedIndex = Math.floor(Math.random() * sectorsCount);
    
    // Each slice occupies 360 / sectorsCount degrees
    const sectorAngle = 360 / sectorsCount;
    
    // Target angle (clockwise rotation means target is opposite, add offset to center the marker)
    const extraRotations = 5 + Math.floor(Math.random() * 4); // 5 to 8 full spins
    const targetAngle = extraRotations * 360 + (360 - (selectedIndex * sectorAngle) - (sectorAngle / 2));

    setRotationDegrees(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(rewards[selectedIndex]);

      // Sparkle Confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#f43f5e', '#dfb15b', '#ffffff']
      });
    }, 4000); // 4 seconds animation
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="glass-card rounded-3xl p-6 border border-white/60 shadow-xl shadow-rose-200/5 flex flex-col items-center text-center">
        
        <span className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mb-1">
          Spin & Win ❤️
        </span>
        <h3 className="font-serif font-semibold text-xl text-neutral-800 tracking-wide mb-6">
          Jagriti's Fortune Wheel
        </h3>

        {/* Wheel wrapper */}
        <div className="relative w-64 h-64 mb-6">
          
          {/* Outer Ring frame */}
          <div className="absolute inset-0 rounded-full border-4 border-romantic-pink-100 shadow-md pointer-events-none" />

          {/* Indicator Marker */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-6 bg-romantic-pink-500 rounded-b-md shadow-md z-20 flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>

          {/* Canvas or CSS Wheel representation */}
          <div
            style={{
              transform: `rotate(${rotationDegrees}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)' : 'none',
              background: 'white'
            }}
            className="w-full h-full rounded-full overflow-hidden relative shadow-inner flex items-center justify-center border-2 border-white"
          >
            {/* Draw 6 sectors using clip paths */}
            {rewards.map((rew, idx) => {
              const rotation = idx * 60;
              return (
                <div
                  key={idx}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: '50% 50%',
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Visual sector background line separators */}
                  <div className="absolute w-0.5 h-1/2 bg-white/40 left-1/2 top-0 transform -translate-x-1/2 origin-bottom z-10" />

                  {/* Slices representation using colors */}
                  <div
                    style={{
                      transform: 'rotate(30deg)',
                      backgroundColor: rew.color,
                      opacity: 0.15
                    }}
                    className="absolute w-full h-full clip-triangle pointer-events-none"
                  />

                  {/* Sector content labels */}
                  <div 
                    style={{ transform: 'rotate(30deg) translateY(-85px)' }}
                    className="absolute text-[11px] font-sans font-bold text-neutral-700 max-w-[60px] truncate select-none leading-tight"
                  >
                    {rew.title.split(" ")[0]}
                  </div>
                </div>
              );
            })}

            {/* Inner golden ring hub */}
            <div className="absolute w-12 h-12 bg-white rounded-full shadow-md z-10 border-2 border-romantic-gold-200 flex items-center justify-center">
              <Sparkles className="text-romantic-gold-300 animate-spin" size={16} style={{ animationDuration: '8s' }} />
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={spinTheWheel}
          disabled={isSpinning}
          className={`px-8 py-2.5 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-sm ${
            isSpinning 
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200' 
              : 'bg-romantic-pink-500 hover:bg-romantic-pink-600 text-white hover:shadow-md hover:scale-103 active:scale-97 cursor-pointer'
          }`}
        >
          {isSpinning ? 'Good Luck...' : 'Spin the Wheel 🔮'}
        </button>

        {/* Dialog of spin results */}
        <div className="h-20 flex items-center justify-center mt-5 w-full">
          {spinResult ? (
            <div className="animate-scaleIn p-3 rounded-2xl bg-romantic-pink-50/50 border border-romantic-pink-100 max-w-xs">
              <h4 className="font-serif font-bold text-sm text-romantic-pink-500">
                You won: {spinResult.title}
              </h4>
              <p className="font-sans text-[11px] text-neutral-500 mt-1 leading-relaxed">
                {spinResult.desc}
              </p>
            </div>
          ) : (
            <p className="font-sans font-light text-xs text-neutral-400 max-w-xs leading-relaxed italic">
              "No bad luck here. Every reward is a sweet gift for you!"
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
