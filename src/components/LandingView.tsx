
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
          <a
            href="https://x.com/voxelempire"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-12 h-12 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all"
          >
            {/* Custom Pixelated X using SVG */}
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black dark:fill-white" style={{ imageRendering: 'pixelated' }}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <div className="flex gap-2 justify-center flex-wrap text-[9px] md:text-[10px] font-pixel text-black/60 dark:text-white/60 uppercase tracking-widest">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-primary transition-colors">Privacy</button>
            <span>•</span>
            <button onClick={() => setShowTerms(true)} className="hover:text-primary transition-colors">Terms</button>
            <span>•</span>
            <span>© 2026 Voxel Empire</span>
          </div>
          <p className="text-[8px] md:text-[9px] font-pixel text-white/40 uppercase tracking-widest leading-none">
            Gamified Waitlist | Not Financial Advice
          </p>
        </div>
      </footer>
    </div>
  );
};
