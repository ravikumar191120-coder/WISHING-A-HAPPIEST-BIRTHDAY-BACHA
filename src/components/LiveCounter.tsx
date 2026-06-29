import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Clock, Hourglass } from 'lucide-react';

export default function LiveCounter() {
  // Start date: June 15, 2025
  const START_DATE_MS = new Date('2025-06-15T11:11:00').getTime();

  const [timeElapsed, setTimeElapsed] = useState({
    days: 380,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = now - START_DATE_MS;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeElapsed({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/60 shadow-xl shadow-rose-100/30 flex flex-col items-center relative overflow-hidden">
        {/* Soft backdrop glow */}
        <div className="absolute inset-0 bg-radial-gradient from-romantic-pink-50/10 to-transparent pointer-events-none" />

        <div className="w-12 h-12 rounded-full bg-romantic-pink-50 flex items-center justify-center text-romantic-pink-500 mb-4 shadow-inner relative z-10">
          <Clock className="animate-spin text-romantic-pink-400" size={20} style={{ animationDuration: '10s' }} />
        </div>

        <span className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mb-1 z-10">
          Days since we met ❤️
        </span>
        
        <h3 className="font-serif font-semibold text-2xl text-neutral-800 tracking-wide mb-6 text-center z-10">
          Our Love Counter
        </h3>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-5 w-full z-10">
          {/* Days */}
          <div className="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-white/70 border border-neutral-100/40 shadow-sm">
            <span className="font-serif font-bold text-2xl md:text-3.5xl text-romantic-pink-500 tabular-nums leading-none">
              {timeElapsed.days}
            </span>
            <span className="text-[10px] uppercase font-sans tracking-wider text-neutral-400 mt-2">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-white/70 border border-neutral-100/40 shadow-sm">
            <span className="font-serif font-bold text-2xl md:text-3.5xl text-neutral-700 tabular-nums leading-none">
              {String(timeElapsed.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-sans tracking-wider text-neutral-400 mt-2">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-white/70 border border-neutral-100/40 shadow-sm">
            <span className="font-serif font-bold text-2xl md:text-3.5xl text-neutral-700 tabular-nums leading-none">
              {String(timeElapsed.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-sans tracking-wider text-neutral-400 mt-2">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-white/70 border border-neutral-100/40 shadow-sm">
            <span className="font-serif font-bold text-2xl md:text-3.5xl text-neutral-500 tabular-nums leading-none">
              {String(timeElapsed.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-sans tracking-wider text-neutral-400 mt-2">
              Secs
            </span>
          </div>
        </div>

        {/* Dynamic subtext */}
        <p className="font-sans font-light text-xs text-neutral-500 text-center mt-6 z-10 leading-relaxed max-w-xs">
          “Every single second since June 2025 is a beautiful page added to our fairytale.”
        </p>

        {/* Tiny sweet floating heart marker */}
        <div className="absolute right-4 bottom-4 text-romantic-pink-100 animate-bounce">
          <Heart fill="currentColor" size={16} />
        </div>
      </div>
    </div>
  );
}
