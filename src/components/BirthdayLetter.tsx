import { useState, useEffect } from 'react';
import { Edit2, Save, Heart, Sparkles } from 'lucide-react';

const DEFAULT_LETTER = `My Dearest Jagriti (My Bacha),

Happy Birthday to the most precious person in my entire universe! ❤️

As you open this letter on your special day, I want you to take a moment to realize how deeply, purely, and infinitely you are loved.

First, I need to talk about tumhari smile. It is literally the eighth wonder of the world. One glimpse of that radiant smile has the power to melt away all my stress, cure my worst days, and light up my entire soul. It is the most beautiful thing I have ever witnessed.

Your beautiful nature—so gentle, so pure, so full of kindness and empathy—is what makes everyone fall in love with you. You care for people with a warmth that is rare in this world. 

Tumne meri life me kya change kiya hai, main use words me fully explain nahi kar sakta. You came into my life and turned it around completely. You filled my world with color, gave me a beautiful purpose, and taught me what real connection feels like. Because of you, I am a better, happier, and more loving human being.

Mujhe tumpar bahut proud feel hota hai. Seeing your dedication, your sweet hard work, and your brilliant mind makes my heart swell with pride. I am so incredibly proud to stand by your side and watch you grow every day.

For our future wishes, I wish us infinite sunrises and sunsets together, countless sweet coffee dates, and celebrating every single one of your birthdays hand-in-hand. I dream of us building a beautiful world together, and taking on all our paths (especially MBBS together at AIIMS Rishikesh 🏥) side-by-side.

Thank you for existing. Thank you for choosing me. Thank you for tolerating my silliness and loving me with all your heart. 

I wish you a year as beautiful, glowing, and radiant as your soul. Happy Birthday, my sweet child, my babu, my maalkin!

Forever your Somu ❤️`;

export default function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterContent, setLetterContent] = useState(DEFAULT_LETTER);

  // Load custom saved letter if exists
  useEffect(() => {
    const saved = localStorage.getItem('romantic_birthday_letter');
    if (saved) {
      setLetterContent(saved);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('romantic_birthday_letter', letterContent);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (window.confirm('Do you want to restore the default romantic letter?')) {
      setLetterContent(DEFAULT_LETTER);
      localStorage.removeItem('romantic_birthday_letter');
      setIsEditing(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto py-12 px-4 flex flex-col items-center">
      
      {/* Outer Envelope Wrapper */}
      <div className="relative w-full aspect-[4/3] max-w-lg flex items-center justify-center">
        
        {/* Envelope Back & Flap Container */}
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full h-56 rounded-2xl bg-gradient-to-tr from-romantic-pink-100 to-romantic-pink-200 shadow-xl border border-white/50 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:scale-103 hover:shadow-2xl hover:shadow-romantic-pink-300/20 active:scale-98 transition-all duration-500 relative group overflow-hidden"
          >
            {/* Soft decorative background glow */}
            <div className="absolute inset-0 bg-radial-gradient from-white/30 to-transparent pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Wax Seal Circle */}
              <div className="relative w-16 h-16 rounded-full bg-romantic-pink-500 hover:bg-romantic-pink-600 shadow-lg flex items-center justify-center text-white border-4 border-romantic-pink-200/40 animate-pulse group-hover:animate-none group-hover:scale-110 transition-all duration-300">
                <Heart fill="currentColor" size={24} className="scale-95 group-hover:scale-105 transition-transform" />
              </div>
              
              <h4 className="font-serif italic font-semibold text-xl text-neutral-800 mt-4 tracking-wide">
                You have a letter from Somu
              </h4>
              <p className="font-sans text-[11px] text-neutral-600 uppercase tracking-widest mt-1.5 flex items-center gap-1">
                <Sparkles size={10} className="text-romantic-gold-300 animate-spin" /> Click to Break the Seal
              </p>
            </div>
            
            {/* Envelope line decorations */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 border-t border-romantic-pink-300/30 bg-white/10 pointer-events-none skew-y-6 transform origin-bottom-left" />
            <div className="absolute bottom-0 right-0 w-full h-1/2 border-t border-romantic-pink-300/30 bg-white/10 pointer-events-none -skew-y-6 transform origin-bottom-right" />
          </button>
        ) : (
          /* Opened Envelope and Letter Sheet */
          <div className="w-full flex flex-col items-center transition-all duration-1000 animate-fadeIn">
            
            {/* Letter Sheet Card */}
            <div className="w-full glass-card border border-romantic-pink-200/40 rounded-2xl shadow-2xl px-6 py-8 md:px-10 md:py-10 relative overflow-hidden bg-white/95 border-t-4 border-t-romantic-pink-300">
              
              {/* Floral corner decor */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-radial-gradient from-romantic-pink-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-radial-gradient from-romantic-pink-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
              
              {/* Letter Title Block */}
              <div className="flex justify-between items-center border-b border-romantic-pink-100 pb-4 mb-6">
                <div>
                  <h3 className="font-cursive text-4xl text-romantic-pink-500 leading-none">
                    My Bacha
                  </h3>
                  <p className="text-[10px] font-sans text-neutral-500 uppercase tracking-widest mt-1">
                    Created with love • Persistent
                  </p>
                </div>
                
                {/* Editing Tools */}
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-medium font-sans border border-emerald-100 transition-all cursor-pointer shadow-sm"
                      >
                        <Save size={13} /> Save
                      </button>
                      <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 text-xs font-medium font-sans border border-neutral-200 transition-all cursor-pointer"
                      >
                        Reset
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-romantic-pink-50 text-romantic-pink-500 hover:bg-romantic-pink-100 text-xs font-medium font-sans border border-romantic-pink-100 transition-all cursor-pointer shadow-sm"
                    >
                      <Edit2 size={13} /> Edit Letter
                    </button>
                  )}
                </div>
              </div>

              {/* Letter Content Area */}
              {isEditing ? (
                <textarea
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  className="w-full h-80 p-4 border border-romantic-pink-200 rounded-xl font-sans text-sm text-neutral-800 leading-relaxed focus:ring-2 focus:ring-romantic-pink-300 focus:outline-none bg-romantic-pink-50/20"
                />
              ) : (
                <div className="whitespace-pre-wrap font-serif font-light text-neutral-800 text-sm md:text-base leading-relaxed tracking-wide h-[420px] overflow-y-auto pr-2">
                  {letterContent}
                </div>
              )}

              {/* Close Letter Button */}
              <div className="flex justify-center mt-6 pt-4 border-t border-romantic-pink-50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-full border border-neutral-200 text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 font-sans tracking-wide transition-all cursor-pointer"
                >
                  Close & Fold Envelope
                </button>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
