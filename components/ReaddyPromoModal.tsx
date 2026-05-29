'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Cpu, X, Flame, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export default function ReaddyPromoModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if modal has already been shown in this browser session
    const hasShown = localStorage.getItem('readdy_promo_shown');
    if (hasShown === 'true') return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem('readdy_promo_shown', 'true');
    }, 120000); // 120,000 milliseconds = 2 minutes

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-xl p-8 rounded-3xl border border-zinc-900 bg-gradient-to-br from-zinc-950 via-zinc-950 to-purple-950/20 text-left shadow-2xl shadow-purple-500/10 space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-zinc-90 w-fit hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-70 transition-colors text-zinc-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Promo Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
          <Flame className="h-3.5 w-3.5 animate-pulse" />
          Neural Website Creation Promo
        </div>

        {/* Pitch content */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
            Create Full Web Apps <br />With Just Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">AI Prompts</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
            Need more than just dynamic bento cells? **Readdy.ai** lets you prompt, build, style, and deploy entire multi-page websites and high-end software solutions in minutes.
          </p>
        </div>

        {/* Key Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 text-zinc-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="text-xs font-medium">Auto-responsive Styles</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="text-xs font-medium">Text-to-Code Engines</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="text-xs font-medium">Instant Live Previews</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="text-xs font-medium">50% Off Partner Promo</span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-900/80">
          <Link
            href="/tools/ai-bento-builder"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 text-center rounded-xl bg-zinc-90 w-full hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-teal-400 transition-colors flex items-center justify-center gap-1.5"
          >
            <Cpu className="h-3.5 w-3.5 shrink-0" />
            Use AI Bento Builder
          </Link>
          <a
            href="https://readdy.ai/?via=joshua-eddy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-750 text-xs font-bold text-white hover:brightness-115 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/15"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300 shrink-0" />
            Use AI Website Builder
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </a>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setIsOpen(false)}
            className="text-[10px] text-zinc-550 hover:text-zinc-400 transition-colors underline bg-transparent border-0 outline-none"
          >
            Maybe later, standard tools are fine
          </button>
        </div>

      </div>
    </div>
  );
}
