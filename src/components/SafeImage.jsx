import React from 'react';
import { useImageLoader } from '../hooks/useImageLoader';

const SafeImage = ({ 
    src, 
    alt, 
    className = '', 
    fallback = '/img/placeholder.jpg',
    ...props 
}) => {
    const { imageSrc, isLoading, hasError } = useImageLoader(src, fallback);

    return (
        <div className={`safe-image-container ${className}`} {...props}>
            {isLoading && (
                <div className="image-loading">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <img 
                src={imageSrc}
                alt={alt}
                className={`safe-image ${isLoading ? 'loading' : ''} ${hasError ? 'error' : ''}`}
                style={{ 
                    display: isLoading ? 'none' : 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </div>
    );
};

export default SafeImage;