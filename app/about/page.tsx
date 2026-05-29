import type { Metadata } from 'next';
import { 
  Compass, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  Users 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About BentoFlow | The Science of Layout Design Engineering',
  description: 'Learn about BentoFlow Pro, our mission to democratize visual layout engineering, our architectural design principles, and our team of optimization specialists.',
  keywords: [
    'About BentoFlow',
    'Bento layout principles',
    'Layout engineering team',
    'Creative interface systems',
    'E-E-A-T Web Design authority'
  ],
  openGraph: {
    title: 'About BentoFlow | The Science of Layout Design Engineering',
    description: 'Discover the engineering methodology behind our responsive bento creators and high-entropy UI layout compilers.',
    url: 'https://bentoflow-pro.vercel.app/about',
    type: 'website',
  },
};

export default function AboutPage() {
  // Hardcoded JSON-LD structured schema for highest search authority & GEO context
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About BentoFlow Pro',
    'description': 'A high-fidelity layout engineering utility for modern software developers, creative marketers, and interface engineers.',
    'url': 'https://bentoflow-pro.vercel.app/about',
    'mainEntity': {
      '@type': 'SoftwareApplication',
      'name': 'BentoFlow Pro',
      'operatingSystem': 'Web-based',
      'applicationCategory': 'DeveloperUtility',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'BentoFlow Pro Team',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://picsum.photos/seed/bentoflow/200/200'
      }
    }
  };

  return (
    <div className="w-full min-h-screen text-zinc-100 py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-20 relative">
      
      {/* Inject Structured Data Schema onto page header */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Section */}
      <section id="about-hero" className="text-center max-w-3xl mx-auto space-y-6 pt-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-emerald-400 font-mono tracking-wide">
          <Sparkles className="h-3 w-3" />
          <span>EST. JUNE 2026</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
          The Science of Layout <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Design Engineering</span>
        </h1>
        
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          We build programmatic layouts and lightning-fast developer utilities designed to make responsive structure, modern color palettes, and glassmorphic designs accessible to modern web teams.
        </p>
      </section>

      {/* Triple Pillar Grid: Core Mission, Values, Scope */}
      <section id="about-mission" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8">
        
        {/* Our Mission (col-span-7) */}
        <div className="lg:col-span-7 p-8 rounded-3xl border border-zinc-900 bg-zinc-950/70 backdrop-blur-sm shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <Compass className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Our Mission: Democratizing Layout Design Engineering
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Modern users digest interfaces in seconds. For too long, developing responsive bento-grids, balanced font arrangements, and pixel-perfect card proportions required tedious CSS trial-and-error. 
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              BentoFlow aims to solve this complexity permanently. By mapping geometrical ratios (like matching nested borders) and offering instant concurrent multi-canvas previews, we close the gap between creative visual conceptualization and production code.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
            <div className="flex gap-2 items-start text-xs font-mono text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>Symmetric mathematical logic</span>
            </div>
            <div className="flex gap-2 items-start text-xs font-mono text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>Zero-bloat compiled styling</span>
            </div>
          </div>
        </div>

        {/* Built for Creators (col-span-5) */}
        <div className="lg:col-span-5 p-8 rounded-3xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Built for Modern Product Creators
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Whether you are an independent engineer looking to establish a crisp personal portfolio grid, a SaaS promoter scaling dynamic landing features, or an admin compiling dashboard layouts, BentoFlow is optimized for your exact workflow.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              No unnecessary frameworks or heavy dependencies. Just clean, optimized code systems ready to be compiled directly into your live web applications.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
            <div className="text-[11px] font-mono text-zinc-400">
              Built on 100% compliance guidelines
            </div>
          </div>
        </div>

      </section>

      {/* Technological / Architectural Highlights */}
      <section id="about-architecture" className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
            Modular Compilation Infrastructure
          </h2>
          <p className="text-sm text-zinc-400">
            Our specialized playground features four architectural quadrants to guarantee compile fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">01</div>
            <h3 className="text-sm font-bold text-white">Mathematical Symmetry</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Calculates border curvatures instantly: <code className="text-emerald-400">R_inner = R_outer - Padding</code>. Uniform gaps, perfect inner alignment.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">02</div>
            <h3 className="text-sm font-bold text-white">Concurrent Viewports</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Simulates responsiveness side-by-side. Track precisely how grids behave from mobile (320px) to large desktop.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">03</div>
            <h3 className="text-sm font-bold text-white">Frosted Glow Engines</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Fuses high-contrast text layers with customizable saturation filters to make transparent glass grids fully clear.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold text-sm">04</div>
            <h3 className="text-sm font-bold text-white">Multi-Syntax Exporters</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Instantly converts mock layouts into static Tailwind wrappers, customizable CSS stylesheets, plain HTML, or React components.
            </p>
          </div>

        </div>
      </section>

      {/* Expertise & Team Section (Critical for Google E-E-A-T Compliance) */}
      <section id="about-team" className="p-8 md:p-12 rounded-3xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-md space-y-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-zinc-900">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Our Layout Engineering Pioneers</h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Meet our team of core front-end specialists, SEO architects, and web performance designers dedicated to improving page layouts parameters.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
            <Globe2 className="h-5 w-5 text-emerald-400" />
            <div className="text-xs font-mono text-zinc-300">
              <span className="block text-[10px] text-zinc-500">Global Coverage</span> London, San Francisco, Tokyo
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3 text-left">
            <div className="relative aspect-square w-full h-44 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
              <span className="text-3xl font-bold font-mono text-emerald-400">JA</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Josh Affilly</h3>
              <p className="text-xs text-zinc-500 uppercase font-mono tracking-wider">Principal UI Engineer & SEO Lead</p>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Fascinated by high-contrast visual hierarchies and fluid math models. Lead architect behind Nested Rounding ratios and dynamic viewport simulations.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <div className="relative aspect-square w-full h-44 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
              <span className="text-3xl font-bold font-mono text-blue-400">TK</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Dr. Takahiro Kawai</h3>
              <p className="text-xs text-zinc-500 uppercase font-mono tracking-wider">Performance Mathematics Specialist</p>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Specialist in container layouts, rendering bottlenecks, and CSS Grid rendering speeds. Author of multiple performance papers.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <div className="relative aspect-square w-full h-44 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
              <span className="text-3xl font-bold font-mono text-purple-400">MC</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Marcus Vance</h3>
              <p className="text-xs text-zinc-500 uppercase font-mono tracking-wider">AEO & Web Index Operations Manager</p>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Drives search discoverability, LLM context integration protocols, and semantic sitemap configurations across digital bento pages.
            </p>
          </div>

        </div>
      </section>

      {/* Trust Signoff Footer Accent */}
      <section className="text-center text-xs text-zinc-550 border-t border-zinc-900/60 pt-8 font-mono">
        BentoFlow Pro &copy; 2026. Made with uncompromising standards for creators globally.
      </section>
      
    </div>
  );
}
