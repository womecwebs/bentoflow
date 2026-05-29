'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Settings, 
  Sparkles, 
  RefreshCw,
  SlidersHorizontal,
  Layout,
  Calculator,
  ArrowRight,
  Eye,
  Minimize2,
  Maximize2,
  Check,
  Copy,
  Info
} from 'lucide-react';

interface RoundingPreset {
  name: string;
  label: string;
  outer: number;
  padding: number;
  desc: string;
}

const ROUNDING_PRESETS: RoundingPreset[] = [
  { name: 'ios', label: 'iOS Core Widget', outer: 32, padding: 16, desc: 'Closes standard iOS guidelines' },
  { name: 'bento', label: 'Bento Spotlight Card', outer: 24, padding: 12, desc: 'Proportional modern card template' },
  { name: 'badge', label: 'Compact Pill Badge', outer: 16, padding: 6, desc: 'Tight snug content wraps' },
  { name: 'extreme', label: 'Extreme Fluidity', outer: 48, padding: 20, desc: 'Organic circular structures' }
];

export default function BorderRadiusMatcher() {
  const [outerRadius, setOuterRadius] = useState<number>(24); // px
  const [padding, setPadding] = useState<number>(14); // px
  const [presetChoice, setPresetChoice] = useState<string>('bento');
  const [unit, setUnit] = useState<'px' | 'rem'>('px');
  const [concentricLayers, setConcentricLayers] = useState<number>(2); // 1, 2, or 3 concentric sub-layers
  const [zoomLevel, setZoomLevel] = useState<number>(1.2); // zoom magnifier scale
  const [gridOverlay, setGridOverlay] = useState<boolean>(true);
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react'>('tailwind');
  const [copied, setCopied] = useState<boolean>(false);

  // Calculate inner radius values clamped to 0
  const innerRadiusL1 = Math.max(0, outerRadius - padding);
  const innerRadiusL2 = Math.max(0, innerRadiusL1 - padding);

  const applyPreset = (preset: RoundingPreset) => {
    setPresetChoice(preset.name);
    setOuterRadius(preset.outer);
    setPadding(preset.padding);
  };

  const getExportCode = () => {
    const parentRadius = unit === 'px' ? `${outerRadius}px` : `${(outerRadius / 16).toFixed(3)}rem`;
    const childRadiusL1 = unit === 'px' ? `${innerRadiusL1}px` : `${(innerRadiusL1 / 16).toFixed(3)}rem`;
    const childRadiusL2 = unit === 'px' ? `${innerRadiusL2}px` : `${(innerRadiusL2 / 16).toFixed(3)}rem`;
    const padVal = unit === 'px' ? `${padding}px` : `${(padding / 16).toFixed(3)}rem`;

    switch (exportTab) {
      case 'tailwind':
        return `<!-- Standard Mathematically Symmetrical Nested Rounded Card Markup -->
<div className="p-[${padding}px] rounded-[${outerRadius}px] bg-zinc-950 border border-zinc-900 w-full relative">
  <!-- Symmetrical First Sublayer -->
  <div className="p-[${padding}px] rounded-[${innerRadiusL1}px] bg-zinc-900/60 border border-zinc-850 w-full">
    ${concentricLayers > 2 ? `<!-- Second Innermost Symmetrical Sublayer -->\n    <div className="p-4 rounded-[${innerRadiusL2}px] bg-zinc-950 text-emerald-400 font-mono text-xs">\n      Perfect Symmetrical Nested Layer\n    </div>` : `<!-- SNUG INNER CONTENT BLOCK -->\n    <p className="text-xs text-zinc-300">Perfect rounded bounds align elegantly without distorted gaps.</p>`}
  </div>
</div>`;

      case 'css':
        return `/* Concentric Nested Border Rounding definitions */
.parent-container {
  padding: ${padVal};
  border-radius: ${parentRadius};
  background-color: #0c0c10;
  border: 1px solid #1a1a24;
}

.nested-child-l1 {
  padding: ${padVal};
  border-radius: ${childRadiusL1};
  background-color: #121218;
}

${concentricLayers > 2 ? `.nested-child-l2 {
  border-radius: ${childRadiusL2};
  background-color: #08080a;
}` : ''}`;

      case 'react':
        return `import React from 'react';

export default function BalancedRadii() {
  return (
    <div 
      style={{ borderRadius: '${parentRadius}', padding: '${padVal}' }} 
      className="bg-[#08080a] border border-zinc-900 text-left"
    >
      <div 
        style={{ borderRadius: '${childRadiusL1}', padding: '${padVal}' }} 
        className="bg-zinc-900/50"
      >
        <span className="text-xs text-white">Mathematical Symmetry Achieved</span>
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
        
        {/* Left Column: Geometric parameters and sliders */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Calculator className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Geometric Solvers</h3>
                <p className="text-[11px] text-zinc-500">Solve nested card rounding symmetries live</p>
              </div>
            </div>

            {/* Presets Row selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Load Rounding Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ROUNDING_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className={`py-2 px-2.5 rounded-lg text-xs text-left border transition-all ${
                      presetChoice === preset.name
                        ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400 font-bold'
                        : 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    <span className="font-bold block text-[11px]">{preset.label}</span>
                    <span className="text-[9px] text-zinc-500 font-mono block font-normal">{preset.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Area */}
            <div className="space-y-4">
              
              {/* Outer radius outer slider */}
              <div className="space-y-1.5 flex flex-col">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Outer Boundary Radius (R_outer)</span>
                  <span>{outerRadius}px</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="64"
                  step="2"
                  value={outerRadius}
                  onChange={(e) => {
                    setOuterRadius(Number(e.target.value));
                    setPresetChoice('');
                  }}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* padding internal padding slider */}
              <div className="space-y-1.5 flex flex-col">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Card Internal Padding (P)</span>
                  <span>{padding}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="44"
                  step="2"
                  value={padding}
                  onChange={(e) => {
                    setPadding(Number(e.target.value));
                    setPresetChoice('');
                  }}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

            </div>

            {/* Concentric Sublayers depth selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-zinc-450 uppercase block">Concentric Depths</span>
                <select
                  value={concentricLayers}
                  onChange={(e) => setConcentricLayers(Number(e.target.value))}
                  className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg focus:outline-none"
                >
                  <option value={1}>1 Nested layer</option>
                  <option value={2}>2 Concentric layers</option>
                  <option value={3}>3 Concentric layers</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-zinc-450 uppercase block">Display Unit</span>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'px' | 'rem')}
                  className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg focus:outline-none"
                >
                  <option value="px">Pixels (px)</option>
                  <option value="rem">Standard rems (16px basis)</option>
                </select>
              </div>
            </div>

            {/* Geometric Proof calculations log */}
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 space-y-2.5 font-mono text-xs">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">Geometric Symmetrical Proofs</span>
              <div className="text-zinc-200">
                Formula: R_inner = R_outer - Padding
              </div>
              <div className="space-y-1 text-[11px]">
                <p className="text-emerald-400 font-bold">
                  Layer 1 internal: {outerRadius}px - {padding}px = <span className="underline font-bold text-white">{innerRadiusL1}px</span>
                </p>
                {concentricLayers > 2 && (
                  <p className="text-emerald-500 font-bold">
                    Layer 2 innermost: {innerRadiusL1}px - {padding}px = <span className="underline font-bold text-white">{innerRadiusL2}px</span>
                  </p>
                )}
              </div>
            </div>

            {/* Magnification ZOOM Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>Microscope Zoom Magnification</span>
                <span>{zoomLevel.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Live distortion visual comparison and rounding validator */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.10] pointer-events-none" />

            {/* Frame Indicator headers */}
            <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40 relative z-10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 font-bold">Rounding distortion comparator</span>
              </div>
              
              <button
                onClick={() => setGridOverlay(!gridOverlay)}
                className={`text-[9px] font-mono px-2 py-0.5 rounded transition-all ${
                  gridOverlay ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'bg-zinc-900 text-zinc-500'
                }`}
              >
                Grid Overlay: {gridOverlay ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Comparison sandbox */}
            <div 
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }} 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-auto py-10 relative z-10 transition-transform duration-200"
            >
              
              {/* DISTORTED CARD - PINCHED WRAP OVERLAYS */}
              <div className="space-y-3 text-center">
                <span className="inline-block text-[9px] font-mono bg-rose-500/10 border border-rose-500/15 text-rose-450 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Distorted (R_inner = R_outer)
                </span>

                <div 
                  style={{ borderRadius: `${outerRadius}px`, padding: `${padding}px` }}
                  className="bg-zinc-900 border border-zinc-850 p-0 relative shadow-xl overflow-hidden"
                >
                  {gridOverlay && <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />}
                  
                  {/* Outer - Padding layer matching exact parent radius (bad!) */}
                  <div 
                    style={{ borderRadius: `${outerRadius}px` }}
                    className="h-28 bg-rose-500/10 border border-rose-500/20 flex flex-col items-center justify-center p-3 relative"
                  >
                    <span className="text-[9px] font-mono text-rose-400 uppercase text-center block tracking-tight font-bold">
                      Ugly Pinched Corners
                    </span>
                    <span className="text-[8px] font-mono text-zinc-550 block mt-1">Corners feel crushed</span>
                  </div>
                </div>
              </div>

              {/* UNIFORM CARD - MATHEMATICALLY CALIBRATED (PERFECT FIT) */}
              <div className="space-y-3 text-center">
                <span className="inline-block text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Symmetrical (R_inner = Custom)
                </span>

                <div 
                  style={{ borderRadius: `${outerRadius}px`, padding: `${padding}px` }}
                  className="bg-zinc-900 border border-zinc-850 p-0 relative shadow-xl overflow-hidden"
                >
                  {gridOverlay && <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />}
                  
                  <div 
                    style={{ borderRadius: `${innerRadiusL1}px` }}
                    className="h-28 bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center p-3 relative"
                  >
                    <span className="text-[9px] font-mono text-emerald-400 uppercase text-center block tracking-tight font-bold">
                      Matched Symmetries
                    </span>
                    <span className="text-[8px] font-mono text-zinc-500 block mt-1">Parallel uniform borders</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Symmetrical proofing copyable tabs */}
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
                      {tab === 'tailwind' ? 'Tailwind layout' : tab === 'css' ? 'Core CSS borders' : 'React component'}
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

              <pre className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl font-mono text-[10px] text-zinc-400 overflow-x-auto select-all leading-normal whitespace-pre text-left max-h-[140px]">
                {getExportCode()}
              </pre>
            </div>

          </div>
        </div>

        {/* Informative text info block */}
        <div className="lg:col-span-12 p-3 bg-zinc-950/30 rounded-xl border border-zinc-900 text-xs font-mono text-zinc-500 leading-relaxed text-center">
          Proof: When nesting boxes inside a padded container, the corner arc centers align concentric with the parent border geometry ONLY if R_inner decreases directly proportional to the padding block thickness. (R_inner = R_outer - Padding).
        </div>

      </div>
    </div>
  );
}
