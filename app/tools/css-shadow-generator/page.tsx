import React from 'react';
import { Metadata } from 'next';
import CssShadowGenerator from '../../../components/tools/CssShadowGenerator';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { Sparkles, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSS Custom Shadow Layering Tool | BentoFlow Developer Suite',
  description: 'Design ambient, multi-layered smooth box shadows for high-contrast bento cards. Fine-tune blur, spreads, overlays, and offsets with instant exports.',
  keywords: 'CSS multi-layered shadow generator, box shadow tool, premium tailwind outer glares maker, responsive grid bento cells elevations',
    openGraph: {
      title: 'CSS Custom Shadow Layering Tool | BentoFlow Developer Suite',
      description: 'Avoid harsh single box shadows by nesting up to six fine-tuned overlapping shadow stops.',
      type: 'website',
      url: 'https://bentoflow-pro.vercel.app/tools/css-shadow-generator'
    }
  };

  export default function Page() {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": "https://bentoflow-pro.vercel.app/tools/css-shadow-generator",
          "name": "CSS Custom Shadow Layering Tool",
          "url": "https://bentoflow-pro.vercel.app/tools/css-shadow-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Layer multiple drop shadow properties to achieve modern, ultra-soft elevated interfaces."
      },
      {
        "@type": "HowTo",
        "name": "How to Create Realistic Multi-Layer CSS Shadows",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Select a premade shadow configuration preset like Cyber Glimmer or Warm Floating."
          },
          {
            "@type": "HowToStep",
            "text": "Change the shadow dye base color using our fine-tuned hex picker."
          },
          {
            "@type": "HowToStep",
            "text": "Tweak individual shadow layers offsets, sizes, blur offsets, and opacity parameters."
          },
          {
            "@type": "HowToStep",
            "text": "Choose to export the compiled properties in HTML, Tailwind custom class arrays, or React Style blocks."
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
        
        {/* Title Heading info */}
        <div className="text-left max-w-3xl mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-medium font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Tactile Card Physics
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            CSS Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400">Shadow Layering Tool</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Eliminate dark, pixelated outlines. Blend overlapping translucent shadow elevations to produce realistic visual depth, high-fidelity card aesthetics, and soft outer glares.
          </p>
        </div>

        {/* Shadow Workspace Grid container section */}
        <div className="space-y-12">
          
          <CssShadowGenerator />

          {/* AEO Frequently Asked Questions */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Shadow Layering guidelines</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2 text-xs sm:text-sm">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Why does overlapping multiple shadows look better?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Single shadows create harsh, uniform borders that look synthetic. Real-world light diffuses slowly. Overlapping up to 5 translucent layers with incremented blurs emulates smooth, organic atmospheric drops.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do Horizontal and Vertical offsets behave?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Horizontal offsets shift your shadow left or right, simulating directional light. Vertical offsets nudge shadows down, creating elevations. Keeping horizontal offset minimal makes shadows look uniform and natural.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What is Spread distance?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Spread increases or decreases the size of the shadow envelope before blur is applied. For soft elevation effects, a slightly negative spread (like -3px or -6px) keeps shadows concentrated beneath the element edge.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How to use customized colors for shadows?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Instead of pure pitch black shadows, choosing a tinted color matching the card background background or a neon accent color (such as custom indigo or emerald) creates modern neon glows.
                </p>
              </div>
            </div>
          </div>

          {/* Infrastructure support options */}
          <ToolFooterContent />

        </div>

      </main>
    </div>
  );
}
