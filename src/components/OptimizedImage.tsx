import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getMinioUrl } from '@/lib/minioUrl';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string | null | undefined;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg';
  placeholder?: string;
  containerClassName?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  width,
  height,
  quality = 75,
  format = 'webp',
  placeholder,
  className,
  containerClassName,
  alt = 'Star Banquet',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const finalSrc = src?.startsWith('http') ? src : getMinioUrl(src);

  return (
    <div className={cn("relative overflow-hidden bg-gray-100", containerClassName)}>
      {/* Skeleton/Placeholder */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
          <span className="text-xs uppercase tracking-widest">Image unavailable</span>
        </div>
      )}

      <img
        src={finalSrc}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        decoding="async"
        className={cn(
          "transition-opacity duration-500",
          !isLoaded ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
