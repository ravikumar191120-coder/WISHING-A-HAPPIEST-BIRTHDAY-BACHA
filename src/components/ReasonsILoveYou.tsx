import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

interface Reason {
  title: string;
  emoji: string;
  description: string;
  gradient: string;
}

const reasons: Reason[] = [
  {
    title: "Your Smile",
    emoji: "❤️",
    description: "Your smile is my ultimate sunshine. It has this magical power to turn my worst days into pure happiness and warm my heart instantly.",
    gradient: "from-rose-100 to-pink-100"
  },
  {
    title: "Your Care",
    emoji: "❤️",
    description: "The way you look after me and worry about my small things. Your gentle care makes me feel like the luckiest person in the entire world.",
    gradient: "from-pink-100 to-lavender-100"
  },
  {
    title: "Your Anger",
    emoji: "❤️",
    description: "Even when you get angry or throw cute little tantrums, you look incredibly adorable. Your sweet anger is just another form of your pure love.",
    gradient: "from-rose-50 to-pink-150"
  },
  {
    title: "Your Cute Voice",
    emoji: "❤️",
    description: "Hearing your sweet, lovely voice is like listening to my favorite melody. It calms my mind and brings an instant smile to my face.",
    gradient: "from-lavender-100 to-pink-100"
  },
  {
    title: "Your Dreams",
    emoji: "❤️",
    description: "Your passion, ambition, and big dreams (like our MBBS journey 🏥). Your dedication inspires me and makes me fall for you more and more every single day.",
    gradient: "from-rose-100 to-amber-50"
  },
  {
    title: "The Way You Call Me",
    emoji: "❤️",
    description: "When you say my name or call me with those sweet, adorable nicknames. It rings in my ears like a sweet song that I never want to stop playing.",
    gradient: "from-pink-100 to-fuchsia-50"
  },
  {
    title: "Everything About You",
    emoji: "❤️",
    description: "From your gorgeous eyes to your silly habits, your beautiful soul, your habits, and your voice. I love every single flaw and perfection. You are my absolute world.",
    gradient: "from-rose-100 to-rose-200"
  }
];

export default function ReasonsILoveYou() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reasons.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === reasons.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 relative">
      <div className="relative min-h-[420px] sm:min-h-0 sm:aspect-[4/3] w-full rounded-3xl glass-card overflow-hidden p-6 md:p-8 flex flex-col justify-between border border-white/60 shadow-xl shadow-rose-200/5 transition-all duration-500">
        
        {/* Top bar with dots */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] uppercase font-sans tracking-widest text-romantic-pink-500/80 font-semibold flex items-center gap-1">
            <Sparkles size={10} className="animate-pulse" /> Reason {currentIndex + 1} of {reasons.length}
          </span>
          <div className="flex gap-1.5">
            {reasons.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-romantic-pink-500 w-3' : 'bg-romantic-pink-200/60'
                }`}
                aria-label={`Go to reason ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col justify-center text-center px-2 py-4 animate-fadeIn">
          {/* Heart icon badge */}
          <div className="mx-auto w-12 h-12 rounded-full bg-romantic-pink-50 flex items-center justify-center text-romantic-pink-500 mb-4 shadow-inner">
            <Heart fill="currentColor" size={20} className="animate-pulse text-romantic-pink-400" />
          </div>

          <h3 className="font-serif font-semibold text-2xl text-neutral-800 tracking-wide mb-3">
            {reasons[currentIndex].title}
          </h3>
          
          <p className="font-sans font-light text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
            {reasons[currentIndex].description}
          </p>
        </div>

        {/* Navigation row */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-romantic-pink-100/40">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 border border-romantic-pink-100 text-romantic-pink-500 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous reason"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="text-romantic-pink-400 font-cursive text-3xl">
            For Jagriti
          </span>

          <button
            onClick={nextSlide}
            className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 border border-romantic-pink-100 text-romantic-pink-500 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next reason"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
