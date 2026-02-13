
import React, { useState, useEffect, useMemo } from 'react';
import { PixelCard } from './PixelCard';
import { PixelButton } from './PixelButton';
import { cacheService } from '../services/cacheService';

interface WaitlistViewProps {
  onBack: () => void;
  onSuccess: (wallet: string, points: number) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

interface Task {
  id: number;
  label: string;
  points: number;
  icon: string;
  completed: boolean;
  actionUrl?: string;
}

export const WaitlistView: React.FC<WaitlistViewProps> = ({ onBack, onSuccess, isDark, onToggleDark }) => {
  // 1. Unified Caching & 4. Referral Detection
  const [wallet, setWallet] = useState(() => cacheService.get<string>('wallet_input') || '');
  const [referralWallet, setReferralWallet] = useState(() => {
    // Check URL for referral first
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref && /^0x[a-fA-F0-9]{40}$/.test(ref)) {
      return ref;
    }
    return cacheService.get<string>('referral_input') || '';
  });
  const [tweetLink, setTweetLink] = useState(() => cacheService.get<string>('tweet_link') || '');
  const [commentLink, setCommentLink] = useState(() => cacheService.get<string>('comment_link') || '');
  const [error, setError] = useState('');
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [timers, setTimers] = useState<{ [key: number]: boolean }>({});
  const [lastCompleted, setLastCompleted] = useState<number | null>(null);

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = cacheService.get<Task[]>('tasks');
    if (saved) return saved;
    return [
      { id: 0, label: 'Follow on X', points: 100, icon: 'campaign', completed: false },
      { id: 6, label: 'Turn on Notifications', points: 50, icon: 'notifications_active', completed: false },
      { id: 1, label: '❤️ + ♻️ + comment on pinned tweet', points: 150, icon: 'sync', completed: false },
      { id: 4, label: 'Tweet about Launch', points: 100, icon: 'chat', completed: false },
      { id: 5, label: 'Submit Tweet Link', points: 50, icon: 'link', completed: false },
      { id: 2, label: 'Submit Wallet (ETH)', points: 200, icon: 'account_balance_wallet', completed: false },
      { id: 3, label: 'Add Referrer Wallet', points: 50, icon: 'person_add', completed: false },
    ];
  });

  // Sync state to cacheService
  useEffect(() => {
    cacheService.set('tasks', tasks);
    cacheService.set('wallet_input', wallet);
    cacheService.set('referral_input', referralWallet);
    cacheService.set('tweet_link', tweetLink);
    cacheService.set('comment_link', commentLink);
  }, [tasks, wallet, referralWallet, tweetLink, commentLink]);

  const totalPoints = useMemo(() => {
    const taskPoints = tasks.reduce((acc, task) => acc + (task.completed ? task.points : 0), 0);
    // Add 20 points bonus if referrer is present and tasks are completed
    const referralBonus = (referralWallet && tasks.every(t => t.completed)) ? 20 : 0;
    return taskPoints + referralBonus;
  }, [tasks, referralWallet]);
  const progress = useMemo(() => (tasks.filter(t => t.completed).length / tasks.length) * 100, [tasks]);

  const validateWallet = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address.trim());
  const validateTweetLink = (link: string) => /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)\/.+$/.test(link.trim());
  const validateCommentLink = (link: string) => /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)\/[a-zA-Z0-9_]+\/status\/\d+/.test(link.trim());

  const isTaskDisabled = (index: number) => {
    if (index === 0) return false;
    return !tasks[index - 1].completed;
  };

  const completeTask = (id: number) => {
    setLastCompleted(id);
    setTasks(current => current.map(t => t.id === id ? { ...t, completed: true } : t));
    // Clear the harvest animation after 2s
    setTimeout(() => setLastCompleted(null), 2000);
  };

  const toggleTask = (id: number, index: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task || task.completed || isTaskDisabled(index) || timers[id]) return;

    // 5. Verification Fake-check
    if ([0, 4, 6].includes(id)) {
      setTimers(prev => ({ ...prev, [id]: true }));

      if (id === 0) window.open('https://twitter.com/intent/follow?screen_name=voxelempire', '_blank');
      else if (id === 6) window.open('https://x.com/voxelempire', '_blank');
      else if (id === 4) window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Join @voxelempire and secure your waitlist spot visit voxelempire.xyz')}`, '_blank');

      // Realistic "Verifying" time
      setTimeout(() => {
        completeTask(id);
        setTimers(prev => ({ ...prev, [id]: false }));
      }, 7000);
    } else if (id === 1) {
      // Open pinned tweet in new tab and show input for comment link
      window.open('https://x.com/voxelempire', '_blank');
      setActiveInput(activeInput === id ? null : id);
      setError('');
    } else {
      setActiveInput(activeInput === id ? null : id);
      setError('');
    }
  };

  const handleInputSubmit = (id: number) => {
    if (id === 2 || id === 3) {
      const val = id === 2 ? wallet : referralWallet;
      if (validateWallet(val)) {
        if (id === 3 && val.toLowerCase() === wallet.toLowerCase()) {
          setError('REFERRAL WALLET AND USER WALLET CANNOT BE THE SAME');
          return;
        }
        completeTask(id);
        setActiveInput(null);
        setError('');
      } else {
        setError('INVALID ADDRESS!');
      }
    } else if (id === 1) {
      if (validateCommentLink(commentLink)) {
        completeTask(id);
        setActiveInput(null);
        setError('');
      } else {
        setError('INVALID COMMENT LINK! MUST BE LINK TO YOUR COMMENT ON THE PINNED TWEET');
      }
    } else if (id === 5) {
      if (validateTweetLink(tweetLink)) {
        completeTask(id);
        setActiveInput(null);
        setError('');
      } else {
        setError('INVALID!, INPUT YOUR TWEET LINK');
      }
    }
  };

  const handleJoin = async () => {
    if (!wallet || !tasks.every(t => t.completed)) return;

    setError('');
    console.log('🚀 Submitting join request:', { wallet, points: totalPoints, potion: cacheService.get<any>('selected_potion')?.id });

    // Save to custom Neon backend
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet,
          referrer: referralWallet,
          points: totalPoints,
          potion: cacheService.get<any>('selected_potion')?.id
        })
      });

      console.log('📡 API Response:', { status: response.status, ok: response.ok });
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error('❌ API Error - Status:', response.status, 'Body:', errorText);
        setError('FAILED TO JOIN WAITLIST. PLEASE TRY AGAIN.');
        return;
      }

      const data = await response.json();
      console.log('✅ Join successful:', data);
    } catch (err) {
      console.error('❌ Network Error:', err);
      setError('NETWORK ERROR WHILE JOINING. TRY AGAIN.');
      return;
    }

    onSuccess(wallet, totalPoints);
  };

  return (
    <div className="font-retro text-xl antialiased overflow-x-hidden min-h-screen text-black dark:text-white transition-colors duration-0">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3">
        <div className="bg-white dark:bg-zinc-900 pixel-border px-3 py-1 cursor-pointer" onClick={onBack}>
          <span className="text-xl font-bold uppercase tracking-wider text-black dark:text-white">Voxel Empire</span>
        </div>
        <div className="bg-primary text-black pixel-border px-2 py-1 font-bold text-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-md">payments</span>
          {totalPoints} PTS
        </div>
      </nav>

      <main className="relative flex flex-col items-center justify-start min-h-screen px-3 pt-16 pb-8 w-full max-w-xl mx-auto overflow-y-auto">
        <PixelCard className="w-full bg-white/90 dark:bg-zinc-900/90 p-4 mb-4 border-4 border-black dark:border-white shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <div className="flex flex-col items-center md:items-start gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tighter text-[#e67e51] dark:text-primary leading-none">Farmer's Ledger</h1>
            <p className="text-sm sm:text-lg opacity-70 mb-4 font-display">Complete tasks to increase your harvest weight.</p>

            {/* 2. Visual Progress Bar */}
            <div className="w-full h-8 bg-black/10 dark:bg-white/10 pixel-border relative overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-1000 ease-out flex items-center justify-center relative"
                style={{ width: `${progress}%` }}
              >
                {progress > 10 && (
                  <span className="text-[10px] font-bold text-black uppercase absolute left-2 whitespace-nowrap">
                    Harvest Progress: {Math.round(progress)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </PixelCard>

        <div className="w-full space-y-2 mb-8">
          <h2 className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1">Available Quests</h2>
          {tasks.map((task, index) => {
            const disabled = isTaskDisabled(index);
            const isVerifying = timers[task.id];
            const isHarvesting = lastCompleted === task.id;

            return (
              <div key={task.id} className="flex flex-col gap-1 relative">
                {/* 3. Harvest Animation Pop */}
                {isHarvesting && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 animate-harvest-pop pointer-events-none">
                    <span className="text-4xl">🌾</span>
                  </div>
                )}

                <div
                  onClick={() => toggleTask(task.id, index)}
                  className={`pixel-card p-3 flex items-center justify-between transition-all border-2 ${task.completed
                    ? 'bg-primary/20 opacity-80 border-black'
                    : disabled
                      ? 'bg-zinc-100 dark:bg-zinc-900/50 opacity-40 border-zinc-300 dark:border-zinc-800 cursor-not-allowed'
                      : 'bg-white dark:bg-zinc-800 border-black dark:border-zinc-700 cursor-pointer hover:translate-x-1'
                    } ${isVerifying ? 'ring-2 ring-primary animate-pulse' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 pixel-border flex items-center justify-center ${task.completed ? 'bg-primary' : 'bg-zinc-100 dark:bg-zinc-700'}`}>
                      <span className="material-symbols-outlined text-black dark:text-white text-sm">
                        {task.completed ? 'check' : task.icon}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm sm:text-xl font-bold uppercase leading-tight ${task.completed ? 'line-through opacity-50' : ''}`}>
                        {task.label}
                      </span>
                      {isVerifying && (
                        <span className="text-[9px] font-pixel text-primary">VERIFYING WITH X API...</span>
                      )}
                      {disabled && !task.completed && (
                        <span className="text-[8px] uppercase opacity-50 font-display font-bold">Quest Locked</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs sm:text-md font-bold ${task.completed ? 'text-zinc-400' : 'text-[#e67e51] dark:text-primary'}`}>
                      +{task.points} PTS
                    </span>
                  </div>
                </div>

                {activeInput === task.id && !task.completed && (
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-800 border-x-2 border-b-2 border-black dark:border-zinc-700 animate-in slide-in-from-top-2">
                    <input
                      className="pixel-input w-full bg-white dark:bg-zinc-900 border-none text-black dark:text-white py-2 px-3 text-xs mb-2 truncate"
                      placeholder={task.id === 1 ? "https://x.com/...status/..." : task.id === 5 ? "https://x.com/..." : "0x..."}
                      type="text"
                      value={task.id === 2 ? wallet : task.id === 3 ? referralWallet : task.id === 1 ? commentLink : tweetLink}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (task.id === 2) setWallet(v);
                        else if (task.id === 3) setReferralWallet(v);
                        else if (task.id === 1) setCommentLink(v);
                        else if (task.id === 5) setTweetLink(v);
                        setError('');
                      }}
                    />
                    <PixelButton onClick={() => handleInputSubmit(task.id)} className="w-full py-2 text-xs">
                      SUBMIT {task.id === 1 ? 'COMMENT LINK' : task.id === 5 ? 'LINK' : 'ADDRESS'}
                    </PixelButton>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <PixelCard className="w-full p-4 bg-white/50 dark:bg-zinc-900/50 border-dashed border-2 border-black dark:border-white mb-6">
          <h2 className="text-md sm:text-lg font-bold uppercase tracking-widest mb-4 text-center md:text-left">Final Entry</h2>
          <div className="space-y-4">
            <p className="text-xs opacity-60 text-center md:text-left">Complete all quests to unlock the entrance.</p>
            <div className="bg-primary/5 border-l-4 border-primary p-2 text-[8px] md:text-[9px] opacity-70 rounded">
              <p className="font-bold uppercase mb-1">⚠️ DISCLAIMER</p>
              <p>Points are for leaderboard ranking only. Not a financial instrument. Referral system is not MLM. See our Terms for details.</p>
            </div>
            {error && <p className="text-red-500 text-[10px] uppercase font-bold text-center">{error}</p>}
            <PixelButton
              onClick={handleJoin}
              disabled={!tasks.every(t => t.completed)}
              className="w-full py-3 text-xl shadow-lg"
            >
              ENTER EMPIRE
            </PixelButton>
          </div>
        </PixelCard>

        <footer className="mt-8 text-center opacity-40 uppercase tracking-widest font-bold text-[10px]">
          Points will be converted to legacy rewards in 2026
        </footer>
      </main>

      <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-white dark:bg-zinc-800 pixel-border p-2 shadow-2xl transition-transform hover:scale-110" onClick={onToggleDark}>
          <span className="material-symbols-outlined text-black dark:text-yellow-400 text-3xl">
            {isDark ? 'light_mode' : 'nights_stay'}
          </span>
        </button>
      </div>

      <style>{`
        @keyframes harvest-pop {
          0% { transform: translate(-50%, 0) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -40px) scale(1.5); opacity: 1; }
          100% { transform: translate(-50%, -80px) scale(1); opacity: 0; }
        }
        .animate-harvest-pop {
          animation: harvest-pop 2s forwards ease-out;
        }
      `}</style>
    </div>
  );
};
