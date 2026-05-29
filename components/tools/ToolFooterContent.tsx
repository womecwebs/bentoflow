'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Sparkles, 
  Cpu, 
  Database, 
  Globe, 
  Layers 
} from 'lucide-react';

export default function ToolFooterContent() {
  const partners = [
    {
      title: 'Hostinger Cloud Hosting',
      badge: 'Highly Recommended',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      description: 'Guaranteed 99.9% network uptime, automated global servers, and free SSL. Perfect for hosting lightning-fast indexable portfolios.',
      url: 'https://www.hostinger.com',
      cta: 'Access Coupon Code'
    },
    {
      title: 'Namecheap Domains',
      badge: 'Best Value',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      description: 'Secure premium .IO or .COM address registrations. Includes lifetime free Privacy Guard to protect your domain registry data.',
      url: 'https://www.namecheap.com',
      cta: 'Find Portfolio Name'
    },
    {
      title: 'Webflow Pro',
      badge: 'Creator Choice',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      description: 'Unify visual design layouts with optimized HTML code compilers. Drag-and-drop structural elements and build blogs instantly.',
      url: 'https://webflow.com',
      cta: 'Launch Visual Creator'
    }
  ];

  return (
    <div className="space-y-12 mt-12 pt-12 border-t border-zinc-900 font-sans text-left">
      
      {/* 1. DUAL BUTTON CTAS AS REQUESTED */}
      <div className="p-8 rounded-3xl border border-zinc-900 bg-gradient-to-br from-zinc-950 to-zinc-900/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            Supercharge Your Workflow with AI Creation
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Generate full bento layout templates, rich interactive portfolios, and complete multi-page websites in seconds using direct natural language prompts.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            href="/tools/ai-bento-builder"
            className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-bold text-emerald-400 transition-all flex items-center gap-2"
          >
            <Cpu className="h-4 w-4 text-emerald-400" />
            Use AI Bento Builder
          </Link>
          <a
            href="https://readdy.ai/?via=joshua-eddy"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-750 border border-purple-500/30 text-xs font-bold text-white hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/10"
          >
            <Sparkles className="h-4 w-4 text-amber-300 animate-bounce" />
            Use AI Website Builder (Readdy)
          </a>
        </div>
      </div>

      {/* 2. INFRASTRUCTURE PARTNERS SECTION */}
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-3">
          <span className="text-[10px] font-mono tracking-widest text-zinc-550 uppercase font-black">STABLE INFRASTRUCTURE PARTNERS</span>
          <h3 className="text-xl font-bold text-white mt-1">Deploy Your Newly Exported Bento layouts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((p, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-950/80 hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className={`inline-block px-2.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase border ${p.badgeColor}`}>
                  {p.badge}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {p.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-6 w-full text-center py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-xs text-zinc-300 font-bold block border border-zinc-800/80 transition-colors flex items-center justify-center gap-1"
              >
                {p.cta}
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
