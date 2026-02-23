
import React, { useState, useRef } from 'react';
import { PixelButton } from './PixelButton';
import { PixelCard } from './PixelCard';
import { PixelNav } from './PixelNav';
import { GuideScroll } from './GuideScroll';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';

interface LandingViewProps {
  onPlayNow: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onNav?: (view: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onPlayNow, isDark, onToggleDark, onNav }) => {
  const [showGuide, setShowGuide] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <div className="h-screen relative flex flex-col text-black dark:text-white overflow-hidden">
      <PixelNav
        onMenuToggle={() => { }}
        onDarkToggle={onToggleDark}
        isDark={isDark}
      />

      <main ref={heroRef} className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full">
        <div className="flex flex-col items-center gap-3 md:gap-5">
          <img
            src="/logo.svg"
            alt="Voxel Empire"
            className="w-80 md:w-[32rem] h-auto mx-auto"
            style={{ imageRendering: 'auto' }}
          />
          <PixelButton
            variant="primary"
            className="w-48 md:w-96 py-3 md:py-6 text-xl md:text-5xl transition-transform hover:scale-105 active:scale-95"
            onClick={onPlayNow}
          >
            PLAY NOW
          </PixelButton>
          <PixelButton
            variant="secondary"
            className="w-48 md:w-96 py-3 md:py-6 text-xl md:text-4xl flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            onClick={() => setShowGuide(true)}
          >
            <span className="material-icons text-xl md:text-4xl">menu_book</span>
            GUIDE
          </PixelButton>
        </div>
      </main>

      {showGuide && <GuideScroll onClose={() => setShowGuide(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}

      <footer className="relative z-10 py-4 sm:py-8 bg-zinc-900/10 text-center shrink-0">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <a
              href="https://x.com/voxelempire"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black dark:fill-white" style={{ imageRendering: 'pixelated' }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://discord.gg/cnUb6ErkZN"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black dark:fill-white" style={{ imageRendering: 'pixelated' }}>
                <path d="M19.27 4.73C17.81 4.05 16.24 3.55 14.59 3.26l-.31.67C12.78 3.73 11.22 3.73 9.72 3.93l-.31-.67C7.76 3.55 6.19 4.05 4.73 4.73 1.77 9.14.97 13.44 1.37 17.65 3.33 19.11 5.2 20 7.01 20.57l.88-1.07C6.91 19.1 6.01 18.42 5.17 17.61c.45.33.91.64 1.39.92 3.44 1.58 7.18 1.58 10.58 0 .48-.28.94-.59 1.39-.92-.84.81-1.74 1.49-2.72 1.89l.88 1.07c1.81-.57 3.68-1.46 5.64-2.92.49-4.72-.81-9.02-3.41-12.92zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.11s.83-2.11 1.89-2.11c1.06 0 1.9.95 1.89 2.11-.01 1.16-.83 2.11-1.89 2.11zm6.97 0c-1.03 0-1.89-.95-1.89-2.11s.83-2.11 1.89-2.11c1.06 0 1.9.95 1.89 2.11-.01 1.16-.83 2.11-1.89 2.11z" />
              </svg>
            </a>
            <a
              href="https://opensea.io/collection/voxel-farm-land/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black dark:fill-white" style={{ imageRendering: 'pixelated' }}>
                <path d="M16.471 3.5c-.529 0-.96.431-.96.96 0 .529.431.96.96.96s.96-.431.96-.96c0-.529-.431-.96-.96-.96zM11.996 1L3.5 15.5h16.992L11.996 1zm0 3.774l5.441 9.326H6.555l5.441-9.326zM2 17v4h20v-4H2z" />
              </svg>
            </a>
          </div>
          <div className="flex gap-2 justify-center flex-wrap text-[9px] md:text-[10px] font-pixel text-black/60 dark:text-white/60 uppercase tracking-widest">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-primary transition-colors">Privacy</button>
            <span>•</span>
            <button onClick={() => setShowTerms(true)} className="hover:text-primary transition-colors">Terms</button>
            <span>•</span>
            <span>© 2026 Voxel Empire</span>
          </div>
          <div className="space-y-1 max-w-lg px-4">
            <div className="text-[11px] md:text-[12px] font-pixel text-black/70 dark:text-white/70 uppercase tracking-widest font-bold">
              Voxel Empire: Harvest & Havoc
            </div>
            <div className="text-[9px] md:text-[10px] font-pixel text-black/60 dark:text-white/60 leading-tight">
              Farm. Fight. Forge your empire. Build a thriving voxel farm by day and battle creatures by night. Rewards are distributed based on activity and in-game progression.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
