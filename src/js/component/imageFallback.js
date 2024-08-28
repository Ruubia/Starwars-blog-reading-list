import React, { useState } from 'react';

const ImageWithFallback = ({ src, fallbackSrc, alt, width, height }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default ImageWithFallback;
