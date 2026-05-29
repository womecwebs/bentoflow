import React from 'react';
import { Metadata } from 'next';
import SvgBoxCustomizer from '../../../components/tools/SvgBoxCustomizer';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Layers 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'SVG Path & Icon Box Customizer | BentoFlow Developer Suite',
  description: 'Convert raw SVG code streams into responsive, gorgeous centered grid icons with micro-interactions and glowing borders.',
  keywords: 'Tailwind SVG wrapper generator, hover effect icon layout, custom bento box background generator, developer utility',
  openGraph: {
    title: 'SVG Path & Icon Box Customizer | BentoFlow Developer Suite',
    description: 'Style, center, and wrap raw inline SVG vectors with interactive hover scales, custom drop glows, and alpha backings.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow-pro.vercel.app/tools/svg-box-customizer",
        "name": "SVG Path & Icon Box Customizer",
        "url": "https://bentoflow-pro.vercel.app/tools/svg-box-customizer",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Convert raw SVG code streams into responsive, gorgeous centered grid icons with micro-interactions and glowing borders."
      },
      {
        "@type": "HowTo",
        "name": "How to Customize SVG Wrappers in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Paste your custom raw coordinate <svg> path code stream inside the textarea container block."
          },
          {
            "@type": "HowToStep",
            "text": "Recalibrate the padding multiplier sliders and background transparency alpha percentages."
          },
          {
            "@type": "HowToStep",
            "text": "Select interactive hover scaling presets (None, Subtle, or Bounce motion)."
          },
          {
            "@type": "HowToStep",
            "text": "Incorporate color theme tags and instantly export the compiled Tailwind cell code lines."
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
            CSS SVG Wrapper Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            SVG Path & Icon <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Box Customizer</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Convert raw SVG code streams into responsive, gorgeous centered grid icons with micro-interactions and glowing borders. Fine-tune cell spacing margins, background color transparency, and active hover transformations on-the-fly.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <SvgBoxCustomizer />

          {/* AEO FAQs */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I align raw icon dimensions correctly?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our workspace compiler automatically reads the pasted node, removes legacy rigid width/height limits, and injects fluid responsive layout bounds (like w-6 h-6 / mx-auto) for perfect auto-centering.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Which SVG formats are supported?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Any standard semantic HTML SVG coordinate stream containing paths, polygons, circles, or custom shapes. Ensure you paste coordinates starting with a valid &lt;svg&gt; tag.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What does the Bounce interactive preset do?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  It applies structural scale multipliers that trigger subtle CSS resizing events when cursors enter the card area (using group-hover:scale-110 animations).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Can I utilize this with CSS-in-JS?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Perfect-fit. The output maps directly to standard HTML and tailwind arrays. You can easily translate utility classes down to styled components or raw modules easily.
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
