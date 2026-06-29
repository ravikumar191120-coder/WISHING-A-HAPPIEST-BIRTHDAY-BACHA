import React, { useState } from 'react';
import { Heart, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveMeter() {
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const calculateLove = () => {
    if (loading) return;
    setLoading(true);
    setLevel(null);
    setStatusMessage("Connecting to Jagriti's heartwaves...");

    const messages = [
      "Connecting to Jagriti's heartwaves...",
      "Measuring smile frequencies... 💖",
      "Scanning late-night voice notes... 📞",
      "Analyzing cute jealousy tantrums... 🙈",
      "Calculating MBBS joint dreams... 🏥",
      "Love index overflowing... 📈",
      "Limit exceeded!"
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setStatusMessage(messages[i]);
        i++;
      } else {
        clearInterval(interval);
        setLoading(false);
        setLevel("9999999999%");
        setStatusMessage("Unmeasurable & Infinite!");
        
        // Blow confetti
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#f43f5e', '#fdb6c6', '#fbbf24']
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#f43f5e', '#fdb6c6', '#fbbf24']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      }
    }, 850);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/60 shadow-xl shadow-rose-200/5 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-radial-gradient from-romantic-pink-100/10 to-transparent pointer-events-none" />

        <div className="mx-auto w-12 h-12 rounded-full bg-romantic-pink-50 flex items-center justify-center text-romantic-pink-500 mb-4 shadow-inner relative z-10">
          <Heart fill={level ? "currentColor" : "none"} className={`text-romantic-pink-400 ${loading ? 'animate-pulse scale-110' : ''}`} size={22} />
        </div>

        <span className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mb-1 z-10">
          Infinity Test ❤️
        </span>
        
        <h3 className="font-serif font-semibold text-xl text-neutral-800 tracking-wide mb-5 z-10">
          Somnath Love Meter
        </h3>

        {/* Display Score / Loader */}
        <div className="h-32 flex flex-col items-center justify-center w-full z-10 mb-4">
          {loading ? (
            <div className="flex flex-col items-center gap-3 animate-pulse">
              <Loader2 className="animate-spin text-romantic-pink-500" size={24} />
              <span className="text-xs font-sans text-neutral-500 italic max-w-[200px]">
                {statusMessage}
              </span>
            </div>
          ) : level ? (
            <div className="flex flex-col items-center animate-scaleIn">
              <span className="font-serif font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-romantic-pink-500 via-rose-500 to-romantic-gold-300 drop-shadow-sm tracking-tight leading-none">
                {level}
              </span>
              <span className="text-xs font-sans font-medium text-emerald-500 mt-3 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <Sparkles size={11} className="animate-pulse" /> {statusMessage}
              </span>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-sans font-light text-xs text-neutral-400 leading-relaxed max-w-[200px] mx-auto">
                Ready to measure the amount of love Somnath holds for Jagriti?
              </p>
            </div>
          )}
        </div>

        {/* Meter Button */}
        <button
          onClick={calculateLove}
          disabled={loading}
          className={`w-full py-3 rounded-full font-sans font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-md ${
            loading 
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none border border-neutral-200' 
              : 'bg-romantic-pink-500 hover:bg-romantic-pink-600 text-white hover:shadow-lg hover:scale-103 active:scale-97 cursor-pointer'
          }`}
        >
          {loading ? 'Measuring...' : 'Click Me ❤️'}
        </button>

      </div>
    </div>
  );
}
