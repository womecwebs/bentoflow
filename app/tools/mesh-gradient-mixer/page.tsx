import React from 'react';
import { Metadata } from 'next';
import MeshGradientMixer from '../../../components/tools/MeshGradientMixer';
import ToolFooterContent from '../../../components/tools/ToolFooterContent';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowUpRight, 
  Palette 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSS Mesh Gradient Mixer | Premium Dark Glow Background Maker',
  description: 'Mix multiple radial coordinate lights into cohesive, gorgeous background glows designed for landing pages and portfolio screens.',
  keywords: 'Tailwind mesh gradient generator, dark dashboard glow css generator, ambient light background container, developer tool',
  openGraph: {
    title: 'CSS Mesh Gradient Mixer | Premium Dark Glow Background Maker',
    description: 'Calibrate fluorescent vector lighting coordinate anchors. Produce gorgeous dark atmospheric radial mesh gradients.',
    type: 'website',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://bentoflow.netlify.app/tools/mesh-gradient-mixer",
        "name": "Dark UI Mesh Gradient Background Mixer",
        "url": "https://bentoflow.netlify.app/tools/mesh-gradient-mixer",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": "Mix multiple radial coordinate lights into cohesive, gorgeous background glows designed for landing pages and portfolio screens."
      },
      {
        "@type": "HowTo",
        "name": "How to Mix Mesh Gradients in BentoFlow",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Select different glowing coordinate anchors inside the selector dashboard block."
          },
          {
            "@type": "HowToStep",
            "text": "Customize background HEX variables, sizes, and vector X/Y coordinates."
          },
          {
            "@type": "HowToStep",
            "text": "Analyze blending gradients outcomes over the simulated dark workspace canvas."
          },
          {
            "@type": "HowToStep",
            "text": "Export CSS stylesheet background-image directives with alpha coordinates."
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
            Atmosphere Artistry Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            CSS Mesh Gradient <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Background Mixer</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Construct immersive custom-seeded digital art mesh gradients. Position fluorescent spherical lighting anchors across precise coordinate directions to produce overlapping neon drop ambient glows optimized for dark-mode cards.
          </p>
        </div>

        {/* Global Layout (Full Width) */}
        <div className="space-y-12">
          
          <MeshGradientMixer />

          {/* AEO FAQ */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6 text-left font-sans">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
              <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Guidelines & Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do CSS mesh gradients compile?</h3>
                <p className="text-xs text-zinc-404 leading-relaxed">
                  We layer multiple circular radial-gradient declarations (with transparency adjustments) on a deep charcoal card background. This replicates state-of-the-art vector meshes smoothly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Are multiple radial gradients fast to paint?</h3>
                <p className="text-xs text-zinc-404 leading-relaxed">
                  Yes. Unlike large PNG or compressed JPEG mesh images which take significant bandwidth to load and can delay rendering, native CSS vectors load instantly in milliseconds.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">How do I position custom color coordinates?</h3>
                <p className="text-xs text-zinc-404 leading-relaxed">
                  Select a glow light index and slide coordinate controls (0% to 100%) to position the glowing sphere on the horizontal (X) and vertical (Y) vectors of the container canvas.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-zinc-200">Should I apply a glassmorphism filter?</h3>
                <p className="text-xs text-zinc-404 leading-relaxed">
                  Applying glassmorphism backdrop-blur constraints over these custom CSS mesh gradient backgrounds is a highly recommended practice to achieve smooth organic color blending.
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
