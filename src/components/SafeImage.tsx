import React, { useState, useEffect, useRef } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}

export default function SafeImage({ src, fallback, alt, className, ...props }: SafeImageProps) {

  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reset states if the source path changes
    setCurrentSrc(src);
    setHasError(false);
    setLoading(true);
  }, [src]);

  // If the browser already has the image loaded (cached), set loading to false immediately
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoading(false);
    }
  }, [currentSrc]);

  const handleError = () => {
    if (!hasError) {
      setCurrentSrc(fallback);
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-romantic-pink-50/20 ${className || ''}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-romantic-pink-100/30 animate-pulse">
          <span className="text-romantic-pink-400 font-serif text-[10px] uppercase tracking-wider">Loading...</span>
        </div>
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setLoading(false)}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100"
        {...props}
      />
    </div>
  );
}
