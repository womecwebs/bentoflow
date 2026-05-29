'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Settings, 
  Sparkles, 
  RefreshCw,
  Maximize,
  Check,
  Code,
  Layout,
  SlidersHorizontal,
  Eye,
  Copy
} from 'lucide-react';

export default function GridHeightsFixer() {
  const [textLength, setTextLength] = useState<string>('long'); // 'short' | 'medium' | 'long' | 'overflow'
  const [aspectRatio, setAspectRatio] = useState<string>('golden'); // 'square' | 'video' | 'golden' | 'portrait' | 'none'
  const [minHeight, setMinHeight] = useState<number>(160); // px
  const [fixDensity, setFixDensity] = useState<'normal' | 'dense'>('dense');
  const [debugLines, setDebugLines] = useState<boolean>(true);
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react'>('tailwind');
  const [copied, setCopied] = useState<boolean>(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'video': return 'aspect-video';
      case 'golden': return 'aspect-[1.618/1]';
      case 'portrait': return 'aspect-[3/4]';
      default: return 'h-0 hidden';
    }
  };

  const getAspectLabel = () => {
    switch (aspectRatio) {
      case 'square': return 'Square 1:1';
      case 'video': return 'Widescreen 16:9';
      case 'golden': return 'Golden Ratio 1.618:1';
      case 'portrait': return 'Portrait 3:4';
      default: return 'No Image';
    }
  };

  const getExportCode = () => {
    const minRowDef = `${minHeight}px`;
    const densityFlag = fixDensity === 'dense' ? ' grid-flow-row-dense' : '';
    
    switch (exportTab) {
      case 'tailwind':
        return `<!-- Responsive Bento Layout Grid with Row Height Constraints -->
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(${minRowDef},_auto)]${densityFlag} w-full">
  <!-- Dynamic Card 1: Expands based on Content Aspect -->
  <div className="row-span-2 col-span-2 p-6 bg-zinc-950 border border-zinc-90 w-full rounded-2xl flex flex-col justify-between overflow-hidden relative">
    <div>
      <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Dynamic Spotlight Card</span>
      <h3 className="text-lg font-bold text-zinc-100 mt-2">Responsive Aspect Height Node</h3>
      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
        This card uses auto-rows with a base of ${minHeight}px to scale nicely with text volumes without clipping or overflows.
      </p>
    </div>
    ${aspectRatio !== 'none' ? `<!-- Symmetrical Aspect-bounded Image Frame -->\n    <div className="w-full ${getAspectClass()} mt-4 rounded-xl bg-zinc-900 border border-zinc-50 outline-none flex items-center justify-center font-mono text-[9px] text-zinc-500">Asset: ${getAspectLabel()}</div>` : ''}
  </div>

  <!-- Dynamic Card 2: standard unit card -->
  <div className="p-6 bg-zinc-950 border border-zinc-90 rounded-2xl flex flex-col justify-between min-h-[140px]">
    <div>
      <span className="text-[10px] text-zinc-500 font-mono">NODE 2</span>
      <h4 className="text-sm font-bold text-white mt-1">Lightweight Component</h4>
    </div>
    <span className="text-[10px] text-zinc-500 font-mono italic">Fits inside standard row bounds</span>
  </div>
</div>`;

      case 'css':
        return `/* Professional Grid Auto-Rows Heights Fix stylesheet */
.bento-fixed-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  /* Minmax automatically locks individual grid slot aspect ratios */
  grid-auto-rows: minmax(${minHeight}px, auto);
  ${fixDensity === 'dense' ? 'grid-auto-flow: row dense;' : ''}
}

@media (min-width: 768px) {
  .bento-fixed-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.bento-cell-spotlight {
  grid-column: span 2;
  grid-row: span 2;
  padding: 24px;
  background-color: #0c000c;
  border: 1px solid #1a1a20;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bento-cell-small {
  padding: 24px;
  background-color: #0c0c0e;
  border-radius: 16px;
}`;

      case 'react':
        return `import React from 'react';

export default function BalancedHeightsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(${minHeight}px,_auto)]${fixDensity === 'dense' ? ' grid-flow-row-dense' : ''} text-left">
      {/* Primary Card */}
      <div className="col-span-2 row-span-2 p-6 bg-[#09090b] border border-zinc-900 rounded-3xl flex flex-col justify-between relative overflow-hidden">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-[#10b981] uppercase font-bold">Dynamic Node</span>
          <h3 className="text-md font-bold text-white mt-1">Balanced Height Dashboard Panel</h3>
          <p className="text-xs text-zinc-400 mt-2">Supports multi-density auto alignments.</p>
        </div>
      </div>

      {/* Side Card */}
      <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-3xl min-h-[140px] flex flex-col justify-between">
        <h4 className="text-xs font-bold text-white">Secondary Card Widget</h4>
        <span className="text-[10px] text-zinc-500 font-mono">1x Height Unit</span>
      </div>
    </div>
  );
}`;
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
        
        {/* Left Column: Parameter controllers and selectors */}
        {/* Left Column: Editor controls */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Maximize className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Metrics Parameter Lab</h3>
                <p className="text-[11px] text-zinc-500">Calculate dynamic auto row height allocations</p>
              </div>
            </div>

            {/* Test Case Selection (Text Volume simulate) */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-450 uppercase tracking-wider block">
                Simulated Copied Text Volume
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Short Node (2 Lines)', val: 'short' },
                  { label: 'Medium Paragraph', val: 'medium' },
                  { label: 'Long Description', val: 'long' },
                  { label: 'Massive Overflow Block', val: 'overflow' }
                ].map((txt) => (
                  <button
                    key={txt.val}
                    onClick={() => setTextLength(txt.val)}
                    className={`py-2 px-2.5 rounded-lg text-[11px] font-mono text-left border transition-all ${
                      textLength === txt.val
                        ? 'bg-zinc-900 border-zinc-650 text-emerald-400 font-bold'
                        : 'bg-zinc-950 border-zinc-900/60 text-zinc-400'
                    }`}
                  >
                    <span className={`inline-block h-1.5 w-1.5 rounded-full mr-2 ${textLength === txt.val ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                    {txt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Aspect ratio simulation */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-450 uppercase tracking-wider block">
                Integrated Asset Aspect ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Square (1:1)', val: 'square' },
                  { label: 'Golden (1.618)', val: 'golden' },
                  { label: 'Video (16:9)', val: 'video' },
                  { label: 'Portrait (3:4)', val: 'portrait' },
                  { label: 'No Asset', val: 'none' }
                ].map((img) => (
                  <button
                    key={img.val}
                    onClick={() => setAspectRatio(img.val)}
                    className={`py-1.5 rounded-lg text-[10px] font-mono transition-all border ${
                      aspectRatio === img.val
                        ? 'bg-zinc-900 border-zinc-650 text-white font-semibold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-550 hover:text-zinc-300'
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider to fine tune minmax base constraint */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>Base Auto Row Minimum Height</span>
                <span>minmax({minHeight}px, auto)</span>
              </div>
              <input
                type="range"
                min="80"
                max="260"
                step="10"
                value={minHeight}
                onChange={(e) => setMinHeight(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Layout parameters toggler */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Row Flow Density</span>
                <button
                  onClick={() => setFixDensity(fixDensity === 'dense' ? 'normal' : 'dense')}
                  className={`w-full py-1.5 text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 rounded-lg transition-all ${
                    fixDensity === 'dense' ? 'border-emerald-500/20 text-emerald-400 hover:text-emerald-350' : 'hover:border-zinc-700'
                  }`}
                >
                  {fixDensity === 'dense' ? 'Dense Layout (Auto-fill)' : 'Normal Flow'}
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Visual Debug Grids</span>
                <button
                  onClick={() => setDebugLines(!debugLines)}
                  className={`w-full py-1.5 text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 rounded-lg transition-all ${
                    debugLines ? 'border-emerald-500/20 text-emerald-400' : 'hover:border-zinc-700'
                  }`}
                >
                  {debugLines ? 'Debug Grids: ON' : 'Debug Grids: OFF'}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Dynamic Heights Interactive Preview & Exporters */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.20]" />

            <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40 relative z-10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-100 font-bold">Dynamic Heights Balance Simulator</span>
              </div>
              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2 py-0.5 rounded tracking-widest font-bold uppercase block">
                Balanced Engine Active
              </span>
            </div>

            {/* Grid Preview Simulation with Dynamic Row heights */}
            <div className="my-6 relative z-10 space-y-4">
              
              {/* Overlay lines to visually illustrate row boundaries */}
              {debugLines && (
                <div className="text-[9px] font-mono text-zinc-550 flex items-center justify-between pointer-events-none select-none pb-1.5 border-b border-dashed border-zinc-900">
                  <span>Row boundaries indicated below</span>
                  <div className="flex gap-2 text-[9px]">
                    <span className="text-zinc-650">Row Unit size: {minHeight}px</span>
                    <span className="text-emerald-400/80">■ Auto-expanding fit</span>
                  </div>
                </div>
              )}

              {/* Grid Simulator container */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-300`}
                style={{
                  gridAutoRows: `minmax(${minHeight}px, auto)`,
                  gridAutoFlow: fixDensity === 'dense' ? 'row dense' : undefined
                }}
              >
                
                {/* Simulated SPOTLIGHT Card which expands flexibly with text volumes */}
                <div className="md:col-span-2 md:row-span-2 p-5 rounded-2xl border border-zinc-850 bg-zinc-950/90 relative flex flex-col justify-between overflow-hidden shadow-xl animate-fade-in">
                  {/* Neon backlight indicators */}
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-mono bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase tracking-widest block font-bold">
                        Calculated Spotlight Cell
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">Dynamic Content Fitting Node</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-lg transition-all duration-300">
                      {textLength === 'short' && 'Sleek short copy block representing lightweight features.'}
                      {textLength === 'medium' && 'Medium-sized text copy designed for descriptive bento blocks. Fits default cell grids heights cleanly.'}
                      {textLength === 'long' && 'Comprehensive detailed technical documentation draft containing extra lists, complex layout parameters, and auto margins. Our fixer calculates appropriate scaling factors dynamically to preserve alignment symmetries without clipping rows.'}
                      {textLength === 'overflow' && 'Massive overflow paragraph containing simulated extreme copy. Ordinary grid systems with non-auto layouts would display messy clippings, but with our (Minmax + Auto-Rows) formula applied, the card expands smoothly. Spans and gutters maintain exact responsive dimensions.'}
                    </p>
                  </div>

                  {/* Aspect-bounded simulated Media item */}
                  {aspectRatio !== 'none' && (
                    <div className={`w-full ${getAspectClass()} mt-4 rounded-xl bg-zinc-900 border border-zinc-850 hover:border-zinc-800 flex flex-col items-center justify-center font-mono text-[9px] text-zinc-500 transition-all duration-200 select-none relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
                      <span className="relative z-10 font-bold tracking-wide uppercase">Asset container ({getAspectLabel()})</span>
                      <span className="relative z-10 text-[8px] text-zinc-600 mt-1">Conforms precisely to aspect ratios</span>
                    </div>
                  )}
                </div>

                {/* Sub Card A */}
                <div className="p-4 rounded-2xl border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[120px]">
                  <div>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase">Unit Node A</span>
                    <h5 className="text-xs font-bold text-white mt-1">Metric Statistics</h5>
                    <p className="text-[10px] text-zinc-400 mt-1 font-mono tracking-tight leading-tight">Streak: 12 days active</p>
                  </div>
                  <span className="text-[8px] font-mono text-zinc-650 uppercase">Row height is preserved</span>
                </div>

                {/* Sub Card B */}
                <div className="p-4 rounded-2xl border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[120px]">
                  <div>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase">Unit Node B</span>
                    <h5 className="text-xs font-bold text-white mt-1">Concentric Bounds</h5>
                    <p className="text-[10px] text-zinc-500 mt-1">R_outer calibrated</p>
                  </div>
                  <span className="text-[8px] font-mono text-zinc-650 uppercase">Grid bounds synchronized</span>
                </div>

              </div>

            </div>

            {/* Exporter Suite Panels */}
            <div className="relative z-10 border-t border-zinc-900/60 pt-4 space-y-4">
              <div className="flex justify-between items-center bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-900/60">
                <div className="flex gap-1.5">
                  {(['tailwind', 'css', 'react'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setExportTab(tab)}
                      className={`text-[10px] font-mono tracking-wide px-3 py-1.5 rounded-lg transition-all ${
                        exportTab === tab
                          ? 'bg-zinc-900 text-white font-bold border-b-2 border-emerald-500'
                          : 'text-zinc-550 hover:text-zinc-350'
                      }`}
                    >
                      {tab === 'tailwind' ? 'Tailwind auto-rows' : tab === 'css' ? 'Core CSS Layout' : 'React component'}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleCopyCode}
                  className={`inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 font-bold rounded-lg text-[10px] px-3.5 py-1.5 transition-colors`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <pre className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl font-mono text-[10px] text-zinc-400 overflow-x-auto select-all max-h-[140px] leading-relaxed whitespace-pre font-normal text-left">
                {getExportCode()}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
