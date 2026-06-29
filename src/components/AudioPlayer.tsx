import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  hasEntered?: boolean;
}

export default function AudioPlayer({ hasEntered = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLVideoElement>(null);

  // Initialize and load audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.45; // Start at a sweet, gentle volume
    }
  }, []);

  // Handle autoplay once user enters
  useEffect(() => {
    if (hasEntered && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio autoplay failed, waiting for user interaction:', err);
      });
    }
  }, [hasEntered]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Audio play failed:', err);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <video
        ref={audioRef}
        src="https://files.catbox.moe/v3rj7t.mp4"
        loop
        playsInline
        style={{ display: 'none' }}
      />

      {/* Pulsing Visualizer Bars */}
      <div className="flex items-end gap-0.5 h-6 px-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-full items-center justify-center transition-all duration-300 opacity-90 hover:opacity-100">
        <div className={`w-0.5 bg-romantic-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce h-3' : 'h-1.5'}`} style={{ animationDelay: '0ms' }} />
        <div className={`w-0.5 bg-romantic-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce h-4.5' : 'h-1.5'}`} style={{ animationDelay: '150ms' }} />
        <div className={`w-0.5 bg-romantic-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce h-2.5' : 'h-1.5'}`} style={{ animationDelay: '300ms' }} />
        <div className={`w-0.5 bg-romantic-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce h-5' : 'h-1.5'}`} style={{ animationDelay: '450ms' }} />
        <div className={`w-0.5 bg-romantic-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce h-3.5' : 'h-1.5'}`} style={{ animationDelay: '600ms' }} />
      </div>

      {/* Main Music Pill Button */}
      <button
        onClick={togglePlay}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/75 hover:bg-white/90 text-romantic-pink-500 shadow-lg shadow-romantic-pink-500/5 border border-romantic-pink-100 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group"
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
      >
        <Music size={16} className={`text-romantic-pink-400 transition-transform duration-500 ${isPlaying ? 'rotate-12 scale-110' : 'rotate-0'}`} />
        <span className="text-xs font-medium font-sans tracking-wide">
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </span>
      </button>

      {/* Mute Button if music is active */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-white/75 hover:bg-white/90 text-neutral-500 border border-neutral-100 backdrop-blur-md shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      )}
    </div>
  );
}
