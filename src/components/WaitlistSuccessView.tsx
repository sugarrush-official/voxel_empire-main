
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { PixelCard } from './PixelCard';
import { PixelButton } from './PixelButton';
import { PixelCharacter } from './PixelCharacter';
import * as htmlToImage from 'html-to-image';

interface WaitlistSuccessViewProps {
  onReturn: () => void;
  isDark: boolean;
  selectedPotion: any;
  userWallet: string;
  userPoints: number;
}

export const WaitlistSuccessView: React.FC<WaitlistSuccessViewProps> = ({ onReturn, isDark, selectedPotion, userWallet, userPoints }) => {
  const [activeTab, setActiveTab] = useState<'invite' | 'leaderboard'>('invite');
  const [showPassport, setShowPassport] = useState(false);
  const [referralCount, setReferralCount] = useState<number | null>(null);
  const passportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch(`/api/referrals?wallet=${userWallet}`);
        const data = await res.json();
        setReferralCount(data.referralCount);
        console.log('🔄 Referral count updated:', data.referralCount);
      } catch (err) {
        console.error('Failed to fetch referrals:', err);
      }
    };
    if (userWallet) {
      fetchReferrals();
      // Auto-refresh every 1 hour (3600000 ms)
      const interval = setInterval(fetchReferrals, 3600000);
      return () => clearInterval(interval);
    }
  }, [userWallet]);

  const randomID = useMemo(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `VX-${segment(2)}-${segment(4)}-${segment(1)}`;
  }, []);

  const handleDownload = async () => {
    if (passportRef.current === null) return;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const dataUrl = await htmlToImage.toPng(passportRef.current, {
        cacheBust: true,
        filter: (node) => {
          if (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet') {
            return (node as HTMLLinkElement).href.includes(window.location.origin);
          }
          return true;
        },
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `voxel-passport-${randomID}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert("Capture failed due to browser security restrictions on external fonts. Your ID has been copied to clipboard instead!");
      navigator.clipboard.writeText(randomID);
    }
  };

  const handleInvite = () => {
    const referralLink = `${window.location.origin}?ref=${userWallet}`;
    const tweetText = `I just completed my @voxelempire registration\njoin using my referral link ${referralLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
  };

  const copyRefLink = () => {
    const referralLink = `${window.location.origin}?ref=${userWallet}`;
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="text-black dark:text-white antialiased h-[100dvh] overflow-hidden transition-colors duration-0 p-4 md:p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl h-full flex flex-col gap-2 md:gap-4 overflow-hidden py-2">
        <header className="flex items-center justify-start w-full shrink-0">
          <button onClick={onReturn} className="flex size-8 md:size-10 items-center justify-center bg-white dark:bg-zinc-800 pixel-border-outer hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-lg md:text-xl text-black dark:text-white">home</span>
          </button>
        </header>

        <div className="flex w-full gap-2 shrink-0">
          <button onClick={() => setActiveTab('invite')} className={`flex-1 py-2 md:py-3 text-[9px] md:text-sm font-pixel uppercase pixel-border-outer transition-all leading-tight text-center flex items-center justify-center px-2 ${activeTab === 'invite' ? 'bg-primary text-black' : 'bg-white/50 dark:bg-zinc-800/50 text-black dark:text-white opacity-60'}`}>Progress</button>
          <button onClick={() => setActiveTab('leaderboard')} className={`flex-1 py-2 md:py-3 text-[9px] md:text-sm font-pixel uppercase pixel-border-outer transition-all leading-tight text-center flex items-center justify-center px-2 ${activeTab === 'leaderboard' ? 'bg-primary text-black' : 'bg-white/50 dark:bg-zinc-800/50 text-black dark:text-white opacity-60'}`}>Wallet</button>
        </div>

        <main className="w-full flex-1 overflow-hidden flex flex-col min-h-0">
          {activeTab === 'invite' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
              <PixelCard className="p-4 md:p-8 border-4 border-black dark:border-white bg-white/95 dark:bg-zinc-900/95 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.05)] flex-1 flex flex-col justify-center overflow-hidden">
                <h1 className="text-xl md:text-4xl font-pixel leading-tight mb-2 md:mb-4 tracking-tighter text-center shrink-0">
                  CONGRATS, FARMER!<br />
                  <span className="text-primary block mt-1" style={{ textShadow: "1.5px 1.5px 0px #000" }}>SPOT SECURED</span>
                </h1>
                <p className="text-sm md:text-xl font-display opacity-80 mb-4 md:mb-8 leading-tight text-center shrink-0 max-w-lg mx-auto">
                  You have been drafted into Voxel Valley. Your tools are sharp and your soil is ready.
                </p>

                <div className="flex justify-center mb-4 md:mb-8 shrink-0">
                  <div className="bg-primary/10 text-primary border-4 border-primary border-double px-6 py-4 text-sm md:text-2xl font-bold uppercase tracking-[0.2em] shadow-lg dark:shadow-primary/5">
                    Farmer ID: <span className="text-black dark:text-white ml-2">{randomID}</span>
                  </div>
                </div>

                <div className="p-4 md:p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-center bg-zinc-50 dark:bg-zinc-800/20 shrink-0 mb-4">
                  <p className="text-xs md:text-base font-bold mb-1 uppercase">🚀 Invite to rank up!</p>
                  <p className="text-[10px] md:text-xs opacity-60 mb-4 uppercase">
                    Your Recruits: <span className="text-primary font-bold">{referralCount !== null ? referralCount : '...'}</span>
                  </p>                  <p className="text-[8px] opacity-40 font-pixel uppercase tracking-widest mb-2">🔄 Updates Every 1 Hour</p>
                  <div className="bg-black/5 dark:bg-white/5 p-4 mb-4 text-left font-display text-xs md:text-sm space-y-1 border-l-4 border-primary">
                    <p>I just completed my @voxelempire registration</p>
                    <p>join using my referral link voxelempire.xyz</p>
                    <p className="text-primary font-bold">referral id: {userWallet}</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
                    <PixelButton onClick={handleInvite} className="flex-1 py-3 md:py-4 text-sm md:text-lg flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-md md:text-xl">share</span>
                      TWEET
                    </PixelButton>
                    <PixelButton variant="secondary" onClick={copyRefLink} className="flex-1 py-3 md:py-4 text-sm md:text-lg flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-md md:text-xl">content_copy</span>
                      COPY LINK
                    </PixelButton>
                  </div>
                </div>

                <div className="mt-4 md:mt-8 flex items-center justify-center gap-2 text-primary font-pixel text-[8px] md:text-[12px] opacity-70 shrink-0">
                  <span className="material-symbols-outlined text-base md:text-xl">payments</span>
                  HARVEST WEIGHT: {userPoints} PTS
                </div>
                <div onClick={() => setShowPassport(true)} className="mt-2 text-[8px] md:text-[10px] font-pixel text-zinc-400 hover:text-white cursor-pointer transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">badge</span>
                  VIEW PASSPORT
                </div>
              </PixelCard>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
              <PixelCard className="p-4 border-4 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900/90 shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden flex-1 flex flex-col min-h-0">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <img src="/Harvest BG.png" alt="Harvest Background" className="w-full h-full object-cover pixelated" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-6 pixel-border border-black flex flex-col items-center justify-center text-center w-full max-w-sm">
                    <span className="material-symbols-outlined text-6xl text-zinc-400 mb-4">lock</span>
                    <h3 className="text-lg md:text-xl font-pixel uppercase mb-4">Portal Locked</h3>
                    <p className="text-xs md:text-sm opacity-60 font-display mb-6">Wallet connection will be enabled during the main event.</p>
                    <div className="flex flex-col gap-3 w-full items-center">
                      <PixelButton disabled className="px-12 py-3 md:py-4 text-lg md:text-xl opacity-50 cursor-not-allowed w-full max-w-[280px]">CONNECT WALLET</PixelButton>
                      <PixelButton disabled className="px-12 py-3 md:py-4 text-lg md:text-xl opacity-50 cursor-not-allowed w-full max-w-[280px]" variant="secondary">CREATE WALLET</PixelButton>
                    </div>
                  </div>
                </div>
              </PixelCard>
            </div>
          )}
        </main>

        <footer className="mt-2 md:mt-4 text-center pb-4 shrink-0">
          <button onClick={onReturn} className="text-sm md:text-lg font-pixel text-black dark:text-white underline decoration-primary decoration-2 underline-offset-8 hover:text-primary transition-colors uppercase tracking-widest">Village Back</button>
        </footer>
      </div>

      {showPassport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowPassport(false)} />
          <div className="relative w-full max-w-sm md:max-w-md animate-in zoom-in-95 duration-300">
            <div ref={passportRef}>
              <PixelCard className="bg-[#f4e4bc] border-8 border-[#8b4513] shadow-2xl overflow-hidden p-0">
                <div className="bg-[#8b4513] p-4 text-center">
                  <h2 className="text-white font-pixel text-lg md:text-2xl tracking-[0.2em] uppercase">Voxel Valley Passport</h2>
                  <div className="text-[#f4e4bc] text-[8px] md:text-[10px] font-pixel opacity-70 mt-1 uppercase tracking-widest">Official Citizen Document</div>
                </div>
                <div className="p-6 flex flex-col items-center relative">
                  <div className="w-full flex gap-4 md:gap-6 items-start mb-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white flex items-center justify-center overflow-hidden border-4 border-[#8b4513] pixel-border">
                      {selectedPotion?.image ? (
                        <img src={selectedPotion.image} alt={selectedPotion.name} className="w-20 h-20 md:w-28 md:h-28 object-contain pixelated" />
                      ) : (
                        <PixelCharacter className="scale-[2] md:scale-[2.5]" direction="front" animation="idle" />
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="text-[#8b4513] text-[8px] font-pixel uppercase opacity-60">League</div>
                        <div className="text-black font-display font-bold text-lg leading-none uppercase">{selectedPotion?.name || 'FARMER'}</div>
                      </div>
                      <div>
                        <div className="text-[#8b4513] text-[8px] font-pixel uppercase opacity-60">Given Names</div>
                        <div className="text-black font-display font-bold text-lg leading-none uppercase">CITIZEN #892</div>
                      </div>
                      <div>
                        <div className="text-[#8b4513] text-[8px] font-pixel uppercase opacity-60">Nationality</div>
                        <div className="text-black font-display font-bold text-base leading-none uppercase">VOXEL EMPIRE</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-[#8b4513]/10 border-2 border-dashed border-[#8b4513] p-4 mb-6 text-center">
                    <div className="text-[#8b4513] text-[10px] font-pixel uppercase mb-2">Identification Number</div>
                    <div className="text-2xl md:text-3xl font-display font-black tracking-widest text-[#8b4513]">{randomID}</div>
                  </div>
                  <div className="absolute right-6 bottom-32 opacity-20 rotate-12 select-none pointer-events-none">
                    <div className="w-24 h-24 border-4 border-[#8b4513] rounded-full flex items-center justify-center flex-col text-[#8b4513] font-pixel">
                      <span className="text-[10px]">APPROVED</span>
                      <span className="text-[12px] font-bold">VALLEY</span>
                    </div>
                  </div>
                </div>
              </PixelCard>
            </div>
            <div className="mt-4 flex gap-2">
              <PixelButton className="flex-1 py-3 flex items-center justify-center gap-2" onClick={handleDownload}>
                <span className="material-symbols-outlined text-lg">download</span>
                DOWNLOAD ID
              </PixelButton>
              <PixelButton variant="secondary" className="px-6 py-3" onClick={() => setShowPassport(false)}>CLOSE</PixelButton>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoom-in-95 { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-in { animation-duration: 0.3s; animation-timing-function: ease-out; animation-fill-mode: forwards; }
        .fade-in { animation-name: fade-in; }
        .zoom-in-95 { animation-name: zoom-in-95; }
      `}</style>
    </div>
  );
};