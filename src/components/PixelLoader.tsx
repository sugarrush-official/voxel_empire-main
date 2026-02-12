import React from 'react';

/**
 * PixelLoader component using the 4-frame sprite sheet.
 * Uses steps(4) to animate between frames.
 */
export const PixelLoader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 px-4 w-full max-w-xs sm:max-w-sm">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                        backgroundImage: "url('/falling leaf/4 frames.png')",
                        backgroundSize: '400% 100%',
                        imageRendering: 'pixelated',
                        animation: 'pixel-loader-spin 0.8s steps(4) infinite'
                    }}
                />
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-40 sm:w-48 h-2 bg-black/20 dark:bg-white/10 pixel-border-outer relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-primary animate-progress-mock transition-all duration-300"></div>
                </div>
            </div>
            <style>{`
        @keyframes progress-mock {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
        .animate-progress-mock {
            animation: progress-mock 10s linear forwards;
        }
      `}</style>
        </div>
    );
};
