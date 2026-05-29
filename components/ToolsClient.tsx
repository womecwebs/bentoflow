'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Image, 
  Grid, 
  Layers, 
  Compass, 
  Feather, 
  Maximize, 
  Cpu, 
  Sliders, 
  Smartphone, 
  Palette, 
  Layout, 
  Search, 
  ArrowRight,
  Monitor,
  CheckCircle,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { TOOLS, TOOLS_CATEGORIES, DeveloperTool } from '@/data/toolsData';

// Dynamic icon resolver helper
const getToolIcon = (name: string, colorClass: string) => {
  const props = { className: `h-5 w-5 ${colorClass}` };
  switch (name) {
    // eslint-disable-next-line jsx-a11y/alt-text
    case 'Image': return <Image {...props} />;
    case 'Grid': return <Grid {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Compass': return <Compass {...props} />;
    case 'Feather': return <Feather {...props} />;
    case 'Maximize': return <Maximize {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Sliders': return <Sliders {...props} />;
    case 'Smartphone': return <Smartphone {...props} />;
    case 'Palette': return <Palette {...props} />;
    case 'Layout': return <Layout {...props} />;
    default: return <WrenchIcon {...props} />;
  }
};

const WrenchIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
);

export default function ToolsClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All Utilities');
  const [activeFramework, setActiveFramework] = useState<'all' | 'tailwind' | 'css'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter tools
  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = activeCategory === 'All Utilities' || tool.category === activeCategory;
    const matchesFramework = activeFramework === 'all' || tool.framework === activeFramework;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFramework && matchesSearch;
  });

  // Get color schemes dynamically based on category for screenshot accuracy
  const getIconBgClass = (category: string) => {
    switch (category) {
      case 'HTML & CSS': return { bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400', color: 'text-blue-400' };
      case 'Grid Layout': return { bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', color: 'text-emerald-400' };
      case 'Glassmorphism UI': return { bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400', color: 'text-purple-400' };
      case 'CSS Shadow': return { bg: 'bg-amber-500/10 border-amber-500/20 text-amber-405', color: 'text-amber-450' };
      case 'CSS Gradient': return { bg: 'bg-pink-500/10 border-pink-500/20 text-pink-400', color: 'text-pink-400' };
      case 'Bento Tailwind': return { bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400', color: 'text-cyan-400' };
      case 'iOS Control': return { bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400', color: 'text-indigo-400' };
      default: return { bg: 'bg-zinc-800 border-zinc-700 text-zinc-100', color: 'text-zinc-105' };
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* LEFT NAVIGATION COLUMN: SIDEBAR SUITE MENU (REPLICATES SCREENSHOT EXACTLY) */}
      <aside className="lg:col-span-3 flex flex-col gap-6 lg:sticky lg:top-24">
        
        {/* Brand/Suite identity header card */}
        <div className="flex items-center gap-3.5 p-4 rounded-xl border border-zinc-900 bg-zinc-950/80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Cpu className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white tracking-tight leading-tight">Utility Suite</h3>
            <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-zinc-500">
              BentoFlow Pro
            </span>
          </div>
        </div>

        {/* View All Tools Primary State triggers */}
        <button
          onClick={() => {
            setActiveCategory('All Utilities');
            setActiveFramework('all');
            setSearchQuery('');
          }}
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-200 ${
            activeCategory === 'All Utilities' && activeFramework === 'all' && searchQuery === ''
              ? 'bg-emerald-500 border-emerald-400/30 text-zinc-950'
              : 'bg-zinc-900/40 hover:bg-zinc-900 border-zinc-850 text-zinc-300 hover:text-white'
          }`}
        >
          <Compass className="h-4 w-4 shrink-0" />
          View All Utilities
        </button>

        {/* Category lists styled accurately like sidebar */}
        <div className="hidden lg:flex flex-col rounded-xl border border-zinc-900 bg-zinc-950/30 p-2 text-left">
          <div className="px-3.5 py-2.5">
            <span className="text-[10px] font-mono tracking-widest font-bold text-zinc-550 uppercase">
              Filter Categories
            </span>
          </div>

          <div className="space-y-1">
            {TOOLS_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all text-left ${
                    isActive 
                      ? 'bg-zinc-900 text-white font-bold border-l-2 border-emerald-400 pl-3' 
                      : 'text-zinc-400 hover:bg-zinc-950 hover:text-white border-l-2 border-transparent'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-zinc-950 text-emerald-400 border border-zinc-800' : 'bg-zinc-950 text-zinc-655'
                  }`}>
                    {cat === 'All Utilities' 
                      ? TOOLS.length 
                      : TOOLS.filter(t => t.category === cat).length
                    }
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile quick list for smaller screens */}
        <div className="flex lg:hidden overflow-x-auto pb-2 gap-2 scrollbar-none">
          {TOOLS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-full whitespace-nowrap text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-zinc-900 border-zinc-800 text-white font-bold'
                  : 'bg-zinc-950/40 border-zinc-900 text-zinc-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </aside>

      {/* RIGHT WORKSPACE AREA: DYNAMIC HEADER & TOOLS GRID SYSTEM */}
      <main className="lg:col-span-9 space-y-8">
        
        {/* HEADER AREA REPLICATED EXACTLY */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-900 text-left">
          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-none">
              Developer Tools Suite
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
              Explore our collection of specialized bento and UI utilities to accelerate your development workflow.
            </p>
          </div>

          {/* Quick Platform Filter Selector matching the "Tailwind | CSS | Bootstrap" style */}
          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-900 p-1 rounded-xl shrink-0 self-start md:self-center">
            <button
              onClick={() => setActiveFramework('all')}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition-colors ${
                activeFramework === 'all' ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Platforms
            </button>
            <button
              onClick={() => setActiveFramework('tailwind')}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition-colors ${
                activeFramework === 'tailwind' ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Tailwind
            </button>
            <button
              onClick={() => setActiveFramework('css')}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition-colors ${
                activeFramework === 'css' ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              CSS Only
            </button>
          </div>
        </div>

        {/* SEARCH AND META COUNT COMPONENT */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search utility tools by keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-zinc-100 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-850 rounded-lg px-4 py-3 pl-10 focus:border-zinc-700 focus:bg-zinc-950 focus:outline-none transition-all placeholder:text-zinc-500"
            />
          </div>

          <span className="text-[11px] font-mono text-zinc-500 uppercase font-semibold text-right">
            Showing {filteredTools.length} indexable modules
          </span>
        </div>

        {/* THE LOOPING BENTO TOOL CARDS GRID (SQUARE ASPECT RATIO, GLOWING BORDERS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const styles = getIconBgClass(tool.category);
            return (
              <div
                key={tool.slug}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-950/80 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden text-left"
              >
                {/* Visual grid bg lines accent */}
                <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.05] pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Styled Rounded Icon Frame from screenshot */}
                  <div className={`p-3.5 rounded-xl border w-fit ${styles.bg}`}>
                    {getToolIcon(tool.iconName, styles.color)}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#22c55e]">
                      {tool.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Bottom link bar resembling actual screenshot workflow ("Open Tool ->") */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-900/60 relative z-10">
                  <span className="text-[9px] font-mono text-zinc-550 uppercase font-bold tracking-wider">
                    {tool.framework} utility
                  </span>

                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors"
                  >
                    Open Tool
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

              </div>
            );
          })}

          {/* Missing query layout */}
          {filteredTools.length === 0 && (
            <div className="col-span-full py-20 border border-dashed border-zinc-900 rounded-2xl flex flex-col items-center justify-center text-center gap-4 bg-zinc-950/20">
              <span className="h-10 w-10 rounded-full bg-zinc-900 text-zinc-500 flex items-center justify-center font-mono">
                ?
              </span>
              <div>
                <h4 className="text-sm font-semibold text-white">No Utilities Match Target Filters</h4>
                <p className="text-xs text-zinc-500 max-w-sm mt-1">
                  We currently support 40+ indexable micro utilities. Shifting your category filters can uncover more tools.
                </p>
              </div>
            </div>
          )}
        </div>

      </main>

    </div>
  );
}
