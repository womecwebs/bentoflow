'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Sliders, 
  Code, 
  Settings, 
  Layout, 
  Sparkles, 
  RefreshCw,
  ArrowRight,
  Terminal,
  Columns,
  Grid,
  Plus,
  Trash2,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface GridItem {
  id: string;
  name: string;
  colSpan: number;
  rowSpan: number;
  bgGrad: string;
}

const DEFAULT_ITEMS: GridItem[] = [
  { id: '1', name: 'Spotlight Hero', colSpan: 2, rowSpan: 1, bgGrad: 'from-emerald-500/10 to-emerald-500/5' },
  { id: '2', name: 'Metric Badge', colSpan: 1, rowSpan: 1, bgGrad: 'from-blue-500/10 to-blue-500/5' },
  { id: '3', name: 'Wide Feed Block', colSpan: 3, rowSpan: 1, bgGrad: 'from-purple-500/10 to-purple-500/5' },
  { id: '4', name: 'Feature Sidebar', colSpan: 1, rowSpan: 2, bgGrad: 'from-pink-500/10 to-pink-500/5' },
  { id: '5', name: 'Dynamic Analytics', colSpan: 2, rowSpan: 1, bgGrad: 'from-amber-500/10 to-amber-500/5' }
];

export default function FlexToGridConverter() {
  const [items, setItems] = useState<GridItem[]>(DEFAULT_ITEMS);
  const [colsDesktop, setColsDesktop] = useState<number>(3);
  const [gapUnit, setGapUnit] = useState<number>(4); // gap-4 (16px)
  const [roundingClass, setRoundingClass] = useState<string>('rounded-2xl');
  const [alignContent, setAlignContent] = useState<string>('stretch'); // stretch, start, center, end
  const [exportTab, setExportTab] = useState<'tailwind' | 'css' | 'react'>('tailwind');
  const [copied, setCopied] = useState<boolean>(false);

  const [newItemName, setNewItemName] = useState<string>('');

  const handleAddItem = () => {
    const defaultGradients = [
      'from-emerald-500/10 to-emerald-500/5',
      'from-blue-500/10 to-blue-500/5',
      'from-purple-500/10 to-purple-500/5',
      'from-pink-500/10 to-pink-500/5',
      'from-amber-500/10 to-amber-500/5'
    ];
    const randGrad = defaultGradients[Math.floor(Math.random() * defaultGradients.length)];
    const newItem: GridItem = {
      id: Date.now().toString(),
      name: newItemName.trim() || `Bento Node ${items.length + 1}`,
      colSpan: 1,
      rowSpan: 1,
      bgGrad: randGrad
    };
    setItems([...items, newItem]);
    setNewItemName('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<GridItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  // Build Exports based on type
  const getExportCode = () => {
    const gapClass = `gap-${gapUnit}`;
    const alignClass = alignContent !== 'stretch' ? ` items-${alignContent}` : '';

    switch (exportTab) {
      case 'tailwind':
        return `<!-- Standard Tailwind Responsive Rigid bento-flow Layout -->
<div className="grid grid-cols-1 md:grid-cols-${colsDesktop} ${gapClass}${alignClass} w-full">
${items.map((item) => {
          const colClass = item.colSpan > 1 ? ` md:col-span-${Math.min(item.colSpan, colsDesktop)}` : '';
          const rowClass = item.rowSpan > 1 ? ` md:row-span-${item.rowSpan}` : '';
          return `  <div className="p-6 bg-zinc-950 border border-zinc-90 w-full relative ${roundingClass}${colClass}${rowClass} min-h-[140px] flex flex-col justify-between overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr ${item.bgGrad} opacity-30" />
    <h3 className="text-sm font-bold text-zinc-100 z-10">${item.name}</h3>
    <p className="text-[11px] text-zinc-500 z-10">Bento grid node wrapper context</p>
  </div>`;
        }).join('\n')}
</div>`;

      case 'css':
        const gapPx = gapUnit * 4;
        return `/* CSS Grid bento-flow Layout definitions */
.bento-grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: ${gapPx}px;
}

@media (min-width: 768px) {
  .bento-grid-container {
    grid-template-columns: repeat(${colsDesktop}, minmax(0, 1fr));
    align-items: ${alignContent};
  }
}

.bento-card {
  padding: 24px;
  background-color: #0c0c0e;
  border: 1px solid #1a1a20;
  border-radius: ${roundingClass === 'rounded-none' ? '0' : roundingClass === 'rounded-xl' ? '12px' : roundingClass === 'rounded-2xl' ? '16px' : '24px'};
  position: relative;
  overflow: hidden;
  min-height: 140px;
}

${items.map((item, idx) => {
          let spanRules = '';
          if (item.colSpan > 1 || item.rowSpan > 1) {
            spanRules = `\n@media (min-width: 768px) {
  .bento-card-slot-${idx + 1} {
    ${item.colSpan > 1 ? `grid-column: span ${Math.min(item.colSpan, colsDesktop)};` : ''}
    ${item.rowSpan > 1 ? `grid-row: span ${item.rowSpan};` : ''}
  }
}`;
          }
          return `.bento-card-slot-${idx + 1} {
  background: linear-gradient(135deg, rgba(20,20,25,0.85) 0%, rgba(10,10,12,0.95) 100%);
}${spanRules}`;
        }).join('\n\n')}`;

      case 'react':
        return `import React from 'react';

export default function BentoShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-${colsDesktop} gap-${gapUnit} w-full text-left">
      {/* Dynamic Rendered Bento Nodes */}
      ${items.map((item) => {
        const spanCol = item.colSpan > 1 ? `md:col-span-${Math.min(item.colSpan, colsDesktop)}` : '';
        const spanRow = item.rowSpan > 1 ? `md:row-span-${item.rowSpan}` : '';
        const spanClass = [spanCol, spanRow].filter(Boolean).join(' ');
        return `
      <div className="p-6 bg-[#09090b] border border-zinc-900 ${spanClass} ${roundingClass} min-h-[140px] flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr ${item.bgGrad} opacity-25" />
        <h3 className="text-sm font-bold text-zinc-100 z-10">${item.name}</h3>
        <span className="text-[10px] font-mono text-zinc-500 z-10">Bento Node Element</span>
      </div>`;
      }).join('')}
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
        
        {/* Left Column: Interactive Parametric Editing Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
              <Columns className="h-5 w-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Bento Grid Config</h3>
                <p className="text-[11px] text-zinc-500">Translate elements into high fidelity matrixes</p>
              </div>
            </div>

            {/* Quick Layout Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Desktop Columns</label>
                <select
                  value={colsDesktop}
                  onChange={(e) => setColsDesktop(Number(e.target.value))}
                  className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg focus:ring-1 focus:ring-emerald-500/30"
                >
                  <option value={2}>2Columns Grid</option>
                  <option value={3}>3Columns Grid (Standard)</option>
                  <option value={4}>4Columns Grid (Wide)</option>
                  <option value={6}>6Columns Grid</option>
                  <option value={12}>12Columns Grid</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Grid Gap Spacing</label>
                <select
                  value={gapUnit}
                  onChange={(e) => setGapUnit(Number(e.target.value))}
                  className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg focus:ring-1 focus:ring-emerald-500/30"
                >
                  <option value={2}>8px (gap-2)</option>
                  <option value={4}>16px (gap-4)</option>
                  <option value={6}>24px (gap-6)</option>
                  <option value={8}>32px (gap-8)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Card Radii round</label>
                <select
                  value={roundingClass}
                  onChange={(e) => setRoundingClass(e.target.value)}
                  className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg focus:ring-1 focus:ring-emerald-500/30"
                >
                  <option value="rounded-none">Square Corners</option>
                  <option value="rounded-xl">12px (Rounded XL)</option>
                  <option value="rounded-2xl">16px (Rounded 2XL)</option>
                  <option value="rounded-3xl">24px (Rounded 3XL)</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Item Alignment</label>
                <select
                  value={alignContent}
                  onChange={(e) => setAlignContent(e.target.value)}
                  className="w-full text-xs text-zinc-300 bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg focus:ring-1 focus:ring-emerald-500/30"
                >
                  <option value="stretch">Stretch (Height Fit)</option>
                  <option value="start">Align Start</option>
                  <option value="center">Align Center</option>
                  <option value="end">Align End</option>
                </select>
              </div>
            </div>

            {/* Live Boxes Add/Manage Suite */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Manage Grid Elements ({items.length})
              </span>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Card Tag (e.g. Testimonials)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                  className="flex-1 text-xs text-white bg-zinc-900 border border-zinc-850 px-3 py-2 rounded-lg focus:outline-none focus:border-zinc-700"
                />
                <button
                  onClick={handleAddItem}
                  className="p-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Items List scrollable */}
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-900 bg-zinc-950/60 text-xs">
                    <div className="flex-1 min-w-0 pr-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                        className="bg-transparent text-white font-semibold truncate focus:bg-zinc-900 focus:p-1 focus:outline-none w-full"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Column span toggler */}
                      <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-850 rounded px-1 text-[10px] text-zinc-400">
                        <span>Col:</span>
                        <button
                          onClick={() => handleUpdateItem(item.id, { colSpan: Math.max(1, item.colSpan - 1) })}
                          className="px-1 text-zinc-500 hover:text-white"
                        >
                          -
                        </button>
                        <span className="font-mono text-zinc-200">{item.colSpan}</span>
                        <button
                          onClick={() => handleUpdateItem(item.id, { colSpan: Math.min(12, item.colSpan + 1) })}
                          className="px-1 text-zinc-500 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      {/* Row span toggler */}
                      <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-850 rounded px-1 text-[10px] text-zinc-400">
                        <span>Row:</span>
                        <button
                          onClick={() => handleUpdateItem(item.id, { rowSpan: Math.max(1, item.rowSpan - 1) })}
                          className="px-1 text-zinc-500 hover:text-white"
                        >
                          -
                        </button>
                        <span className="font-mono text-zinc-200">{item.rowSpan}</span>
                        <button
                          onClick={() => handleUpdateItem(item.id, { rowSpan: Math.min(4, item.rowSpan + 1) })}
                          className="px-1 text-zinc-500 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 hover:bg-zinc-900 text-rose-500 rounded transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Live Grid & Active Terminals side-by-side Layout */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.10] pointer-events-none" />

            {/* Header info */}
            <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40 relative z-10 text-left">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 font-bold">
                  Translation Grid Matrix Terminal
                </span>
              </div>
              <span className="text-[8px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/10 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider block">
                Visual Compiler Active
              </span>
            </div>

            {/* Compiled Grid Structure Visual Live Preview */}
            <div className="p-5 rounded-2xl border border-zinc-900/65 bg-zinc-950/80 my-5 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Grid className="h-4 w-4 text-emerald-400" />
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wide">
                  Live Compiled Grid Structure Preview
                </span>
              </div>

              {/* Dynamic GRID render */}
              <div 
                className="grid gap-3 transition-all duration-300"
                style={{
                  gridTemplateColumns: `repeat(${colsDesktop}, minmax(0, 1fr))`,
                  alignItems: alignContent,
                  gap: `${gapUnit * 4}px`
                }}
              >
                {items.map((item, idx) => {
                  const fitColSpan = Math.min(item.colSpan, colsDesktop);
                  return (
                    <div
                      key={item.id}
                      style={{
                        gridColumn: `span ${fitColSpan}`,
                        gridRow: `span ${item.rowSpan}`,
                        minHeight: `${100 + (item.rowSpan - 1) * 80}px`
                      }}
                      className={`group p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700/60 transition-all ${roundingClass} flex flex-col justify-between relative overflow-hidden text-left`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-tr ${item.bgGrad} opacity-30 pointer-events-none`} />
                      
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="text-xs font-bold text-zinc-100 truncate pr-1">{item.name}</span>
                        <span className="text-[8px] font-mono text-zinc-550 shrink-0">
                          {fitColSpan}x{item.rowSpan}
                        </span>
                      </div>

                      <div className="relative z-10 space-y-1 mt-auto">
                        <span className="text-[8px] font-mono text-zinc-450 block uppercase">
                          Node Slot {idx + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section: Side-by-Side Parser Outputs Workspace */}
            <div className="relative z-10 border-t border-zinc-900/60 pt-4 space-y-4">
              <div className="flex justify-between items-center bg-zinc-950/85 p-1.5 rounded-xl border border-zinc-900/60">
                <div className="flex gap-1.5">
                  {(['tailwind', 'css', 'react'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setExportTab(tab)}
                      className={`text-[10px] font-mono tracking-wide px-3 py-1.5 rounded-lg transition-all ${
                        exportTab === tab
                          ? 'bg-zinc-900 text-white font-bold border-b-2 border-indigo-400'
                          : 'text-zinc-550 hover:text-zinc-350'
                      }`}
                    >
                      {tab === 'tailwind' ? 'Tailwind Grid' : tab === 'css' ? 'Custom CSS Grid' : 'React component'}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleCopyCode}
                  className={`inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-450 text-white font-bold rounded-lg text-[10px] px-3.5 py-1.5 transition-colors`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Code Output'}
                </button>
              </div>

              <pre className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl font-mono text-[10px] text-zinc-400 overflow-x-auto select-all max-h-[160px] leading-relaxed whitespace-pre font-normal">
                {getExportCode()}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
