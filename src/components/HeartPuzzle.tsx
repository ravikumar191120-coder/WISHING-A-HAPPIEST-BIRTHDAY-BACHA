import React, { useState, useEffect } from 'react';
import { Eye, Check, RefreshCw, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeartPuzzleProps {
  onComplete: () => void;
}

interface PuzzlePiece {
  id: number;          // Original position index (0 to 8)
  currentIndex: number; // Current slot index on the board (0 to 8)
}

export default function HeartPuzzle({ onComplete }: HeartPuzzleProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  // Initialize and shuffle pieces on mount
  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    let initial: PuzzlePiece[] = Array.from({ length: 9 }).map((_, idx) => ({
      id: idx,
      currentIndex: idx,
    }));

    // Shuffle using Fisher-Yates but make sure it's not already solved
    let solved = true;
    while (solved) {
      for (let i = initial.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = initial[i].currentIndex;
        initial[i].currentIndex = initial[j].currentIndex;
        initial[j].currentIndex = temp;
      }
      
      // Check if it's accidentally solved
      solved = initial.every((p) => p.id === p.currentIndex);
    }

    setPieces(initial);
    setSelectedPieceIndex(null);
    setIsSolved(false);
  };

  const handleSwap = (indexA: number, indexB: number) => {
    const updatedPieces = [...pieces];
    
    // Find the piece currently in slot A and the piece in slot B
    const pieceA = updatedPieces.find((p) => p.currentIndex === indexA);
    const pieceB = updatedPieces.find((p) => p.currentIndex === indexB);

    if (pieceA && pieceB) {
      pieceA.currentIndex = indexB;
      pieceB.currentIndex = indexA;
    }

    setPieces(updatedPieces);
    setSelectedPieceIndex(null);

    // Check if solved
    const solved = updatedPieces.every((p) => p.id === p.currentIndex);
    if (solved) {
      setIsSolved(true);
      triggerSuccessEffects();
    }
  };

  const triggerSuccessEffects = () => {
    // Elegant gold and rose confetti explosion
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#be123c', '#fbbf24', '#ffffff']
    });
  };

  // Click handler to support tap to swap (best for touch/mobiles)
  const handlePieceClick = (slotIndex: number) => {
    if (isSolved) return;

    if (selectedPieceIndex === null) {
      setSelectedPieceIndex(slotIndex);
    } else {
      if (selectedPieceIndex === slotIndex) {
        setSelectedPieceIndex(null); // Unselect if clicked again
      } else {
        handleSwap(selectedPieceIndex, slotIndex);
      }
    }
  };

  // Drag and Drop support
  const handleDragStart = (e: React.DragEvent, slotIndex: number) => {
    if (isSolved) return;
    e.dataTransfer.setData('text/plain', slotIndex.toString());
  };

  const handleDrop = (e: React.DragEvent, targetSlotIndex: number) => {
    if (isSolved) return;
    const sourceSlotIndexStr = e.dataTransfer.getData('text/plain');
    if (sourceSlotIndexStr) {
      const sourceSlotIndex = parseInt(sourceSlotIndexStr, 10);
      if (sourceSlotIndex !== targetSlotIndex) {
        handleSwap(sourceSlotIndex, targetSlotIndex);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Helper to render the shared SVG illustration
  const renderSVGContent = () => (
    <>
      {/* Background soft gradient and rect */}
      <rect width="300" height="300" fill="#fff1f2"/>
      
      {/* Radiant glow in the center */}
      <circle cx="150" cy="150" r="125" fill="url(#puzGlow)" opacity="0.45"/>
      
      <defs>
        <radialGradient id="puzGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="1"/>
          <stop offset="100%" stopColor="#fff1f2" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="puzHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e"/>
          <stop offset="100%" stopColor="#be123c"/>
        </linearGradient>
      </defs>

      {/* Large Glowing Heart */}
      <path d="M 150 220 C 100 185, 55 135, 55 95 A 42 42 0 0 1 139 60 A 15 15 0 0 1 150 68 A 15 15 0 0 1 161 60 A 42 42 0 0 1 245 95 C 245 135, 200 185, 150 220 Z" fill="url(#puzHeartGrad)" filter="drop-shadow(0 0 8px rgba(244,63,94,0.4))"/>
      
      {/* Roses around bottom corners of the heart */}
      <g transform="translate(70, 185)">
        <circle cx="0" cy="0" r="11" fill="#be123c" />
        <circle cx="0" cy="0" r="8" fill="#e11d48" />
        <circle cx="0" cy="0" r="5" fill="#f43f5e" />
        <path d="M -11 0 Q -5 -15 0 -11" stroke="#fda4af" strokeWidth="1.5" fill="none" />
      </g>
      <g transform="translate(230, 185)">
        <circle cx="0" cy="0" r="11" fill="#be123c" />
        <circle cx="0" cy="0" r="8" fill="#e11d48" />
        <circle cx="0" cy="0" r="5" fill="#f43f5e" />
        <path d="M 11 0 Q 5 -15 0 -11" stroke="#fda4af" strokeWidth="1.5" fill="none" />
      </g>
      
      {/* Tiny sparkly yellow stars */}
      <path d="M 45,55 L 48,60 L 53,60 L 49,64 L 51,69 L 45,66 L 39,69 L 41,64 L 37,60 L 42,60 Z" fill="#fbbf24" />
      <path d="M 255,55 L 258,60 L 263,60 L 259,64 L 261,69 L 255,66 L 249,69 L 251,64 L 247,60 L 252,60 Z" fill="#fbbf24" />
      <path d="M 150,30 L 152,34 L 157,34 L 153,37 L 155,42 L 150,39 L 145,42 L 147,37 L 143,34 L 148,34 Z" fill="#fbbf24" />

      {/* Miniature Sparkly dots */}
      <circle cx="100" cy="110" r="2.5" fill="#fda4af" className="animate-pulse" />
      <circle cx="200" cy="110" r="2.5" fill="#fda4af" />
      <circle cx="150" cy="100" r="3" fill="#ffffff" />
      <circle cx="85" cy="65" r="2" fill="#fbbf24" />
      <circle cx="215" cy="65" r="2" fill="#fbbf24" />

      {/* Birthday Cake in front of Heart */}
      <g transform="translate(115, 135)">
        {/* Layer 1 */}
        <rect x="0" y="20" width="70" height="30" rx="3" fill="#fbcfe8" stroke="#be123c" strokeWidth="1" />
        <path d="M 0 30 Q 8 36 17 30 T 35 30 T 52 30 T 70 30" fill="none" stroke="#f472b6" strokeWidth="2" />
        {/* Layer 2 */}
        <rect x="10" y="5" width="50" height="15" rx="2" fill="#f472b6" stroke="#be123c" strokeWidth="1" />
        <circle cx="20" cy="12" r="3" fill="#fff" />
        <circle cx="35" cy="12" r="3" fill="#fff" />
        <circle cx="50" cy="12" r="3" fill="#fff" />
        {/* Candle */}
        <line x1="35" y1="5" x2="35" y2="-5" stroke="#f59e0b" strokeWidth="2.5" />
        <path d="M 35 -5 Q 38 -12 35 -15" fill="#fbbf24" />
      </g>

      {/* Helium Balloons floating in background */}
      {/* Balloon Left */}
      <g transform="translate(45, 120)">
        <ellipse cx="0" cy="0" rx="14" ry="18" fill="#38bdf8" opacity="0.8" />
        <path d="M -3 -8 A 8 10 0 0 1 5 -12" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
        <path d="M 0 18 L -3 21 L 3 21 Z" fill="#38bdf8" />
        <path d="M 0 21 Q -5 35 5 50" fill="none" stroke="#94a3b8" strokeWidth="1" />
      </g>
      {/* Balloon Right */}
      <g transform="translate(255, 120)">
        <ellipse cx="0" cy="0" rx="14" ry="18" fill="#fbbf24" opacity="0.8" />
        <path d="M -3 -8 A 8 10 0 0 1 5 -12" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
        <path d="M 0 18 L -3 21 L 3 21 Z" fill="#fbbf24" />
        <path d="M 0 21 Q 5 35 -5 50" fill="none" stroke="#94a3b8" stroke-width="1" />
      </g>

      {/* Romantic Birthday Title Text */}
      <text x="150" y="275" fontFamily="Georgia, serif" fontSize="16" fontWeight="bold" fill="#be123c" textAnchor="middle" letterSpacing="1">
        Happy Birthday Jagriti ❤️
      </text>
    </>
  );

  // Layout calculations
  // Given a slot index (0..8) on the board, find which piece occupies it.
  const getPieceInSlot = (slotIndex: number) => {
    return pieces.find((p) => p.currentIndex === slotIndex);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 p-6 md:p-8 shadow-xl text-center relative overflow-hidden">
      
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-radial-gradient from-romantic-gold-100/30 to-transparent rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-radial-gradient from-romantic-pink-100/20 to-transparent rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        <span className="text-romantic-gold-500 font-serif text-xs uppercase tracking-widest font-bold block mb-1.5 animate-pulse">
          Interactive Mini-Game 2
        </span>
        <h3 className="font-serif font-medium text-2xl text-neutral-800 tracking-tight mb-2">
          Birthday Heart Puzzle 🧩
        </h3>
        <p className="font-sans font-light text-neutral-500 text-xs max-w-sm mx-auto mb-6 leading-relaxed">
          Arrange the mixed-up pieces of this birthday greeting! Click two different pieces to swap them, or drag and drop.
        </p>

        {/* Hints and Reset buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 hover:bg-romantic-pink-50 text-[10px] font-sans font-bold uppercase text-neutral-500 hover:text-romantic-pink-500 rounded-full border border-neutral-200 transition-all shadow-sm cursor-pointer"
          >
            <Eye size={12} /> {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          
          {!isSolved && (
            <button
              onClick={initializePuzzle}
              className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-sans font-bold uppercase text-neutral-500 rounded-full border border-neutral-200 transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw size={11} /> Shuffle Board
            </button>
          )}
        </div>

        {/* Hint View Overlay */}
        {showHint && (
          <div className="w-[180px] h-[180px] mx-auto border-2 border-romantic-pink-300 rounded-2xl overflow-hidden mb-6 shadow-md animate-scaleIn">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {renderSVGContent()}
            </svg>
          </div>
        )}

        {/* Puzzle Board Grid */}
        <div className="grid grid-cols-3 gap-1.5 bg-neutral-900/10 p-2 rounded-2xl aspect-square w-full max-w-[280px] md:max-w-[300px] mx-auto mb-6 border border-white shadow-inner relative overflow-hidden">
          
          {/* Solved overlay card */}
          {isSolved && (
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] flex items-center justify-center animate-fadeIn z-30 pointer-events-none">
              <div className="bg-emerald-500 text-white rounded-full p-2 animate-bounce">
                <Check size={28} className="stroke-[3]" />
              </div>
            </div>
          )}

          {Array.from({ length: 9 }).map((_, slotIndex) => {
            const piece = getPieceInSlot(slotIndex);
            if (!piece) return null;

            // Compute original coordinates for this piece to slice the viewport correctly
            const originalRow = Math.floor(piece.id / 3);
            const originalCol = piece.id % 3;
            const viewBoxX = originalCol * 100;
            const viewBoxY = originalRow * 100;

            const isSelected = selectedPieceIndex === slotIndex;

            return (
              <div
                key={piece.id}
                draggable={!isSolved}
                onDragStart={(e) => handleDragStart(e, slotIndex)}
                onDrop={(e) => handleDrop(e, slotIndex)}
                onDragOver={handleDragOver}
                onClick={() => handlePieceClick(slotIndex)}
                className={`
                  aspect-square rounded-lg overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-300 relative select-none border border-black/10 shadow-sm
                  ${isSolved ? 'cursor-default pointer-events-none' : ''}
                  ${isSelected ? 'ring-4 ring-rose-500 ring-offset-2 scale-[1.03] z-20 shadow-lg animate-pulse' : 'hover:scale-[1.01] hover:brightness-105'}
                `}
              >
                {/* SVG slicing magic */}
                <svg viewBox={`${viewBoxX} ${viewBoxY} 100 100`} className="w-full h-full pointer-events-none">
                  {renderSVGContent()}
                </svg>

                {/* Highlight slot number slightly for gameplay clarity if requested, keeping it minimalistic */}
                {!isSolved && isSelected && (
                  <div className="absolute inset-0 bg-rose-500/10 flex items-center justify-center pointer-events-none">
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Puzzle Completion Status Card */}
        {isSolved ? (
          <div className="animate-scaleIn p-5 bg-gradient-to-r from-amber-500/5 via-rose-500/10 to-amber-500/5 border border-rose-500/10 rounded-2xl">
            <p className="font-serif font-medium text-romantic-pink-600 text-sm leading-relaxed mb-1">
              "You completed the puzzle...
            </p>
            <p className="font-serif font-medium text-neutral-600 text-xs leading-relaxed mb-1.5">
              Just like every beautiful memory,
            </p>
            <p className="font-serif font-medium text-romantic-pink-600 text-sm leading-relaxed mb-4">
              you make my life feel complete. ❤️"
            </p>
            
            <button
              onClick={onComplete}
              className="mx-auto flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-romantic-gold-300 to-rose-600 hover:scale-103 active:scale-97 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full shadow-lg hover:shadow-rose-500/20 transition-all cursor-pointer border border-white/20 animate-pulse"
            >
              Open My Birthday Letter 💌 <Mail size={13} className="animate-bounce" />
            </button>
          </div>
        ) : (
          <p className="text-[10px] font-sans font-medium tracking-wide text-neutral-400">
            Arrange all pieces correctly to open her special birthday letter!
          </p>
        )}
      </div>
    </div>
  );
}
