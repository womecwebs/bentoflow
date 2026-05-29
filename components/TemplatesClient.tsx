'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  LayoutGrid, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Code
} from 'lucide-react';
import { TEMPLATES, Template } from '@/data/templatesData';

export default function TemplatesClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Webpage Layouts', 'Portfolios', 'Software Graphics'];

  // Filter templates based on tag + search parameters
  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.longDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-12">
      
      {/* HEADER SECTION MATCHING THE SCREENSHOT EXACTLY */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4 pb-1 border-b border-zinc-900">
        <div className="flex flex-col gap-4 text-left max-w-2xl">
          {/* Marketplace green tag */}
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300">
            <Compass className="h-3.5 w-3.5 text-emerald-400" />
            Template Marketplace
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans leading-none">
            Bento Grid Templates.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans font-medium">
            Explore high-performance, production-ready layouts for your next project. From minimalist portfolios to complex SaaS dashboards.
          </p>
        </div>

        {/* Action Button & Search bar stacked */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:self-center">
          {/* Hire a Designer CTA Button from screenshot */}
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 text-xs font-bold transition-transform hover:scale-105"
          >
            Hire a Designer
            <ArrowRight className="h-3.5 w-3.5 text-zinc-950 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Search bar custom input */}
          <div className="relative min-w-[280px]">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-zinc-100 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 rounded-full px-4 py-3 pl-10 focus:border-zinc-700 focus:bg-zinc-950 focus:outline-none transition-all placeholder:text-zinc-500"
            />
          </div>
        </div>
      </div>

      {/* HORIZONTAL CATEGORY FILTER TABS FROM SCREENSHOT */}
      <div className="flex items-center justify-between border-b border-zinc-900/40 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  isActive
                    ? 'bg-emerald-500 border-emerald-400/30 text-zinc-950 font-bold shadow-lg shadow-emerald-500/10'
                    : 'bg-zinc-900/40 border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                {category === 'All' ? 'All' : category}
              </button>
            );
          })}
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-zinc-500 font-semibold uppercase">
          {filteredTemplates.length} matches found
        </span>
      </div>

      {/* ADVANCED ASSET DISPLAY GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div 
            key={template.slug}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-900 hover:border-zinc-800 bg-zinc-950/60 backdrop-blur-sm overflow-hidden hover:scale-[1.01] hover:shadow-2xl hover:shadow-emerald-500/3 duration-300 transition-all text-left"
          >
            {/* Visual Real Interactive Preview Wrapper */}
            <div className="p-4 bg-zinc-950/80 border-b border-zinc-900 relative aspect-video flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent z-10" />
              <div className="absolute inset-0 bg-grid-pattern-dense opacity-10" />
              <div className="absolute top-3 left-3 z-20">
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[9px] font-mono tracking-wide text-zinc-400">
                  {template.category}
                </span>
              </div>

              {/* In-Cell mini coordinates outline grid */}
              <div 
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: `repeat(${template.columns}, minmax(0, 1fr))`,
                  gap: '6px',
                }}
                className="w-full relative z-10 max-w-[90%] scale-[0.95] group-hover:scale-100 transition-transform duration-550"
              >
                {template.layoutState.map((cell) => (
                  <div
                    key={cell.id}
                    style={{ 
                      gridColumn: `span ${cell.colSpan}`, 
                      gridRow: `span ${cell.rowSpan}` 
                    }}
                    className={`h-9 sm:h-12 ${cell.bgClass} opacity-60 rounded-md border border-white/5 relative flex flex-col justify-between p-1`}
                  >
                    <span className="text-[7px] font-mono text-white/50 absolute bottom-1 left-1 font-bold">
                      {cell.colSpan}x{cell.rowSpan}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Template informational description panel */}
            <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {template.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {template.description}
                </p>
              </div>

              {/* Bottom footer linking natively to detail view */}
              <div className="flex items-center justify-between pt-5 mt-4 border-t border-zinc-900/60">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">
                    12-Column Base
                  </span>
                </div>

                <Link 
                  href={`/templates/${template.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-[11px] font-bold text-zinc-300 hover:text-white transition-all duration-200"
                >
                  Configure
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

          </div>
        ))}

        {/* Empty layout filter state */}
        {filteredTemplates.length === 0 && (
          <div className="col-span-full py-20 border border-dashed border-zinc-900 rounded-3xl flex flex-col items-center justify-center text-center gap-4">
            <span className="p-4 rounded-full bg-zinc-900 text-zinc-600 border border-zinc-850">
              <Compass className="h-8 w-8 animate-spin" />
            </span>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">No Templates Found</h4>
              <p className="text-xs text-zinc-500 max-w-sm">No matches found for &apos;{searchQuery}&apos; in {selectedCategory}. Try shifting your parameters.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
