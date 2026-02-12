
import React from 'react';
import { PixelCharacter } from './PixelCharacter';
import { PixelButton } from './PixelButton';

interface GuideScrollProps {
  onClose: () => void;
}

export const GuideScroll: React.FC<GuideScrollProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-hidden">
      <div className="relative w-full max-w-lg flex flex-col items-center max-h-[98vh] sm:max-h-[95vh] pointer-events-auto">
        
        {/* Guide Character - Styled for the specific sheet provided */}
        <div className="mb-[-20px] sm:mb-[-24px] z-20 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] shrink-0 transition-transform hover:scale-110">
          <PixelCharacter 
            className="scale-[2.2] sm:scale-[3] origin-bottom" 
            animation="idle" 
            direction="front" 
          />
        </div>

        {/* Scroll Body */}
        <div className="w-full bg-[#f3e5ab] pixel-border-outer p-4 sm:p-8 md:p-10 relative overflow-hidden flex flex-col items-center text-zinc-900 border-x-4 sm:border-x-8 border-y-2 sm:border-y-4 border-amber-900 shadow-[12px_12px_0_0_rgba(0,0,0,0.4)]">
          {/* Scroll Texture/Edges */}
          <div className="absolute top-0 left-0 w-full h-3 bg-amber-950/20 border-b-2 border-amber-950/10"></div>
          <div className="absolute bottom-0 left-0 w-full h-3 bg-amber-950/20 border-t-2 border-amber-950/10"></div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4 sm:mb-8 text-amber-950 border-b-4 border-amber-900/30 w-full text-center pb-2">
            The Voxel Chronicles
          </h2>

          {/* Content Area with custom scrollbar */}
          <div className="space-y-6 sm:space-y-8 text-lg sm:text-xl md:text-2xl font-medium leading-tight overflow-y-auto pr-3 custom-scrollbar text-center max-h-[45vh] sm:max-h-[55vh] w-full px-2">
            <section className="group">
              <h3 className="font-bold text-amber-900 underline underline-offset-8 mb-3 sm:mb-4 uppercase tracking-widest">CHAPTER I: THE BEGINNING</h3>
              <p className="font-display opacity-90 group-hover:opacity-100 transition-opacity">
                Welcome, brave pioneer! In Voxel Empire, your hands shape the destiny of the valley. Every turnip planted is a step toward greatness.
              </p>
            </section>

            <section className="group">
              <h3 className="font-bold text-amber-900 underline underline-offset-8 mb-3 sm:mb-4 uppercase tracking-widest">CHAPTER II: THE HARVEST</h3>
              <p className="font-display opacity-90 group-hover:opacity-100 transition-opacity">
                Manage your field with care. Fast-growing Turnips provide quick coin, while Pumpkins require patience but reward the diligent with massive hauls.
              </p>
            </section>

            <section className="group">
              <h3 className="font-bold text-amber-900 underline underline-offset-8 mb-3 sm:mb-4 uppercase tracking-widest">CHAPTER III: COMMUNITY</h3>
              <p className="font-display opacity-90 group-hover:opacity-100 transition-opacity">
                You are not alone. Join over 1 million farmers in building the greatest empire the pixelated world has ever seen. Trade and thrive!
              </p>
            </section>

            <section className="pb-8 group">
              <h3 className="font-bold text-amber-900 underline underline-offset-8 mb-3 sm:mb-4 uppercase tracking-widest">CHAPTER IV: LEGACY</h3>
              <p className="font-display opacity-90 group-hover:opacity-100 transition-opacity">
                Secure your spot in the early harvest waitlist. Exclusive rewards like the 'Golden Hoe' await those who lead the charge into 2026.
              </p>
            </section>
          </div>

          {/* Footer Area with clear CTA */}
          <div className="mt-6 sm:mt-10 w-full flex justify-center shrink-0 border-t-2 border-amber-900/20 pt-4 sm:pt-6">
            <PixelButton 
              variant="secondary" 
              onClick={onClose}
              className="px-8 sm:px-14 py-3 sm:py-4 text-2xl sm:text-3xl !bg-amber-800 !text-white shadow-[inset_-4px_-4px_0_0_#451a03,0_-4px_0_0_#000,0_4px_0_0_#000,-4px_0_0_0_#000,4px_0_0_0_#000] hover:scale-105 active:scale-95 transition-all"
            >
              CLOSE SCROLL
            </PixelButton>
          </div>
        </div>

        {/* Outer Shadow/Scroll Scroll Handles (Decoration) */}
        <div className="absolute top-10 -left-4 sm:-left-6 w-4 sm:w-6 h-[80%] bg-amber-950/30 rounded-full blur-xl z-[-1]"></div>
        <div className="absolute top-10 -right-4 sm:-right-6 w-4 sm:w-6 h-[80%] bg-amber-950/30 rounded-full blur-xl z-[-1]"></div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(120, 53, 15, 0.1);
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #78350f;
          border: 2px solid #f3e5ab;
          box-shadow: 2px 2px 0 0 rgba(0,0,0,0.2);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};
