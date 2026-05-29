'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  SlidersHorizontal,
  Layout,
  Code,
  Laptop,
  Smartphone,
  Tablet,
  CheckCircle,
  TrendingUp,
  Cpu,
  Globe,
  ShieldAlert,
  Terminal,
  MessageSquare,
  Database,
  Heart,
  Mail,
  Sliders,
  Palette,
  Feather
} from 'lucide-react';

interface PrebuiltIcon {
  name: string;
  category: string;
  svg: string;
}

const PREBUILT_ICONS: PrebuiltIcon[] = [
  {
    name: 'Sparkles Glow',
    category: 'Lucide',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
  },
  {
    name: 'Cpu DeepCore',
    category: 'Lucide',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>`
  },
  {
    name: 'Activity Pulse',
    category: 'Lucide',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
  },
  {
    name: 'Global Grid',
    category: 'Lucide',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>`
  },
  {
    name: 'Hexagon Guard',
    category: 'Lucide',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  },
  {
    name: 'Analytics Up',
    category: 'Interactive',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg>`
  },
  {
    name: 'Terminal Console',
    category: 'Developer',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`
  },
  {
    name: 'Database Node',
    category: 'Developer',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`
  },
  {
    name: 'Neural Ring',
    category: 'Abstract',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`
  },
  {
    name: 'Feedback Mail',
    category: 'Mail',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
  }
];

export default function SvgBoxCustomizer() {
  const [svgInput, setSvgInput] = useState<string>(PREBUILT_ICONS[0].svg);
  const [padding, setPadding] = useState<number>(5); // raw multiplier
  const [rounding, setRounding] = useState<string>('rounded-2xl');
  const [scaleOnHover, setScaleOnHover] = useState<string>('hover:scale-110');
  const [hoverAnimation, setHoverAnimation] = useState<string>('none'); // 'none' | 'spin' | 'float' | 'pulse'
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(10); // % e.g. bg-emerald-500/10
  const [colorTheme, setColorTheme] = useState<string>('emerald');
  const [borderAlpha, setBorderAlpha] = useState<number>(20); // border transparency %
  const [glowSize, setGlowSize] = useState<string>('shadow-lg');
  const [shadowColorStrength, setShadowColorStrength] = useState<number>(30); // scale out of 100
  const [copied, setCopied] = useState<boolean>(false);
  const [exportTab, setExportTab] = useState<'tailwind' | 'react' | 'html-css'>('tailwind');

  // Multi-color Seed Palette
  const THEME_PALETTES: { [key: string]: { label: string, bg: string, text: string, hoverText: string, border: string, rgb: string } } = {
    emerald: { label: 'Emerald Mint', bg: 'bg-emerald-500', text: 'text-emerald-400', hoverText: 'group-hover:text-emerald-300', border: 'border-emerald-500', rgb: '16, 185, 129' },
    blue: { label: 'Neon Cyber', bg: 'bg-cyan-500', text: 'text-cyan-400', hoverText: 'group-hover:text-cyan-300', border: 'border-cyan-500', rgb: '6, 182, 212' },
    indigo: { label: 'Royal Indigo', bg: 'bg-indigo-500', text: 'text-indigo-400', hoverText: 'group-hover:text-indigo-300', border: 'border-indigo-500', rgb: '99, 102, 241' },
    purple: { label: 'Phaser Violet', bg: 'bg-purple-500', text: 'text-purple-400', hoverText: 'group-hover:text-purple-300', border: 'border-purple-500', rgb: '168, 85, 247' },
    pink: { label: 'Cosmic Magenta', bg: 'bg-pink-500', text: 'text-pink-400', hoverText: 'group-hover:text-pink-300', border: 'border-pink-500', rgb: '236, 72, 153' },
    amber: { label: 'Sunset Amber', bg: 'bg-amber-500', text: 'text-amber-400', hoverText: 'group-hover:text-amber-350', border: 'border-amber-500', rgb: '245, 158, 11' },
    rose: { label: 'Crimson Glow', bg: 'bg-rose-500', text: 'text-rose-450', hoverText: 'group-hover:text-rose-350', border: 'border-rose-500', rgb: '244, 63, 94' },
    teal: { label: 'Static Teal', bg: 'bg-teal-500', text: 'text-teal-400', hoverText: 'group-hover:text-teal-300', border: 'border-teal-500', rgb: '20, 184, 166' }
  };

  const currentPalette = THEME_PALETTES[colorTheme] || THEME_PALETTES.emerald;

  const getCleanSvg = () => {
    let clean = svgInput;
    // Remove inline width and height so they can scale with Tailwind container rules cleanly
    clean = clean
      .replace(/width="[0-9]+"/gi, '')
      .replace(/height="[0-9]+"/gi, '')
      .replace(/stroke="currentColor"/gi, '')
      .replace(/stroke="[^"]*"/gi, '');
    
    // Add default stroke="currentColor" and strokeWidth properties
    if (!clean.includes('strokeWidth')) {
      clean = clean.replace('<svg', '<svg stroke="currentColor" strokeWidth="2"');
    } else {
      clean = clean.replace('<svg', '<svg stroke="currentColor"');
    }
    return clean;
  };

  // Build Exports based on type
  const getExportCode = () => {
    const pVal = padding;
    const cleanSvg = getCleanSvg().trim();
    let animateClass = '';
    if (hoverAnimation === 'spin') animateClass = ' group-hover:rotate-45';
    if (hoverAnimation === 'float') animateClass = ' group-hover:-translate-y-1.5';
    if (hoverAnimation === 'pulse') animateClass = ' group-hover:scale-105 group-hover:brightness-110';

    const glowShadow = `shadow-[0_0_15px_rgba(${currentPalette.rgb},0.15)]`;

    switch (exportTab) {
      case 'tailwind':
        return `<!-- Clean Optimized Centered SVG Wrapper Code -->
<div className="group flex items-center justify-center p-${pVal} ${rounding} bg-zinc-950/80 hover:bg-zinc-900 border border-${colorTheme}-500/${borderAlpha} transition-all duration-300 ${glowShadow} relative overflow-hidden">
  <!-- Interactive Glowing Mesh Backdrop Overlay -->
  <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
  <div className="absolute -inset-10 bg-gradient-to-tr from-${colorTheme}-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
  
  <div className="relative z-10 transition-all duration-305 ${scaleOnHover}${animateClass} ${currentPalette.text} ${currentPalette.hoverText} w-6 h-6">
    ${cleanSvg}
  </div>
</div>`;

      case 'react':
        return `import React from 'react';

export default function GlassIcon() {
  return (
    <div className="group relative flex items-center justify-center p-${pVal} ${rounding} bg-[#08080a]/80 backdrop-blur-md border border-[#${colorTheme === 'emerald' ? '10b981' : '3b82f6'}]/${borderAlpha} transition-all duration-300 hover:bg-zinc-900 shadow-[0_0_20px_rgba(${currentPalette.rgb},0.12)] overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="relative z-10 transition-all duration-300 ${scaleOnHover}${animateClass} ${currentPalette.text} w-6 h-6">
        ${cleanSvg.replace(/class=/g, 'className=')}
      </div>
    </div>
  );
}`;

      case 'html-css':
        const hexColor = colorTheme === 'emerald' ? '#10b981' :
                         colorTheme === 'blue' ? '#06b6d4' :
                         colorTheme === 'indigo' ? '#6366f1' :
                         colorTheme === 'purple' ? '#a855f7' :
                         colorTheme === 'pink' ? '#ec4899' :
                         colorTheme === 'amber' ? '#f59e0b' :
                         colorTheme === 'rose' ? '#f43f5e' : '#14b8a6';

        return `<div class="bento-glass-icon-container">
  <div class="vector-wrapper">
    ${cleanSvg.replace(/strokeWidth=/gi, 'stroke-width=')}
  </div>
</div>

<style>
.bento-glass-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${pVal * 4}px;
  background-color: rgba(8, 8, 10, 0.85);
  border: 1px solid rgba(${currentPalette.rgb}, ${borderAlpha / 100});
  border-radius: ${rounding === 'rounded-none' ? '0' : rounding === 'rounded-lg' ? '8px' : rounding === 'rounded-xl' ? '12px' : rounding === 'rounded-2xl' ? '16px' : rounding === 'rounded-3xl' ? '24px' : '9999px'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 20px rgba(${currentPalette.rgb}, ${shadowColorStrength / 200});
  position: relative;
  overflow: hidden;
  width: max-content;
}

.bento-glass-icon-container:hover {
  background-color: rgba(20, 20, 25, 0.95);
  border-color: rgba(${currentPalette.rgb}, ${(borderAlpha + 15) / 100});
  box-shadow: 0 0 25px rgba(${currentPalette.rgb}, ${shadowColorStrength / 100});
}

.vector-wrapper {
  color: ${hexColor};
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bento-glass-icon-container:hover .vector-wrapper {
  transform: scale(${scaleOnHover === 'hover:scale-100' ? '1' : scaleOnHover === 'hover:scale-105' ? '1.05' : '1.11'})${hoverAnimation === 'spin' ? ' rotate(12deg)' : hoverAnimation === 'float' ? ' translateY(-4px)' : ''};
}
</style>`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getExportCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full text-left space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Editor & Parameters */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <SlidersHorizontal className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Icon Customizer Suite</h3>
                <p className="text-[11px] text-zinc-500">Tune vectors, alignments, and high contrast colors</p>
              </div>
            </div>

            {/* Seed Preset Vectors Selection Block */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Load Seed Icon Vectors ({PREBUILT_ICONS.length} Built-in Presets)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {PREBUILT_ICONS.map((ico) => (
                  <button
                    key={ico.name}
                    onClick={() => setSvgInput(ico.svg)}
                    className={`p-2 text-left rounded-lg bg-zinc-900/60 hover:bg-zinc-900 border text-xs text-zinc-400 hover:text-white font-medium transition-all flex items-center gap-2 ${
                      svgInput === ico.svg ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400' : 'border-zinc-900 hover:border-zinc-800'
                    }`}
                  >
                    <span 
                      className={`h-2 w-2 rounded-full shrink-0 ${svgInput === ico.svg ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`}
                    />
                    {ico.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Editing Section: Custom Input Area */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Raw SVG Markup Code Stream
              </label>
              <textarea
                value={svgInput}
                onChange={(e) => setSvgInput(e.target.value)}
                rows={4}
                className="w-full text-xs font-mono text-zinc-300 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-850 p-3 rounded-lg focus:outline-none focus:border-zinc-700"
                placeholder="Paste <svg>...</svg> elements directly..."
              />
            </div>

            {/* Color Palette Choice */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Seed Light Palette Selection
              </label>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(THEME_PALETTES).map((pKey) => {
                  const val = THEME_PALETTES[pKey];
                  return (
                    <button
                      key={pKey}
                      onClick={() => setColorTheme(pKey)}
                      className={`py-2 rounded-lg text-[10px] font-semibold transition-all border flex flex-col items-center justify-center gap-1 ${
                        colorTheme === pKey
                          ? 'bg-zinc-900 border-emerald-400 text-white'
                          : 'bg-zinc-950 border-zinc-900/80 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${val.bg}`} />
                      <span>{pKey.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizing, Padding and Radii */}
            <div className="space-y-5">
              
              {/* Inner padding multiplier slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Aspect Pad Factor (Tailwind)</span>
                  <span>p-{padding} ({padding * 4}px)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Slider for borders alpha */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Border Alpha Refractor opacity</span>
                  <span>{borderAlpha}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={borderAlpha}
                  onChange={(e) => setBorderAlpha(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Border Roundness */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  Border Roundness Config
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Square', val: 'rounded-none' },
                    { label: 'Medium', val: 'rounded-xl' },
                    { label: 'Large (Bento)', val: 'rounded-3xl' },
                    { label: 'Circle', val: 'rounded-full' }
                  ].map((pres) => (
                    <button
                      key={pres.val}
                      onClick={() => setRounding(pres.val)}
                      className={`py-1.5 rounded-lg text-[10px] font-mono border transition-all ${
                        rounding === pres.val
                          ? 'bg-zinc-900 border-zinc-700 text-emerald-400 font-bold'
                          : 'bg-zinc-950 border-zinc-900 text-zinc-500'
                      }`}
                    >
                      {pres.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Interactions settings */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Hover Scale</span>
                  <select
                    value={scaleOnHover}
                    onChange={(e) => setScaleOnHover(e.target.value)}
                    className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2 rounded-lg"
                  >
                    <option value="hover:scale-100">None (1.0x)</option>
                    <option value="hover:scale-105">Subtle (1.05x)</option>
                    <option value="hover:scale-110">Default (1.1x)</option>
                    <option value="hover:scale-120">Intense (1.2x)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Hover Effect</span>
                  <select
                    value={hoverAnimation}
                    onChange={(e) => setHoverAnimation(e.target.value)}
                    className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2 rounded-lg"
                  >
                    <option value="none">None</option>
                    <option value="spin">Subtle Rotate</option>
                    <option value="float">Vertical Floating</option>
                    <option value="pulse">Pulse & Glow</option>
                  </select>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Live Wrapper Rendering Node & Outputs */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 min-h-[440px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.20] pointer-events-none" />

            {/* Indicator */}
            <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40 relative z-10 text-left">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 font-bold">Wrapper Rendering Node</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded tracking-wide border border-emerald-500/10 font-bold block">
                Interactive Preview Active
              </span>
            </div>

            {/* Custom styled box rendering stage (centered) */}
            <div className="flex items-center justify-center relative z-10 my-auto py-8">
              <div className="p-10 border border-dashed border-zinc-850 rounded-[40px] bg-zinc-950/10 relative group">
                
                {/* Embedded shadow light ring background shine simulating glows */}
                <div 
                  className="absolute inset-x-0 top-0 h-16 w-16 mx-auto rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-75 pointer-events-none"
                  style={{
                    backgroundColor: `rgb(${currentPalette.rgb})`
                  }}
                />

                {/* Rendered output component layout */}
                <div 
                  className={`group flex items-center justify-center transition-all duration-300 backdrop-blur-md relative overflow-hidden text-left ${rounding} ${scaleOnHover}`}
                  style={{
                    padding: `${padding * 4}px`,
                    backgroundColor: 'rgba(8, 8, 10, 0.85)',
                    border: `1px solid rgba(${currentPalette.rgb}, ${borderAlpha / 100})`,
                    boxShadow: `0 0 25px rgba(${currentPalette.rgb}, ${shadowColorStrength / 200})`
                  }}
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
                  
                  {/* Glowing mask element */}
                  <div className={`absolute -inset-10 bg-gradient-to-tr from-${colorTheme}-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />

                  {/* Core Icon wrapper with animations */}
                  <div 
                    className={`relative z-10 transition-all duration-300 flex items-center justify-center shrink-0 w-8 h-8 ${currentPalette.text} group-hover:text-${colorTheme}-300 ${
                      hoverAnimation === 'spin' ? 'group-hover:rotate-12' : 
                      hoverAnimation === 'float' ? 'group-hover:-translate-y-1' : 
                      hoverAnimation === 'pulse' ? 'group-hover:scale-105' : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: getCleanSvg() }}
                  />
                </div>

              </div>
            </div>

            {/* Advanced Multiple Exports Tab interface */}
            <div className="relative z-10 mt-auto border-t border-zinc-900/60 pt-4 space-y-4">
              <div className="flex justify-between items-center bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-900/60">
                <div className="flex gap-1.5">
                  {(['tailwind', 'react', 'html-css'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setExportTab(tab)}
                      className={`text-[10px] font-mono tracking-wide px-3 py-1.5 rounded-lg transition-all ${
                        exportTab === tab
                          ? 'bg-zinc-900 text-white font-bold border-b-2 border-emerald-500'
                          : 'text-zinc-550 hover:text-zinc-350'
                      }`}
                    >
                      {tab === 'tailwind' ? 'Tailwind HTML' : tab === 'react' ? 'React component' : 'Pure HTML & CSS'}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleCopyCode}
                  className={`inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 font-bold rounded-lg text-[10px] px-3.5 py-1.5 transition-colors`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <pre className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl font-mono text-[10px] text-zinc-400 overflow-x-auto select-all leading-normal whitespace-pre">
                {getExportCode()}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
