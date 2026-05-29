import React from 'react';
import { Metadata } from 'next';
import ColorPaletteExplorer from '../../../components/tools/ColorPaletteExplorer';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Palette 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Color Palette Grid Explorer | BentoFlow Developer Suite',
  description: 'Build premium contrasting color palettes and test theme mappings on active five-box bento preview components in real-time.',
  keywords: 'Tailwind color scheme previewer, interactive palette dashboard design, theme layout color picker, developer tool',
  openGraph: {
    title: 'Color Palette Grid Explorer | BentoFlow Developer Suite',
    description: 'Calibrate complementary contrasts, background alphas, and glowing border hues over mock portfolio dashboard matrices.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow.netlify.app/tools/color-palette-explorer",
        "name": "Color Palette Grid Explorer",
        "url": "https://bentoflow.netlify.app/tools/color-palette-explorer",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Build premium contrasting color palettes and test theme mappings on active five-box bento preview components in real-time."
      },
      {
        "@type": "HowTo",
        "name": "How to Map Color Palettes in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Select one of the modern seed palette sets or trigger the randomizer engine."
          },
          {
            "@type": "HowToStep",
            "text": "Tweak the HEX variables under the accent, border, and canvas background fields."
          },
          {
            "@type": "HowToStep",
            "text": "Inspect contrast parameters directly inside our live asymmetric 5-box preview dashboard block."
          },
          {
            "@type": "HowToStep",
            "text": "Export and integrate the compiled tailwind.config extended color theme objects safely."
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
            Theme Color Explorer
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Color Palette <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Grid Explorer</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Create harmonious dynamic color palettes and map hex tokens directly across realistic card elements before extending configurations. Ensure visual parity and indexable contrast compliance automatically.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <ColorPaletteExplorer />

          {/* AEO FAQ */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Theme Mapping Guidelines & FAQs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I test background/foreground contrast?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our mock dashboard renders active elements like labels, body articles, and CTAs utilizing your hex code coordinates, enabling live tests of text legibility profiles.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">What is the advantage of Tailwind extend config?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  By extending names (like bento-primary, bento-border) instead of overwriting, you retain all default utility classes while securing unified brand accents.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Are these themes WCAG contrast friendly?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes. The seed presets utilize deep black and dark gray coordinates paired with high-chroma glows, easily passing standardized AA readability guidelines.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Can I configure linear gradients too?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Naturally. The output displays the raw coordinates. You can easily feed these tokens directly into backdrop gradient parameters.
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
