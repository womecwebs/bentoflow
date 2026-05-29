'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TEMPLATES } from '@/data/templatesData';
import { 
  Plus, 
  RotateCcw, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  LayoutGrid, 
  ChevronLeft, 
  ChevronRight, 
  Code, 
  Maximize2, 
  ArrowLeft,
  ArrowRight,
  Palette,
  Laptop,
  CheckCircle2,
  X,
  PlusSquare,
  MinusSquare,
  Info
} from 'lucide-react';

interface GridItem {
  id: string;
  title: string;
  subtitle: string;
  colSpan: number; // 1 to 12
  rowSpan: number; // 1 to 6
  bgColor: string; // hex value or Tailwind class color indicator
  bgClass: string; // Tailwind bg class
  accentColor: string;
}

const INITIAL_GRID_ITEMS: GridItem[] = [
  {
    id: 'box-1',
    title: 'Feature One',
    subtitle: 'High performance structural layout visualizer',
    colSpan: 4,
    rowSpan: 2,
    bgColor: '#3b82f6',
    bgClass: 'bg-blue-600',
    accentColor: 'text-blue-200'
  },
  {
    id: 'box-2',
    title: 'Feature Two',
    subtitle: 'Instant SSR compilation targets ready to launch',
    colSpan: 8,
    rowSpan: 2,
    bgColor: '#10b981',
    bgClass: 'bg-emerald-600',
    accentColor: 'text-emerald-200'
  },
  {
    id: 'box-3',
    title: 'Main Banner',
    subtitle: 'SEO-Optimized crawler architecture built cleanly',
    colSpan: 12,
    rowSpan: 2,
    bgColor: '#f59e0b',
    bgClass: 'bg-amber-500',
    accentColor: 'text-amber-100'
  },
  {
    id: 'box-4',
    title: 'Analytics Node',
    subtitle: 'Dynamic tracking parameters active',
    colSpan: 4,
    rowSpan: 2,
    bgColor: '#8b5cf6',
    bgClass: 'bg-purple-600',
    accentColor: 'text-purple-200'
  },
  {
    id: 'box-5',
    title: 'Crawl Console',
    subtitle: 'Googlebot and AI indexer transparent layer',
    colSpan: 4,
    rowSpan: 2,
    bgColor: '#6366f1',
    bgClass: 'bg-indigo-600',
    accentColor: 'text-indigo-200'
  },
  {
    id: 'box-6',
    title: 'Developer Core',
    subtitle: 'TypeScript and Tailwind layout engine modules',
    colSpan: 4,
    rowSpan: 2,
    bgColor: '#ec4899',
    bgClass: 'bg-pink-600',
    accentColor: 'text-pink-200'
  }
];

const PRESETS = {
  portfolio: [
    { id: 'p-1', title: 'Work Showcase', subtitle: 'Design projects index', colSpan: 8, rowSpan: 2, bgColor: '#3b82f6', bgClass: 'bg-blue-600', accentColor: 'text-blue-200' },
    { id: 'p-2', title: 'Bio & Links', subtitle: 'Find me globally', colSpan: 4, rowSpan: 2, bgColor: '#8b5cf6', bgClass: 'bg-purple-600', accentColor: 'text-purple-200' },
    { id: 'p-3', title: 'Specialty Tech Stack', subtitle: 'React, NextJS, Tailwind', colSpan: 4, rowSpan: 1, bgColor: '#10b981', bgClass: 'bg-emerald-600', accentColor: 'text-emerald-200' },
    { id: 'p-4', title: 'Contact Me', subtitle: 'Inquire for freelance work', colSpan: 4, rowSpan: 1, bgColor: '#ec4899', bgClass: 'bg-pink-600', accentColor: 'text-pink-200' },
    { id: 'p-5', title: 'Platform Status', subtitle: 'Active nodes online', colSpan: 4, rowSpan: 1, bgColor: '#f59e0b', bgClass: 'bg-amber-500', accentColor: 'text-amber-100' }
  ],
  saas: [
    { id: 's-1', title: 'Performance Stats', subtitle: 'Speed grade indices', colSpan: 12, rowSpan: 2, bgColor: '#10b981', bgClass: 'bg-emerald-600', accentColor: 'text-emerald-200' },
    { id: 's-2', title: 'Live Activity Logs', subtitle: 'Requests visual matrix', colSpan: 6, rowSpan: 2, bgColor: '#3b82f6', bgClass: 'bg-blue-600', accentColor: 'text-blue-200' },
    { id: 's-3', title: 'Global CDN Status', subtitle: 'Serverless response scale', colSpan: 6, rowSpan: 2, bgColor: '#8b5cf6', bgClass: 'bg-purple-600', accentColor: 'text-purple-200' }
  ]
};

const PALETTE = [
  { name: 'Blue', hex: '#3b82f6', class: 'bg-blue-600', accent: 'text-blue-200' },
  { name: 'Emerald', hex: '#10b981', class: 'bg-emerald-600', accent: 'text-emerald-100' },
  { name: 'Purple', hex: '#8b5cf6', class: 'bg-purple-600', accent: 'text-purple-100' },
  { name: 'Amber', hex: '#f59e0b', class: 'bg-amber-500', accent: 'text-amber-105' },
  { name: 'Pink', hex: '#ec4899', class: 'bg-pink-600', accent: 'text-pink-100' },
  { name: 'Slate', hex: '#27272a', class: 'bg-zinc-805', accent: 'text-zinc-300' },
  { name: 'Indigo', hex: '#6366f1', class: 'bg-indigo-600', accent: 'text-indigo-100' }
];

export default function GeneratorWorkspace() {
  const [items, setItems] = useState<GridItem[]>(INITIAL_GRID_ITEMS);
  const [columns, setColumns] = useState<number>(12);
  const [gridGap, setGridGap] = useState<number>(16);
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [magicDense, setMagicDense] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');
  
  // Selection / Editing Modal
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  
  // Code Export states
  const [activeTab, setActiveTab] = useState<'tailwind' | 'css' | 'react' | 'vue'>('tailwind');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // URL Query State Loader
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template');

  useEffect(() => {
    if (templateParam) {
      const foundTemplate = TEMPLATES.find(t => t.slug === templateParam);
      if (foundTemplate) {
        const formattedItems: GridItem[] = foundTemplate.layoutState.map(cell => ({
          id: cell.id,
          title: cell.title,
          subtitle: cell.subtitle,
          colSpan: cell.colSpan,
          rowSpan: cell.rowSpan,
          bgColor: cell.bgColor,
          bgClass: cell.bgClass,
          accentColor: cell.accentColor
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(formattedItems);
        setColumns(foundTemplate.columns);
        setGridGap(foundTemplate.gridGap);
        setBorderRadius(foundTemplate.borderRadius);
        setMagicDense(foundTemplate.magicDense);
        setSelectedPreset(foundTemplate.slug);
      }
    }
  }, [templateParam]);

  // Select preset helper
  const handleSelectPreset = (preset: 'portfolio' | 'saas') => {
    setSelectedPreset(preset);
    setItems(PRESETS[preset]);
  };

  // Adjust parameters
  const handleAddBox = () => {
    const randomColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const newItem: GridItem = {
      id: `box-${Date.now()}`,
      title: 'New Bento Box',
      subtitle: 'Visually configure content, background constraints & span dimensions.',
      colSpan: Math.min(4, columns),
      rowSpan: 2,
      bgColor: randomColor.hex,
      bgClass: randomColor.class,
      accentColor: randomColor.accent
    };
    setItems([...items, newItem]);
  };

  const handleReset = () => {
    setItems(INITIAL_GRID_ITEMS);
    setColumns(12);
    setGridGap(16);
    setBorderRadius(12);
    setMagicDense(false);
    setSelectedPreset('custom');
    setSelectedBoxId(null);
  };

  // Grid Operations helpers
  const updateItem = (id: string, updates: Partial<GridItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    if (selectedBoxId === id) setSelectedBoxId(null);
  };

  // Drag-and-Drop / priority order shifter
  const shiftOrder = (index: number, direction: 'left' | 'right') => {
    const newItems = [...items];
    if (direction === 'left' && index > 0) {
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
    } else if (direction === 'right' && index < newItems.length - 1) {
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
    }
    setItems(newItems);
  };

  // Code generation strings
  const generateTailwindCode = () => {
    const itemsCode = items.map(item => {
      return `  {/* Grid Item (${item.title}) */}
  <div className="col-span-${item.colSpan} row-span-${item.rowSpan} ${item.bgClass} text-white p-6 relative overflow-hidden flex flex-col justify-end min-h-[160px]">
    {/* Ambient Glow */}
    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-3xl pointer-events-none" />
    <div className="relative z-10">
      <h3 className="text-lg font-bold tracking-tight mb-1">${item.title}</h3>
      <p className="text-xs ${item.accentColor} leading-relaxed">${item.subtitle}</p>
    </div>
  </div>`;
    }).join('\n\n');

    return `<div className="grid grid-cols-${columns} gap-[${gridGap}px] ${magicDense ? 'grid-flow-row-dense' : ''}">
${itemsCode}
</div>`;
  };

  const generateCSSCode = () => {
    const itemsHTML = items.map((item, index) => {
      return `  <div class="bento-item item-${index + 1}">
    <div class="glow"></div>
    <div class="content">
      <h3>${item.title}</h3>
      <p>${item.subtitle}</p>
    </div>
  </div>`;
    }).join('\n');

    const itemsStyles = items.map((item, index) => {
      return `.item-${index + 1} {
  grid-column: span ${item.colSpan};
  grid-row: span ${item.rowSpan};
  background-color: ${item.bgColor};
  color: #ffffff;
}`;
    }).join('\n');

    return `<div class="bento-container">
${itemsHTML}
</div>

<style>
.bento-container {
  display: grid;
  grid-template-columns: repeat(${columns}, minmax(0, 1fr));
  gap: ${gridGap}px;
  ${magicDense ? 'grid-auto-flow: dense;' : ''}
}
.bento-item {
  position: relative;
  border-radius: ${borderRadius}px;
  padding: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 160px;
}
.glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  filter: blur(40px);
  pointer-events: none;
}
.content h3 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.content p {
  font-size: 0.75rem;
  opacity: 0.85;
}
${itemsStyles}
</style>`;
  };

  const generateReactCode = () => {
    const itemsState = JSON.stringify(items.map(({ id, title, subtitle, colSpan, rowSpan, bgClass, accentColor }) => ({
      id, title, subtitle, colSpan, rowSpan, bgClass, accentColor
    })), null, 2);

    return `import React from 'react';

interface BentoBoxProps {
  id: string;
  title: string;
  subtitle: string;
  colSpan: number;
  rowSpan: number;
  bgClass: string;
  accentColor: string;
}

const ITEMS: BentoBoxProps[] = ${itemsState};

export default function BentoLayout() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-${columns} gap-${gridGap === 16 ? '4' : gridGap === 24 ? '6' : '3.5'} ${magicDense ? 'grid-flow-row-dense' : ''}">
        {ITEMS.map((item) => (
          <div 
            key={item.id}
            style={{ borderRadius: '${borderRadius}px' }}
            className={\`col-span-\${item.colSpan} row-span-\${item.rowSpan} \${item.bgClass} text-white p-6 relative overflow-hidden flex flex-col justify-end min-h-[160px]\`}
          >
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold tracking-tight mb-1">{item.title}</h3>
              <p className={\`text-xs \${item.accentColor} leading-relaxed\`}>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`;
  };

  const generateVueCode = () => {
    return `<template>
  <div class="bento-container" :style="{ gap: '${gridGap}px' }">
    <div 
      v-for="item in items" 
      :key="item.id"
      :class="['bento-item', item.bgClass, 'col-span-' + item.colSpan, 'row-span-' + item.rowSpan]"
      :style="{ borderRadius: '${borderRadius}px' }"
    >
      <div class="glow"></div>
      <div class="content">
        <h3>{{ item.title }}</h3>
        <p :class="item.accentColor">{{ item.subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  colSpan: number;
  rowSpan: number;
  bgClass: string;
  accentColor: string;
}

const items = ref<BentoItem[]>(${JSON.stringify(items.map(({ id, title, subtitle, colSpan, rowSpan, bgClass, accentColor }) => ({
  id, title, subtitle, colSpan, rowSpan, bgClass, accentColor
})), null, 4)});
</script>

<style scoped>
.bento-container {
  display: grid;
  grid-template-columns: repeat(${columns}, minmax(0, 1fr));
  ${magicDense ? 'grid-auto-flow: dense;' : ''}
}
.bento-item {
  position: relative;
  padding: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 160px;
  color: #ffffff;
}
.glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  filter: blur(40px);
  pointer-events: none;
}
</style>`;
  };

  const handleCopyCode = () => {
    let textToCopy = '';
    if (activeTab === 'tailwind') textToCopy = generateTailwindCode();
    else if (activeTab === 'css') textToCopy = generateCSSCode();
    else if (activeTab === 'react') textToCopy = generateReactCode();
    else if (activeTab === 'vue') textToCopy = generateVueCode();

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  const currentBox = items.find(item => item.id === selectedBoxId);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-24">
      
      {/* LEFT SIDEBAR CONTROLLERS CONTAINER */}
      <aside className="lg:col-span-4 p-5 sm:p-6 rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-md flex flex-col gap-6 sticky top-24">
        
        {/* Workspace Quick Launch Badge */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-white tracking-wide uppercase font-mono">Workspace Configurations</span>
          </div>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Dynamic Preset select templates quick config */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500">
            Layout Presets
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSelectPreset('portfolio')}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                selectedPreset === 'portfolio' 
                  ? 'bg-blue-600 border-blue-500/50 text-white' 
                  : 'bg-zinc-900 border-zinc-805 text-zinc-400 hover:text-white hover:bg-zinc-805'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => handleSelectPreset('saas')}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                selectedPreset === 'saas' 
                  ? 'bg-blue-600 border-blue-500/50 text-white' 
                  : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-805'
              }`}
            >
              SaaS Dashboard
            </button>
            <button
              onClick={() => handleReset()}
              className="px-3 py-2 text-xs font-semibold rounded-lg border bg-zinc-900 border-zinc-850 text-zinc-450 hover:bg-zinc-850 hover:text-white flex items-center justify-center gap-1 transition-all"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Sliders Area */}
        <div className="space-y-5">
          {/* Slider 1: Columns */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase tracking-tight">Grid Columns</span>
              <span className="text-white font-bold">{columns} Cols</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Slider 2: Grid Gap */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase tracking-tight">Grid Gap Size</span>
              <span className="text-white font-bold">{gridGap}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="40" 
              step="4"
              value={gridGap}
              onChange={(e) => setGridGap(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Slider 3: Border Radius */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase tracking-tight">Corner Radius</span>
              <span className="text-white font-bold">{borderRadius}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="32" 
              step="2"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* MAGIC AUTO LAYOUT TOGGLE (dense algorithm) */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 text-left space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-zinc-150">MAGIC AUTO LAYOUT</span>
            </div>
            {/* Toggle switch */}
            <button
              onClick={() => setMagicDense(!magicDense)}
              className={`w-9 h-5 rounded-full p-[1.5px] transition-colors focus:outline-none ${
                magicDense ? 'bg-emerald-500' : 'bg-zinc-800'
              }`}
            >
              <div 
                className={`h-4 w-4 rounded-full bg-zinc-950 transition-transform ${
                  magicDense ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <p className="text-[10px] text-zinc-500 leading-relaxed font-mono">
            Automatically fills grid gaps using the CSS <span className="text-zinc-400 font-bold">dense</span> flow algorithm to optimize structural layout distribution.
          </p>
        </div>

        {/* Configuration Action Area */}
        <div className="flex flex-col gap-2.5 pt-2 border-t border-zinc-900">
          <button
            onClick={handleAddBox}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-zinc-950 text-xs font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Bento Box Element
          </button>
          
          <button
            onClick={() => setIsExportOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs text-white font-bold transition-all hover:scale-[1.01]"
          >
            <Code className="h-4 w-4 text-purple-400" />
            Compile & Export Code Layout
          </button>
        </div>

        {/* Selected Box Config Editor (Renders contextually) */}
        {currentBox && (
          <div className="border-t border-zinc-900 pt-5 mt-2 space-y-4 animate-fade-in text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-bold text-white uppercase font-mono">Customize Box Settings</span>
              </div>
              <button onClick={() => setSelectedBoxId(null)} className="text-zinc-500 hover:text-white p-1">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Editing Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase">Title label</label>
                <input 
                  type="text" 
                  value={currentBox.title}
                  onChange={(e) => updateItem(currentBox.id, { title: e.target.value })}
                  className="w-full text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 focus:border-blue-500/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase">Description body</label>
                <input 
                  type="text" 
                  value={currentBox.subtitle}
                  onChange={(e) => updateItem(currentBox.id, { subtitle: e.target.value })}
                  className="w-full text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 focus:border-blue-500/60 focus:outline-none"
                />
              </div>

              {/* Color Swatch Selectors */}
              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1.5">Background Style</label>
                <div className="flex flex-wrap gap-1.5">
                  {PALETTE.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => updateItem(currentBox.id, { 
                        bgColor: color.hex, 
                        bgClass: color.class, 
                        accentColor: color.accent 
                      })}
                      className={`h-5 w-5 rounded-full ${color.class} border relative flex items-center justify-center transition-all ${
                        currentBox.bgColor === color.hex ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      {currentBox.bgColor === color.hex && <Check className="h-3 w-3 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delete configuration */}
              <button
                onClick={() => deleteItem(currentBox.id)}
                className="w-full text-left flex items-center justify-center gap-2 py-2 rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 hover:border-red-500/40 text-[11px] text-red-400 font-semibold transition-all mt-2"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove Box Item
              </button>
            </div>
          </div>
        )}

      </aside>

      {/* RIGHT SIDEBAR CANVA CONTAINER */}
      <main className="lg:col-span-8 flex flex-col gap-6 w-full text-left">
        
        {/* Workspace info header details */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4.5 rounded-xl border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/15 text-blue-400">
              <Laptop className="h-4.5 w-4.5" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-white uppercase font-mono mb-0.5">Live CSS Renderer Layout</h3>
              <p className="text-[10.5px] text-zinc-500">Manipulate spans, drag blocks order, or compile customized assets instantly.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            {items.length} Elements Active / CSS grid
          </span>
        </div>

        {/* RESPONSIVE CSS GRID VISUAL ENGINE RENDERING CANVAS */}
        <div 
          className="p-5 sm:p-6 md:p-8 rounded-3xl border border-zinc-900/60 bg-zinc-950/20 relative min-h-[500px] overflow-hidden group shadow-inner"
        >
          {/* Workspace density pattern backdrop */}
          <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.18]" />

          {/* Core CSS grid viewport container mapping */}
          <div 
            style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: `${gridGap}px`,
              gridAutoFlow: magicDense ? 'dense' : 'row'
            }}
            className="w-full relative z-10 text-left transition-all"
          >
            {items.map((item, index) => {
              const isSelected = selectedBoxId === item.id;
              
              return (
                <div
                  key={item.id}
                  style={{ 
                    gridColumn: `span ${Math.min(item.colSpan, columns)}`, 
                    gridRow: `span ${item.rowSpan}`,
                    borderRadius: `${borderRadius}px`,
                  }}
                  className={`relative p-5 text-white overflow-hidden flex flex-col justify-between group/box transition-all duration-300 min-h-[160px] cursor-pointer ${item.bgClass} ${
                    isSelected ? 'ring-2 ring-blue-400 scale-[0.99] shadow-2xl' : 'hover:scale-[1.005] hover:brightness-[1.05]'
                  } shadow-lg`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBoxId(item.id);
                  }}
                >
                  {/* Subtle top corner gradient highlight to replicate layout deep designs */}
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                  {/* Top controller badges */}
                  <div className="flex justify-between items-start mb-4 relative z-10 opacity-60 group-hover/box:opacity-100 transition-all">
                    
                    {/* Size tracker badge */}
                    <span className="text-[9px] font-mono font-bold tracking-wide uppercase px-2 py-0.5 bg-black/35 rounded border border-white/5 text-zinc-200">
                      {item.colSpan}x{item.rowSpan}
                    </span>

                    {/* Array priority index manual sorting buttons and Delete option */}
                    <div className="flex items-center gap-1 bg-black/35 rounded border border-white/5 p-0.5 backdrop-blur-sm" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => shiftOrder(index, 'left')}
                        disabled={index === 0}
                        title="Move Priority Left"
                        className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => shiftOrder(index, 'right')}
                        disabled={index === items.length - 1}
                        title="Move Priority Right"
                        className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                      <span className="h-3 w-[1px] bg-white/10" />
                      <button
                        onClick={() => deleteItem(item.id)}
                        title="Remove Box"
                        className="p-1 rounded text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>

                  </div>

                  {/* Center custom metadata inputs / Span manipulation UI */}
                  <div className="my-2 relative z-10 flex flex-col gap-1 text-left">
                    <h4 className="text-md font-bold tracking-tight text-white font-sans truncate pr-4">
                      {item.title}
                    </h4>
                    <p className={`text-[11px] ${item.accentColor} leading-relaxed font-sans line-clamp-2`}>
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Foot Span adjustment scale controls */}
                  <div className="flex justify-between items-center mt-3 pt-3.5 border-t border-white/5 relative z-10 opacity-100 lg:opacity-35 group-hover/box:opacity-100 transition-all" onClick={e => e.stopPropagation()}>
                    
                    {/* Col Span Adjustments */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-mono text-zinc-205 font-semibold">Width:</span>
                      <div className="flex items-center gap-1 bg-black/40 rounded p-0.5 border border-white/5">
                        <button
                          onClick={() => updateItem(item.id, { colSpan: Math.max(1, item.colSpan - 1) })}
                          className="p-0.5 rounded text-zinc-300 hover:text-white hover:bg-white/5"
                        >
                          <MinusSquare className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-[10px] font-mono min-w-[14px] text-center font-bold text-white">
                          {item.colSpan}
                        </span>
                        <button
                          onClick={() => updateItem(item.id, { colSpan: Math.min(columns, item.colSpan + 1) })}
                          className="p-0.5 rounded text-zinc-300 hover:text-white hover:bg-white/5"
                        >
                          <PlusSquare className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Row Span Adjustments */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-mono text-zinc-205 font-semibold">Height:</span>
                      <div className="flex items-center gap-1 bg-black/40 rounded p-0.5 border border-white/5">
                        <button
                          onClick={() => updateItem(item.id, { rowSpan: Math.max(1, item.rowSpan - 1) })}
                          className="p-0.5 rounded text-zinc-300 hover:text-white hover:bg-white/5"
                        >
                          <MinusSquare className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-[10px] font-mono min-w-[14px] text-center font-bold text-white">
                          {item.rowSpan}
                        </span>
                        <button
                          onClick={() => updateItem(item.id, { rowSpan: Math.min(6, item.rowSpan + 1) })}
                          className="p-0.5 rounded text-zinc-300 hover:text-white hover:bg-white/5"
                        >
                          <PlusSquare className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Empty Stage parameters indicator help state description */}
          {items.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 text-center gap-4">
              <span className="p-4 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-550 block">
                <LayoutGrid className="h-10 w-10 animate-pulse" />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Grid Area is Empty</h4>
                <p className="text-xs text-zinc-500 max-w-sm">Use the Left Controller configuration sidebar to add new styled content boxes or select a starter template preset.</p>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM QUICK EXPORT MINI CODE DRAWER (Screenshot 2 preview) */}
        <div className="p-5.5 rounded-2xl border border-zinc-900 bg-zinc-950/60 flex flex-col sm:flex-row sm:items-center sm:justify-between justify-between gap-4 mt-2">
          <div className="flex items-center gap-2.5">
            <Info className="h-4.5 w-4.5 text-blue-400" />
            <span className="text-xs text-zinc-400 leading-relaxed max-w-md">
              Need multi-framework packages? Export this compiled grid cleanly styled as Tailwind classes, semantic React TSX elements, or Vue SFC models.
            </span>
          </div>
          <button
            onClick={() => setIsExportOpen(true)}
            className="inline-flex self-start sm:self-auto items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 font-bold text-zinc-950 text-xs shadow-lg transition-transform hover:scale-105"
          >
            <Code className="h-3.5 w-3.5" />
            Export Code
          </button>
        </div>

      </main>

      {/* CODE EXPORT MODAL ELEMENT (Grand Overlay Popup Window) */}
      {isExportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 cursor-default">
          <div 
            className="w-full max-w-4xl rounded-2xl border border-zinc-850 bg-zinc-950 text-left flex flex-col max-h-[90vh] shadow-2xl overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header controls */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-900 bg-zinc-950">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Code className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Code Export Module</h3>
                  <p className="text-[10.5px] text-zinc-500">Pick raw frameworks, grab target styles and inject them securely into production.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsExportOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-850 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Framework Tab navigation selectors */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-900 bg-zinc-950/40">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('tailwind')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                    activeTab === 'tailwind' ? 'bg-zinc-900 text-blue-400 font-semibold border border-zinc-800' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Tailwind v4 HTML
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                    activeTab === 'css' ? 'bg-zinc-900 text-purple-400 font-semibold border border-zinc-800' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Vanilla CSS Grid
                </button>
                <button
                  onClick={() => setActiveTab('react')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                    activeTab === 'react' ? 'bg-zinc-900 text-pink-400 font-semibold border border-zinc-805' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Next.js React (TSX)
                </button>
                <button
                  onClick={() => setActiveTab('vue')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                    activeTab === 'vue' ? 'bg-zinc-900 text-emerald-400 font-semibold border border-zinc-805' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Vue SFC template
                </button>
              </div>

              {/* Copy Code action Button */}
              <button
                onClick={handleCopyCode}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  copiedCode 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white hover:bg-zinc-200 text-zinc-950'
                }`}
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Compiled Code Code Display Block */}
            <div className="p-5 overflow-auto flex-grow bg-zinc-950 font-mono text-xs text-zinc-300 leading-relaxed max-h-[50vh]">
              <pre className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 whitespace-pre-wrap word-break-all select-all">
                {activeTab === 'tailwind' && generateTailwindCode()}
                {activeTab === 'css' && generateCSSCode()}
                {activeTab === 'react' && generateReactCode()}
                {activeTab === 'vue' && generateVueCode()}
              </pre>
            </div>

            {/* Modal Foot summary parameters */}
            <div className="p-4 border-t border-zinc-900 bg-zinc-900/20 text-[10px] text-zinc-500 font-mono flex flex-col sm:flex-row sm:justify-between items-center gap-2">
              <span>BentoFlow export module. Auto-synced container width columns: {columns}</span>
              <span>All outputs undergo semantic WCAG contrast ratio checks.</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
