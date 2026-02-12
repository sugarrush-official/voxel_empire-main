
import React from 'react';

interface PixelCharacterProps {
  className?: string;
  animation?: 'idle' | 'walk';
  direction?: 'front' | 'back' | 'side' | 'side-left' | 'side-right';
}

/**
 * Animated Pixel Character component with support for 4-directional sprite sheets.
 */
export const PixelCharacter: React.FC<PixelCharacterProps> = ({ 
  className = '', 
  animation = 'walk',
  direction = 'front'
}) => {
  // Using a representative high-quality pixel character base URL
  const spriteUrl = "https://raw.githubusercontent.com/beaston89/Pixel-Art-Assets/master/Character/Character_Sprite_Sheet.png";
  
  // Mapping directions to sprite rows (assuming 4 rows: front, back, left, right)
  const rowMap: Record<string, number> = {
    front: 0,
    back: 1,
    'side-left': 2,
    'side-right': 3,
    side: 3 // Default side to right
  };

  const row = rowMap[direction] ?? 0;
  const frameWidth = 64; 
  const frameHeight = 64;
  const framesPerAnimation = 6; // Standard sheet frames

  return (
    <div className={`relative overflow-hidden shrink-0 ${className}`} style={{ width: frameWidth, height: frameHeight }}>
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${spriteUrl})`,
          backgroundSize: `${frameWidth * framesPerAnimation}px ${frameHeight * 4}px`,
          backgroundPosition: `0px -${row * frameHeight}px`,
          imageRendering: 'pixelated',
          animation: animation === 'walk' ? `pixel-walk 0.8s steps(${framesPerAnimation}) infinite` : 'none'
        }}
      />
      <style>{`
        @keyframes pixel-walk {
          from { background-position-x: 0px; }
          to { background-position-x: -${frameWidth * framesPerAnimation}px; }
        }
      `}</style>
    </div>
  );
};
