import React, { useState, useEffect } from 'react';

interface LoveNote {
  id: number;
  text: string;
  left: number; // percentage from left
  delay: number; // in seconds
  duration: number; // in seconds
  scale: number;
}

const NOTE_TEXTS = [
  "My Bacha ❤️",
  "My Babu ❤️",
  "My Darling ❤️",
  "My Cutiee ❤️",
  "My Maalkin ❤️",
  "Stay Happy ❤️"
];

export default function LoveNotesRain() {
  const [notes, setNotes] = useState<LoveNote[]>([]);
  const nextId = React.useRef(0);

  useEffect(() => {
    // Generate a new floating love note every 12 seconds to keep it subtle and not overused
    const spawnNote = () => {
      const newNote: LoveNote = {
        id: nextId.current++,
        text: NOTE_TEXTS[Math.floor(Math.random() * NOTE_TEXTS.length)],
        left: Math.random() * 80 + 10, // 10% to 90% horizontal position
        delay: 0,
        duration: Math.random() * 8 + 12, // slow fall, 12s to 20s duration
        scale: Math.random() * 0.15 + 0.85 // 85% to 100% scale for variety
      };

      setNotes((prev) => [...prev, newNote]);
    };

    // Spawn first note after a tiny delay
    const initialDelay = setTimeout(spawnNote, 2000);

    const interval = setInterval(spawnNote, 12000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  // Filter out expired notes
  useEffect(() => {
    const cleaner = setInterval(() => {
      // Remove any notes that have run their duration (adding 1s buffer)
      setNotes((prev) => prev.filter((n) => true)); // handled in animation end or filter
    }, 4000);

    return () => clearInterval(cleaner);
  }, []);

  const handleAnimationEnd = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {notes.map((note) => (
        <div
          key={note.id}
          onAnimationEnd={() => handleAnimationEnd(note.id)}
          className="absolute text-neutral-800 pointer-events-none bg-white/70 backdrop-blur-sm border border-rose-100/30 px-3 py-1.5 rounded-full shadow-sm text-[10px] font-sans font-medium tracking-wide flex items-center gap-1 select-none whitespace-nowrap"
          style={{
            left: `${note.left}%`,
            top: `-50px`,
            transform: `scale(${note.scale})`,
            animation: `noteFloatDown ${note.duration}s linear forwards`,
          }}
        >
          <span>✨</span>
          <span>{note.text}</span>
        </div>
      ))}

      {/* Styled animation for vertical float & horizontal swaying */}
      <style>{`
        @keyframes noteFloatDown {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(105vh) translateX(45px) rotate(8deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
