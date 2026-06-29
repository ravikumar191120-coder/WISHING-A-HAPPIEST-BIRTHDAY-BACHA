import React, { useState } from 'react';
import { Sparkles, MessageSquare, Swords, Smile, Volume2, ShieldAlert } from 'lucide-react';

interface FunnyCard {
  id: string;
  emoji: string;
  title: string;
  shortText: string;
  longStory: string;
  icon: any;
  color: string;
}

const funnyData: FunnyCard[] = [
  {
    id: "fight",
    emoji: "🤣",
    title: "First Fight",
    shortText: "Our cute fights, 'Dap Dap' & silliest conflicts...",
    longStory: "Remember our cute fights over silly misunderstandings? Or how you'd playfully hit me 'Dap Dap' like you were beating me up? 🤭 And during your regular periods, when mood swings naturally bring a little conflict, we always end up loving each other even more. It's just us!",
    icon: Swords,
    color: "from-amber-50 to-orange-50 border-orange-100 text-orange-600"
  },
  {
    id: "jealousy",
    emoji: "🙈",
    title: "First Jealousy",
    shortText: "Those cute, angry glances and silence treatment...",
    longStory: "The adorable silent treatment! You tried so hard to hide it, but your cute, pouty face gave it away instantly. Seeing you possessive about me is one of the most heartwarming (and hilariously cute) feelings ever.",
    icon: ShieldAlert,
    color: "from-rose-50 to-pink-50 border-pink-100 text-pink-600"
  },
  {
    id: "calls",
    emoji: "📞",
    title: "Late Night Calls",
    shortText: "Diwali all-nighter, Chhath Puja, and weddings...",
    longStory: "From our unforgettable full-night long call on Diwali, talking until sunrise, to those sweet moments during Chhath Puja, and whispers during your Mama's wedding. Fighting sleep just to hear you breathe is the best feeling ever.",
    icon: Volume2,
    color: "from-purple-50 to-indigo-50 border-indigo-100 text-indigo-600"
  },
  {
    id: "roasting",
    emoji: "😂",
    title: "Random Roasting",
    shortText: "Blaming each other playfully, then falling in love again!",
    longStory: "We are literal experts at roasting each other! The way we start playfully blaming each other for random stuff, but we always end up laughing, solving it, and holding each other closer. Loving you is our favorite sport!",
    icon: Smile,
    color: "from-teal-50 to-emerald-50 border-teal-100 text-teal-600"
  },
  {
    id: "best",
    emoji: "❤️",
    title: "Best Memory",
    shortText: "Our first hug, meeting at Purana Bazar...",
    longStory: "Meeting each other in June 2025 was the best thing ever. Our very first warm hug, exchanging cute surprise gifts, and our favorite conversations together in Purana Bazar. Out of all the favorite things in the universe, you are my absolute favorite!",
    icon: Sparkles,
    color: "from-red-50 to-rose-100 border-rose-200 text-rose-600"
  }
];

export default function FunnyMemories() {
  const [activeStory, setActiveStory] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {funnyData.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => setActiveStory(activeStory === card.id ? null : card.id)}
              className={`relative cursor-pointer rounded-2xl border p-5 bg-gradient-to-b ${card.color} hover:scale-103 transition-all duration-500 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden group min-h-[200px]`}
            >
              {/* Decorative top dot */}
              <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <Icon size={18} />
              </div>

              <div>
                <span className="text-3xl block mb-3 group-hover:animate-bounce">{card.emoji}</span>
                <h4 className="font-serif font-medium text-lg text-neutral-800 mb-1.5">
                  {card.title}
                </h4>
                <p className="font-sans font-light text-xs text-neutral-600 leading-relaxed">
                  {card.shortText}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] font-sans tracking-wide uppercase font-semibold text-neutral-500">
                <span>{activeStory === card.id ? "Close Story" : "Read Story"}</span>
                <span className="text-lg leading-none">→</span>
              </div>

              {/* Absolute content slide-in overlay for the story */}
              <div 
                className={`absolute inset-0 bg-white/98 p-5 flex flex-col justify-between transition-all duration-500 ease-out z-10 ${
                  activeStory === card.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-rose-50">
                    <span className="text-sm">{card.emoji}</span>
                    <span className="font-serif font-semibold text-sm text-neutral-800">{card.title}</span>
                  </div>
                  <p className="font-sans font-light text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    {card.longStory}
                  </p>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStory(null);
                  }}
                  className="text-[10px] text-center font-sans uppercase font-bold tracking-widest text-romantic-pink-500 hover:text-romantic-pink-600 mt-2 cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
