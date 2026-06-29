import React, { useState } from 'react';
import { Heart, Sparkles, Moon, HelpCircle, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseBoxes() {
  const [openSad, setOpenSad] = useState(false);
  const [openNight, setOpenNight] = useState(false);

  const handleOpenSad = () => {
    setOpenSad(!openSad);
    if (!openSad) {
      confetti({
        particleCount: 40,
        spread: 40,
        colors: ['#ffebeb', '#ffd1d8', '#ff6b84']
      });
    }
  };

  const handleOpenNight = () => {
    setOpenNight(!openNight);
    if (!openNight) {
      confetti({
        particleCount: 40,
        spread: 40,
        colors: ['#3b82f6', '#ffd1d8', '#dfb15b']
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Box 1: Open When You're Sad */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/60 shadow-xl shadow-rose-200/5 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
              <Heart fill={openSad ? "currentColor" : "none"} size={18} />
            </div>
            <span className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 font-semibold">
              Open When You're Sad 💌
            </span>
          </div>

          <h3 className="font-serif font-semibold text-xl text-neutral-800 mb-3">
            A Pocket Full of Sunshine
          </h3>
          <p className="font-sans font-light text-xs text-neutral-500 leading-relaxed mb-6">
            If today was a little heavy, or if a tiny cloud is blocking your sunshine, open this little box of warm hugs from Somu.
          </p>
        </div>

        {openSad && (
          <div className="mb-6 p-5 bg-rose-50/40 border border-rose-100 rounded-2xl animate-scaleIn relative">
            <p className="font-cursive text-3xl text-romantic-pink-500 leading-relaxed mb-2.5">
              "Hey my beautiful bacha, stop worrying. You are stronger, smarter, and more loved than you know. Your Somu is always standing right behind you."
            </p>
            <p className="font-sans font-light text-[11px] text-neutral-500 leading-relaxed">
              Whenever you feel down, close your eyes, take a deep breath, and remember that my heart is holding yours. Your gorgeous smile is too precious to be hidden by tears. I'm just a call away!
            </p>
          </div>
        )}

        <button
          onClick={handleOpenSad}
          className="w-full py-2.5 bg-rose-50 hover:bg-rose-100/60 text-romantic-pink-500 font-sans font-bold text-xs tracking-wider uppercase rounded-full transition-all border border-rose-100 cursor-pointer flex items-center justify-center gap-2"
        >
          {openSad ? <><EyeOff size={13} /> Close Box</> : <><Eye size={13} /> Open Message</>}
        </button>
      </div>

      {/* Box 2: Good Night Hidden Note */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/60 shadow-xl shadow-rose-200/5 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shadow-inner">
              <Moon fill={openNight ? "currentColor" : "none"} size={18} />
            </div>
            <span className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 font-semibold">
              Good Night Hidden Note 🌙
            </span>
          </div>

          <h3 className="font-serif font-semibold text-xl text-neutral-800 mb-3">
            Whispers under the Stars
          </h3>
          <p className="font-sans font-light text-xs text-neutral-500 leading-relaxed mb-6">
            A secret, quiet note to read before you drift off to sleep. Let the stars carry this warm hug to you.
          </p>
        </div>

        {openNight && (
          <div className="mb-6 p-5 bg-purple-50/40 border border-purple-100 rounded-2xl animate-scaleIn">
            <p className="font-cursive text-3xl text-purple-600 leading-relaxed mb-2.5">
              "Sleep peacefully, my darling. May your dreams be filled with soft starlight, medical coats, sunrises, and lots of cake."
            </p>
            <p className="font-sans font-light text-[11px] text-neutral-500 leading-relaxed">
              I pray that your sleep is sweet, deep, and peaceful. Close those beautiful eyes of yours, let go of all your stresses, and know that you are the last thing on my mind before I sleep, and the first when I wake up.
            </p>
          </div>
        )}

        <button
          onClick={handleOpenNight}
          className="w-full py-2.5 bg-purple-50 hover:bg-purple-100/60 text-purple-500 font-sans font-bold text-xs tracking-wider uppercase rounded-full transition-all border border-purple-100 cursor-pointer flex items-center justify-center gap-2"
        >
          {openNight ? <><EyeOff size={13} /> Hide Note</> : <><Eye size={13} /> Read Note</>}
        </button>
      </div>

    </div>
  );
}
