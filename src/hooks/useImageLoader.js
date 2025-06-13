import { useState, useEffect } from 'react';

export const useImageLoader = (src, fallback = '/img/placeholder.jpg') => {
    const [imageSrc, setImageSrc] = useState(fallback);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) {
            setImageSrc(fallback);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setHasError(false);

        const img = new Image();
        
        img.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
            setHasError(false);
        };

        img.onerror = () => {
            setImageSrc(fallback);
            setIsLoading(false);
            setHasError(true);
        };

        img.src = src;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, fallback]);

    return { imageSrc, isLoading, hasError };
};