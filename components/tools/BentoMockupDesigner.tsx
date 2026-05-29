'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  Sliders, 
  Settings, 
  Layout, 
  Sparkles, 
  RefreshCw, 
  Image as ImageIcon,
  Code,
  Plus,
  Minimize2,
  Maximize2,
  Tv,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Sparkle
} from 'lucide-react';

interface BentoCell {
  id: string;
  title: string;
  spanColumns: 1 | 2 | 3;
  spanRows: 1 | 2;
  bgGradient: string;
  textPosition: 'top' | 'bottom';
  image?: string;
  borderColor?: string;
}

const INITIAL_CELLS: BentoCell[] = [
  { id: '1', title: 'Interactive Showcase Main Spot', spanColumns: 2, spanRows: 2, bgGradient: 'from-blue-600/10 to-indigo-600/10', textPosition: 'bottom' },
  { id: '2', title: 'Secondary Stat Tracker', spanColumns: 1, spanRows: 1, bgGradient: 'from-purple-600/10 to-pink-600/10', textPosition: 'top' },
  { id: '3', title: 'SaaS Feature Portfolio', spanColumns: 1, spanRows: 2, bgGradient: 'from-emerald-600/10 to-teal-600/10', textPosition: 'bottom' },
  { id: '4', title: 'Social Stream Grid', spanColumns: 1, spanRows: 1, bgGradient: 'from-amber-600/10 to-orange-600/10', textPosition: 'top' },
  { id: '5', title: 'Modular Interactive Canvas', spanColumns: 2, spanRows: 1, bgGradient: 'from-pink-600/10 to-rose-600/10', textPosition: 'bottom' },
];

const PRESET_MOCKED_COORDS = [
  'from-blue-600/10 to-indigo-600/10',
  'from-purple-600/10 to-pink-600/10',
  'from-rose-500/10 to-amber-500/10',
  'from-emerald-500/10 to-cyan-500/10',
  'from-zinc-800 to-zinc-950'
];

export default function BentoMockupDesigner() {
  const [cells, setCells] = useState<BentoCell[]>(INITIAL_CELLS);
  const [padding, setPadding] = useState<number>(6); // px equivalencies (e.g. p-6)
  const [rounding, setRounding] = useState<string>('rounded-3xl');
  const [shadow, setShadow] = useState<string>('shadow-2xl');
  const [shadowGlow, setShadowGlow] = useState<boolean>(true);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedCellId, setSelectedCellId] = useState<string>('1');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react' | 'html'>('tailwind');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCells(prev => prev.map(cell => 
          cell.id === selectedCellId ? { ...cell, image: reader.result as string } : cell
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (id: string) => {
    setCells(prev => prev.map(cell => 
      cell.id === id ? { ...cell, image: undefined } : cell
    ));
  };

  const handleAddCell = () => {
    if (cells.length >= 8) return;
    const newCell: BentoCell = {
      id: (Date.now() % 1000).toString(),
      title: 'Spotlight Feature Hub',
      spanColumns: 1,
      spanRows: 1,
      bgGradient: PRESET_MOCKED_COORDS[cells.length % PRESET_MOCKED_COORDS.length],
      textPosition: 'bottom'
    };
    setCells([...cells, newCell]);
    setSelectedCellId(newCell.id);
  };

  const handleRemoveCell = (id: string) => {
    if (cells.length <= 1) return;
    setCells(cells.filter(c => c.id !== id));
    setSelectedCellId(cells[0].id);
  };

  const handleScaleColumns = (id: string, delta: 1 | -1) => {
    setCells(cells.map(cell => {
      if (cell.id === id) {
        let newX = cell.spanColumns + delta;
        if (newX < 1) newX = 1;
        if (newX > 3) newX = 3;
        return { ...cell, spanColumns: newX as any };
      }
      return cell;
    }));
  };

  const handleScaleRows = (id: string, delta: 1 | -1) => {
    setCells(cells.map(cell => {
      if (cell.id === id) {
        let newY = cell.spanRows + delta;
        if (newY < 1) newY = 1;
        if (newY > 2) newY = 2;
        return { ...cell, spanRows: newY as any };
      }
      return cell;
    }));
  };

  const handleUpdateText = (id: string, text: string) => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, title: text } : cell));
  };

  const handleUpdateGradient = (id: string, gradient: string) => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, bgGradient: gradient } : cell));
  };

  const handleUpdateTextPosition = (id: string, pos: 'top' | 'bottom') => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, textPosition: pos } : cell));
  };

  const resetDesigner = () => {
    setCells(INITIAL_CELLS);
    setPadding(6);
    setRounding('rounded-3xl');
    setShadow('shadow-2xl');
    setShadowGlow(true);
    setSelectedCellId('1');
  };

  const getTailwindCode = () => {
    const shadowClass = shadowGlow ? `${shadow} shadow-purple-500/5` : shadow;
    return `<!-- Dynamic Bento Showcase Matrix Wrapper -->
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
${cells.map(cell => {
  const colClass = `md:col-span-${cell.spanColumns}`;
  const rowClass = `md:row-span-${cell.spanRows}`;
  const paddingClass = `p-${padding}`;
  return `  <!-- Cell ${cell.id}: ${cell.title} -->
  <div className="${colClass} ${rowClass} relative flex flex-col justify-between ${paddingClass} ${rounding} ${shadowClass} bg-zinc-950 border border-zinc-900 overflow-hidden group transition-all duration-300 hover:border-zinc-800">
    <div className="absolute inset-0 bg-gradient-to-br ${cell.bgGradient} opacity-30 pointer-events-none" />
    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
    ${cell.image ? `
    <!-- Overlay Snapshot Asset -->
    <div className="absolute inset-0 z-0">
      <img src="${cell.image.substring(0, 100)}...[Image Stream]" alt="${cell.title}" className="w-full h-full object-cover opacity-85 transition-all duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
    </div>` : ''}

    <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
      ${cell.textPosition === 'top' ? `<div>
        <span className="text-[10px] uppercase font-mono text-zinc-550">Node slot</span>
        <h4 className="text-base font-bold text-white mt-1 leading-tight">${cell.title}</h4>
      </div>
      <div />` : `<div />
      <div>
        <span className="text-[10px] uppercase font-mono text-zinc-550">Node slot</span>
        <h4 className="text-base font-bold text-white mt-1 leading-tight">${cell.title}</h4>
      </div>`}
    </div>
  </div>`;
}).join('\n')}
</div>`;
  };

  const getCssCode = () => {
    return `/* Multi-device grid showcase containers stylesheet layout definitions */
.bento-showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

${cells.map(cell => `.bento-cell-${cell.id} {
  grid-column: span ${cell.spanColumns};
  grid-row: span ${cell.spanRows};
  position: relative;
  border-radius: 24px;
  background-color: #0c0c0e;
  border: 1px solid #1f1f23;
  padding: 24px;
}`).join('\n')}`;
  };

  const getReactCode = () => {
    return `import React from 'react';

export default function HighFidelityBentoShowcase() {
  const cellsMap = [
    ${cells.map(c => `{ id: "${c.id}", title: "${c.title}", cols: ${c.spanColumns}, rows: ${c.spanRows}, gradient: "${c.bgGradient}" }`).join(',\n    ')}
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-8 max-w-7xl mx-auto">
      {cellsMap.map(cell => (
        <div 
          key={cell.id} 
          className={\`md:col-span-\${cell.cols} md:row-span-\${cell.rows} p-6 rounded-3xl border border-zinc-900 bg-zinc-950/80 relative overflow-hidden flex flex-col justify-end min-h-[160px]\`}
        >
          <div className={\`absolute inset-0 bg-gradient-to-br \${cell.gradient} opacity-30\`} />
          <div className="relative z-10 text-left">
            <span className="text-[9px] font-mono uppercase text-zinc-500">Core Feature</span>
            <h4 className="text-base font-bold text-white mt-1">{cell.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}`;
  };

  const getHtmlCode = () => {
    return `<!-- Traditional HTML Raw grids -->
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
  ${cells.map(c => `<div style="grid-column: span ${c.spanColumns}; grid-row: span ${c.spanRows}; background-color: #121214; border: 1px solid #222; border-radius: 20px; padding: 20px;">
    <h4 style="color: white; font-family: sans-serif; font-size: 16px;">${c.title}</h4>
  </div>`).join('\n  ')}
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getExportCode()).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  const activeCell = cells.find(c => c.id === selectedCellId) || cells[0];

  return (
    <div className="w-full text-left space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
        
        {/* Left Side: Bento Parameters controls (Editing section) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/85 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Sliders className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Showcase Parameters</h3>
                <p className="text-[11px] text-zinc-500">Configure layouts, rounding presets, or scale nodes</p>
              </div>
            </div>

            {/* Grid Box Add and Reset row */}
            <div className="flex gap-2.5">
              <button
                onClick={handleAddCell}
                disabled={cells.length >= 8}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 disabled:opacity-45 flex items-center justify-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5 text-emerald-400 font-extrabold" />
                Add Bento Block
              </button>
              
              <button
                onClick={resetDesigner}
                className="px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs"
                title="Reset Workspace"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            {/* Selected Cell detailed editor */}
            {activeCell && (
              <div className="space-y-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/30">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                  <span className="text-xs font-bold text-zinc-350">
                    Slot {activeCell.id} Properties
                  </span>
                  {cells.length > 1 && (
                    <button
                      onClick={() => handleRemoveCell(activeCell.id)}
                      className="text-[10px] text-rose-500 hover:text-rose-400 font-mono inline-flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  )}
                </div>

                {/* Edit Title text */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-mono uppercase text-zinc-500">Cell Title Header</label>
                  <input
                    type="text"
                    value={activeCell.title}
                    onChange={(e) => handleUpdateText(activeCell.id, e.target.value)}
                    className="w-full text-xs text-zinc-200 bg-zinc-900 border border-zinc-850 px-3 py-2 rounded-lg focus:outline-none"
                    placeholder="E.g. spotlight title"
                  />
                </div>

                {/* Grid spans sliders/adjusters */}
                <div className="grid grid-cols-2 gap-3 pb-1">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Cols ({activeCell.spanColumns}/3)</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleScaleColumns(activeCell.id, -1)}
                        className="py-1 px-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white shrink-0"
                      >
                        -
                      </button>
                      <span className="w-full text-center py-1 bg-zinc-950 rounded text-xs select-none border border-zinc-900 text-zinc-350">{activeCell.spanColumns} Columns</span>
                      <button
                        onClick={() => handleScaleColumns(activeCell.id, 1)}
                        className="py-1 px-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Rows ({activeCell.spanRows}/2)</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleScaleRows(activeCell.id, -1)}
                        className="py-1 px-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white shrink-0"
                      >
                        -
                      </button>
                      <span className="w-full text-center py-1 bg-zinc-950 rounded text-xs select-none border border-zinc-900 text-zinc-350">{activeCell.spanRows} Rows</span>
                      <button
                        onClick={() => handleScaleRows(activeCell.id, 1)}
                        className="py-1 px-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub features: Text Positions & Seeding back gradients */}
                <div className="grid grid-cols-2 gap-3.5 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Position</span>
                    <div className="grid grid-cols-2 gap-1">
                      {['top', 'bottom'].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => handleUpdateTextPosition(activeCell.id, pos as any)}
                          className={`text-[9px] font-mono tracking-wider p-1.5 border rounded transition-colors ${
                            activeCell.textPosition === pos ? 'bg-zinc-900 border-zinc-650 text-emerald-400 font-bold' : 'bg-zinc-950 border-zinc-900 text-zinc-500'
                          }`}
                        >
                          {pos.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Seed Accent</span>
                    <select
                      value={activeCell.bgGradient}
                      onChange={(e) => handleUpdateGradient(activeCell.id, e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-1.5 text-[10px] text-zinc-300"
                    >
                      <option value="from-blue-600/10 to-indigo-600/10">Emerald Slate</option>
                      <option value="from-purple-600/10 to-pink-600/10">Cyber Pink</option>
                      <option value="from-rose-500/10 to-amber-500/10">Golden Shimmer</option>
                      <option value="from-emerald-500/10 to-cyan-500/10">Teal Wave</option>
                      <option value="from-zinc-800 to-zinc-950">Midnight Goth</option>
                    </select>
                  </div>
                </div>

                {/* File input / Drag & drop */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-mono text-zinc-500">Inject cell snapshot background</span>
                    {activeCell.image && (
                      <button
                        onClick={() => removeImage(activeCell.id)}
                        className="text-[9px] font-mono text-rose-500 hover:text-rose-455 hover:underline"
                      >
                        Remove snap
                      </button>
                    )}
                  </div>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-zinc-800 hover:border-zinc-755 bg-zinc-950/60 p-4 rounded-lg text-center cursor-pointer flex flex-col items-center justify-center gap-1 group"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Upload className="h-4 w-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                    <div>
                      <span className="text-[10px] font-semibold text-zinc-350 block">Upload image</span>
                      <span className="text-[8px] text-zinc-550 block">PNG, JPG, or SVG</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Rounding parameter sliders */}
            <div className="space-y-4 pt-2 border-t border-zinc-900/40 text-xs">
              
              <div className="space-y-1.5 flex flex-col">
                <div className="flex justify-between font-mono text-zinc-400">
                  <span>Showcase Cell Padding</span>
                  <span>p-{padding}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="8"
                  step="1"
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Borders roundings selection */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Border rounding presets</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: 'None', val: 'rounded-none' },
                    { label: 'Medium', val: 'rounded-xl' },
                    { label: 'Large', val: 'rounded-3xl' },
                    { label: 'Full Hex', val: 'rounded-[32px]' }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      onClick={() => setRounding(preset.val)}
                      className={`py-1 rounded text-[10px] font-mono tracking-wide border transition-all ${
                        rounding === preset.val ? 'bg-zinc-900 border-zinc-650 text-white font-bold' : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shadow depths selection */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Shadow elevations preset</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'None', val: 'shadow-none' },
                    { label: 'Regular', val: 'shadow-lg' },
                    { label: 'Ambient 3D', val: 'shadow-2xl' }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      onClick={() => setShadow(preset.val)}
                      className={`py-1 rounded text-[10px] font-mono tracking-wide border transition-all ${
                        shadow === preset.val ? 'bg-zinc-900 border-zinc-650 text-white font-bold' : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-350'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Side: Showcase canvas (Live Viewport Designer Section) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="p-6 rounded-[32px] border border-zinc-900 bg-zinc-950/45 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.22] pointer-events-none" />

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-900/40 relative z-10 text-left">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse animate-ping shrink-0" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-200 font-bold">Interactive Showcase Canvas v2</span>
              </div>
              
              {/* Desktop / mobile simulated viewer toggles */}
              <div className="flex gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-900 shrink-0">
                <button
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1 rounded transition-colors ${devicePreview === 'desktop' ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title="Simulate 3-Column Desktop Spans"
                >
                  <Tv className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDevicePreview('mobile')}
                  className={`p-1 rounded transition-colors ${devicePreview === 'mobile' ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title="Simulate Vertical Mobile Frame"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Sandbox Matrix rendering box */}
            <div className="relative z-10 my-auto flex items-center justify-center p-2">
              <div className={`w-full transition-all duration-300 ${devicePreview === 'mobile' ? 'max-w-[325px]' : 'max-w-full'}`}>
                
                {/* Dynamically configured layout cells */}
                <div 
                  className="grid gap-6 w-full text-left"
                  style={{
                    gridTemplateColumns: devicePreview === 'mobile' ? 'repeat(1, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))'
                  }}
                >
                  {cells.map((cell) => {
                    const isSelected = selectedCellId === cell.id;
                    const shadowClass = shadowGlow ? `${shadow} shadow-purple-500/5` : shadow;
                    
                    return (
                      <div
                        key={cell.id}
                        onClick={() => setSelectedCellId(cell.id)}
                        className={`relative flex flex-col justify-between overflow-hidden group transition-all duration-300 cursor-pointer ${rounding} ${shadowClass} bg-zinc-950/90 border hover:scale-[1.01] ${
                          devicePreview === 'mobile' ? 'col-span-1 row-span-1' : `col-span-1 md:col-span-${cell.spanColumns} md:row-span-${cell.spanRows}`
                        } ${
                          isSelected ? 'border-emerald-500 shadow-emerald-500/10' : 'border-zinc-900 hover:border-zinc-800'
                        }`}
                        style={{
                          padding: `${padding * 4}px`,
                          minHeight: cell.spanRows === 2 ? '300px' : '150px'
                        }}
                      >
                        {/* Background light colors seeds */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${cell.bgGradient} opacity-30 pointer-events-none`} />
                        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

                        {/* Snapshot backgrounds */}
                        {cell.image && (
                          <div className="absolute inset-0 z-0">
                            <img 
                              src={cell.image} 
                              alt={cell.title} 
                              className="w-full h-full object-cover opacity-80 mix-blend-normal group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                          </div>
                        )}

                        {/* Inner visual layout wrapper */}
                        <div className="relative z-10 flex flex-col h-full justify-between w-full select-none">
                          {cell.textPosition === 'top' ? (
                            <>
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono px-1.5 py-0.5 bg-[#000000]/60 text-zinc-500 rounded uppercase font-black tracking-widest inline-block border border-zinc-900">
                                  Slot {cell.id}
                                </span>
                                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">{cell.title}</h4>
                              </div>
                              <div />
                            </>
                          ) : (
                            <>
                              <div />
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono px-1.5 py-0.5 bg-[#000000]/60 text-zinc-500 rounded uppercase font-black tracking-widest inline-block border border-zinc-900">
                                  Slot {cell.id}
                                </span>
                                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">{cell.title}</h4>
                              </div>
                            </>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Compilers exports panel switch tabs */}
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
                  onClick={handleCopyCode}
                  className={`inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 font-bold rounded-lg text-[10px] px-3.5 py-1.5 transition-colors`}
                >
                  {copiedCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copiedCode ? 'Copied' : 'Copy'}
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
