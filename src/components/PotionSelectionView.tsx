
import React, { useState } from 'react';
import { PixelButton } from './PixelButton';

interface PotionSelectionViewProps {
    onBack: () => void;
    onComplete: (potion: any) => void;
    isDark: boolean;
    onToggleDark: () => void;
}

const POTIONS = [
    {
        id: 'turnip',
        name: 'Turnip',
        description: 'Fast growing, hardy, and dependable.',
        icon: 'nutrition',
        bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
        iconColor: 'text-green-600 dark:text-green-400',
        image: '/turnip.png'
    },
    {
        id: 'strawberry',
        name: 'Strawberry',
        description: 'Sweet flavor with high market value.',
        icon: 'brightness_low',
        bgColor: 'bg-rose-100 dark:bg-rose-900/40',
        iconColor: 'text-rose-500',
        image: '/strawberry.png'
    },
    {
        id: 'pumpkin',
        name: 'Pumpkin',
        description: 'Slow growth but massive harvests.',
        icon: 'bakery_dining',
        bgColor: 'bg-orange-100 dark:bg-orange-900/40',
        iconColor: 'text-orange-500',
        image: '/pumpkin.png'
    }
];

export const PotionSelectionView: React.FC<PotionSelectionViewProps> = ({ onBack, onComplete, isDark, onToggleDark }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleHint = () => {
        alert("HINT: Turnips are for beginners. Pumpkins are high risk/reward. Strawberries are for masters!");
    };

    const currentPotion = POTIONS.find(p => p.id === selected);

    return (
        <div className="font-display text-xl antialiased overflow-hidden min-h-screen select-none relative transition-colors duration-0">
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4">
                <div className="bg-white dark:bg-zinc-900 pixel-border p-1 px-4 cursor-pointer" onClick={onBack}>
                    <span className="text-2xl font-bold text-black dark:text-white uppercase tracking-wider">Step 2/3</span>
                </div>
                <button
                    onClick={handleHint}
                    className="bg-white dark:bg-zinc-900 pixel-border p-2 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md"
                >
                    <span className="material-symbols-outlined text-black dark:text-white">help</span>
                </button>
            </nav>

            <main className="relative z-10 pt-16 pb-4 flex flex-col items-center justify-between px-4 min-h-screen h-[100dvh] overflow-hidden">
                {/* Decorative Assets */}
                <div className="fixed top-20 right-0 opacity-10 pointer-events-none -mr-10">
                    <img src="/Vegetation/Trees 3.png" alt="Tree Decor" className="w-48 h-auto pixelated" />
                </div>
                <div className="fixed bottom-20 left-0 opacity-10 pointer-events-none -ml-10">
                    <img src="/Vegetation/Some Objects.png" alt="Object Decor" className="w-32 h-auto pixelated scale-x-[-1]" />
                </div>

                <header className="text-center mb-2 md:mb-6 relative shrink-0">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
                        <img src="/tilesets/fences and ladders etc.png" alt="Fence Decor" className="w-full max-w-[120px] h-auto pixelated" />
                    </div>
                    <h1 className="text-xl md:text-4xl font-bold text-black dark:text-white mb-0 md:mb-1 uppercase tracking-tighter">Choose your potion</h1>
                    <p className="text-sm md:text-lg text-zinc-700 dark:text-zinc-300 opacity-80 text-stroke-white">Every journey starts with a single elixir.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-stretch w-full max-w-5xl px-4">
                    {POTIONS.map((potion) => (
                        <div
                            key={potion.id}
                            onClick={() => setSelected(potion.id)}
                            className={`pixel-card relative overflow-hidden p-2 md:p-3 flex flex-col items-center text-center cursor-pointer border-2 border-black dark:border-zinc-700 transition-all hover:scale-[1.05] active:scale-95 flex-1 w-full max-w-[200px] md:max-w-sm mx-auto ${selected === potion.id
                                ? 'bg-primary/50 dark:bg-primary/60 ring-2 md:ring-4 ring-white animate-pulse-subtle'
                                : 'bg-white/95 dark:bg-zinc-800/95 opacity-80 hover:opacity-100'
                                }`}
                        >
                            {selected === potion.id && (
                                <div className="absolute top-1 right-1 bg-white pixel-border-outer p-0.5 z-20 animate-in fade-in zoom-in duration-200">
                                    <span className="material-symbols-outlined text-black text-[10px] md:text-sm font-bold">check</span>
                                </div>
                            )}

                            <div className={`w-12 h-12 md:w-20 md:h-20 ${potion.bgColor} pixel-border flex items-center justify-center shrink-0 mb-2 md:mb-3 relative z-10 overflow-hidden`}>
                                <img
                                    src={potion.image}
                                    alt={potion.name}
                                    className="w-10 h-10 md:w-16 md:h-16 object-contain pixelated drop-shadow-md"
                                />
                            </div>
                            <div className="flex-1 relative z-10">
                                <h2 className="text-sm md:text-xl font-bold text-black dark:text-white uppercase leading-none mb-1 text-stroke-white">{potion.name}</h2>
                                <p className="text-[9px] md:text-xs text-zinc-700 dark:text-zinc-400 leading-tight font-display line-clamp-2">{potion.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-xs md:max-w-sm mt-4 md:mt-8 shrink-0">
                    <PixelButton
                        variant="primary"
                        className="w-full py-2.5 md:py-4 text-lg md:text-3xl shadow-xl active:translate-y-1 transition-all"
                        disabled={!selected}
                        onClick={() => onComplete(currentPotion)}
                    >
                        SELECT POTION
                    </PixelButton>
                    <p className="text-center mt-2 md:mt-3 text-[8px] md:text-xs text-red-600 dark:text-red-400 uppercase tracking-widest font-bold opacity-80 text-stroke-white font-pixel">cannot be changed later</p>
                </div>
            </main>

            <style>{`
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.07); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
        .text-stroke-white {
          -webkit-text-stroke: 1px white;
          paint-order: stroke fill;
        }
        .dark .text-stroke-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
      `}</style>



            <div className="fixed bottom-4 right-4 z-50">
                <button
                    className="bg-white dark:bg-zinc-800 pixel-border p-2 transition-transform hover:scale-110 shadow-xl flex items-center justify-center"
                    onClick={onToggleDark}
                >
                    <span className="material-symbols-outlined text-black dark:text-white text-3xl">
                        {isDark ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>
            </div>
        </div >
    );
};
