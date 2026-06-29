import React from 'react';
import { Heart, Plane, Sun, Coffee, Calendar, Landmark, Stethoscope } from 'lucide-react';

interface Dream {
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  shadow: string;
}

const dreamsData: Dream[] = [
  {
    icon: Stethoscope,
    title: "MBBS Together",
    subtitle: "AIIMS Rishikesh Dreams",
    description: "Chasing our noble medical ambitions side-by-side at AIIMS Rishikesh, studying together, staying up late for exams, and becoming the most beautiful doctor couple in the world.",
    color: "bg-emerald-50 text-emerald-500 border-emerald-100",
    shadow: "shadow-emerald-100/50"
  },
  {
    icon: Plane,
    title: "World Tour",
    subtitle: "Exploring India & Beyond",
    description: "I hope we quickly go on a world tour right after your MBBS, but before we fly across the globe, I wish to travel and enjoy the beauty of whole India with you, holding hands forever!",
    color: "bg-sky-50 text-sky-500 border-sky-100",
    shadow: "shadow-sky-100/50"
  },
  {
    icon: Sun,
    title: "Warm Sunrise",
    subtitle: "Quiet morning cuddles",
    description: "Waking up early just to witness the fresh golden morning sun hitting your beautiful face, sipping warm tea, and starting each day in perfect peace.",
    color: "bg-amber-50 text-amber-500 border-amber-100",
    shadow: "shadow-amber-100/50"
  },
  {
    icon: Coffee,
    title: "Ice Cream Dates",
    subtitle: "Sweet late-night cold treats",
    description: "Forget standard coffee dates! Sharing cold ice cream cones, teasing each other with melting scoops, laughing at roasting jokes, and talking about our infinite plans under the starlight.",
    color: "bg-rose-50 text-rose-500 border-rose-100",
    shadow: "shadow-rose-100/50"
  },
  {
    icon: Calendar,
    title: "More Birthdays",
    subtitle: "Celebrating forever",
    description: "To a lifetime of blowing birthday candles together, sharing cakes, writing romantic handwritten letters, and keeping our hearts synchronized for eternity.",
    color: "bg-purple-50 text-purple-500 border-purple-100",
    shadow: "shadow-purple-100/50"
  }
];

export default function FutureDreams() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {dreamsData.map((dream, idx) => {
          const Icon = dream.icon;
          return (
            <div
              key={dream.title}
              className="group relative bg-white/70 backdrop-blur-md rounded-2xl border border-neutral-100/60 p-5 shadow-sm hover:shadow-xl hover:scale-103 hover:border-romantic-pink-100/30 transition-all duration-500 flex flex-col justify-between overflow-hidden min-h-[250px]"
            >
              {/* Soft decorative background spot */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-radial-gradient from-romantic-pink-50/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-110 transition-transform" />

              <div>
                {/* Floating Circle Icon */}
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-5 ${dream.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={20} className="stroke-[2px]" />
                </div>

                <span className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 block mb-1">
                  {dream.subtitle}
                </span>
                
                <h4 className="font-serif font-medium text-lg text-neutral-800 group-hover:text-romantic-pink-500 transition-colors">
                  {dream.title}
                </h4>
                
                <p className="font-sans font-light text-xs text-neutral-500 leading-relaxed mt-2.5">
                  {dream.description}
                </p>
              </div>

              {/* Heart signature footer icon */}
              <div className="mt-4 pt-3 border-t border-neutral-50/60 flex items-center justify-end text-romantic-pink-200 group-hover:text-romantic-pink-400 transition-colors">
                <Heart size={12} fill="currentColor" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
