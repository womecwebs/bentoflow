'use client';

import React, { useState } from 'react';
import { 
  SlidersHorizontal,
  Plus,
  Trash2,
  Copy,
  Check,
  Code,
  Layers,
  Palette,
  Eye,
  Sliders
} from 'lucide-react';

interface ShadowLayer {
  id: string;
  offsetX: number; // px
  offsetY: number; // px
  blur: number; // px
  spread: number; // px
  opacity: number; // in percent (0 - 100)
}

const SHADOW_PRESETS = [
  {
    name: 'warm-floating',
    label: 'Warm Floating (Tactile)',
    layers: [
      { id: '1', offsetX: 0, offsetY: 2, blur: 4, spread: -1, opacity: 12 },
      { id: '2', offsetX: 0, offsetY: 12, blur: 24, spread: -4, opacity: 15 },
      { id: '3', offsetX: 0, offsetY: 24, blur: 40, spread: -8, opacity: 20 }
    ],
  },
  {
    name: 'cyber-glowing',
    label: 'Cyber Neon Aura',
    layers: [
      { id: '1', offsetX: 0, offsetY: 0, blur: 8, spread: 1, opacity: 35 },
      { id: '2', offsetX: 0, offsetY: 0, blur: 20, spread: 2, opacity: 20 },
      { id: '3', offsetX: 0, offsetY: 0, blur: 45, spread: 6, opacity: 15 }
    ]
  },
  {
    name: 'editorial-shadow',
    label: 'Minimalist Editorial',
    layers: [
      { id: '1', offsetX: 0, offsetY: 1, blur: 3, spread: 0, opacity: 6 },
      { id: '2', offsetX: 0, offsetY: 4, blur: 8, spread: -1, opacity: 10 },
      { id: '3', offsetX: 0, offsetY: 16, blur: 32, spread: -4, opacity: 12 }
    ]
  },
  {
    name: 'brutalist-block',
    label: 'Neo-Brutalist Block',
    layers: [
      { id: '1', offsetX: 6, offsetY: 6, blur: 0, spread: 0, opacity: 100 }
    ]
  }
];

export default function CssShadowGenerator() {
  const [layers, setLayers] = useState<ShadowLayer[]>(SHADOW_PRESETS[0].layers);
  const [shadowColor, setShadowColor] = useState<string>('#10b881'); // custom RGB shadow seed color (e.g. emerald)
  const [presetName, setPresetName] = useState<string>('warm-floating');
  const [copied, setCopied] = useState<boolean>(false);
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react'>('css');
  const [activeLayerId, setActiveLayerId] = useState<string>('1');

  // Convert Hex color to RGB object
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 16, g: 185, b: 129 };
  };

  const rgb = hexToRgb(shadowColor);

  // Generate CSS box-shadow line value
  const getBoxShadowRule = () => {
    return layers.map(layer => {
      // If Brutalist, use direct color with high opacity
      const layerOpacity = (layer.opacity / 100).toFixed(2);
      return `${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerOpacity})`;
    }).join(', ');
  };

  const getStyleObject = () => {
    return {
      boxShadow: getBoxShadowRule(),
    };
  };

  const handleAddLayer = () => {
    if (layers.length >= 6) return;
    const newLayer: ShadowLayer = {
      id: Date.now().toString(),
      offsetX: 0,
      offsetY: 4,
      blur: 10,
      spread: 0,
      opacity: 15
    };
    setLayers([...layers, newLayer]);
    setActiveLayerId(newLayer.id);
  };

  const handleRemoveLayer = (id: string) => {
    if (layers.length <= 1) return;
    setLayers(layers.filter(l => l.id !== id));
    setActiveLayerId(layers[0].id);
  };

  const handleUpdateLayer = (id: string, field: keyof ShadowLayer, value: number) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, [field]: value } : layer
    ));
  };

  const loadPreset = (name: string) => {
    const preset = SHADOW_PRESETS.find(p => p.name === name);
    if (preset) {
      setPresetName(name);
      setLayers(preset.layers);
      setActiveLayerId(preset.layers[0].id);
    }
  };

  const getExportCode = () => {
    const shadowValue = getBoxShadowRule();
    switch (exportTab) {
      case 'css':
        return `/* Beautiful Multi-Layer Symmetrical Box Shadow */
.bento-tactile-cell {
  background-color: #0c0c0e;
  border-radius: 20px;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.05),
    ${shadowValue};
}`;

      case 'tailwind':
        return `<!-- Tailwind dynamic shadow-wrapped bento container -->
<div 
  style={{
    boxShadow: \`0 0 0 1px rgba(255,255,255,0.05), ${shadowValue}\`
  }}
  className="p-8 bg-zinc-950 rounded-3xl relative overflow-hidden"
>
  <span className="text-[10px] font-mono text-zinc-500 uppercase">Ambient Floating Card</span>
</div>`;

      case 'react':
        return `import React from 'react';

export default function SmoothShadowCard() {
  const cardStyle = {
    backgroundColor: '#0c0c0e',
    borderRadius: '24px',
    boxShadow: '0 0 0 1px rgba(255,255,255,0.05), ${shadowValue}'
  };

  return (
    <div style={cardStyle} className="p-8 text-left text-white max-w-sm">
      <h3 className="text-sm font-bold">Tactile Physics Element</h3>
      <p className="text-xs text-zinc-400 mt-1">Multi-layered overlapping ambient shadow borders.</p>
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

  const activeLayer = layers.find(l => l.id === activeLayerId) || layers[0];

  return (
    <div className="w-full text-left space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Shadow controls (Editing Section) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Layers className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Shadow Calibration</h3>
                <p className="text-[11px] text-zinc-500">Fine-tune ambient layered box shadows</p>
              </div>
            </div>

            {/* Presets Grid selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Load Shadow Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SHADOW_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset.name)}
                    className={`p-2.5 text-left rounded-lg border text-[11px] font-medium transition-all ${
                      presetName === preset.name
                        ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400'
                        : 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Shadow Seed Color Selector */}
            <div className="space-y-1.5 text-left pt-1">
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase">Shadow Dye Color</label>
              <div className="flex gap-2.5 items-center">
                <input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="h-8 w-8 rounded border-0 bg-transparent cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="w-full text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-850 px-3 py-2 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Manage individual shadow layers stack */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-900/60">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  Layers Stack ({layers.length}/6)
                </span>
                <button
                  onClick={handleAddLayer}
                  disabled={layers.length >= 6}
                  className="text-[10px] font-bold text-emerald-400 hover:text-emerald-350 bg-emerald-550/10 border border-emerald-500/10 px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  Add Layer
                </button>
              </div>

              {/* Slider tabs for active layers */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {layers.map((l, index) => (
                  <div key={l.id} className="relative shrink-0">
                    <button
                      onClick={() => setActiveLayerId(l.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                        activeLayerId === l.id
                          ? 'bg-zinc-900 border-zinc-650 text-white font-bold'
                          : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-350'
                      }`}
                    >
                      Layer {index + 1}
                    </button>
                    {layers.length > 1 && (
                      <button
                        onClick={() => handleRemoveLayer(l.id)}
                        className="absolute -top-1 -right-1 text-rose-500 hover:text-rose-400 bg-zinc-950 rounded-full pb-0.5"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form to tweak offsets & parameters of the active shadow layer */}
            {activeLayer && (
              <div className="space-y-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/45">
                <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase block">
                  Edit Layer Settings
                </span>

                {/* X OFFSET slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-zinc-440">
                    <span>Horizontal Offset (X)</span>
                    <span>{activeLayer.offsetX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    step="1"
                    value={activeLayer.offsetX}
                    onChange={(e) => handleUpdateLayer(activeLayer.id, 'offsetX', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>

                {/* Y OFFSET slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-zinc-450">
                    <span>Vertical Offset (Y)</span>
                    <span>{activeLayer.offsetY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="1"
                    value={activeLayer.offsetY}
                    onChange={(e) => handleUpdateLayer(activeLayer.id, 'offsetY', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-450"
                  />
                </div>

                {/* BLUR slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-zinc-450">
                    <span>Blur Radius</span>
                    <span>{activeLayer.blur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="1"
                    value={activeLayer.blur}
                    onChange={(e) => handleUpdateLayer(activeLayer.id, 'blur', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-455"
                  />
                </div>

                {/* SPREAD slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-zinc-455">
                    <span>Spread Distance</span>
                    <span>{activeLayer.spread}px</span>
                  </div>
                  <input
                    type="range"
                    min="-15"
                    max="15"
                    step="1"
                    value={activeLayer.spread}
                    onChange={(e) => handleUpdateLayer(activeLayer.id, 'spread', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-455"
                  />
                </div>

                {/* OPACITY slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-zinc-455">
                    <span>Layer Opacity</span>
                    <span>{activeLayer.opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={activeLayer.opacity}
                    onChange={(e) => handleUpdateLayer(activeLayer.id, 'opacity', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-455"
                  />
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Right Column: Live Shadow Sandbox Preview & Multi-exporters */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.20]" />

            <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40 relative z-10 w-full mb-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-200 font-bold">Tactile Physics Sandbox</span>
              </div>
              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider block">
                Visualizing Real Shadow Layer offsets
              </span>
            </div>

            {/* Sandbox main preview box */}
            <div className="relative z-10 my-auto flex items-center justify-center p-8">
              
              {/* Dynamic shadow applied card */}
              <div 
                style={getStyleObject()}
                className="max-w-xs w-full p-8 rounded-3xl bg-zinc-900 border border-zinc-800 transition-all duration-350 text-left relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-grid-pattern-dense opacity-5 pointer-events-none" />
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[8px] font-mono px-2 py-0.5 bg-black/40 text-zinc-550 border border-zinc-850 rounded uppercase font-black select-none tracking-widest block mb-1">
                      Multi-Layer Ambient Cell
                    </span>
                    <h4 className="text-base font-extrabold text-white">Tactile Raised Bento</h4>
                  </div>

                  <p className="text-xs text-zinc-350 leading-relaxed">
                    Notice how this card floats softly off the screen. Overlapping multiple fine translucent shadow offsets prevents aggressive harsh outlines.
                  </p>

                  <div className="pt-2 text-[8px] font-mono text-zinc-500 flex justify-between select-none">
                    <span>Layers: {layers.length}</span>
                    <span>Col: {shadowColor.toUpperCase()}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Export options and code block previews */}
            <div className="relative z-10 border-t border-zinc-900/60 pt-4 space-y-4">
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
                      {tab === 'css' ? 'Overlapping CSS grid shadow' : tab === 'tailwind' ? 'Tailwind inline' : 'React component'}
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
