
import React from 'react';

interface PixelNavProps {
  onMenuToggle: () => void;
  onDarkToggle: () => void;
  isDark: boolean;
}

export const PixelNav: React.FC<PixelNavProps> = ({ onMenuToggle, onDarkToggle, isDark }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center p-4">
      <div className="flex gap-4">
        <button 
          className="bg-white dark:bg-zinc-900 pixel-border p-2 flex items-center justify-center transition-transform hover:scale-110"
          onClick={onDarkToggle}
          title="Toggle Dark Mode"
        >
          <span className="material-icons text-black dark:text-white">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        
        {/* Menu button removed as requested */}
      </div>
    </nav>
  );
};
