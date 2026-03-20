import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Wrench, Zap, Code, ShoppingBag, ShieldCheck, Accessibility, Layout, Smartphone, Printer, Box, MousePointer2 } from 'lucide-react';
import { BENTO_TOOLS_DATA } from '../data/tools';

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
};

export const Tools: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar: Tool Navigation */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-64 border-r border-white/10 bg-zinc-900/50 backdrop-blur-xl 
        flex flex-col h-[calc(100vh-64px)] overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4 lg:mb-6 px-2">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-2">
              <Wrench size={12} />
              Quick Access
            </h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-white/5 rounded-lg text-white/40"
            >
              <X size={16} />
            </button>
          </div>
          <div className="space-y-0.5">
            {BENTO_TOOLS_DATA.map((t) => {
              const Icon = iconMap[t.slug] || Wrench;
              return (
                <Link
                  key={t.slug}
                  to={`/tools/${t.slug}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon size={14} className="text-white/30" />
                  <span className="truncate">{t.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content: Tools Grid */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)]">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 md:mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Programmatic SEO Tools</h1>
              <p className="text-white/40 text-sm md:text-base">Specialized tools for every Bento Grid use case.</p>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-emerald-400 hover:bg-white/10 transition-colors"
            >
              <Menu size={20} />
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {BENTO_TOOLS_DATA.map((tool) => {
              const Icon = iconMap[tool.slug] || Wrench;
              return (
                <Link 
                  key={tool.slug} 
                  to={`/tools/${tool.slug}`}
                  className="group p-5 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/50 transition-all flex flex-col gap-4"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <Icon className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1.5">{tool.title}</h3>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">{tool.ai_summary}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-emerald-400 text-[10px] md:text-xs font-bold flex items-center gap-1.5">
                        Launch Tool
                        <Zap size={12} />
                      </span>
                      <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest text-white/20">
                        {tool.target_audience}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
