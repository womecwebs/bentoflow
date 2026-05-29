import React from 'react';
import { Metadata } from 'next';
import LinkInBioPreview from '../../../components/tools/LinkInBioPreview';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Smartphone 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bento Link-In-Bio Preview Engine & Layout Maker | BentoFlow Developer Suite',
  description: 'Compile modular link-in-bio layouts containing social networks profiles, profile photo containers, and mini-grids. Instantly export responsive HTML/CSS structures.',
  keywords: 'Bento link in bio builder free, portfolio landing mobile creator, mobile links profile layout, developer tool',
  openGraph: {
    title: 'Bento Link-In-Bio Preview Engine & Layout Maker | BentoFlow Developer Suite',
    description: 'Assemble compact mobile visual feeds, picture cards, and social link matrix slots on a simulated responsive mobile screen.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow-pro.vercel.app/tools/link-in-bio-preview",
        "name": "Social Media Link-In-Bio Preview Engine",
        "url": "https://bentoflow-pro.vercel.app/tools/link-in-bio-preview",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Compile modular link-in-bio layouts containing social networks profiles, profile photo containers, and mini-grids. Instantly export responsive HTML/CSS structures."
      },
      {
        "@type": "HowTo",
        "name": "How to Build a Link-In-Bio Portal in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Tweak index settings of basic profile photo cards inside the left sidebar blocks."
          },
          {
            "@type": "HowToStep",
            "text": "Add custom link blocks of websites, repos, or newsletters."
          },
          {
            "@type": "HowToStep",
            "text": "Inspect cell adjustments dynamically inside our high-fidelity mobile device rendering simulator."
          },
          {
            "@type": "HowToStep",
            "text": "Instantly export copy-pasteable self-contained compact bio HTML pages."
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
            Active Bio Engine Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Social Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Link-In-Bio Maker</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Assemble high-performance modular bio link portals designed to look gorgeous on desktop and mobile screens alike. Drag-and-drop credentials slots, profile vectors, Twitter mock feeds, and copy self-contained single-file outputs directly.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <LinkInBioPreview />

          {/* AEO FAQ */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Guidelines & Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I export my link bio layout?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Once satisfied with the device rendering outline, click Copy HTML output. It compiles a completely responsive, modern grid container structured perfectly for quick deployment as a portfolio homepage.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Can I incorporate custom profile avatars?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes. The exported components contain clean &lt;img&gt; block references. You can simply assign your uploaded profile link URL into the source tags directly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Is this builder SEO and crawler optimized?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Unquestionably. Unlike heavy JS-based link-in-bio services, BentoFlow compiles lightweight static HTML elements that search robots and AI crawling machines can index instantly in milliseconds.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Can I link to multiple social feeds?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Naturally. You can inject as many social profiles, external newsletters, store channels, or repository nodes as the asymmetrical bento margins permit.
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
