'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Code, 
  ExternalLink,
  Info,
  Maximize2,
  FolderOpen
} from 'lucide-react';
import { Template } from '@/data/templatesData';

interface Props {
  template: Template;
}

export default function TemplateWorkspacePreview({ template }: Props) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  const generateTailwindCode = () => {
    const itemsCode = template.layoutState.map(item => {
      return `  {/* Grid Item (${item.title}) */}
  <div className="col-span-${item.colSpan} row-span-${item.rowSpan} ${item.bgClass} text-white p-6 relative overflow-hidden flex flex-col justify-end min-h-[160px] rounded-2xl">
    {/* Ambient Glow */}
    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-3xl pointer-events-none" />
    <div className="relative z-10">
      <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1">${item.title}</h3>
      <p className="text-xs ${item.accentColor} leading-relaxed">${item.subtitle}</p>
    </div>
  </div>`;
    }).join('\n\n');

    return `<div className="grid grid-cols-${template.columns} gap-[${template.gridGap}px] ${template.magicDense ? 'grid-flow-row-dense' : ''}">
${itemsCode}
</div>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTailwindCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      
      {/* TABS SELECTOR */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg text-xs font-bold leading-none transition-colors border flex items-center gap-1.5 ${
              activeTab === 'preview' 
                ? 'bg-zinc-900 border-zinc-800 text-emerald-400' 
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Live Preview Canvas
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg text-xs font-bold leading-none transition-colors border flex items-center gap-1.5 ${
              activeTab === 'code' 
                ? 'bg-zinc-900 border-zinc-800 text-purple-400' 
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            View Tailwind Code
          </button>
        </div>

        {activeTab === 'code' && (
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-900 hover:bg-zinc-850 border border-zinc-805 text-zinc-200 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                Copy Output
              </>
            )}
          </button>
        )}
      </div>

      {/* CORE DISPLAY WINDOW */}
      <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 relative min-h-[360px] flex flex-col items-stretch justify-center">
        <div className="absolute inset-0 bg-grid-pattern-dense opacity-[0.2] pointer-events-none" />

        {activeTab === 'preview' ? (
          <div 
            style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${template.columns}, minmax(0, 1fr))`,
              gap: `${template.gridGap}px`,
              gridAutoFlow: template.magicDense ? 'dense' : 'row'
            }}
            className="w-full relative z-10"
          >
            {template.layoutState.map((cell) => (
              <div
                key={cell.id}
                style={{
                  gridColumn: `span ${cell.colSpan}`,
                  gridRow: `span ${cell.rowSpan}`,
                  borderRadius: `${template.borderRadius}px`
                }}
                className={`p-5 text-white ${cell.bgClass} relative overflow-hidden flex flex-col justify-end min-h-[160px] shadow-lg`}
              >
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                
                <div className="flex justify-between items-start absolute top-4 left-4 right-4">
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 bg-black/25 rounded border border-white/5">
                    {cell.colSpan}x{cell.rowSpan}
                  </span>
                </div>

                <div className="relative z-10 pt-4">
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight">
                    {cell.title}
                  </h4>
                  <p className={`text-[11px] ${cell.accentColor} leading-relaxed line-clamp-2`}>
                    {cell.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full relative z-10">
            <pre className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-900 font-mono text-[11px] text-zinc-350 leading-relaxed whitespace-pre-wrap select-all">
              {generateTailwindCode()}
            </pre>
          </div>
        )}
      </div>

      {/* Quick notice block */}
      <div className="flex items-start gap-2.5 p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 text-[11px] text-zinc-500 leading-relaxed">
        <Info className="h-4.5 w-4.5 text-blue-400 mt-0.5 shrink-0" />
        <p>
          You are looking at the pre-calculated code outline. To adjust spans dynamically, resize individual boxes, or mix customizable background color swatches, load this preset into our online Generator workspace engine canvas.
        </p>
      </div>

    </div>
  );
}
