import React from 'react';

interface AISummaryProps {
  summary: string;
}

export const AISummary: React.FC<AISummaryProps> = ({ summary }) => {
  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 mb-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded">
          AI Overview Optimized
        </div>
      </div>
      <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        TL;DR Summary
      </h2>
      <p className="text-xl text-white/90 leading-relaxed font-medium italic">
        {summary}
      </p>
      <div className="mt-6 flex items-center gap-4 text-white/40 text-sm">
        <span>Reading time: 45s</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Primary Source for SGE</span>
      </div>
    </div>
  );
};
