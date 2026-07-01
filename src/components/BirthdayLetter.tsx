import { useState, useEffect } from 'react';
import { Edit2, Save, Heart, Sparkles } from 'lucide-react';

const DEFAULT_LETTER = `My Dearest Jagriti (My Bacha),

Happy Birthday to the most precious person in my entire universe! ❤️

As you open this letter on your special day, I want you to take a moment to realize how deeply, purely, and infinitely you are loved.

First, I need to talk about tumhari smile. It is literally the eighth wonder of the world. One glimpse of that radiant smile has the power to melt away all my stress, cure my worst days, and light up my entire soul. It is the most beautiful thing I have ever witnessed.

Your beautiful nature—so gentle, so pure, so full of kindness and empathy—is what makes everyone fall in love with you. You care for people with a warmth that is rare in this world. 

Tumne meri life me kya change kiya hai, main use words me fully explain nahi kar sakta. You came into my life and turned it around completely. You filled my world with color, gave me a beautiful purpose, and taught me what real connection feels like. Because of you, I am a better, happier, and more loving human being.

Mujhe tumpar bahut proud feel hota hai. Seeing your dedication, your sweet hard work, and your brilliant mind makes my heart swell with pride. Today, as you step into the beautiful age of 18, a new journey of dreams, maturity, and endless possibilities begins. I am so incredibly proud to stand by your side and watch you grow every day.

For our future wishes, I wish us infinite sunrises and sunsets together, countless sweet coffee dates, and celebrating every single one of your birthdays hand-in-hand. I dream of us building a beautiful world together, and taking on all our paths (especially MBBS together at AIIMS Rishikesh 🏥) side-by-side.

Thank you for existing. Thank you for choosing me. Thank you for tolerating my silliness and loving me with all your heart. 

I wish you a year as beautiful, glowing, and radiant as your soul. Happy Birthday, my sweet child, my babu, my maalkin!

Forever your Somu ❤️`;

export default function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterContent, setLetterContent] = useState(DEFAULT_LETTER);
  const [startSlide, setStartSlide] = useState(false);

  // Load custom saved letter if exists
  useEffect(() => {
    const saved = localStorage.getItem('romantic_birthday_letter');
    if (saved) {
      setLetterContent(saved);
    }
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Slide out letter paper after flap opens (400ms delay)
    setTimeout(() => {
      setStartSlide(true);
    }, 400);
  };

  const handleCloseEnvelope = () => {
    setStartSlide(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

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
      
      {/* 3D Envelope Container with Perspective */}
      <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center perspective-1000">
        
        {/* Closed/Opening Envelope Wrapper */}
        {!startSlide ? (
          <div 
            onClick={handleOpenEnvelope}
            className={`relative w-full h-64 sm:h-72 rounded-2xl bg-gradient-to-tr from-rose-100 to-romantic-pink-200 border border-white/40 shadow-xl flex items-center justify-center p-6 text-center cursor-pointer transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-romantic-pink-200/30 ${
              isOpen ? 'scale-95 opacity-80' : ''
            }`}
          >
            {/* Top Triangular Flap */}
            <div 
              className={`absolute top-0 left-0 w-full h-1/2 border-b border-rose-200/40 bg-gradient-to-b from-rose-100 to-rose-150 rounded-t-2xl transform origin-top transition-transform duration-500 z-30 ${
                isOpen ? 'rotateX-180 pointer-events-none' : ''
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Side Overlapping Flaps */}
            <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none z-20"
              style={{
                clipPath: 'polygon(0 100%, 0 0, 50% 50%)',
                background: 'linear-gradient(to right, rgba(244, 63, 94, 0.05), transparent)'
              }}
            />
            <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none z-20"
              style={{
                clipPath: 'polygon(100% 100%, 100% 0, 50% 50%)',
                background: 'linear-gradient(to left, rgba(244, 63, 94, 0.05), transparent)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-150 to-rose-100 rounded-2xl pointer-events-none z-10"
              style={{
                clipPath: 'polygon(0 100%, 100% 100%, 50% 45%)',
              }}
            />

            {/* Outer Cover Message & Wax Seal */}
            <div className="relative z-40 flex flex-col items-center gap-4 px-4">
              {/* Wax Seal Button */}
              <div className="relative w-16 h-16 rounded-full bg-rose-500 hover:bg-rose-600 shadow-md flex items-center justify-center text-white border-4 border-rose-200/50 animate-pulse transition-transform duration-300 hover:scale-110">
                <Heart fill="currentColor" size={24} className="scale-95" />
              </div>
              
              <div className="space-y-1">
                <h4 className="font-serif italic font-semibold text-base sm:text-lg text-neutral-800 tracking-wide">
                  "Open Only When You're Smiling ❤️"
                </h4>
                <p className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest flex items-center justify-center gap-1">
                  <Sparkles size={9} className="text-romantic-gold-300 animate-spin" /> Tap to open letter
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Opened Unfolding Paper Sheet Container */
          <div className="w-full flex flex-col items-center transition-all duration-700 animate-scaleIn">
            
            {/* Elegant Parchment Letter Card */}
            <div className="w-full glass-card border border-rose-200/40 rounded-3xl shadow-2xl px-6 py-8 md:px-10 md:py-10 relative overflow-hidden bg-white/95 border-t-8 border-t-rose-400">
              
              {/* Floral background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-radial-gradient from-romantic-pink-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-radial-gradient from-romantic-pink-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
              
              {/* Letter Header Title */}
              <div className="flex justify-between items-center border-b border-rose-100 pb-4 mb-6">
                <div>
                  <h3 className="font-cursive text-4xl text-rose-500 leading-none">
                    My Bacha
                  </h3>
                  <p className="text-[9px] font-sans text-neutral-400 uppercase tracking-widest mt-1">
                    Created with infinite love
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 text-xs font-medium font-sans border border-rose-100 transition-all cursor-pointer shadow-sm animate-pulse"
                    >
                      <Edit2 size={13} /> Edit Letter
                    </button>
                  )}
                </div>
              </div>

              {/* Editable/Rendered Letter Area */}
              {isEditing ? (
                <textarea
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  className="w-full h-80 p-4 border border-rose-200 rounded-2xl font-sans text-sm text-neutral-800 leading-relaxed focus:ring-2 focus:ring-rose-300 focus:outline-none bg-rose-50/20"
                />
              ) : (
                <div className="whitespace-pre-wrap font-serif font-light text-neutral-800 text-sm md:text-base leading-relaxed tracking-wide h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {letterContent}
                </div>
              )}

              {/* Smooth Folding Envelope Button */}
              <div className="flex justify-center mt-6 pt-4 border-t border-rose-100/50">
                <button
                  onClick={handleCloseEnvelope}
                  className="px-5 py-2 rounded-full border border-neutral-200 text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 font-sans tracking-wide transition-all cursor-pointer"
                >
                  Close & Fold Envelope
                </button>
              </div>
            </div>
            
          </div>
        )}
      </div>

      {/* Styled custom helper class styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotateX-180 {
          transform: rotateX(180deg);
        }
        /* Custom styled smooth scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbcfe8;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f472b6;
        }
      `}</style>
    </div>
  );
}
