import React, { useState, useRef } from 'react';
// @ts-ignore
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { 
  Download, 
  Code, 
  FileJson, 
  ImageIcon, 
  LayoutGrid, 
  Maximize2, 
  Move, 
  Settings2, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface BentoItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  image: string;
  title: string;
}

const DEFAULT_LAYOUTS: BentoItem[][] = [
  // Layout 1: Classic Bento
  [
    { id: '1', x: 0, y: 0, w: 6, h: 4, image: 'https://picsum.photos/seed/bento1/800/600', title: 'Main Feature' },
    { id: '2', x: 6, y: 0, w: 3, h: 2, image: 'https://picsum.photos/seed/bento2/400/300', title: 'Sub 1' },
    { id: '3', x: 9, y: 0, w: 3, h: 2, image: 'https://picsum.photos/seed/bento3/400/300', title: 'Sub 2' },
    { id: '4', x: 6, y: 2, w: 6, h: 2, image: 'https://picsum.photos/seed/bento4/600/300', title: 'Wide Banner' },
  ],
  // Layout 2: Vertical Focus
  [
    { id: '1', x: 0, y: 0, w: 4, h: 6, image: 'https://picsum.photos/seed/v1/400/800', title: 'Tall Feature' },
    { id: '2', x: 4, y: 0, w: 8, h: 3, image: 'https://picsum.photos/seed/v2/800/300', title: 'Top Wide' },
    { id: '3', x: 4, y: 3, w: 4, h: 3, image: 'https://picsum.photos/seed/v3/400/400', title: 'Square' },
    { id: '4', x: 8, y: 3, w: 4, h: 3, image: 'https://picsum.photos/seed/v4/400/400', title: 'Square 2' },
  ],
  // Layout 3: Mosaic
  [
    { id: '1', x: 0, y: 0, w: 3, h: 3, image: 'https://picsum.photos/seed/m1/400/400', title: 'M1' },
    { id: '2', x: 3, y: 0, w: 6, h: 3, image: 'https://picsum.photos/seed/m2/600/300', title: 'M2' },
    { id: '3', x: 9, y: 0, w: 3, h: 6, image: 'https://picsum.photos/seed/m3/400/800', title: 'M3' },
    { id: '4', x: 0, y: 3, w: 3, h: 3, image: 'https://picsum.photos/seed/m4/400/400', title: 'M4' },
    { id: '5', x: 3, y: 3, w: 6, h: 3, image: 'https://picsum.photos/seed/m5/600/300', title: 'M5' },
  ],
  // Layout 4: Hero Centered
  [
    { id: '1', x: 3, y: 0, w: 6, h: 6, image: 'https://picsum.photos/seed/h1/600/600', title: 'Hero' },
    { id: '2', x: 0, y: 0, w: 3, h: 3, image: 'https://picsum.photos/seed/h2/300/300', title: 'L1' },
    { id: '3', x: 0, y: 3, w: 3, h: 3, image: 'https://picsum.photos/seed/h3/300/300', title: 'L2' },
    { id: '4', x: 9, y: 0, w: 3, h: 3, image: 'https://picsum.photos/seed/h4/300/300', title: 'R1' },
    { id: '5', x: 9, y: 3, w: 3, h: 3, image: 'https://picsum.photos/seed/h5/300/300', title: 'R2' },
  ],
  // Layout 5: Zig Zag
  [
    { id: '1', x: 0, y: 0, w: 8, h: 3, image: 'https://picsum.photos/seed/z1/800/300', title: 'Z1' },
    { id: '2', x: 8, y: 0, w: 4, h: 6, image: 'https://picsum.photos/seed/z2/400/600', title: 'Z2' },
    { id: '3', x: 0, y: 3, w: 4, h: 6, image: 'https://picsum.photos/seed/z3/400/600', title: 'Z3' },
    { id: '4', x: 4, y: 3, w: 4, h: 3, image: 'https://picsum.photos/seed/z4/400/400', title: 'Z4' },
  ],
  // Layout 6: Grid 2x2 Large
  [
    { id: '1', x: 0, y: 0, w: 6, h: 4, image: 'https://picsum.photos/seed/g1/600/400', title: 'G1' },
    { id: '2', x: 6, y: 0, w: 6, h: 4, image: 'https://picsum.photos/seed/g2/600/400', title: 'G2' },
    { id: '3', x: 0, y: 4, w: 6, h: 4, image: 'https://picsum.photos/seed/g3/600/400', title: 'G3' },
    { id: '4', x: 6, y: 4, w: 6, h: 4, image: 'https://picsum.photos/seed/g4/600/400', title: 'G4' },
  ],
  // Layout 7: Sidebar Right
  [
    { id: '1', x: 0, y: 0, w: 9, h: 8, image: 'https://picsum.photos/seed/s1/900/800', title: 'Main' },
    { id: '2', x: 9, y: 0, w: 3, h: 2, image: 'https://picsum.photos/seed/s2/300/200', title: 'Side 1' },
    { id: '3', x: 9, y: 2, w: 3, h: 2, image: 'https://picsum.photos/seed/s3/300/200', title: 'Side 2' },
    { id: '4', x: 9, y: 4, w: 3, h: 2, image: 'https://picsum.photos/seed/s4/300/200', title: 'Side 3' },
    { id: '5', x: 9, y: 6, w: 3, h: 2, image: 'https://picsum.photos/seed/s5/300/200', title: 'Side 4' },
  ],
  // Layout 8: T-Shape
  [
    { id: '1', x: 0, y: 0, w: 12, h: 3, image: 'https://picsum.photos/seed/t1/1200/300', title: 'Top' },
    { id: '2', x: 4, y: 3, w: 4, h: 6, image: 'https://picsum.photos/seed/t2/400/600', title: 'Center' },
    { id: '3', x: 0, y: 3, w: 4, h: 3, image: 'https://picsum.photos/seed/t3/400/300', title: 'L' },
    { id: '4', x: 8, y: 3, w: 4, h: 3, image: 'https://picsum.photos/seed/t4/400/300', title: 'R' },
  ],
  // Layout 9: Stairs
  [
    { id: '1', x: 0, y: 0, w: 3, h: 3, image: 'https://picsum.photos/seed/st1/300/300', title: 'S1' },
    { id: '2', x: 3, y: 1, w: 3, h: 3, image: 'https://picsum.photos/seed/st2/300/300', title: 'S2' },
    { id: '3', x: 6, y: 2, w: 3, h: 3, image: 'https://picsum.photos/seed/st3/300/300', title: 'S3' },
    { id: '4', x: 9, y: 3, w: 3, h: 3, image: 'https://picsum.photos/seed/st4/300/300', title: 'S4' },
  ],
  // Layout 10: Random Mix
  [
    { id: '1', x: 0, y: 0, w: 4, h: 4, image: 'https://picsum.photos/seed/r1/400/400', title: 'R1' },
    { id: '2', x: 4, y: 0, w: 4, h: 2, image: 'https://picsum.photos/seed/r2/400/200', title: 'R2' },
    { id: '3', x: 8, y: 0, w: 4, h: 4, image: 'https://picsum.photos/seed/r3/400/400', title: 'R3' },
    { id: '4', x: 4, y: 2, w: 2, h: 2, image: 'https://picsum.photos/seed/r4/200/200', title: 'R4' },
    { id: '5', x: 6, y: 2, w: 2, h: 2, image: 'https://picsum.photos/seed/r5/200/200', title: 'R5' },
  ],
];

export const ImageBentoEditor: React.FC = () => {
  const [currentLayoutIndex, setCurrentLayoutIndex] = useState(0);
  const [items, setItems] = useState<BentoItem[]>(DEFAULT_LAYOUTS[0]);
  const [isEditMode, setIsEditMode] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleLayoutChange = (newLayout: any[]) => {
    const updatedItems = items.map(item => {
      const layoutItem = newLayout.find((l: any) => l.i === item.id);
      if (layoutItem) {
        return {
          ...item,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const switchLayout = (index: number) => {
    setCurrentLayoutIndex(index);
    setItems(DEFAULT_LAYOUTS[index]);
  };

  const exportAsImage = async () => {
    if (gridRef.current) {
      try {
        const dataUrl = await toPng(gridRef.current, { 
          cacheBust: true,
          // Skip fonts if they cause issues, but try to include them first
          // skipFonts: false,
          style: {
            // Ensure fonts are loaded
            fontFamily: 'Inter, sans-serif',
          }
        });
        saveAs(dataUrl, `bento-layout-${currentLayoutIndex + 1}.png`);
      } catch (error) {
        console.error('Error exporting image:', error);
        // Fallback if fonts fail
        try {
          const dataUrl = await toPng(gridRef.current, { 
            cacheBust: true,
            skipFonts: true 
          });
          saveAs(dataUrl, `bento-layout-${currentLayoutIndex + 1}.png`);
        } catch (fallbackError) {
          console.error('Fallback export failed:', fallbackError);
        }
      }
    }
  };

  const exportAsJSON = () => {
    const data = JSON.stringify(items, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, `bento-layout-${currentLayoutIndex + 1}.json`);
  };

  const generateTailwind = () => {
    const code = `<div class="grid grid-cols-12 gap-4 auto-rows-[100px]">
  ${items.map(item => `
  <div class="relative rounded-3xl overflow-hidden shadow-xl" style="grid-column: span ${item.w}; grid-row: span ${item.h};">
    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
      <h3 class="text-white font-bold">${item.title}</h3>
    </div>
  </div>`).join('')}
</div>`;
    const blob = new Blob([code], { type: 'text/plain' });
    saveAs(blob, `bento-tailwind.html`);
  };

  const generateVanillaCSS = () => {
    const css = `.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  grid-auto-rows: 100px;
}

.bento-item {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.bento-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bento-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  color: white;
  font-weight: bold;
}
`;
    const html = `<div class="bento-grid">
  ${items.map(item => `
  <div class="bento-item" style="grid-column: span ${item.w}; grid-row: span ${item.h};">
    <img src="${item.image}" alt="${item.title}">
    <div class="bento-overlay">${item.title}</div>
  </div>`).join('')}
</div>`;
    const fullCode = `<style>${css}</style>\n\n${html}`;
    const blob = new Blob([fullCode], { type: 'text/plain' });
    saveAs(blob, `bento-vanilla.html`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
              <LayoutGrid className="text-emerald-500" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Image Bento Editor</h1>
              <p className="text-white/40 text-sm">Design and export beautiful image-based bento grids.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setIsEditMode(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${!isEditMode ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              <Eye size={16} />
              Preview
            </button>
            <button
              onClick={() => setIsEditMode(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isEditMode ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
            >
              <Edit3 size={16} />
              Edit Mode
            </button>
          </div>
        </div>

        {/* Layout Selector */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white/20 mr-2">Layouts</span>
            {DEFAULT_LAYOUTS.map((_, i) => (
              <button
                key={i}
                onClick={() => switchLayout(i)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center border ${
                  currentLayoutIndex === i 
                    ? 'bg-emerald-500 border-emerald-400 text-black' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editor Area */}
          <div className="lg:col-span-9 space-y-6">
            <div 
              ref={gridRef}
              className="bg-zinc-900/30 border border-white/10 rounded-[2.5rem] p-8 min-h-[600px] relative overflow-hidden glassmorphic"
            >
              <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
              
              <ResponsiveGridLayout
                className="layout"
                layouts={{ lg: items.map(item => ({ i: item.id, x: item.x, y: item.y, w: item.w, h: item.h })) }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={100}
                draggableHandle=".drag-handle"
                isDraggable={isEditMode}
                isResizable={isEditMode}
                onLayoutChange={handleLayoutChange}
                margin={[16, 16]}
              >
                {items.map((item) => (
                  <div key={item.id} className="group">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-zinc-800">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                      
                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
                          {isEditMode && (
                            <div className="drag-handle cursor-move p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
                              <Move size={16} />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-white font-bold text-lg tracking-tight">{item.title}</h3>
                          <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Bento Element</p>
                        </div>
                      </div>

                      {isEditMode && (
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="p-1 bg-emerald-500 rounded-lg text-black">
                            <Maximize2 size={12} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </ResponsiveGridLayout>
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="lg:col-span-3 space-y-6">
            <Link 
              to="/tools/ai-bento-grid-builder"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-4 rounded-3xl font-bold hover:bg-emerald-500/20 transition-all group"
            >
              <Sparkles size={18} className="group-hover:scale-110 transition-transform" />
              Use AI Bento Grid Builder
            </Link>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-6">
                <Download className="text-emerald-500" size={18} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Export Options</h2>
              </div>

              <div className="space-y-3">
                <button
                  onClick={exportAsImage}
                  className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="text-white/40 group-hover:text-emerald-400 transition-colors" size={20} />
                    <span className="text-sm font-medium">Export as Image</span>
                  </div>
                  <ChevronRight size={16} className="text-white/20" />
                </button>

                <button
                  onClick={generateTailwind}
                  className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Code className="text-white/40 group-hover:text-emerald-400 transition-colors" size={20} />
                    <span className="text-sm font-medium">Tailwind HTML</span>
                  </div>
                  <ChevronRight size={16} className="text-white/20" />
                </button>

                <button
                  onClick={generateVanillaCSS}
                  className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Settings2 className="text-white/40 group-hover:text-emerald-400 transition-colors" size={20} />
                    <span className="text-sm font-medium">Vanilla CSS</span>
                  </div>
                  <ChevronRight size={16} className="text-white/20" />
                </button>

                <button
                  onClick={exportAsJSON}
                  className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileJson className="text-white/40 group-hover:text-emerald-400 transition-colors" size={20} />
                    <span className="text-sm font-medium">Export JSON</span>
                  </div>
                  <ChevronRight size={16} className="text-white/20" />
                </button>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-emerald-500" size={18} />
                <h3 className="text-sm font-bold text-emerald-400">Pro Tip</h3>
              </div>
              <p className="text-xs text-emerald-400/60 leading-relaxed">
                Switch to **Edit Mode** to resize and reposition elements. Your custom layouts can be exported directly to your production code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
