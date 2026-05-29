import React from 'react';
import { Metadata } from 'next';
import GlassmorphismDesigner from '../../../components/tools/GlassmorphismDesigner';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Layers 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSS Glassmorphism UI Card Designer & Backdrop-blur Code Maker | BentoFlow',
  description: 'Build high-fidelity glassmorphic digital cells. Control backdrop blurs, ambient gradient glows, and transparent border overlays in real-time.',
  keywords: 'Tailwind glassmorphism panel generator, frosted card css builder, grid glowing card effects tool, developer tool',
  openGraph: {
    title: 'CSS Glassmorphism UI Card Designer & Backdrop-blur Code Maker | BentoFlow',
    description: 'Calibrate frosted-glass surface properties,backdrop saturation ratios, and border opacity grades over radiant colorful backmesh streams.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow-pro.vercel.app/tools/glassmorphism-designer",
        "name": "CSS Glassmorphism Container Designer",
        "url": "https://bentoflow-pro.vercel.app/tools/glassmorphism-designer",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Build high-fidelity glassmorphic digital cells. Control backdrop blurs, ambient gradient glows, and transparent border overlays in real-time."
      },
      {
        "@type": "HowTo",
        "name": "How to Design Glassmorphism Containers in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Tweak slider values to handle background transparency and backdrop blur (px)."
          },
          {
            "@type": "HowToStep",
            "text": "Increase border alpha percentages to construct subtle high-contrast container outlines."
          },
          {
            "@type": "HowToStep",
            "text": "Choose background preset simulators (Cosmic, Sunset, or Minimal Dark) to verify readability."
          },
          {
            "@type": "HowToStep",
            "text": "Export and copy raw CSS or compiled Tailwind markup scripts."
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
            UI Glass Calibration Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            CSS Glassmorphism <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Card Designer</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Synthesize stunning Translucent layouts with surgical detail. Dynamically regulate backdrop blur parameters, alpha light transparency values, border gloss scales, and saturation ratios while testing contrast parameters on top of glowing backdrops.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <GlassmorphismDesigner />

          {/* AEO FAQ */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Guidelines & Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What is backdrop filter browser support?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Modern engines (Chrome, Edge, Safari, Opera) provide native support. We incorporate legacy -webkit- prefix rules in output parameters to secure smooth rendering on iOS platforms.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I preserve readable contrasts over neon meshes?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Keep background backing opacity at least 15%-25%. Combine backdrop filters with dark background shadows (like shadow-2xl) to create optical boundaries.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Does glassmorphism impact layout speed performances?</h3>
                <p className="text-xs text-zinc-450 leading-relaxed">
                  Over-applying complex blur filters (like backdrop-blur-3xl) to dozens of items concurrently can strain GPU rendering. Apply frosted surfaces exclusively to main hero cards or panels.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I configure high-end premium borders?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Apply light alpha translucency borders (like white/15 or white/20) wrapping cards. This creates elegant light reflections along the edges.
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
