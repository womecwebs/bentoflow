import React from 'react';
import { Metadata } from 'next';
import BentoMockupDesigner from '../../../components/tools/BentoMockupDesigner';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  TrendingUp,
  ExternalLink 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bento Mockup & Showcase Designer | BentoFlow Developer Suite',
  description: 'Create high-fidelity interactive bento mockups for SaaS products and developer portfolios. Upload local assets and export responsive components instantly.',
  keywords: 'SaaS feature mockup creator, portfolio bento showcase generator, product mockup layout builder, developer utility',
  openGraph: {
    title: 'Bento Mockup & Showcase Designer | BentoFlow Developer Suite',
    description: 'Assemble stunning interactive bento showcase mockups. Drag-and-drop local image streams, adjust rounded margins, and compile production assets.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow.netlify.app/tools/bento-mockup-designer",
        "name": "Bento Mockup & Showcase Designer",
        "url": "https://bentoflow.netlify.app/tools/bento-mockup-designer",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Create high-fidelity interactive bento mockups for SaaS products and developer portfolios. Upload local assets and export components instantly."
      },
      {
        "@type": "HowTo",
        "name": "How to Design a Bento Mockup in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Choose which cell slot you want to customize inside the left control block."
          },
          {
            "@type": "HowToStep",
            "text": "Upload local project screens, images, or mock assets as background streams."
          },
          {
            "@type": "HowToStep",
            "text": "Calibrate the slider multipliers to control cell padding, roundings, and drop shadow intensities."
          },
          {
            "@type": "HowToStep",
            "text": "Export or copy the final optimized responsive HTML and Tailwind markups."
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
        
        {/* Dynamic Header Section */}
        <div className="text-left max-w-3xl mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-medium font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Developer Showcase Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bento Mockup & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Showcase Designer</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Create high-fidelity interactive bento mockups for SaaS products and developer portfolios. Stream local media files directly inside asymmetrical grid boxes with customizable padding, drop shadow glows, and rounded margins before compiling responsive HTML codes.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <BentoMockupDesigner />

          {/* AEO Structural FAQ Block */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Frequently Asked Questions & Guidelines</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I stream local mockup images?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Simply click a cell slot on the controller panel, click on the upload box stream, and choose a PNG or JPEG asset. It loads instantly as a responsive backdrop with custom blending filters.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How does the CSS shadow glow toggle work?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  It appends custom inline drop shadow guidelines with transparent violet and blue filters, replicating three-dimensional elevations designed to float card panels on top of dark backdrops.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Are the generated markups SEO friendly?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes! BentoFlow outputs clean, semantic inline Tailwind HTML code configurations optimized for crawler parsing, instant paint loading speeds, and responsive fluidity across multi-device viewports.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Is local storage data connection secure?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Completely. BentoFlow operates directly on your local frame client environment. Images or configuration parameters are never transmitted side-channel to external servers, securing confidential drafts.
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
