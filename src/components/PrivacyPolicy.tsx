import React from 'react';
import { PixelButton } from './PixelButton';
import { PixelCard } from './PixelCard';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <PixelCard className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 md:p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-4 pb-4 border-b-4 border-primary">
            <h2 className="text-2xl md:text-3xl font-pixel uppercase tracking-tighter text-black dark:text-white">
              Privacy Policy
            </h2>
            <button onClick={onClose} className="text-2xl font-bold text-black dark:text-white hover:scale-110">
              ✕
            </button>
          </div>

          <div className="space-y-4 text-sm md:text-base font-display text-black dark:text-white/90 leading-relaxed">
            <section>
              <h3 className="font-bold text-primary uppercase mb-2">1. DATA COLLECTION</h3>
              <p>We collect the following information to operate and improve the game:</p>
              <ul className="list-disc list-inside ml-2 space-y-1 opacity-80">
                <li>Wallet addresses (for account and reward mapping)</li>
                <li>Referral identifiers (when provided)</li>
                <li>Activity and gameplay metrics necessary for rewards</li>
                <li>Browser data (cookies) for session and preference management</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">2. DATA USAGE</h3>
              <p className="opacity-80">Your data is used to:</p>
              <ul className="list-disc list-inside ml-2 space-y-1 opacity-80">
                <li>Map and distribute in-game rewards correctly</li>
                <li>Calculate referral rewards when applicable</li>
                <li>Prevent duplicate or fraudulent activity</li>
                <li>Improve gameplay and user experience</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">3. DATA STORAGE</h3>
              <p className="opacity-80">
                Your wallet address and related account data are stored securely by our backend systems. We do not share personal data with third parties without consent, except where required by law.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">4. RETENTION</h3>
              <p className="opacity-80">
                We retain account and gameplay data as needed to support your experience and maintain accurate reward records. Data retention periods may vary and are kept only as long as necessary.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">5. YOUR RIGHTS</h3>
              <p className="opacity-80">
                You have the right to request deletion of your data at any time. Contact us via Twitter @voxelempire.
              </p>
            </section>

            <section className="bg-primary/10 border-2 border-primary p-3 rounded">
              <p className="text-xs opacity-70 italic">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-black dark:border-white">
            <PixelButton onClick={onClose} className="w-full py-3 text-lg">
              I UNDERSTAND
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};
