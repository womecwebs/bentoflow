import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  BoxSelect, 
  Layers, 
  Palette, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Code, 
  Eye, 
  Download,
  Settings,
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
  ExternalLink,
  Zap,
  Info,
  ShoppingBag,
  ImageIcon,
  User,
  Box,
  Accessibility,
  Smartphone as IosIcon,
  Layout,
  Printer,
  Variable,
  MousePointer2,
  Wrench,
  Menu,
  X,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { BENTO_TOOLS_DATA } from '../data/tools';
import { generateToolCode } from '../utils/toolLogic';
import { useGrid } from '../context/GridContext';
import { InteractiveGrid } from '../components/editor/InteractiveGrid';

// --- Types ---
type Framework = 'tailwind' | 'css' | 'bootstrap';

export const ToolsSuite = () => {
  const [activeToolSlug, setActiveToolSlug] = useState<string>(BENTO_TOOLS_DATA[0].slug);
  const [framework, setFramework] = useState<Framework>('tailwind');
  const [copied, setCopied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const { boxes, config, updateConfig } = useGrid();
  const activeTool = BENTO_TOOLS_DATA.find(t => t.slug === activeToolSlug) || BENTO_TOOLS_DATA[0];

  useEffect(() => {
    setShowPopup(false);
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeToolSlug]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCode = generateToolCode(activeTool.slug, boxes, config, framework === 'tailwind' ? 'tailwind' : framework === 'css' ? 'css' : 'special');

  const iconMap: Record<string, any> = {
    'bento-tailwind-generator': Zap,
    'shopify-bento-liquid': ShoppingBag,
    'bento-portfolio-wireframer': Code,
    'react-bento-component-factory': Box,
    'bento-grid-a11y-checker': Accessibility,
    'ios-control-center-bento-style': IosIcon,
    'bento-dashboard-ui-kit': Layout,
    'bento-print-layout-calculator': Printer,
    'bento-grid-css-variable-lab': Variable,
    'magic-bento-auto-layout': MousePointer2,
    'html-css-grid-generator': Layers,
    'grid-layout-generator': BoxSelect,
    'glassmorphism-ui-generator': Palette,
    'css-shadow-generator': Box,
    'css-gradient-generator': Palette,
  };

  const handleDownload = () => {
    const blob = new Blob([activeCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTool.slug}-output.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Settings className="text-black" size={16} />
          </div>
          <span className="font-bold text-sm">Utility Suite</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-40
        w-full md:w-72 h-screen border-r border-white/5 p-6 
        flex flex-col gap-8 bg-zinc-900/20 backdrop-blur-3xl 
        overflow-y-auto transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="hidden md:flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Settings className="text-black" size={20} />
          </div>
          <div>
            <h2 className="font-bold tracking-tight">Utility Suite</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">BentoFlow Pro</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <button 
            onClick={() => setActiveToolSlug('all')}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group text-sm mb-4 ${activeToolSlug === 'all' ? 'bg-emerald-500 text-black font-bold' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            <LayoutGrid size={16} />
            View All Tools
          </button>

          {BENTO_TOOLS_DATA.map((tool) => {
            const Icon = iconMap[tool.slug] || Wrench;
            return (
              <button 
                key={tool.slug}
                onClick={() => {
                  setActiveToolSlug(tool.slug);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group text-sm ${activeToolSlug === tool.slug ? 'bg-emerald-500 text-black font-bold' : 'hover:bg-white/5 text-white/60'}`}
              >
                <Icon size={16} />
                {tool.title.split(' ').slice(0, 2).join(' ')}
                <ChevronRight size={12} className={`ml-auto transition-transform ${activeToolSlug === tool.slug ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <Link to="/generator" className="flex flex-col gap-4 p-4 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 group hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Sparkles size={16} />
              AI Generator
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Tired of manual coding? Let our AI build your site in seconds.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold group-hover:gap-3 transition-all">
              Try it now <ArrowRight size={12} />
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header & Framework Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                {activeToolSlug === 'all' ? 'Developer Tools Suite' : activeTool.title}
              </h1>
              <p className="text-white/40 text-sm md:text-base max-w-2xl mb-4">
                {activeToolSlug === 'all' 
                  ? 'Explore our collection of specialized bento and UI utilities to accelerate your development workflow.' 
                  : activeTool.seo_description}
              </p>
              {activeToolSlug !== 'all' && (
                <Link 
                  to={`/tools/${activeTool.slug}`} 
                  className="inline-flex items-center gap-2 text-emerald-500 text-sm font-bold hover:underline"
                >
                  Open Standalone Editor
                  <ExternalLink size={14} />
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
              <button 
                onClick={() => setFramework('tailwind')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${framework === 'tailwind' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Tailwind
              </button>
              <button 
                onClick={() => setFramework('css')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${framework === 'css' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                CSS
              </button>
              <button 
                onClick={() => setFramework('bootstrap')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${framework === 'bootstrap' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Bootstrap
              </button>
            </div>
          </div>

          {/* Tool Sandbox */}
          {activeToolSlug === 'all' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {/* Core Editors */}
              <Link to="/editor" className="group p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 hover:border-emerald-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Bento Editor</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Our flagship drag-and-drop bento builder for production-ready layouts.</p>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  Open Editor
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/bento-editor" className="group p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Image Bento Editor</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Transform photos into stunning bento grids with our image-first editor.</p>
                <div className="flex items-center gap-2 text-blue-500 text-xs font-bold">
                  Open Image Editor
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/generator" className="group p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Website Builder</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Generate full bento-style landing pages from a single text prompt.</p>
                <div className="flex items-center gap-2 text-purple-500 text-xs font-bold">
                  Try AI Builder
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/tools/ai-bento-grid-builder" className="group p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 hover:border-emerald-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Bento Grid Builder</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">New: Generate complex, production-ready React + Tailwind bento grids.</p>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  Use AI Builder
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/tools/bento-remix" className="group p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 hover:border-emerald-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <RefreshCw size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Bento Remix Tool</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Remix and customize existing bento grids from the community gallery.</p>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  Start Remixing
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Utility Tools */}
              {BENTO_TOOLS_DATA.map((tool) => {
                const Icon = iconMap[tool.slug] || Wrench;
                return (
                  <button 
                    key={tool.slug}
                    onClick={() => setActiveToolSlug(tool.slug)}
                    className="group p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 hover:border-white/30 transition-all text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-6 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-6">{tool.seo_description}</p>
                    <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                      Open Tool
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Controls */}
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Settings size={20} className="text-emerald-500" />
                  Configuration
                </h3>

                <div className="space-y-6">
                  {['glassmorphism-ui-generator', 'css-shadow-generator', 'css-gradient-generator'].includes(activeTool.slug) ? null : (
                    <>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Grid Columns</label>
                          <span className="font-mono text-emerald-500">{config.columns}</span>
                        </div>
                        <input type="range" min="1" max="12" value={config.columns} onChange={(e) => updateConfig({ columns: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Gap (px)</label>
                          <span className="font-mono text-emerald-500">{config.gap}</span>
                        </div>
                        <input type="range" min="0" max="64" value={config.gap} onChange={(e) => updateConfig({ gap: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Radius (px)</label>
                          <span className="font-mono text-emerald-500">{config.radius}</span>
                        </div>
                        <input type="range" min="0" max="40" value={config.radius} onChange={(e) => updateConfig({ radius: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                    </>
                  )}

                  {activeTool.slug === 'css-shadow-generator' && (
                    <div className="space-y-6 pt-6 border-t border-white/5">
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Blur</label>
                          <span className="font-mono text-emerald-500">{config.shadowBlur}px</span>
                        </div>
                        <input type="range" min="0" max="100" value={config.shadowBlur} onChange={(e) => updateConfig({ shadowBlur: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Spread</label>
                          <span className="font-mono text-emerald-500">{config.shadowSpread}px</span>
                        </div>
                        <input type="range" min="-50" max="50" value={config.shadowSpread} onChange={(e) => updateConfig({ shadowSpread: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Opacity</label>
                          <span className="font-mono text-emerald-500">{config.shadowOpacity}</span>
                        </div>
                        <input type="range" min="0" max="1" step="0.01" value={config.shadowOpacity} onChange={(e) => updateConfig({ shadowOpacity: parseFloat(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-white/40 uppercase font-bold">Shadow Color</label>
                          <input type="color" value={config.shadowColor} onChange={(e) => updateConfig({ shadowColor: e.target.value })} className="w-full h-10 bg-transparent border-none cursor-pointer" />
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <label className="text-white/60">X Offset</label>
                            <span className="font-mono text-emerald-500">{config.shadowOffsetX}px</span>
                          </div>
                          <input type="range" min="-50" max="50" value={config.shadowOffsetX} onChange={(e) => updateConfig({ shadowOffsetX: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Y Offset</label>
                          <span className="font-mono text-emerald-500">{config.shadowOffsetY}px</span>
                        </div>
                        <input type="range" min="-50" max="50" value={config.shadowOffsetY} onChange={(e) => updateConfig({ shadowOffsetY: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                    </div>
                  )}

                  {activeTool.slug === 'glassmorphism-ui-generator' && (
                    <div className="space-y-6 pt-6 border-t border-white/5">
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Glass Blur</label>
                          <span className="font-mono text-emerald-500">{config.glassBlur}px</span>
                        </div>
                        <input type="range" min="0" max="40" value={config.glassBlur} onChange={(e) => updateConfig({ glassBlur: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Glass Opacity</label>
                          <span className="font-mono text-emerald-500">{config.glassOpacity}</span>
                        </div>
                        <input type="range" min="0" max="0.5" step="0.01" value={config.glassOpacity} onChange={(e) => updateConfig({ glassOpacity: parseFloat(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase font-bold">Background Color (Preview)</label>
                        <input type="color" value={config.glassBgColor} onChange={(e) => updateConfig({ glassBgColor: e.target.value })} className="w-full h-10 bg-transparent border-none cursor-pointer" />
                      </div>
                    </div>
                  )}

                  {activeTool.slug === 'css-gradient-generator' && (
                    <div className="space-y-6 pt-6 border-t border-white/5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-white/40 uppercase font-bold">Start Color</label>
                          <input type="color" value={config.gradientStart} onChange={(e) => updateConfig({ gradientStart: e.target.value })} className="w-full h-10 bg-transparent border-none cursor-pointer" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-white/40 uppercase font-bold">End Color</label>
                          <input type="color" value={config.gradientEnd} onChange={(e) => updateConfig({ gradientEnd: e.target.value })} className="w-full h-10 bg-transparent border-none cursor-pointer" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <label className="text-white/60">Angle</label>
                          <span className="font-mono text-emerald-500">{config.gradientAngle}°</span>
                        </div>
                        <input type="range" min="0" max="360" value={config.gradientAngle} onChange={(e) => updateConfig({ gradientAngle: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-white/40 uppercase font-bold">Start Color</label>
                          <input type="color" value={config.gradientStart} onChange={(e) => updateConfig({ gradientStart: e.target.value })} className="w-full h-10 bg-transparent border-none cursor-pointer" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-white/40 uppercase font-bold">End Color</label>
                          <input type="color" value={config.gradientEnd} onChange={(e) => updateConfig({ gradientEnd: e.target.value })} className="w-full h-10 bg-transparent border-none cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Code Output */}
              <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 backdrop-blur-xl relative group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Code size={20} className="text-emerald-500" />
                    {activeTool.output_label}
                  </h3>
                  <button 
                    onClick={() => handleCopy(activeCode || '')}
                    className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white"
                  >
                    {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                  </button>
                </div>
                <pre className="bg-black/50 p-6 rounded-2xl overflow-x-auto text-xs font-mono text-emerald-400/80 leading-relaxed border border-white/5 max-h-[400px]">
                  <code>{activeCode}</code>
                </pre>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleDownload}
                    className="flex-1 py-3 bg-white text-black rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-white/90"
                  >
                    <Download size={14} />
                    Download Code
                  </button>
                  <Link to="/generator" className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                    <Sparkles size={14} />
                    AI Generator
                  </Link>
                </div>
              </div>
            </div>

            {/* Live Preview Sandbox */}
            <div className="relative">
              <div className="sticky top-12 space-y-8">
                <div className="aspect-square rounded-[3rem] bg-zinc-900/50 border border-white/10 backdrop-blur-xl overflow-hidden flex items-center justify-center p-8 md:p-12 relative group">
                  {activeTool.slug === 'glassmorphism-ui-generator' ? (
                    <div 
                      className="w-full h-full rounded-[2rem] flex items-center justify-center p-12 transition-all duration-500"
                      style={{ backgroundColor: config.glassBgColor }}
                    >
                      <div 
                        className="w-full aspect-square max-w-[280px] shadow-2xl transition-all duration-300"
                        style={{ 
                          backdropFilter: `blur(${config.glassBlur}px)`,
                          backgroundColor: `rgba(255, 255, 255, ${config.glassOpacity})`,
                          borderRadius: `${config.radius}px`,
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      />
                    </div>
                  ) : activeTool.slug === 'css-shadow-generator' ? (
                    <div className="w-full h-full flex items-center justify-center p-12 bg-white rounded-[2rem]">
                      <div 
                        className="w-full aspect-square max-w-[200px] bg-white transition-all duration-300"
                        style={{ 
                          boxShadow: `${config.shadowOffsetX}px ${config.shadowOffsetY}px ${config.shadowBlur}px ${config.shadowSpread}px ${config.shadowColor}${Math.round(config.shadowOpacity * 255).toString(16).padStart(2, '0')}`,
                          borderRadius: `${config.radius}px`
                        }}
                      />
                    </div>
                  ) : activeTool.slug === 'css-gradient-generator' ? (
                    <div 
                      className="w-full h-full rounded-[2rem] shadow-2xl transition-all duration-500"
                      style={{ 
                        background: config.gradientType === 'linear'
                          ? `linear-gradient(${config.gradientAngle}deg, ${config.gradientStart} 0%, ${config.gradientEnd} 100%)`
                          : `radial-gradient(circle, ${config.gradientStart} 0%, ${config.gradientEnd} 100%)`,
                        borderRadius: `${config.radius}px`
                      }}
                    />
                  ) : (
                    <InteractiveGrid toolSlug={activeTool.slug} />
                  )}
                  
                  {/* Delayed Popup */}
                  <AnimatePresence>
                    {showPopup && (
                      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/60 backdrop-blur-md"
                          onClick={() => setShowPopup(false)}
                        />
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8, y: 40 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 40 }}
                          className="relative z-10"
                        >
                          <Link 
                            to={`/tools/${activeTool.slug}`}
                            className="px-12 py-6 bg-emerald-500 text-black font-black rounded-3xl shadow-[0_0_100px_rgba(16,185,129,0.6)] flex flex-col items-center gap-4 hover:bg-emerald-400 transition-all group scale-125"
                          >
                            <div className="p-4 bg-black/10 rounded-2xl">
                              <Sparkles size={32} />
                            </div>
                            <div className="text-center">
                              <span className="block text-xs uppercase tracking-widest opacity-60 mb-1">Ready to export?</span>
                              <span className="text-2xl">Open {activeTool.title}</span>
                            </div>
                            <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </Link>
                          <button 
                            onClick={() => setShowPopup(false)}
                            className="absolute -top-12 right-0 text-white/40 hover:text-white transition-colors text-xs font-bold flex items-center gap-2"
                          >
                            Dismiss <X size={14} />
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Device Toggles */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-emerald-500"><Monitor size={14} /></button>
                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40"><Tablet size={14} /></button>
                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40"><Smartphone size={14} /></button>
                  </div>
                </div>

                {/* SEO Content (Hidden but readable) */}
                <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/20 mb-4 flex items-center gap-2"><Info size={14} />Tool Intelligence</h4>
                  <div className="text-sm text-white/40 leading-relaxed space-y-4">
                    <p>{activeTool.ai_summary}</p>
                    <p><strong>Target Audience:</strong> {activeTool.target_audience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

          {/* Other Tools Section */}
          <div className="mt-24 pt-24 border-t border-white/5">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-2">Explore Related Tools</h2>
                <p className="text-white/40 text-sm">Supercharge your bento workflow with our advanced utilities.</p>
              </div>
              <Link to="/seo-guide" className="hidden sm:flex items-center gap-2 text-emerald-500 text-sm font-bold hover:underline">
                SEO & AEO Guide
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/tools/ai-bento-grid-builder" className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-emerald-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">AI Bento Designer</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Generate complex, production-ready React + Tailwind bento grids with AI.</p>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  Try AI Designer
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/generator" className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-emerald-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">AI Bento Generator</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Generate complete bento layouts from a single text prompt using our advanced AI models.</p>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  Try AI Generator
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/bento-editor" className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Image Bento Editor</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Transform your photos into stunning bento grids with our specialized image-first editor.</p>
                <div className="flex items-center gap-2 text-blue-500 text-xs font-bold">
                  Open Image Editor
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/marketplace" className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Bento Marketplace</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Browse and download premium bento templates designed by world-class UI experts.</p>
                <div className="flex items-center gap-2 text-purple-500 text-xs font-bold">
                  Browse Templates
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* AI CTA Banner */}
          <div className="mt-24 p-12 rounded-[3rem] bg-gradient-to-br from-emerald-500 to-emerald-700 text-black relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-none uppercase">
                Stop Coding Grids.<br />Start Prompting Them.
              </h2>
              <p className="text-black/80 text-lg mb-8 font-medium">
                Our AI Bento Generator can build what you're imagining in seconds. No more manual <code>grid-template-areas</code>.
              </p>
              <Link to="/generator" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl">
                Try AI Generator Now
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
