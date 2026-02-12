
import React, { useState, useEffect } from 'react';
import { PixelButton } from './PixelButton';
import { PixelCharacter } from './PixelCharacter';

interface GameIntroViewProps {
  onBack: () => void;
  onFinish: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

const DIALOGUES = [
  "Halt, traveler! You must be the new settler the ancient scrolls whispered about...",
  "The Voxel Valley hasn't seen a farmer of your spirit in over a thousand seasons.",
  "Darkness is stirring. A mysterious 'Shadow Glitch' is creeping into our fertile soils, turning golden wheat into static.",
  "Only a Master Harvester can grow the light back into this world and restore our Empire.",
  "But even a Legend must start small... with their very first magical potion."
];

export const GameIntroView: React.FC<GameIntroViewProps> = ({ onBack, onFinish, isDark, onToggleDark }) => {
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTypingComplete(false);
    let index = 0;
    const fullText = DIALOGUES[step];

    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 40); // 40ms per character for a crisp RPG feel

    return () => clearInterval(interval);
  }, [step]);

  const handleNext = () => {
    if (!isTypingComplete) return;
    if (step < DIALOGUES.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="min-h-screen font-display text-xl antialiased overflow-hidden flex flex-col items-center transition-colors duration-0">
      <nav className="w-full p-4 md:p-6 flex justify-between items-center z-10">
        <div
          className="bg-white dark:bg-zinc-900 pixel-border-outer px-4 py-1 cursor-pointer transition-transform hover:scale-105"
          onClick={onBack}
        >
          <span className="text-2xl font-bold text-black dark:text-white uppercase tracking-wider">
            STEP 1/3
          </span>
        </div>
        <div className="w-10"></div>
      </nav>

      <main className="flex-1 w-full max-w-sm flex flex-col items-center justify-end pb-12 relative px-6">
        {/* Environment Decorations */}
        <div className="absolute top-20 left-4 opacity-30 pointer-events-none -rotate-12">
          <img src="/Vegetation/Trees 3.png" alt="Decor" className="w-48 h-auto pixelated" />
        </div>
        <div className="absolute top-40 right-4 opacity-30 pointer-events-none rotate-12">
          <img src="/tilesets/Set 1.2.png" alt="Decor" className="w-40 h-auto pixelated" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="w-28 h-28 md:w-36 md:h-36 bg-[#fbbf24] dark:bg-amber-900/40 pixel-border-outer flex items-center justify-center relative overflow-hidden shadow-[6px_6px_0_0_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 opacity-10 bg-emerald-700"></div>
              <img
                src="/character.png"
                alt="Lei"
                className="w-full h-full object-contain object-bottom pixelated relative z-10 scale-110 translate-y-2"
              />
            </div>
            <div className="absolute bottom-0 right-0 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest z-20 text-stroke-green font-pixel whitespace-nowrap translate-y-2 translate-x-2">
              Lei
            </div>
          </div>
          <div key={step} className="pixel-speech-box w-full p-6 relative min-h-[140px] flex items-center justify-center border-4 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-white dark:bg-zinc-900 border-x-4 border-t-4 border-black dark:border-zinc-700"></div>
            <p className="text-2xl md:text-3xl text-black dark:text-white leading-tight text-center italic">
              "{displayedText}"
              {!isTypingComplete && <span className="inline-block w-2 hide-1 bg-black dark:bg-white ml-1 animate-pulse">|</span>}
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full space-y-8 mt-4">
          <div className="flex justify-center space-x-4">
            {DIALOGUES.map((_, i) => (
              <div key={i} className={`pixel-dot transition-colors duration-300 w-3 h-3 bg-white/20 pixel-border ${i === step ? 'bg-primary' : ''}`}></div>
            ))}
          </div>
          <PixelButton
            variant="primary"
            className={`w-full py-4 text-3xl md:text-4xl transition-all ${!isTypingComplete ? 'opacity-50 grayscale cursor-not-allowed' : 'animate-pulse-subtle'}`}
            onClick={handleNext}
            disabled={!isTypingComplete}
          >
            {step === DIALOGUES.length - 1 ? "CHOOSE A POTION" : "NEXT"}
          </PixelButton>
        </div>
      </main>

      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-white dark:bg-zinc-800 pixel-border-outer p-2 shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
          onClick={onToggleDark}
        >
          <span className="material-symbols-outlined text-black dark:text-yellow-400 text-3xl">
            {isDark ? 'light_mode' : 'nights_stay'}
          </span>
        </button>
      </div>

      <style>{`
        .text-stroke-green {
          -webkit-text-stroke: 2px #10b981;
          paint-order: stroke fill;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};
