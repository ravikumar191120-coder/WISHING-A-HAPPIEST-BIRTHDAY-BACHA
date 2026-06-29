import React, { useEffect, useState } from 'react';

interface CursorHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  driftX: number; // side-to-side sway direction
  speedY: number; // upward speed
}

export default function CursorTrail() {
  const [hearts, setHearts] = useState<CursorHeart[]>([]);
  const nextId = React.useRef(0);

  useEffect(() => {
    // 1. Mousemove listener (Desktop only cursor trail)
    const handleMouseMove = (e: MouseEvent) => {
      // Spawn occasionally to avoid overcrowding
      if (Math.random() > 0.18) return;

      const newHeart: CursorHeart = {
        id: nextId.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 10, // 10px to 18px
        rotation: Math.random() * 360,
        opacity: 0.85,
        driftX: (Math.random() - 0.5) * 1.5,
        speedY: Math.random() * 1.2 + 1.2 // upwards drift
      };

      setHearts((prev) => [...prev, newHeart]);
    };

    // 2. Global Click/Tap listener (Mobile/Touch and desktop click bursts)
    const handleGlobalTap = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e) {
        // Touch event (mobile)
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Click event (desktop/fallback)
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // Spawn a soft burst of 4-5 hearts around the tap location
      const burstCount = 4 + Math.floor(Math.random() * 3);
      const newBurstHearts: CursorHeart[] = [];

      for (let i = 0; i < burstCount; i++) {
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetDist = Math.random() * 20; // spread them slightly around tap center
        const spawnX = clientX + Math.cos(offsetAngle) * offsetDist;
        const spawnY = clientY + Math.sin(offsetAngle) * offsetDist;

        newBurstHearts.push({
          id: nextId.current++,
          x: spawnX,
          y: spawnY,
          size: Math.random() * 12 + 12, // 12px to 24px (slightly larger and softer for mobile)
          rotation: Math.random() * 360,
          opacity: 0.9,
          driftX: (Math.random() - 0.5) * 3, // wider side-to-side drift
          speedY: Math.random() * 2 + 1.8 // faster float up
        });
      }

      setHearts((prev) => [...prev, ...newBurstHearts]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleGlobalTap);
    window.addEventListener('touchstart', handleGlobalTap, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleGlobalTap);
      window.removeEventListener('touchstart', handleGlobalTap);
    };
  }, []);

  // Update loop for physics (float upwards, drift horizontally, fade out)
  useEffect(() => {
    const timer = setInterval(() => {
      setHearts((prev) =>
        prev
          .map((h) => ({
            ...h,
            x: h.x + h.driftX, // sway left/right
            y: h.y - h.speedY, // rise up
            opacity: h.opacity - 0.022 // fade out
          }))
          .filter((h) => h.opacity > 0)
      );
    }, 28);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
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
            transition: 'opacity 0.02s linear, transform 0.02s linear',
            color: '#f43f5e',
            userSelect: 'none',
            filter: 'drop-shadow(0 2px 4px rgba(244,63,94,0.25))'
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
