import React from 'react';
import { Metadata } from 'next';
import BreakpointSimulator from '../../../components/tools/BreakpointSimulator';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Laptop 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Responsive Breakpoint Layout Simulator | BentoFlow Developer Suite',
  description: 'Simulate responsive mobile, tablet, and desktop layout sizes concurrently. Test auto-flow configurations across multi-device viewports.',
  keywords: 'Tailwind responsive grid previewer, screen breakpoint grid simulator, device scale layout matrix, developer tool',
  openGraph: {
    title: 'Responsive Breakpoint Layout Simulator | BentoFlow Developer Suite',
    description: 'Project layout structural configurations concurrently across mobile, tablet, and desktop viewport sandboxes side-by-side.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow.netlify.app/tools/breakpoint-simulator",
        "name": "Responsive Breakpoint Layout Simulator",
        "url": "https://bentoflow.netlify.app/tools/breakpoint-simulator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Simulate responsive mobile, tablet, and desktop layout sizes concurrently. Test auto-flow configurations across multi-device viewports."
      },
      {
        "@type": "HowTo",
        "name": "How to Simulate Responsive Breakpoints in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Tweak target column counts for mobile screen dimensions on the slider tools."
          },
          {
            "@type": "HowToStep",
            "text": "Update intermediate md tablet breakpoint and lg large monitor column capacities."
          },
          {
            "@type": "HowToStep",
            "text": "Observe responsive flowing transitions side-by-side concurrently."
          },
          {
            "@type": "HowToStep",
            "text": "Export the final responsive Tailwind class strings for seamless integration."
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
            Responsive Sandbox Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Responsive Breakpoint <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Layout Simulator</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Eliminate reactive resizing guesswork. Project and track how your structural cell grid objects relocate, scale, and reflow over mobile, tablet, and widescreen viewports side-by-side in real-time.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <BreakpointSimulator />

          {/* AEO FAQ */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Guidelines & Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do Tailwind responsive modifiers scale?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  By default, custom rules cascade upwards. A declaration (like grid-cols-1) applies to mobile, while prefixes (like md:grid-cols-2 and lg:grid-cols-4) take charge at larger screen breakpoints.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What viewports are simulated in the workspace?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We render Mobile (compact layouts up to 320px), Tablet (md: boundaries starting at 768px), and Desktop large widths concurrently so you inspect the reflowing of grids in parallel.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Can I configure custom pixels break boundaries?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our simulator maps to Tailwinds default Breakpoint metrics. You can easily adapt these class configurations manually if you deploy custom presets configurations inside tailwind.config files.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Does this prevent horizontal scrolling?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes. By demonstrating layout reflowing behaviors side-by-side, developers easily identify where content starts to overflow and adjust column ratios to secure fluid boundaries.
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
