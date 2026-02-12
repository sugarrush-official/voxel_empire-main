
import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`pixel-card ${className}`}>
      {children}
    </div>
  );
};
