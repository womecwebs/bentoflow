import type { Metadata } from 'next';
import { Suspense } from 'react';
import GeneratorWorkspace from '@/components/GeneratorWorkspace';

export const metadata: Metadata = {
  title: 'Free Tailwind Bento Grid Generator & Layout Builder | BentoFlow',
  description: 'Visually construct responsive bento box grid structures. Drag, resize, and export production-ready Tailwind utility code, clean React elements, or raw CSS grid models instantly.',
  keywords: [
    'bento grid generator',
    'tailwind grid builder',
    'css grid layout tool',
    'bento box layout code',
    'visual grid compiler'
  ],
  openGraph: {
    title: 'Free Tailwind Bento Grid Generator & Layout Builder | BentoFlow',
    description: 'Design and export production-ready Tailwind utility code, clean React elements, or raw CSS grid models instantly.',
    url: 'https://bentoflow.pro/generator',
    type: 'website',
  }
};

export default function GeneratorPage() {
  return (
    <div className="min-h-screen bg-zinc-950/20 py-8 sm:py-12 relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <header className="mb-8 space-y-1.5 border-b border-zinc-900 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3.5xl font-extrabold text-white tracking-tight">
                Visual Grid Workspace Engine
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Interact with composition blocks, configure column constraints, scale grids, and export beautiful clean code layouts.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span className="text-xs font-mono text-zinc-405 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-805">
                Engine v2.1 (Tailwind v4 Optimized)
              </span>
            </div>
          </div>
        </header>
        
        {/* Mount stateful layout engine component canvas */}
        <Suspense fallback={
          <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
            <span className="h-8 w-8 rounded-full border-2 border-zinc-800 border-t-emerald-400 animate-spin" />
            <span className="text-xs font-mono text-zinc-500">Initializing Core Workspace...</span>
          </div>
        }>
          <GeneratorWorkspace />
        </Suspense>
      </div>
    </div>
  );
}
