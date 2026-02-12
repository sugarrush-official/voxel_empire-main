import React from 'react';
import { PixelButton } from './PixelButton';
import { PixelCard } from './PixelCard';

interface TermsOfServiceProps {
  onClose: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <PixelCard className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 md:p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-4 pb-4 border-b-4 border-primary">
            <h2 className="text-2xl md:text-3xl font-pixel uppercase tracking-tighter text-black dark:text-white">
              Terms of Service
            </h2>
            <button onClick={onClose} className="text-2xl font-bold text-black dark:text-white hover:scale-110">
              ✕
            </button>
          </div>

          <div className="space-y-4 text-sm md:text-base font-display text-black dark:text-white/90 leading-relaxed">
            <section>
              <h3 className="font-bold text-primary uppercase mb-2">1. ACCEPTANCE OF TERMS</h3>
              <p className="opacity-80">
                By participating in Voxel Empire, you agree to these terms. If you do not agree, please do not use this service.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">2. GAMIFIED WAITLIST</h3>
              <p className="opacity-80">
                Voxel Empire is a <strong>gamified waitlist program</strong>. Points earned are <strong>not guaranteed rewards</strong> and do not represent financial compensation. Points are for leaderboard ranking only.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">3. NOT AN MLM</h3>
              <p className="opacity-80">
                The referral system is <strong>not a multi-level marketing scheme</strong>. You earn referral bonuses only when direct referrals complete their tasks. No income is guaranteed.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">4. WALLET VERIFICATION</h3>
              <p className="opacity-80">
                You must provide a valid Ethereum wallet address. We do not store private keys. You are responsible for wallet security.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">5. TASK COMPLIANCE</h3>
              <p className="opacity-80">
                Tasks require social media actions. You must follow all platform terms of service when completing tasks.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">6. NO LIABILITY</h3>
              <p className="opacity-80">
                Voxel Empire is provided "as-is" without warranties. We are not liable for lost data, technical issues, or missed rewards.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">7. PROGRAM CHANGES</h3>
              <p className="opacity-80">
                We reserve the right to modify or cancel the waitlist program at any time without notice.
              </p>
            </section>

            <section className="bg-field-green/10 border-2 border-field-green p-3 rounded">
              <p className="text-xs opacity-70 italic">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-black dark:border-white">
            <PixelButton onClick={onClose} className="w-full py-3 text-lg">
              I AGREE
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};
