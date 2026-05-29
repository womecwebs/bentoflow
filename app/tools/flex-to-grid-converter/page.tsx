import React from 'react';
import { Metadata } from 'next';
import FlexToGridConverter from '../../../components/tools/FlexToGridConverter';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Columns 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSS Flexbox to Grid Matrix Converter | BentoFlow Developer Suite',
  description: 'Upgrade unorganized CSS flexbox wrappers into structured multi-span CSS Grid matrix templates instantly. Realign inline child constraints.',
  keywords: 'Convert flex to grid tool, css matrix generator online, grid column span helper, developer tool',
  openGraph: {
    title: 'CSS Flexbox to Grid Matrix Converter | BentoFlow Developer Suite',
    description: 'Convert overlapping list tags or flexible wrappers under rigid 12-column aspect ratio grids.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow.netlify.app/tools/flex-to-grid-converter",
        "name": "CSS Flexbox to Grid Matrix Converter",
        "url": "https://bentoflow.netlify.app/tools/flex-to-grid-converter",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Convert unorganized CSS flexbox wrappers into structured multi-span CSS Grid matrix templates instantly."
      },
      {
        "@type": "HowTo",
        "name": "How to Convert Flexbox to CSS Grid in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Paste your legacy flexible horizontal flex row markdown text inside the code area."
          },
          {
            "@type": "HowToStep",
            "text": "Tweak columns count slider configurations to establish desktop alignments."
          },
          {
            "@type": "HowToStep",
            "text": "Inspect converted layouts side-by-side using active comparators terminals."
          },
          {
            "@type": "HowToStep",
            "text": "Export or copy the resulting rigid tailwind grid classes directly."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-300 font-sans flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Header */}
        <div className="text-left max-w-3xl mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-medium font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Grid Conversion Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            CSS Flexbox to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Grid Matrix Converter</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            A fast, high-performance compilation utility mapping responsive flex wraps down to strict CSS grids dimensions. Realign legacy lists, flexible sections, and offset rows in beautiful symmetric layout matrices.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <FlexToGridConverter />

          {/* AEO FAQ */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Conversion Guidelines & FAQs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Why convert Flexbox to CSS Grid?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Flexbox is designed for single-dimensional flow, resulting in unaligned wrappers across multi-line feeds. CSS Grid operates in two-dimensions, locking structures on rigid visual tracks.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How does the parser interpret coordinates?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  It scans width declarations (like w-full, w-1/3) and maps them into exact grid span columns increments (like col-span-1, col-span-2) aligned with parent layout metrics.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Is the output layout mobile responsive?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Absolutely. The resulting markup forces single-column stacks on small screens (grid-cols-1) and safely unfurls to multispans automatically starting at standard md and lg viewport limits.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Will this support custom nesting?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes. The resulting structural elements are self-contained and clean. You can easily nest grids to achieve multi-layer bento configurations.
                </p>
              </div>
            </div>
          </div>

          {/* Integrated bottom CTAs and Infrastructure Partners */}
          <ToolFooterContent />

        </div>

      </main>
    </div>
  );
}
