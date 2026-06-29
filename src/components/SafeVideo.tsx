import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface SafeVideoProps {
  src: string;
  fallback: string;
  title: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  poster?: string;
}

export default function SafeVideo({
  src,
  fallback,
  title,
  autoplay = false,
  loop = true,
  muted = true,
  controls = false,
  className = '',
  poster = ''
}: SafeVideoProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setCurrentSrc(fallback);
      setHasError(true);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative overflow-hidden group rounded-2xl bg-neutral-900 ${className}`}>
      <video
        ref={videoRef}
        src={currentSrc}
        poster={poster}
        onError={handleError}
        autoPlay={autoplay}
        loop={loop}
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
      />

      {/* Custom Overlay for Controls */}
      {controls && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white font-serif font-medium text-lg leading-tight mb-1 drop-shadow-md">{title}</p>
          
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      )}

      {/* Snap/Autoplay Center Icon Overlay just for a beautiful visual feedback on hover */}
      {autoplay && !controls && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-2.5 py-1 text-[10px] font-sans uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-md rounded-full">
            Live Memory
          </div>
        </div>
      )}
    </div>
  );
}
