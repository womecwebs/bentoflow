'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Settings, 
  Sparkles, 
  RefreshCw,
  SlidersHorizontal,
  Layout,
  Code,
  Copy,
  Check,
  Eye,
  Layers,
  Palette
} from 'lucide-react';

interface GlassPalette {
  name: string;
  label: string;
  previewBg: string;
  hex: string;
  rgb: string;
}

const COLOR_PALETTES: GlassPalette[] = [
  { name: 'emerald', label: 'Emerald Aurora', previewBg: 'from-emerald-500/40 to-emerald-800/10', hex: '#10b981', rgb: '16, 185, 129' },
  { name: 'cyber', label: 'Cyber Teal', previewBg: 'from-cyan-500/40 to-blue-600/10', hex: '#06b6d4', rgb: '6, 182, 212' },
  { name: 'violet', label: 'Violent Velvet', previewBg: 'from-purple-500/40 to-fuchsia-600/10', hex: '#a855f7', rgb: '168, 85, 247' },
  { name: 'crimson', label: 'Solar Crimson', previewBg: 'from-rose-500/40 to-amber-500/10', hex: '#f43f5e', rgb: '244, 63, 94' },
  { name: 'sunset', label: 'Sunset Amber', previewBg: 'from-amber-400/40 to-rose-600/10', hex: '#f59e0b', rgb: '245, 158, 11' },
  { name: 'glacier', label: 'Deep Glacier', previewBg: 'from-sky-300/30 to-slate-900/40', hex: '#38bdf8', rgb: '56, 189, 248' }
];

export default function GlassmorphismDesigner() {
  const [blurAmount, setBlurAmount] = useState<number>(14); // px
  const [opacity, setOpacity] = useState<number>(15); // % (background opacity)
  const [borderAlpha, setBorderAlpha] = useState<number>(15); // %
  const [saturation, setSaturation] = useState<number>(130); // %
  const [colorTheme, setColorTheme] = useState<string>('cyber');
  const [meshAccent, setMeshAccent] = useState<string>('cosmic');
  const [noiseTexture, setNoiseTexture] = useState<boolean>(true);
  const [shadowGlow, setShadowGlow] = useState<boolean>(true);
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react'>('tailwind');
  const [copied, setCopied] = useState<boolean>(false);

  const activePalette = COLOR_PALETTES.find(p => p.name === colorTheme) || COLOR_PALETTES[1];

  const getCssStyles = () => {
    return `/* Custom Frosted Glassmorphism Card Style */
.bento-glass-panel {
  background: rgba(10, 10, 12, ${opacity / 100});
  backdrop-filter: blur(${blurAmount}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blurAmount}px) saturate(${saturation}%);
  border: 1px solid rgba(255, 255, 255, ${borderAlpha / 100});
  border-radius: 24px;
  ${shadowGlow ? `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45), 0 0 15px rgba(${activePalette.rgb}, 0.12);` : 'box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45);'}
}`;
  };

  const getTailwindClasses = () => {
    const shadowClass = shadowGlow ? ` shadow-[0_8px_32px_0_rgba(0,0,0,0.45),0_0_15px_rgba(${activePalette.rgb},0.12)]` : ' shadow-2xl';
    return `bg-zinc-950/${opacity} backdrop-blur-[${blurAmount}px] border border-white/${borderAlpha} rounded-3xl${shadowClass}`;
  };

  const getExportCode = () => {
    switch (exportTab) {
      case 'tailwind':
        return `<!-- Translucent Frosted Glass Card Tailwind markup -->
<div className="${getTailwindClasses()} p-8 relative overflow-hidden text-left hover:border-white/20 transition-all duration-300">
  ${noiseTexture ? `<!-- Subtle Noise overlay canvas -->\n  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />\n` : ''}
  <span className="text-[10px] text-zinc-500 font-mono tracking-widest block uppercase">Glassmorphic Container Node</span>
  <h3 className="text-xl font-bold text-white mt-1">Frosted Glass Cell</h3>
  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
    Adjust blurring filters live. Displays elegantly over vibrant backgrounds.
  </p>
</div>`;

      case 'css':
        return getCssStyles();

      case 'react':
        return `import React from 'react';

export default function GlassCard() {
  return (
    <div 
      style={{
        backgroundColor: 'rgba(10, 10, 12, ${opacity / 100})',
        backdropFilter: 'blur(${blurAmount}px) saturate(${saturation}%)',
        WebkitBackdropFilter: 'blur(${blurAmount}px) saturate(${saturation}%)',
        borderColor: 'rgba(255, 255, 255, ${borderAlpha / 100})'
      }}
      className="p-8 rounded-3xl border ${shadowGlow ? 'shadow-[0_0_20px_rgba(' + activePalette.rgb + ',0.1)]' : 'shadow-2xl'} relative overflow-hidden"
    >
      ${noiseTexture ? '{/* Grid Pattern noise overlay */}\n      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />\n' : ''}
      <h3 className="text-md font-bold text-white">Dynamic Frosted UI Module</h3>
      <p className="text-xs text-zinc-400 mt-2">Adjust backdrop refractors live.</p>
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
        
        {/* Left Column: Glass Calibration parameters (Editing section) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <SlidersHorizontal className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Glass Controls</h3>
                <p className="text-[11px] text-zinc-500">Tweak backdrop filtration ratios live</p>
              </div>
            </div>

            {/* Sliders managing blur, opacity, border, saturation */}
            <div className="space-y-4">
              
              {/* Sliders blur */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Backdrop Blur Amount</span>
                  <span>{blurAmount}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="2"
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* backing transparency opacity slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Backing Opacity Alpha</span>
                  <span>{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="80"
                  step="2"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* border transparency alpha slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Border Overlay Alpha</span>
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

              {/* saturation level slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Backdrop Color Saturation</span>
                  <span>{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="250"
                  step="10"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

            </div>

            {/* Multiple Palette Choices */}
            <div className="space-y-2.5 pt-2">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Active Light Palette Anchor
              </label>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_PALETTES.map((pal) => (
                  <button
                    key={pal.name}
                    onClick={() => setColorTheme(pal.name)}
                    className={`py-1.5 rounded-lg text-[10px] font-mono transition-all border flex items-center justify-center gap-1.5 ${
                      colorTheme === pal.name
                        ? 'bg-zinc-900 border-zinc-650 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-350'
                    }`}
                  >
                    <span 
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: pal.hex }}
                    />
                    {pal.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Simulator Background Selectors */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-450 uppercase tracking-wider block">
                Simulator Backdrop Mesh
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Cosmic Aurora', val: 'cosmic' },
                  { label: 'Sunset Rise', val: 'sunset' },
                  { label: 'Minimal Dark', val: 'dark' }
                ].map((bg) => (
                  <button
                    key={bg.val}
                    onClick={() => setMeshAccent(bg.val)}
                    className={`py-1.5 rounded-lg text-[10px] font-mono border transition-all ${
                      meshAccent === bg.val
                        ? 'bg-zinc-900 border-zinc-650 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-550 hover:text-zinc-300'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Miscellaneous settings (noise overlay, shadow glowing) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Backing Film Noise</span>
                <button
                  onClick={() => setNoiseTexture(!noiseTexture)}
                  className={`w-full py-1.5 text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 rounded-lg transition-all ${
                    noiseTexture ? 'border-emerald-500/20 text-emerald-400 font-bold' : 'hover:border-zinc-750'
                  }`}
                >
                  {noiseTexture ? 'Noise: ON' : 'Noise: OFF'}
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Ambient Shadow Glow</span>
                <button
                  onClick={() => setShadowGlow(!shadowGlow)}
                  className={`w-full py-1.5 text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 rounded-lg transition-all ${
                    shadowGlow ? 'border-emerald-500/20 text-emerald-400 font-bold' : 'hover:border-zinc-750'
                  }`}
                >
                  {shadowGlow ? 'Glow: ON' : 'Glow: OFF'}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Glass Preview & Multi-exporters */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 min-h-[480px] flex flex-col justify-between relative overflow-hidden text-center">
            
            {/* Mesh Background lights simulations */}
            {meshAccent === 'cosmic' && (
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-600/50 blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-600/50 blur-3xl animate-pulse" />
                <div className="absolute inset-x-20 top-1/3 h-48 w-48 rounded-full bg-pink-500/10 blur-2xl" />
              </div>
            )}
            {meshAccent === 'sunset' && (
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-red-600/60 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-amber-500/40 blur-3xl" />
              </div>
            )}
            {meshAccent === 'dark' && (
              <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.25]" />
            )}

            <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40 relative z-10 text-left">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-100 font-bold">Contrast & Legibility Studio</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-100 bg-zinc-900/40 px-2 py-0.5 rounded tracking-wide font-bold border border-zinc-850 block">
                Refractable preview active
              </span>
            </div>

            {/* Center Canvas display */}
            <div className="relative z-10 my-auto flex items-center justify-center p-8">
              
              {/* Card display wrapper */}
              <div 
                style={{
                  backgroundColor: `rgba(9, 9, 11, ${opacity / 100})`,
                  backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
                  WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
                  borderColor: `rgba(255, 255, 255, ${borderAlpha / 100})`,
                  borderWidth: '1px',
                  boxShadow: shadowGlow ? `0 8px 32px 0 rgba(0, 0, 0, 0.45), 0 0 25px rgba(${activePalette.rgb}, 0.15)` : '0 8px 32px 0 rgba(0, 0, 0, 0.45)'
                }}
                className="max-w-md w-full p-8 rounded-[28px] transition-all duration-205 border text-left relative overflow-hidden"
              >
                {noiseTexture && (
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                )}

                <div className="relative z-10 space-y-4">
                  <div>
                    <span 
                      className="text-[9px] uppercase font-mono tracking-widest font-black block"
                      style={{ color: activePalette.hex }}
                    >
                      {activePalette.label} Theme
                    </span>
                    <h4 className="text-xl font-bold text-white mt-1">Frosted Glass Panel</h4>
                  </div>
                  
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans font-medium">
                    Adjust blurring filters and saturation indexes concurrently on the side to verify contrast ratios. Perfect for crafting layered overlays and portfolio containers.
                  </p>

                  <div className="flex justify-between items-center pt-2 text-[10px] font-mono text-zinc-400 border-t border-white/5">
                    <span>Blur: {blurAmount}px</span>
                    <span>Alpha: {opacity}%</span>
                    <span>Saturate: {saturation}%</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Export options Tab interface */}
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
                      {tab === 'tailwind' ? 'Tailwind HTML' : tab === 'css' ? 'Core CSS classes' : 'React component'}
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

      </div>
    </div>
  );
}
