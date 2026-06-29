import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Mail, MailOpen, Gift, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FallingHeart {
  id: number;
  x: number; // percentage width
  y: number; // percentage height
  speed: number;
  size: number;
  opacity: number;
}

export default function CatchHeartsGame() {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heartIdCounter = useRef(0);
  const gameLoopRef = useRef<number | null>(null);

  // Start the game
  const startGame = () => {
    setScore(0);
    setGameWon(false);
    setShowGiftModal(false);
    setEnvelopeOpen(false);
    setHearts([]);
    setIsPlaying(true);
  };

  // Add a new heart
  const spawnHeart = () => {
    if (!isPlaying || gameWon) return;
    const newHeart: FallingHeart = {
      id: heartIdCounter.current++,
      x: Math.random() * 85 + 5, // random horizontal spot
      y: -10, // start above
      speed: Math.random() * 1.5 + 1.2, // falling speed
      size: Math.random() * 16 + 18, // random pixel size
      opacity: Math.random() * 0.4 + 0.6
    };
    setHearts((prev) => [...prev, newHeart]);
  };

  // Game tick to update falling hearts
  useEffect(() => {
    if (!isPlaying || gameWon) {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    const updateHearts = () => {
      setHearts((prev) => {
        // Filter out hearts that fall past 100% height
        const updated = prev.map((h) => ({
          ...h,
          y: h.y + h.speed
        })).filter((h) => h.y < 105);
        return updated;
      });

      gameLoopRef.current = requestAnimationFrame(updateHearts);
    };

    gameLoopRef.current = requestAnimationFrame(updateHearts);

    // Periodically spawn new hearts
    const spawner = setInterval(spawnHeart, 700);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      clearInterval(spawner);
    };
  }, [isPlaying, gameWon]);

  // Handle clicking on a falling heart
  const catchHeart = (id: number) => {
    if (gameWon) return;

    // Pop animation sound/effect can go here
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore >= 20) {
        // Trigger winning state
        setGameWon(true);
        setIsPlaying(false);
        // Fire celebration confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fdb6c6', '#fbbf24', '#ffffff']
        });
      }
      return newScore;
    });
  };

  // Open the secret envelope
  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    // Extra mini spark burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#f43f5e', '#fbbf24']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#f43f5e', '#fbbf24']
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      
      {/* Game Card Panel */}
      <div className="relative rounded-3xl glass-card border border-white/60 p-6 shadow-xl shadow-rose-200/5 overflow-hidden flex flex-col items-center">
        
        {/* Game Stats Header */}
        <div className="w-full flex justify-between items-center mb-4 z-10 border-b border-rose-100/40 pb-3">
          <span className="font-serif italic text-sm text-neutral-800">
            Jagriti's Heart Catch Game
          </span>
          <div className="px-3 py-1 bg-romantic-pink-100/60 rounded-full font-sans font-bold text-xs text-romantic-pink-500 flex items-center gap-1">
            <Heart size={12} fill="currentColor" className="animate-pulse" /> Collected: {score} / 20
          </div>
        </div>

        {/* Playable Stage Area */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-[4/3] bg-gradient-to-b from-rose-50/10 to-pink-50/30 rounded-2xl border border-rose-100/20 overflow-hidden flex items-center justify-center bg-white/40"
        >
          {/* Welcome Screen */}
          {!isPlaying && !gameWon && (
            <div className="text-center p-6 flex flex-col items-center max-w-sm z-10">
              <div className="w-14 h-14 rounded-full bg-romantic-pink-50 flex items-center justify-center text-romantic-pink-500 mb-4 animate-bounce">
                <Heart fill="currentColor" size={26} />
              </div>
              <h3 className="font-serif font-semibold text-lg text-neutral-800 mb-2">
                Catch Jagriti's Hearts!
              </h3>
              <p className="font-sans font-light text-xs text-neutral-500 leading-relaxed mb-5">
                Lovely red hearts are going to fall from the sky. Tap or click on them to catch them. Collect 20 to unlock my secret gift for you!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-romantic-pink-500 hover:bg-romantic-pink-600 text-white rounded-full font-sans font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-103 active:scale-97 transition-all cursor-pointer"
              >
                Start Game ❤️
              </button>
            </div>
          )}

          {/* Active Hearts Falling */}
          {isPlaying && !gameWon && (
            <>
              {hearts.length === 0 && (
                <p className="text-[11px] font-sans text-neutral-400 tracking-wider animate-pulse uppercase">
                  Prepare to catch...
                </p>
              )}
              {hearts.map((h) => (
                <button
                  key={h.id}
                  onClick={() => catchHeart(h.id)}
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                    width: `${h.size}px`,
                    height: `${h.size}px`,
                    opacity: h.opacity
                  }}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 text-romantic-pink-500 hover:scale-125 hover:text-romantic-pink-600 active:scale-90 transition-transform duration-100 focus:outline-none"
                  aria-label="Catch heart"
                >
                  <Heart fill="currentColor" className="w-full h-full drop-shadow-sm animate-pulse" />
                </button>
              ))}
            </>
          )}

          {/* Game Won Celebration Page */}
          {gameWon && (
            <div className="text-center p-6 flex flex-col items-center max-w-sm z-10 animate-scaleIn">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4 animate-pulse">
                <Sparkles size={26} />
              </div>
              <h3 className="font-serif font-bold text-xl text-neutral-800 mb-2">
                Congratulations Cutiee ❤️
              </h3>
              <p className="font-sans font-medium text-sm text-romantic-pink-500 mb-4 leading-relaxed">
                You successfully unlocked Somu's Secret!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowGiftModal(true)}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-romantic-gold-300 hover:bg-romantic-gold-200 text-neutral-900 border border-romantic-gold-100 rounded-full font-sans font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-103 active:scale-97 transition-all cursor-pointer"
                >
                  <Gift size={14} /> 👉 Open Gift
                </button>
                <button
                  onClick={startGame}
                  className="p-2.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-500 transition-colors cursor-pointer"
                  title="Play Again"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= SECRET GIFT ENVELOPE MODAL ================= */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-md p-4 animate-fadeIn">
          
          <div className="relative w-full max-w-md bg-white/95 rounded-3xl p-6 md:p-8 border border-romantic-pink-100 shadow-2xl flex flex-col items-center">
            
            {/* Header decor */}
            <div className="w-10 h-1 bg-romantic-pink-300/30 rounded-full mb-6" />

            {!envelopeOpen ? (
              /* Sealed Envelope View */
              <div className="text-center flex flex-col items-center w-full">
                <div className="relative w-28 h-20 bg-romantic-pink-100/60 rounded-xl border border-romantic-pink-200/40 flex items-center justify-center shadow-lg group hover:scale-103 transition-transform duration-500">
                  <Mail size={44} className="text-romantic-pink-400 group-hover:scale-105 transition-transform" />
                  {/* Glowing wax seal */}
                  <div className="absolute -bottom-2 w-7 h-7 rounded-full bg-romantic-pink-500 border-2 border-white flex items-center justify-center text-white shadow-md animate-pulse">
                    <Heart fill="currentColor" size={10} />
                  </div>
                </div>

                <h3 className="font-serif font-semibold text-xl text-neutral-800 mt-6 mb-2">
                  Somu's Secret Message
                </h3>
                <p className="font-sans font-light text-xs text-neutral-500 max-w-xs leading-relaxed mb-6">
                  This envelope contains a secret note that only you can read. Open it whenever you need a reminder of how much you mean to me.
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleOpenEnvelope}
                    className="flex-1 flex items-center justify-center gap-1.5 px-6 py-3 bg-romantic-pink-500 hover:bg-romantic-pink-600 text-white rounded-full font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
                  >
                    <MailOpen size={14} /> Open Secret Note
                  </button>
                  <button
                    onClick={() => setShowGiftModal(false)}
                    className="px-5 py-3 border border-neutral-200 text-neutral-500 hover:bg-neutral-50 text-xs font-sans font-medium rounded-full transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Opened Envelope Content View */
              <div className="text-center flex flex-col items-center w-full animate-scaleIn">
                <div className="w-14 h-14 rounded-full bg-romantic-pink-50 flex items-center justify-center text-romantic-pink-500 mb-4 animate-bounce">
                  <Heart fill="currentColor" size={24} />
                </div>

                <span className="text-[10px] uppercase font-sans tracking-widest text-romantic-gold-300 font-semibold mb-1">
                  For My Jagriti
                </span>
                
                <h3 className="font-serif font-semibold text-lg text-neutral-800 mb-4">
                  The True Gift
                </h3>

                {/* Hand-written card letter content */}
                <div className="w-full bg-romantic-gold-50/55 rounded-2xl p-6 border border-romantic-gold-100 shadow-inner mb-6 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-20 h-20 bg-radial-gradient from-romantic-gold-200/20 to-transparent rounded-full blur-xl pointer-events-none" />
                  
                  <p className="font-cursive text-3xl text-romantic-pink-500 leading-relaxed mb-2">
                    "No expensive gift can ever match what your smile gives me every day."
                  </p>
                  
                  <div className="w-8 h-0.5 bg-romantic-pink-300/30 mx-auto my-3" />
                  
                  <p className="font-sans font-light text-[11px] text-neutral-500 leading-relaxed">
                    Money can buy luxuries, but it cannot buy the peace your voice brings, the safe haven your embrace is, or the absolute joy in seeing you smile. You are my priceless treasure.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowGiftModal(false);
                    setEnvelopeOpen(false);
                  }}
                  className="w-full py-2.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-500 font-sans text-xs font-semibold rounded-full tracking-wider uppercase transition-all cursor-pointer"
                >
                  Keep It Close to Heart ❤️
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
