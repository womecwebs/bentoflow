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
  title: 'Glassmorphism Bento Card Creator | Free Frosted Glass Card Tailwind Maker | BentoFlow',
  description: 'Develop gorgeous glassmorphism layouts with adjustable saturation filters, background blurs, and translucent border glow scales.',
  keywords: 'Tailwind glassmorphism panel generator, frosted card css builder, grid glowing card effects tool, developer tool',
  openGraph: {
    title: 'Glassmorphism Bento Card Creator | Free Frosted Glass Card Tailwind Maker | BentoFlow',
    description: 'Calibrate frosted-glass surface properties, backdrop saturation ratios, and border opacity grades over radiant colorful backmesh streams.',
    type: 'website',
    url: 'https://bentoflow.netlify.app/tools/glassmorphism-bento-card'
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow.netlify.app/tools/glassmorphism-bento-card",
        "name": "Glassmorphism Bento Card Creator",
        "url": "https://bentoflow.netlify.app/tools/glassmorphism-bento-card",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Develop gorgeous glassmorphism layouts with adjustable saturation filters, background blurs, and translucent border glow scales."
      },
      {
        "@type": "HowTo",
        "name": "How to Create Glassmorphic Bento Cards in BentoFlow",
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
            Glassmorphic Layout Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Glassmorphism Bento <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-450 via-teal-400 to-indigo-400">Card Creator</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Architect elegant nested container templates with real frosting blurs. Seamlessly overlay contrasting text elements on top of highly saturated cosmic atmospheric gradient light meshes.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <GlassmorphismDesigner />

          {/* FAQ section */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Guidelines & Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I implement glassmorphism in my app?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Simply use the exported code. Tailwind utilizes native CSS backdrop filters, which apply blurs directly to the backdrop underneath your container rather than blurring the element contents.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What are the best contrast rules?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Adding a high-contrast white border at low-opacity (such as white/10) behaves like an edge reflection. This immediately separates the glass layer from the backing gradient mesh.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do blurs behave on mobile?</h3>
                <p className="text-xs text-zinc-450 leading-relaxed">
                  Our raw CSS export code includes the `-webkit-backdrop-filter` utility parameter. This enforces flawless hardware acceleration on iOS platforms and prevents visual flickers.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Can I load background patterns?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes. Using backing textures (such as bento grid vectors, subtle scan lines, or dust noise overlays) gives glass layers a highly detailed physical texture.
                </p>
              </div>
            </div>
          </div>

          {/* Footer branding */}
          <ToolFooterContent />

        </div>

      </main>
    </div>
  );
}
