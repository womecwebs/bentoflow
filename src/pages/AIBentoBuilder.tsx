import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Code, 
  Eye, 
  Copy, 
  Check, 
  Download, 
  Loader2, 
  Zap, 
  LayoutGrid, 
  ArrowLeft,
  Info,
  ExternalLink,
  History,
  Trash2,
  Image as ImageIcon,
  Share2
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toPng } from 'html-to-image';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { generateAIBentoGrid } from '../services/aiBentoService';
import { ProModal } from '../components/generator/ProModal';
import { PublishBentoModal } from '../components/community/PublishBentoModal';

interface SavedGrid {
  id: string;
  prompt: string;
  code: string;
  timestamp: number;
}

const EXAMPLE_PROMPTS = [
  {
    title: "SaaS Dashboard",
    icon: <LayoutGrid size={14} />,
    prompt: "A modern SaaS dashboard with analytics charts, user activity feed, and a premium upgrade card. Use dark mode with emerald accents and glassmorphism."
  },
  {
    title: "Creative Portfolio",
    icon: <ImageIcon size={14} />,
    prompt: "A minimal creative portfolio for a photographer. Large image blocks, a subtle bio section, and social links. Use soft animations and mesh gradients."
  },
  {
    title: "Product Launch",
    icon: <Zap size={14} />,
    prompt: "A high-impact product launch page. Hero section with a 3D feel, feature highlights with vibrant gradients, and a strong call-to-action."
  }
];

export const AIBentoBuilder: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [previewCode, setPreviewCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generationsCount, setGenerationsCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'history'>('preview');
  const [savedGrids, setSavedGrids] = useState<SavedGrid[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.remixCode) {
      const code = location.state.remixCode;
      const safeCode = typeof code === 'string' ? code : (typeof code === 'object' ? JSON.stringify(code, null, 2) : String(code));
      setGeneratedCode(safeCode);
      setPrompt(location.state.remixPrompt || '');
      // We need to trigger the preview generation for the remixed code
      generatePreview(safeCode);
      
      // Clear state so it doesn't re-trigger on refresh
      window.history.replaceState({}, document.title);
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

  useEffect(() => {
    if (user) {
      fetchProfile();
      loadSavedGrids();
    }
  }, [user]);

  const loadSavedGrids = () => {
    const saved = localStorage.getItem(`bento_grids_${user?.id}`);
    if (saved) {
      setSavedGrids(JSON.parse(saved));
    }
  };

  const saveGrid = (code: string, gridPrompt: string) => {
    const newGrid: SavedGrid = {
      id: Math.random().toString(36).substr(2, 9),
      prompt: gridPrompt,
      code,
      timestamp: Date.now()
    };
    const updated = [newGrid, ...savedGrids].slice(0, 10); // Keep last 10
    setSavedGrids(updated);
    localStorage.setItem(`bento_grids_${user?.id}`, JSON.stringify(updated));
  };

  const deleteSavedGrid = (id: string) => {
    const updated = savedGrids.filter(g => g.id !== id);
    setSavedGrids(updated);
    localStorage.setItem(`bento_grids_${user?.id}`, JSON.stringify(updated));
  };

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('bento_generations, is_pro')
        .eq('id', user?.id)
        .single();

      if (data) {
        setGenerationsCount(data.bento_generations || 0);
        setIsPro(data.is_pro || false);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleGenerate = async () => {
    if (!user) {
      alert('Please log in to generate bento grids.');
      return;
    }

    if (generationsCount >= 2 && !isPro) {
      setIsProModalOpen(true);
      return;
    }

    setIsGenerating(true);
    try {
      const code = await generateAIBentoGrid(prompt);
      setGeneratedCode(code);
      saveGrid(code, prompt);
      
      // Prepare preview code by wrapping it in a basic React environment
      generatePreview(code);

      // Update generation count

      // Update generation count
      const newCount = generationsCount + 1;
      await supabase
        .from('profiles')
        .update({ bento_generations: newCount })
        .eq('id', user.id);
      
      setGenerationsCount(newCount);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportImage = async () => {
    if (previewRef.current) {
      try {
        // Since it's an iframe, we need to capture the content specifically
        // html-to-image might struggle with cross-origin, but srcDoc is same-origin
        // We'll try to capture the iframe element itself
        const iframe = previewRef.current.querySelector('iframe');
        if (!iframe) return;

        // Wait a bit for any animations to settle
        await new Promise(resolve => setTimeout(resolve, 500));

        const dataUrl = await toPng(previewRef.current, {
          cacheBust: true,
          backgroundColor: '#050505',
          pixelRatio: 2, // Higher quality
        });
        
        const link = document.createElement('a');
        link.download = `bento-grid-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Export failed', err);
        alert('Image export failed. Try copying the code or taking a screenshot.');
      }
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Bento Grid Builder",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web",
    "description": "Create stunning, high-conversion Bento grid layouts in seconds using AI.",
    "offers": {
      "@type": "Offer",
      "price": "15.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>Free AI Bento Grid Generator - Design Modern Landing Pages</title>
        <meta name="description" content="Create stunning, high-conversion Bento grid layouts in seconds. Our AI Bento Designer uses complex CSS Grid logic to build responsive, modern interfaces. Perfect for portfolios and SaaS landing pages." />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Navigation */}
      <nav className="border-b border-white/5 bg-zinc-900/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/tools" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="text-black" size={18} />
              </div>
              <h1 className="font-bold text-lg tracking-tight">AI Bento Grid Builder</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!isPro && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  {2 - generationsCount} Generations Left
                </span>
              </div>
            )}
            <button 
              onClick={() => setIsProModalOpen(true)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all"
            >
              {isPro ? 'Pro Active' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Input Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Describe Your Layout</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A tech product launch with features, pricing, and a video showcase..."
                  className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                />
              </div>

              {/* Example Prompts */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Try an Example</p>
                <div className="grid grid-cols-1 gap-2">
                  {EXAMPLE_PROMPTS.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(ex.prompt)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 transition-all text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                        {ex.icon}
                      </div>
                      <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">{ex.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || (!isPro && generationsCount >= 2)}
                className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Architecting Grid...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Bento Grid
                  </>
                )}
              </button>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 flex items-center gap-2">
                  <Info size={12} />
                  Aesthetic Defaults
                </h3>
                <ul className="text-[10px] text-white/30 space-y-1">
                  <li>• 12-Column Asymmetric Logic</li>
                  <li>• Glassmorphism (Backdrop Blur)</li>
                  <li>• Mesh Gradient Accents</li>
                  <li>• Framer Motion Interactions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab('preview')}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'preview' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  <Eye size={14} />
                  Live Preview
                </button>
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'code' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  <Code size={14} />
                  Copy Code
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  <History size={14} />
                  Saved Grids
                </button>
              </div>

              {generatedCode && (
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopy}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Copy Code"
                  >
                    {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={handleExportImage}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Export as Image"
                  >
                    <ImageIcon size={16} />
                  </button>
                  <button 
                    onClick={() => setIsPublishModalOpen(true)}
                    className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-colors text-emerald-500"
                    title="Publish to Community"
                  >
                    <Share2 size={16} />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-white/60 hover:text-white">
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="aspect-video w-full bg-zinc-950 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl relative group">
              {isGenerating && (
                <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto text-emerald-500 animate-pulse" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Architecting Your Bento...</h3>
                  <p className="text-white/40 text-sm max-w-xs">Our AI is currently designing a high-conversion layout based on your prompt.</p>
                </div>
              )}
              
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
                    <p className="text-sm font-medium">Your AI-generated bento will appear here</p>
                  </div>
                )
              ) : activeTab === 'code' ? (
                <div className="w-full h-full bg-black/40 p-8 overflow-auto font-mono text-xs text-emerald-500/80">
                  {generatedCode ? (
                    <pre>{typeof generatedCode === 'string' ? generatedCode : JSON.stringify(generatedCode, null, 2)}</pre>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <Code size={48} className="mb-4 opacity-10" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full bg-black/40 p-8 overflow-auto">
                  {savedGrids.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {savedGrids.map((grid) => (
                        <div key={grid.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group">
                          <div className="flex-1 min-w-0 mr-4">
                            <p className="text-sm font-bold truncate mb-1">
                              {typeof grid.prompt === 'string' ? grid.prompt : 'Untitled Grid'}
                            </p>
                            <p className="text-[10px] text-white/40">{new Date(grid.timestamp).toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setGeneratedCode(grid.code);
                                setPrompt(grid.prompt);
                                // Regenerate preview
                                generatePreview(grid.code);
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg text-emerald-500 transition-colors"
                            >
                              <Zap size={16} />
                            </button>
                            <button 
                              onClick={() => deleteSavedGrid(grid.id)}
                              className="p-2 hover:bg-white/10 rounded-lg text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                      <History size={48} className="mb-4 opacity-10" />
                      <p className="text-sm font-medium">No saved grids yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Semantic Content for SEO */}
        <section className="mt-24 pt-24 border-t border-white/5">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8">Why Use Bento Grids for Modern Web Design?</h2>
            <div className="space-y-8 text-white/60 leading-relaxed">
              <p>
                Bento grids have revolutionized modern web design by providing a structured yet highly flexible way to organize content. Inspired by the Japanese bento box, this layout style allows designers to create high-impact visual hierarchies using <strong>CSS Grid Span</strong> logic.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <Zap size={16} className="text-emerald-500" />
                    Responsive Bento Layout
                  </h3>
                  <p className="text-sm">
                    Unlike traditional grids, a <strong>Responsive Bento Layout</strong> adapts seamlessly across devices. By utilizing Tailwind's responsive utilities, cards can span different column counts on mobile versus desktop, ensuring your message is always clear.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <LayoutGrid size={16} className="text-emerald-500" />
                    Tailwind Bento Component
                  </h3>
                  <p className="text-sm">
                    Our generator produces a production-ready <strong>Tailwind Bento Component</strong>. It leverages the full power of utility-first CSS to apply complex asymmetric patterns that would take hours to code manually.
                  </p>
                </div>
              </div>

              <p>
                By combining 12-column grid systems with glassmorphism and subtle animations, you can create interfaces that feel premium and trustworthy. Whether you're building a SaaS landing page or a personal portfolio, the bento style is the gold standard for 2024 and beyond.
              </p>
            </div>
          </div>
        </section>
      </main>

      <ProModal 
        isOpen={isProModalOpen} 
        onClose={() => setIsProModalOpen(false)} 
      />

      {generatedCode && (
        <PublishBentoModal 
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
          gridJson={generatedCode}
          previewRef={previewRef}
        />
      )}
    </div>
  );
};
