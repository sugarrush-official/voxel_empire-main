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
              <p>We collect the following information:</p>
              <ul className="list-disc list-inside ml-2 space-y-1 opacity-80">
                <li>Ethereum wallet addresses (for verification)</li>
                <li>Social media task completion status</li>
                <li>Referral information (optional)</li>
                <li>Browser data via cookies/localStorage</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">2. DATA USAGE</h3>
              <p className="opacity-80">Your data is used to:</p>
              <ul className="list-disc list-inside ml-2 space-y-1 opacity-80">
                <li>Track your progress in the waitlist</li>
                <li>Calculate referral rewards</li>
                <li>Prevent duplicate entries</li>
                <li>Improve user experience</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">3. DATA STORAGE</h3>
              <p className="opacity-80">
                Your wallet address is stored in our Neon PostgreSQL database. We do not share your data with third parties without consent.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-primary uppercase mb-2">4. RETENTION</h3>
              <p className="opacity-80">
                Data is retained for the duration of the waitlist program and may be used for historical records.
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
