import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface UniverseCard {
  emoji: string;
  text: string;
  gradient: string;
}

const CARDS: UniverseCard[] = [
  {
    emoji: "🩺",
    text: "If we were doctors... I'd still choose you.",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent"
  },
  {
    emoji: "🌧️",
    text: "If we met on a rainy day... I'd still walk beside you.",
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent"
  },
  {
    emoji: "🌌",
    text: "If there were a thousand universes... I'd still search for you.",
    gradient: "from-indigo-500/10 via-indigo-500/5 to-transparent"
  },
  {
    emoji: "🎂",
    text: "And in this universe... I'm grateful I get to celebrate your birthday.",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent"
  },
  {
    emoji: "❤️",
    text: "No matter where life takes us... You'll always have a special place in my heart.",
    gradient: "from-pink-500/10 via-pink-500/5 to-transparent"
  },
  {
    emoji: "✨",
    text: "Some stories are written by fate... Ours became my favorite.",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent"
  }
];

export default function ParallelUniverse() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      {/* Scroll indicator for mobile */}
      <div className="flex justify-center items-center gap-2 mb-6 text-[10px] font-sans font-medium text-neutral-400 uppercase tracking-widest sm:hidden animate-pulse">
        <span>Swipe Left / Right</span>
        <Sparkles size={11} className="text-romantic-gold-300" />
      </div>

      {/* Horizontal Scroll Snapping Container */}
      <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 px-6 pb-6 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-x-visible md:snap-none">
        {CARDS.map((card, idx) => (
          <div
            key={idx}
            className={`flex-none w-[280px] sm:w-[320px] md:w-full snap-center rounded-3xl p-8 bg-white/40 border border-white/60 shadow-lg relative overflow-hidden flex flex-col justify-between aspect-[4/3] group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 backdrop-blur-md`}
          >
            {/* Visual glow gradient depending on theme */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${card.gradient} opacity-80 pointer-events-none group-hover:scale-105 transition-transform duration-500`} />
            
            {/* Decorative soft card accents */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-bl-full pointer-events-none" />

            {/* Emoji circle */}
            <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center text-2xl shadow-sm z-10 select-none group-hover:rotate-12 transition-transform">
              {card.emoji}
            </div>

            {/* Beautiful, emotional text statement */}
            <p className="font-serif italic text-sm sm:text-base text-neutral-800 leading-relaxed z-10 tracking-wide mt-6">
              "{card.text}"
            </p>

            {/* Little aesthetic badge indicator */}
            <div className="flex justify-between items-center mt-4 border-t border-rose-100/30 pt-3 z-10">
              <span className="font-sans font-light text-[9px] uppercase tracking-widest text-neutral-400">
                Universe #{idx + 1}
              </span>
              <Heart size={10} fill="#f43f5e" className="text-rose-500 opacity-60 group-hover:scale-125 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Scrollbar-hide styles for full portability */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}
