import React, { useEffect, useState } from 'react';

interface CursorHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
}

export default function CursorTrail() {
  const [hearts, setHearts] = useState<CursorHeart[]>([]);
  const nextId = React.useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Spawn a heart occasionally to avoid overcrowding the screen
      if (Math.random() > 0.15) return;

      const newHeart: CursorHeart = {
        id: nextId.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 10 + 10, // 10px to 20px
        rotation: Math.random() * 360,
        opacity: 0.8
      };

      setHearts((prev) => [...prev, newHeart]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update loop for hearts (fade them out and float them upwards)
  useEffect(() => {
    const timer = setInterval(() => {
      setHearts((prev) => 
        prev
          .map((h) => ({
            ...h,
            y: h.y - 1, // drift upwards
            opacity: h.opacity - 0.02 // fade out
          }))
          .filter((h) => h.opacity > 0)
      );
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: 'absolute',
            left: h.x,
            top: h.y,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            transform: `translate(-50%, -50%) rotate(${h.rotation}deg)`,
            transition: 'opacity 0.03s linear, transform 0.03s linear',
            color: '#f43f5e',
            userSelect: 'none'
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
