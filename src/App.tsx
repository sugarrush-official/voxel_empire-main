

import React, { useState, useEffect, useRef } from 'react';
import { LandingView } from './components/LandingView';
import { GameIntroView } from './components/GameIntroView';
import { PotionSelectionView } from './components/PotionSelectionView';
import { WaitlistView } from './components/WaitlistView';
import { WaitlistSuccessView } from './components/WaitlistSuccessView';
import { PixelLoader } from './components/PixelLoader';
import { cacheService } from './services/cacheService';

type View = 'landing' | 'intro' | 'potion-selection' | 'waitlist' | 'success';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(() => {
    return cacheService.get<View>('current_view') || 'landing';
  });
  const [isDark, setIsDark] = useState(() => {
    return cacheService.get<boolean>('is_dark') || false;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPotion, setSelectedPotion] = useState<any>(() => {
    return cacheService.get<any>('selected_potion') || null;
  });
  const [userWallet, setUserWallet] = useState(() => {
    return cacheService.get<string>('user_wallet') || '';
  });
  const [userPoints, setUserPoints] = useState(() => {
    return cacheService.get<number>('user_points') || 0;
  });

  // Persist State Changes
  useEffect(() => {
    cacheService.set('current_view', currentView);
    cacheService.set('is_dark', isDark);
    cacheService.set('selected_potion', selectedPotion);
    cacheService.set('user_wallet', userWallet);
    cacheService.set('user_points', userPoints);
  }, [currentView, isDark, selectedPotion, userWallet, userPoints]);


  useEffect(() => {
    // Premium loading feel - reduced to 3s for better UX
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isLoading && !audioRef.current) {
      const audio = new Audio('/music.mp3');
      audio.loop = true;
      audio.volume = 0.25; // "Not too loud"
      audioRef.current = audio;

      const playAudio = () => {
        audio.play().catch(err => console.log("Waiting for interaction..."));
      };

      playAudio();

      // Interaction fallback
      window.addEventListener('click', playAudio, { once: true });
    }
  }, [isLoading]);


  const handleReset = () => {
    cacheService.clearAll();
    window.location.reload();
  };


  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingView
            onPlayNow={() => setCurrentView('intro')}
            isDark={isDark}
            onToggleDark={toggleDarkMode}
            onNav={(v: string) => {
              if (v === 'home') setCurrentView('landing');
            }}
          />
        );
      case 'intro':
        return (
          <GameIntroView
            onBack={() => {
              setCurrentView('landing');
            }}
            onFinish={() => setCurrentView('potion-selection')}
            isDark={isDark}
            onToggleDark={toggleDarkMode}
          />
        );
      case 'potion-selection':
        return (
          <PotionSelectionView
            onBack={() => setCurrentView('intro')}
            onComplete={(potion) => {
              setSelectedPotion(potion);
              setCurrentView('waitlist');
            }}
            isDark={isDark}
            onToggleDark={toggleDarkMode}
          />
        );
      case 'waitlist':
        return (
          <WaitlistView
            onBack={() => setCurrentView('potion-selection')}
            onSuccess={(wallet, points) => {
              setUserWallet(wallet);
              setUserPoints(points);
              setCurrentView('success');
            }}
            isDark={isDark}
            onToggleDark={() => setIsDark(!isDark)}
          />
        );
      case 'success':
        return (
          <WaitlistSuccessView
            onReturn={() => setCurrentView('landing')}
            isDark={isDark}
            selectedPotion={selectedPotion}
            userWallet={userWallet}
            userPoints={userPoints}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen transition-all duration-1000 landing-bg flex flex-col relative overflow-hidden">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center relative z-20">
          {/* Dark blur overlay during loading */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 transition-opacity duration-1000"></div>
          <div className="relative z-20 animate-in fade-in duration-500">
            <PixelLoader />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col relative z-10">
          {renderView()}
        </div>
      )}
    </div>
  );
};

export default App;
