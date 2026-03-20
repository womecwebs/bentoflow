import React, { useState } from 'react';
import { useGrid } from '../../context/GridContext';
import { InteractiveGrid } from './InteractiveGrid';
import { EyeOff, LayoutGrid, Smartphone } from 'lucide-react';

export const BentoEditor: React.FC = () => {
  const { config, isPreview, setIsPreview } = useGrid();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="flex-1 p-4 md:p-8 overflow-visible bg-[#050505] relative flex flex-col items-center">
      {isPreview && (
        <div className="sticky top-0 z-50 mb-8 flex flex-col items-center gap-4">
          <div className="bg-emerald-500 text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3">
            Preview Mode Active
            <button 
              onClick={() => setIsPreview(false)}
              className="bg-black/10 hover:bg-black/20 p-1 rounded-md transition-colors"
            >
              <EyeOff size={14} />
            </button>
          </div>

          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              title="Desktop View"
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              title="Mobile View"
            >
              <Smartphone size={16} />
            </button>
          </div>
        </div>
      )}
      
      <div className={`
        transition-all duration-500 ease-in-out
        ${viewMode === 'mobile' && isPreview ? 'w-[375px] border-x-8 border-y-[16px] border-zinc-800 rounded-[40px] shadow-2xl' : 'w-full max-w-6xl'}
        min-h-[600px] bg-zinc-950/50 rounded-[40px] border border-white/5 p-4 md:p-12
        ${isPreview ? 'scale-[0.98] shadow-2xl shadow-emerald-500/5' : ''}
      `}>
        <InteractiveGrid isCompact={viewMode === 'mobile' && isPreview} />
      </div>
    </div>
  );
};
