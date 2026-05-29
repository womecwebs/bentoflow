'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Settings, 
  Sparkles, 
  RefreshCw,
  Smartphone,
  Tablet,
  Laptop,
  Maximize2,
  Copy,
  Check,
  Code
} from 'lucide-react';

export default function BreakpointSimulator() {
  const [colsMobile, setColsMobile] = useState<number>(1);
  const [colsTablet, setColsTablet] = useState<number>(2);
  const [colsDesktop, setColsDesktop] = useState<number>(4);
  const [copied, setCopied] = useState<boolean>(false);
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react' | 'html'>('tailwind');

  const getTailwindCode = () => {
    return `<!-- Tailwind Responsive Bento Matrix Container Grid -->
<div className="grid grid-cols-${colsMobile} md:grid-cols-${colsTablet} lg:grid-cols-${colsDesktop} gap-4 w-full">
  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900">Card item 1</div>
  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900">Card item 2</div>
  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900">Card item 3</div>
  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900">Card item 4</div>
</div>`;
  };

  const getCssCode = () => {
    return `/* Custom responsive media query breakpoints rules */
.responsive-bento-grid {
  display: grid;
  grid-template-columns: repeat(${colsMobile}, minmax(0, 1fr));
  gap: 16px;
}

@media (min-width: 768px) {
  .responsive-bento-grid {
    grid-template-columns: repeat(${colsTablet}, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .responsive-bento-grid {
    grid-template-columns: repeat(${colsDesktop}, minmax(0, 1fr));
  }
}`;
  };

  const getReactCode = () => {
    return `import React from 'react';

export default function ResponsiveGridContainer() {
  const responsiveClasses = "grid grid-cols-${colsMobile} md:grid-cols-${colsTablet} lg:grid-cols-${colsDesktop} gap-4";
  
  return (
    <div className={responsiveClasses}>
      {[1, 2, 3, 4].map((id) => (
        <div key={id} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 text-white">
          Card Element {id}
        </div>
      ))}
    </div>
  );
}`;
  };

  const getHtmlCode = () => {
    return `<!-- Plain native HTML grid -->
<div style="display: grid; gap: 15px;" class="responsive-grid">
  <div style="background: black; padding: 15px; border-radius: 12px; border: 1px solid #222;">Item 1</div>
  <div style="background: black; padding: 15px; border-radius: 12px; border: 1px solid #222;">Item 2</div>
  <div style="background: black; padding: 15px; border-radius: 12px; border: 1px solid #222;">Item 3</div>
  <div style="background: black; padding: 15px; border-radius: 12px; border: 1px solid #222;">Item 4</div>
</div>`;
  };

  const getExportCode = () => {
    switch (exportTab) {
      case 'tailwind': return getTailwindCode();
      case 'css': return getCssCode();
      case 'react': return getReactCode();
      case 'html': return getHtmlCode();
    }
  };

  const handleCopyClasses = () => {
    navigator.clipboard.writeText(getExportCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setColsMobile(1);
    setColsTablet(2);
    setColsDesktop(4);
  };

  return (
    <div className="space-y-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
        
        {/* Sliders Controller (col-span-5) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/85 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Laptop className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Device Matrix</h3>
                <p className="text-[11px] text-zinc-500">Configure layout column mappings across viewport break nodes</p>
              </div>
            </div>

            {/* Slider mobile rows */}
            <div className="space-y-4">
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Mobile Columns</span>
                  <span>{colsMobile} Col</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2"
                  value={colsMobile}
                  onChange={(e) => setColsMobile(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Tablet (md: break point)</span>
                  <span>{colsTablet} Cols</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={colsTablet}
                  onChange={(e) => setColsTablet(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Desktop (lg: break point)</span>
                  <span>{colsDesktop} Cols</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={colsDesktop}
                  onChange={(e) => setColsDesktop(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

            </div>

            {/* Resets and custom triggers */}
            <div className="flex gap-2.5 pt-2 border-t border-zinc-900/40">
              <button
                onClick={handleReset}
                className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                Reset Column Spans
              </button>
            </div>

            {/* Static layout classes guide box */}
            <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-900 text-xs">
              <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Tailwind layout rules:</span>
              <code className="text-[11px] font-mono text-zinc-300 select-all block leading-relaxed break-all">
                {`grid-cols-${colsMobile} md:grid-cols-${colsTablet} lg:grid-cols-${colsDesktop}`}
              </code>
            </div>

          </div>
        </div>

        {/* Device viewports wrapper display column (col-span-12 -> lg:col-span-7) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 text-left min-h-[500px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.20] pointer-events-none" />

            <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40 relative z-10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-200 font-bold">Responsive Concurrent View Simulator</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">Concurrences track models active</span>
            </div>

            {/* Concurrent side-by-side views inside simulator */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto relative z-10 items-stretch font-mono">
              
              {/* MOBILE DEVICE SIMULATION */}
              <div className="p-4 rounded-3xl border border-zinc-900 bg-black/40 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                <div className="flex gap-1.5 items-center text-zinc-400 text-[10px] uppercase pb-3 border-b border-zinc-900/40">
                  <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Mobile (320px)</span>
                </div>
                
                {/* Simulated grid inside */}
                <div className={`grid gap-2 my-6`} style={{ gridTemplateColumns: `repeat(${colsMobile}, minmax(0, 1fr))` }}>
                  {[1, 2, 3, 4].map((id) => (
                    <div key={id} className="p-2.5 rounded border border-zinc-900 bg-zinc-950/95 text-center shadow">
                      <span className="text-[9px] text-zinc-400 font-bold">Card {id}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[8px] text-zinc-550 uppercase flex justify-between pt-2 border-t border-zinc-900/20">
                  <span>Cols: {colsMobile}</span>
                  <span>Interactive</span>
                </div>
              </div>

              {/* TABLET VIEWPORT SIMULATION */}
              <div className="p-4 rounded-3xl border border-zinc-900 bg-black/40 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                <div className="flex gap-1.5 items-center text-zinc-400 text-[10px] uppercase pb-3 border-b border-zinc-900/40">
                  <Tablet className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Tablet (768px)</span>
                </div>

                <div className={`grid gap-2 my-6`} style={{ gridTemplateColumns: `repeat(${colsTablet}, minmax(0, 1fr))` }}>
                  {[1, 2, 3, 4].map((id) => (
                    <div key={id} className="p-2.5 rounded border border-zinc-900 bg-zinc-950/95 text-center shadow">
                      <span className="text-[9px] text-zinc-400 font-bold">Card {id}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[8px] text-zinc-550 uppercase flex justify-between pt-2 border-t border-zinc-900/20">
                  <span>Cols: {colsTablet}</span>
                  <span>Interactive</span>
                </div>
              </div>

              {/* DESKTOP LARGE VIEWPORT SIMULATION */}
              <div className="p-4 rounded-3xl border border-zinc-900 bg-black/40 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                <div className="flex gap-1.5 items-center text-zinc-400 text-[10px] uppercase pb-3 border-b border-zinc-900/40">
                  <Laptop className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Desktop (1200px)</span>
                </div>

                <div className={`grid gap-2 my-6`} style={{ gridTemplateColumns: `repeat(${colsDesktop}, minmax(0, 1fr))` }}>
                  {[1, 2, 3, 4].map((id) => (
                    <div key={id} className="p-2.5 rounded border border-zinc-900 bg-zinc-950/95 text-center shadow">
                      <span className="text-[9px] text-zinc-400 font-bold">Card {id}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[8px] text-zinc-550 uppercase flex justify-between pt-2 border-t border-zinc-900/20">
                  <span>Cols: {colsDesktop}</span>
                  <span>Interactive</span>
                </div>
              </div>

            </div>

            {/* Layout compile scripts */}
            <div className="relative z-10 border-t border-zinc-900/60 pt-4 space-y-4">
              <div className="flex justify-between items-center bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-900/60 w-full col-span-2">
                <div className="flex gap-1">
                  {(['tailwind', 'css', 'react', 'html'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setExportTab(tab)}
                      className={`text-[10px] font-mono tracking-wide px-3 py-1.5 rounded-lg transition-all ${
                        exportTab === tab
                          ? 'bg-zinc-900 text-white font-bold border-b-2 border-emerald-500'
                          : 'text-zinc-550 hover:text-zinc-350'
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleCopyClasses}
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
