import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Code, 
  LayoutGrid, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  ArrowLeft,
  RefreshCw,
  Zap,
  Layers,
  MousePointer2,
  Info,
  Plus,
  Box,
  Palette,
  Type,
  ImageIcon as LucideImageIcon
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { PublishBentoModal } from '../components/community/PublishBentoModal';
import { ProModal } from '../components/generator/ProModal';

interface SavedGrid {
  id: string;
  prompt: string;
  code: string;
  timestamp: number;
}

export const BentoRemix: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [previewCode, setPreviewCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [generationsCount, setGenerationsCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load code from state if available (remix)
    if (location.state?.remixCode) {
      const code = location.state.remixCode;
      setGeneratedCode(code);
      setPrompt(location.state.prompt || 'Remixed Grid');
      generatePreview(code);
    } else {
      // If no code, redirect back to community
      navigate('/community');
    }
  }, [location.state]);

  const generatePreview = (code: any) => {
    const safeCode = typeof code === 'string' ? code : (typeof code === 'object' ? JSON.stringify(code, null, 2) : String(code));
    
    // Clean up the code for the browser environment
    const cleanedCode = safeCode
      .replace(/import.*from.*;/g, '') // Remove imports
      .replace(/export default/g, '') // Remove export default
      .replace(/export /g, ''); // Remove other exports

    const fullPreview = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
            <script src="https://unpkg.com/lucide@latest"></script>
            <style>
              body { 
                background: #050505; 
                color: white; 
                margin: 0; 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
                overflow-x: hidden; 
              }
              #root { min-height: 100vh; padding: 2rem; display: flex; flex-direction: column; }
              .bento-container { width: 100%; max-width: 1200px; margin: 0 auto; flex: 1; }
              /* Custom scrollbar for preview */
              ::-webkit-scrollbar { width: 8px; }
              ::-webkit-scrollbar-track { background: #050505; }
              ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
              ::-webkit-scrollbar-thumb:hover { background: #444; }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              const { useState, useEffect, useMemo, useRef } = React;
              
              // Setup Framer Motion
              const motion = window.Motion ? window.Motion.motion : { div: 'div' };
              const AnimatePresence = window.Motion ? window.Motion.AnimatePresence : ({children}) => children;

              // Setup Lucide Icons
              const LucideIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
                const [iconHtml, setIconHtml] = useState('');
                
                useEffect(() => {
                  if (window.lucide) {
                    const iconName = name.toLowerCase().replace(/-(.)/g, (m, p1) => p1.toUpperCase());
                    const icon = window.lucide.icons[name] || window.lucide.icons[iconName] || window.lucide.icons['help-circle'];
                    if (icon) {
                      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                      svg.setAttribute('width', size);
                      svg.setAttribute('height', size);
                      svg.setAttribute('viewBox', '0 0 24 24');
                      svg.setAttribute('fill', 'none');
                      svg.setAttribute('stroke', color);
                      svg.setAttribute('stroke-width', strokeWidth);
                      svg.setAttribute('stroke-linecap', 'round');
                      svg.setAttribute('stroke-linejoin', 'round');
                      
                      icon[1].forEach(path => {
                        const p = document.createElementNS('http://www.w3.org/2000/svg', path[0]);
                        Object.entries(path[1]).forEach(([k, v]) => p.setAttribute(k, v));
                        svg.appendChild(p);
                      });
                      
                      setIconHtml(svg.outerHTML);
                    }
                  }
                }, [name, size, color, strokeWidth]);

                return <span dangerouslySetInnerHTML={{ __html: iconHtml }} {...props} />;
              };

              // Map common icons
              const Sparkles = (props) => <LucideIcon name="sparkles" {...props} />;
              const LayoutGrid = (props) => <LucideIcon name="layout-grid" {...props} />;
              const Zap = (props) => <LucideIcon name="zap" {...props} />;
              const Star = (props) => <LucideIcon name="star" {...props} />;
              const ArrowRight = (props) => <LucideIcon name="arrow-right" {...props} />;
              const Code = (props) => <LucideIcon name="code" {...props} />;
              const Layers = (props) => <LucideIcon name="layers" {...props} />;
              const MousePointer2 = (props) => <LucideIcon name="mouse-pointer-2" {...props} />;
              const User = (props) => <LucideIcon name="user" {...props} />;
              const Calendar = (props) => <LucideIcon name="calendar" {...props} />;
              const Briefcase = (props) => <LucideIcon name="briefcase" {...props} />;
              const Send = (props) => <LucideIcon name="send" {...props} />;
              const Twitter = (props) => <LucideIcon name="twitter" {...props} />;
              const Facebook = (props) => <LucideIcon name="facebook" {...props} />;
              const Link = (props) => <LucideIcon name="link" {...props} />;
              
              // Inject generated code
              try {
                ${cleanedCode}

                const BentoComponent = typeof BentoGrid !== 'undefined' ? BentoGrid : () => (
                  <div className="p-8 border border-red-500/50 bg-red-500/10 rounded-2xl text-red-500">
                    <h2 className="font-bold mb-2">Render Error</h2>
                    <p className="text-sm">The generated code did not export a 'BentoGrid' component.</p>
                  </div>
                );

                const App = () => {
                  return (
                    <div className="bento-container">
                      <BentoComponent />
                    </div>
                  );
                };
                
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(<App />);
              } catch (err) {
                console.error('Preview Error:', err);
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(
                  <div className="p-8 border border-red-500/50 bg-red-500/10 rounded-2xl text-red-500">
                    <h2 className="font-bold mb-2">Execution Error</h2>
                    <pre className="text-xs overflow-auto">{err.message}</pre>
                  </div>
                );
              }
            </script>
          </body>
        </html>
      `;
    setPreviewCode(fullPreview);
    setActiveTab('preview');
  };

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bento-remix-${Date.now()}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addComponent = (type: 'box' | 'text' | 'image' | 'stat') => {
    let snippet = '';
    switch (type) {
      case 'box':
        snippet = `
        <div className="col-span-1 row-span-1 p-6 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-emerald-500/50 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
            <Zap size={20} />
          </div>
          <h3 className="text-lg font-bold mb-2">New Component</h3>
          <p className="text-white/40 text-sm">Add your description here.</p>
        </div>`;
        break;
      case 'text':
        snippet = `
        <div className="col-span-2 p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
          <h2 className="text-2xl font-bold mb-4">Highlight Feature</h2>
          <p className="text-white/60 leading-relaxed">This is a larger text block for highlighting important information in your bento grid.</p>
        </div>`;
        break;
      case 'image':
        snippet = `
        <div className="col-span-1 row-span-2 rounded-3xl overflow-hidden border border-white/10 relative group">
          <img src="https://picsum.photos/seed/bento/800/1200" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Visual Asset</span>
          </div>
        </div>`;
        break;
      case 'stat':
        snippet = `
        <div className="col-span-1 p-6 rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-black text-emerald-500 mb-1">99%</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Success Rate</span>
        </div>`;
        break;
    }

    // Try to insert before the last closing div of the main container
    const lastDivIndex = generatedCode.lastIndexOf('</div>');
    if (lastDivIndex !== -1) {
      const newCode = generatedCode.slice(0, lastDivIndex) + snippet + '\n' + generatedCode.slice(lastDivIndex);
      setGeneratedCode(newCode);
      generatePreview(newCode);
    } else {
      // Fallback: just append
      const newCode = generatedCode + '\n' + snippet;
      setGeneratedCode(newCode);
      generatePreview(newCode);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link to="/community" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm mb-2">
              <ArrowLeft size={16} />
              Back to Community
            </Link>
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              Bento <span className="text-emerald-500 italic">Remix</span>
            </h1>
            <p className="text-white/40 max-w-xl">
              Remix and customize existing bento grids from the community. Change features, export code, or publish your own version.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-bold text-sm"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl transition-all font-bold text-sm shadow-lg shadow-emerald-500/20"
            >
              <Download size={18} />
              Export Code
            </button>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Side: Controls & Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-[32px] bg-zinc-900/50 border border-white/10 backdrop-blur-xl space-y-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Info size={14} />
                  Remixing Info
                </h3>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-sm text-white/60 leading-relaxed">
                    You are currently remixing: <span className="text-emerald-500 font-bold">"{prompt}"</span>
                  </p>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  Use the code tab to manually edit the React component or the preview tab to see the live changes.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Plus size={14} />
                  Add Components
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => addComponent('box')}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all gap-2 group"
                  >
                    <Box size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Add Box</span>
                  </button>
                  <button 
                    onClick={() => addComponent('text')}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all gap-2 group"
                  >
                    <Type size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Add Text</span>
                  </button>
                  <button 
                    onClick={() => addComponent('image')}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all gap-2 group"
                  >
                    <LucideImageIcon size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Add Image</span>
                  </button>
                  <button 
                    onClick={() => addComponent('stat')}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all gap-2 group"
                  >
                    <Zap size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Add Stat</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setIsPublishModalOpen(true)}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all gap-2 group"
                  >
                    <Share2 size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Publish</span>
                  </button>
                  <button 
                    onClick={() => generatePreview(generatedCode)}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all gap-2 group"
                  >
                    <RefreshCw size={20} className="text-emerald-500 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pro Teaser */}
            {!isPro && (
              <div className="p-8 rounded-[32px] bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/20 space-y-4 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Zap size={120} fill="currentColor" />
                </div>
                <h3 className="text-lg font-bold">Want AI Assistance?</h3>
                <p className="text-sm text-white/60">
                  Upgrade to Pro to use our AI Bento Builder for unlimited custom generations.
                </p>
                <button 
                  onClick={() => setIsProModalOpen(true)}
                  className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all text-sm"
                >
                  Upgrade to Pro
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Preview/Code */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between bg-zinc-900/50 p-2 rounded-2xl border border-white/5">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('preview')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
                >
                  Live Preview
                </button>
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'code' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
                >
                  Code
                </button>
              </div>
            </div>

            <div className="aspect-video w-full bg-zinc-950 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl relative group">
              {activeTab === 'preview' ? (
                previewCode ? (
                  <div ref={previewRef} className="w-full h-full">
                    <iframe 
                      srcDoc={previewCode}
                      className="w-full h-full border-none"
                      title="Bento Grid Preview"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                    <LayoutGrid size={48} className="mb-4 opacity-10" />
                    <p className="text-sm font-medium">Bento preview will appear here</p>
                  </div>
                )
              ) : (
                <div className="w-full h-full bg-black/40 p-8 overflow-auto font-mono text-xs text-emerald-500/80">
                  <textarea
                    value={generatedCode}
                    onChange={(e) => {
                      setGeneratedCode(e.target.value);
                      // Don't auto-regenerate preview on every keystroke to avoid lag
                    }}
                    className="w-full h-full bg-transparent border-none focus:outline-none resize-none custom-scrollbar"
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PublishBentoModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        gridJson={generatedCode}
        previewRef={previewRef}
      />

      <ProModal 
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </div>
  );
};
