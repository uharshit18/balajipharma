import React, { useState } from 'react';
// import { cn } from '../../utils/cn'; // Removed missing dependency

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    width?: number | string;
    height?: number | string;
    priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className,
    width,
    height,
    priority = false, // If true, eager load (LCP Candidates)
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            onLoad={() => setIsLoaded(true)}
            className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
            {...props}
        />
    );
};
