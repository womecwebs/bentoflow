'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Code, 
  Copy, 
  Check, 
  ExternalLink, 
  HelpCircle, 
  RefreshCw, 
  Layers, 
  Cpu, 
  CheckCircle, 
  ArrowRight,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Settings,
  Flame,
  Globe,
  DollarSign
} from 'lucide-react';

// Predefined responsive template generations based on user prompt criteria
const PROMPT_TEMPLATES = [
  {
    name: 'Minimalist SaaS Dashboard',
    prompt: 'Design a high-fidelity 5-box dashboard for a finance SaaS, using deep charcoal backgrounds, glowing emerald status lights, line metrics, and dense content padding.',
    accentColor: 'indigo',
    themeName: 'Cosmic Slate',
    cells: [
      { id: 'cell-1', title: 'Revenue Statistics', span: 'col-span-full md:col-span-8 row-span-2', desc: 'Real-time MRR streams peaking with +23% monthly momentum.', icon: 'stat' },
      { id: 'cell-2', title: 'System Status', span: 'col-span-full md:col-span-4 row-span-1', desc: 'Active VMs, 99.98% network stability.', tag: 'ONLINE', icon: 'status' },
      { id: 'cell-3', title: 'Quick Pay', span: 'col-span-full md:col-span-4 row-span-1', desc: 'One-click global merchant settlements.', icon: 'pay' },
      { id: 'cell-4', title: 'Audience Demographics', span: 'col-span-full md:col-span-6 row-span-1', desc: 'Major activity centering Western Europe metrics.', icon: 'globe' },
      { id: 'cell-5', title: 'Security Log', span: 'col-span-full md:col-span-6 row-span-1', desc: 'End-to-end credential shielding activated.', icon: 'lock' }
    ]
  },
  {
    name: 'Software Developer Portfolio Grid',
    prompt: 'Create a clean personal bento grid CV highlighting standard education, open-source repositories, and interactive bio links in slate cyber-mint visual theme.',
    accentColor: 'emerald',
    themeName: 'Cyber Mint',
    cells: [
      { id: 'dev-1', title: 'About Joshua', span: 'col-span-full md:col-span-6 row-span-2', desc: 'Lead Full-Stack Web Architect pushing programmatic SEO layouts.', icon: 'bio' },
      { id: 'dev-2', title: 'Open-Source Stack', span: 'col-span-full md:col-span-6 row-span-1', desc: '14 active packages published with 250k+ NPM installs.', icon: 'code' },
      { id: 'dev-3', title: 'Education', span: 'col-span-full md:col-span-3 row-span-1', desc: 'B.Sc. Software Engineering, Class of 2024.', icon: 'edu' },
      { id: 'dev-4', title: 'Tech Stack', span: 'col-span-full md:col-span-3 row-span-1', desc: 'Next.js App Router, Tailwind v4, Go, Firestore.', icon: 'tech' }
    ]
  },
  {
    name: 'In-Bio Link & Social Feeds Creator',
    prompt: 'Design a modular smartphone link-in-bio hub with vibrant pink gradients, custom avatar frame, feed simulator, and interactive audio preview slots.',
    accentColor: 'pink',
    themeName: 'Cosmic Lilac',
    cells: [
      { id: 'bio-1', title: 'Connect @Joshua', span: 'col-span-full md:col-span-12 row-span-1', desc: 'Explore my music, digital products, and YouTube newsletters.', avatar: true, icon: 'avatar' },
      { id: 'bio-2', title: 'Listen Now', span: 'col-span-full md:col-span-7 row-span-1', desc: 'Ambient Chillwave Synthesizer - Latest stream single.', icon: 'music' },
      { id: 'bio-3', title: 'Newsletter Club', span: 'col-span-full md:col-span-5 row-span-1', desc: 'Join 14,000 global designers.', button: 'Join Club', icon: 'news' }
    ]
  }
];

const GENERATION_STEPS = [
  'AI Parser reading user layout instructions...',
  'Mapping responsive grid column metrics...',
  'Harmonizing accent colors and custom shadow depths...',
  'Compiling responsive Tailwind classes...',
  'Synthesizing production-ready React structures...'
];

export default function AIBentoBuilderPage() {
  const [promptInput, setPromptInput] = useState<string>(PROMPT_TEMPLATES[0].prompt);
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState<string>('indigo');
  const [currentGrid, setCurrentGrid] = useState(PROMPT_TEMPLATES[0]);
  const [generationStep, setGenerationStep] = useState<number>(-1);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeCodeTab, setActiveCodeTab] = useState<'tailwind' | 'react' | 'html'>('tailwind');
  const [copied, setCopied] = useState<boolean>(false);

  const generationText = generationStep >= 0 && generationStep < GENERATION_STEPS.length
    ? GENERATION_STEPS[generationStep]
    : '';

  // Generate simulated AI state steps
  const triggerSimulation = () => {
    if (generationStep >= 0) return;
    setGenerationStep(0);
  };

  useEffect(() => {
    if (generationStep === -1) return;

    if (generationStep < GENERATION_STEPS.length) {
      const timer = setTimeout(() => {
        setGenerationStep(prev => {
          const next = prev + 1;
          if (next >= GENERATION_STEPS.length) {
            // Completed, load the chosen preset safely inside the async callback
            const template = PROMPT_TEMPLATES[selectedPreset] || PROMPT_TEMPLATES[0];
            setCurrentGrid({
              ...template,
              prompt: promptInput
            });
            setCurrentTheme(template.accentColor);
            return -1;
          }
          return next;
        });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [generationStep, selectedPreset, promptInput]);

  const selectPresetHandler = (idx: number) => {
    setSelectedPreset(idx);
    setPromptInput(PROMPT_TEMPLATES[idx].prompt);
    setGenerationStep(0); // Trigger instantly
  };

  // Build the compiled code exports
  const getTailwindCode = () => {
    const gridCols = currentGrid.cells.length > 4 ? 'grid-cols-1 md:grid-cols-12' : 'grid-cols-1 md:grid-cols-6';
    const borderGlow = currentTheme === 'emerald' ? 'hover:border-emerald-500/30' : currentTheme === 'pink' ? 'hover:border-pink-500/30' : 'hover:border-indigo-500/30';
    return `<div className="w-full max-w-7xl mx-auto px-4 py-12 text-zinc-100">
  <div className="text-left mb-10 space-y-2">
    <span className="text-xs font-mono uppercase text-${currentTheme}-400 font-bold">AI Generated Bento layout</span>
    <h2 className="text-3xl font-extrabold tracking-tight">${currentGrid.name}</h2>
  </div>

  <div className="grid ${gridCols} gap-6">
  ${currentGrid.cells.map((cell: any) => {
    return `  {/* ${cell.title} Cell */}
    <div className="${cell.span} p-6 rounded-2xl border border-zinc-900 bg-zinc-950/60 transition-all ${borderGlow} hover:bg-zinc-950 duration-300 relative overflow-hiddenGroup text-left flex flex-col justify-between">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="relative z-10">
        ${cell.tag ? `<span className="px-2 py-0.5 rounded text-[8px] font-mono bg-${currentTheme}-500/10 text-${currentTheme}-400 border border-${currentTheme}-500/20 font-bold uppercase">${cell.tag}</span>` : ''}
        <h4 className="text-base font-bold text-white mt-2">${cell.title}</h4>
        <p className="text-xs text-zinc-400 leading-relaxed mt-1">${cell.desc}</p>
      </div>
    </div>`;
  }).join('\n')}
  </div>
</div>`;
  };

  const getReactCode = () => {
    const componentName = currentGrid.name.replace(/\s+/g, '');
    return `import React from 'react';
import { Sparkles, Cpu, Globe } from 'lucide-react';

export default function ${componentName}Bento() {
  return (
    <section className="w-full bg-[#08080a] py-16 text-zinc-300">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-black text-white mb-8">${currentGrid.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Dynamic Interactive Cards list */}
          ${currentGrid.cells.map((c: any) => `
          <div className="${c.span} p-6 rounded-3xl border border-zinc-900 bg-zinc-950/80 relative overflow-hidden group">
            <h4 className="text-sm font-bold text-zinc-100">${c.title}</h4>
            <p className="text-xs text-zinc-400 mt-2">${c.desc}</p>
          </div>`).join('\n          ')}
        </div>
      </div>
    </section>
  );
}`;
  };

  const getHTMLCode = () => {
    return `<div style="max-width: 1200px; margin: 0 auto; padding: 40px; font-family: sans-serif; background: #08080a; color: #fff;">
  <h2 style="color: #fff; margin-bottom: 24px;">${currentGrid.name}</h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    ${currentGrid.cells.map((c: any) => `
    <div style="padding: 24px; border: 1px solid #1a1a1f; background: #0a0a0f; border-radius: 16px;">
      <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #fff;">${c.title}</h3>
      <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.6;">${c.desc}</p>
    </div>`).join('\n    ')}
  </div>
</div>`;
  };

  const copyToClipboard = () => {
    const code = activeCodeTab === 'tailwind' ? getTailwindCode() : activeCodeTab === 'react' ? getReactCode() : getHTMLCode();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const currentCode = activeCodeTab === 'tailwind' ? getTailwindCode() : activeCodeTab === 'react' ? getReactCode() : getHTMLCode();

  // Highlight color helper
  const getAccentBg = () => {
    if (currentTheme === 'emerald') return 'from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400';
    if (currentTheme === 'pink') return 'from-pink-500/10 to-transparent border-pink-500/20 text-pink-400';
    return 'from-indigo-500/10 to-transparent border-indigo-500/20 text-indigo-400';
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-300 font-sans flex flex-col justify-between">
      {/* Search optimizations */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "@id": "https://bentoflow-pro.vercel.app/tools/ai-bento-builder",
              "name": "AI Bento Builder & Website Creator",
              "url": "https://bentoflow-pro.vercel.app/tools/ai-bento-builder",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "All",
              "description": "Generate modern bento grids, layouts, and interactive visual dashboard components from raw language prompts using neural generation systems."
            },
            {
              "@type": "HowTo",
              "name": "How to generate website layouts in seconds with BentoFlow AI",
              "step": [
                { "@type": "HowToStep", "text": "Enter your specific visual or conceptual prompt containing grid instructions." },
                { "@type": "HowToStep", "text": "Click Generate and let the AI compile custom elements and row span structures." },
                { "@type": "HowToStep", "text": "Adjust viewports concurrently and export responsive HTML/CSS structures immediately." }
              ]
            }
          ]
        })
      }} />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-left">
        
        {/* Header */}
        <div className="max-w-4xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-400 font-medium font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Artificial Intelligence System
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            AI Bento Builder & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Website Creator</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Type custom layouts directives or use premium preset models to generate stunning, responsive bento grids. Instantly copy optimized Tailwind CSS or React layout modules.
          </p>
        </div>

        {/* Dynamic Buttons Requested */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-6 border-b border-zinc-900">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            &larr; More Developer Utilities
          </Link>
          <div className="sm:ml-auto flex flex-wrap gap-3">
            <Link
              href="/tools/ai-bento-builder"
              className="px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold text-teal-400 hover:bg-zinc-850 transition-all flex items-center gap-1.5"
            >
              <Cpu className="h-3.5 w-3.5 shrink-0" />
              Use AI Bento Builder
            </Link>
            <a
              href="https://readdy.ai/?via=joshua-eddy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-500/30 text-xs font-bold text-white hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-300 animate-bounce" />
              Use AI Website Builder (Readdy.ai)
            </a>
          </div>
        </div>

        {/* Interactive layout workspace splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: Input prompt controller */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 hover:border-zinc-850 transition-all space-y-6">
              
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-900">
                <Settings className="h-4.5 w-4.5 text-blue-400" />
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-white">Prompt Calibrator</h3>
              </div>

              {/* Presets Row */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-550 uppercase">Select Training Model Preset</label>
                <div className="grid grid-cols-1 gap-2">
                  {PROMPT_TEMPLATES.map((tplPreset, index) => (
                    <button
                      key={index}
                      onClick={() => selectPresetHandler(index)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        selectedPreset === index 
                          ? 'border-purple-500 bg-purple-500/5 text-white' 
                          : 'border-zinc-900 bg-zinc-950 hover:bg-zinc-90 w-full hover:border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <h4 className="text-xs font-bold mb-0.5">{tplPreset.name}</h4>
                      <p className="text-[10px] text-zinc-500 leading-tight truncate">{tplPreset.prompt}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input area */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-550 uppercase">Custom Prompt Instructions</label>
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-xl text-xs text-zinc-200 bg-zinc-900/50 border border-zinc-850 focus:border-zinc-700 focus:outline-none placeholder:text-zinc-600 leading-relaxed font-sans"
                  placeholder="E.g. Build a 5-box dashboard for task tracking with rich margins..."
                />
              </div>

              {/* Generate Trigger */}
              <button
                onClick={triggerSimulation}
                disabled={generationStep >= 0}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {generationStep >= 0 ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    Assembling Your Grid Blueprint...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    Compile Bento Layout Node
                  </>
                )}
              </button>

            </div>

            {/* Neural Promo Block */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-gradient-to-br from-indigo-950/10 to-purple-950/20 text-left space-y-4">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold">
                <Flame className="h-4.5 w-4.5" />
                NEED A FULL WEBSITE EXTREMELY FAST?
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                If you need to create fully realized production-grade websites, web apps, SaaS tools, and dashboards with simple typing commands, use **Readdy.ai**. Instantly gain high-converting marketing structures and responsive styles.
              </p>
              <a
                href="https://readdy.ai/?via=joshua-eddy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-400 font-extrabold hover:text-emerald-300"
              >
                Get Started Free via Readdy.ai Promotion &rarr;
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Output display and preview viewport */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Live visual layout canvas with interactive dimensions */}
            <div className="border border-zinc-900 bg-zinc-950/30 rounded-2xl p-6 flex flex-col gap-6 font-sans">
              
              {/* Controls bar */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-zinc-300">Live Preview Sandbox</span>
                </div>

                {/* Viewport Selectors */}
                <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-900 rounded-lg p-0.5">
                  {(['desktop', 'tablet', 'mobile'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setViewportMode(mode)}
                      className={`p-1.5 rounded-md transition-colors ${
                        viewportMode === mode ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {mode === 'desktop' && <Monitor className="h-3.5 w-3.5" />}
                      {mode === 'tablet' && <Tablet className="h-3.5 w-3.5" />}
                      {mode === 'mobile' && <Smartphone className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive preview viewport */}
              <div className="w-full flex justify-center py-4 bg-zinc-950/20 rounded-xl relative overflow-hidden min-h-[350px]">
                <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.2] pointer-events-none" />
                
                {generationStep >= 0 ? (
                  <div className="m-auto flex flex-col items-center text-center gap-4 relative z-10 p-6">
                    <div className="relative flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full border border-purple-500/20 bg-purple-500/5 flex items-center justify-center text-purple-400 animate-spin" />
                      <Cpu className="h-6 w-6 text-purple-400 absolute animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#22c55e] font-black">Synthesizing Grids</span>
                      <p className="text-xs text-zinc-400 font-mono italic">{generationText}</p>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`transition-all duration-300 w-full ${
                      viewportMode === 'mobile' ? 'max-w-[340px]' : viewportMode === 'tablet' ? 'max-w-[620px]' : 'max-w-full'
                    }`}
                  >
                    <div className="text-left mb-6 space-y-1">
                      <span className="text-[9px] font-mono uppercase bg-zinc-900 border border-zinc-850 text-emerald-400 font-bold px-2.5 py-0.5 rounded">
                        Active Style: {currentGrid.themeName}
                      </span>
                    </div>

                    {/* Bento preview elements list */}
                    <div className={`grid gap-5 w-full ${
                      viewportMode === 'mobile' 
                        ? 'grid-cols-1' 
                        : currentGrid.cells.length > 4 
                          ? 'grid-cols-1 md:grid-cols-12' 
                          : 'grid-cols-1 md:grid-cols-6'
                    }`}>
                      {currentGrid.cells.map((cell: any) => (
                        <div
                          key={cell.id}
                          className={`${cell.span} group p-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/60 transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between`}
                        >
                          <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.05] pointer-events-none" />
                          <div className="space-y-2 relative z-10">
                            {cell.tag && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono uppercase font-black tracking-widest">
                                {cell.tag}
                              </span>
                            )}
                            <h4 className="text-sm font-bold text-white tracking-tight">{cell.title}</h4>
                            <p className="text-[11px] text-zinc-400 leading-normal">{cell.desc}</p>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-zinc-600 relative z-10 pt-4 border-t border-zinc-900/40">
                            <span>{cell.icon.toUpperCase()} CELL</span>
                            <span className="group-hover:text-emerald-400 transition-colors">&rarr;</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Compiled code outputs block */}
            <div className="flex flex-col gap-3 text-left">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-1 border-b border-zinc-900">
                <span className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Code className="h-4 w-4 text-purple-400" />
                  Code Compilation Matrix
                </span>

                <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-900 rounded-lg p-0.5">
                  {(['tailwind', 'react', 'html'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveCodeTab(tab)}
                      className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-md transition-all ${
                        activeCodeTab === tab ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <pre className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-900 text-left font-mono text-[11px] text-zinc-400 leading-relaxed overflow-x-auto max-h-[250px] whitespace-pre select-all">
                  {currentCode}
                </pre>

                <button
                  onClick={copyToClipboard}
                  className={`absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    copied ? 'bg-emerald-600 text-white' : 'bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-805 text-zinc-200 backdrop-blur-sm shadow-xl'
                  }`}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 text-zinc-400" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* GUIDELINES & QUESTIONS */}
        <div className="mt-16 p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900/60">
            <HelpCircle className="h-5.5 w-5.5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Compilation Guides & FAQ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                Are visual themes customizable?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Absolutely. Selecting alternative training presets changes grid-column dimensions, accent styles mapping, and background glow parameters to match slate or gradient neon designs dynamically.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1">
                <Cpu className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                Is this fully responsive?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Yes. Below standard medium breakpoints, column tracks automatically fallback to fluid vertical layouts. Preview responsive transitions synchronously using our adaptive preview sandbox selectors.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                How does Readdy.ai combine?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                While BentoFlow focuses on fine-tuning pixel-perfect responsive grid modules, Readdy.ai can construct entire web platforms, pages, databases, and blogs instantly from standard prompts. Complete your build seamlessly.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                Can I export to static CSS?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Certainly. Switch code tabs above the code pre block to select HTML compilation outputs instead. This produces native, standard CSS Grid rules compatible with any standard hosting options.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
