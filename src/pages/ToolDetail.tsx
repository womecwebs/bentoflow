import React, { useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { BENTO_TOOLS_DATA } from '../data/tools';
import { AEOSection } from '../components/seo/AEOSection';
import { StructuredData } from '../components/seo/StructuredData';
import { ToolInterface } from '../components/seo/ToolInterface';
import { CodePreviewSection } from '../components/seo/CodePreviewSection';
import { generateSchema } from '../utils/schema';
import { ChevronRight, ArrowLeft, Share2, Bookmark, Target, Eye, Code2, Lock, Wrench, Zap, Code, ShoppingBag, ShieldCheck, Accessibility, Layout, Smartphone, Printer, Box, MousePointer2, LayoutGrid, Plus, Settings2, Menu, X, Sparkles, ArrowRight, ShoppingBag as ShoppingBagIcon, Layers, BoxSelect, Palette, Download, ExternalLink } from 'lucide-react';
import { useGrid } from '../context/GridContext';
import { CheckoutModal } from '../components/marketplace/CheckoutModal';

import { generateToolCode } from '../utils/toolLogic';

import { InteractiveGrid } from '../components/editor/InteractiveGrid';

const iconMap: Record<string, any> = {
  'bento-tailwind-generator': Zap,
  'shopify-bento-liquid': ShoppingBag,
  'bento-portfolio-wireframer': Code,
  'react-bento-component-factory': Box,
  'bento-grid-a11y-checker': Accessibility,
  'ios-control-center-bento-style': Smartphone,
  'bento-dashboard-ui-kit': Layout,
  'bento-print-layout-calculator': Printer,
  'bento-grid-css-variable-lab': Wrench,
  'magic-bento-auto-layout': MousePointer2,
  'bento-grid-generator-premium': ShieldCheck,
  'bento-grid-generator-free': LayoutGrid,
  'bento-grid-generator-pro': Sparkles,
  'html-css-grid-generator': Layers,
  'grid-layout-generator': BoxSelect,
  'glassmorphism-ui-generator': Palette,
  'css-shadow-generator': Box,
  'css-gradient-generator': Palette,
};

export const ToolDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const tool = BENTO_TOOLS_DATA.find(t => t.slug === slug);
  const { boxes, config, isUnlocked, unlockTemplate, addBox, updateConfig } = useGrid();
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  useEffect(() => {
    if (tool) {
      document.title = `${tool.title} | BentoFlow Pro`;
    }
  }, [tool]);

  if (!tool) {
    return <Navigate to="/tools" replace />;
  }

  const isPremium = tool.slug.includes('premium') || ['ios-control-center-bento-style', 'shopify-bento-liquid'].includes(tool.slug);
  const schemas = generateSchema(tool);

  const dynamicCode = generateToolCode(tool.slug, boxes, config);

  const handleDownload = () => {
    const blob = new Blob([dynamicCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.slug}-output.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex overflow-hidden relative">
      <StructuredData tool={tool} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[100] w-14 h-14 bg-emerald-500 text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Left Sidebar: Controls (Editor-like) */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-[90] lg:z-0
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        w-80 h-[calc(100vh-64px)] bg-[#050505] border-r border-white/10 flex flex-col
      `}>
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <div className="mb-8">
            <Link to="/tools" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs mb-6">
              <ArrowLeft size={14} />
              Back to Tools
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                {React.createElement(iconMap[tool.slug] || Wrench, { size: 20 })}
              </div>
              <h1 className="text-xl font-bold tracking-tight">{tool.title}</h1>
            </div>
            <p className="text-xs text-white/40 leading-relaxed mb-4">{tool.seo_description}</p>
            <Link 
              to="/editor" 
              className="inline-flex items-center gap-2 text-emerald-500 text-[10px] font-bold hover:underline mb-6"
            >
              Open Standalone Editor
              <ExternalLink size={12} />
            </Link>
          </div>

          <div className="space-y-8">
            {/* Quick Controls */}
            <div>
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
                <Settings2 size={12} />
                Layout Settings
              </h2>
              <div className="space-y-4">
                {['glassmorphism-ui-generator', 'css-shadow-generator', 'css-gradient-generator'].includes(tool.slug) ? null : (
                  <>
                    <button 
                      onClick={addBox}
                      className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-all shadow-lg"
                    >
                      <Plus size={16} />
                      Add Bento Box
                    </button>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <div className="flex justify-between mb-3">
                        <label className="text-xs text-white/50">Grid Gap</label>
                        <span className="text-[10px] text-white/30 font-mono">{config.gap}px</span>
                      </div>
                      <input 
                        type="range" min="0" max="40" value={config.gap}
                        onChange={(e) => updateConfig({ gap: parseInt(e.target.value) })}
                        className="w-full accent-emerald-500 h-1"
                      />
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <div className="flex justify-between mb-3">
                        <label className="text-xs text-white/50">Corner Radius</label>
                        <span className="text-[10px] text-white/30 font-mono">{config.radius}px</span>
                      </div>
                      <input 
                        type="range" min="0" max="40" value={config.radius}
                        onChange={(e) => updateConfig({ radius: parseInt(e.target.value) })}
                        className="w-full accent-emerald-500 h-1"
                      />
                    </div>
                  </>
                )}

                {/* Tool Specific Controls */}
                {tool.slug === 'magic-bento-auto-layout' && (
                  <div className="bg-white/5 border border-emerald-500/20 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs text-emerald-400 font-bold">Magic Auto-Layout</label>
                      <div 
                        onClick={() => updateConfig({ autoFlow: config.autoFlow === 'dense' ? 'row' : 'dense' })}
                        className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${config.autoFlow === 'dense' ? 'bg-emerald-500' : 'bg-white/10'}`}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${config.autoFlow === 'dense' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      Toggles <code className="text-emerald-400">grid-auto-flow: dense</code> to automatically fill gaps in your grid.
                    </p>
                  </div>
                )}

                {tool.slug === 'css-shadow-generator' && (
                  <div className="space-y-6 pt-4 border-t border-white/5">
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px]">
                        <label className="text-white/60">Blur</label>
                        <span className="font-mono text-emerald-500">{config.shadowBlur}px</span>
                      </div>
                      <input type="range" min="0" max="100" value={config.shadowBlur} onChange={(e) => updateConfig({ shadowBlur: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px]">
                        <label className="text-white/60">Spread</label>
                        <span className="font-mono text-emerald-500">{config.shadowSpread}px</span>
                      </div>
                      <input type="range" min="-50" max="50" value={config.shadowSpread} onChange={(e) => updateConfig({ shadowSpread: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px]">
                        <label className="text-white/60">Opacity</label>
                        <span className="font-mono text-emerald-500">{config.shadowOpacity}</span>
                      </div>
                      <input type="range" min="0" max="1" step="0.01" value={config.shadowOpacity} onChange={(e) => updateConfig({ shadowOpacity: parseFloat(e.target.value) })} className="w-full accent-emerald-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-white/40 uppercase font-bold">Shadow Color</label>
                        <input type="color" value={config.shadowColor} onChange={(e) => updateConfig({ shadowColor: e.target.value })} className="w-full h-8 bg-transparent border-none cursor-pointer" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-[10px]">
                          <label className="text-white/60">X Offset</label>
                          <span className="font-mono text-emerald-500">{config.shadowOffsetX}px</span>
                        </div>
                        <input type="range" min="-50" max="50" value={config.shadowOffsetX} onChange={(e) => updateConfig({ shadowOffsetX: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px]">
                        <label className="text-white/60">Y Offset</label>
                        <span className="font-mono text-emerald-500">{config.shadowOffsetY}px</span>
                      </div>
                      <input type="range" min="-50" max="50" value={config.shadowOffsetY} onChange={(e) => updateConfig({ shadowOffsetY: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                    </div>
                  </div>
                )}

                {tool.slug === 'glassmorphism-ui-generator' && (
                  <div className="space-y-6 pt-4 border-t border-white/5">
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px]">
                        <label className="text-white/60">Glass Blur</label>
                        <span className="font-mono text-emerald-500">{config.glassBlur}px</span>
                      </div>
                      <input type="range" min="0" max="40" value={config.glassBlur} onChange={(e) => updateConfig({ glassBlur: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px]">
                        <label className="text-white/60">Glass Opacity</label>
                        <span className="font-mono text-emerald-500">{config.glassOpacity}</span>
                      </div>
                      <input type="range" min="0" max="0.5" step="0.01" value={config.glassOpacity} onChange={(e) => updateConfig({ glassOpacity: parseFloat(e.target.value) })} className="w-full accent-emerald-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 uppercase font-bold">Background Color (Preview)</label>
                      <input type="color" value={config.glassBgColor} onChange={(e) => updateConfig({ glassBgColor: e.target.value })} className="w-full h-8 bg-transparent border-none cursor-pointer" />
                    </div>
                  </div>
                )}

                {tool.slug === 'css-gradient-generator' && (
                  <div className="space-y-6 pt-4 border-t border-white/5">
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px]">
                        <label className="text-white/60">Angle</label>
                        <span className="font-mono text-emerald-500">{config.gradientAngle}°</span>
                      </div>
                      <input type="range" min="0" max="360" value={config.gradientAngle} onChange={(e) => updateConfig({ gradientAngle: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-white/40 uppercase font-bold">Start Color</label>
                        <input type="color" value={config.gradientStart} onChange={(e) => updateConfig({ gradientStart: e.target.value })} className="w-full h-8 bg-transparent border-none cursor-pointer" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-white/40 uppercase font-bold">End Color</label>
                        <input type="color" value={config.gradientEnd} onChange={(e) => updateConfig({ gradientEnd: e.target.value })} className="w-full h-8 bg-transparent border-none cursor-pointer" />
                      </div>
                    </div>
                  </div>
                )}

                {tool.slug === 'bento-grid-a11y-checker' && (
                  <div className="bg-white/5 border border-blue-500/20 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs text-blue-400 font-bold">A11y Overlay</label>
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Active</span>
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      Visualizing DOM reading order (1, 2, 3...) to ensure screen reader flow matches visual layout.
                    </p>
                  </div>
                )}

                {tool.slug === 'bento-grid-css-variable-lab' && (
                  <div className="bg-white/5 border border-purple-500/20 p-4 rounded-xl">
                    <label className="text-xs text-purple-400 font-bold mb-3 block">Variable Prefix</label>
                    <input 
                      type="text" 
                      placeholder="--bento-"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* AI Call to Action */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
              <h3 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <Zap size={14} />
                AI Power-Up
              </h3>
              <p className="text-[10px] text-white/40 mb-4">Need a complete website? Let our AI build it for you in seconds.</p>
              <Link 
                to="/generator"
                className="block w-full py-2 bg-emerald-500 text-black text-center rounded-lg text-[10px] font-bold hover:bg-emerald-400 transition-colors"
              >
                Launch AI Generator
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-y-auto bg-[#080808]">
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-[10px] text-white/30">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/tools" className="hover:text-white transition-colors">Tools</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{tool.title}</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white/40">
                <Share2 size={16} />
              </button>
              <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white/40">
                <Bookmark size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Grid Canvas */}
          <div className="bg-zinc-950 rounded-[40px] border border-white/5 p-4 md:p-12 min-h-[500px] shadow-2xl relative group mb-12">
            <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <div className="mt-8 flex-1 flex items-center justify-center">
              {tool.slug === 'glassmorphism-ui-generator' ? (
                <div 
                  className="w-full h-full min-h-[400px] rounded-[2rem] flex items-center justify-center p-12 transition-all duration-500"
                  style={{ backgroundColor: config.glassBgColor }}
                >
                  <div 
                    className="w-full aspect-square max-w-[320px] shadow-2xl transition-all duration-300"
                    style={{ 
                      backdropFilter: `blur(${config.glassBlur}px)`,
                      backgroundColor: `rgba(255, 255, 255, ${config.glassOpacity})`,
                      borderRadius: `${config.radius}px`,
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                </div>
              ) : tool.slug === 'css-shadow-generator' ? (
                <div className="w-full h-full min-h-[400px] flex items-center justify-center p-12 bg-white rounded-[2rem]">
                  <div 
                    className="w-full aspect-square max-w-[240px] bg-white transition-all duration-300"
                    style={{ 
                      boxShadow: `${config.shadowOffsetX}px ${config.shadowOffsetY}px ${config.shadowBlur}px ${config.shadowSpread}px ${config.shadowColor}${Math.round(config.shadowOpacity * 255).toString(16).padStart(2, '0')}`,
                      borderRadius: `${config.radius}px`
                    }}
                  />
                </div>
              ) : tool.slug === 'css-gradient-generator' ? (
                <div 
                  className="w-full h-full min-h-[400px] rounded-[2rem] shadow-2xl transition-all duration-500"
                  style={{ 
                    background: config.gradientType === 'linear'
                      ? `linear-gradient(${config.gradientAngle}deg, ${config.gradientStart} 0%, ${config.gradientEnd} 100%)`
                      : `radial-gradient(circle, ${config.gradientStart} 0%, ${config.gradientEnd} 100%)`,
                    borderRadius: `${config.radius}px`
                  }}
                />
              ) : (
                <InteractiveGrid toolSlug={tool.slug} />
              )}
            </div>
          </div>

          {/* Output Section (Prominent) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                <Target size={12} />
                Production Ready Output
              </h2>
              <ToolInterface label={tool.output_label} code={dynamicCode} />
              <button 
                onClick={handleDownload}
                className="w-full mt-4 py-3 bg-white text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
              >
                <Download size={14} />
                Download Code
              </button>
            </div>
            <div className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
                <Code2 size={12} />
                Implementation Guide
              </h2>
              <CodePreviewSection 
                slug={tool.slug} 
                isPremium={isPremium} 
                onUnlock={() => setIsCheckoutOpen(true)}
              />
            </div>
          </section>

          {/* AEO/SEO Content */}
          <div className="border-t border-white/5 pt-16">
            <AEOSection 
              toolName={tool.title}
              aiSummary={tool.ai_summary}
              comparisonData={tool.comparison_table}
              faqs={tool.faq_list}
            />

            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Mastering the {tool.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tool.how_to_steps.map((step, i) => (
                  <div key={i} className="relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-colors group">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-500 text-black rounded-lg flex items-center justify-center font-bold text-base shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-bold mb-3 mt-1">{step.name}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </section>

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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/tools/ai-bento-grid-builder" className="group p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Bento Grid Builder</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">Create complex, production-ready bento grids using AI with high-end aesthetics.</p>
                  <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                    Try AI Builder
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
                    <ShoppingBagIcon size={24} />
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
            <div className="mt-24 mb-12 p-12 rounded-[3rem] bg-gradient-to-br from-emerald-500 to-emerald-700 text-black relative overflow-hidden group">
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
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        template={{ id: tool.slug, name: tool.title, price_usd: 19 }}
        onSuccess={unlockTemplate}
      />
    </main>
  );
};
