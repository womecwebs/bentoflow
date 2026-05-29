'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Sliders, 
  Code, 
  Settings, 
  Palette, 
  Sparkles, 
  RefreshCw,
  Plus,
  Trash2,
  Maximize2,
  Minimize2,
  Smartphone,
  Monitor,
  Type,
  Move
} from 'lucide-react';

interface PaletteScheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  darkBorder: string;
  darkBg: string;
}

const PALETTE_SCHEMES: PaletteScheme[] = [
  {
    name: 'Cosmic Emerald',
    primary: '#10b981',
    secondary: '#3b82f6',
    accent: '#8b5cf6',
    darkBorder: '#1e293b',
    darkBg: '#090d16'
  },
  {
    name: 'Sunset Rose',
    primary: '#f43f5e',
    secondary: '#f97316',
    accent: '#84cc16',
    darkBorder: '#27191d',
    darkBg: '#0d0709'
  },
  {
    name: 'Oceanic Wave',
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#10b981',
    darkBorder: '#0f172a',
    darkBg: '#030712'
  },
  {
    name: 'Aura Neon',
    primary: '#d946ef',
    secondary: '#ec4899',
    accent: '#e11d48',
    darkBorder: '#2d0f33',
    darkBg: '#0b020c'
  },
  {
    name: 'cyberpunk-slate',
    primary: '#f59e0b',
    secondary: '#14b8a6',
    accent: '#6366f1',
    darkBorder: '#27272a',
    darkBg: '#09090b'
  }
];

interface BentoBox {
  id: string;
  title: string;
  tag: string;
  spanColumns: 1 | 2 | 3;
  type: 'metric' | 'cta' | 'chart' | 'generic';
  metricValue?: string;
  metricLabel?: string;
}

export default function ColorPaletteExplorer() {
  const [primary, setPrimary] = useState<string>(PALETTE_SCHEMES[0].primary);
  const [secondary, setSecondary] = useState<string>(PALETTE_SCHEMES[0].secondary);
  const [accent, setAccent] = useState<string>(PALETTE_SCHEMES[0].accent);
  const [darkBorder, setDarkBorder] = useState<string>(PALETTE_SCHEMES[0].darkBorder);
  const [darkBg, setDarkBg] = useState<string>(PALETTE_SCHEMES[0].darkBg);
  const [copied, setCopied] = useState<boolean>(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [presetName, setPresetName] = useState<string>('Cosmic Emerald');
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react'>('tailwind');

  // Interactive Boxes State
  const [boxes, setBoxes] = useState<BentoBox[]>([
    { id: '1', title: 'Developer Metrics', tag: 'Analytics Node', spanColumns: 2, type: 'metric', metricValue: '4.8s', metricLabel: 'Average First Contentful Paint' },
    { id: '2', title: 'SaaS Integration', tag: 'API Webhook', spanColumns: 1, type: 'chart' },
    { id: '3', title: 'Convert Layout List', tag: 'Grid Preset', spanColumns: 1, type: 'generic' },
    { id: '4', title: 'Seamless Web Compilation', tag: 'Active Compiler', spanColumns: 2, type: 'cta' }
  ]);

  const selectPreset = (preset: PaletteScheme) => {
    setPresetName(preset.name);
    setPrimary(preset.primary);
    setSecondary(preset.secondary);
    setAccent(preset.accent);
    setDarkBorder(preset.darkBorder);
    setDarkBg(preset.darkBg);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getTailwindExtensionCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const generateRandomScheme = () => {
    const letters = '0123456789ABCDEF';
    const getRandomHex = () => {
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    setPresetName('Random Seed Palette');
    setPrimary(getRandomHex());
    setSecondary(getRandomHex());
    setAccent(getRandomHex());
    setDarkBorder('#27272a');
    setDarkBg('#0c0c0e');
  };

  // Grid Operations
  const handleAddBox = () => {
    if (boxes.length >= 8) return;
    const newBox: BentoBox = {
      id: Date.now().toString(),
      title: 'Spotlight Feature Panel',
      tag: 'New Module',
      spanColumns: 1,
      type: 'generic'
    };
    setBoxes([...boxes, newBox]);
  };

  const handleRemoveBox = (id: string) => {
    if (boxes.length <= 1) return;
    setBoxes(boxes.filter(b => b.id !== id));
  };

  const handleScaleUp = (id: string) => {
    setBoxes(boxes.map(b => {
      if (b.id === id) {
        const nextSpan = b.spanColumns === 1 ? 2 : b.spanColumns === 2 ? 3 : 1;
        return { ...b, spanColumns: nextSpan as any };
      }
      return b;
    }));
  };

  const handleEditBoxText = (id: string, text: string) => {
    setBoxes(boxes.map(b => b.id === id ? { ...b, title: text } : b));
  };

  const handleEditBoxType = (id: string, type: BentoBox['type']) => {
    setBoxes(boxes.map(b => {
      if (b.id === id) {
        if (type === 'metric') {
          return { ...b, type, metricValue: '99.9%', metricLabel: 'SLA Guarantee' };
        }
        return { ...b, type };
      }
      return b;
    }));
  };

  const getTailwindExtensionCode = () => {
    switch (exportTab) {
      case 'tailwind':
        return `// Extend tailwind.config.ts config file
export default {
  theme: {
    extend: {
      colors: {
        bento: {
          primary: '${primary}',
          secondary: '${secondary}',
          accent: '${accent}',
          border: '${darkBorder}',
          bg: '${darkBg}',
        }
      }
    }
  }
}`;

      case 'css':
        return `/* Core variables applied on custom stylesheet root layout */
:root {
  --bento-primary-hex: ${primary};
  --bento-secondary-hex: ${secondary};
  --bento-accent-hex: ${accent};
  --bento-border-hex: ${darkBorder};
  --bento-bg-hex: ${darkBg};
}

.bento-custom-card {
  background-color: var(--bento-bg-hex);
  border: 1px solid var(--bento-border-hex);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}`;

      case 'react':
        return `import React from 'react';

export default function HarmoniousBentoDashboard() {
  const customConfig = {
    backgroundColor: '${darkBg}',
    borderColor: '${darkBorder}'
  };

  return (
    <div style={customConfig} className="p-8 border rounded-[32px] space-y-6">
      <span className="text-xs font-bold text-[${primary}]">Cosmic Theme Loaded</span>
      <h3 className="text-xl font-extrabold text-white">Live Refractable Grid</h3>
    </div>
  );
}`;
    }
  };

  return (
    <div className="w-full text-left space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
        
        {/* Left Column: Palette Calibration controls (Editing section) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/85 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Palette className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Palette Calibration</h3>
                <p className="text-[11px] text-zinc-500">Assign color seeds to dynamic bento matrices</p>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Seed Preset Templates
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PALETTE_SCHEMES.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => selectPreset(preset)}
                    className={`p-2 rounded-lg text-left border text-[11px] transition-all font-medium ${
                      presetName === preset.name
                        ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400 font-bold'
                        : 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Editing Hex seeds */}
            <div className="space-y-3.5 pt-2 border-t border-zinc-900/60 text-xs text-left">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5Col text-left">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Primary Accent</span>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={primary}
                      onChange={(e) => setPrimary(e.target.value)}
                      className="h-8 w-8 rounded border-0 bg-transparent cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={primary}
                      onChange={(e) => setPrimary(e.target.value)}
                      className="w-full text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5Col text-left">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Secondary Accent</span>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={secondary}
                      onChange={(e) => setSecondary(e.target.value)}
                      className="h-8 w-8 rounded border-0 bg-transparent cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={secondary}
                      onChange={(e) => setSecondary(e.target.value)}
                      className="w-full text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5Col text-left">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Spotlight Glow</span>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={accent}
                      onChange={(e) => setAccent(e.target.value)}
                      className="h-8 w-8 rounded border-0 bg-transparent cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={accent}
                      onChange={(e) => setAccent(e.target.value)}
                      className="w-full text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5Col text-left">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Border Accent</span>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={darkBorder}
                      onChange={(e) => setDarkBorder(e.target.value)}
                      className="h-8 w-8 rounded border-0 bg-transparent cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={darkBorder}
                      onChange={(e) => setDarkBorder(e.target.value)}
                      className="w-full text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Canvas Deep Background</span>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={darkBg}
                    onChange={(e) => setDarkBg(e.target.value)}
                    className="h-8 w-8 rounded border-0 bg-transparent cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={darkBg}
                    onChange={(e) => setDarkBg(e.target.value)}
                    className="w-full text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-850 px-3 py-1.5 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Dynamic Card/Block Editor Tools */}
            <div className="pt-4 border-t border-zinc-900 text-left space-y-3">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Card Grid Manager
              </span>
              
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddBox}
                  disabled={boxes.length >= 8}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 disabled:opacity-40 flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5 text-emerald-400" />
                  Add Card Element
                </button>
                <button
                  onClick={generateRandomScheme}
                  className="py-2 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-white"
                  title="Randomize Harmonious Theme"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              {/* Simple inline edit block list inside sidebar scroll */}
              <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                {boxes.map((box, index) => (
                  <div key={box.id} className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-900 flex items-center justify-between text-xs gap-3">
                    <div className="space-y-1 w-full text-left">
                      <input
                        type="text"
                        value={box.title}
                        onChange={(e) => handleEditBoxText(box.id, e.target.value)}
                        className="text-[11px] font-bold text-white bg-transparent outline-none w-full border-b border-transparent focus:border-zinc-700 pb-0.5"
                      />
                      <div className="flex gap-1.5 text-[9px] font-mono text-zinc-550 select-none">
                        <span>Card {index+1}</span>
                        <span>•</span>
                        <span>Col Span-{box.spanColumns}</span>
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleScaleUp(box.id)}
                        className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400"
                        title="Change horizontal scaling span (1-3)"
                      >
                        <Maximize2 className="h-3 w-3" />
                      </button>
                      <select
                        value={box.type}
                        onChange={(e) => handleEditBoxType(box.id, e.target.value as any)}
                        className="bg-zinc-950 border border-zinc-900 rounded px-1 text-[9px] text-zinc-400"
                      >
                        <option value="generic">Plain</option>
                        <option value="metric">Metric</option>
                        <option value="cta">CTA Trigger</option>
                        <option value="chart">API Stat</option>
                      </select>
                      {boxes.length > 1 && (
                        <button
                          onClick={() => handleRemoveBox(box.id)}
                          className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-rose-500 hover:text-rose-450"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Live layout dashboard preview (Symmetric Workspace Display with device toggle) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div 
            style={{ backgroundColor: darkBg, borderColor: darkBorder }}
            className="p-6 rounded-[32px] border min-h-[500px] flex flex-col justify-between relative overflow-hidden shadow-3xl text-center transition-all duration-300"
          >
            {/* Standard back meshes */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            <div className="flex justify-between items-center pb-4 border-b border-zinc-905 relative z-10 w-full mb-6 text-left">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full animate-ping shrink-0" style={{ backgroundColor: primary }} />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-200 font-bold">Contrast & Visual Theme Studio</span>
              </div>
              
              {/* Device Preview modes toggles */}
              <div className="flex gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-900 shrink-0">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-1 rounded transition-colors ${deviceMode === 'desktop' ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title="Simulate 3-Column Grid Layout"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-1 rounded transition-colors ${deviceMode === 'mobile' ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title="Simulate Mobile Single Column Feed"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Sandbox Container preview with dynamic interactive boxes */}
            <div className="relative z-10 my-auto flex items-center justify-center p-3 animate-fade-in-quick">
              
              <div className={`w-full transition-all duration-300 ${deviceMode === 'mobile' ? 'max-w-[320px]' : 'max-w-full'}`}>
                
                {/* Asymmetric simulated grid cells */}
                <div 
                  className={`grid gap-4 w-full text-left`}
                  style={{
                    gridTemplateColumns: deviceMode === 'mobile' ? 'repeat(1, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))'
                  }}
                >
                  {boxes.map((box) => (
                    <div
                      key={box.id}
                      style={{ 
                        borderColor: darkBorder,
                        gridColumn: deviceMode === 'mobile' ? 'span 1' : `span ${box.spanColumns}` 
                      }}
                      className="p-5 rounded-2xl border bg-black/40 backdrop-blur-sm shadow-xl transition-all hover:scale-[1.01] flex flex-col justify-between min-h-[140px] relative overflow-hidden group"
                    >
                      {/* Subtle micro neon glows */}
                      <div className="absolute top-0 right-0 h-10 w-10 blur-xl opacity-30 rounded-full" style={{ backgroundColor: accent }} />

                      <div className="space-y-1 relative z-10">
                        <span className="text-[8px] font-mono uppercase font-bold" style={{ color: primary }}>{box.tag}</span>
                        <h4 className="text-sm font-extrabold text-white leading-snug">{box.title}</h4>
                      </div>

                      {/* Display dynamically themed box contents based on active element configuration type */}
                      {box.type === 'metric' && (
                        <div className="pt-3 text-left relative z-10 select-none">
                          <p className="text-2xl font-black text-white" style={{ color: secondary }}>{box.metricValue}</p>
                          <span className="text-[9px] font-mono text-zinc-400 block">{box.metricLabel}</span>
                        </div>
                      )}

                      {box.type === 'cta' && (
                        <div className="pt-4 flex items-center justify-between text-left relative z-10 select-none">
                          <span className="text-[10px] text-zinc-500 font-mono">Real-time Hook</span>
                          <button 
                            style={{ backgroundColor: primary }}
                            className="px-2.5 py-1 rounded text-[9px] font-black text-black uppercase"
                          >
                            Launch API Link
                          </button>
                        </div>
                      )}

                      {box.type === 'chart' && (
                        <div className="pt-3 flex flex-col gap-1.5 relative z-10 select-none">
                          <div className="flex justify-between text-[8px] font-mono text-zinc-500">
                            <span>System Load Factor: 14%</span>
                          </div>
                          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-300" style={{ width: '45%', backgroundColor: accent }} />
                          </div>
                        </div>
                      )}

                      {box.type === 'generic' && (
                        <div className="pt-3 text-xs text-zinc-400 font-mono flex justify-between select-none">
                          <span>Status: OK</span>
                          <span style={{ color: secondary }}>#bento</span>
                        </div>
                      )}

                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* Stylesheets tab selectors & compilers */}
            <div className="relative z-10 border-t border-zinc-900/60 pt-4 space-y-4">
              <div className="flex justify-between items-center bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-900/60 w-full col-span-2">
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
                      {tab === 'tailwind' ? 'Extend tailwind config' : tab === 'css' ? 'Custom root variables' : 'React structural panel'}
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
                {getTailwindExtensionCode()}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
