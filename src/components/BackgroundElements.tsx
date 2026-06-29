import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  type: 'heart' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export default function BackgroundElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = [
      'rgba(244, 63, 94, 0.25)', // rose-500
      'rgba(251, 113, 133, 0.2)', // rose-400
      'rgba(244, 63, 94, 0.12)', // pale rose
      'rgba(232, 121, 249, 0.15)', // fuchsia-400
      'rgba(217, 70, 239, 0.12)', // fuchsia-500
      'rgba(253, 246, 226, 0.4)', // gold translucent
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Helper to draw a heart on the canvas context
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      // Draw bezier curves to create a heart
      ctx.moveTo(0, -size / 4);
      ctx.bezierCurveTo(size / 2, -size, size * 1.2, -size / 3, 0, size);
      ctx.bezierCurveTo(-size * 1.2, -size / 3, -size / 2, -size, 0, -size / 4);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    // Helper to draw a sparkle
    const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(251, 191, 36, 0.6)'; // Amber golden glow
      ctx.fill();
      ctx.restore();
    };

    const createParticle = (x: number, y: number, isBurst = false): Particle => {
      const typeNum = Math.random();
      const type = typeNum > 0.4 ? 'heart' : 'sparkle';
      const size = type === 'heart' 
        ? (isBurst ? Math.random() * 15 + 8 : Math.random() * 25 + 10)
        : (isBurst ? Math.random() * 3 + 1 : Math.random() * 4 + 1);

      return {
        x,
        y,
        size,
        speedY: type === 'heart' 
          ? (isBurst ? (Math.random() - 0.5) * 4 - 2 : -(Math.random() * 0.8 + 0.3))
          : (isBurst ? (Math.random() - 0.5) * 2 : -(Math.random() * 0.4 + 0.1)),
        speedX: isBurst ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.6,
        opacity: isBurst ? 0.9 : Math.random() * 0.5 + 0.2,
        fadeSpeed: isBurst ? 0.015 + Math.random() * 0.01 : 0.0005 + Math.random() * 0.001,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    };

    // Initial background particles
    const initCount = Math.min(window.innerWidth / 15, 60);
    for (let i = 0; i < initCount; i++) {
      particles.push(
        createParticle(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
      );
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly spawn continuous background hearts/sparkles
      if (particles.length < initCount && Math.random() < 0.1) {
        particles.push(createParticle(Math.random() * canvas.width, canvas.height + 30));
      }

      particles.forEach((p, index) => {
        // Move
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.fadeSpeed;

        // Bounce horizontally if burst
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -0.8;

        // Draw
        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation, Math.max(0, p.opacity));
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, Math.max(0, p.opacity));
        }

        // Clean up invisible particles or those drifting out of scope
        if (p.opacity <= 0 || p.y < -50 || p.y > canvas.height + 50) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Spawn heart explosion on click
    const handleClick = (e: MouseEvent) => {
      const burstCount = Math.random() * 8 + 8;
      for (let i = 0; i < burstCount; i++) {
        particles.push(createParticle(e.clientX, e.clientY, true));
      }
    };

    // Spawn heart explosion on mobile touches
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const burstCount = Math.random() * 8 + 8;
        for (let i = 0; i < burstCount; i++) {
          particles.push(createParticle(touch.clientX, touch.clientY, true));
        }
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
