'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Settings, 
  Sparkles, 
  RefreshCw,
  Palette,
  Copy,
  Check,
  Code,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ColorAnchor {
  id: string;
  color: string;
  posX: number; // %
  posY: number; // %
  size: number; // % representing gradient size
}

const PRESET_MAPPED_PALETTES = [
  {
    name: 'neon-cyber',
    label: 'Cyberpunk Neon',
    anchors: [
      { id: '1', color: '#13b9cf', posX: 15, posY: 15, size: 55 },
      { id: '2', color: '#8b5cf6', posX: 85, posY: 25, size: 65 },
      { id: '3', color: '#ec4899', posX: 25, posY: 75, size: 50 },
      { id: '4', color: '#f59e0b', posX: 75, posY: 80, size: 55 }
    ]
  },
  {
    name: 'aurora-boreal',
    label: 'Emerald Borealis',
    anchors: [
      { id: '1', color: '#10b981', posX: 20, posY: 10, size: 60 },
      { id: '2', color: '#047857', posX: 80, posY: 30, size: 50 },
      { id: '3', color: '#06b6d4', posX: 30, posY: 80, size: 60 },
      { id: '4', color: '#4f46e5', posX: 70, posY: 70, size: 45 }
    ]
  },
  {
    name: 'vampire-goth',
    label: 'Vampire Crimson',
    anchors: [
      { id: '1', color: '#e11d48', posX: 10, posY: 15, size: 55 },
      { id: '2', color: '#4c1d95', posX: 90, posY: 20, size: 65 },
      { id: '3', color: '#000000', posX: 40, posY: 80, size: 40 },
      { id: '4', color: '#be123c', posX: 75, posY: 75, size: 50 }
    ]
  },
  {
    name: 'sunset-amber',
    label: 'Golden Sunset',
    anchors: [
      { id: '1', color: '#f59e0b', posX: 30, posY: 10, size: 50 },
      { id: '2', color: '#dc2626', posX: 80, posY: 40, size: 65 },
      { id: '3', color: '#701a75', posX: 15, posY: 75, size: 50 },
      { id: '4', color: '#db2777', posX: 70, posY: 85, size: 55 }
    ]
  }
];

export default function MeshGradientMixer() {
  const [anchors, setAnchors] = useState<ColorAnchor[]>(PRESET_MAPPED_PALETTES[0].anchors);
  const [activeAnchorId, setActiveAnchorId] = useState<string>('1');
  const [gradientOpacity, setGradientOpacity] = useState<number>(30); // in percent
  const [showCoordinates, setShowCoordinates] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react'>('css');

  const updateAnchor = (field: keyof ColorAnchor, value: any) => {
    setAnchors(anchors.map(anchor => 
      anchor.id === activeAnchorId ? { ...anchor, [field]: value } : anchor
    ));
  };

  const getCompiledBackgroundStyle = () => {
    const opacityHex = Math.round((gradientOpacity / 100) * 255).toString(16).padStart(2, '0');
    const gradientRules = anchors.map(anchor => {
      return `radial-gradient(circle ${anchor.size}% at ${anchor.posX}% ${anchor.posY}%, ${anchor.color}${opacityHex}, transparent 75%)`;
    }).join(', ');
    
    return `background-image: ${gradientRules}, radial-gradient(circle at center, #09090b, #030303);`;
  };

  const getStyleObject = () => {
    const opVal = (gradientOpacity / 100).toFixed(2);
    const gradientRules = anchors.map(anchor => {
      // Convert standard hex to rgba to be highly robust and cross-browser safe
      const r = parseInt(anchor.color.slice(1, 3), 16);
      const g = parseInt(anchor.color.slice(3, 5), 16);
      const b = parseInt(anchor.color.slice(5, 7), 16);
      return `radial-gradient(circle ${anchor.size}% at ${anchor.posX}% ${anchor.posY}%, rgba(${r}, ${g}, ${b}, ${opVal}), transparent 75%)`;
    }).join(', ');
    return {
      backgroundImage: `${gradientRules}, radial-gradient(circle at center, #09090b, #030303)`
    };
  };

  const loadPreset = (presetName: string) => {
    const preset = PRESET_MAPPED_PALETTES.find(p => p.name === presetName);
    if (preset) {
      setAnchors(preset.anchors);
    }
  };

  const getExportCode = () => {
    const opHex = Math.round((gradientOpacity / 100) * 255).toString(16).padStart(2, '0');
    switch (exportTab) {
      case 'css':
        return `/* Beautiful Multi-Stops CSS Gradient Mesh */
.bento-radial-mesh {
  background-color: #0c0c0e;
  background-image: 
    ${anchors.map(a => `radial-gradient(circle ${a.size}% at ${a.posX}% ${a.posY}%, ${a.color}${opHex} 0%, transparent 75%)`).join(',\n    ')},
    radial-gradient(circle at center, #0c0c0e 0%, #030304 100%);
}`;

      case 'tailwind':
        return `<!-- Tailwind Mesh Gradient ambient background layer -->
<div className="absolute inset-0 bg-[#0c0c0e] overflow-hidden -z-10">
  <!-- Interactive Glowing mesh elements styled dynamically -->
  <div 
    style={{
      backgroundImage: \`${anchors.map(a => `radial-gradient(circle ${a.size}% at ${a.posX}% ${a.posY}%, ${a.color}${opHex}, transparent 75%)`).join(', ')},\`
    }}
    className="absolute inset-0 opacity-80"
  />
  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
</div>`;

      case 'react':
        return `import React from 'react';

export default function GlassMeshSection() {
  const meshStyle = {
    backgroundColor: '#0c0c0e',
    backgroundImage: \`${anchors.map(a => `radial-gradient(circle ${a.size}% at ${a.posX}% ${a.posY}%, ${a.color}${opHex} 0%, transparent 70%)`).join(', ')}\`,
    backgroundPosition: 'center',
  };

  return (
    <div style={meshStyle} className="min-h-[400px] w-full rounded-3xl p-8 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <h3 className="text-xl font-bold text-white z-10">Meshed Glow Grid</h3>
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

  const activeAnchor = anchors.find(a => a.id === activeAnchorId) || anchors[0];

  return (
    <div className="w-full text-left space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
        
        {/* Left Column: Mixer parameter selectors */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Palette className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Atmosphere Mixer</h3>
                <p className="text-[11px] text-zinc-500">Edit multi-point glowing coordinate vectors</p>
              </div>
            </div>

            {/* Load preset palettes */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Load Mesh Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_MAPPED_PALETTES.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset.name)}
                    className="p-2 text-left rounded-lg bg-zinc-900/60 border border-zinc-900 hover:border-zinc-750 text-[11px] text-zinc-300 font-medium transition-all"
                  >
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selecting active glow light anchors */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Select Active Light Sphere
              </label>
              <div className="grid grid-cols-4 gap-2">
                {anchors.map(anchor => (
                  <button
                    key={anchor.id}
                    onClick={() => setActiveAnchorId(anchor.id)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                      activeAnchorId === anchor.id
                        ? 'bg-zinc-900 border-zinc-650 text-emerald-400 font-black'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-550 hover:text-zinc-300'
                    }`}
                  >
                    Sphere {anchor.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Adjusting parameters of the active anchor */}
            <div className="space-y-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 relative">
              <span className="text-[11px] font-mono text-zinc-450 uppercase block">
                Tweak Sphere {activeAnchorId} Settings:
              </span>

              {/* Color picker */}
              <div className="flex gap-3 items-center">
                <span className="text-[10px] text-zinc-500 uppercase font-mono shrink-0">Color value:</span>
                <input
                  type="color"
                  value={activeAnchor.color}
                  onChange={(e) => updateAnchor('color', e.target.value)}
                  className="h-8 w-8 rounded border-0 bg-transparent cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  value={activeAnchor.color}
                  onChange={(e) => updateAnchor('color', e.target.value)}
                  className="w-full text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-850 px-3 py-2 rounded-lg focus:outline-none"
                />
              </div>

              {/* X coordinate position */}
              <div className="space-y-1.5 flex flex-col">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Horizontal coordinate (X)</span>
                  <span>{activeAnchor.posX}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={activeAnchor.posX}
                  onChange={(e) => updateAnchor('posX', Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Y coordinate position */}
              <div className="space-y-1.5 flex flex-col">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Vertical coordinate (Y)</span>
                  <span>{activeAnchor.posY}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={activeAnchor.posY}
                  onChange={(e) => updateAnchor('posY', Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Intensity / size radius */}
              <div className="space-y-1.5 flex flex-col">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Sphere Glow Coverage</span>
                  <span>{activeAnchor.size}% radius</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  step="5"
                  value={activeAnchor.size}
                  onChange={(e) => updateAnchor('size', Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

            </div>

            {/* Global Mesh settings */}
            <div className="space-y-3.5 pt-2 border-t border-zinc-900/40">
              <div className="space-y-1.5 flex flex-col">
                <div className="flex justify-between text-[11px] font-mono text-zinc-440">
                  <span>Global Gradient transparency</span>
                  <span>{gradientOpacity}% opacity</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  step="5"
                  value={gradientOpacity}
                  onChange={(e) => setGradientOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-405"
                />
              </div>

              <div className="flex justify-between items-center bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                <span className="text-[10px] uppercase font-mono text-zinc-500">Visual Coordinate indicators</span>
                <button
                  onClick={() => setShowCoordinates(!showCoordinates)}
                  className={`text-[9px] font-mono px-3 py-1 rounded transition-colors ${
                    showCoordinates ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-900 text-zinc-500'
                  }`}
                >
                  {showCoordinates ? 'INDICATORS: ON' : 'INDICATORS: OFF'}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live visual mesh preview (Symmetric panel display) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div 
            style={getStyleObject()}
            className="p-6 rounded-[32px] border border-zinc-900 min-h-[500px] flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-3xl text-center"
          >
            {/* Standard noise canvas layer */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />

            <div className="flex justify-between items-center pb-4 border-b border-zinc-800/40 relative z-10 text-left">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse animate-ping shrink-0" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-200 font-bold">Atmospheric Mesh Canvas Studio</span>
              </div>
              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider block">
                Mesh Render Active
              </span>
            </div>

            {/* Floating visual indicators or drag dots inside preview canvas */}
            <div className="absolute inset-0 z-10 pointer-events-none select-none">
              {showCoordinates && anchors.map(anchor => (
                <div
                  key={anchor.id}
                  style={{ left: `${anchor.posX}%`, top: `${anchor.posY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
                >
                  <div 
                    className={`h-4 w-4 rounded-full border-2 transition-all shadow-[0_0_10px_rgba(255,255,255,0.4)] ${
                      activeAnchorId === anchor.id 
                        ? 'bg-white border-zinc-950 scale-125' 
                        : 'bg-zinc-900 border-white/50 opacity-60'
                    }`}
                  />
                  <span className="px-1.5 py-0.5 bg-black/60 rounded font-mono text-[9px] text-zinc-300 border border-white/10 uppercase">
                    S_{anchor.id} ({anchor.posX}%, {anchor.posY}%)
                  </span>
                </div>
              ))}
            </div>

            {/* Frosted Layer check overlay element inside center layout */}
            <div className="relative z-20 my-auto flex items-center justify-center p-6">
              <div className="max-w-xs p-6 rounded-2xl bg-zinc-950/50 border border-white/10 backdrop-blur-lg shadow-3xl text-left space-y-3">
                <span className="text-[8px] uppercase tracking-widest font-mono font-bold text-emerald-400">Backdrop Filtration Check</span>
                <h4 className="text-sm font-bold text-white">Refraction Symmetries</h4>
                <p className="text-[11px] text-zinc-300 leading-normal">
                  Toggle coordinate indicators or drag point values inside parameters left to view real gradient blends beneath frosted surfaces.
                </p>
              </div>
            </div>

            {/* CSS styles sheet tab switcher & and exporter */}
            <div className="relative z-20 border-t border-zinc-800/40 pt-4 space-y-4">
              <div className="flex justify-between items-center bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-900/60 w-full col-span-2">
                <div className="flex gap-1.5">
                  {(['css', 'tailwind', 'react'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setExportTab(tab)}
                      className={`text-[10px] font-mono tracking-wide px-3 py-1.5 rounded-lg transition-all ${
                        exportTab === tab
                          ? 'bg-zinc-900 text-white font-bold border-b-2 border-emerald-500'
                          : 'text-zinc-550 hover:text-zinc-350'
                      }`}
                    >
                      {tab === 'css' ? 'Custom CSS background' : tab === 'tailwind' ? 'Tailwind dynamic' : 'React component'}
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
