import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MemoryImage } from '../types';

interface LightboxProps {
  isOpen: boolean;
  images: MemoryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    // Lock body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 backdrop-blur-md transition-all duration-300">
      {/* Tap outside to close */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 z-10 hover:scale-105"
        aria-label="Close Lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white backdrop-blur-md transition-all duration-300 z-10 hover:scale-105"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white backdrop-blur-md transition-all duration-300 z-10 hover:scale-105"
            aria-label="Next Image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image Content Container */}
      <div className="relative max-w-4xl max-h-[80vh] w-full px-4 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="pointer-events-auto rounded-xl overflow-hidden shadow-2xl max-h-[70vh] flex items-center justify-center bg-black/20">
          <img
            src={currentImage.src}
            alt={currentImage.title}
            onError={(e) => {
              // Fail-safe if local image error: use Unsplash fallback
              (e.currentTarget as HTMLImageElement).src = currentImage.fallback;
            }}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[70vh] object-contain rounded-xl"
          />
        </div>

        {/* Text Details Card */}
        <div className="pointer-events-auto mt-4 text-center max-w-lg bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
          <h3 className="font-serif font-semibold text-lg text-romantic-pink-200">
            {currentImage.title}
          </h3>
          {currentImage.year && (
            <span className="text-[11px] font-sans tracking-wider uppercase opacity-60 block mt-0.5 mb-1.5">
              {currentImage.year}
            </span>
          )}
          <p className="text-xs font-sans text-neutral-200 leading-relaxed font-light mt-1">
            {currentImage.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
