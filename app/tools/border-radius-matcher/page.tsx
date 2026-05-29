import React from 'react';
import { Metadata } from 'next';
import BorderRadiusMatcher from '../../../components/tools/BorderRadiusMatcher';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Calculator 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interactive Nested Border Radius Matcher & Calculator | BentoFlow',
  description: 'Perfect nested border-radius distortion with automated geometric calculations. Export clean Tailwind CSS classes matching standard guidelines.',
  keywords: 'Nested border radius calculator, inner padding rounding tool, tailwind uniform rounding calculator, developer tool',
  openGraph: {
    title: 'Interactive Nested Border Radius Matcher & Calculator | BentoFlow',
    description: 'Solve nested corner rounding gaps dynamically with geometric formulations to preserve uniform margins.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow-pro.vercel.app/tools/border-radius-matcher",
        "name": "Nested Border Radius Matcher",
        "url": "https://bentoflow-pro.vercel.app/tools/border-radius-matcher",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Perfect nested border-radius distortion with automated geometric calculations. Export clean Tailwind CSS classes matching standard guidelines."
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Nested corner roundings in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Identify standard parent outer cards border-radius (R_outer) using slider pixels."
          },
          {
            "@type": "HowToStep",
            "text": "Vary internal padding value sliders matching desired container layouts spacing."
          },
          {
            "@type": "HowToStep",
            "text": "Analyze calculated results on physical components side-by-side comparative models."
          },
          {
            "@type": "HowToStep",
            "text": "Export recommended tailor-made class strings directly into stylesheets."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-350 font-sans flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Header */}
        <div className="text-left max-w-3xl mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-medium font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Geometry Calibrator Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Nested Border <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Radius Matcher</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Eliminate nested element corner distortions instantly. Simply calibrate outer container radii and inner grid cell paddings to execute the precise math calculation formula: R_inner = R_outer - Padding.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <BorderRadiusMatcher />

          {/* AEO FAQ */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Guidelines & Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What is nesting border distortion?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  It occurs when parent container cards and nested child blocks specify identical border radii (e.g., rounded-3xl). The resulting inner boundary looks pinched and misaligned, creating uneven gaps.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How does the R_inner = R_outer - Padding math resolve this?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  By decreasing the inner elements corner radius exactly by the width of the gap, the geometric arcs remain parallel, guaranteeing perfectly uniform spacing all around the corners.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What happens on complex multi-nested elements?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  You simply perform the calculation sequentially for every layer: subtract each consecutive layer&apos;s internal padding from its parent&apos;s radius to establish the nested child&apos;s optimal radius.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Can I rely on default Tailwind roundings?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes. Our visual outputs display the closest corresponding responsive Tailwind rounded options (e.g., matching a child of parent rounded-3xl / p-4 down to rounded-xl).
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
