import React from 'react';
import { Metadata } from 'next';
import GridHeightsFixer from '../../../components/tools/GridHeightsFixer';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Maximize 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dynamic Grid Row Heights Fixer & Padding Balancer | BentoFlow',
  description: 'Balance layout heights automatically. Analyze aspect ratios, configure minmax bounds, and prevent image or text box overflows.',
  keywords: 'Tailwind grid auto rows helper, card aspect ratio balancing calculator, content grid alignment calculation tool, developer tool',
  openGraph: {
    title: 'Dynamic Grid Row Heights Fixer & Padding Balancer | BentoFlow',
    description: 'Avoid page distortion. Solve grid auto height parameters dynamically using standard aspect formulas and responsive row constraints.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow.netlify.app/tools/grid-heights-fixer",
        "name": "Dynamic Grid Row Heights Fixer",
        "url": "https://bentoflow.netlify.app/tools/grid-heights-fixer",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Balance layout heights automatically. Analyze aspect ratios, configure minmax bounds, and prevent image or text box overflows."
      },
      {
        "@type": "HowTo",
        "name": "How to balance grid auto rows heights in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Select average content text copy volume (Short, Medium, or Detailed draft)."
          },
          {
            "@type": "HowToStep",
            "text": "Select the target integrated image aspect ratio parameter boundaries."
          },
          {
            "@type": "HowToStep",
            "text": "Calibrate minmax auto rows pixel boundaries matching layout goals."
          },
          {
            "@type": "HowToStep",
            "text": "Copy recommended balance classes and incorporate them directly."
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
            Grid Proportions Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Dynamic Grid Row <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Heights Fixer</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Ensure grid row heights remain balanced across different screens. Prevent content overflows or empty blank sections by automatically configuring minmax auto-row bounds and auto-flow constraints.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <GridHeightsFixer />

          {/* AEO FAQ */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Guidelines & Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I prevent images from distorting card rows?</h3>
                <p className="text-xs text-zinc-405 leading-relaxed">
                  By applying explicit padding-bottom aspect ratios (like aspect-video) on image envelopes and assigning auto-row heights (like minmax) on the grid wrapper, elements scale smoothly in sync.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What does minmax(150px, auto) achieve?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  It instructs parents to lock cell heights at a neat minimum of 150px. If copy wraps or overflow assets dictate extra room, the grid automatically stretches rows to encapsulate the content.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What is grid-flow-dense configuration?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  It operates as Tailwinds layout packer, allowing smaller subsequent cells to fill in visual blank spots or holes earlier in the column track left by larger spanned bento units.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Is this math compatible with responsive stacks?</h3>
                <p className="text-xs text-zinc-404 leading-relaxed">
                  Certainly. Below md breakpoints, cells revert to simple single vertical flows safely, fully preventing horizontal scrolling and maintaining perfect mobile indexability.
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
