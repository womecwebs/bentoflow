import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  LayoutGrid, 
  Layers, 
  Code2, 
  TrendingUp, 
  Users, 
  Smartphone,
  CheckCircle,
  Copy,
  Zap,
  ExternalLink,
  Laptop,
  Check,
  Briefcase,
  Layers3,
  Server,
  Globe,
  DollarSign
} from 'lucide-react';

export default function Home() {
  const currentYear = new Date().getFullYear();

  // Affiliate recommendations dataset
  const affiliateTools = [
    {
      title: 'Hostinger',
      description: 'Ultra-fast, fully-secured cloud hosting engineered for high-performance Next.js application deployments and blazing static templates.',
      badge: 'Hosting',
      link: 'https://hostinger.com',
      gradient: 'from-purple-500/10 to-blue-500/5',
      icon: Server,
      iconColor: 'text-purple-400',
    },
    {
      title: 'Webflow',
      description: 'Design and develop custom responsive websites with extreme visual freedom and clean, compliant semantic HTML code exports.',
      badge: 'Design',
      link: 'https://webflow.com',
      gradient: 'from-blue-500/10 to-cyan-500/5',
      icon: Laptop,
      iconColor: 'text-blue-400',
    },
    {
      title: 'Namecheap',
      description: 'Secure premium domain registration with lifetime privacy protection and lightning-fast developer custom DNS response rates.',
      badge: 'Domains',
      link: 'https://namecheap.com',
      gradient: 'from-pink-500/10 to-orange-500/5',
      icon: Globe,
      iconColor: 'text-pink-400',
    },
    {
      title: 'Vercel',
      description: 'Build, optimize, and scale production-ready Next.js, React, and Tailwind projects instantly on global serverless edge infrastructure.',
      badge: 'Deployment',
      link: 'https://vercel.com',
      gradient: 'from-emerald-500/10 to-teal-500/5',
      icon: Zap,
      iconColor: 'text-emerald-400',
    }
  ];

  const specialtyCards = [
    {
      title: 'Tailwind Generator',
      description: 'Utility-first grid classes.',
      href: '/generator',
    },
    {
      title: 'Shopify Liquid',
      description: 'Dynamic theme sections.',
      href: '/templates',
    },
    {
      title: 'React Factory',
      description: 'Type-safe components.',
      href: '/generator',
    },
    {
      title: 'iOS Style',
      description: 'Glassmorphism & Squircles.',
      href: '/templates',
    }
  ];

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 flex flex-col items-center">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pt-32 sm:pb-32 overflow-hidden text-center flex flex-col items-center gap-8 z-10">
        
        {/* Glowing visual backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80rem] h-[40rem] rounded-full bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl pointer-events-none -z-10" />

        {/* Dynamic visual badging stack */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 select-none mb-1">
          {/* Main platform badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm text-xs text-zinc-300 font-sans tracking-wide">
            <Zap className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold">
              Next-Gen Bento Grid Builder
            </span>
          </div>

          {/* Floated custom skewed green badge matching screenshots */}
          <div 
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 shadow-xl shadow-emerald-500/5 cursor-pointer transform rotate-1 sm:rotate-2 hover:scale-[1.02] transition-all duration-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Create a full website with AI website builder
          </div>
        </div>

        {/* Primary display heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7.5xl font-sans font-bold tracking-tight text-white leading-[1.05] max-w-5xl">
          Build Trendy Bento <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
            Grid Layouts
          </span> Instantly
        </h1>

        {/* Copywritten subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-3xl font-sans leading-relaxed">
          The ultimate SaaS platform for generating high-performance, accessible, and SEO-optimized Bento Grids for Tailwind CSS, Shopify, and Portfolios.
        </p>

        {/* High-conversion action trigger button layouts */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full sm:w-auto">
          <Link
            href="/generator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-zinc-950 text-sm font-semibold shadow-2xl transition-all hover:bg-zinc-200 active:scale-95"
          >
            Start Generating
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/templates"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-semibold text-zinc-100 shadow-xl transition-all hover:bg-zinc-800 hover:border-zinc-700 active:scale-95"
          >
            Explore Templates
          </Link>
        </div>

      </section>

      {/* SECTION 2: AI WEBSITE BUILDER (Screenshot 2) */}
      <section className="w-full border-t border-zinc-900/60 bg-zinc-950 py-20 sm:py-28 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block description details */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              AI Website Builder
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              Generate complete, multi-file websites in seconds. Our AI doesn&apos;t just write code; it crafts production-ready architectures with index.html, about.html, style.css, and script.js all perfectly synced.
            </p>
            
            <ul className="space-y-3.5 mt-2">
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-medium text-zinc-300">Multi-file project generation</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-medium text-zinc-300">Live real-time preview</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-medium text-zinc-300">One-click ZIP export</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-medium text-zinc-300">Clean, semantic code output</span>
              </li>
            </ul>

            <Link 
              href="/generator" 
              className="group inline-flex items-center gap-2 mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
            >
              Try the AI Builder
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Block graphic mockup of code framework */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-blue-500/5 to-transparent blur-2xl pointer-events-none" />
            <div className="relative border border-zinc-800/80 rounded-2xl bg-zinc-900/15 backdrop-blur-md p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-5 border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-zinc-800" />
                  <span className="h-3 w-3 rounded-full bg-zinc-800" />
                  <span className="h-3 w-3 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Workspace Active</span>
              </div>
              
              {/* Inner wireframe mockup visual representation */}
              <div className="space-y-4">
                <div className="h-8 rounded-lg bg-zinc-900/60 border border-zinc-800/40 flex items-center justify-between px-3 text-xs text-zinc-550">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded bg-emerald-500" />
                    <span className="font-mono text-[10px] text-zinc-400">index.html (compiled outputs)</span>
                  </div>
                  <span className="text-[9px] text-zinc-650">v4.1.2</span>
                </div>
                {/* Visual grid inside the mockup */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 h-24 rounded-lg bg-zinc-900/30 border border-zinc-800/30 p-3 flex flex-col justify-between">
                    <div className="w-12 h-2 rounded bg-zinc-800" />
                    <div className="space-y-1.5">
                      <div className="w-full h-1.5 rounded bg-zinc-900" />
                      <div className="w-2/3 h-1.5 rounded bg-zinc-900" />
                    </div>
                  </div>
                  <div className="col-span-1 h-24 rounded-lg bg-zinc-900/30 border border-zinc-800/30 p-3 flex flex-col justify-between">
                    <div className="w-8 h-2 rounded bg-zinc-850" />
                    <div className="h-6 w-full rounded bg-zinc-900/60" />
                  </div>
                </div>
                
                {/* Visual state selector representation */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="h-12 rounded-lg bg-zinc-900/20 border border-zinc-800/20" />
                  <div className="h-12 rounded-lg bg-zinc-900/20 border border-zinc-800/20" />
                  <div className="h-12 rounded-lg bg-zinc-900/20 border border-zinc-800/20" />
                  <div className="h-12 rounded-lg bg-zinc-900/20 border border-zinc-800/20" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: BENTO GRID EDITOR (Screenshot 3) */}
      <section className="w-full border-t border-zinc-900/60 bg-zinc-950 py-20 sm:py-28 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block Visual visual mockup representation */}
          <div className="lg:col-span-7 order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent blur-2xl pointer-events-none" />
            
            {/* Multi-layered Layout mockup boxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-44 rounded-2xl bg-zinc-900/15 border border-zinc-800/60 flex items-center justify-center relative group hover:border-blue-500/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col items-center gap-2">
                  <LayoutGrid className="h-8 w-8 text-blue-500/40 group-hover:text-blue-400 group-hover:scale-105 transition-all" />
                  <span className="text-[10px] font-mono text-zinc-500">grid_cell_01</span>
                </div>
              </div>
              <div className="h-44 rounded-2xl bg-zinc-900/15 border border-zinc-800/60 flex items-center justify-center relative">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-4 w-12 rounded bg-zinc-900/60 border border-zinc-800/30" />
                  <span className="text-[10px] font-mono text-zinc-650">grid_cell_02</span>
                </div>
              </div>
              <div className="h-44 rounded-2xl bg-zinc-900/15 border border-zinc-800/60 flex items-center justify-center relative">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-2 w-16 rounded bg-zinc-900/60 border border-zinc-800/30" />
                  <span className="text-[10px] font-mono text-zinc-650">grid_cell_03</span>
                </div>
              </div>
              <div className="h-44 rounded-2xl bg-zinc-950 border border-zinc-900/80 p-4 shrink-0 flex flex-col justify-end">
                <div className="text-[11px] font-mono text-zinc-400 bg-zinc-900/60 border border-zinc-800/50 p-2 rounded-lg">
                  <div>style: &quot;glassmorphism&quot;</div>
                  <div className="text-zinc-550">blur: 16px</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Block Content details text */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
              <LayoutGrid className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Bento Grid Editor
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              The most advanced visual editor for Bento layouts. Built on a precise 12-column system, it allows you to drag, resize, and style grid items with pixel-perfect accuracy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/10">
                <h4 className="text-xs font-semibold text-zinc-200 uppercase font-mono mb-1.5">12-Column Precision</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Standardized grid system for perfect alignment across all devices.</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/10">
                <h4 className="text-xs font-semibold text-zinc-200 uppercase font-mono mb-1.5">Visual Styling</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Adjust borders, shadows, and glassmorphism effects in real-time.</p>
              </div>
            </div>

            <Link 
              href="/generator" 
              className="group inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
            >
              Open the Editor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 4: MARKETPLACE COMMUNITY GRID (Screenshot 4) */}
      <section className="w-full border-t border-zinc-900/60 bg-zinc-950 py-20 sm:py-28 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block description details */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-xs text-zinc-300 font-sans">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Global Community
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
              Join a Thriving <br /> Design Marketplace.
            </h2>
            
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              BentoFlow Pro isn&apos;t just a tool; it&apos;s a community. Share your designs, get inspired by others, and even monetize your layouts through our integrated marketplace.
            </p>

            <div className="space-y-4.5 mt-2">
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Verified Creators</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Every template in our marketplace is vetted for quality and performance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Instant Remix</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Found a design you love? Remix it instantly and make it your own.</p>
                </div>
              </div>
            </div>

            <Link 
              href="/templates" 
              className="flex items-center justify-center self-start gap-1.5 rounded-full bg-emerald-500 text-zinc-950 px-6 py-3 text-xs font-bold transition-transform hover:scale-105 mt-4"
            >
              Explore the Community
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Right Block Community grid pictures layout */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="h-56 rounded-2xl bg-zinc-900/15 border border-zinc-850 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold text-white tracking-wide uppercase font-mono">Developer Portfolio</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="h-56 rounded-2xl bg-zinc-900/15 border border-zinc-850 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/10 via-purple-500/5 to-transparent blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold text-white tracking-wide uppercase font-mono">SaaS Dashboard</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="h-56 rounded-2xl bg-zinc-900/15 border border-zinc-850 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-emerald-500/5 to-transparent blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold text-white tracking-wide uppercase font-mono">Minimal Link-in-Bio</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="h-56 rounded-2xl bg-zinc-900/15 border border-zinc-850 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-pink-500/5 to-transparent blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold text-white tracking-wide uppercase font-mono">Showcase Presets</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: SECONDARY AFFILIATE & SPECIALTY TOOLS (Screenshot 6 + 7) */}
      <section className="w-full border-t border-zinc-900/65 bg-zinc-950/40 py-20 sm:py-28 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white mb-3">
            Marketplace & Specialized Tools
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mb-16Leading-relaxed">
            Access a library of premium templates and specialized generators for every platform.
          </p>

          {/* Double Column Feature Containers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-16">
            
            {/* Box 1: Template Marketplace */}
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/10 backdrop-blur-sm hover:border-zinc-700/60 transition-all text-left flex flex-col justify-between group">
              <div>
                <span className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 block mb-6">
                  <Briefcase className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">Template Marketplace</h3>
                <p className="text-xs sm:text-sm text-zinc-450 leading-relaxed mb-6">
                  Browse through dozens of free and premium Bento templates. From personal portfolios to high-converting SaaS landing pages, find the perfect starting point for your project.
                </p>
              </div>
              <Link 
                href="/templates"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Explore Marketplace <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Box 2: Developer Tools */}
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/10 backdrop-blur-sm hover:border-zinc-700/60 transition-all text-left flex flex-col justify-between group">
              <div>
                <span className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/15 block mb-6">
                  <Layers3 className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">Developer Tools</h3>
                <p className="text-xs sm:text-sm text-zinc-455 leading-relaxed mb-6">
                  Specialized generators for Tailwind CSS, Shopify Liquid, and React. Export clean, production-ready code that integrates seamlessly with your existing tech stack.
                </p>
              </div>
              <Link 
                href="/generator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                View All Tools <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

          </div>

          {/* Sub-head Featured Tools */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full max-w-5xl border-b border-zinc-900 pb-5 mb-8 text-left">
            <div>
              <h3 className="text-xl font-bold font-sans text-white mb-1">Featured Tools</h3>
              <p className="text-xs text-zinc-500">Specialized generators for your specific platform.</p>
            </div>
            <Link href="/templates" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mt-3 sm:mt-0">
              View All Tools <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* 4 Block Specialty Quick Launch Link grids (Screenshot 6) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-24 text-left">
            {specialtyCards.map((card, i) => (
              <div 
                key={i}
                className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide font-sans mb-1">{card.title}</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">{card.description}</p>
                </div>
                <Link 
                  href={card.href}
                  className="inline-flex items-center gap-1 text-[9px] uppercase font-mono font-medium tracking-wider text-emerald-400 hover:text-white transition-colors"
                >
                  LAUNCH <ArrowRight className="h-2.5 w-2.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Sub-head Recommended Partner Affiliate Market */}
          <div className="flex flex-col text-left w-full max-w-5xl border-b border-zinc-900 pb-5 mb-8">
            <h3 className="text-xl font-bold font-sans text-white mb-1">Recommended Platforms</h3>
            <p className="text-xs text-zinc-500">Premium integrations to deploy and scale your styled Bento grids globally.</p>
          </div>

          {/* Affiliate Marketplace Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl text-left">
            {affiliateTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 hover:border-zinc-800 transition-all flex flex-col justify-between group relative overflow-hidden`}
                >
                  {/* Backdrop gradient glow from top corner */}
                  <div className={`absolute top-0 right-0 h-40 w-40 rounded-full bg-gradient-to-bl ${tool.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-5">
                      <span className={`p-2 rounded-lg bg-zinc-900 border border-zinc-800 ${tool.iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/60 font-medium">
                        {tool.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2">{tool.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-6">{tool.description}</p>
                  </div>

                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="relative z-10 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 font-semibold transition-all"
                  >
                    <span>Visit {tool.title}</span>
                    <ExternalLink className="h-3 w-3 text-zinc-500" />
                  </a>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 6: FAQ SECTION WITH HIGH-CONVERSION COMPARISON TABLE (Screenshot 5) */}
      <section className="w-full border-t border-zinc-900 bg-zinc-950 py-20 sm:py-28 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="w-full flex flex-col gap-10 text-left mb-20">
            {/* QA 1 */}
            <div className="border-b border-zinc-900 pb-8">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                How do I export Bento Grids to Tailwind?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Simply design your grid in our visual editor, then toggle the &apos;Copy Code&apos; button to &apos;Tailwind&apos;. Our system generates utility-first classes that you can paste directly into your project.
              </p>
            </div>

            {/* QA 2 */}
            <div className="border-b border-zinc-900 pb-8">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Is BentoFlow Pro mobile-responsive?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Yes. Every grid generated is built on a responsive 12-column system that automatically adapts to smaller viewports using CSS Grid auto-flow logic.
              </p>
            </div>

            {/* QA 3 */}
            <div className="border-b border-zinc-900 pb-8">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Can I use templates for commercial projects?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Commercial licenses are available for all marketplace templates. You can unlock these features using our integrated ClickPesa payment gateway.
              </p>
            </div>
          </div>

          {/* Core Feature comparison table */}
          <div className="w-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/60 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="p-5 sm:p-6 border-b border-zinc-900 relative z-10 text-left">
              <h4 className="text-sm font-bold text-white mb-1 font-sans">Compare Architectural Platforms</h4>
              <p className="text-xs text-zinc-500">How BentoFlow Pro redefines custom grid coordinates relative to classical CSS structures.</p>
            </div>
            
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="bg-zinc-900/40 text-zinc-400 border-b border-zinc-900 font-mono text-[10px] tracking-wider uppercase">
                    <th className="py-4 px-5 font-semibold">Feature</th>
                    <th className="py-4 px-5 font-semibold text-emerald-400">BentoFlow Pro</th>
                    <th className="py-4 px-5 font-semibold">Standard Flexbox</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  <tr>
                    <td className="py-4.5 px-5 font-semibold text-zinc-200">Layout Control</td>
                    <td className="py-4.5 px-5 text-emerald-400 font-medium">12-Column Precision</td>
                    <td className="py-4.5 px-5 text-zinc-500">Linear Flow</td>
                  </tr>
                  <tr>
                    <td className="py-4.5 px-5 font-semibold text-zinc-200">Responsive Scaling</td>
                    <td className="py-4.5 px-5 text-emerald-400 font-medium">Automatic Grid Spanning</td>
                    <td className="py-4.5 px-5 text-zinc-500">Manual Breakpoints</td>
                  </tr>
                  <tr>
                    <td className="py-4.5 px-5 font-semibold text-zinc-200">Export Options</td>
                    <td className="py-4.5 px-5 text-emerald-400 font-medium">Tailwind / Vanilla CSS</td>
                    <td className="py-4.5 px-5 text-zinc-500">Manual Styling</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
