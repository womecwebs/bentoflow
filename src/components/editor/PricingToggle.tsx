import React from 'react';
import { Lock, Unlock, Zap } from 'lucide-react';

interface PricingToggleProps {
  isPro: boolean;
  onToggle: () => void;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({ isPro, onToggle }) => {
  return (
    <div className="bg-white/5 p-1 rounded-xl flex items-center gap-1 border border-white/5">
      <button
        onClick={() => isPro && onToggle()}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-bold transition-all ${
          !isPro ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white/60'
        }`}
      >
        <Unlock size={14} />
        Free
      </button>
      <button
        onClick={() => !isPro && onToggle()}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-bold transition-all ${
          isPro ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-white/40 hover:text-white/60'
        }`}
      >
        <Zap size={14} />
        Pro
      </button>
    </div>
  );
};
