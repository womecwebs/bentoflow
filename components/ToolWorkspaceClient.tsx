'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  Sliders, 
  Code, 
  Wrench, 
  Play, 
  CheckCircle,
  Hash,
  RefreshCw,
  Heart
} from 'lucide-react';
import { DeveloperTool } from '@/data/toolsData';

interface Props {
  tool: DeveloperTool;
}

export default function ToolWorkspaceClient({ tool }: Props) {
  const [copied, setCopied] = useState<boolean>(false);
  
  // Dynamic tool states based on loaded slug
  const [colorScheme, setColorScheme] = useState<string>('emerald');
  const [customDimension, setCustomDimension] = useState<number>(350);
  const [blurRadius, setBlurRadius] = useState<number>(12);
  const [transparency, setTransparency] = useState<number>(15);
  const [accentText, setAccentText] = useState<string>('Bento Spotlight Features');
  const [gridColumns, setGridColumns] = useState<number>(3);
  const [gapUnit, setGapUnit] = useState<number>(4);

  // Computed Outputs based on Slug
  const getOutputCode = () => {
    switch (tool.slug) {
      case 'image-placeholder-injector':
        return `<div className="w-full h-[${customDimension}px] rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 border border-zinc-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
  <div className="relative z-10 flex flex-col items-center text-center gap-3">
    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
      DIMENSIONS: w-full x ${customDimension}px
    </span>
    <h3 className="text-sm font-bold text-zinc-300 font-sans">${accentText}</h3>
    <p className="text-[11px] text-zinc-500 max-w-xs">Dynamic generated placeholder ready to represent custom marketing templates.</p>
  </div>
</div>`;

      case 'glassmorphism-bento-card':
        return `/* Tailwind UI Class Configuration */
<div className="p-6 rounded-3xl bg-white/[0.0${transparency}] border border-white/10 backdrop-blur-[${blurRadius}px] shadow-2xl shadow-black/40 text-left relative overflow-hidden">
  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 blur-3xl pointer-events-none" />
  <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">Translucent Node</span>
  <h3 className="text-xl font-bold text-white mt-2 mb-1">${accentText || 'Frosted Glass Header'}</h3>
</div>`;

      case 'css-shadow-generator':
        return `.bento-elevated-card {
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 4px 6px -1px rgba(0, 0, 0, 0.5),
    0 10px 15px -3px rgba(0, 0, 0, 0.3),
    0 ${blurRadius}px ${blurRadius * 2}px -5px rgba(0, 0, 0, 0.25);
  background-color: #09090b;
  border-radius: 16px;
}`;

      case 'svg-container-styler':
        return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-${transparency} pointer-events-none select-none">
  <defs>
    <pattern id="bento-grid-dense" width="${blurRadius * 4}" height="${blurRadius * 4}" patternUnits="userSpaceOnUse">
      <path d="M ${blurRadius * 4} 0 L 0 0 0 ${blurRadius * 4}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bento-grid-dense)" />
</svg>`;

      case 'gradient-mesh-compiler':
        return `/* Beautiful Multi-Stops CSS Gradient Mesh */
.bento-radial-mesh {
  background-color: #09090b;
  background-image: 
    radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.18) 0px, transparent 50%),
    radial-gradient(at 50% 100%, rgba(236, 72, 153, 0.1) 0px, transparent 50%);
}`;

      default:
        return `/* Customized Core Tailwind/CSS Stack Output */
<div className="grid grid-cols-${gridColumns} gap-${gapUnit} w-full">
  <div className="col-span-1 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
    <h3 className="text-sm font-bold text-zinc-100">${accentText}</h3>
  </div>
</div>`;
    }
  };

  const codeString = getOutputCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      
      {/* Dynamic interactive workspace box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* SETTINGS ADJUSTER COLUMN (5 cols) */}
        <div className="md:col-span-5 p-5 sm:p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-900">
            <Sliders className="h-4.5 w-4.5 text-emerald-400" />
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Utility Parameters
            </h4>
          </div>

          {/* DYNAMIC FORM RENDERERS ACCORDING TO UTILITY FOCUS */}
          <div className="space-y-4">
            
            {/* TEXT ACCENT SETTINGS */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-mono font-bold text-zinc-400">Card Heading Tag</label>
              <input
                type="text"
                value={accentText}
                onChange={(e) => setAccentText(e.target.value)}
                className="w-full text-xs text-zinc-200 bg-zinc-900/50 border border-zinc-850 px-3 py-2 rounded-lg focus:outline-none focus:border-zinc-700"
                placeholder="E.g. Spotlight Metric Node"
              />
            </div>

            {/* PLACEHOLDER RESOLVERS INPUTS */}
            {tool.slug === 'image-placeholder-injector' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-405">
                  <span>Custom Height</span>
                  <span>{customDimension}px</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="600"
                  step="25"
                  value={customDimension}
                  onChange={(e) => setCustomDimension(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            )}

            {/* BLUR RADIUS CONTROLLER */}
            {(tool.slug === 'glassmorphism-bento-card' || tool.slug === 'css-shadow-generator' || tool.slug === 'svg-container-styler') && (
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-xs font-mono text-zinc-405">
                  <span>
                    {tool.slug === 'svg-container-styler' ? 'Pattern Size' : 'Blur Calibration'}
                  </span>
                  <span>{blurRadius}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="40"
                  step="2"
                  value={blurRadius}
                  onChange={(e) => setBlurRadius(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            )}

            {/* TRANSPARENCY SETTINGS */}
            {(tool.slug === 'glassmorphism-bento-card' || tool.slug === 'svg-container-styler') && (
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-xs font-mono text-zinc-405">
                  <span>Transparency/Opacity</span>
                  <span>{transparency}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={transparency}
                  onChange={(e) => setTransparency(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            )}

            {/* BASE COLUMN MATRIX INPUT */}
            {tool.slug !== 'image-placeholder-injector' && tool.slug !== 'glassmorphism-bento-card' && tool.slug !== 'css-shadow-generator' && tool.slug !== 'svg-container-styler' && tool.slug !== 'gradient-mesh-compiler' && (
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] uppercase font-mono text-zinc-500">Columns</label>
                  <select
                    value={gridColumns}
                    onChange={(e) => setGridColumns(Number(e.target.value))}
                    className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2 rounded-lg"
                  >
                    <option value={2}>2 Column</option>
                    <option value={3}>3 Column</option>
                    <option value={4}>4 Column</option>
                    <option value={12}>12 Column</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[10px] uppercase font-mono text-zinc-500">Grid Gap</label>
                  <select
                    value={gapUnit}
                    onChange={(e) => setGapUnit(Number(e.target.value))}
                    className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2 rounded-lg"
                  >
                    <option value={2}>8px</option>
                    <option value={4}>16px</option>
                    <option value={6}>24px</option>
                  </select>
                </div>
              </div>
            )}

            {/* Theme Seed Color options */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-mono font-bold text-zinc-400">Palette Calibration</label>
              <div className="grid grid-cols-3 gap-2">
                {['emerald', 'blue', 'pink'].map((col) => (
                  <button
                    key={col}
                    onClick={() => setColorScheme(col)}
                    className={`px-3 py-1.5 text-[10px] font-mono font-bold rounded-lg border transition-all ${
                      colorScheme === col
                        ? 'bg-zinc-900 border-emerald-400 text-emerald-400'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {col.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Dynamic engine ready</span>
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 text-pink-505 shrink-0 fill-current" />
              bento-powered
            </span>
          </div>
        </div>

        {/* WORKSPACE PREVIEW & COMPILIER OUTPUT (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6">
          
          {/* LIVE GRAPHIC PREVIEW CANVAS */}
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 relative min-h-[220px] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.25] pointer-events-none" />
            
            {/* Image Placeholder specific live previews */}
            {tool.slug === 'image-placeholder-injector' && (
              <div 
                style={{ height: `${customDimension / 2}px` }}
                className="w-full max-w-[90%] rounded-xl bg-gradient-to-tr from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-zinc-800 flex items-center justify-center p-4 relative z-10 transition-all duration-300 shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-45 pointer-events-none" />
                <div className="text-center font-mono space-y-1">
                  <span className="px-2 py-0.5 bg-black/40 rounded text-[9px] text-emerald-400 font-bold border border-emerald-500/10">
                    {customDimension}px height
                  </span>
                  <p className="text-xs text-zinc-300 font-sans font-bold pt-1">{accentText || 'Sample Mock Heading'}</p>
                </div>
              </div>
            )}

            {/* Glassmorphism live preview */}
            {tool.slug === 'glassmorphism-bento-card' && (
              <div className="w-full max-w-[80%] relative z-10 p-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-zinc-900/60 p-4">
                <div 
                  style={{ 
                    backdropFilter: `blur(${blurRadius}px)`, 
                    backgroundColor: `rgba(255, 255, 255, ${transparency / 100})` 
                  }}
                  className="p-6 rounded-xl border border-white/10 shadow-3xl text-left"
                >
                  <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest">TRANSLUCENT CELL PREVIEW</span>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1.5">{accentText || 'Frosted Glass UI Title'}</h4>
                  <p className="text-[10px] text-zinc-400 font-sans mt-1">Adjust sliders left to adjust frosted depth.</p>
                </div>
              </div>
            )}

            {/* Custom elevated shadow elements preview */}
            {tool.slug === 'css-shadow-generator' && (
              <div 
                style={{ 
                  boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 6px -1px rgba(0,0,0,0.5), 0 ${blurRadius}px ${blurRadius * 2}px -5px rgba(0,0,0,0.3)` 
                }}
                className="w-44 h-44 rounded-2xl bg-zinc-900 border border-zinc-801 flex items-center justify-center relative z-10 p-5 transition-transform"
              >
                <div className="text-center space-y-1.5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">3D Physics Node</span>
                  <h5 className="text-xs font-bold text-white">{accentText || 'Tactile Card'}</h5>
                </div>
              </div>
            )}

            {/* Mesh dynamic design generator preview */}
            {tool.slug === 'gradient-mesh-compiler' && (
              <div className="w-full absolute inset-0 bg-zinc-950 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-zinc-950" />
                <div className="absolute inset-0 opacity-40 mix-blend-screen bg-grid-pattern opacity-10" />
                
                {/* Seed glowing points */}
                <div className="absolute top-0 left-0 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
                <div className="absolute inset-x-12 top-10 h-36 w-36 rounded-full bg-pink-500/15 blur-2xl" />

                <div className="relative z-10 text-center space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-[9px] font-mono text-purple-400 border border-purple-500/10">CSS MESH GRADIENT ACTIVE</span>
                  <p className="text-xs text-zinc-500 font-sans max-w-[200px] leading-relaxed mx-auto">Copy the compiled codes tab to load these stops.</p>
                </div>
              </div>
            )}

            {/* SVG style meshes */}
            {tool.slug === 'svg-container-styler' && (
              <div className="w-full absolute inset-0 bg-transparent flex items-center justify-center">
                <div className="absolute inset-0 bg-zinc-950/20" />
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 pointer-events-none select-none">
                  <defs>
                    <pattern id="bento-grid-mesh-preview" width={blurRadius * 4} height={blurRadius * 4} patternUnits="userSpaceOnUse">
                      <path d={`M ${blurRadius * 4} 0 L 0 0 0 ${blurRadius * 4}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#bento-grid-mesh-preview)" />
                </svg>

                <div className="relative z-10 text-center">
                  <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-white/70 rounded">
                    SVG PATTERN: {blurRadius * 4}px Mesh Gaps
                  </span>
                </div>
              </div>
            )}

            {/* Default general layouts */}
            {tool.slug !== 'image-placeholder-injector' && tool.slug !== 'glassmorphism-bento-card' && tool.slug !== 'css-shadow-generator' && tool.slug !== 'gradient-mesh-compiler' && tool.slug !== 'svg-container-styler' && (
              <div className="w-full p-4 relative z-10 select-none">
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`, 
                    gap: `${gapUnit * 4}px` 
                  }}
                  className="w-full"
                >
                  {[...Array(gridColumns)].map((_, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-90 w-full text-center border border-zinc-900">
                      <span className="text-[10px] font-mono text-zinc-500">Node {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* DYNAMIC CODE WRAPPER IN TABS */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Code className="h-4 w-4 text-purple-400" />
                Compiled Stylesheet Output
              </span>

              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 hover:bg-zinc-850 border border-zinc-805 text-zinc-200'
                }`}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 text-zinc-400" />}
                {copied ? 'Copied' : 'Copy Output'}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-900 text-left font-mono text-[11px] text-zinc-350 leading-relaxed whitespace-pre-wrap select-all">
              {codeString}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
